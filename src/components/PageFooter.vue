<template>
  <div class="page-footer">
    <!-- <div class="container footer-container text-center">©Copyright 2015-2019 Robin8 All Rights Reserved. 络鬓科技（上海）有限公司 版权所有</div> -->

    <customer-service></customer-service>
  </div>
</template>

<script>
import CustomerService from '@components/CustomerService'

export default {
  name: 'PageFooter',
  components: {
    CustomerService
  },
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
</style>
