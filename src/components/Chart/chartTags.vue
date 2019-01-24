<template>
<div class="chart-tag">
  <svg :width="width" :height="height">
    <a v-for="(tag,index) in tags" :key="index" style="cursor:none;" @mousemove='listener($event)'>
      <text
        :x="tag.x"
        :y="tag.y"
        :font-size="20 * (600/(800-tag.z))"
        :fill-opacity="((400+tag.z)/600)"
        :fill="colorList[index]"
      >{{tag.text}}</text>
    </a>
  </svg>
</div>
</template>
<script>
import TagsBall from "vue-tags-ball";
// var Color = require("color");
let Animation = function() {
  this.running = false;
};
Animation.prototype = {
  stop: function() {},
  start: function() {}
};
export default {
  name: "tags-ball",
  install: function(vue) {
    vue.component(this.name, this);
  },
  props: {
    tags: {
      type: Array,
      default: []
    }
  },
  // components: { TagsBall },
  data() {
    return {
      width: 940,
      height: 520,
      tagsNum: 20,
      RADIUS: 300,
      speedX: Math.PI / 360,
      speedY: Math.PI / 360,
      // tags: [],
      animation: new Animation(),
      colorList: [
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
        "#7F3BC0FF"
      ]
    };
  },
  computed: {
    CX() {
      return this.width / 2;
    },
    CY() {
      return this.height / 2;
    }
  },
  created() {
    this.init_ball(this.tags);
  },
  watch: {
    tags: function(valTag) {
      this.init_ball(valTag);
    },
  },
  mounted() {
    // //使球开始旋转
    // setInterval(() => {
    //   this.rotateX(this.speedX);
    //   this.rotateY(this.speedY);
    // }, 17);
  },
  methods: {
    init_ball(valTag) {
      valTag.forEach((item, index) => {
        item.text = item.text;
        let k = -1 + (2 * (index + 1) - 1) / valTag.length;
        let a = Math.acos(k);
        let b = a * Math.sqrt(valTag.length * Math.PI);
        item.x = this.CX + this.RADIUS * 1.3 * Math.sin(a) * Math.cos(b);
        item.y = this.CY + this.RADIUS / 1.3 * Math.sin(a) * Math.sin(b);
        item.z = this.RADIUS / 10 * Math.cos(a);
      });
    },
    rotateX(speedX) {
      var cos = Math.cos(speedX);
      var sin = Math.sin(speedX);
      for (let tag of this.tags) {
        var y1 = (tag.y - this.CY) * cos - tag.z * sin + this.CY;
        var z1 = tag.z * cos + (tag.y - this.CY) * sin;
        tag.y = y1;
        tag.z = z1;
      }
    },
    rotateY(speedY) {
      var cos = Math.cos(speedY);
      var sin = Math.sin(speedY);
      for (let tag of this.tags) {
        var x1 = (tag.x - this.CX) * cos - tag.z * sin + this.CX;
        var z1 = tag.z * cos + (tag.x - this.CX) * sin;
        tag.x = x1;
        tag.z = z1;
      }
    },
    listener(event) {
      //响应鼠标移动
      var x = event.clientX - this.CX;
      var y = event.clientY - this.CY;
      this.speedX =
        x * 0.0001 > 0
          ? Math.min(this.RADIUS * 0.00002, x * 0.0001)
          : Math.max(-this.RADIUS * 0.00002, x * 0.0001);
      this.speedY =
        y * 0.0001 > 0
          ? Math.min(this.RADIUS * 0.00002, y * 0.0001)
          : Math.max(-this.RADIUS * 0.00002, y * 0.0001);
    }
  }
};
</script>
<style>
.chart-tag{
  width: 940;
  margin: 0px auto;
}
</style>

