<template>
  <div class="help-container">
    <div class="panel default-panel help-panel">
      <div class="panel-head">
        <h5 class="title">{{$t('lang.router.help')}}</h5>
      </div>
      <div class="panel-body">
        <p>The influence score is a number between 0 and 1000 and indicates how influential the KOL is on a social platform. A higher influence score ensures a stronger amplification of a campaign.</p>
        <p>影响力分数是0到1000之间的数字，代表KOL在社交平台上的影响力。 较高的影响力分数可确保更有效地扩大活动。</p>
        <p>The following chart shows the statistical distribution of influence scores:</p>
        <p>下图显示了影响力分数的统计分布：</p>
        <br>
        <p><img src="@images/dataExplanation/chart.png" alt=""></p>
        <br>
        <p>The average influence score is ~350, and 80% of all users have an influence score smaller than 400. The distribution of higher-than-average influence scores (> 350) follows a classical long-tail distribution.</p>
        <p>平均影响分数为~350，并且所有用户中80％的影响分数小于400. 高于平均影响分数（> 350）的分布遵循经典的长尾分布。</p>

        <p>How do we calculate the influence score? It is aggregated from the engagement (likes, shares etc.) and social reach (numbers of fans, followers etc.) of a KOL and thus strongly correlates with these two metrics. To illustrate, the following table shows some examples of WeChat users with different influence scores and provides the average engagement as a reference:</p>
        <p>我们如何计算影响力分数？它是从KOL的参与度（喜欢，分享等）和社交范围（粉丝数量，追踪数量等）汇总而来，因此与这两个指标密切相关。 为了说明，下表显示了具有不同影响力分数的微信用户的一些示例，并提供了平均参与度作为参考：</p>

        <table class="default-table">
          <thead>
            <tr>
              <th>User 用户</th>
              <th class="text-center">Influence score 影响力分数</th>
              <th class="text-center">Average engagement per post 每篇文章的平均参与度</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>苏州预防接种</td>
              <td class="text-center">976 (high)</td>
              <td class="text-center">38335</td>
            </tr>
            <tr>
              <td>太阳幼稚园</td>
              <td class="text-center">208 (medium)</td>
              <td class="text-center">564</td>
            </tr>
            <tr>
              <td>学会聊天的男子</td>
              <td class="text-center">6 (low)</td>
              <td class="text-center">5</td>
            </tr>
          </tbody>
        </table>

        <h6 class="title">Brand mentions: </h6>
        <p>Number of times the brand was mentioned in our social channels in the last 7 days.</p>
        <h6 class="title">品牌提及：</h6>
        <p>在过去7天内，我们的社交渠道中提及该品牌的次数。</p>

        <h6 class="title">Brand sentiment: </h6>
        <p>The sentiment score is a number between 0 (very negative) and 1 (very positive). It indicates how positive or negative the perception of the brand was in the last 7 days.</p>
        <h6 class="title">品牌情绪：</h6>
        <p>情绪分数是0（非常消极）和1（非常积极）之间的数字。 它表明该品牌在过去7天内的积极或消极态度。</p>

        <h6 class="title">Influence score: </h6>
        <p>The influence score is aggregated from the engagement (likes, shares etc.) and social reach (numbers of fans, followers etc.) of a KOL. It indicates how influential the KOL is in the social space. A higher influence score ensures a stronger amplification of a campaign. </p>
        <h6 class="title">影响评分：</h6>
        <p>影响力得分来自KOL的参与（喜欢，分享等）和社交范围（粉丝，粉丝的数量等）。 它表明了KOL在社交空间中的影响力。较高的影响力分数可确保更有效地扩大活动。</p>

        <h6 class="title">Performance (CPC): </h6>
        <p>The performance is measured in terms of CPC (cost-per-click).</p>
        <h6 class="title">绩效（CPC）：</h6>
        <p>性能以CPC（每次点击费用）衡量。</p>

        <h6 class="title">Keywords:</h6>
        <p>The tag cloud shows keywords (brands, products, locations and other attributes) that frequently occur in the content of the KOL. </p>
        <h6 class="title">关键字：</h6>
        <p>标签云显示KOL内容中经常出现的关键字（品牌，产品，位置和其他属性）。</p>

        <h6 class="title">Number of clients: </h6>
        <p>The number of clients that this KOL works for. A high number of clients indicates a track record that proves the amplification potential of a KOL. On the other hand, a KOL who has not worked for other brands yet or worked only for a few brands might be an attractive and economic choice since he does not yet have a reputation of producing commercial content.</p>
        <h6 class="title">客户数量：</h6>
        <p>此KOL适用的客户端数量。 大量客户表示跟踪记录证明了KOL的放大潜力。另一方面，一个尚未为其他品牌工作或仅为少数品牌工作的KOL可能是一个有吸引力和经济的选择，因为他还没有生产商业内容的声誉。</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apiConfig from '@/config'

export default {
  name: 'Help',
  components: {
  },
  data () {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
.help-container {
  padding: 0 100px 30px;
}
.help-panel {
  line-height: 2;
  .panel-body {
    padding: 40px;
    text-align: justify;
    .title {
      margin-top: 30px;
      font-size: $font-nm-b;
    }
    * {
      max-width: 100%;
    }
  }
}
</style>
