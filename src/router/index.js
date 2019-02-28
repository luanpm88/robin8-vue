import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Reg from '@/pages/Reg'
import ForgetPassword from '@/pages/ForgetPassword'
import ChangePassword from '@/pages/ChangePassword'
import Home from '@/pages/home/Home'
import HomeCreate from '@/pages/home/Create'
import KolList from '@/pages/kolList/List'
import KolDetail from '@/pages/kolList/Detail'

import Creations from '@/pages/creations/Creations'
import CreationList from '@/pages/creations/List'
import CreationCreate from '@/pages/creations/Create'
import CreationEdit from '@/pages/creations/Edit'
import CreationDetail from '@/pages/creations/Detail'
import ChooseKols from '@/pages/creations/Kols'
import CreationPay from '@/pages/creations/Pay'

import Campaigns from '@/pages/campaigns/Campaigns'
import CampaignList from '@/pages/campaigns/List'
import CampaignCreate from '@/pages/campaigns/Create'
import CampaignEdit from '@/pages/campaigns/Edit'
import CampaignDetail from '@/pages/campaigns/Detail'
import CampaignChooseKols from '@/pages/campaigns/Kols'
import CampaignPay from '@/pages/campaigns/Pay'

import Settings from '@/pages/settings/Settings'
import CompanyInfo from '@/pages/settings/CompanyInfo'
import MyBrands from '@/pages/settings/myBrands/MyBrands'
import MyBrandsCreate from '@/pages/settings/myBrands/Create'
import MyCompetitionBrands from '@/pages/settings/myCompetitionBrands/MyCompetitionBrands'
import MyCompetitionBrandsCreate from '@/pages/settings/myCompetitionBrands/Create'
import Ranking from '@/pages/ranking/Ranking'
import WechatRanking from '@/pages/ranking/WechatRanking'
import WeiboRanking from '@/pages/ranking/WeiboRanking'
import BenchMark from '@/pages/ranking/BenchMark'
import SocialListening from '@/pages//social/SocialListening'
 
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'ROBIN8',
        auth: true
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
      path: '/reg',
      name: 'Reg',
      component: Reg,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/forget_password',
      name: 'ForgetPassword',
      component: ForgetPassword,
      meta: {
        title: '忘记密码'
      }
    },
    {
      path: '/change_password',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: {
        title: '重置密码'
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: 'ROBIN8',
        auth: true
      }
    },
    {
      path: '/home/create',
      name: 'HomeCreate',
      component: HomeCreate,
      meta: {
        title: '创建新活动',
        auth: true
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        title: '企业设置',
        auth: true
      },
      children: [
        {
          path: 'company_info',
          name: 'CompanyInfo',
          component: CompanyInfo,
          meta: {
            title: '基本信息',
            auth: true
          }
        },
        {
          path: 'my_brands',
          name: 'MyBrands',
          component: MyBrands,
          meta: {
            title: '我的品牌',
            auth: true
          }
        },
        {
          path: 'my_brands/create',
          name: 'MyBrandsCreate',
          component: MyBrandsCreate,
          meta: {
            title: '我的品牌',
            auth: true
          }
        },
        {
          path: 'my_competition_brands',
          name: 'MyCompetitionBrands',
          component: MyCompetitionBrands,
          meta: {
            title: '我的竞争品牌',
            auth: true
          }
        },
        {
          path: 'my_competition_brands/create',
          name: 'MyCompetitionBrandsCreate',
          component: MyCompetitionBrandsCreate,
          meta: {
            title: '我的竞争品牌增加',
            auth: true
          }
        }
      ]
    },
    {
      path: '/creations',
      name: 'Creations',
      component: Creations,
      meta: {
        title: '活动',
        auth: true
      },
      children: [
        {
          path: '',
          name: 'CreationList',
          component: CreationList,
          meta: {
            title: '创作活动列表',
            auth: true
          }
        },
        // {
        //   path: 'list',
        //   name: 'CreationList',
        //   component: CreationList,
        //   meta: {
        //     title: '创作活动列表',
        //     auth: true
        //   }
        // },
        {
          path: 'create',
          name: 'CreationCreate',
          component: CreationCreate,
          meta: {
            title: '创建新活动',
            auth: true
          }
        },
        {
          path: ':id',
          name: 'CreationDetail',
          component: CreationDetail,
          meta: {
            title: '活动详情',
            auth: true
          }
        },
        {
          path: ':id/edit',
          name: 'CreationEdit',
          component: CreationEdit,
          meta: {
            title: '活动编辑',
            auth: true
          }
        },
        {
          path: ':id/kols',
          name: 'ChooseKols',
          component: ChooseKols,
          meta: {
            title: '创建新活动',
            auth: true
          }
        },
        {
          path: ':id/pay/:tenderId',
          name: 'CreationPay',
          component: CreationPay,
          meta: {
            title: '创建新活动',
            auth: true
          }
        }
      ]
    },
    {
      path: '/campaigns',
      name: 'Campaigns',
      component: Campaigns,
      meta: {
        title: '活动',
        auth: true
      },
      children: [
        {
          path: '',
          name: 'CampaignList',
          component: CampaignList,
          meta: {
            title: '创作活动列表',
            auth: true
          }
        },
        {
          path: 'create',
          name: 'CampaignCreate',
          component: CampaignCreate,
          meta: {
            title: '创建新活动',
            auth: true
          }
        },
        {
          path: ':id',
          name: 'CampaignDetail',
          component: CampaignDetail,
          meta: {
            title: '活动详情',
            auth: true
          }
        },
        {
          path: ':id/edit',
          name: 'CampaignEdit',
          component: CampaignEdit,
          meta: {
            title: '活动编辑',
            auth: true
          }
        },
        {
          path: ':id/kols',
          name: 'CampaignChooseKols',
          component: CampaignChooseKols,
          meta: {
            title: '创建新活动',
            auth: true
          }
        },
        {
          path: ':id/pay/:tenderId',
          name: 'CampaignPay',
          component: CampaignPay,
          meta: {
            title: '创建新活动',
            auth: true
          }
        }
      ]
    },
    {
      path: '/kol/list',
      name: 'KolList',
      component: KolList,
      meta: {
        title: 'KolList',
        isUseCache: false,
        keepAlive: true,
        auth: true
      }
    },
    {
      path: '/kol&id=:id&type=:type&brand_keywords=:brand_keywords',
      name: 'KolDetail',
      component: KolDetail,
      meta: {
        title: 'KolDetail',
        auth: true
      }
    },
    {
      path: '/ranking',
      name: 'Ranking',
      component: Ranking,
      meta: {
        title: '排名',
        auth: true
      },
      children: [
        {
          path: '/ranking/WechatRanking',
          name: 'wechatRanking',
          component: WechatRanking,
          meta: {
            title: 'WechatRanking',
            auth: true
          }
        },{
          path: '/ranking/WeiboRanking',
          name: 'weiboRanking',
          component: WeiboRanking,
          meta: {
            title: 'WeiboRanking',
            auth: true
          }
        },
        {
        path: '/ranking/BenchMark',
        name: 'benchMark',
        component: BenchMark,
        meta: {
          title: 'benchMark',
          auth: true
        }
      }]
    },
    {
      path: '/social/SocialListening',
      name: 'socialListening',
      component: SocialListening,
      meta: {
        title: 'socialListening',
        auth: true
      }
    },
  ]
})
