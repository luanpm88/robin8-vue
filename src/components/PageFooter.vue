<template>
  <div class="page-footer">
    <!-- <div class="container footer-container text-center">©Copyright 2015-2019 Robin8 All Rights Reserved. 络鬓科技（上海）有限公司 版权所有</div> -->
    <div class="customer-service">
      <div class="service-qrcode"></div>
      <div class="customer-service-btn">
        <span class="iconfont icon-msg"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageFooter',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-container {
  padding: 40px 0;
  margin-top: 60px;
}
.customer-service {
  position: fixed;
  z-index: 10;
  right: 20px;
  bottom: 20px;
}
.service-qrcode {
  padding: 20px;
  box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, .2);
  background-color: #fff;
}
.customer-service-btn {
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: 0;
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  text-align: center;
  box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, .2);
  background-color: #fff;
  cursor: pointer;
  .iconfont {
    font-size: $font-lg;
    color: nth($purple, 1);
  }
}
</style>
