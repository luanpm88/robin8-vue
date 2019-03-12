<template>
  <div
    class="kols-list-item"
    :class="[checked ? 'checked' : '']"
  >
    <div class="media inner">
      <div class="media-left">
        <div class="avatar">
          <img
            :src="renderData.avatar"
            alt=""
            class="avatar-img"
            @click="toDetail(renderData)"
          />
          <div
            v-if="hasChecked"
            class="iconfont icon-round-check-fill check-icon"
            @click="handleCheck(renderData.id)"
          ></div>
        </div>
      </div>
      <div class="media-body media-middle info">
        <h5
          class="name"
          @click="toDetail(renderData)"
        >
          {{renderData.name}}
        </h5>
        <p class="desc">{{renderData.desc}}</p>
      </div>
      <div v-if="hasInflunce" class="media-right media-middle influnce-score">
        <div class="text-center">
          <h5>Influence Score</h5>
          <p>{{renderData.influnce}}</p>
        </div>
      </div>
      <div v-if="hasLiked || hasMsg || hasCart" class="media-right media-middle operation-area">
        <span
          v-if="hasLiked"
          class="iconfont icon-star-fill"
        ></span>
        <span
          v-if="hasMsg"
          class="iconfont icon-msg"
          @click="doChat"
        ></span>
        <span
          v-if="hasCart"
          class="iconfont icon-cart active"
          @click="doAddCart"
        ></span>
      </div>
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
    hasLiked: Boolean,
    hasMsg: Boolean,
    hasChecked: Boolean,
    hasInflunce: Boolean,
    hasCart: Boolean,
    renderData: Object
  },
  data () {
    return {
      checked: '',
      cartParams: {}
    }
  },
  methods: {
    toDetail (item) {
      this.$emit('detail', item)
    },
    handleCheck (id) {
      this.checked = !this.checked
      this.$emit('handleCheck', {
        'id': id
      })
    },
    doAddCart () {
      console.log(this.cartParams)
      axios.post(apiConfig.kolCollectUrl, this.cartParams, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handleDoAddCartSucc)
    },
    handleDoAddCartSucc (res) {
      console.log(res)
      let resData = res.data
      console.log(resData)
      if (res.status == 201) {
        if (!!resData.error && resData.error == 1) {
          alert(resData.detail)
          return false
        }
        alert('您已成功添加至购物车')
      }
    },
    doChat () {
      alert('敬请期待')
    }
  },
  mounted () {
    // console.log(this.renderData)
    this.checked = this.renderData.checked
    this.cartParams.profile_id = this.renderData.profile_id
    this.cartParams.profile_name = this.renderData.profile_name
    this.cartParams.avatar_url = this.renderData.avatar_url
    this.cartParams.desc = this.renderData.desc
  },
  computed: {
    ...mapState(['authorization'])
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
