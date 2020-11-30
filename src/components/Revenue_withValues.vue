<template>
  <div class="secondary-energy" ref="inWrapper">
    <div></div>
    <div class="key" :class=" mobile ? 'mobile' : 'desktop'">
      <h3 >Changes in revenue in BN$/yr</h3>
      <a>(Model: REMIND-MAgPIE)</a>
    </div>
    <div class="key" :class=" mobile ? 'mobile' : 'desktop'">
      <SensesSelect class="region_selector" :options="regions" v-model="currentRegion"/>
      <!-- <SensesSelect class="elasticity_selector" :options="elasticity" v-model="currentElasticity"/> -->
      <span class="SliderLabel">Elasticity</span>
      <input type="range" min="0" max="2" step="1" name="elasticitySlider" list="tickmarks" v-model="currentElasticity">
      <span class="SliderValues">{{ elasticityArray[currentElasticity] }}</span>
    </div>
    <div>
    </div>
    <!-- <p class="legend">
      <span class="dot-two"></span>
      <span>2ºC Scenario</span>
      <span class="dot-one"></span>
      <span>1.5ºC Scenario</span>
      <span class="dot-cpol"></span>
      <span>Current Policy Scenario</span>
    </p> -->
    <svg :width="(innerWidth)" :height="innerHeight" :transform="`translate(${innerWidth * 0.01}, 0)`">
      <g v-for="(group, g) in dots.slice(0, 2)" v-bind:key="g + 'group'" :class="`${labels[g]}-group`" :transform="`translate(0, ${groupPosition[g]})`">
        <!--Axis -->
        <g v-for="(val, v) in yTicks[g][0]" v-bind:key="v+'val'">
        <line class="axis" :x1="scale.x(2029)" :y1="(0.3 * innerHeight) - yTicks[g][1][v]" :x2="scale.x(2029.5)" :y2="(0.3 * innerHeight) - yTicks[g][1][v]"/>
          <text class="axis-label" x="0" :y="(0.3 * innerHeight) - yTicks[g][1][v] - 2" > {{ val }} </text>
        </g>
        <g v-for="(val, v) in yTicks.slice(0,1)" v-bind:key="v+'valHeader'">
          <g v-if="g === 0" >
          <line class="axis" x1="0" :y1="(0.31 * innerHeight) - yTicks[g][1][6]" :x2="scale.x(2105)" :y2="(0.31 * innerHeight) - yTicks[g][1][6]"/>
          <text class="legend-label" :x="0" :y="(0.3 * innerHeight) - yTicks[g][1][6]" > {{sectorLabel[g]}}</text>
          <text class="year-label" :x="scale.x(2030)+(barXshift[1]*0.5)" :y="(0.51 * innerHeight) - yTicks[g][1][2]" > 2030</text>
          <text class="year-label" :x="scale.x(2100)+(barXshift[1]*0.5)" :y="(0.51 * innerHeight) - yTicks[g][1][2]" > 2100</text>
          <g class="legend">
            <circle :class="`${labels[g]}-two`" :cx="scale.x(2050)" :cy="(0.295 * innerHeight) - yTicks[g][1][6]" r="4"/>
            <text class="legend-label" :x="scale.x(2050)+(barXshift[1])*0.3" :y="(0.3 * innerHeight) - yTicks[g][1][6]" >2ºC Scenario</text>
            <circle :class="`${labels[g]}-one`" :cx="scale.x(2065)" :cy="(0.295 * innerHeight) - yTicks[g][1][6]" r="4"/>
            <text class="legend-label" :x="scale.x(2065)+(barXshift[1])*0.3" :y="(0.3 * innerHeight) - yTicks[g][1][6]" >1.5ºC Scenario</text>
            <circle :class="`${labels[g]}-baseline-two`" :cx="scale.x(2082)" :cy="(0.295 * innerHeight) - yTicks[g][1][6]" r="4"/>
            <text class="legend-label" :x="scale.x(2082)+(barXshift[1])*0.3" :y="(0.3 * innerHeight) - yTicks[g][1][6]" >Current policy scenario</text>
          </g>
        </g>
          <g v-if="g === 1" >
          <line class="axis" x1="0" :y1="(0.31 * innerHeight) - yTicks[g][1][2]" :x2="scale.x(2105)" :y2="(0.31 * innerHeight) - yTicks[g][1][2]"/>
          <text class="legend-label" :x="0" :y="(0.3 * innerHeight) - yTicks[g][1][2]" > {{sectorLabel[g]}}</text>
          <text class="year-label" :x="scale.x(2030)+(barXshift[1]*0.5)" :y="(0.46 * innerHeight) - yTicks[g][1][2]" > 2030</text>
          <text class="year-label" :x="scale.x(2100)+(barXshift[1]*0.5)" :y="(0.46 * innerHeight) - yTicks[g][1][2]" > 2100</text>
          <g class="legend">
            <circle :class="`${labels[g]}-two`" :cx="scale.x(2050)" :cy="(0.295 * innerHeight) - yTicks[g][1][2]" r="4"/>
            <text class="legend-label" :x="scale.x(2050)+(barXshift[1])*0.3" :y="(0.3 * innerHeight) - yTicks[g][1][2]" >2ºC Scenario</text>
            <circle :class="`${labels[g]}-one`" :cx="scale.x(2065)" :cy="(0.295 * innerHeight) - yTicks[g][1][2]" r="4"/>
            <text class="legend-label" :x="scale.x(2065)+(barXshift[1])*0.3" :y="(0.3 * innerHeight) - yTicks[g][1][2]" >1.5ºC Scenario</text>
            <circle :class="`${labels[g]}-baseline-two`" :cx="scale.x(2082)" :cy="(0.295 * innerHeight) - yTicks[g][1][2]" r="4"/>
            <text class="legend-label" :x="scale.x(2082)+(barXshift[1])*0.3" :y="(0.3 * innerHeight) - yTicks[g][1][2]" >Current policy scenario</text>
          </g>
        </g>
        </g>
        <!--graph-->
        <g v-for="(rec, r) in group" v-bind:key="labels[g] + r + 'rect two'">
          <g v-if="r !== 0" >
            <rect :class="`${labels[g]}-two`" :width="rec.barWidth" :x="(rec.year-1.1*rec.barWidth)" :y="rec.twoValueY" :height="rec.twoValue"/>
            <rect @mouseover="[activeBar = true, over = r + labels[g] + 'rect two' ]" @mouseleave="activeBar = false" class="transparentBar" :width="rec.barWidth*6" :x="(rec.year-1.1*(rec.barWidth*6)/2)" :y="rec.twoValueY" :height="rec.twoValue"/>
            <rect :class="`${labels[g]}-one`" :width="rec.barWidth" :x="(rec.year+barXshift[1]-1.1*rec.barWidth)" :y="rec.oneValueY" :height="rec.oneValue"/>
            <rect @mouseover="[activeBar = true, over = r + labels[g] + 'rect one' ]" @mouseleave="activeBar = false" class="transparentBar" :width="rec.barWidth*6" :x="(rec.year+barXshift[1]-1.1*(rec.barWidth*6)/2)" :y="rec.oneValueY" :height="rec.oneValue"/>
          </g>
        </g>
        <g v-for="(circ, c) in group" v-bind:key="g + c + 'circbase'">
            <g v-if="c !== 0">
              <g @mouseover="[activeBar = true, over = c + labels[g] + 'rect two' ]">
                  <g v-if="circ.twoValueDollar >= 0" >
                  <circle :class="`${labels[g]}-baseline-two`" :cx="(circ.year - (0.6 * circ.barWidth))" :cy="(0.3 * innerHeight)-scale.y(0)" r="4"/>
                  <circle :class="`${labels[g]}-two`" :cx="(circ.year - 0.6 * circ.barWidth)" :cy="circ.twoValueY" r="4"/>
                  </g>
                <g v-else >
                  <circle :class="`${labels[g]}-baseline-two`" :cx="(circ.year - (0.6 * circ.barWidth))" :cy="(0.3 * innerHeight)-scale.y(0)" r="4"/>
                  <circle :class="`${labels[g]}-two`" :cx="(circ.year - 0.6 * circ.barWidth)" :cy="circ.twoValueY + circ.twoValue" r="4"/>
                </g>
              </g>
              <g @mouseover="[activeBar = true, over = c + labels[g] + 'rect one' ]">
                <g v-if="circ.oneValueDollar >= 0">
                  <circle :class="`${labels[g]}-baseline-one`" :cx="(circ.year + barXshift[1] - (0.6 * circ.barWidth))" :cy="(0.3 * innerHeight)-scale.y(0)" r="4"/>
                  <circle :class="`${labels[g]}-one`" :cx="(circ.year + barXshift[1] - 0.6 * circ.barWidth)" :cy="circ.oneValueY" r="4"/>
                </g>
                <g v-else >
                  <circle :class="`${labels[g]}-baseline-one`" :cx="(circ.year + barXshift[1] - (0.6 * circ.barWidth))" :cy="(0.3 * innerHeight)-scale.y(0)" r="4"/>
                  <circle :class="`${labels[g]}-one`" :cx="(circ.year + barXshift[1] - 0.6 * circ.barWidth)" :cy="circ.oneValueY + circ.oneValue" r="4"/>
                </g>
              </g>
          </g>
        </g>
      </g>
      <!--Hover Over Values and Lines -->
      <g v-for="(group, g) in dots" v-bind:key="g + 'textgroup'" :class="`${labels[g]}-group`"  >
        <g v-if="g !== 1">
          <g v-for="(text, t) in group" v-bind:key="t + 'textAll'" :transform="`translate(0, ${groupPosition[g]})`" >
            <g v-if="t !== 0">
              <g :class="activeBar === true & over === t + labels[g] + 'rect two' ? 'visible' : 'invisible'">
                <g v-if="text.twoValueDollar >= 0" >
                  <line  class="HoverAxis" :x1="scale.x(2028)" :y1="text.twoValueY" :x2="(text.year) - 10" :y2="text.twoValueY"/>
                  <text class="hover-label" :x="(text.year)" :y="text.twoValueY - 8">{{ format(Math.round(dots[0][t].twoValueDollar)) }} BN$</text>
                </g>
                <g v-else >
                  <line class="HoverAxis" :x1="scale.x(2028)" :y1="text.twoValueY + text.twoValue" :x2="(text.year) - 10" :y2="text.twoValueY + text.oneValue"/>
                  <text class="hover-label" :x="(text.year)" :y="text.twoValueY + text.twoValue + 8">{{ format(Math.round(dots[0][t].twoValueDollar)) }} BN$</text>
                </g>
              </g>
              <g :class="activeBar === true & over === t + labels[g] + 'rect one' ? 'visible' : 'invisible'">
                <g v-if="text.oneValueDollar >= 0" >
                  <line  class="HoverAxis" :x1="scale.x(2028)" :y1="text.oneValueY" :x2="text.year+barXshift[1]-1.1*text.barWidth -7" :y2="text.oneValueY"/>
                  <text class="hover-label" :x="text.year+barXshift[1]-1.1*text.barWidth" :y="text.oneValueY - 8">{{ format(Math.round(dots[0][t].oneValueDollar)) }} BN$</text>
                </g>
                <g v-else >
                  <line class="HoverAxis" :x1="scale.x(2028)" :y1="text.oneValueY + text.oneValue" :x2="(text.year)-10" :y2="text.oneValueY + text.oneValue"/>
                  <text class="hover-label" :x="text.year+barXshift[1]-1.1*text.barWidth" :y="text.oneValueY + text.oneValue + 8">{{ format(Math.round(dots[0][t].oneValueDollar)) }} BN$</text>
                </g>
              </g>
            </g>
          </g>
        </g>
        <g v-else>
        <g v-for="(text, t) in group" v-bind:key="t + 'textAll'" :transform="`translate(0, ${groupPosition[g]})`">
          <g v-if="t !== 0">
          <g :class="activeBar === true & over === t + labels[g] + 'rect two' ? 'visible' : 'invisible'">
              <g v-if="text.twoValueDollar >= 0" >
              <line  class="hover-label" :x1="scale.x(2028)" :y1="text.twoValueY" :x2="(text.year) - 10" :y2="text.twoValueY"/>
              <text class="hover-label" :x="(text.year)" :y="text.twoValueY - 8">{{ format(Math.round(dots[1][t].twoValueDollar)) }} BN$</text>
            </g>
            <g v-else>
              <line class="HoverAxis" :x1="scale.x(2028)" :y1="text.twoValueY + text.twoValue " :x2="(text.year) - 10" :y2="text.twoValueY + text.twoValue"/>
              <text class="hover-label" :x="(text.year)" :y="text.twoValueY + text.twoValue + 12">{{ format(Math.round(dots[1][t].twoValueDollar)) }} BN$</text>
            </g>
          </g>
          <g :class="activeBar === true & over === t + labels[g] + 'rect one' ? 'visible' : 'invisible'">
            <g v-if="text.oneValueDollar >= 0" >
              <line  class="HoverAxis" :x1="scale.x(2028)" :y1="text.oneValueY" :x2="text.year+barXshift[1]-1.1*text.barWidth -7" :y2="text.oneValueY"/>
              <text class="hover-label" :x="text.year+barXshift[1]-1.1*text.barWidth" :y="text.oneValueY - 8">{{ format(Math.round(dots[1][t].oneValueDollar)) }} BN$</text>
            </g>
            <g v-else>
              <line class="HoverAxis" :x1="scale.x(2028)" :y1="text.oneValueY + text.oneValue" :x2="text.year+barXshift[1]-1.1*text.barWidth -7" :y2="text.oneValueY + text.oneValue"/>
              <text class="hover-label" :x="text.year+barXshift[1]-1.1*text.barWidth" :y="text.oneValueY + text.oneValue + 12">{{ format(Math.round(dots[1][t].oneValueDollar)) }} BN$</text>
            </g>
          </g>
        </g>
        </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import _ from 'lodash'
import * as d3 from 'd3'

import revenueData from 'dsv-loader!@/assets/data/Revenue_remind.csv' // eslint-disable-line import/no-webpack-loader-syntax
import SensesSelect from 'library/src/components/SensesSelect.vue'

export default {
  name: 'Revenue',
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
      sectorLabel: ['Transportation Sector', 'Industry Sector'],
      model: [...new Set(revenueData.map(r => r.Model))],
      elasticity: [...new Set(revenueData.map(r => r.Elasticity))],
      elasticityArray: ['low', 'medium', 'high'],
      years: [...new Set(revenueData.map(r => r.Year))],
      labels: [...new Set(revenueData.map(r => r.Sector))],
      scenario: [...new Set(revenueData.map(r => r.Scenario))],
      scenarios: ['1.5ºC', '2.0ºC', 'Current Policies'],
      scenDict: { '1.5ºC': 'NPi2020_400_v3', '2.0ºC': 'NPi2020_1000_v3', 'Current Policies': 'NPi_v3' },
      regions: [...new Set(revenueData.map(r => r.Region))],
      revenueValues: [...new Set(revenueData.map(r => r.oneValue || r.twoValue))],
      currentScenario: '1.5ºC',
      currentRegion: 'World',
      currentElasticity: '1',
      activeBar: false,
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
    regionFilter () { return _.map(this.sector, (re, r) => _.filter(re, d => d.Region === this.currentRegion)) },
    elasticityFilter () { return _.map(this.regionFilter, (el, r) => _.filter(el, d => d.Elasticity === this.elasticityArray[this.currentElasticity])) },

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
    scale () {
      return {
        x: d3.scaleLinear()
          .range([4 * this.margin.left, this.innerWidth - (this.margin.right * 30)])
          .domain([2030, 2110]),
        y: d3.scaleLinear()
          .range([0, 0.5 * this.innerHeight])
          .domain([d3.min(this.revenueValues, s => +s), d3.max(this.revenueValues, s => +s)])
      }
    },
    dots () {
      return _.map(this.elasticityFilter, (sector, s) => {
        return _.map(sector, (single, i) => {
          return {
            year: this.scale.x(single.Year),
            barWidth: (0.8 * this.sectWidth) / 55,
            // Values for Bars Height
            // heightValue: this.scale.y(Math.abs(single.Revenue)) - this.scale.y(0),
            // twoValue: this.scale.y(Math.abs(single.twoValue)),
            // oneValue: this.scale.y(Math.abs(single.oneValue)),
            twoValue: this.scale.y(Math.abs(single.twoValue)) - this.scale.y(0),
            oneValue: this.scale.y(Math.abs(single.oneValue)) - this.scale.y(0),
            // Y Values for Barchart
            // yValue: single.Revenue >= 0 ? (0.5 * this.innerHeight) - this.scale.y(single.Revenue) : (0.5 * this.innerHeight) - this.scale.y(0),
            // twoValueY: single.twoValue >= 0 ? (0.3 * this.innerHeight) - this.scale.y(Math.abs(single.twoValue)) : (0.3 * this.innerHeight),
            // oneValueY: single.oneValue >= 0 ? (0.3 * this.innerHeight) - this.scale.y(Math.abs(single.oneValue)) : (0.3 * this.innerHeight),
            twoValueY: single.twoValue >= 0 ? (0.3 * this.innerHeight) - this.scale.y(single.twoValue) : (0.3 * this.innerHeight) - this.scale.y(0),
            oneValueY: single.oneValue >= 0 ? (0.3 * this.innerHeight) - this.scale.y(single.oneValue) : (0.3 * this.innerHeight) - this.scale.y(0),
            // Hover Over real values
            // dollarValue: parseFloat(single.Revenue),
            twoValueDollar: parseFloat(single.twoValue),
            oneValueDollar: parseFloat(single.oneValue)
          }
        })
      })
    },
    CostTotalExtremes () {
      return {
        min: d3.min(this.revenueValues, s => +s),
        max: d3.max(this.revenueValues, s => +s)
      }
    },
    groupPosition () {
      const dotsArray = this.dots.slice(0, 2)
      let pos = 200
      return _.map(this.regionFilter, (sector, s, l) => {
        if (s !== 0) { pos = pos + this.innerHeight / dotsArray.length - 160 }
        return pos
      })
    },
    barXshift () {
      const shiftarray = [0, (0.8 * this.sectWidth) / 3.3]
      return shiftarray
    },
    yTicks () {
      const ticksArrayT = [['0', '2000', '4000', '6000', '8000', '10000 BN$/yr'],
        [this.scale.y(0), this.scale.y(2000), this.scale.y(4000), this.scale.y(6000), this.scale.y(8000), this.scale.y(10000), this.scale.y(11100)]]
      const ticksArrayI = [['-1000', '0'],
        [this.scale.y(-1000), this.scale.y(0), this.scale.y(1100)]]
      const tickVal = [ticksArrayT, ticksArrayI]
      return tickVal
    }
  },
  methods: {
    calcSizes () {
      const { inWrapper: el } = this.$refs
      if (el !== 'undefined') {
        const innerHeight = el.clientHeight || el.parentNode.clientHeight
        const innerWidth = el.clientWidth - (this.margin.left + this.margin.right)
        this.innerHeight = Math.max(innerHeight, 500)
        this.innerWidth = Math.max(innerWidth, 500)
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

.secondary-energy {
  height: 82vh;

  .key {
    z-index: 9;
    width: 100%;
    height: 10px;
    padding: 5px 0px 20px 0px;
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
      margin-left: $margin-space/2;
      font-size: 0.8em;
    }
    .SliderLabel{
      margin-left: $margin-space;
      margin-right: $margin-space/4;
      font-size: 0.8em;
    }
    .SliderValues {
      margin-left: $margin-space/2;
      margin-right: $margin-space/4;
      font-size: 0.8em;
    }
    input[type=range] {
      width: 10%;
      margin-left: $margin-space*0.2;
      margin-right: $margin-space*0.2;
      background-color: transparent;
      -webkit-appearance: none;
      vertical-align: middle;
      // display: flex;
      // flex-direction: row;
      // align-items: center;
    }
    input[type=range]:focus {
    outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
    background: #969696;
    border: 0.1px solid #010101;
    border-radius: 25px;
    width: 100%;
    height: 2.3px;
    cursor: pointer;
    }
    input[type=range]::-webkit-slider-thumb {
    margin-top: -6.45px;
    width: 15px;
    height: 15px;
    background: #ffffff;
    border: 0.1px solid #969696;
    border-radius: 50px;
    cursor: pointer;
    -webkit-appearance: none;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
    background: #a3a3a3;
    }
    input[type=range]::-moz-range-track {
    background: #969696;
    border: 0.1px solid #010101;
    border-radius: 25px;
    width: 100%;
    height: 2.3px;
    cursor: pointer;
    }
    input[type=range]::-moz-range-thumb {
    width: 15px;
    height: 15px;
    background: #ffffff;
    border: 0.1px solid #969696;
    border-radius: 50px;
    cursor: pointer;
    }
    input[type=range]::-ms-track {
    background: transparent;
    border-color: transparent;
    border-width: 6.35px 0;
    color: transparent;
    width: 100%;
    height: 2.3px;
    cursor: pointer;
    }
    input[type=range]::-ms-fill-lower {
    background: #898989;
    border: 0.1px solid #010101;
    border-radius: 50px;
    }
    input[type=range]::-ms-fill-upper {
    background: #969696;
    border: 0.1px solid #010101;
    border-radius: 50px;
    }
    input[type=range]::-ms-thumb {
    width: 15px;
    height: 15px;
    background: #ffffff;
    border: 0.1px solid #969696;
    border-radius: 50px;
    cursor: pointer;
    margin-top: 0px;
    /*Needed to keep the Edge thumb centred*/
    }
    input[type=range]:focus::-ms-fill-lower {
    background: #969696;
    }
    input[type=range]:focus::-ms-fill-upper {
    background: #a3a3a3;
    }
    @supports (-ms-ime-align:auto) {
    input[type=range] {
      margin: 0;
    }
    }
    .datalist {
      display: inline-block;
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
    margin-bottom: $margin-space;

  }
  h3 {
    padding-bottom: 10px;
    display: inline-block;
    margin-left: $margin-space/2;
    font-size: 0.8em;
  }
  a{
    margin-top: 5px;
    margin-left: 5px;
    fill: getColor(neon, 40);
    font-weight: normal;
    text-decoration: none;
    background: none;
    font-size: 0.8em;
  }
  svg {
    height: 100%;
    margin-top: $margin-space*2;
    .axis {
      stroke: getColor(grey, 20);
      stroke-width: 0.5;
      stroke-linecap: round;
    }
    .HoverAxis {
      stroke: getColor(grey, 80);
      stroke-width: 1;
      stroke-linecap: round;
    }
    .legend-label {
      fill: black;
      font-size: 0.8em;
      // font-weight: 800;
    }
    g {
      .year-label {
        text-anchor: middle;
        fill: getColor(grey, 60);
        font-size: 0.8em;
      }
      .hover-label {
        fill: black;
        font-size: 0.6em;
        text-shadow: -2px 0 white, 0 2px white, 2px 0 white, 0 -2px white;
      }
      .axis-label{
        fill: getColor(grey, 60);
        font-size: 0.8em;
        //text-anchor: middle;
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
    .transparentBar{
      fill-opacity: 0;
      fill: getColor(green, 60);
    }
    .scenario-base {
      fill: white;
      stroke: getColor(grey, 20);
    }
    .Transportation-two {
      fill: $color-purple;
    }
    .Transportation-one {
      fill: getColor(purple, 80);
    }
    .Industrial.processes-two {
      fill: $color-yellow;
    }
    .Industrial.processes-one {
      fill: getColor(yellow, 80);
    }
    .Transportation-baseline-one {
      fill: white;
      stroke: getColor(purple, 80);
    }
    .Transportation-baseline-two {
      fill: white;
      stroke: $color-purple;
    }
    .Industrial.processes-baseline-two {
      fill: white;
      stroke: $color-yellow;
    }
    .Industrial.processes-baseline-one {
      fill: white;
      stroke: getColor(yellow, 80);
    }
  }
}

</style>
