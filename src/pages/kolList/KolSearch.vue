<template>
  <div class="kol-list-wrap">
    <h5>Enter a keyword, category or KOL</h5>
    <div class="kol-search">
      <!-- <a-select defaultValue="lucy" style="width: 120px">
        <a-select-option value="jack">Jack</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
        <a-select-option value="disabled" disabled>Disabled</a-select-option>
        <a-select-option value="Yiminghe">yiminghe</a-select-option>
      </a-select> -->
      
    </div>
    <div class="kol-advance">
      <div class="kol-advance-btn"><span>Advanced Search</span></div>
      <div class="kol-advance-box clearfix">
        <div class="kol-advance-line col-xs-6">
          <span class="kol-advance-left col-xs-5">KOL industries:</span>
          <a-select class="col-xs-6"></a-select>
        </div>
        <div class="kol-advance-line col-xs-6">
          <span class="kol-advance-left col-xs-5">Engagement:</span>
          <a-input class="col-xs-3"/>
          <b class="col-xs-1">-</b>
          <a-input class="col-xs-3"/>
        </div>
        <div class="kol-advance-line col-xs-6">
          <span class="kol-advance-left col-xs-5">Keywords:</span>
          <a-input class="col-xs-6"/>
        </div>
        <div class="kol-advance-line col-xs-6">
          <span class="kol-advance-left col-xs-5">Followers:</span>
          <a-input class="col-xs-3"/>
          <b class="col-xs-1">-</b>
          <a-input class="col-xs-3"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Input, Select } from "ant-design-vue";
export default {
  components: { AInput: Input, ASelect: Select},
  data () {
    return {

    };
  },
}
</script>
<style lang="scss" scoped>
.kol-list-wrap{
  background: $white;
  box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.08);
}
.kol-advance{
  width: 60%;
  margin: 0px auto;
}
.kol-advance-line{
  margin-bottom: 20px;
}
.kol-advance-left{
  line-height: 34px;
  text-align: right;
}
.kol-advance-btn{
  text-align: center;
}
.kol-advance-box{
  .col-xs-6,.col-xs-3,.col-xs-1{
    padding: 0px;
  }
  .col-xs-1{
    text-align: center;
    line-height: 34px;
    font-weight: normal;
    // 3.3.4
  }
}
</style>