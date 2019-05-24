<!-- detail.vue 中summary的 most relevant post  -->
<template>
  <div>
    <!-- most_relevant_post  暂时微信没有这个接口-->
		<div class="panel default-panel mt20 kol-performance" v-if="isRelevantBox">
			<div class="panel-head">
					<h5 class="title text-center">{{$t('lang.kolList.detail.mostRelevantPosts.title')}}</h5>
			</div>
			<div class="panel-body prl30">
					<table class="com-brand-table" v-if="isRelevant">
					<tr>
							<th>{{$t('lang.kolList.detail.mostRelevantPosts.tableTitle')}}</th>
							<th>{{$t('lang.kolList.detail.mostRelevantPosts.date')}}</th>
							<th>{{$t('lang.kolList.detail.mostRelevantPosts.correlation')}}</th>
					</tr>
					<tr v-for="(key, index) in relevantList" :key="index">
							<td>
							<a :href="key.url" target="blank" class="purple">{{key.title}}</a>
							</td>
							<td style="min-width:200px">{{key.post_time}}</td>
							<td>{{key.correlation}}</td>
					</tr>
					</table>
					<div class="nonetip" v-if="isRelevantShow">
					<span>{{$t('lang.totalNoDataTip')}}</span>
					</div>
					<div class="r8-loading" v-if="isRelevantLoading">
					<a-spin tip="Loading..."/>
					</div>
			</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import { mapState } from 'vuex'
import commonJs from '@javascripts/common.js'
export default {
	name: 'SumMostRelevent',
	props: ['keywords'],
  data() {
    return {
			isRelevant: false,
      isRelevantShow: false,
      isRelevantLoading: true,
      relevantPostParams: {
        start_date: commonJs.cPastYears,
        end_date: commonJs.cPastOneday,
        profile_id: '',
        keywords: ''
      },
      relevantList: [],
      isRelevantBox: true
    }
  },
  created() {
    this.relevantPostParams.keywords = this.keywords
    // console.log(this.$route.query)
    if(this.$route.query.isSearch) {
      let relevantKey = this.$route.query.search_keywords
      let getNewKey = ''
      relevantKey.split(',').forEach(item => {
        getNewKey += '"' + item + '" '
      })
      if (Number(this.$route.query.type) === 0) {
        // 调用微博的most_relevant_post  暂时微信没有这个接口
        this.relevantPostParams.profile_id = Number(this.$route.params.id)
        this.relevantPostParams.keywords = getNewKey
        this.relevantPostWeibo(this.relevantPostParams)
      }
      if (Number(this.$route.query.type) !== 0) {
        this.isRelevantBox = false
      }
    } else {
      this.isRelevantBox = false
    }
  },
  methods: {
		relevantPostWeibo(params) {
      const _that = this
      axios
        .post(apiConfig.relevantPostWeibo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          if (res.status === 200) {
            // console.log('relevantPostWeibo', res)
            _that.isRelevantLoading = false
            if (res.data.data.length > 0) {
              _that.isRelevantShow = false
              _that.isRelevant = true
              res.data.data.forEach(item => {
                if (Number(item.correlation) !== 0) {
                  item.correlation =
                    commonJs.threeFormatter(item.correlation, 2) + '+'
                } else {
                  item.correlation = commonJs.threeFormatter(
                    item.correlation,
                    2
                  )
                }
              })
              _that.relevantList = res.data.data
            } else {
              _that.isRelevantShow = true
              _that.isRelevant = false
            }
          }
        })
        .catch(function(error) {
          // console.log(error)
        })
    }
  },
  computed: {
    ...mapState(['authorization'])
  }
}
</script>
<style lang="scss" scoped>
a.purple {
  display: block;
  text-align: left;
  @include limit-line(1);
  color: nth($purple, 1);
  word-break: break-all;
}
</style>