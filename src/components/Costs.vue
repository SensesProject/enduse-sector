<template>
  <div class="fossil-costs" ref="inCosts">
    <CostsSelector/>
    <div>
      <svg :width="innerWidth" :height="innerHeight - margin.bottom" :transform="`translate(${margin.left}, 0)`">
        <text x="0" y="10">Direct Emissions cost</text>
        <text x="0" :y="innerHeight / 2">Indirect Emissions cost</text>
        <g v-for="(charts, cs) in bubbleCharts" :key="cs">
          <g class="sector-container" :class="charts.klass" :transform="`translate(${charts.horizontalPosition + (margin.left * 3)}, 0)`">
            <text x="0" y="40" class="title">{{charts.klass}}</text>
            <text x="0" :y="innerHeight / 2 + 30" class="title">{{charts.klass}}</text>
            <g v-for="(chart,c) in charts.groups" :key="c" class="comparison-container" :transform="`translate(0, ${chart.verticalPosition})`">
              <g v-for="(bubble, b) in chart.data" :key="b" class="bubbles">
                <BubblesLabels v-if="comparison == 'absolute'" :xPos="bubble.xPos" :yPos="bubble.yPos" :radius="bubble.radius" :labels="[bubble.costLabel, bubble.ejLabel, bubble.yearLabel]" :xScale="scales.x" :scale="chart.scale"/>
                <BubblesLabels v-else :xPos="bubble.xPos" :yPos="bubble.yPos" :radius="bubble.radius" :labels="[bubble.costLabelDiff, bubble.ejLabelDiff, bubble.yearLabel]" :xScale="scales.x" :scale="chart.scale"/>
                <line :x1="bubble.xPos" :x2="bubble.xPos" :y1="chart.scale(0)" :y2="bubble.yPos"/>
                <circle v-if="comparison == 'relative'"  class= "difference-bubbles" :key="`${b}-compar`" :cx="bubble.xPos" :cy="bubble.yPos" :r="bubble.baseRadius"/>
                <circle :cx="bubble.xPos" :cy="bubble.yPos" :r="bubble.radius" :class="{blend: comparison === 'relative'}"/>
              </g>
              <CostsTicks :data="chart.yTicks" :scale="chart.scale" :xScale="scales.x"/>
            </g>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { map, filter, groupBy } from 'lodash'
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

      const yRange = [(this.innerHeight - this.margin.bottom) / 2.5, 50]
      // const yRangeDiff = [50, (this.innerHeight - this.margin.bottom) / 2.5]
      // const yRange = comparison === 'relative' ? yRangeDiff : yRan

      const rDom = [0, Math.sqrt(maxEj)]
      const rDomDiff = [0, Math.sqrt(maxEj)]
      const rRange = [1, 2]
      const rDomain = comparison === 'relative' ? rDomDiff : rDom

      return {
        x: scaleLinear().domain(xDom).range(xRange),
        yDirect: scaleLinear().domain(yDom).range(yRange),
        yIndirect: scaleLinear().domain(yDomInd).range(yRange),
        radius: scaleLinear().domain(rDomain).range(rRange)
      }
    },
    bubbleCharts () {
      const { scales, comparison } = this
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
              yTicks: scales.yDirect.ticks(5),
              data: map(sector, (el, i) => {
                const scenarioKlass = el.scenario === 'Current Policies' ? 'CurrentPolicies' : el.scenario
                const costValue = comparison === 'relative' ? el.directEmissionCosts_diff : el.directEmissionsCosts
                return {
                  yearLabel: el.year,
                  ejLabel: Math.round(el.value * 10) / 10,
                  ejLabelDiff: Math.round(el.value_diff * 10) / 10,
                  costLabel: Math.round(el.directEmissionsCosts / 1000000000),
                  costLabelDiff: Math.round(el.directEmissionCosts_diff / 1000000000),
                  klass: scenarioKlass,
                  xPos: scales.x(el.year),
                  yPos: scales.yDirect(costValue),
                  radius: scales.radius(el.value),
                  baseRadius: scales.radius(el.value_baseline)
                }
              })
            },
            indirect: {
              verticalPosition: this.innerHeight / 2,
              scale: scales.yIndirect,
              yTicks: scales.yIndirect.ticks(5),
              data: map(sector, (el, i) => {
                const scenarioKlass = el.scenario === 'Current Policies' ? 'CurrentPolicies' : el.scenario
                const costValue = comparison === 'relative' ? el.indEmissionCosts_diff : el.indEmissionsCosts
                return {
                  yearLabel: el.year,
                  ejLabel: Math.round(el.value * 10) / 10,
                  ejLabelDiff: Math.round(el.value_diff * 10) / 10,
                  costLabel: Math.round(el.indEmissionsCosts / 1000000000),
                  costLabelDiff: Math.round(el.indEmissionCosts_diff / 1000000000),
                  klass: scenarioKlass,
                  xPos: scales.x(el.year),
                  yPos: scales.yIndirect(costValue),
                  radius: scales.radius(el.value),
                  baseRadius: scales.radius(el.value_baseline)
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
    }
  },
  mounted () {
    console.log('CostsData', this.CostsData)
    console.log('sectorData', this.sectorData)
    console.log('bubbleCharts', this.bubbleCharts)
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
$transition-time: 0.5s;
.fossil-costs {
  height: 90%;

  svg {
    g.Industry {
      text.title {
        fill: rgb(179,119,0);
      }
      circle {
        fill: rgb(255,187,51);
        stroke: rgb(179,119,0);
      }
    }

    g.Transportation  {
      text.title {
        fill: rgb(140,25,255);
      }
      circle {
        fill: rgb(196,77,255);
        stroke: rgb(140,25,255);
      }
    }

    g.ResidentialCommercial {
      text.title {
        fill: rgb(25,64,255);
      }
      circle {
        fill: rgb(102,127,255);
        stroke: rgb(25,64,255);
      }
    }

    g.bubbles {
      line {
        transition: all $transition-time;
        stroke: gray;
      }
      circle {
        transition: all $transition-time;
        fill-opacity: 0.4;
        stroke-opacity: 0;
      }

      .blend {
        fill-opacity: 1;
        stroke-opacity: 1;
        stroke-dasharray: 2 2;
        fill: white;
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
        transition: all $transition-time;
        opacity: 1;
      }
    }

    g.difference-bubbles {
      transition: all $transition-time;
      fill-opacity: 0.4;
      stroke-opacity: 0;
    }
    g.difference-bubbles:hover {
      fill-opacity: 1;
      stroke-opacity: 1;
    }
  }

}
</style>
