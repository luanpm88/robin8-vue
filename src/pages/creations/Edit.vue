<template>
  <div class="campaign-detail-container">
    <create-process
      :renderData="processStatus"
      class="mt20"
    ></create-process>

    <creation-form formType="edit"></creation-form>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import CreateProcess from './components/CreateProcess'
import CreationForm from './components/CreationForm'
import { mapState } from 'vuex'

export default {
  name: 'CreationEdit',
  components: {
    CreateProcess,
    CreationForm
  },
  data () {
    return {
      processStatus: {
        current: 1,
        index: 0
      }
    }
  },
  methods: {

  },
  mounted () {
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>
</style>
