import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Reg from '@/pages/Reg'
import ForgetPassword from '@/pages/ForgetPassword'
import Help from '@/pages/Help'
import Messages from '@/pages/Messages'
import Home from '@/pages/home/Home'
import Create from '@/pages/Create'
import KolList from '@/pages/kolList/List'
import KolDetail from '@/pages/kolList/Detail'
import kolCompare from '@/pages/kolList/Compare'

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
import CampaignPay from '@/pages/campaigns/Pay'

import Settings from '@/pages/settings/Settings'
import CompanyInfo from '@/pages/settings/CompanyInfo'
import MyBrands from '@/pages/settings/myBrands/MyBrands'
import MyBrandsCreate from '@/pages/settings/myBrands/Create'
import MyCompetitionBrands from '@/pages/settings/myCompetitionBrands/MyCompetitionBrands'
import MyCompetitionBrandsCreate from '@/pages/settings/myCompetitionBrands/Create'
import MyShoppingCart from '@/pages/settings/ShoppingCart'

import Ranking from '@/pages/ranking/Ranking'
import WechatRanking from '@/pages/ranking/WechatRanking'
import WeiboRanking from '@/pages/ranking/WeiboRanking'
import BenchMark from '@/pages/ranking/BenchMark'
import SocialListening from '@/pages//social/SocialListening'

import Wallet from '@/pages/wallet/Wallet'
import WalletRecharge from '@/pages/wallet/Recharge'
import WalletSummary from '@/pages/wallet/Summary'
import WalletInvoice from '@/pages/wallet/invoice/Invoice'
import WalletInvoiceForm from '@/pages/wallet/invoice/InvoiceForm'
import WalletReceiverForm from '@/pages/wallet/invoice/ReceiverForm'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: 'home',
        auth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'login'
      }
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg,
      meta: {
        title: 'reg'
      }
    },
    {
      path: '/forget_password',
      name: 'ForgetPassword',
      component: ForgetPassword,
      meta: {
        title: 'forgetPassword'
      }
    },
    {
      path: '/help',
      name: 'Help',
      component: Help,
      meta: {
        title: 'help'
      }
    },
    {
      path: '/messages',
      name: 'Messages',
      component: Messages,
      meta: {
        title: 'messages'
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        title: 'home',
        auth: true
      }
    },
    {
      path: '/create',
      name: 'Create',
      component: Create,
      meta: {
        title: 'create',
        auth: true
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        title: 'settings',
        auth: true
      },
      children: [
        {
          path: 'company_info',
          name: 'CompanyInfo',
          component: CompanyInfo,
          meta: {
            title: 'companyInfo',
            auth: true
          }
        },
        {
          path: 'my_brands',
          name: 'MyBrands',
          component: MyBrands,
          meta: {
            title: 'myBrands',
            auth: true
          }
        },
        {
          path: 'my_brands/create',
          name: 'MyBrandsCreate',
          component: MyBrandsCreate,
          meta: {
            title: 'myBrandsCreate',
            auth: true
          }
        },
        {
          path: 'my_competition_brands',
          name: 'MyCompetitionBrands',
          component: MyCompetitionBrands,
          meta: {
            title: 'myCompetitionBrands',
            auth: true
          }
        },
        {
          path: 'my_competition_brands/create',
          name: 'MyCompetitionBrandsCreate',
          component: MyCompetitionBrandsCreate,
          meta: {
            title: 'myCompetitionBrandsCreate',
            auth: true
          }
        },
        {
          path: 'shopping_cart',
          name: 'MyShoppingCart',
          component: MyShoppingCart,
          meta: {
            title: 'myShoppingCart',
            auth: true
          }
        }
      ]
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: Wallet,
      meta: {
        title: 'wallet',
        auth: true
      },
      children: [
        // {
        //   path: '',
        //   name: 'WalletRecharge',
        //   component: WalletRecharge,
        //   meta: {
        //     title: 'walletRecharge',
        //     auth: true
        //   }
        // },
        {
          path: 'recharge',
          name: 'WalletRecharge',
          component: WalletRecharge,
          meta: {
            title: 'walletRecharge',
            auth: true
          }
        },
        {
          path: 'summary',
          name: 'WalletSummary',
          component: WalletSummary,
          meta: {
            title: 'walletSummary',
            auth: true
          }
        },
        {
          path: 'invoice',
          name: 'WalletInvoice',
          component: WalletInvoice,
          meta: {
            title: 'walletInvoice',
            auth: true
          }
        },
        {
          path: 'invoice/form',
          name: 'WalletInvoiceForm',
          component: WalletInvoiceForm,
          meta: {
            title: 'walletInvoiceForm',
            auth: true
          }
        },
        {
          path: 'invoice/receiver_form',
          name: 'WalletReceiverForm',
          component: WalletReceiverForm,
          meta: {
            title: 'walletReceiverForm',
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
        title: 'creations',
        auth: true
      },
      children: [
        {
          path: '',
          name: 'CreationList',
          component: CreationList,
          meta: {
            title: 'creationList',
            auth: true
          }
        },
        // {
        //   path: 'list',
        //   name: 'CreationList',
        //   component: CreationList,
        //   meta: {
        //     title: 'creationList',
        //     auth: true
        //   }
        // },
        {
          path: 'create',
          name: 'CreationCreate',
          component: CreationCreate,
          meta: {
            title: 'creationCreate',
            keepAlive: true,
            auth: true
          }
        },
        {
          path: ':id',
          name: 'CreationDetail',
          component: CreationDetail,
          meta: {
            title: 'creationDetail',
            auth: true
          }
        },
        {
          path: ':id/edit',
          name: 'CreationEdit',
          component: CreationEdit,
          meta: {
            title: 'creationEdit',
            keepAlive: true,
            auth: true
          }
        },
        {
          path: ':id/kols',
          name: 'ChooseKols',
          component: ChooseKols,
          meta: {
            title: 'chooseKols',
            auth: true
          }
        },
        {
          path: ':id/pay/:tenderId',
          name: 'CreationPay',
          component: CreationPay,
          meta: {
            title: 'creationPay',
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
        title: 'campaigns',
        auth: true
      },
      children: [
        {
          path: '',
          name: 'CampaignList',
          component: CampaignList,
          meta: {
            title: 'campaignList',
            auth: true
          }
        },
        {
          path: 'create',
          name: 'CampaignCreate',
          component: CampaignCreate,
          meta: {
            title: 'campaignCreate',
            keepAlive: true,
            auth: true
          }
        },
        {
          path: ':id',
          name: 'CampaignDetail',
          component: CampaignDetail,
          meta: {
            title: 'campaignDetail',
            auth: true
          }
        },
        {
          path: ':id/edit',
          name: 'CampaignEdit',
          component: CampaignEdit,
          meta: {
            title: 'campaignEdit',
            keepAlive: true,
            auth: true
          }
        },
        {
          path: ':id/pay',
          name: 'CampaignPay',
          component: CampaignPay,
          meta: {
            title: 'campaignPay',
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
        title: 'kolList',
        keepAlive: true,
        auth: true
      }
    },
    {
      // path: '/kol&id=:id&type=:type&brand_keywords=:brand_keywords',
      path: '/kol/:id',
      name: 'KolDetail',
      component: KolDetail,
      meta: {
        title: 'kolDetail',
        auth: true
      }
    },
    {
      path: '/kolList/Compare/:type',
      name: 'kolCompare',
      component: kolCompare,
      meta: {
        title: 'kolCompare',
        auth: true
      }
    },
    {
      path: '/ranking',
      name: 'Ranking',
      component: Ranking,
      meta: {
        title: 'ranking',
        auth: true
      },
      children: [
        {
          path: '/ranking/WechatRanking',
          name: 'wechatRanking',
          component: WechatRanking,
          meta: {
            title: 'wechatRanking',
            auth: true
          }
        },{
          path: '/ranking/WeiboRanking',
          name: 'weiboRanking',
          component: WeiboRanking,
          meta: {
            title: 'weiboRanking',
            auth: true
          }
        },
        {
        path: '/ranking/BenchMark/:type',
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
        keepAlive: true,
        auth: true
      }
    },
  ]
})
