<template>
  <div class="">

  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import { mapState } from 'vuex'

export default {
  name: 'Summary',
  components: {

  },
  data () {
    return {
    }
  },
  methods: {},
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>

</style>
