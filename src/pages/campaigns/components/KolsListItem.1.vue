<template>
  <div class="kols-list-item media checked">
    <div class="media-left">
      <div class="avatar">
        <img src alt class="avatar-img">
        <div v-if="dataList.isCheck" class="iconfont icon-round-check-fill check-icon"></div>
      </div>
    </div>
    <div class="media-body media-middle info">
      <h5 class="name">{{dataList.name}}</h5>
      <p class="desc">{{dataList.describe}}</p>
    </div>
    <div class="media-right media-middle" v-if="dataList.isIcon">
      <span :class="{'iconfont':true, 'icon-star-fill': true, 'icon-star-active': dataList.isCollect}"></span>
      <span class="iconfont icon-msg" v-if="dataList.isMsg"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "KolsListItem",
  props: {
    dataList: {
      type: Object,
      default: null
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
  .icon-star-active{
    color: #FFD666FF;
  }
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
  &.checked {
    .avatar {
      .check-icon {
        color: nth($blue, 1);
      }
    }
  }
  .media-right {
    .iconfont {
      cursor: pointer;
    }
    .icon-msg {
      margin-left: $font-sm;
      color: nth($purple, 1);
    }
  }
}
</style>
