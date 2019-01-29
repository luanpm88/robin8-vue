<template>
  <div class="kol-list-wrap">
    <h5>Enter a keyword, category or KOL</h5>
    <div class="kol-search"></div>
    <div class="kol-advance">
      <div class="kol-advance-btn">
        <span>Advanced Search</span>
      </div>
      <div class="kol-advance-box clearfix">
        <div class="kol-advance-line col-xs-6">
          <span class="kol-advance-left col-xs-5">KOL industries:</span>
          <select class="col-xs-6 oneselect">
            <option value="1">beauity</option>
            <option value="2">book</option>
          </select>
        </div>
        <div class="kol-advance-line col-xs-6">
          <span class="kol-advance-left col-xs-5">Engagement:</span>
          <input class="col-xs-3 oneinput">
          <b class="col-xs-1">-</b>
          <input class="col-xs-3 oneinput">
        </div>
        <div class="kol-advance-line col-xs-6">
          <span class="kol-advance-left col-xs-5">Keywords:</span>
          <input class="col-xs-6 oneinput"/>
        </div>
        <div class="kol-advance-line col-xs-6">
          <span class="kol-advance-left col-xs-5">Followers:</span>
          <input class="col-xs-3 oneinput"/>
          <b class="col-xs-1">-</b>
          <input class="col-xs-3 oneinput"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.oneinput, .oneselect{
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
}
.kol-advance {
  width: 60%;
  margin: 0px auto;
}
.kol-advance-line {
  margin-bottom: 20px;
}
.kol-advance-left {
  line-height: 34px;
  text-align: right;
}
.kol-advance-btn {
  text-align: center;
}
.kol-advance-box {
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
  .oneinput{
    padding: 0px 10px;
  }
}
</style>