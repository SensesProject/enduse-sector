<template>
  <g>
    <g v-for="(tick, t) in data" :key="t">
      <line :x1="xScale(2020)" :x2="xScale(2100)" :y1="scale(tick)" :y2="scale(tick)" stroke="black"/>
      <text x="0" :y="scale(tick)">{{tick / 1000000000}}</text>
    </g>
  </g>
</template>

<script>

export default {
  name: 'CostsTicks',
  props: {
    data: {
      type: Array
    },
    scale: {
      type: Function
    },
    xScale: {
      type: Function
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";

g {
  line {
    stroke: gray;
    stroke-dasharray: 1 2;
  }

  text {
    text-anchor: end;
  }
}
</style>
