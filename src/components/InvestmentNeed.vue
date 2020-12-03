<template>
  <section class="investments" ref="inWrapper">
    <header class="key">
      <h3>Energy efficiency investment needs within the end-use sector</h3>
      <p class="model">(Model: REMIND-MAgPIE)</p>
      <div>
        <label class="label"><input class = "checkbox" type="checkbox" v-model="isStacked">not stacked</label>
        <label class="label"><input class = "checkbox" type="checkbox" v-model="showDifference">difference highlighted</label>
        <!-- <SensesSelect class="regionSelector" v-model="selectedRegion" :options="regions" /> -->
      </div>
    </header>
    <div v-for="key in scenarios" :key="key" class="scenario">
      <Chart
        :isStacked="isStacked"
        :showDifference="showDifference"
        :gap="35"
        :data="dataByScenario[key]"
        :scenario="key"
        :extents="extents"
        :variables="visibleVariables"
        :selectedRegion="selectedRegion"
      />
    </div>
  </section>
</template>

<script>
import { groupBy, filter, map, forEach, get } from 'lodash'
// import SensesSelect from 'library/src/components/SensesSelect'
import datum from 'dsv-loader!@/assets/data/Investments.csv' // eslint-disable-line import/no-webpack-loader-syntax
import Chart from './InvestmentNeeds/Chart'

export default {
  name: 'InvestmentNeed',
  components: {
    Chart
  // SensesSelect
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
      default: true
    },
    step: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      margin: {
        top: 10,
        bottom: 10,
        right: 10,
        left: 10
      },
      innerHeight: 0,
      isStacked: true,
      showDifference: true,
      selectedRegion: 'World',
      variables: [
        'Transport',
        'Residential and commercial',
        'Industry'
      ],
      regions: [
        'World',
        'Central Asia',
        'Asia (No Japan)',
        'Middle East + Africa',
        'OECD90 + EU',
        'Latin America'
      ],
      scenarios: ['CPol', 'NDC', '2C', '1.5C']
    }
  },
  computed: {
    data () {
      return map(datum, (d) => {
        return {
          ...d,
          value: parseFloat(get(d, 'value', 0)),
          ref: parseFloat(get(d, 'ref', 0))
        }
      })
    },
    innerWidth () {
      return this.width - (this.margin.left + this.margin.right)
    },
    dataByScenario () {
      return groupBy(this.data, 'scenario')
    },
    extents () {
      // We need the maximum value for each variable for the unstacked chart
      const maxes = {}
      forEach(this.variables, (variable) => {
        const runs = filter(this.data, { variable, region: this.selectedRegion })
        // Set the max value
        maxes[variable] = Math.max(...map(runs, 'value'))
      })
      return maxes
    },
    visibleVariables () {
      // Here we filter the list of variables by checking if the hightest value for this variable exceeds 15
      return filter(this.variables, (variable) => get(this.extents, variable, 0) > 0)
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

.investments {
  height: 90vh;

  .key {
    // width: 90%;
    height: 70px;
    margin-bottom: 3%;
    padding: 0 0px;
  }
  h3{
    display: inline-block;
    padding-bottom: 5px;
    font-size: 0.8em;
  }

  .model {
    font-size: 0.8em;
    color: getColor(neon, 40);
    font-weight: normal;
    display: inline;
    margin-left: 10px;
    text-decoration: none;
    background: none;
  }
  .checkbox{
    margin-right: 5px;
  }
  .label {
    margin-right: 15px;
    align-items: center;
    font-size: 0.8em;
    display: inline-flex;
  }
  .regionSelector {
    font-size: 0.8em;
  }
}

</style>
