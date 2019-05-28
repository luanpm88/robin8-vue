<template>
  <div class="campaign-create-container">
    <create-process :renderData="processStatus"></create-process>
    <creation-form formType="create"></creation-form>
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
  name: 'CreationCreate',
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
