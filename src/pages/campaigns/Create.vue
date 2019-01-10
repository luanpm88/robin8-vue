<template>
  <div>
    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title text-center">基础信息</h5>
      </div>
      <div class="panel-body">
        <div class="form-horizontal campaign-create-form">
          <div class="form-group clearfix">
            <div class="col-sm-2 control-label">活动名称：</div>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="" placeholder="请填写活动名称">
              <div class="form-tips">好的名称可以吸引更多优质KOL参加</div>
            </div>
          </div>
          <div class="form-group clearfix">
            <div class="col-sm-2 control-label">活动介绍：</div>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="" placeholder="请填写活动介绍">
              <div class="form-tips">请填写活动相关介绍</div>
            </div>
          </div>
          <div class="form-group clearfix">
            <div class="col-sm-2 control-label">品牌名称：</div>
            <div class="col-sm-10">
              <select class="form-control">
                <option>请选择品牌名称</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <div class="form-tips">请选择准确的品牌名称</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title text-center">活动信息</h5>
      </div>
      <div class="panel-body">
        <div class="form-horizontal campaign-create-form">
          <div class="form-group clearfix">
            <div class="col-sm-2 control-label">活动平台：</div>
            <div class="col-sm-10">
              <div class="row clearfix">
                <div class="col-sm-1 text-center">
                  <div class="check-icon">
                    <div class="iconfont icon-wechat-circle"></div>
                    <div class="iconfont icon-check"></div>
                  </div>
                </div>
                <div class="col-sm-5">
                  <input type="number" class="form-control" id="" placeholder="请填写微信期待曝光值">
                </div>
                <div class="col-sm-1 text-center">
                  <div class="check-icon">
                    <div class="iconfont icon-weibo-circle"></div>
                    <div class="iconfont icon-check"></div>
                  </div>
                </div>
                <div class="col-sm-5">
                  <input type="number" class="form-control" id="" placeholder="请填写微博期待曝光值">
                </div>
              </div>
            </div>
          </div>
          <div class="form-group clearfix">
            <div class="col-sm-2 control-label">活动图片：</div>
            <div class="col-sm-10">
              <div class="upload-imgs-list">
                <div class="upload-img-item">
                  <img src="" alt="" class="upload-img" />
                  <div class="iconfont icon-close close-btn"></div>
                </div>
              </div>
              <vue-core-image-upload
                :class="['upload-img-btn', 'iconfont', 'icon-image']"
                :crop="false"
                @imageuploaded="imageuploaded"
                @imageuploading="imageuploading"
                inputOfFile="file"
                text=""
                :max-file-size="5242880"
                :compress="30"
                :max-width="200"
                input-accept="image/*"
                :url="uploadUrl" >
              </vue-core-image-upload>
            </div>
          </div>
          <div class="form-group clearfix">
            <div class="col-sm-2 control-label">活动要求：</div>
            <div class="col-sm-10">
              <textarea name="" id="" class="form-control" rows="6" placeholder="请填写活动须知和要求，包括您的要求、转发内容链接等等"></textarea>
            </div>
          </div>
          <div class="form-group clearfix">
            <div class="col-sm-2 control-label">活动时间：</div>
            <div class="col-sm-10">
              <input type="date" class="form-control" id="" placeholder="">
              <div class="form-tips">请选择您预期的活动时间</div>
            </div>
          </div>
          <div class="form-group clearfix">
            <div class="col-sm-2 control-label">KOL数量：</div>
            <div class="col-sm-4">
              <input type="number" class="form-control" id="" placeholder="请填写活动KOL数量">
              <div class="form-tips">请填写活动KOL数量</div>
            </div>
            <div class="col-sm-2 control-label">活动预算：</div>
            <div class="col-sm-4">
              <input type="number" class="form-control" id="" placeholder="请填写活动预算">
              <div class="form-tips">请填写活动预算</div>
            </div>
          </div>
          <div class="form-group clearfix">
            <div class="col-sm-2 control-label">注意事项：</div>
            <div class="col-sm-10">
              <textarea name="" id="" class="form-control" rows="6" placeholder="请填写活动的注意事项，包括不要涵盖的内容，不可以提及的事项等特殊需要注意的地方"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel default-panel mt20">
      <div class="panel-head">
        <h5 class="title text-center">大V 相关要求</h5>
      </div>
      <div class="panel-body">
        <div class="form-horizontal campaign-create-form">
          <div class="form-group clearfix">
            <div class="col-sm-2 control-label">价格要求：</div>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="" placeholder="请选择价格区间">
              <div class="form-tips">请选择您期待的价格区间方便我们更精准的为您推荐KOL</div>
            </div>
          </div>
          <div class="form-group clearfix">
            <div class="col-sm-2 control-label">粉丝年龄：</div>
            <div class="col-sm-4">
              <select class="form-control">
                <option>请选择期望的粉丝年龄</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <div class="form-tips">请选择期望的粉丝年龄</div>
            </div>
            <div class="col-sm-2 control-label">粉丝性别：</div>
            <div class="col-sm-4">
              <select class="form-control">
                <option>请选择粉丝性别</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <div class="form-tips">请选择粉丝性别</div>
            </div>
          </div>
          <div class="form-group clearfix">
            <div class="col-sm-2 control-label">粉丝地域：</div>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="" placeholder="请选择/填写粉丝的地域要求">
              <div class="form-tips">请填写期望的粉丝地域描述</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
      <router-link to="/campaign/1/preview" tag="div" class="btn btn-cyan">下一步</router-link>
    </div>
  </div>
</template>

<script>
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import VueCoreImageUpload from 'vue-core-image-upload'

export default {
  name: 'CampaignCreate',
  components: {
    VueCoreImageUpload
  },
  data () {
    return {
      uploadUrl: apiConfig.uploadUrl,
      pictures: [],
      loading: false
    }
  },
  methods: {
    imageuploaded (res) {
      if (this.pictures.length >= 5) {
        alert('最多可上传5张图片')
        return false
      }
      if (res.code == 0) {
        this.pictures.push(res.data.base)
        this.loading = false
      } else {
        alert('上传失败')
        this.loading = false
      }
      console.log(this.pictures)
    },
    imageuploading (res) {
      this.loading = true
    },
    delPhoto (e, url) {
      console.log(url)
      let index = this.pictures.indexOf(url)
      let delConfirm = confirm('确定要删除此图片？')
      if (delConfirm) {
        this.pictures.splice(index, 1)
      }
      console.log(this.pictures)
    }
  }
}
</script>

<style lang="scss" scoped>
.campaign-create-form {
  overflow: hidden;
  .form-group {
    padding: 20px 60px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    .check-icon {
      display: inline-block;
      position: relative;
      cursor: pointer;
      .iconfont {
        font-size: $font-lg;
        color: #d9d9d9;
      }
      .icon-check {
        position: absolute;
        top: 0;
        right: -4px;
        z-index: 1;
        width: 12px;
        height: 12px;
        line-height: 12px;
        text-align: center;
        font-size: $font-xs;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 50%;
        background-color: #d8d8d8;
      }
    }
    &:last-child {
      margin-bottom: 0;
      border-bottom: none;
    }
  }
  .upload-img-btn {
    display: inline-block;
    font-size: 8rem;
    cursor: pointer;
  }
}
.upload-imgs-list {
  width: 100%;
  .upload-img-item {
    display: inline-block;
    position: relative;
    width: 96px;
    height: 96px;
    padding: 1px;
    margin: 0 6px 6px 0;
    border: 1px solid rgba(0, 0, 0, .5);
    overflow: hidden;
    .upload-img {
      position: absolute;
      top: 1px;
      left: 50%;
      transform: translateX(-50%);
      height: 92px;
    }
    .close-btn {
      position: absolute;
      top: 0;
      right: 0;
      width: 24px;
      height: 24px;
      text-align: center;
      font-size: 2rem;
      cursor: pointer;
    }
  }
}
</style>
