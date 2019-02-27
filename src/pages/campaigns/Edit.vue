<template>
  <div class="campaign-detail-container">
    <campaign-form formType="edit"></campaign-form>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import CampaignForm from './components/CampaignForm'
import { mapState } from 'vuex'

export default {
  name: 'CampaignEdit',
  components: {
    CampaignForm
  },
  data () {
    return {
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
