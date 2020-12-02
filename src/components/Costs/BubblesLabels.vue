<template>
  <g class="labels" :class="`${labels[1]}-label`">
    <line :x2="xPos" :x1="xScale(2020)" :y1="yPos" :y2="yPos" class="year"/>
    <text :x="xPos - radius" :y="yPos - radius - 30" class="ej shadow">{{labels[0]}} Bn/$
      <tspan :x="xPos - radius" :y="yPos - radius - 10" class="shadow">{{labels[1]}} Ej/y</tspan>
    </text>
    <text :x="xPos - radius" :y="yPos - radius - 30" class="ej">{{labels[0]}} Bn/$
      <tspan :x="xPos - radius" :y="yPos - radius - 10">{{labels[1]}} Ej/y</tspan>
    </text>
    <text :x="xPos -15" :y="scale(0) + 15" class="year">{{labels[2]}}</text>
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

text.year {
  font-size: 12px;
  fill: gray;
}

text.shadow {
  fill: none;
  stroke: white;
  stroke-width: 8px;
}

tspan.shadow {
    fill: none;
    stroke: white;
    stroke-width: 8px;
}

line.year {
 stroke: black;
}
</style>
