<template>
  <div class="campaign-create-container">
    <create-process
      :renderData="processStatus"
      class="mt20"
    ></create-process>

    <campaign-form formType="create"></campaign-form>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import CreateProcess from './components/CreateProcess'
import CampaignForm from './components/CampaignForm'
import { mapState } from 'vuex'

export default {
  name: 'CampaignCreate',
  components: {
    CreateProcess,
    CampaignForm
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
