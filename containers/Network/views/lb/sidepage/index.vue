<template>
  <base-side-page
    @cancel="cancelSidePage"
    :title="$t('network.text_714')"
    icon="res-lb"
    :res-name="detailData.name"
    :current-tab="params.windowData.currentTab"
    :tabs="detailTabs"
    :loaded="loaded"
    @tab-change="handleTabChange">
    <template v-slot:actions>
      <actions :options="singleActions" :row="detailData" button-type="link" button-size="small" />
    </template>
    <component
      :is="params.windowData.currentTab"
      :id="listId"
      :res-id="detailData.id"
      :data="detailData"
      :getParams="getParams"
      :on-manager="onManager"
      :columns="columns"
      @side-page-trigger-handle="sidePageTriggerHandle"
      @init-side-page-tab="initSidePageTab"
      @refresh="refresh"
      @single-refresh="singleRefresh"
      @tab-change="handleTabChange" />
  </base-side-page>
</template>

<script>
import LoadbalancerlistenersList from '@Network/views/loadbalancerlistener/components/List'
import LoadbalancerbackendgroupsList from '@Network/views/loadbalancerbackendgroup/components/List'
import SidePageMixin from '@/mixins/sidePage'
import WindowsMixin from '@/mixins/windows'
import Actions from '@/components/PageList/Actions'
import SingleActionsMixin from '../mixins/singleActions'
import ColumnsMixin from '../mixins/columns'
import LbDetail from './Detail'
import LbProperties from './Properties'
import LbMonitor from './Monitor'

export default {
  name: 'LbSidePage',
  components: {
    LbDetail,
    Actions,
    LoadbalancerbackendgroupsList,
    LoadbalancerlistenersList,
    LbProperties,
    LbMonitor,
  },
  mixins: [SidePageMixin, WindowsMixin, ColumnsMixin, SingleActionsMixin],
  data () {
    const tabs = [
      { label: this.$t('network.text_67'), key: 'lb-detail' },
      { label: this.$t('network.text_138'), key: 'loadbalancerlisteners-list' },
      { label: this.$t('network.text_139'), key: 'loadbalancerbackendgroups-list' },
      { label: this.$t('network.text_520'), key: 'lb-monitor' },
      { label: this.$t('network.text_150'), key: 'event-drawer' },
    ]

    return {
      detailTabs: tabs,
    }
  },
  computed: {
    getParams () {
      const params = {
        loadbalancer: this.detailData.id,
      }
      // if (this.params.windowData.currentTab === 'loadbalancerbackendgroups-list') {
      //   if (this.detailData.provider && this.detailData.provider.toLowerCase() === 'aliyun') {
      //     params['filter.0'] = 'type.notequals("default")'
      //   }
      // }
      return params
    },
    listId () {
      switch (this.params.windowData.currentTab) {
        case 'event-drawer':
          return 'EventListForLbSidePage'
        default:
          return ''
      }
    },
  },
  watch: {
    detailData () {
      if (this.detailData && this.detailData.metadata && this.detailData.metadata['sys:properties']) {
        const tabs = this.detailTabs.filter(item => { return item.key !== 'lb-properties' && item.key !== 'event-drawer' })
        this.detailTabs = [...tabs, { label: this.$t('network.lb.properties.details'), key: 'lb-properties' }, { label: this.$t('network.text_150'), key: 'event-drawer' }]
      } else {
        this.detailTabs = this.detailTabs.filter(item => { return item.key !== 'lb-properties' })
      }
    },
  },
}
</script>
