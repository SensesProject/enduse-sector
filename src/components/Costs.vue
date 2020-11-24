<template>
  <div class="fossil-costs" ref="inCosts">
    <CostsSelector/>
    <div>
      <svg :width="innerWidth" :height="innerHeight - margin.bottom" :transform="`translate(${margin.left}, 0)`">
        <text x="0" :y="10">Direct Emissions cost</text>
        <text x="0" :y="innerHeight / 2">Indirect Emissions cost</text>
        <g v-for="(charts, cs) in bubbleCharts" :key="cs">
          <g class="sector-container" :class="charts.klass" :transform="`translate(${charts.horizontalPosition + (margin.left * 3)}, 0)`">
            <g v-for="(chart,c) in charts.groups" :key="c" class="comparison-container" :transform="`translate(0, ${chart.verticalPosition})`">
              <CostsTicks :data="chart.yTicks" :scale="chart.scale" :xScale="scales.x"/>
              <g v-for="(bubble, b) in chart.data" :key="b" class="bubbles">
                <BubblesLabels :xPos="bubble.xPos" :yPos="bubble.yPos" :radius="bubble.radius" :labels="[bubble.costLabel, bubble.ejLabel, bubble.yearLabel]" :xScale="scales.x" :scale="chart.scale"/>
                <line :x1="bubble.xPos" :x2="bubble.xPos" :y1="chart.scale(0)" :y2="bubble.yPos"/>
                <circle :cx="bubble.xPos" :cy="bubble.yPos" :r="bubble.radius" />
                <g v-if="comparison === 'relative'" class="difference-bubbles">
                  <circle v-for="(bubble, b) in chart.data" :key="`${b}-compar`" :cx="bubble.xPos" :cy="bubble.yPos" :r="bubble.diffRadius" fill="black"/>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { map, filter, groupBy, range } from 'lodash'
import { max, min } from 'd3-array'
import { scaleLinear } from 'd3-scale'
import CostsSelector from './Costs/CostsSelector.vue'
import BubblesLabels from './Costs/BubblesLabels.vue'
import CostsTicks from './Costs/CostsTicks.vue'

export default {
  name: 'Costs',
  components: {
    CostsSelector,
    CostsTicks,
    BubblesLabels
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
      currentSelection: null,
      active: false,
      over: '',
      margin: {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10
      },
      innerHeight: 0
    }
  },
  computed: {
    ...mapState(['CostsData', 'years', 'scenarios', 'sectors', 'regions', 'currentScenario', 'currentRegion', 'comparison']),
    innerWidth () { return this.width - this.margin.left },
    innerGraph () {
      return {
        width: this.innerWidth - (this.margin.left + this.margin.right) - 100,
        height: (this.innerHeight - this.margin.bottom * 25) + this.margin.bottom
      }
    },
    scenarioFilter () { return filter(this.CostsData, f => { return f.scenario === this.currentScenario }) },
    filteredData () { return filter(this.scenarioFilter, f => { return f.region === this.currentRegion }) },
    maxEj () { return max(map(this.filteredData, el => { return el.value })) },
    maxDirCost () { return max(map(this.filteredData, el => { return el.directEmissionsCosts })) },
    maxIndCost () { return max(map(this.filteredData, el => { return el.indEmissionsCosts })) },
    sectorData () { return groupBy(this.filteredData, el => { return el.sector }) },
    scales () {
      const { comparison, years, maxEj, maxDirCost, maxIndCost } = this
      const xDom = [min(map(years, y => { return y })), max(map(years, y => { return y }))]
      const xRange = [this.margin.left, this.innerGraph.width / 3.5]

      const yDom = [0, maxDirCost]
      const yDomInd = [0, maxIndCost]

      const yRan = [(this.innerHeight - this.margin.bottom) / 2.5, 10]
      const yRangeDiff = [50, (this.innerHeight - this.margin.bottom) / 2.5]
      const yRange = comparison === 'relative' ? yRangeDiff : yRan

      const rDom = [0, Math.sqrt(maxEj)]
      const rDomDiff = [0, Math.sqrt(maxEj)]
      const rRange = [0, 1]
      const rDomain = comparison === 'relative' ? rDomDiff : rDom

      return {
        x: scaleLinear().domain(xDom).range(xRange),
        yDirect: scaleLinear().domain(yDom).range(yRange),
        yIndirect: scaleLinear().domain(yDomInd).range(yRange),
        radius: scaleLinear().domain(rDomain).range(rRange)
      }
    },
    rangeIntervals () {
      return {
        dirRange: this.calcRange(this.maxDirCost),
        indRange: this.calcRange(this.maxIndCost)
      }
    },
    bubbleCharts () {
      const { scales, comparison, rangeIntervals } = this
      let groupCount = 0
      let horizontalPosition = 0
      return map(this.sectorData, (sector, i) => {
        if (groupCount !== 0) {
          horizontalPosition = (this.innerWidth - this.margin.left * 30) / groupCount
        }
        groupCount = groupCount + 1
        return {
          horizontalPosition: horizontalPosition,
          klass: i,
          groups: {
            direct: {
              verticalPosition: this.margin.top * 2,
              scale: scales.yDirect,
              yTicks: range(0, this.maxIndCost, rangeIntervals.dirRange),
              data: map(sector, (el, i) => {
                const scenarioKlass = el.scenario === 'Current Policies' ? 'CurrentPolicies' : el.scenario
                const costValue = comparison === 'relative' ? el.directEmissionCosts_diff : el.directEmissionsCosts
                return {
                  yearLabel: el.year,
                  ejLabel: Math.round(el.value * 10) / 10,
                  costLabel: Math.round(el.directEmissionsCosts / 1000000000),
                  klass: scenarioKlass,
                  xPos: scales.x(el.year),
                  yPos: scales.yDirect(costValue),
                  radius: scales.radius(el.value),
                  diffRadius: scales.radius(el.value_diff)
                }
              })
            },
            indirect: {
              verticalPosition: this.innerHeight / 2,
              scale: scales.yIndirect,
              yTicks: range(0, this.maxIndCost, rangeIntervals.indRange),
              data: map(sector, (el, i) => {
                const scenarioKlass = el.scenario === 'Current Policies' ? 'CurrentPolicies' : el.scenario
                const costValue = comparison === 'relative' ? el.indEmissionCosts_diff : el.indEmissionsCosts
                return {
                  yearLabel: el.year,
                  ejLabel: Math.round(el.value * 10) / 10,
                  costLabel: Math.round(el.indEmissionsCosts / 1000000000),
                  klass: scenarioKlass,
                  xPos: scales.x(el.year),
                  yPos: scales.yIndirect(costValue),
                  radius: scales.radius(el.value),
                  diffRadius: scales.radius(el.value_diff)
                }
              })
            }
          }
        }
      })
    }
  },
  // watch: {
  //   comparison (current, previous) {
  //     if (current === 'relative') {
  //       const newscenarios = filter(this.scenarios, (s) => { return s !== 'NPi_v3' })
  //       this.scenarios = newscenarios
  //       this.currentScenario = 'NPi2020_1000_v3'
  //     } else {
  //       // this.scenarios = [...new Set(Costs.map(r => r.Scenario))]
  //       // this.currentScenario = 'Current Policies'
  //     }
  //   },
  //   step (currentStep, previousStep) {
  //     if (currentStep === 0) {
  //       this.currentScenario = 'NPi_v3'
  //       this.comparison = 'absolute'
  //     } else if (currentStep === 1) {
  //       this.currentScenario = 'NPi2020_1000_v3'
  //       this.comparison = 'absolute'
  //     } else if (currentStep === 2) {
  //       this.comparison = 'absolute'
  //       this.currentScenario = 'NPi2020_400_v3'
  //     } else if (currentStep === 3) {
  //       this.currentScenario = 'NPi2020_1000_v3'
  //       this.comparison = 'relative'
  //     } else if (currentStep === 4) {
  //       this.currentScenario = 'NPi_v3'
  //       this.comparison = 'absolute'
  //     }
  //   }
  // },
  methods: {
    calcSizes () {
      const { inCosts: el } = this.$refs
      const innerHeight = el.clientHeight || el.parentNode.clientHeight
      this.innerHeight = Math.max(innerHeight, 500)
    },
    calcRange (range) {
      range = range.toString()
      let i = range.length <= 12 ? 2 : 1
      let num = 2
      while (range[i] && range[i] !== '.') {
        num += '0'
        i++
      }
      return Number(num)
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
.fossil-costs {
  height: 90%;

  svg {
    g.ResidentialCommercial {
      circle {
        fill: rgb(255,187,51);
        stroke: rgb(179,119,0);
      }
    }

    g.Industry {
      circle {
        fill: rgb(196,77,255);
        stroke: rgb(140,25,255);
      }
    }

    g.Transportation {
      circle {
        fill: rgb(102,127,255);
        stroke: rgb(25,64,255);
      }
    }

    g.bubbles {
      line {
        stroke: gray;
      }
      circle {
        fill-opacity: 0.4;
        stroke-opacity: 0;
      }
      .labels {
        opacity: 0;

        .year {
          text-anchor: center;
        }
      }
    }

    g.bubbles:hover {
      line {
        stroke: black;
      }
      circle {
        stroke-opacity: 1;
        fill-opacity: 1;
      }
      .labels {
        opacity: 1;
      }
    }
  }

}
</style>
