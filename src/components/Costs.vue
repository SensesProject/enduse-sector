<template>
  <div class="fossil-costs" ref="inCosts">
    <div class="key" :class=" mobile ? 'mobile' : 'desktop'">
      <h3 v-if="comparison === 'absolute'">Fuel costs and final energy use</h3>
      <h3 v-else >Fuel costs changes and final energy use</h3>
      <a href="https://docs.messageix.org/projects/global/en/latest/" target="_blank">(Model: MESSAGEix-GLOBIOM_1.0)</a>
      <div>
        <p class="selectors">
        Select a scenario:
        <SensesSelect class="scenario_selector" :options="scenarios" v-model="currentScenario"/>
      </p>
      <p class="comparison_selector">
        <span
        class="comparison"
        :class="comparison === 'absolute' ? '' : 'active-comparison'"
        v-on:click="comparison = 'absolute'"
        >Absolute</span>
        | <span
        class="comparison"
        :class="comparison === 'relative' ? '' : 'active-comparison'"
        v-on:click="comparison = 'relative'"
        >Relative to current policy scenario</span>
      </p>
      </div>
    </div>
  </div>
</template>

<script>
import { map, range, filter } from 'lodash'
import { max, min } from 'd3-array'
import { scaleLinear } from 'd3-scale'
// import { arc } from 'd3-shape'
import Costs from 'dsv-loader!@/assets/data/EndEnergyAndCosts.csv' // eslint-disable-line import/no-webpack-loader-syntax
import SensesSelect from 'library/src/components/SensesSelect.vue'

export default {
  name: 'Costs',
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
      Costs,
      currentScenario: 'Current Policies',
      currentRegion: 'World',
      currentSector: 'Industry',
      currentSelection: null,
      comparison: 'absolute',
      active: false,
      over: '',
      margin: {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10
      },
      innerHeight: 0,
      years: [...new Set(Costs.map(r => r.Year))],
      scenarios: [...new Set(Costs.map(r => r.Scenario))]
    }
  },
  computed: {
    innerWidth () { return this.width - this.margin.left },
    innerGraph () {
      return {
        width: this.innerWidth - (this.margin.left + this.margin.right) - 100,
        height: (this.innerHeight - this.margin.bottom * 25) + this.margin.bottom
      }
    },
    filteredData () { return filter(this.Costs, f => { return f.Scenario === this.currentScenario }) },
    baseline () { return filter(this.Costs, f => { return f.Scenario === 'Current Policies' }) },
    maxEj () { return max(map(this.Costs, el => { return Number(el.Value) })) },
    maxCost () { return max(map(this.Costs, el => { return Number(el['Indirect Emission Costs']) })) },
    scales () {
      const { comparison, years, maxEj, maxCost } = this
      const xDom = [min(map(years, y => { return y })), max(map(years, y => { return y }))]
      const xRange = [this.margin.left + this.margin.right, this.innerGraph.width]

      const yDom = [0, maxCost]
      const yDiffDom = [0, -maxCost]
      const yDomain = comparison === 'relative' ? yDiffDom : yDom

      const yRan = [this.innerHeight - this.margin.bottom * 25, 100]
      const yRangeDiff = [100, this.innerHeight - this.margin.bottom * 25]
      const yRange = comparison === 'relative' ? yRangeDiff : yRan

      const rDom = [0, Math.sqrt(maxEj)]
      const rDomDiff = [0, Math.sqrt(maxEj)]
      const rRange = [0, 5]
      const rDomain = comparison === 'relative' ? rDomDiff : rDom
      return {
        x: scaleLinear().domain(xDom).range(xRange),
        y: scaleLinear().domain(yDomain).range(yRange),
        radius: scaleLinear().domain(rDomain).range(rRange)
      }
    },
    // arcGenerator () {
    //   const { scales } = this
    //   const pi = Math.PI
    //   return {
    //     absolute: arc()
    //       .innerRadius(0)
    //       .outerRadius(f => scales.radius(Math.sqrt(f.Value)))
    //       .startAngle(180 * (pi / 180))
    //       .endAngle(0),
    //     relative: arc()
    //       .innerRadius(0)
    //       .outerRadius(f => scales.radius(Math.sqrt(f.Value)))
    //       // .outerRadius(f => scales.radius(Math.sqrt(-f.Value_diff)))
    //       .startAngle(180 * (pi / 180))
    //       .endAngle(0)
    //   }
    // },
    yTicks () {
      const positiveticks = range(0, this.maxCost, 100000)
      const negativeticks = map(positiveticks, t => {
        return -t
      })
      return this.comparison === 'relative' ? negativeticks : positiveticks
    },
    arcs () {
      const { scales, comparison } = this
      return map(this.filteredData, (f, i) => {
        const costValue = comparison === 'relative' ? f['Indirect Emission Costs diff'] : f['Indirect Emission Costs']
        const quantityValue = comparison === 'relative' ? f.Value_diff : f.Value
        return {
          klass: [f.Scenario, f.Variable],
          price: Math.round(costValue),
          ej: Math.round(quantityValue * 277.78),
          year: scales.x(f.Year),
          yPos: scales.y(costValue),
          shape: scales.radius(f.Value),
          baseline: scales.radius(this.baseline[i].Value)
        }
      })
    }
  },
  watch: {
    comparison (current, previous) {
      if (current === 'relative') {
        const newscenarios = filter(this.scenarios, (s) => { return s !== 'Current Policies' })
        this.scenarios = newscenarios
        this.currentScenario = '2.0ºC'
      } else {
        this.scenarios = [...new Set(Costs.map(r => r.Scenario))]
        // this.currentScenario = 'Current Policies'
      }
    },
    step (currentStep, previousStep) {
      if (currentStep === 0) {
        this.currentScenario = 'Current Policies'
        this.comparison = 'absolute'
      } else if (currentStep === 1) {
        this.currentScenario = '2.0ºC'
        this.comparison = 'absolute'
      } else if (currentStep === 2) {
        this.comparison = 'absolute'
        this.currentScenario = '1.5ºC'
      } else if (currentStep === 3) {
        this.currentScenario = '2.0ºC'
        this.comparison = 'relative'
      } else if (currentStep === 4) {
        this.currentScenario = 'Current Policies'
        this.comparison = 'absolute'
      }
    }
  },
  methods: {
    calcSizes () {
      const { inCosts: el } = this.$refs
      const innerHeight = el.clientHeight || el.parentNode.clientHeight
      this.innerHeight = Math.max(innerHeight, 500)
    }
  },
  mounted () {
    console.log('costs', this.Costs)
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

  .key {
    margin-bottom: 2%;
  }

  .selectors {
    margin-top: 10px;
    display: inline-flex;
    margin-left: $margin-space;

    .senses-select {
      margin-left: $margin-space;
    }
  }

  .comparison_selector {
    margin-left: 5%;
    display: inline-flex;

    .comparison {
      margin: 0 5px;
      cursor: pointer;
    }

    .active-comparison {
      color: getColor(neon, 40);
      text-decoration: underline;
    }
  }
  a {
    margin-top: 5px;
    color: getColor(neon, 40);
    font-weight: normal;
    display: inline;
    margin-left: $margin-space/2;
    text-decoration: none;
    background: none;
  }
  h3 {
    display: inline-block;
    margin-left: $margin-space;
  }
  text {
    font-size: 0.7em;
  }
  svg {
    .yaxis {
      stroke-opacity: 0;
        stroke: $color-gray;
        stroke-dasharray: 1 1;

        text {
          stroke: none;
          font-size: 0.7em;
        }
    }
    .verticalLines {
      stroke: $color-gray;
      stroke-width: 0.4;
    }
    circle.invisible {
      fill-opacity: 0;
      stroke-opacity: 0.3;
    }

    circle.selected {
      fill-opacity: 1;
    }

    .legend {
      .invisible {
        fill-opacity: 0.2;
      }
    }

    line.selected {
      stroke-opacity: 1;
    }

    text.selected {
      font-size: 0.7em;
    }

    text.shadow {
      fill: none;
      stroke: white;
      stroke-width: 3px;
    }

    text.not-selected {
      visibility: hidden;
    }

    .NPi_v3 {
      transition: cy 0.5s, cx 0.5s;
    }

    .NPi2020_1000_v3 {
      transition: cy 0.5s, cx 0.5s;
    }

    .NPi2020_400_v3 {
      transition: cy 0.5s, cx 0.5s;
    }

    circle {
      stroke: black;
      transition: cy 0.5s, cx 0.5s;
      fill-opacity: 0.5;

      &.Industry {
        fill: getColor(violet, 60);
        stroke: getColor(violet, 40);
      }

      &.Oil {
        fill: getColor(orange, 80);
        stroke: getColor(orange, 40);
      }

      &.Transportation {
        fill: getColor(red, 80);
        stroke: getColor(red, 40);
      }

      &.Residential.and.Commercial {
        fill: getColor(gray, 80);
        stroke: getColor(gray, 40);
      }
      &.baseline {
        &.invisible {
          fill-opacity: 0.1;
          stroke-opacity: 0.1;
        }
        fill-opacity: 1;
      }
      &.no_baseline {
        stroke-dasharray: 4 2;
        fill: white;
        // fill: red;
      }
    }
  }
}
</style>
