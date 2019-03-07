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
      <div v-if="hasLiked || hasMsg" class="media-right media-middle operation-area">
        <span v-if="hasInflunce" class="media-right-txt">{{renderData.influnce}}</span>
        <span v-if="hasLiked" class="iconfont icon-star-fill"></span>
        <span v-if="hasMsg" class="iconfont icon-msg" @click="alertMessage"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KolsListItem",
  props: {
    hasLiked: Boolean,
    hasMsg: Boolean,
    hasChecked: Boolean,
    renderData: Object,
    hasInflunce: Boolean
  },
  data () {
    return {
      checked: ''
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
    alertMessage() {
      alert('敬请期待');
    }
  },
  mounted () {
    this.checked = this.renderData.checked
  }
};
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
.media-right-txt{
  color:#333;
}
</style>
