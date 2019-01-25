<template>
  <div class="kols-list-item media" @click="detail(renderData)">
    <div class="media-left">
      <div class="avatar">
        <img :src="renderData.avatar" alt="" class="avatar-img" />
        <div v-if="hasChecked" class="iconfont icon-round-check-fill check-icon"></div>
      </div>
    </div>
    <div class="media-body media-middle info">
      <h5 class="name">{{renderData.name}}</h5>
      <p class="desc">{{renderData.desc}}</p>
    </div>
    <div v-if="hasLiked || hasMsg" class="media-right media-middle operation-area">
      <span v-if="hasLiked" class="iconfont icon-star-fill"></span>
      <span v-if="hasMsg" class="iconfont icon-msg"></span>
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
    renderData: Object
  },
  methods: {
    detail(item) {
      this.$emit('detail', item);
    }
  }
};
</script>

<style lang="scss" scoped>
.kols-list-item {
  height: 76px;
  padding: 16px 0;
  border-bottom: 1px solid #ebedf2;
  color: #d8d8d8;
  .avatar {
    position: relative;
    width: 44px;
    height: 44px;
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
    }
  }
  .info {
    color: #9b9b9b;
    .name {
      @include limit-line(1);
      font-size: $font-sm;
      font-weight: 600;
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
}
</style>
