import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Home from '@/pages/home/Home'
import KolList from '@/pages/kolList/List'
import KolDetail from '@/pages/kolList/Detail'

import Campaigns from '@/pages/campaigns/Campaigns'
import CampaignCreate from '@/pages/campaigns/Create'
import CampaignEdit from '@/pages/campaigns/Edit'
import CampaignDetail from '@/pages/campaigns/Detail'
import ChooseKols from '@/pages/campaigns/Kols'
import CampaignPay from '@/pages/campaigns/Pay'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'ROBIN8'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/campaigns',
      name: 'Campaigns',
      component: Campaigns,
      meta: {
        title: '活动'
      },
      children: [
        {
          path: 'create',
          name: 'CampaignCreate',
          component: CampaignCreate,
          meta: {
            title: '创建新活动'
          }
        },
        {
          path: ':id',
          name: 'CampaignDetail',
          component: CampaignDetail,
          meta: {
            title: '活动详情'
          }
        },
        {
          path: ':id/edit',
          name: 'CampaignEdit',
          component: CampaignEdit,
          meta: {
            title: '活动编辑'
          }
        },
        {
          path: ':id/kols',
          name: 'ChooseKols',
          component: ChooseKols,
          meta: {
            title: '创建新活动'
          }
        },
        {
          path: ':id/pay',
          name: 'CampaignPay',
          component: CampaignPay,
          meta: {
            title: '创建新活动'
          }
        }
      ]
    },
    {
      path: '/kol/list',
      name: 'KolList',
      component: KolList,
      meta: {
        title: 'KolList'
      }
    },
    {
      path: '/kol/:id',
      name: 'KolDetail',
      component: KolDetail,
      meta: {
        title: 'KolDetail'
      }
    }
  ]
})
