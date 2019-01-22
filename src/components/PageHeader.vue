<template>
  <div class="page-header">
    <div class="container clearfix">
      <h1 class="logo pull-left">
        <router-link to="/">
          <img src="@images/logo.png" alt="ROBIN8" class="logo-img" />
        </router-link>
      </h1>

      <div class="pull-right">
        <div class="avatar">
          <img src="" alt="" class="avatar-img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  background-color: #3e3b4f;
  .container {
    padding: 20px;
    background-color: #3e3b4f;
    .logo {
      height: 40px;
      .logo-img {
        height: 100%;
      }
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      .avatar-img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
