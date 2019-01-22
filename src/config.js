const host = 'http://192.168.50.105:3000/brand_api/v2'
const domain = ''
const searchHost = 'http://api_beta.robin8.net:8080/api/v1/r1'
const searchHostKey = '&application_id=local-001&application_key=vue-001'

const config = {
  host,
  domain,

  // 活动 创建post，列表get，详情:id get
  creationsUrl: `${host}/creations`,

  // 基本信息 tags and trademarks get
  baseInfosUrl: `${host}/base_infos`,

  // 待合作列表get
  pendingTendersUrl: `${host}/kols/pending_tenders`,

  // 合作中列表get
  unpayTendersUrl: `${host}/kols/unpay_tenders`,

  // 已完成列表get
  paidTendersUrl: `${host}/kols/paid_tenders`,

  // 立即支付post
  // payTendersUrl: `${host}/tenders/:creation_id/tender`

  // 首页接口开始------------------------
  // Recommended Kols 微博接口
  kolsWeibo: `${searchHost}//weibo/brand/recommended_kols?${searchHostKey}`

  // 首页接口结束------------------------
}

module.exports = config
