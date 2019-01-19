<template>
  <div class="campaign-detail-container">
    <campaign-create-process
      :renderData="processStatus"
      class="mt20"
    ></campaign-create-process>

    <div class="panel default-panel mt20">
      <div class="panel-body">
        <div class="campaign-status-panel">
          <div class="iconfont icon-success success"></div>
          <div class="info">
            <h5 class="title">活动提交审核成功</h5>
            <p>正在审核中，我们将在24小时之内完成审核</p>
          </div>
        </div>

        <div class="line-title">基础信息</div>
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-2 control-label">活动名称：</div>
            <div class="col-sm-10">
              <p class="form-control-static">圣罗兰唇釉圣诞活动</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">活动介绍：</div>
            <div class="col-sm-10">
              <p class="form-control-static">圣罗兰唇釉圣诞活动开始招募大V啦！圣诞期间参加活动的大V可以获得丰盛的礼品奖励哦～</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">品牌名称：</div>
            <div class="col-sm-10">
              <p class="form-control-static">圣罗兰</p>
            </div>
          </div>
        </div>

        <div class="line-title">活动信息</div>
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-2 control-label">活动平台：</div>
            <div class="col-sm-10">
              <div class="row">
                <div class="col-sm-1 text-center">
                  <div class="check-icon checked">
                    <div class="iconfont icon-wechat-circle"></div>
                  </div>
                </div>
                <div class="col-sm-5">
                  <p class="form-control-static">微信曝光值：30000</p>
                </div>
                <div class="col-sm-1 text-center">
                  <div class="check-icon">
                    <div class="iconfont icon-weibo-circle"></div>
                  </div>
                </div>
                <div class="col-sm-5">
                  <p class="form-control-static">微博曝光值：30000</p>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">活动图片：</div>
            <div class="col-sm-10">
              <div class="upload-imgs-list">
                <div class="upload-img-item">
                  <img src="" alt="" class="upload-img" />
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">活动要求：</div>
            <div class="col-sm-10">
              <p class="form-control-static">微博 / 微信平台转发量4w次以上</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">活动时间：</div>
            <div class="col-sm-10">
              <p class="form-control-static">2018-12-21 ～ 2018-1-20</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">KOL数量：</div>
            <div class="col-sm-10">
              <p class="form-control-static">100</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">活动预算：</div>
            <div class="col-sm-10">
              <p class="form-control-static">128w</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">注意事项：</div>
            <div class="col-sm-10">
              <p class="form-control-static">大V粉丝量10k以上 / 微博平台认证大V / 小红书平台粉丝量20k以上</p>
            </div>
          </div>
        </div>

        <div class="line-title">大V相关要求</div>
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-2 control-label">大V圈子：</div>
            <div class="col-sm-10">
              <p class="form-control-static">潮流时装博主 / 美妆达人 / 时尚达人</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">价格要求：</div>
            <div class="col-sm-10">
              <p class="form-control-static">10k~30k</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">粉丝年龄：</div>
            <div class="col-sm-10">
              <p class="form-control-static">18～40</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">粉丝性别：</div>
            <div class="col-sm-10">
              <p class="form-control-static">女</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">粉丝地域：</div>
            <div class="col-sm-10">
              <p class="form-control-static">北京 / 上海 / 深圳</p>
            </div>
          </div>
        </div>

        <div class="line-title">已选择的大V</div>
        <div class="kols-list">
          <div class="item">
            <kols-list-item></kols-list-item>
          </div>
          <div class="item">
            <kols-list-item></kols-list-item>
          </div>
          <div class="item">
            <kols-list-item></kols-list-item>
          </div>
          <div class="item">
            <kols-list-item></kols-list-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import CampaignCreateProcess from './components/CampaignCreateProcess'
import KolsListItem from './components/KolsListItem'

export default {
  name: 'CampaignDetail',
  components: {
    CampaignCreateProcess,
    KolsListItem
  },
  data () {
    return {
      processStatus: {
        current: 1,
        index: 0
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.kols-list {
  padding: 24px 60px;
  font-size: 0;
  & > .item {
    display: inline-block;
    width: 33.33333%;
  }
}
</style>
