// 小燕
// const host = 'http://192.168.50.131:3000/brand_api/v2'
// 张春明
// const host = 'http://192.168.50.203:3001/brand_api/v2'
// qa
const host = 'https://qa.robin8.net/brand_api/v2'
// 正式
// const host = 'https://robin8.net/brand_api/v2'
const domain = ''
// fergus 接口qa地址
// const searchHost = 'http://api_prod.robin8.net:8080/api/v1/r1'

// fergus 接口测试地址
const searchHost = 'http://api_beta.robin8.net:8080//api/v1/r1'
const searchHostKey = '&application_id=local-001&application_key=vue-001'

const config = {
  host,
  domain,

  // 登陆
  loginUrl: `${host}/sessions/sign_in`,

  // 注册
  regUrl: `${host}/sessions/sign_up`,

  // 获取手机验证码
  phoneCodeUrl: `${host}/codes/get_phone_code`,

  // 获取邮箱验证码
  emailCodeUrl: `${host}/codes/get_email_code`,

  // 重置密码
  updatePwUrl: `${host}/sessions/update_password`,

  // 品牌主信息编辑 post
  usersUrl: `${host}/users`,

  // 收藏kol post
  kolCollectUrl: `${host}/users/collect_kol`,

  // 已收藏kol list post
  kolCollectListUrl: `${host}/users/collected_kols`,

  // 取消收藏kol post
  kolCollectCancelUrl: `${host}/users/cancel_collect`,

  // 品牌主信息 get
  profileUrl: `${host}/users/profile`,

  // 充值 post 参数credits
  rechargeUrl: `${host}/users/recharge`,

  // 获取发票记录 get / 申请发票 post
  invoiceHistoriesUrl: `${host}/invoice_histories`,

  // 获取发票信息 get
  invoiceUrl: `${host}/invoices`,

  // 普通发票信息的修改与创建 post
  invoiceCommonUrl: `${host}/invoices/common`,

  // 增税发票信息的修改与创建 post / 获取 get
  invoiceSpecialUrl: `${host}/invoices/special`,

  // 获取发票总额 get
  invoiceCreditsUrl: `${host}/invoice_histories/appliable_credits`,

  // 获取邮寄地址 get / 创建和修改 post
  invoiceReceiverUrl: `${host}/invoice_receiver`,

  // 大V活动 创建post，列表get，详情:id get
  creationsUrl: `${host}/creations`,

  // 小V活动 创建post，列表get，详情:id get
  campaignsUrl: `${host}/campaigns`,

  // 小V活动kol列表 get，参数:campaign_id
  campaignInvitesUrl: `${host}/campaign_invites`,

  // 小V活动详情参与情况 get，参数:campaign_id
  campaignStatisticsUrl: `${host}/campaigns/statistics_clicks`,

  // 小V活动详情评论 post，参数:campaign_id
  campaignEvaluateUrl: `${host}/campaigns/evaluate`,

  // 小V活动撤销 post，参数:campaign_id
  campaignCancelUrl: `${host}/campaigns/revoke_campaign`,

  // 小V活动支付宝支付 post，参数:campaign_id
  campaignPayByAlipayUrl: `${host}/campaigns/pay_by_alipay`,

  // 小V活动余额支付 post，参数:campaign_id
  campaignPayByBalanceUrl: `${host}/campaigns/pay_by_balance`,

  // 上传图片post 参数image
  uploadImageUrl: `${host}/creations/upload_image`,

  // 基本信息 tags and trademarks get
  baseInfosUrl: `${host}/base_infos`,

  // 待合作列表get 参数creation_id
  pendingTendersUrl: `${host}/kols/pending_tenders`,

  // 合作中列表get 参数creation_id
  cooperationTendersUrl: `${host}/kols/cooperation_tenders`,

  // 已完成列表get 参数creation_id
  finishedTendersUrl: `${host}/kols/finished_tenders`,

  // 验收满意post 参数creation_id
  updateStatusUrl: `${host}/tenders/update_status`,

  // 立即支付post 参数creation_id tenders_ary
  payTendersUrl: `${host}/tenders/create`,

  // 订单页面get 参数id
  showTenderUrl: `${host}/tenders/show`,

  // 支付post 参数tender_id pay_type / 消费记录 get
  transactionsUrl: `${host}/transactions`,

  // 创建品牌post 参数name, description
  createBrandUrl: `${host}/users/trademark`,

  // 首页baseinfo更新
  updateBaseInfo: `${host}/users/update_base_infos`,

  // kol微信搜索
  kolWxSearchUrl: `${searchHost}/price/price/kol_search?${searchHostKey}`,

  // kol微博搜索
  kolWbSearchUrl: `${searchHost}/price/weibo/price/kol_search?${searchHostKey}`,

  // kol search r8头部的东西
  r8_kols: `${host}/base_infos/r8_kols`,

  // 首页接口开始------------------------
  // analytics trend 微博
  trendsWeibo: `${searchHost}/weibo/brand/trend?${searchHostKey}`,

  // analytics trend 微信
  trendsWeixin: `${searchHost}/weixin/brand/trend?${searchHostKey}`,

  // analytics concept 微博
  conceptWeibo: `${searchHost}/weibo/brand/tag_cloud_distribution?${searchHostKey}`,

  // analytics concept 微信
  conceptWeixin: `${searchHost}/weixin/brand/tag_cloud_distribution?${searchHostKey}`,

  // analytics competitor 微博
  competitorWeibo: `${searchHost}/weibo/brand/competitors?${searchHostKey}`,

  // analytics competitor 微信
  competitorWeixin: `${searchHost}/weixin/brand/competitors?${searchHostKey}`,

  // analytics sentiment 微博
  sentimentWeibo: `${searchHost}/weibo/brand/sentiments?${searchHostKey}`,

  // analytics sentiment 微信
  sentimentWeixin: `${searchHost}/weixin/brand/sentiments?${searchHostKey}`,

  // Recommended Kols 微博
  kolsWeibo: `${searchHost}/weibo/brand/recommended_kols?${searchHostKey}`,

  // Recommended Kols 微信
  kolsWeixin: `${searchHost}/weixin/brand/recommended_kols?${searchHostKey}`,

  // top post 微博
  topPostWeibo: `${searchHost}/weibo/brand/top_posts?${searchHostKey}`,

  // top post 微信
  topPostWeixin: `${searchHost}/weixin/brand/top_posts?${searchHostKey}`,

  // kollist 表格weibo接口
  kollistWeiboTable: `${searchHost}/weibo/profile/kol_search_profile?${searchHostKey}`,

  // kollist 表格微信接口
  kollistWeixinTable: `${searchHost}/weixin/profile/kol_search_profile?${searchHostKey}`,

  // xiaohongshu 表格接口
  kollistRedBookTable: `${searchHost}/xiaohongshu/profile/kol_search_profile?${searchHostKey}`,

  // kuaishou
  kollistKuaishouTable: `${searchHost}/kuaishou/profile/kol_search_profile?${searchHostKey}`,

  // bilibili
  kollistBilibiliTable: `${searchHost}/bilibili/profile/kol_search_profile?${searchHostKey}`,

  // douyin
  kollistDouyinTable: `${searchHost}/douyin/profile/kol_search_profile?${searchHostKey}`,

  // 首页接口结束------------------------

  // 我的竞争品牌 增加品牌 提交接口
  // brand_api/v2/users/competitor
  submitCreatedCompetitor: `${host}/users/competitor`,

  // kol detail 页面

  // info weibo
  kolWeiboInfo: `${searchHost}/weibo/profile/info?${searchHostKey}`,

  // info weixin
  kolWeiXinInfo: `${searchHost}/weixin/profile/info?${searchHostKey}`,

  // info xiaohongshu
  kolXiaohongshuInfo: `${searchHost}/price/xiaohongshu/price/kol_info?${searchHostKey}`,

  // info kuaishou
  kolKuaishouInfo: `${searchHost}/price/kuaishou/price/kol_info?${searchHostKey}`,

  // info bilibili
  kolBilibiliInfo: `${searchHost}/price/bilibili/price/kol_info?${searchHostKey}`,

  // info douyin
  koldDouyinInfo: `${searchHost}/price/douyin/price/kol_info?${searchHostKey}`,

  // top industry
  // industry weibo
  kolWeiboIndustry: `${searchHost}/weibo/profile/tag_distribution?${searchHostKey}`,

  // industry weixin
  kolWeiXinIndustry: `${searchHost}/weixin/profile/tag_distribution?${searchHostKey}`,

  // Keyword weibo
  kolWeiboKeyword: `${searchHost}/weibo/profile/tag_cloud_distribution?${searchHostKey}`,

  // Keyword weixin
  kolWeiXinKeyword: `${searchHost}/weixin/profile/tag_cloud_distribution?${searchHostKey}`,

  // kolWeibo
  kolWeiboSocial: `${searchHost}/price/weibo/price/kol_info?${searchHostKey}`,

  // kolWeixin
  kolWeixinSocial: `${searchHost}/price/price/kol_info?${searchHostKey}`,

  // activity
  kolActivityUrl: `${host}/creation_selected_kols`,

  // Best Performance Posts weibo
  performanceWeibo: `${searchHost}/weibo/profile/best_performance_post_by_profile_id?${searchHostKey}`,

  // Best Performance Posts weixin
  performanceWeixin: `${searchHost}/weixin/profile/best_performance_post_by_profile_id?${searchHostKey}`,

  // Industries Distribution weibo
  detailAnalyOneWeibo: `${searchHost}/weibo/post/industry_distribution?${searchHostKey}`,

  // Industries Distribution weixin
  detailAnalyOneWeixin: `${searchHost}/weixin/post/industry_distribution?${searchHostKey}`,

  // Media Distribution weixin
  detailMediaWeixin: `${searchHost}/weixin/post/media_distribution?${searchHostKey}`,

  // count 六个图表weibo
  detailCountWeixin: `${searchHost}/weixin/post/post_distribution?${searchHostKey}`,

  // count 六个图表weixin
  detailCountWeibo: `${searchHost}/weibo/post/post_distribution?${searchHostKey}`,

  // postlist weixin
  detailPostWeixin: `${searchHost}/weixin/post/post_by_profile_id?${searchHostKey}`,

  // postlist weibo
  detailPostWeibo: `${searchHost}/weibo/post/post_by_profile_id?${searchHostKey}`,

  // ranking--------------------------

  // 微信 ranking 在调用right 两个列表之前 获取最新的report_date
  WeChatRankingDate: `${searchHost}/price/kol/ranking_date?${searchHostKey}`,

  // 微博ranking 在调用right 两个列表之前 获取最新的report_date
  WeboRankingDate: `${searchHost}/price/weibo/kol/ranking_date?${searchHostKey}`,

  // WeChatTopList
  WeChatTopList: `${searchHost}/price/kol/ranking_summary?${searchHostKey}`,

  // WeboTopList
  WeboTopList: `${searchHost}/price/weibo/kol/ranking_summary?${searchHostKey}`,

  // WeChatThirtyList
  WeChatThirtyList: `${searchHost}/price/kol/ranking?${searchHostKey}`,

  // WeChatThirtyList
  WeboThirtyList: `${searchHost}/price/weibo/kol/ranking?${searchHostKey}`,

  // benchMark
  // weixin benchMark
  weixinBeachOne: `${searchHost}/price/kol/benchmark/benchmarking?${searchHostKey}`,

  weixinBeachTwo: `${searchHost}/price/kol/benchmark/benchmarking2?${searchHostKey}`,

  weixinBeachThree: `${searchHost}/price/kol/benchmark/benchmarking3?${searchHostKey}`,

  // weibo benchMark
  weiboBeachOne: `${searchHost}/price/weibo/kol/benchmark/benchmarking?${searchHostKey}`,

  weiboBeachTwo: `${searchHost}/price/weibo/kol/benchmark/benchmarking2?${searchHostKey}`,

  weiboBeachThree: `${searchHost}/price/weibo/kol/benchmark/benchmarking2?${searchHostKey}`,

  // social listening 接口
  socialWeibo: `${searchHost}/weibo/post/query?${searchHostKey}`,

  socialWeixin: `${searchHost}/weixin/post/query?${searchHostKey}`,

  socialWeiboSelect: `${searchHost}/price/weibo/price/kol_search_by_profile_name?${searchHostKey}`,

  socialWeixinSelect: `${searchHost}/price/weixin/price/kol_search_by_profile_name?${searchHostKey}`,
}

module.exports = config
