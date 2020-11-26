<template>
  <div class="final-energy" ref="inWrapper">
    <div class="key" :class=" mobile ? 'mobile' : 'desktop'">
      <h3>Final energy use in Ej/yr<span class="model-label">(Model: REMIND-MAgPIE)</span></h3>
      <p class="selectors">
        <SensesSelect class="scenario_selector" :options="scenarios" v-model="currentScenario"/>
        <SensesSelect class="region_selector" :options="regions" v-model="currentRegion"/>
      </p>
    </div>
    <div></div>
    <svg :width="innerWidth" :height="innerHeight" :transform="`translate(0, 0)`">
      <g v-for="(group, g) in dots" v-bind:key="g + 'grou' + 'header'" :class="`${labels[g]}-group`" :transform="`translate(${headerPosition[g]}, 0)`">
      <text class="sectorHeader" :x="scale.x(2009)" y="10">{{ enduse[g] }}</text>
      </g>
      <g v-for="(group, g) in dots" v-bind:key="g + 'group'" :class="`${labels[g]}-group`" :transform="`translate(${horizontalPosition[g]}, ${groupPosition[g]})`">
        <!-- draws dots for energy carrier with index g   -->
        <circle v-for="(dot, d) in group" v-bind:key="d + 'dot'" @mouseover="[active = true, over = d + labels[g]]" @mouseleave="active = false" :class="labels[g]" :cx="dot.year" cy="5" :r="dot.value"/>
        <!-- labels for energy carrier g-->
      <!-- labels for energy carrier -->
        <text class="carrier-labels" :x="scale.x(2009)" y="50">{{ labels[g] }}</text>
      </g>
      <g v-for="(group, g) in world" v-bind:key="g + 'wgroup'" :class="`${labels[g]}-wgroup`" :transform="`translate(${horizontalPosition[g]}, ${groupPosition[g]})`">
          <!--draws hotizontal axis line through dots and small circles at the beginning and end of axis -->
        <g class="axis_group">
          <line class="axis" y1="5" y2="5" :x1="scale.x(2010)" :x2="scale.x(2100)"/>
          <circle class="axis-dot" :cx="scale.x(2010)" cy="5" r="2.5"/>
          <circle class="axis-dot" :cx="scale.x(2100)" cy="5" r="2.5"/>
        </g>
        <g v-for="(text, t) in group" v-bind:key="t + 'text'" :class="active === true & over === t + labels[g] ? 'visible' : 'invisible'">
          <!-- draws little line with dot to indicate value and year of each dot -->
          <circle class="year-dot" :cx="text.year" cy="5" r="2.5"/>
          <text class="year-label" :x="text.year" y="20">{{ years[t] }}</text>
          <text class="year-label" :x="text.year" y="-35">{{ Math.round(text.value) }} Ej/year</text>
          <line class="line-label" :x1="text.year" :x2="text.year" y1="-25" y2="5"/>
        </g>
        <!-- draws dashed dots for world region -->
        <circle v-for="(dot, d) in group" v-bind:key="d + 'wdot'" @mouseover="[active = true, over = d + labels[g]]" @mouseleave="active = false" class="world" :class="labels[g]" :cx="dot.year" cy="5" :r="dot.value"/>
      </g>
    </svg>
  </div>
</template>

<script>
import _ from 'lodash'
import * as d3 from 'd3'

import FinalEnergy from 'dsv-loader!@/assets/data/FinalEnergy.csv' // eslint-disable-line import/no-webpack-loader-syntax
import SensesSelect from 'library/src/components/SensesSelect.vue'

export default {
  name: 'RiskPathway',
  components: {
    SensesSelect
  },
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    mobile: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      FinalEnergy,
      energy: _.groupBy(FinalEnergy, d => d.EnergySource),
      model: [...new Set(FinalEnergy.map(r => r.Model))],
      years: [...new Set(FinalEnergy.map(r => r.Year))],
      labels: ['Hydrogen', 'Gases', 'Electricity', 'Liquids', 'Hydrogen', 'Gases', 'Electricity', 'Liquids', 'Heat', 'Solids', 'Hydrogen', 'Gases', 'Electricity', 'Liquids', 'Heat', 'Solids'],
      enduse: [...new Set(FinalEnergy.map(r => r.Enduse))],
      regions: [...new Set(FinalEnergy.map(r => r.Region))],
      allValues: [...new Set(FinalEnergy.map(r => r.Value))],
      scenarios: ['1.5ºC', '2.0ºC', 'Current Policies'],
      scenDict: { '1.5ºC': 'NPi2020_400_V3', '2.0ºC': 'NPi2020_1000_V3', 'Current Policies': 'NPi_v3' },
      currentScenario: '1.5ºC',
      currentRegion: 'World',
      active: false,
      over: '',
      margin: {
        top: 10,
        bottom: 400,
        right: 10,
        left: 10
      },
      innerHeight: 0
    }
  },
  computed: {
    innerWidth () { return this.width - (this.margin.left + this.margin.right) },

    scenarioFilter () { return _.map(this.energy, (sc, s) => _.filter(sc, d => d.Scenario === this.scenDict[this.currentScenario])) },
    // filters over regioFilter Array, returns same array only with objects with CurrentEnduse
    // enduseFilter () { return _.map(this.scenarioFilter, (end, e) => _.filter(end, d => d.Enduse === this.currentEnduse)) },
    // filters over scenrioFilter Array, returns same array only with objects with CurrentRegion
    regionFilter () { return _.map(this.scenarioFilter, (re, r) => _.filter(re, d => d.Region === this.currentRegion)) },
    // filters over scenrioFilter Array, returns same array only with objects with region = World
    worldFilter () { return _.map(this.scenarioFilter, (re, r) => _.filter(re, d => d.Region === 'World')) },
    scale () {
      // domain-> observartio EJ/yr, range-> visual variable px
      return {
        x: d3.scaleLinear()
          .range([35, (this.innerWidth - (this.margin.right * 10)) / 3.1])
          .domain([2010, 2100]),
        y: d3.scaleLinear()
          .range([2, 230])
          .domain([d3.min(this.allValues), d3.max(this.allValues)])
      }
    },
    // dots returns an array with the size of regionFilter
    // with just that values for year and value in pixel
    dots () {
      return _.map(this.regionFilter, (energy, e) => {
        return _.map(energy, (single, s) => {
          return {
            year: this.scale.x(single.Year),
            value: this.scale.y(Math.sqrt(single.Value))
          }
        })
      })
    },
    world () {
      return _.map(this.worldFilter, (energy, e) => {
        return _.map(energy, (single, s) => {
          return {
            year: this.scale.x(single.Year),
            value: this.scale.y(Math.sqrt(single.Value))
          }
        })
      })
    },
    groupPosition () {
    // const dotsArray = this.dots
      let pos = -50
      let posTwo = -50
      let posThree = -50
      const positions = []
      _.map(this.regionFilter, (energy, e, l) => {
        if (e <= 3) {
          pos = pos + this.innerHeight / 6
          positions.push(pos)
        } else if (e >= 10) {
          posThree = posThree + this.innerHeight / 6
          positions.push(posThree)
        } else {
          posTwo = posTwo + this.innerHeight / 6
          positions.push(posTwo)
        }
      })
      return positions
    },
    horizontalPosition () {
      let pos = 0
      return _.map(this.regionFilter, (energy, e, l) => {
        if (e <= 3) { pos = 0 } else if (e >= 10) { pos = (this.innerWidth / 3) * 2 } else { pos = (this.innerWidth / 3) }

        return pos
      })
    },
    headerPosition () {
      let pos = 0
      return _.map(this.regionFilter, (energy, e, l) => {
        if (e === 0) { pos = 0 } else if (e === 1) { pos = (this.innerWidth / 3) } else { pos = (this.innerWidth / 3) * 2 }

        return pos
      })
    }
  },
  methods: {
    calcSizes () {
      const { inWrapper: el } = this.$refs
      if (el !== 'undefined') {
        const innerHeight = el.clientHeight || el.parentNode.clientHeight
        this.innerHeight = Math.max(innerHeight, 500)
      }
    }
  },
  mounted () {
    console.log('dots', this.dots)
    console.log('regionFilter', this.regionFilter)
    this.calcSizes()
    window.addEventListener('resize', this.calcSizes, false)
  },
  updated () {
    this.calcSizes()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calcSizes, false)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";
$margin-space: $spacing / 2;

.final-energy {
  // height: 170vh;
  height: 80%;
  .key {
    z-index: 9;
    width: 100%;
    height: 80px;
    margin-bottom: 1%;
    padding:  5px 0px;

    top: 50px;

    background: hsla(0,0%,100%,.90);

    h3 {
      margin-left: $margin-space*2;
      padding-bottom: $margin-space/4;
      display: inline-block;
      margin-right: $margin-space;
      font-size: 0.8em;
      .model-label    {
        color: getColor(neon, 40);
        font-weight: normal;
        display: inline;
        // margin-left: 10px;
        margin-left: $margin-space/2;
      }
    }
    a{
      margin-top: 5px;
      margin-left: 5px;
      fill: getColor(neon, 40);
      text-decoration: none;
      background: none;
      font-size: 0.8em;
    }
    .selectors {
      margin-left: $margin-space*2;
      display: inline-block;
      width: 65%;
      font-size: 0.8em;
    }
    .scenario_selector {
      margin-top: $margin-space;
      margin-right: $margin-space;
    }

    .v-popover {
      display: inline;
    }

    &.mobile {
        width: 90%;
        height: 150px;
        top: 100px;

      .selectors {
        width: 90%;
        margin-top: 15px;
        margin-left: 10px;
      }
    }
  }

  svg {
    .axis {
      stroke: $color-gray;
    }
    circle {
      fill: $color-gray;
      fill-opacity: 0.6;
      transition: r 0.5s;
    }
    .axis-dot {
      fill-opacity: 1;
    }
    .world {
      fill-opacity: 0.2;
      stroke-dasharray: 2 2;
    }
    g {
      .sectorHeader {
        //font-weight: 600;
      }
      .year-label {
        text-anchor: middle;
        fill: black;
        font-size: 10px;
        text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
      }
      .shadow-label {
        fill-opacity: 0.6;
        fill: white;
      }
      .carrier-labels {
        fill: $color-gray;
      }
      .line-label {
        stroke: $color-gray;
        stroke-width: 0.5;
      }
      .visible {
        opacity: 1;
        transition: opacity 0.5s;
      }
      .invisible {
        opacity: 0;
        transition: opacity 0.5s;
      }
    }
    .Electricity {
      fill: getColor(gray, 80);
      stroke: getColor(gray, 40);
    }
    .Gases {
      fill: getColor(red, 80);
      stroke: getColor(red, 40);
    }
    .Heat {
      fill: getColor(orange, 80);
      stroke: getColor(orange, 40);
    }
    .Liquids {
      fill: getColor(blue, 80);
      stroke: getColor(blue, 40);
    }
    .Hydrogen {
      fill: getColor(violet, 80);
      stroke: getColor(violet, 40);
    }
    .Solids {
      fill: lighten(#663333, 40);
      stroke: darken(#663333, 30);
    }
  }
}

</style>
