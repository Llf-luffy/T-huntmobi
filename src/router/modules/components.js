/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  hidden: true,
  children: [
    {
      path: 'remark',
      component: () => import('@/views/advertising/remark'),
      name: 'remark',
      meta: { title: '备注' }
    }
  ]
}

export default componentsRouter

