import Vue from 'vue'
import Vuex from 'vuex'
import Costs from 'dsv-loader!@/assets/data/EndEnergyAndCosts.csv' // eslint-disable-line import/no-webpack-loader-syntax
import { map, uniq } from 'lodash'

Vue.use(Vuex)

const CostsData = map(Costs, (d, i) => {
  return {
    model: d.Model,
    scenario: d.Scenario,
    region: d.Region,
    sector: d.Sector,
    unit: d.Unit,
    year: +d.Year,
    value: +d.Value,
    value_diff: +d.Value_diff,
    directEmissionsCosts: +d['Direct Emissions Costs'],
    indEmissionsCosts: +d['Indirect Emission Costs'],
    directEmissionCosts_diff: +d['Direct Emission Costs diff'],
    indEmissionCosts_diff: +d['Indirect Emissions Costs diff'],
    direct_baseline: +d['Direct baseline'],
    ind_baseline: +d['Ind baseline'],
    value_baseline: +d['Value baseline']
  }
})

const years = uniq(map(CostsData, (y, i) => { return y.year }))
const scenarios = uniq(map(CostsData, (y, i) => { return y.scenario }))
const sectors = uniq(map(CostsData, (y, i) => { return y.sector }))
const regions = uniq(map(CostsData, (y, i) => { return y.region }))

export default new Vuex.Store({
  state: {
    CostsData,
    years,
    scenarios,
    sectors,
    regions,
    currentScenario: 'Current Policies',
    currentRegion: 'World',
    comparison: 'absolute'
  },
  mutations: {
    changeScenario (state, value) {
      state.currentScenario = value
    },
    changeRegion (state, value) {
      state.currentRegion = value
    },
    changeComparison (state, value) {
      state.comparison = value
    },
    newScenarios (state, value) {
      state.scenarios = value
    }
  },
  actions: {
  },
  modules: {
  }
})
