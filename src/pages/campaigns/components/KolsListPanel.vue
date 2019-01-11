<template>
  <div class="panel default-panel">
    <div class="panel-head">
      <h5 class="title text-center">{{title}}</h5>
    </div>
    <div class="panel-body">
      <ul class="kols-list">
        <li class="item media checked">
          <div class="media-left">
            <div class="avatar">
              <img src="" alt="" class="avatar-img" />
              <div class="iconfont icon-round-check-fill check-icon"></div>
            </div>
          </div>
          <div class="media-body media-middle info">
            <h5 class="name">Anna Strong</h5>
            <p class="desc">Visual Designer,Google Inc</p>
          </div>
          <div class="media-right media-middle">
            <span class="iconfont icon-star-fill"></span>
          </div>
        </li>
        <li class="item media">
          <div class="media-left">
            <div class="avatar">
              <img src="" alt="" class="avatar-img" />
              <div class="iconfont icon-round-check-fill check-icon"></div>
            </div>
          </div>
          <div class="media-body media-middle info">
            <h5 class="name">Anna Strong</h5>
            <p class="desc">Visual Designer,Google Inc</p>
          </div>
          <div class="media-right media-middle">
            <span class="iconfont icon-star-fill"></span>
          </div>
        </li>
        <li class="item media">
          <div class="media-left">
            <div class="avatar">
              <img src="" alt="" class="avatar-img" />
              <div class="iconfont icon-round-check-fill check-icon"></div>
            </div>
          </div>
          <div class="media-body media-middle info">
            <h5 class="name">Anna Strong</h5>
            <p class="desc">Visual Designer,Google Inc</p>
          </div>
          <div class="media-right media-middle">
            <span class="iconfont icon-star-fill"></span>
          </div>
        </li>
      </ul>

      <div class="btn-area">
        <button type="button" class="btn btn-blue btn-outline btn-sm" @click="">下一页</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KolsListPanel',
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
.kols-list {
  $color: nth($gray, 1);
  $active: nth($blue, 1);
  padding: 0 16px;
  color: #d8d8d8;
  & > .item {
    height: 76px;
    padding: 16px 0;
    border-bottom: 1px solid #ebedf2;
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
        font-size: .8rem;
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
}
.btn-area {
  padding: 30px;
  text-align: center;
}
</style>
