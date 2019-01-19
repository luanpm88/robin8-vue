<template>
  <div class="kol-item">
    <div class="media">
      <div class="media-left media-middle">
        <div class="kol-intro">
          <div class="avatar">
            <img src="" alt="" class="avatar-img" />
          </div>
          <div class="name">不知道酱</div>
          <div class="desc">小红书知名美妆博主/大V博主</div>
          <div class="opaeration-btns">
            <div class="item iconfont icon-details"></div>
            <div class="item iconfont icon-msg"></div>
            <div class="item iconfont icon-star-fill active"></div>
          </div>
        </div>
      </div>
      <div class="media-body media-middle">
        <div class="related-info">
          <p>合计：<span class="price">¥20000.00</span></p>
          <p>微信公众号 | 发帖数：10 | 报价：￥10000.00 | 曝光值：30000</p>
          <p>微博 | 发帖数：10 | 报价：￥10000.00 | 曝光值：20000</p>
        </div>
      </div>
      <div class="media-right media-middle kol-ctrl">
        <input type="radio" name="kol" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KolItem',
  props: {
  }
}
</script>

<style lang="scss" scoped>
.kol-item {
  padding: 24px 60px 24px 0;
  .kol-intro {
    width: 240px;
    text-align: center;
    .avatar {
      position: relative;
      width: 50px;
      height: 50px;
      .avatar-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .name {
      margin-top: 6px;
      font-size: $font-nm-s;
      font-weight: 600;
      color: #9b9b9b;
    }
    .desc {
      font-size: $font-xs;
    }
    .opaeration-btns {
      margin-top: 10px;
      text-align: center;
      font-size: 0;
      .item {
        display: inline-block;
        margin: 0 5px;
        cursor: pointer;
        color: nth($blue, 1);
        &.active {
          color: nth($yellow, 1);
        }
      }
    }
  }
  .related-info {
    line-height: 24px;
    padding-left: 40px;
    border-left: 1px solid #979797;
    font-size: $font-nm-s;
    color: #9b9b9b;
    .price {
      font-size: $font-nm-b;
      color: nth($blue, 1);
    }
  }
  &.active {
    background-color: #f4f5ff;
  }
}
</style>
