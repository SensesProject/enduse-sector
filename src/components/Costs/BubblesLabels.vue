<template>
  <g class="labels">
    <line :x2="xPos" :x1="xScale(2020)" :y1="yPos" :y2="yPos"/>
    <text :x="xPos - radius" :y="yPos - radius - 20" class="ej shadow">{{labels[0]}} Bn/$
      <tspan :x="xPos - radius" :y="yPos - radius - 5">{{labels[1]}} Ej/y</tspan>
    </text>
    <text :x="xPos - radius" :y="yPos - radius - 20" class="ej">{{labels[0]}} Bn/$
      <tspan :x="xPos - radius" :y="yPos - radius - 5">{{labels[1]}} Ej/y</tspan>
    </text>
    <text :x="xPos -15" :y="scale(0) + 20" class="year">{{labels[2]}}</text>
  </g>
</template>

<script>

export default {
  name: 'CostsLabels',
  props: {
    xPos: {
      type: Number
    },
    yPos: {
      type: Number
    },
    radius: {
      type: Number
    },
    scale: {
      type: Function
    },
    xScale: {
      type: Function
    },
    labels: {
      type: Array
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";

text.shadow {
  stroke: white;
  stroke-width: 10px;
}

line {
 stroke: black;
}
</style>
