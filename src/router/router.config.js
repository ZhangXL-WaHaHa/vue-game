/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index')
  },
  {
    path: '/sokoban',
    name: 'Sokoban',
    component: () => import('@/views/game/sokoban')
  }
]
