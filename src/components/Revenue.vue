<template>
  <div class="secondary-energy" ref="inWrapper">
    <div></div>
    <div class="key" :class=" mobile ? 'mobile' : 'desktop'">
      <h3 >Changes in revenue</h3>
      <a>(Model: REMIND-MAgPIE)</a>
    </div>
    <div class="key" :class=" mobile ? 'mobile' : 'desktop'">
      <span class="SliderLabel">Elasticity</span>
      <input type="range" min="0" max="4" step="1" name="elasticitySlider" list="tickmarks" v-model="currentElasticity">
      <span class="SliderValues">{{ elasticityArray[currentElasticity] }}</span>
    </div>
    <div>
    </div>
    <svg :width="(innerWidth)" :height="innerHeight" :transform="`translate(${innerWidth * 0.01}, 0)`">
        <!--Axis -->
        <!--<g v-for="(val, v) in yTicks[g][0]" v-bind:key="v+'val'">
        <line class="axis" :x1="scale.x(2029)" :y1="(0.3 * innerHeight) - yTicks[g][1][v]" :x2="scale.x(2029.5)" :y2="(0.3 * innerHeight) - yTicks[g][1][v]"/>
          <text class="axis-label" x="0" :y="(0.3 * innerHeight) - yTicks[g][1][v] - 2" > {{ val }} </text>
        </g> -->
        <!--graph-->
        <!--<g :transform="`translate(0, 200)`">
        <g v-for="(rec, r) in dots" v-bind:key="r + 'rect two'" >
          <g v-if="r !== 0" >
            <rect class="Industry-two" :width="rec.barWidth" :x="(rec.year-1.1*rec.barWidth)" :y="rec.twoValueY" :height="rec.twoValue"/>
            <rect class="Industry-one" :width="rec.barWidth" :x="(rec.year+barXshift[1]-1.1*rec.barWidth)" :y="rec.oneValueY" :height="rec.oneValue"/>
          </g>
        </g>-->

        <g :transform="`translate(0, ${innerHeight * 0.3})`">
        <g v-for="(val, v) in yTicks.slice(0,1)" v-bind:key="v+'valHeader'">
          <text class="year-label" :x="scale.x(2030)+(barXshift[1]*0.5)" :y="(0.55 * innerHeight)" > 2030</text>
          <text class="year-label" :x="scale.x(2100)+(barXshift[1]*0.5)" :y="(0.55 * innerHeight)" > 2100</text>
        </g>

        <g v-for="(rec, r) in dots" v-bind:key="r + 'rect two'" >
          <g v-if="r !== 0" >
            <rect class="Industry-two" :width="rec.barWidth" :x="(rec.year-1.1*rec.barWidth)" :y="rec.twoValueY" :height="rec.twoValue"/>
            <rect class="Industry-one" :width="rec.barWidth" :x="(rec.year+barXshift[1]-1.1*rec.barWidth)" :y="rec.oneValueY" :height="rec.oneValue"/>
          </g>
        </g>

        <g v-for="(circ, c) in dots" v-bind:key="c + 'circbase'">
            <g v-if="c !== 0">
            <g>
              <g v-if="circ.twoValueDollar >= 0" >
                <circle class="Industry-baseline-two" :cx="(circ.year - (0.6 * circ.barWidth))" :cy="(0.5 * innerHeight)-scale.y(0)" r="6"/>
                <circle class="Industry-two" :cx="(circ.year - 0.6 * circ.barWidth)" :cy="circ.twoValueY" r="6"/>
              </g>
              <g v-else >
                <circle class="Industry-baseline-two" :cx="(circ.year - (0.6 * circ.barWidth))" :cy="(0.5 * innerHeight)-scale.y(0)" r="6"/>
                <circle class="Industry-two" :cx="(circ.year - 0.6 * circ.barWidth)" :cy="circ.twoValueY + circ.twoValue" r="6"/>
              </g>
            </g>
            <g>
              <g v-if="circ.oneValueDollar >= 0">
                <circle class="Industry-baseline-one" :cx="(circ.year + barXshift[1] - (0.6 * circ.barWidth))" :cy="(0.5 * innerHeight)-scale.y(0)" r="6"/>
                <circle class="Industry-one" :cx="(circ.year + barXshift[1] - 0.6 * circ.barWidth)" :cy="circ.oneValueY" r="6"/>
              </g>
              <g v-else >
                <circle class="Industry-baseline-one" :cx="(circ.year + barXshift[1] - (0.6 * circ.barWidth))" :cy="(0.5 * innerHeight)-scale.y(0)" r="6"/>
                <circle class="Industry-one" :cx="(circ.year + barXshift[1] - 0.6 * circ.barWidth)" :cy="circ.oneValueY + circ.oneValue" r="6"/>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
    <div class="key" :class=" mobile ? 'mobile' : 'desktop'">
      <p class="legend">
        <span class="dot two"></span>
        <span>2ºC Scenario</span>
        <span class="dot one"></span>
        <span>1.5ºC Scenario</span>
        <span class="dot cpol"></span>
        <span>Current policy scenario</span>
      </p>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import * as d3 from 'd3'

import revenueData from 'dsv-loader!@/assets/data/Revenue.csv' // eslint-disable-line import/no-webpack-loader-syntax

export default {
  name: 'Revenue',
  components: {
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
      elas: _.groupBy(revenueData, d => d.Elasticity),
      sector: _.groupBy(revenueData, d => d.Sector),
      sectorLabel: ['Industry Sector'],
      model: [...new Set(revenueData.map(r => r.Model))],
      elasticity: [...new Set(revenueData.map(r => r.Elasticity))],
      elasticityArray: [...new Set(revenueData.map(r => r.Label))],
      years: [...new Set(revenueData.map(r => r.Year))],
      labels: [...new Set(revenueData.map(r => r.Sector))],
      regions: [...new Set(revenueData.map(r => r.Region))],
      revenueValues: [...new Set(revenueData.map(r => r.oneValue || r.twoValue))],
      currentRegion: 'World',
      currentElasticity: '0',
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
    elasticityFilter () { return _.filter(revenueData, d => d.Elasticity === this.currentElasticity) },

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
          .range([2.1 * this.margin.left, this.innerWidth - (this.margin.right * 27)])
          .domain([2030, 2110]),
        y: d3.scaleLinear()
          .range([0, 0.7 * this.innerHeight])
          .domain([d3.min(this.revenueValues, s => +s), d3.max(this.revenueValues, s => +s)])
      }
    },
    dots () {
      return _.map(this.elasticityFilter, (single, i) => {
        return {
          year: this.scale.x(single.Year),
          barWidth: (0.8 * this.sectWidth) / 55,
          // Values for Bars Height
          twoValue: this.scale.y(Math.abs(single.twoValue)) - this.scale.y(0),
          oneValue: this.scale.y(Math.abs(single.oneValue)) - this.scale.y(0),
          // Y Values for Barchart
          twoValueY: single.twoValue >= 0 ? (0.5 * this.innerHeight) - this.scale.y(single.twoValue) : (0.5 * this.innerHeight) - this.scale.y(0),
          oneValueY: single.oneValue >= 0 ? (0.5 * this.innerHeight) - this.scale.y(single.oneValue) : (0.5 * this.innerHeight) - this.scale.y(0),
          // Hover Over real values
          twoValueDollar: parseFloat(single.twoValue),
          oneValueDollar: parseFloat(single.oneValue)
        }
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
    console.log('sector', this.sector)
    console.log('revenueData', this.revenueData)
    console.log('elasticityFilter', this.elasticityFilter)
    this.calcSizes()
    console.log('revDots', this.dots)
    console.log('innerHeight', this.innerHeight)
    console.log('scale0', this.scale.y(0))
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
    .legend{
        margin-top: $margin-space/2 !important;
        font-size: 0.8em;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0 10px 5px 10px;
        .dot {
          border-radius: 50%;
          display: inline-block;
          margin-right: 3px;
          width: 13px;
          height: 13px;
          &.one {
            background-color: getColor(neon,80);
            margin-left: 10px;
          }
          &.two {
            background-color: #5263ff;
          }
          &.cpol{
            border: 1px solid $color-neon;
            background-color: getColor(grey,100);
            margin-left: 10px;
          }
        }
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
      margin-left: $margin-space/2;
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
    width: 65%;
    height: 86%;
    background-color: rgba(221,214,255,.2);
    margin-top: $margin-space*1.5;
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

    .scenario-base {
      fill: white;
      stroke: getColor(grey, 20);
    }
    .Industry-two {
      fill: $color-neon;
    }
    .Industry-one {
      fill: getColor(neon, 80);
    }
    .Industry-baseline-two {
      fill: white;
      stroke: $color-neon;
    }
    .Industry-baseline-one {
      fill: white;
      stroke: getColor(neon, 80);
    }
  }
}

</style>
