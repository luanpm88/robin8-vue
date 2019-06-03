<template>
  <div class="brands-list-container">
    <div class="panel default-panel brands-list-panel">
      <div class="panel-head text-right">
        <router-link
          to="/settings/my_brands/create"
          class="btn btn-cyan"
        >
          {{$t('lang.myBrandPage.addBtn')}}
        </router-link>
      </div>
      <div v-if="brandsList.length > 0" class="panel-body">
        <table class="default-table">
          <thead>
            <tr>
              <th width="4%" class="text-center">{{$t('lang.myBrandPage.table.title.check')}}</th>
              <th width="8%" class="text-center">{{$t('lang.myBrandPage.table.title.id')}}</th>
              <th width="20%">{{$t('lang.myBrandPage.table.title.name')}}</th>
              <th width="20%">{{$t('lang.myBrandPage.table.title.keywords')}}</th>
              <th width="38%">{{$t('lang.myBrandPage.table.title.description')}}</th>
              <th width="10%" class="text-center">{{$t('lang.myBrandPage.table.title.operation')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in brandsList"
              :key="item.id"
            >
              <td class="text-center">
                <input type="checkbox"  v-model="item.isCheck" @click="checkItem(item)">
              </td>
              <td class="text-center">{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.keywords}}</td>
              <td>{{item.description}}</td>
              <td class="text-center operation-area">
                <span class="operation-btn iconfont icon-edit" @click="toDetail(item)"></span>
                <span class="operation-btn iconfont icon-delete" @click="toDelete(item)"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="panel-body">
        <div class="p30 text-center">{{$t('lang.noData')}}...</div>
      </div>

      <div class="panel-foot text-center">
        <button type="button" class="btn btn-cyan" @click="checkInsight">
          {{$t('lang.myBrandPage.contrastButton')}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import commonJs from '@javascripts/common.js'
import { mapState } from 'vuex'

export default {
  name: 'MyBrands',
  components: {
  },
  data () {
    return {
      brandsList: [],
      currentCheck: {}
    }
  },
  methods: {
    getMyBrandList(){
      axios.get(apiConfig.baseInfosUrl, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(this.handelGetListDataSucc)
    },
    handelGetListDataSucc(res){
      let resData = res.data
      if (res.status == 200 && resData){
        let _brandsList = this.brandsList;
        let _brandItem
        resData.trademarks_list.forEach(item => {
          _brandItem = commonJs.buildObjData('id', item.id)
          if (item.status === 1 ) {
            _brandItem.isCheck = true
          } else {
            _brandItem.isCheck = false
          }
          _brandItem.status = item.status
          _brandItem.name = item.name
          _brandItem.keywords = item.keywords
          _brandItem.description = item.description
          this.brandsList.push(_brandItem)
        })
      }
    },
    // 编辑和修改的接口
    totalJoggle(item, params) {
      const _that = this
      axios.post(apiConfig.createBrandUrl + '/' + item.id, params, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(function(res) {
        // console.log(res);
        if (res.status === 201) {
          _that.brandsList = []
          _that.getMyBrandList()
        }
      })
    },
    // 选中一条
    checkItem(item) {
      // console.log(item);
      let params = {
        id: item.id
      }
      if (item.isCheck) {
        params.status = 0
      } else {
        params.status = 1
      }
      this.totalJoggle(item, params)
    },
    toDetail(item) {
      this.$router.push({
        path: "/settings/my_brands/create",
        name: "MyBrandsCreate",
        params: {
          itemList: item
        }
      });
    },
    toDelete(item) {
      let params = {
        status: -1
      }
      this.totalJoggle(item, params);
    },
    checkInsight() {
      this.brandsList.forEach(element => {
        if (element.status === 1) {
          this.currentCheck = element
        }
      });
      // console.log(this.currentCheck.keywords);
      // console.log(this.currentCheck.name);
      if (!this.currentCheck.name) {
        alert(this.$t('lang.myBrandPage.tip'));
      } else {
        // 把当前选中brand 带到home页面
        this.$router.push({
          path: "/",
          name: "Home",
          query: {
            currentBrand: this.currentCheck.keywords,
            currentBrandName: this.currentCheck.name
          }
        });
      }
    }
  },
  mounted(){
    this.getMyBrandList()
  },
  computed: {
     ...mapState(['authorization'])
  }
}
</script>

<style lang="scss" scoped>
.brands-list-container {
  padding: 30px 100px;
  .operation-btn {
    cursor: pointer;
  }
}
</style>
