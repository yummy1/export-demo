import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: 'Dashboard', icon: 'dashboard' }
  //   }]
  // },

  {
    path: '/',
    component: Layout,
    redirect: '/export/excel1',
    name: 'ExportExcel',
    meta: { title: 'ExportExcel', icon: 'table' },
    children: [
      {
        path: '/export/excel1',
        name: 'excel1',
        component: () => import('@/views/export-excel/index'),
        meta: { title: 'ExportExcel', icon: 'table' }
      }
    ]
  },
  {
    path: '/word1',
    component: Layout,
    redirect: '/export/word1',
    name: 'ExportWord',
    meta: { title: 'ExportWord', icon: 'word' },
    children: [
      {
        path: '/export/word1',
        name: 'word1',
        component: () => import('@/views/export-word/index'),
        meta: { title: 'Word1', icon: 'word' }
      },
      {
        path: '/export/word2',
        name: 'word2',
        component: () => import('@/views/export-word/index2'),
        meta: { title: 'Word2', icon: 'word' }
      },
      {
        path: '/export/word3',
        name: 'word3',
        component: () => import('@/views/export-word/index3'),
        meta: { title: 'Word3', icon: 'word' }
      }
    ]
  },
  {
    path: '/pdf1',
    component: Layout,
    redirect: '/export/pdf1',
    name: 'ExportPDF',
    meta: { title: 'ExportPDF', icon: 'pdf' },
    children: [
      {
        path: '/export/pdf1',
        name: 'pdf1',
        component: () => import('@/views/export-pdf/index'),
        meta: { title: 'PDF1', icon: 'pdf' }
      },
      {
        path: '/export/pdf2',
        name: 'pdf2',
        component: () => import('@/views/export-pdf/index2'),
        meta: { title: 'PDF2', icon: 'pdf' }
      },
      {
        path: '/export/pdf3',
        name: 'pdf3',
        component: () => import('@/views/export-pdf/index3'),
        meta: { title: 'PDF3', icon: 'pdf' }
      }
      // {
      //   path: '/export/pdf4',
      //   name: 'pdf4',
      //   component: () => import('@/views/export-pdf/index4'),
      //   meta: { title: 'PDF4', icon: 'pdf' }
      // }
    ]
  },
  {
    path: '/export/pdf1-content',
    name: 'pdf1-content',
    hidden: true,
    component: () => import('@/views/export-pdf/components/Index2Content'),
    meta: { title: 'PDF1-content', icon: 'pdf' }
  },

  {
    path: '/preview',
    name: 'Preview',
    component: Layout,
    redirect: '/preview/preview1',
    meta: { title: 'Preview', icon: 'preview' },
    children: [
      {
        path: '/preview1',
        name: 'preview1',
        component: () => import('@/views/preview/index'),
        meta: { title: 'Preview', icon: 'preview' }
      },
      {
        path: '/preview2',
        name: 'preview2',
        component: () => import('@/views/preview/index2'),
        meta: { title: 'Preview2', icon: 'preview' }
      },
      {
        path: '/preview3',
        name: 'preview3',
        component: () => import('@/views/preview/index3'),
        meta: { title: 'Preview3', icon: 'preview' }
      }
    ]
  },

  {
    path: '/preview-detail',
    name: 'PreviewDetail',
    hidden: true,
    component: () => import('@/views/preview/detail'),
    meta: { title: 'previewDetail', icon: 'preview' }
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
