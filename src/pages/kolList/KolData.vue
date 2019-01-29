<template>
  <div class="kol-data-wrap mt20">
    <div class="kol-data-table">
      <a-table :columns="allColumns" :dataSource="allData" :pagination="false">
        <template slot="profile" slot-scope="profile">
          <div class="kol-profile clearfix">
            <img :src="profile.imgurl" alt class="col-xs-3">
            <div class="kol-show col-xs-9">
              <p>
                {{profile.name}}
                <i v-if="profile.sex === 0" class="iconfont icon-nanxing" style="color:#096dd9;"></i>
                <i v-else class="iconfont icon-nvxing" style="color:#f36dbb"></i>
              </p>
              <div class="desc">{{profile.desc}}</div>
              <div>
                <span><i class="iconfont icon-like"></i>{{profile.like}}</span>
                <span><i class="iconfont icon-app"></i>{{profile.commond}}</span>
              </div>
            </div>
          </div>
        </template>
        <template slot="influence" slot-scope="influence">
          <a-progress type="circle" :percent="influence" :width="100" :strokeWidth="9" strokeColor="#b37feb" :format="() => influence + '%'"/>
        </template>
        <template slot="relevance" slot-scope="relevance">
          <a-progress type="circle" :percent="relevance" :width="100" :strokeWidth="9" strokeColor="#b37feb" :format="() => relevance + '%'"/>
        </template>
      </a-table>
    </div>
    <div class="form-group text-center">
      <button type="button" class="btn btn-blue btn-outline">Show more</button>
    </div>
  </div>
</template>

<script>
import { Table, Progress } from "ant-design-vue";
export default {
  components: { ATable: Table, AProgress: Progress},
  data() {
    return {
      allColumns: [
        {
          title: "Profile",
          align: "center",
          width: 250,
          dataIndex: "profile",
          scopedSlots: { customRender: "profile" }
        },
        {
          title: "R8 KOL",
          align: "center",
          dataIndex: "kol"
        },
        {
          title: "Influence",
          align: "center",
          width: 180,
          dataIndex: "influence",
          scopedSlots: { customRender: "influence" }
        },
        {
          title: "Relevance",
          align: "center",
          dataIndex: "relevance",
          width: 180,
          scopedSlots: { customRender: "relevance" }
        }
      ],
      allData: [
        {
          profile: {
            imgurl:
              "https://tva2.sinaimg.cn/crop.140.80.964.964.50/7a347ce5jw1elvvf5gm08j20xp13ltup.jpg",
            name: "改装世界",
            desc:
              "话说，我们很熟悉Vogue的封面女郎，一水儿都是华服搭配大明星、超级模特的绝世美颜和完美的身体（辣眼睛的台湾版除外）。但是捷克版Vogue今年九月份创刊，第一期的封面让人实在吃惊。仅仅一张大露背特写，就仿佛有着说不尽的风情和故事。它是在向捷克斯洛伐克的最后一位第一夫人、捷克共和国的第一位第一夫人Olga Havlová致敬，灰白色的短发正是她的标志。",
            sex: 0,
            like: 233,
            commond: 344
          },
          kol: "yes",
          influence: 73,
          relevance: 99
        },
        {
          profile: {
            imgurl:
              "http://wx.qlogo.cn/mmhead/Q3auHgzwzM50gbw25G3YcyhbA2K5ibrFs1Q3rtDjPJWrSzRT9lFO3BA/132",
            name: "Janmy Chen",
            desc:
              "仅仅一张大露背特写，就仿佛有着说不尽的风情和故事。它是在向捷克斯洛伐克的最后一位第一夫人、捷克共和国的第一位第一夫人Olga Havlová致敬，灰白色的短发正是她的标志。",
            sex: 1,
            like: 433,
            commond: 544
          },
          kol: "yes",
          influence: 100,
          relevance: 10
        },{
          profile: {
            imgurl:
              "http://wx.qlogo.cn/mmhead/Q3auHgzwzM5aFibS5ibmHdfDsFibw22DxjdOqNGWgebOwIylw07xWUubQ/132",
            name: "Janmy Chen",
            desc:
              "百年前，宝马品牌正式成立，那时正处于第一次世界大战结束前的2年，1918年后，德国签署凡尔赛条约，192",
            sex: 1,
            like: 433,
            commond: 544
          },
          kol: "No",
          influence: 40,
          relevance: 20
        },{
          profile: {
            imgurl:
              "http://wx.qlogo.cn/mmhead/Q3auHgzwzM7SXMiaYLiaW0tJKsgiaWfQCd4UJY9lnq8BqR7MaibHH6oQ7A/132",
            name: "Janmy Chen",
            desc:
              "果你是一个宝马车主又痴迷于改装，那么最好的方案就是选择M performance高性能套件了，不仅性能强，与宝马的车型还有完美匹配的特性",
            sex: 0,
            like: 43,
            commond: 844
          },
          kol: "yes",
          influence: 60,
          relevance: 80
        },
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.kol-data-wrap {
  background: $white;
  box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.08);
  padding: 20px 30px;
  .form-group{
    margin-top: 20px;
    button{
      border-radius: 20px;
    }
  }
}
.kol-profile {
  width: 350px;
  .col-xs-3{
    padding: 0px;
  }
  img{
    margin-top: 23px;
    border-radius: 50%;
  }
}
.kol-show{
  text-align: left;
  p{
    line-height: 35px;
    i{
      vertical-align: -1px;
    }
  }
  .desc {
    overflow: hidden;
    -webkit-line-clamp: 3;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  div{
    span{
      width: 25%;
      display: inline-block;
      margin: 10px 0px 0px;
      i{
        margin-right: 2px;
        vertical-align: -1px;
      }
    }
  }
}
</style>