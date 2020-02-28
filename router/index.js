import Redis from '@DB/views/redis'
import RedisCreate from '@DB/views/redis/create'
import RDS from '@DB/views/rds'
import RDSCreate from '@DB/views/rds/create'
import RDSBackup from '@DB/views/rds-backup'
import Layout from '@/layouts/RouterView'

export default {
  index: 6,
  meta: {
    label: '数据库',
    icon: 'menu-db',
  },
  menus: [
    /**
     * RDS
     */
    {
      meta: {
        label: 'RDS',
      },
      submenus: [
        {
          path: '/rds',
          component: Layout,
          meta: {
            label: '实例列表',
            permission: 'rds_dbinstances_list',
          },
          children: [
            {
              name: 'RDSIndex',
              path: '',
              component: RDS,
            },
            {
              name: 'RDSCreate',
              path: 'create',
              meta: {
                label: '新建实例',
              },
              component: RDSCreate,
            },
          ],
        },
        {
          path: '/rdsbackup',
          component: Layout,
          meta: {
            label: '备份管理',
            permission: 'rds_dbinstancebackups_list',
          },
          children: [
            {
              name: 'RDSBackupIndex',
              path: '',
              meta: {},
              component: RDSBackup,
            },
          ],
        },
      ],
    },
    /**
     * redis
     */
    {
      meta: {
        label: 'Redis',
      },
      submenus: [
        {
          path: '/redis',
          meta: {
            label: '实例列表',
            permission: 'redis_elasticcaches_list',
          },
          component: Layout,
          children: [
            {
              name: 'Redis',
              path: '',
              component: Redis,
            },
            {
              name: 'RedisCreate',
              path: 'create',
              component: RedisCreate,
            },
          ],
        },
      ],
    },
  ],
}
