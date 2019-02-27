<template>
  <div class="campaign-create-container">
    <campaign-form formType="create"></campaign-form>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import CampaignForm from './components/CampaignForm'
import { mapState } from 'vuex'

export default {
  name: 'CampaignCreate',
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
