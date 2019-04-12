<template>
  <div
    class="customer-service"
    :class="[showCode ? 'active' : '']"
  >
    <div v-if="showCode" class="service-qrcode">
      <img src="@images/service_qr.jpg" alt="" class="qr-img" />
      <div class="title" v-html="$t('lang.qrTips')"></div>
    </div>
    <div class="customer-service-btn" @click="showQrCode">
      <span v-if="!showCode" class="iconfont icon-service"></span>
      <span v-else class="iconfont icon-close"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerService',
  data () {
    return {
      showCode: false
    }
  },
  methods: {
    showQrCode () {
      this.showCode = !this.showCode
    }
  }
}
</script>

<style lang="scss" scoped>
.customer-service {
  position: fixed;
  z-index: 10;
  right: 20px;
  bottom: 20px;
  .service-qrcode {
    width: 160px;
    padding: 10px 10px 60px;
    border-radius: 0 0 30px 0;
    box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, .2);
    text-align: center;
    background-color: #fff;
    .qr-img {
      width: 100%;
    }
  }
  .customer-service-btn {
    position: absolute;
    z-index: 1;
    bottom: 0;
    right: 0;
    width: 60px;
    height: 60px;
    line-height: 60px;
    border-radius: 50%;
    text-align: center;
    box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, .2);
    background-color: nth($purple, 1);
    cursor: pointer;
    .iconfont {
      font-size: $font-lg-ns;
      color: #fff;
    }
  }
  &.active {
    .customer-service-btn {
      box-shadow: none;
      background-color: #fff;
      .iconfont {
        color: nth($purple, 1);
      }
    }
  }
}
</style>
