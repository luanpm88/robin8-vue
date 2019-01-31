<template>
  <div class="chart-tag">
    <svg :width="width" :height="height">
      <a v-for="(tag,index) in tags" :key="index">
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
export default {
  name: "tags-ball",
  props: {
    taglist: {
      type: Array,
      default: []
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      RADIUS: 300,
      speedX: Math.PI / 360,
      speedY: Math.PI / 360,
      tags: [],
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
    //初始化标签位置
    this.init_ball(this.taglist);
  },
  mounted() {
    //使球开始旋转
    setInterval(() => {
      this.rotateX(this.speedX);
      this.rotateY(this.speedY);
    }, 100);
  },
  watch: {
    taglist: function(valTag) {
      this.init_ball(valTag);
    },
  },
  methods: {
    init_ball(valTag) {
      let tags = [];
      for (let i = 0; i < valTag.length; i++) {
        let tag = {};
        let k = -1 + (2 * (i + 1) - 1) / valTag.length;
        let a = Math.acos(k);
        let b = a * Math.sqrt(valTag.length * Math.PI);
        tag.text = valTag[i].text;
        tag.x = this.CX + this.RADIUS * Math.sin(a) * Math.cos(b);
        tag.y = this.CY + this.RADIUS * Math.sin(a) * Math.sin(b);
        tag.z = this.RADIUS * Math.cos(a);
        tag.href = "https://imgss.github.io";
        tags.push(tag);
      }
      this.tags = tags;
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

