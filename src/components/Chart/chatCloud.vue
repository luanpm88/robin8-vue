<!--  -->
<template>
<div>
    <wordcloud
    :data="defaultWords"
    nameKey="name"
    valueKey="value"
    :color="myColors"
    :showTooltip="false"
    :wordClick="wordClickHandler"
    :wordPadding="3"
    :fontSize="fontSize"
    :font="fontFamily"
    :style="{'height': height}"
    :margin="margin"
    :rotate="rotated"
    >
    </wordcloud>
</div>
</template>

<script>
import wordcloud from 'vue-wordcloud'
export default {
  props: {
    defaultWords: {
      type: Array,
      default: []
    },
    height: {
      type: String,
      required: true
    },
  },
  components: {
    wordcloud
  },
  methods: {
    wordClickHandler(name, value, vm) {
      // console.log('wordClickHandler', name, value, vm);
    }
  },
  data() {
    return {
      fontSize: [14, 30],
      margin: {top: 0, right: 0, bottom: 0, left: 0},
      rotated: {from: 0, to: 0 },
      fontFamily: '微软雅黑',
      myColors: [
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF",
        "#272F93FF",
        "#272F9380",
        "#7F3BC0FF"
      ],
    }
  }
}

</script>
<style>
</style>