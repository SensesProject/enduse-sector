<template>
  <div class="secondary-energy" ref="inWrapper">
    <div></div>
    <div class="key" :class=" mobile ? 'mobile' : 'desktop'">
      <h3 >Changes in revenue</h3>
      <a href="https://docs.messageix.org/projects/global/en/latest/" target="_blank">(Model: MESSAGEix-GLOBIOM_1.0)</a>
    </div>
    <div class="key" :class=" mobile ? 'mobile' : 'desktop'">
      <SensesSelect class="region_selector" :options="regions" v-model="currentRegion"/>
    </div>
    <p class="legend">
      <span class="dot-two"></span>
      <span>2ºC Scenario</span>
      <span class="dot-one"></span>
      <span>1.5ºC Scenario</span>
      <span class="dot-cpol"></span>
      <span>Current Policy Scenario</span>
    </p>
    <svg :width="(innerWidth)" :height="innerHeight" :transform="`translate(${innerWidth * 0.4}, 0)`">
      <text class="sector-label" x="0" :y="(0.02*innerHeight)" > Transportation Sector: Revenue (log) in BN$/yr</text>
      <text class="sector-label" x="0" :y="(0.55*innerHeight)"> Industry Sector: Revenue (log) in BN$/yr </text>
      <!--x Axis-->
      <g v-for="(year, j) in years" v-bind:key="j+'year'">
          <g v-if="j == 1 || j == 8">
            <text class="year-label" :x="scale.x(year)+(barXshift[1]*0.5)" :y="(0.42*innerHeight)">{{ years[j]}}</text>
          </g>
      </g>
      <g v-for="(year, j) in years" v-bind:key="j+'industry'+'year'">
          <g v-if="j == 1 || j == 8">
            <text class="year-label" :x="scale.x(year)+(barXshift[1]*0.5)" :y="(0.85*innerHeight)">{{ years[j]}}</text>
          </g>
      </g>
      <!--graph-->
      <g v-for="(group, g) in dots.slice(0, 2)" v-bind:key="g + 'group'" :class="`${labels[g]}-group`" :transform="`translate(0, ${groupPosition[g]})`">
        <g v-for="(rec, r) in group" v-bind:key="labels[g] + r + 'rect two'">
          <g v-if="r !== 0">
            <rect  class="scenario-two" :width="rec.barWidth" :x="(rec.year-1.1*rec.barWidth)" :y="rec.twoWorldY" :height="rec.twoWorld"/>
            <rect  class="scenario-one" :width="rec.barWidth" :x="(rec.year+barXshift[1]-1.1*rec.barWidth)" :y="rec.oneWorldY" :height="rec.oneWorld"/>
          </g>
        </g>
        <g v-for="(circ, c) in group" v-bind:key="g + c + 'circbase'">
            <g v-if="c !== 0">
              <g>
                  <g v-if="circ.twoWorldDollar >= 0">
                  <circle class="baseline-circle-two" :cx="(circ.year - (0.6 * circ.barWidth))" :cy="(0.3 * innerHeight)" r="6"/>
                  <circle class="scenario-two" :cx="(circ.year - 0.6 * circ.barWidth)" :cy="circ.twoWorldY" r="6"/>
                </g>
                <g v-else >
                  <circle class="baseline-circle-two" :cx="(circ.year - (0.6 * circ.barWidth))" :cy="(0.3 * innerHeight)" r="6"/>
                  <circle class="scenario-two" :cx="(circ.year - 0.6 * circ.barWidth)" :cy="circ.twoWorldY + circ.twoWorld" r="6"/>
                </g>
              </g>
              <g>
                <g v-if="circ.oneWorldDollar >= 0">
                  <circle class="baseline-circle-one" :cx="(circ.year + barXshift[1] - (0.6 * circ.barWidth))" :cy="(0.3 * innerHeight)" r="6"/>
                  <circle class="scenario-one" :cx="(circ.year + barXshift[1] - 0.6 * circ.barWidth)" :cy="circ.oneWorldY" r="6"/>
                </g>
                <g v-else >
                  <circle class="baseline-circle-one" :cx="(circ.year + barXshift[1] - (0.6 * circ.barWidth))" :cy="(0.3 * innerHeight)" r="6"/>
                  <circle class="scenario-one" :cx="(circ.year + barXshift[1] - 0.6 * circ.barWidth)" :cy="circ.oneWorldY + circ.oneWorld" r="6"/>
                </g>
              </g>
              <!--
              <g>
                  <g v-if="circ.twoOecdDollar >= 0">
                    <circle class="scenario-two" :cx="(circ.year - 0.6 * circ.barWidth)" :cy="circ.twoOecdY" r="6"/>
                  </g>
                  <g v-else >
                    <circle class="scenario-two" :cx="(circ.year - 0.6 * circ.barWidth)" :cy="circ.twoOecdY + circ.twoWorld" r="6"/>
                  </g>
              </g>
              <g>
                <g v-if="circ.oneOecdDollar >= 0">
                  <circle class="baseline-circle-one" :cx="(circ.year + barXshift[1] - (0.6 * circ.barWidth))" :cy="(0.3 * innerHeight)" r="6"/>
                  <circle class="scenario-one" :cx="(circ.year + barXshift[1] - 0.6 * circ.barWidth)" :cy="circ.oneOecdY" r="6"/>
                </g>
                <g v-else >
                  <circle class="baseline-circle-one" :cx="(circ.year + barXshift[1] - (0.6 * circ.barWidth))" :cy="(0.3 * innerHeight)" r="6"/>
                  <circle class="scenario-one" :cx="(circ.year + barXshift[1] - 0.6 * circ.barWidth)" :cy="circ.oneOecdY + circ.oneOecd" r="6"/>
                </g>
              </g>-->
          </g>
        </g>
        <!--        <line class="line-label" :x1="scale.x(2020)" :x2="scale.x(2104.5)" :y1="(0.3 * innerHeight)" :y2="(0.3 * innerHeight)"/> -->
          <!--y Axis -->
          <g v-for="(val, v) in yTicks[g][0]" v-bind:key="v+'val'">
            <line class="axis" x1="28" :y1="(0.3 * innerHeight) - yTicks[g][1][v]" x2="32" :y2="(0.3 * innerHeight) - yTicks[g][1][v]"/>
            <text class="axis-label" x="13" :y="(0.3 * innerHeight) - yTicks[g][1][v] + 3" > {{ val }} </text>
          </g>
      </g>
    </svg>
  </div>
</template>

<script>
import _ from 'lodash'
import * as d3 from 'd3'

import revenueData from 'dsv-loader!@/assets/data/RFPs_enduseSector_remind.csv' // eslint-disable-line import/no-webpack-loader-syntax
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
      revenueData,

      sector: _.groupBy(revenueData, d => d.Sector),
      model: [...new Set(revenueData.map(r => r.Model))],
      years: [...new Set(revenueData.map(r => r.Year))],
      labels: [...new Set(revenueData.map(r => r.Sector))],
      scenario: [...new Set(revenueData.map(r => r.Scenario))],
      scenarios: ['1.5ºC', '2.0ºC', 'Current Policies'],
      scenDict: { '1.5ºC': 'NPi2020_400_v3', '2.0ºC': 'NPi2020_1000_v3', 'Current Policies': 'NPi_v3' },
      regions: [...new Set(revenueData.map(r => r.Region))],
      revenueValues: [...new Set(revenueData.map(r => r.oneWorld || r.twoWorld))],
      currentScenario: '1.5ºC',
      currentRegion: 'World',
      active: false,
      over: '',
      margin: {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10
      },
      innerHeight: 0,
      innerWidth: 0
    }
  },
  computed: {
    // scenarioFilter () { return _.map(this.sector, (sc, s) => _.filter(sc, d => d.Scenario === this.scenDict[this.currentScenario])) },
    regionFilter () { return _.map(this.sector, (re, r) => _.filter(re, d => d.Region === this.currentRegion)) },
    // worldFilter () { return _.map(this.sector, (re, r) => _.filter(re, d => d.Region === 'World')) },
    // filters world and baseline Values
    // worldBaseFilter () { return _.map(this.sector, (sc, s) => _.filter(sc, d => (d.Scenario === 'NPi_v3' && d.Region === this.currentRegion))) },
    // filters only the values of world from all costs
    // since there are "inf" or no values for certain regions in datsets
    // filters only the values of world from all costs per MWh

    innerWidthFun () {
      return this.innerWidth
    },
    // calculates width between years to calculate width of single bar in dots
    sectWidth () {
      const inwidth = this.innerWidthFun
      const margleft = this.margin.left
      const margright = this.margin.right
      const yearcount = this.years.length
      const sewidth = (inwidth - ((margleft) + (margright))) / yearcount
      return sewidth
    },

    // Scale for Barchart for Revenue
    //  scale () {
    //  return {
    //  x: d3.scaleLinear()
    //  .range([4 * this.margin.left, this.innerWidth - (this.margin.right * 30)])
    //  .domain([2020, 2110]),
    //  y: d3.scaleLinear()
    //    .range([0, 0.5 * this.innerHeight])
    // .domain([d3.min(this.revenueValues, s => +s), d3.max(this.revenueValues, s => +s)])
    //  }
    // },
    scale () {
      return {
        x: d3.scaleLinear()
          .range([5 * this.margin.left, this.innerWidth - (this.margin.right * 30)])
          .domain([2030, 2110]),
        y: d3.scaleLog()
          .range([0, 0.3 * this.innerHeight])
          // .domain([d3.min(this.revenueValues, s => +s), d3.max(this.revenueValues, s => +s)])
          .domain([1, d3.max(this.revenueValues, s => +s)])
      }
    },
    dots () {
      return _.map(this.regionFilter, (sector, s) => {
        // console.log('sector', sector)
        return _.map(sector, (single, i) => {
          return {
            year: this.scale.x(single.Year),
            barWidth: (0.8 * this.sectWidth) / 55,
            // Values for Bars Height
            // heightValue: this.scale.y(Math.abs(single.Revenue)) - this.scale.y(0),
            twoWorld: this.scale.y(Math.abs(single.twoWorld)),
            oneWorld: this.scale.y(Math.abs(single.oneWorld)),
            twoOecd: this.scale.y(Math.abs(single.twoOecd)),
            oneOecd: this.scale.y(Math.abs(single.oneOecd)),
            // twoWorld: this.scale.y(Math.abs(single.twoWorld)) - this.scale.y(0),
            // oneWorld: this.scale.y(Math.abs(single.oneWorld)) - this.scale.y(0),
            // Y Values for Barchart
            // yValue: single.Revenue >= 0 ? (0.5 * this.innerHeight) - this.scale.y(single.Revenue) : (0.5 * this.innerHeight) - this.scale.y(0),
            twoWorldY: single.twoWorld >= 0 ? (0.3 * this.innerHeight) - this.scale.y(Math.abs(single.twoWorld)) : (0.3 * this.innerHeight),
            oneWorldY: single.oneWorld >= 0 ? (0.3 * this.innerHeight) - this.scale.y(Math.abs(single.oneWorld)) : (0.3 * this.innerHeight),
            twoOecdY: single.twoOecd >= 0 ? (0.3 * this.innerHeight) - this.scale.y(Math.abs(single.twoOecd)) : (0.3 * this.innerHeight),
            oneOecdY: single.oneOecd >= 0 ? (0.3 * this.innerHeight) - this.scale.y(Math.abs(single.oneOecd)) : (0.3 * this.innerHeight),
            // twoWorldY: single.twoWorld >= 0 ? (0.5 * this.innerHeight) - this.scale.y(single.twoWorld) : (0.5 * this.innerHeight) - this.scale.y(0),
            // oneWorldY: single.oneWorld >= 0 ? (0.5 * this.innerHeight) - this.scale.y(single.oneWorld) : (0.5 * this.innerHeight) - this.scale.y(0),
            // Hover Over real values
            dollarValue: parseFloat(single.Revenue),
            twoWorldDollar: parseFloat(single.twoWorld),
            oneWorldDollar: parseFloat(single.oneWorld),
            twoOecdDollar: parseFloat(single.twoOecd),
            oneOecdDollar: parseFloat(single.oneOecd)
          }
        })
      })
    },
    groupPosition () {
      const dotsArray = this.dots.slice(0, 2)
      let pos = 50
      return _.map(this.regionFilter, (sector, s, l) => {
        if (s !== 0) { pos = pos + this.innerHeight / dotsArray.length - 180 }
        return pos
      })
    },
    barXshift () {
      const shiftarray = [0, (0.8 * this.sectWidth) / 3.3]
      return shiftarray
    },
    // Calculation of values for y-Axis Scales
    yTicks () {
      const ticksArrayT = [['0', '100', '1000', '3000', '6000'],
        [this.scale.y(1), this.scale.y(100), this.scale.y(1000), this.scale.y(3000), this.scale.y(6000)]]
      const ticksArrayI = [['-1000', '-100', '0'],
        [0 - this.scale.y(1000), 0 - this.scale.y(100), this.scale.y(1)]]
      const tickVal = [ticksArrayT, ticksArrayI]
      return tickVal
    }
  },
  methods: {
    calcSizes () {
      const { inWrapper: el } = this.$refs
      const innerHeight = el.clientHeight || el.parentNode.clientHeight
      const innerWidth = el.clientWidth - (this.margin.left + this.margin.right)
      this.innerHeight = Math.max(innerHeight, 500)
      this.innerWidth = Math.max(innerWidth, 500)
    },
    format (value) {
      return d3.format(',')(value).replace(/,/g, ' ')
    }
  },
  mounted () {
    this.calcSizes()
    // console.log('sector', this.sector)
    // console.log('regionFilter', this.regionFilter)
    // console.log('dotsRevenue', this.dots)
    // console.log('inwidth', this.innerWidth)
    // console.log('sectWidth', this.sectWidth)
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

.secondary-energy {
  height: 82vh;

  .key {
    z-index: 9;
    width: 100%;
    height: 10px;
    padding: 10px 0px 20px 0px;
    top: 10px;
    background: hsla(0,0%,100%,.90);

    .highlight {
      margin-right: $margin-space*2;
      margin-top: 5px;
      margin-left: 10px;
    }
    .selectors {
      display: inline-block;
      width: 100%;
      margin-left: $margin-space;
    }
    .region_selector {
      margin-top: $margin-space;
      margin-left: $margin-space*22;
      //margin-right: $margin-space/2;
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
  .legend{
    margin-top: $margin-space*1.5;
    margin-left: $margin-space*22;
    margin-bottom: $margin-space;
    font-size: 0.7em;
    display: flex;
    flex-direction: row;
    align-items: center;
    .dot-two {
      border-radius: 50%;
      width: 15px;
      height: 15px;
      display: inline-block;
      border: 1px solid $color-purple;
      background-color: $color-purple;
      margin-right: 4px;
    }
    .dot-one {
      border-radius: 50%;
      width: 15px;
      height: 15px;
      display: inline-block;
      border: 1px solid $color-yellow;
      background-color: $color-yellow;
      margin-right: 5px;
      margin-left: 10px;
    }
    .dot-cpol {
      border-radius: 50%;
      width: 15px;
      height: 15px;
      display: inline-block;
      border: 1px solid getColor(grey, 20);
      background-color: white;
      margin-right: 5px;
      margin-left: 10px;
    }
  }
  h3 {
    padding-bottom: 10px;
    display: inline-block;
    margin-left: $margin-space*22;
  }
  a{
    margin-top: 5px;
    margin-left: 5px;
    fill: getColor(neon, 40);
    font-weight: normal;
    text-decoration: none;
    background: none;
  }
  svg {
    height: 100%;
    .axis {
      stroke: getColor(grey, 40);
      stroke-width: 1.5;
      stroke-linecap: round;
    }
    .sector-label {
      fill: black;
      font-size: 0.65em;
    }
    g {
      .year-label {
        text-anchor: middle;
        fill: black;
        font-size: 0.6em;
      }
      .axis-label{
        fill: black;
        font-size: 0.6em;
        text-anchor: middle;
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
    .scenario-base {
      fill: white;
      stroke: getColor(grey, 20);
    }
    .scenario-two {
      fill: $color-purple;
    }
    .scenario-one {
      fill: $color-yellow;
    }
    .baseline-circle-one {
      fill: white;
      stroke: $color-yellow;
    }
    .baseline-circle-two {
      fill: white;
      stroke: $color-purple;
    }
    .Residential.and.commercial-circle {
      fill: white;
      stroke: $color-purple;
    }
    .Transportation-circle {
      fill: $color-purple;
      stroke: $color-purple;
    }
    .Industrial.processes-circle {
      fill: $color-yellow;
      stroke: $color-yellow;
    }
  }
}

</style>
