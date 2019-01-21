const host = 'http://192.168.50.105:3000/brand_api/v2'
const domain = ''

const config = {
  host,
  domain,

  // 活动 创建post，列表get，详情:id get
  creationsUrl: `${host}/creations`,

  // 待合作列表get
  pendingTendersUrl: `${host}/kols/pending_tenders`,

  // 合作中列表get
  unpayTendersUrl: `${host}/kols/unpay_tenders`,

  // 已完成列表get
  paidTendersUrl: `${host}/kols/paid_tenders`,

  // 立即支付post
  // payTendersUrl: `${host}/tenders/:creation_id/tender`
}

module.exports = config
