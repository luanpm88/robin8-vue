<template>
  <div class="page-header">
    <div
      v-if="hasNav"
      class="nav-ctrl-btn"
      :class="navOpen ? 'active' : ''"
      @click="toggleNav"
    >
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <h1 class="logo">
      <router-link to="/">
        <img src="@images/logo.png" alt="Robin8" class="logo-img" />
      </router-link>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'PageHeaderMobile',
  props: {
    hasNav: Boolean
  },
  data () {
    return {
      navOpen: false
    }
  },
  methods: {
    toggleNav () {
      this.navOpen = !this.navOpen
      this.$emit('openNavCtrl', this.navOpen)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  position: fixed;
  z-index: 11;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 0;
  text-align: center;
  background: #413f40;
  box-shadow: 0px 18px 36px 0px rgba(5, 133, 162, .06);
  .logo {
    height: 30px;
    .logo-img {
      height: 100%;
    }
  }
  .nav-ctrl-btn {
    @include display-flex;
    position: absolute;
    @include center(y);
    left: 20px;
    width: 24px;
    height: 20px;
    cursor: pointer;
    flex-wrap: wrap;
    align-content: space-between;
    .line {
      width: 100%;
      height: 2px;
      border-radius: 2px;
      background-color: #fff;
      -webkit-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
    }
    &.active {
      .line:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
      }
      .line:nth-child(2) {
        opacity: 0;
      }
      .line:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
      }
    }
  }
}
</style>
