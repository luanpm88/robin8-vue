<template>
  <div>
    <campaign-create-process
      :renderData="processStatus"
      class="mt20"
    ></campaign-create-process>
  </div>
</template>

<script>
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import CampaignCreateProcess from './components/CampaignCreateProcess'
import KolsListItem from './components/KolsListItem'

export default {
  name: 'ChooseKols',
  components: {
    CampaignCreateProcess,
    KolsListItem
  },
  data () {
    return {
      processStatus: {
        current: 2,
        index: 1
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
