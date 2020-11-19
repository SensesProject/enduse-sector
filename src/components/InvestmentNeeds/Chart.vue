<template>
  <div class="bars">
    <span class="label" v-html="label" />
    <div class="intro">
      <span>{{ selectedRegion }}: <strong>{{ sumThis }}</strong> BN US$ per year average 2020–2030</span>
    </div>
    <svg ref="vis" class="vis">
      <g v-if="width">
        <g v-for="(el, i) in elements" v-tooltip="el.tooltip" :key="el.id">
          <Bar
            v-bind="el" />
          <g v-if="el.widthRef !== el.width && isStacked" :class="['difference', { showDifference }]">
            <DiffLess
              v-if="el.widthRef < el.width"
              v-bind="el" />
            <DiffMore
              v-else
              v-bind="el" />
          </g>
          <Label
            v-bind="el"
            :widths="widths[i]"
            v-if="!(showDifference && scenario === 'CPol') && isStacked"
            :showDifference="showDifference" />
          <Label
            v-bind="el"
            :widths="widths[i]"
            v-if="(scenario === 'CPol') && isStacked"
            :showDifference="false" />
        </g>
      </g>
      <PatternDefs />
    </svg>
  </div>
</template>

<script>
import { scaleLinear } from 'd3-scale'
import { map, sum, filter, get } from 'lodash'
import { format } from 'd3-format'
import Bar from './Bar'
import PatternDefs from './PatternDefs'
import DiffLess from './DiffLess'
import DiffMore from './DiffMore'
import Label from './Label'

const colors = {
  Industry: '#FFAC00',
  Transport: '#B035C9',
  'Residential and commercial': '#00A5D5'
}

function getColorFromVariable (variable) {
  return get(colors, variable, '#000')
}

const names = {
  Industry: 'Industry',
  Transport: 'Transport',
  'Residential and commercial': 'Residential and commercial'
}

function getNameFromVariable (variable) {
  return get(names, variable, '?')
}

export default {
  name: 'InvestmentNeedsStackedBarChart',
  props: ['data', 'scenario', 'extents', 'variables', 'gap', 'isStacked', 'showDifference', 'selectedRegion'],
  components: {
    Bar,
    PatternDefs,
    DiffLess,
    DiffMore,
    Label
  },
  data: () => {
    return {
      width: 100,
      height: 100,
      margin: {
        left: 0,
        right: 0,
        top: 70,
        bottom: 10
      }
    }
  },
  computed: {
    label () {
      const subject = this.selectedRegion === 'World' ? 'We are' : `${this.selectedRegion} is`
      const labels = {
        CPol: `What ${subject} <strong>currently</strong> investing (Current policies)`,
        NDC: `What ${this.selectedRegion} <strong>pledged</strong> to invest (Nationally Determined Contributions)`,
        '2C': `What ${this.selectedRegion} <strong>should</strong> invest for <strong>2°C</strong>`,
        '1.5C': `What ${this.selectedRegion} <strong>should</strong> invest for <strong>1.5°C</strong>`
      }
      return get(labels, this.scenario)
    },
    total () {
      // The total sum of values. This marks the max value for the x-scale
      return sum(map(this.variables, (variable) => {
        return get(this.extents, variable, 0)
      }))
    },
    scaleX () {
      return scaleLinear()
        .range([this.margin.left, this.width - (this.variables.length - 1) * 1.2 * this.gap - this.margin.right])
        .domain([0, this.total])
    },
    widths () {
      return map(this.elements, (d) => get(d, 'x1', 0) - this.gap)
    },
    sumThis () {
      return this.formatNumber(sum(map(this.elements, 'value')))
    },
    barHeight () {
      return this.height / 2
    },
    elements () {
      let x0 = 0
      return map(this.variables, (variable) => {
        const color = getColorFromVariable(variable)
        const name = getNameFromVariable(variable)
        const data = get(filter(this.data, { variable, region: this.selectedRegion }), 0)

        const value = get(data, 'value', 0)
        const ref = get(data, 'ref', 0)
        const extent = get(this.extents, variable, 0)

        const diff = value - ref

        const tooltip = this.createTooltip(variable, value, ref, diff)

        const width = this.scaleX(value)
        const widthRef = this.scaleX(ref)
        const widthExtent = this.scaleX(extent) + this.gap

        const x1 = this.isStacked ? widthExtent : width // End

        const obj = {
          id: variable,
          x: x0, // Start
          label: this.formatNumber(value),
          height: this.barHeight,
          x1,
          width,
          widthRef,
          value,
          color,
          name,
          tooltip,
          diff: (diff > 0 ? '+' : '') + this.formatNumber(diff).replace('-', '–')
        }

        x0 += x1
        return obj
      })
    }
  },
  mounted () {
    this.$nextTick(() => { this.$nextTick(() => { this.calcSizes() }) })
    window.addEventListener('resize', this.calcSizes, false)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.calcSizes, false)
  },
  methods: {
    createTooltip (variable, value, reference, diff) {
      const { formatNumber: fN } = this
      const subject = this.selectedRegion === 'World' ? 'We are' : `${this.selectedRegion} is`
      switch (this.scenario) {
        case 'CPol':
          return `
            <header>${variable}</header>
            <p>
              ${subject} currently investing <strong>${fN(reference)}</strong> BN US$ per year in ${variable}.
            </p>
          `
        case 'NDC':
          return `
            <header>${variable}</header>
            <p>
              ${subject} currently investing <strong>${fN(reference)}</strong> BN US$ per year in ${variable},<br />
              but we pledged to invest <strong>${fN(value)}</strong>.
              That means, we pledged<br />
              to invest <strong>${fN(Math.abs(diff))} ${diff > 0 ? 'more' : 'less'}</strong> in ${variable}.
            </p>
          `
        case '1.5C':
          return `
            <header>${variable}</header>
            <p>
              ${subject} currently investing <strong>${fN(reference)}</strong> BN US$ per year in ${variable},<br />
              but for for the 1.5C target we should invest <strong>${fN(value)}</strong>.
              That means,<br />
              we should invest <strong>${fN(Math.abs(diff))} ${diff > 0 ? 'more' : 'less'}</strong> in ${variable}.
            </p>
          `
        case '2C':
          return `
            <header>${variable}</header>
            <p>
              ${subject} currently investing <strong>${fN(reference)}</strong> BN US$ per year in ${variable},<br />
              but for for the 2C target we should invest <strong>${fN(value)}</strong>.
              That means,<br />
              we should invest <strong>${fN(Math.abs(diff))} ${diff > 0 ? 'more' : 'less'}</strong> in ${variable}.
            </p>
          `
      }
    },
    calcSizes () {
      const { vis: el } = this.$refs
      if (el !== 'undefined') {
        this.width = el.clientWidth || el.parentNode.clientWidth
      } else {
        // this.$nextTick(() => { this.calcSizes() })
      }
    },
    formatNumber (n) {
      return format('.1f')(n)
    }
  }
}
</script>

<style lang="scss">
@import "library/src/style/variables.scss";

  .bars {
    .label {
      margin-bottom: $spacing / 100;
      display: block;
      font-size: 0.8em;

      small {
        font-size: 0.8em;
        //color: getColor(gray, 80);
      }
    }

    .intro {
      font-size: 0.8em;
      margin-bottom: $spacing / 4;
      display: block;
      color: getColor(gray, 40);
    }

    .vis {
      width: 100%;
      height: calc(70px + 5px + #{8px});

      rect, text {
        transition: opacity 0.3s, width 0.3s, height 0.3s, y 0.3s, x 0.3s;
      }

      line {
        transition: opacity 0.3s, x1 0.3s, x2 0.3s, y1 0.3s, y2 0.3s;
      }

      line {
        &.more {
          stroke: #fff;
          stroke-width: 2px;
          stroke-dasharray: 1px, 1px;
        }
      }

      .difference {
        rect, line {
          opacity: 0;
        }

        &.showDifference {
          rect, line {
            opacity: 1;
          }
        }
      }

      .label {
        font-size: 8px;
        fill: getColor(gray, 60);
      }
    }

    .labels {
      display: grid;
      font-size: 8px;
      color: getColor(gray, 60);
    }
  }
</style>
