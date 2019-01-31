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
          <img :src="avatarImgUrl" alt="" class="avatar-img" />
        </div>
        <span class="avatar-text" @click="sinUp">退出</span>
        <!-- <p>退出</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PageHeader',
  computed: {
     ...mapState(['avatarImgUrl']),
  },
  created() {
    // console.log(this.avatarImgUrl);
  },
  data () {
    return {

    }
  },
  methods: {
    sinUp() {
      window.localStorage.clear();
      this.$router.replace("/login");
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
      display: inline-block;
      .avatar-img {
        width: 100%;
        height: 100%;
      }
    }
    .avatar-text{
      margin-left: 10px;
      cursor: pointer;
      color: #fafafa;
      vertical-align: 7px;
      border-bottom: 1px solid #eaeaea;
    }
  }
}
</style>
