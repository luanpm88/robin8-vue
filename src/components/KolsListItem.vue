<template>
  <div
    class="kols-list-item"
    :class="[checked ? 'checked' : '']"
  >
    <div class="media inner">
      <div class="media-left">
        <div class="avatar">
          <router-link
            :to="url"
          >
            <img
              :src="renderData.avatar_url"
              alt=""
              class="avatar-img"
            />
          </router-link>
          <div
            v-if="renderStatus.hasChecked"
            class="iconfont icon-round-check-fill check-icon"
            @click="handleCheck(renderData.profile_id)"
          ></div>
        </div>
      </div>
      <div class="media-body media-middle info">
        <h5 class="name">
          <router-link
            :to="url"
          >
            {{renderData.profile_name}}
            <img
              v-if="!!renderData.terrace_avatar && renderData.terrace_avatar !=''"
              :src="renderData.terrace_avatar"
              alt=""
              class="platform-icon"
            />
          </router-link>
        </h5>
        <p class="desc">{{renderData.description_raw}}</p>
      </div>
      <div v-if="renderStatus.hasInflunce" class="media-right media-middle influnce-score">
        <div class="text-center">
          <h5>Influence Score</h5>
          <p>{{renderData.avg_post_influences}}</p>
        </div>
      </div>
      <div v-if="renderStatus.hasLiked || renderStatus.hasMsg || renderStatus.hasCart || renderStatus.hasDelete" class="media-right media-middle operation-area">
        <span
          v-if="renderStatus.hasLiked"
          class="iconfont icon-star-fill"
        ></span>
        <span
          v-if="renderStatus.hasMsg"
          class="iconfont icon-msg"
          @click="doChat"
        ></span>
        <span
          v-if="renderStatus.hasCart"
          class="iconfont icon-cart active"
          @click="doAddCart"
        ></span>
        <span
          v-if="renderStatus.hasDelete"
          class="iconfont icon-delete"
          @click="doDelete(renderData.profile_id)"
        ></span>
      </div>

      <!-- <transition
        enter-active-class="animated fadeOutUp"
      >
        <div v-if="cartPop">+1</div>
      </transition> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import { mapState } from 'vuex'

export default {
  name: 'KolsListItem',
  props: {
    renderStatus: Object,
    renderData: Object,
    routerData: Object
  },
  data () {
    return {
      checked: '',
      url: '',
      cartParams: {},
      cartPop: false
    }
  },
  methods: {
    handleCheck (id) {
      // this.checked = !this.checked
      this.$emit('handleCheck', {
        'id': id
      })
    },
    doAddCart () {
      // console.log(this.cartParams)
      axios.post(apiConfig.kolCollectUrl, this.cartParams, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleDoAddCartSucc)
    },
    handleDoAddCartSucc (res) {
      // console.log(res)
      let resData = res.data
      // console.log(resData)
      if (res.status == 201) {
        if (!!resData.error && resData.error == 1) {
          alert(resData.detail)
          return false
        }
        alert('您已成功添加至购物车')
      }
    },
    doDelete (id) {
      this.$emit('handleDelete', {
        'id': id
      })
    },
    doChat () {
      alert('敬请期待')
    },
    updateData (data) {
      // let _url = !!data.bigv_url && data.bigv_url != '' ? data.bigv_url : ''
      this.checked = data.checked
      this.url = !!data.bigv_url && data.bigv_url != '' ? data.bigv_url : '/kol/'+ this.renderData.profile_id +'?type='+ this.routerData.type +'&brand_keywords='+ this.routerData.keywords
      this.cartParams.profile_id = data.profile_id
      this.cartParams.profile_name = data.profile_name
      this.cartParams.avatar_url = data.avatar_url
      this.cartParams.description_raw = data.description_raw
    }
  },
  created () {
    // console.log(this.renderData)
    // console.log(this.renderData.profile_id)
    // console.log(this.routerData.type)
    // console.log(this.routerData.keywords)
    this.updateData(this.renderData)
  },
  computed: {
    ...mapState(['authorization'])
  },
  watch: {
    renderData: {
      handler (newVal, oldVal) {
        this.updateData(newVal)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.kols-list-item {
  position: relative;
  .inner {
    height: 76px;
    padding: 16px 0;
    color: #d8d8d8;
  }
  .avatar {
    position: relative;
    width: 44px;
    height: 44px;
    cursor: pointer;
    .avatar-img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
    .check-icon {
      position: absolute;
      right: 0;
      bottom: 0;
      color: #d8d8d8;
      cursor: pointer;
    }
  }
  .info {
    color: #9b9b9b;
    .name {
      @include limit-line(1);
      font-size: $font-sm;
      font-weight: 600;
      cursor: pointer;
      .platform-icon {
        display: inline-block;
        width: 14px;
        height: 14px;
        margin: -4px 0 0 8px;
        vertical-align: middle;
      }
      a {
        color: rgba(#000, .85);
      }
    }
    .desc {
      @include limit-line(1);
      font-size: 0.8rem;
    }
  }
  .influnce-score {
    color: #333;
  }
  .operation-area {
    .iconfont {
      margin-left: 10px;
      cursor: pointer;
      &.icon-msg {
        color: nth($purple, 1);
      }
      &.icon-star-fill.active {
        color: nth($yellow, 1);
      }
      &.icon-cart.active {
        color: nth($purple, 1);
      }
    }
  }
  &.checked {
    .avatar {
      .check-icon {
        color: nth($blue, 1);
      }
    }
  }
  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    content: "";
    background-color: #ebedf2;
    overflow: hidden;
  }
}
</style>
