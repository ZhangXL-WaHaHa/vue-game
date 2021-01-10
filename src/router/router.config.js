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
    path: '/web',
    name: 'web',
    component: () => import('@/views/tip/web')
  },
  {
    path: '/sokobanIndex',
    name: 'SokobanIndex',
    component: () => import('@/views/game/sokoban/index')
  },
  {
    path: '/sokoban',
    name: 'Sokoban',
    component: () => import('@/views/game/sokoban/sokoban')
  },
  {
    path: '/sokobanDIY',
    name: 'SokobanDIY',
    component: () => import('@/views/game/sokoban/diy')
  },
  {
    path: '/greedySnake',
    name: 'greedySnake',
    component: () => import('@/views/game/greedySnake/index')
  },
  {
    path: '/playGreedySnake',
    name: 'playGreedySnake',
    component: () => import('@/views/game/greedySnake/play')
  }
]
