<template>
  <g>
    <text transform="rotate(90, 60, 170)">Costs in Bn/$</text>
    <g v-for="(tick, t) in data" :key="t">
      <line :x1="xScale(2020)" :x2="xScale(2100)" :y1="scale(tick)" :y2="scale(tick)" stroke="black"/>
      <text x="0" :y="scale(tick)">{{tick / 1000000000}}</text>
    </g>
    <text v-show="active === true" :x="xScale(2020) +15" :y="scale(0) + 15">2020</text>
    <text v-show="active === true" :x="xScale(2100) +15" :y="scale(0) + 15">2100</text>
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
    },
    active: {
      type: Boolean
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
    transition: y1 0.5, y2 0.5;
  }

  text {
    font-size: 10px;
    fill: gray;
    text-anchor: end;
  }
}
</style>
