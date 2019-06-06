<template>
  <div class="brands-list-container">
    <div class="panel default-panel brands-list-panel">
      <div class="panel-head text-right">
        <router-link
          to="/settings/my_competition_brands/create"
          class="btn btn-cyan"
        >
          {{$t('lang.myCompetitionBrands.addBtn')}}
        </router-link>
      </div>

      <div v-if="dataListBox.length > 0" class="panel-body">
        <table class="default-table">
          <thead>
            <tr>
              <th width="10%" class="text-center">{{$t('lang.myCompetitionBrands.table.title.check')}}</th>
              <th width="10%" class="text-center">{{$t('lang.myCompetitionBrands.table.title.id')}}</th>
              <th width="30%">{{$t('lang.myCompetitionBrands.table.title.name')}}</th>
              <th width="40%">{{$t('lang.myCompetitionBrands.table.title.shortname')}}</th>
              <th width="10%" class="text-center">{{$t('lang.myCompetitionBrands.table.title.operation')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in dataListBox"
              :key="item.id"
            >
              <td class="text-center">
                <input type="checkbox" v-model="item.isCheck" @click="checkItem(item)" :disabled="item.isDisable">
              </td>
              <td class="text-center">{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.short_name}}</td>
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
          {{$t('lang.myCompetitionBrands.contrastButton')}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'
import { mapState } from 'vuex'
export default {
  name: 'MyCompetitionBrands',
  components: {
  },
  computed: {
    ...mapState(['authorization'])
  },
  data () {
    return {
      dataList: {},
      dataListBox: [],
      currentCheckList: [],
      currentCheckName: [],
      selectBox: []
    }
  },
  created() {
    this.selectBox = []
    this.getBaseData();
  },
  methods: {
    getBaseData () {
      const _that = this
      axios.get(apiConfig.baseInfosUrl, {
        headers: {
          'Authorization': _that.authorization
        }
      }).then(function(res) {
        _that.selectBox = [];
        // console.log('我是competition', res);
        if (res.status === 200) {
          _that.dataListBox = res.data.competitors;
          _that.dataListBox.forEach((item, index) => {
            item.isDisable = false
            if (item.status === 0) {
              item.isCheck = false
            } else {
              item.isCheck = true
              _that.selectBox.push(item)
            }
          })
          _that.selectBox = [...new Set(_that.selectBox)]
        }
      })
    },
    // 编辑和修改的接口
    totalJoggle(item, params) {
      const _that = this
      axios.post(apiConfig.submitCreatedCompetitor + '/' + item.id, params, {
        headers: {
          'Authorization': this.authorization
        }
      }).then(function(res) {
        // console.log(res);
        if (res.status === 201) {
          _that.brandsList = []
          _that.getBaseData()
        }
      })
    },
    // 选中一条
    checkItem(item) {
      let params = {
        id: item.id
      }
      if (item.isCheck) {
        params.status = 0
        this.selectBox.forEach((element, index) => {
          if (Number(item.id) === Number(element.id)) {
            this.selectBox.splice(index, 1);
          }
        });
      } else {
        if (this.selectBox.length < 3) {
          this.selectBox.push(item)
          params.status = 1
        } else {
          alert(this.$t('lang.myCompetitionBrands.overThreeTip'))
        }
      }
      this.totalJoggle(item, params)
    },
    toDetail(item) {
      this.$router.push({
        path: "/settings/my_competition_brands/create",
        name: "MyCompetitionBrandsCreate",
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
      this.currentCheckList = [];
      this.currentCheckName = [];
      this.dataListBox.forEach(key => {
        // console.log(key);
        if (key.status === 1) {
          this.currentCheckList.push(key.short_name);
          this.currentCheckName.push(key.name);
        }
      });
      if (this.currentCheckList.length > 0) {
        // 把当前选的竞争者 带到home页面
        this.$router.push({
          path: "/",
          name: "Home",
          query: {
            curentCompittor: this.currentCheckList,
            curentName: this.currentCheckName
          }
        });
      } else {
        alert(this.$t('lang.myCompetitionBrands.noneComTip'));
      }

    }
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
