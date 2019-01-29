<template>
  <div class="kol-list-wrap">
    <h5>Enter a keyword, category or KOL</h5>
    <div class="kol-search clearfix">
      <input type="text" placeholder="please input">
      <select class="oneselect">
        <option value="1">Keyword</option>
        <option value="2">Category</option>
      </select>
      <span class="kol-search-btn">
        Search
      </span>
    </div>
    <div class="kol-advance">
      <div class="kol-advance-btn">
        <span @click="showMoreSearch">Advanced Search</span>
      </div>
      <div class="kol-advance-box clearfix" v-if="advancedSearch">
        <div class="kol-advance-line col-xs-6">
          <span class="kol-advance-left col-xs-4">KOL industries:</span>
          <select class="col-xs-6 oneselect">
            <option value="1">beauity</option>
            <option value="2">book</option>
          </select>
        </div>
        <div class="kol-advance-line col-xs-6">
          <span class="kol-advance-left col-xs-4">Engagement:</span>
          <input class="col-xs-3 oneinput">
          <b class="col-xs-1">-</b>
          <input class="col-xs-3 oneinput">
        </div>
        <div class="kol-advance-line col-xs-6">
          <span class="kol-advance-left col-xs-4">Keywords:</span>
          <input class="col-xs-6 oneinput">
        </div>
        <div class="kol-advance-line col-xs-6">
          <span class="kol-advance-left col-xs-4">Followers:</span>
          <input class="col-xs-3 oneinput">
          <b class="col-xs-1">-</b>
          <input class="col-xs-3 oneinput">
        </div>
        <div class="kol-advance-line col-xs-6">
          <span class="kol-advance-left col-xs-4">KOL type:</span>
          <div class="col-xs-8 kol-type">
            <label>
              <input type="checkbox">
              <span>People</span>
            </label>
            <label>
              <input type="checkbox">
              <span>Commercial</span>
            </label>
          </div>
        </div>
        <div class="kol-advance-line col-xs-6">
          <span class="kol-advance-left col-xs-4">Influence:</span>
          <input class="col-xs-3 oneinput">
          <b class="col-xs-1">-</b>
          <input class="col-xs-3 oneinput">
        </div>
        <div class="kol-advance-line kol-advance-bottom">
          <div class="kol-type">
            <label>
              <input type="checkbox">
              <span>Only display KOLs that are registered at Robin8</span>
            </label>
          </div>
        </div>
        <div class="form-group text-center">
          <button type="button" class="btn btn-blue btn-outline">Search</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      advancedSearch: false
    };
  },
  methods: {
    showMoreSearch() {
      this.advancedSearch = !this.advancedSearch;
    }
  }
};
</script>
<style lang="scss" scoped>
span{
  display: inline-block;
}
.oneinput,
.oneselect {
  height: 34px;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ebedf2;
  border-radius: 4px;
}
.kol-list-wrap {
  background: $white;
  box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.08);
  padding: 40px 0px 30px;
  h5{
    line-height: 20px;
    font-size: 1.8rem;
    font-weight: 400;
    color: #575962;
    text-align: center;
  }
  .form-group{
    button{
      border-radius: 20px;
    }
  }
}
.kol-advance{
  width: 700px;
  margin: 0px auto;
}
.kol-advance-line {
  margin-bottom: 15px;
}
.kol-advance-left {
  line-height: 34px;
  text-align: right;
}
.kol-advance-btn {
  text-align: center;
  padding: 30px 0px 0px;
  span{
    color: nth($purple, 1);
    border-bottom: 1px solid nth($purple, 1);
    font-size: $font-nm;
    cursor: pointer;
  }
}
.kol-advance-box {
  padding-top: 30px;
  .col-xs-6,
  .col-xs-3,
  .col-xs-1 {
    padding: 0px;
  }
  .col-xs-1 {
    text-align: center;
    line-height: 34px;
    font-weight: normal;
  }
  .oneinput {
    padding: 0px 10px;
  }
}
.kol-type {
  span {
    line-height: 34px;
  }
}
.kol-advance-bottom{
  text-align: center;
  .kol-type {
    display: inline-block;
  }
}
.kol-search{
  position: relative;
  width: 642px;
  margin: 30px auto 0px;
  select{
    float: left;
    padding-left: 20px;
  }
  .oneselect{
    width: 13%;
    border-left: 0px;
    padding-top: 2px;
  }
  input{
    width: 75%;
    padding-left: 10px;
    float: left;
    margin-right: -3px;
    height: 34px;
    color: #555;
    background-color: #fff;
    border-left: 1px solid #ebedf2;
    border-top: 1px solid #ebedf2;
    border-bottom: 1px solid #ebedf2;
    border-right: 1px solid transparent;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
}
.kol-search-btn{
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  margin-left: -2px;
  top: 0px;
  float: left;
  width: 12%;
  background: nth($purple, 1);
  color: $white;
  line-height: 34px;
  text-align: center;
  cursor: pointer;
}
</style>