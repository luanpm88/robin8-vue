// <template>
//   <div class="page">
//     <page-header></page-header>

//     <div class="container mt50 clearfix">
//       <main-nav class="pull-left"></main-nav>

//       <div class="socail-container pull-right">
//         <div class="social-search clearfix">
//           <div class="social-line clearfix col-xs-6">
//             <span class="social-line-left col-xs-2">Topic:</span>
//             <input class="col-xs-10 oneinput" v-model="topic">
//           </div>
//           <div class="social-line clearfix col-xs-6">
//             <span class="social-line-left col-xs-2">Source:</span>
//             <select class="col-xs-10 oneselect" v-model="source">
//               <option value="1">{{$t('lang.weibo')}}</option>
//               <option value="0">{{$t('lang.wechat')}}</option>
//             </select>
//           </div>
//           <div class="form-group text-right">
//             <button type="button" class="btn btn-blue btn-outline" @click="totalSearch">Search</button>
//           </div>
//         </div>
//         <div class="social-content clearfix mt20">
//           <div class="home-post" v-for="(item, index) in itemList" :key='index'>
//             <p v-if="postType === 0" class="home-post-title">{{item.title}}</p>
//             <a :href="item.url" v-else><p class="home-post-title">{{item.title}}</p></a>
//             <div class="home-post-detail">
//               <img :src="item.imgUrl" alt class>
//               <div>
//                 <strong>{{item.name}}</strong>
//                 <p>{{item.time}}</p>
//               </div>
//             </div>
//             <p class="home-post-content">'{{item.content}}'</p>
//           </div>

//           <div class="btn-area">
//             <a-pagination
//               :defaultCurrent="currentPage"
//               :defaultPageSize="kolsPerPage"
//               :total="kolsTotal"
//               @change="onPageChange"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </template>

// <script>
// import axios from "axios";
// import apiConfig from "@/config";
// import PageHeader from "@components/PageHeader";
// import MainNav from "@components/MainNav";
// import { Spin} from "ant-design-vue";
// import { mapState } from "vuex";
// import commonJs from '@javascripts/common.js';
// export default {
//   name: "socialListening",
//   components: {
//     PageHeader,
//     MainNav,
//     ASpin: Spin
//   },
//   created() {
//     // weibo
//     this.socialWeibo(this.totalParams);
//     // weixin
//     // this.socialWeixin(this.totalParams);
//   },
//   computed: {
//     ...mapState(["authorization"])
//   },
//   data() {
//     return {
//       source: '1',
//       topic: '',
//       postType: 0,
//       currentPage: 0,
//       kolsPerPage: 10,
//       kolsTotal: 0,
//       totalParams: {
//         page_no: 0,
//         page_size: 10,
//         start_date: commonJs.cPastSevenDays,
//         end_date: commonJs.cPastOneday,
//         OR_keywords: "adidas",
//       },
//       itemList: []
//     };
//   },
//   methods: {
//     // weibo
//     socialWeibo(params) {
//       const _that = this;
      
//       axios
//         .post(apiConfig.socialWeibo, params, {
//           headers: {
//             Authorization: _that.authorization
//           }
//         })
//         .then(function(res) {
//           if (res.status === 200) {
//             console.log('我是微博', res);
//             res.data.data.forEach(element => {
//               element.imgUrl = element.avatar_url;
//               element.title = element.title;
//               element.name = element.profile_name;
//               element.url = element.url;
//               element.time = element.index_time;
//               element.content = element.content;
//             });
//             _that.itemList = res.data.data
//           }
//         })
//         .catch(function(error) {
//           console.log(error);
//         });
//     },
//     // weixin
//     socialWeixin(params) {
//       const _that = this;
//       _that.itemList = [];
//       axios
//         .post(apiConfig.socialWeixin, params, {
//           headers: {
//             Authorization: _that.authorization
//           }
//         })
//         .then(function(res) {
//           if (res.status === 200) {
//             console.log('我是微信', res);
//             res.data.data.forEach(element => {
//               element.imgUrl = element.avatar_url;
//               element.title = element.title;
//               element.name = element.profile_name;
//               element.url = element.url;
//               element.time = element.index_time;
//               element.content = element.content;
//             });
//             _that.itemList = res.data.data
//           }
//         })
//         .catch(function(error) {
//           console.log(error);
//         });
//     },
//     totalSearch() {

//     },
//     onPageChange (page) {
//       console.log(page);
//     }
//   }
// };
// </script>

// <style lang="scss" scoped>
// .socail-container {
//   width: 980px;
//   min-height: 580px;
//   .form-group{
//     padding-right: 10px;
//   }
// }
// .social-search, .social-content{
//   background: $white;
//   padding: 30px;
//   box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.08);
// }
// .home-post-title {
//   color: nth($purple, 1);
//   @include limit-line(1);
//   font-size: $font-nm-s;
// }
// .home-post-content {
//   @include limit-line(3);
//   font-size: $font-sm;
//   line-height: 20px;
// }
// </style>
