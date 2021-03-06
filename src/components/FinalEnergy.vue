<template>
  <div class="final-energy" ref="inWrapper">
    <div class="key" :class=" mobile ? 'mobile' : 'desktop'">
      <h3>Final energy use in TWh/yr<span class="model-label">(Model: REMIND-MAgPIE)</span></h3>
      <p class="selectors">
        <SensesSelect class="scenario_selector" :options="scenarios" v-model="currentScenario"/>
        <SensesSelect class="region_selector" :options="regions" v-model="currentRegion"/>
        <span class="legend">
          <span class="dot"></span>
          <span > = 5 000 TWh/yr</span>
          <span class="dot" id="world"></span>
          <span > World (reference)</span>
        </span>
      </p>
    </div>
    <div></div>
    <svg :width="innerWidth" :height="innerHeight" :transform="`translate(0, 0)`">
      <g v-for="(group, g) in dots" v-bind:key="g + 'grou' + 'header'" :class="`${labels[g]}-group`" :transform="`translate(${headerPosition[g]}, 0)`">
      <text :class="`${enduse[g]}-labels`" :x="scale.x(2004)" y="10">{{ enduse[g] }}</text>
      <g v-for="(text, t) in group" :key="t + 'text'" >
          <g v-if="t == 0 || t == 9">
          <text class="year-label" :x="text.year" y="30">{{ years[t] }}</text>
          </g>
        </g>
      </g>
      <g v-for="(group, g) in dots" v-bind:key="g + 'group'" :class="`${labels[g]}-group`" :transform="`translate(${horizontalPosition[g]}, ${groupPosition[g]})`">
        <!-- draws dots for energy carrier with index g   -->
        <circle v-for="(dot, d) in group" v-bind:key="d + 'dot'" @mouseover="[active = true, over = d + labels[g]]" @mouseleave="active = false" :class="labelsColors[g]" :cx="dot.year" cy="5" :r="dot.value"/>
        <!-- labels for energy carrier g-->
      <!-- labels for energy carrier -->
        <text class="carrier-labels" :x="scale.x(2009)" y="40">{{ labels[g] }}</text>
      </g>
      <g v-for="(group, g) in world" v-bind:key="g + 'wgroup'" :class="`${labels[g]}-wgroup`" :transform="`translate(${horizontalPosition[g]}, ${groupPosition[g]})`">
          <!--draws hotizontal axis line through dots and small circles at the beginning and end of axis -->
        <g class="axis_group">
          <line class="axis" y1="5" y2="5" :x1="scale.x(2010)" :x2="scale.x(2100)"/>
          <circle class="axis-dot" :cx="scale.x(2010)" cy="5" r="2.5"/>
          <circle class="axis-dot" :cx="scale.x(2100)" cy="5" r="2.5"/>
        </g>
        <circle v-for="(dot, d) in group" v-bind:key="d + 'wdot'" @mouseover="[active = true, over = d + labels[g]]" @mouseleave="active = false" class="world" :class="labelsColors[g]" :cx="dot.year" cy="5" :r="dot.value"/>
        <g v-for="(text, t) in group" v-bind:key="t + 'text'" :class="active === true & over === t + labels[g] ? 'visible' : 'invisible'">
          <!-- draws little line with dot to indicate value and year of each dot -->
          <circle class="year-dot" :cx="text.year" cy="5" r="2.5"/>
          <text class="year-label" :x="text.year" y="20">{{ years[t] }}</text>
          <text class="year-label" :x="text.year" y="-35">{{ format(Math.round(text.valueTWh)) }} TWh/yr</text>
          <line class="line-label" :x1="text.year" :x2="text.year" y1="-25" y2="5"/>
        </g>
        <!-- draws dashed dots for world region -->
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
      // labelsData: [...new Set(FinalEnergy.map(r => r.EnergySource))],
      labels: ['Hydrogen', 'Gases', 'Electricity', 'Liquids', 'Hydrogen', 'Gases', 'Electricity', 'Liquids', 'Heat', 'Solids', 'Hydrogen', 'Gases', 'Electricity', 'Liquids', 'Heat', 'Solids'],
      labelsColors: ['HydrogenTrans', 'GasesTrans', 'ElectricityTrans', 'LiquidsTrans', 'HydrogenRyc', 'GasesRyc', 'ElectricityRyc', 'LiquidsRyc', 'HeaRyct', 'SolidsRyc', 'HydrogenIndus', 'GasesIndus', 'ElectricityIndus', 'LiquidsIndus', 'HeatIndus', 'SolidsIndus'],
      enduse: ['Transport', 'Buildings', 'Industry'],
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
            value: this.scale.y(Math.sqrt(single.Value)),
            valueTWh: single.Value * 277.78 // conversion from EJ to TWh
          }
        })
      })
    },
    world () {
      return _.map(this.worldFilter, (energy, e) => {
        return _.map(energy, (single, s) => {
          return {
            year: this.scale.x(single.Year),
            value: this.scale.y(Math.sqrt(single.Value)),
            valueTWh: single.Value * 277.78 // conversion from EJ to TWh
          }
        })
      })
    },
    groupPosition () {
    // const dotsArray = this.dots
      let pos = -35
      let posTwo = -35
      let posThree = -35
      const positions = []
      _.map(this.regionFilter, (energy, e, l) => {
        if (e <= 3) {
          pos = pos + this.innerHeight / 6.1
          positions.push(pos)
        } else if (e >= 10) {
          posThree = posThree + this.innerHeight / 6.1
          positions.push(posThree)
        } else {
          posTwo = posTwo + this.innerHeight / 6.1
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
    },
    format (value) {
      return d3.format(',')(value).replace(/,/g, ' ')
    }
  },
  mounted () {
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
  height: 70%;
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
    padding-left: 10px;
    display: flex;
    width: 100%;
    align-items: center;
    margin-left: $margin-space;
    font-size: 0.8em;
    .legend{
      padding-bottom: 0.5%;
      margin-left: $margin-space*1.5;
      font-size: 0.7em;
      display: flex;
      flex-direction: row;
      align-items: center;
      .dot {
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: inline-block;
        border: 1px solid grey;
        margin-right: 3px;
        &#world {
          border-style: dashed;
          margin-left: $margin-space;
          margin-right: $margin-space/3;
          }
      }
    }
  }
    .scenario_selector {
      margin-right: $margin-space/4;
      margin-left: $margin-space/2;
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
      .Industry-labels {
        //fill: getColor(yellow, 60);
        font-weight: 600;
      }
      .Transport-labels {
        //fill: $color-violet;
        font-weight: 600;
      }
      .Buildings-labels {
        //fill: $color-blue;
        font-weight: 600;
      }
      .axis-label {
        font-size: 10px;
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
    .HydrogenIndus {
      fill: getColor(yellow, 60);
      stroke: getColor(yellow, 60);
    }
    .GasesIndus {
      fill: getColor(yellow, 60);
      stroke: getColor(yellow, 60);
    }
    .ElectricityIndus {
      fill: getColor(yellow, 60);
      stroke: getColor(yellow, 60);
    }
    .LiquidsIndus {
      fill: getColor(yellow, 60);
      stroke: getColor(yellow, 60);
    }
    .HeatIndus {
      fill: getColor(yellow, 60);
      stroke: getColor(yellow, 60);
    }
    .SolidsIndus {
      fill: getColor(yellow, 60);
      stroke: getColor(yellow, 60);
    }
    .HydrogenRyc {
      fill: getColor(blue, 60);
      stroke: getColor(blue, 60);
      }
    .GasesRyc {
      fill: getColor(blue, 60);
      stroke: getColor(blue, 60);
    }
    .ElectricityRyc {
      fill: getColor(blue, 60);
      stroke: getColor(blue, 60);
    }
    .LiquidsRyc {
      fill: getColor(blue, 60);
      stroke: getColor(blue, 60);
    }
    .HeaRyct {
      fill: getColor(blue, 60);
      stroke: getColor(blue, 60);
    }
    .SolidsRyc {
      fill: getColor(blue, 60);
      stroke: getColor(blue, 60);
    }
    .HydrogenTrans {
      fill: getColor(purple, 60);
      stroke: getColor(purple, 60);
    }
    .GasesTrans {
      fill: getColor(purple, 60);
      stroke: getColor(purple, 60);
    }
    .ElectricityTrans {
      fill: getColor(purple, 60);
      stroke: getColor(purple, 60);
    }
    .LiquidsTrans {
      fill: getColor(purple, 60);
      stroke: getColor(purple, 60);
    }
    //.Electricity {
    //  fill: getColor(gray, 80);
    //  stroke: getColor(gray, 40);
    //}
    //.Gases {
    //  fill: getColor(red, 80);
    //  stroke: getColor(red, 40);
    //}
  //  .Heat {
    //  fill: getColor(orange, 80);
    //  stroke: getColor(orange, 40);
    // }
    // .Liquids {
    //  fill: getColor(blue, 80);
    //  stroke: getColor(blue, 40);
  //  }
  //  .Hydrogen {
  //    fill: getColor(violet, 80);
    //  stroke: getColor(violet, 40);
    //}
    //.Solids {
    //  fill: lighten(#663333, 40);
    //  stroke: darken(#663333, 30);
    //}
  }
}

</style>
