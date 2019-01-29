<template>
  <div class="campaign-detail-container">
    <create-process
      :renderData="processStatus"
      class="mt20"
    ></create-process>

    <div class="panel default-panel mt20">
      <div class="panel-body">
        <status-area :statusData="detailData.status"></status-area>

        <div class="line-title">基础信息</div>
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-2 control-label">活动名称：</div>
            <div class="col-sm-10">
              <p class="form-control-static">{{detailData.name}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">活动介绍：</div>
            <div class="col-sm-10">
              <p class="form-control-static">{{detailData.description}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">品牌名称：</div>
            <div class="col-sm-10">
              <p class="form-control-static">{{detailData.trademark_name}}</p>
            </div>
          </div>
        </div>

        <div class="line-title">活动信息</div>
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-2 control-label">活动平台：</div>
            <div class="col-sm-10">
              <div class="row">
                <div
                  v-for="item in detailData.terraces"
                  :key="item.terrace_id"
                  class="col-sm-6"
                >
                  <div class="col-sm-2 text-center">
                    <div class="check-icon checked">
                      <div :class="'iconfont ' + item.iconClass"></div>
                    </div>
                  </div>
                  <div class="col-sm-10">
                    <p class="form-control-static">{{item.name}}曝光值：{{item.exposure_value}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">活动图片：</div>
            <div class="col-sm-10">
              <div class="upload-imgs-list">
                <div class="upload-img-item">
                  <img :src="detailData.img_url" alt="" class="upload-img" />
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">活动时间：</div>
            <div class="col-sm-10">
              <p class="form-control-static">{{detailData.time_range}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">KOL数量：</div>
            <div class="col-sm-10">
              <p class="form-control-static">{{detailData.pre_kols_count}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">活动预算：</div>
            <div class="col-sm-10">
              <p class="form-control-static">{{detailData.pre_amount}}</p>
            </div>
          </div>
          <div v-if="detailData.notice" class="form-group">
            <div class="col-sm-2 control-label">注意事项：</div>
            <div class="col-sm-10">
              <p class="form-control-static">{{detailData.notice}}</p>
            </div>
          </div>
        </div>

        <div class="line-title">大V相关要求</div>
        <div class="form-horizontal campaign-create-form">
          <div class="form-group">
            <div class="col-sm-2 control-label">所属标签：</div>
            <div class="col-sm-10">
              <p class="form-control-static">{{detailData.industries}}</p>
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-2 control-label">价格要求：</div>
            <div class="col-sm-10">
              <p class="form-control-static">{{detailData.price_range}}</p>
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
import CreateProcess from './components/CreateProcess'
import StatusArea from './components/StatusArea'
import KolsListItem from './components/KolsListItem'

export default {
  name: 'CreationDetail',
  components: {
    CreateProcess,
    StatusArea,
    KolsListItem
  },
  data () {
    return {
      processStatus: {
        current: 1,
        index: 0
      },
      detailData: {},
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
      axios.get(apiConfig.creationsUrl + '/' + this.$route.params.id)
        .then(this.handleGetDetailDataSucc)
    },
    handleGetDetailDataSucc (res) {
      console.log(res)
      let resData = res.data
      if (res.status == 200 && resData) {
        console.log(resData)
        this.detailData = resData
        let _terraces = resData.terraces

        _terraces.forEach(item => {
          console.log(item)
          switch (item.short_name) {
            case 'public_wechat_account':
              item.iconClass = 'icon-wechat-circle'
              break
            case 'weibo':
              item.iconClass = 'icon-weibo-circle'
              break
            default:
              item.iconClass = ''
          }
        })
      }
    }
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
