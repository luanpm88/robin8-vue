<template>
  <div class="campaign-detail-container">
    <campaign-create-process
      :renderData="processStatus"
      class="mt20"
    ></campaign-create-process>

    <div class="panel default-panel mt20">
      <div class="panel-body">
        <campaign-status-area></campaign-status-area>

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
            <div class="col-sm-2 control-label">所属标签：</div>
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
          <kols-list-item
            v-for="(item, index) in kolsList"
            :key="index"
            :hasLiked="kolHasLiked"
            :hasMsg="kolHasMsg"
            :hasChecked="kolHasChecked"
            :renderData="item"
          ></kols-list-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import CampaignCreateProcess from './components/CampaignCreateProcess'
import CampaignStatusArea from './components/CampaignStatusArea'
import KolsListItem from './components/KolsListItem'

export default {
  name: 'CampaignDetail',
  components: {
    CampaignCreateProcess,
    CampaignStatusArea,
    KolsListItem
  },
  data () {
    return {
      processStatus: {
        current: 1,
        index: 0
      },
      kolHasLiked: true,
      kolHasMsg: false,
      kolHasChecked: true,
      kolsList: [
        {
          name: "Anna Strong",
          desc: "Visual Designer,Google Inc Visual Designer,Google Inc Visual Designer,Google Inc"
        },
        {
          name: "Milano Esco",
          desc: "Well-known car blogger"
        },
        {
          name: "Nick Bold",
          desc: "Web Developer, Facebook Inc"
        },
        {
          name: "Wiltor Delton",
          desc: "Project Manager"
        },
        {
          name: "Nick Stone",
          desc: "Visual Designer, Github Inc"
        }
      ]
    }
  },
  methods: {
    getDetailData () {
      axios.get(apiConfig.creationsUrl + '/' + this.$route.params.id, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleGetDetailDataSucc)
    },
    handleGetDetailDataSucc (res) {
      let resData = res.data
      console.log(res)
      // if (resData.code == 0 && resData.data) {
      //   const data = resData.data
      //   console.log(data)
      //   this.ambassadorData = data
      // }
    },
  },
  mounted () {
    this.getDetailData()
  }
}
</script>

<style lang="scss" scoped>
.kols-list {
  padding: 24px 60px;
  font-size: 0;
  & > .kols-list-item {
    display: inline-block;
    width: 33.33333%;
    padding: 0 10px;
  }
}
</style>
