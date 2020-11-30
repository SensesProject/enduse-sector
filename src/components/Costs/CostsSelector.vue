<template>
  <div class="key">
    <div class="title">
      <h3>Costs and final energy use <span class="model-label">(Model: REMIND-MAgPIE)</span></h3>
    </div>
    <div class="selectors">
      <SensesSelect :options="scenarios" v-model="currentScenario"/>
      <SensesSelect :options="regions" v-model="currentRegion"/>
      <div class="comparison_selector">
        <p>
          <span
          class="comparison"
          :class="comparison === 'absolute' ? '' : 'active-comparison'"
          v-on:click="comparison = 'absolute'"
          >Total</span>
          | <span
          class="comparison"
          :class="comparison === 'relative' ? '' : 'active-comparison'"
          v-on:click="comparison = 'relative'"
          >Difference to current policy scenario</span>
        </p>
      </div>
    </div>
    <div>
      <p class="legend">
        <span class="dot one"></span>
        <span class="dot two"></span>
        <span class="dot three"></span>
        <span>Sizes = Final energy use</span>
        <span class="dot cpol"></span>
        <span>Current policy scenario</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SensesSelect from 'library/src/components/SensesSelect.vue'

export default {
  name: 'CostsSelector',
  components: {
    SensesSelect
  },
  computed: {
    ...mapState(['scenarios', 'regions']),
    currentScenario: {
      get () {
        return this.$store.state.currentScenario
      },
      set (value) {
        this.$store.commit('changeScenario', value)
      }
    },
    currentRegion: {
      get () {
        return this.$store.state.currentRegion
      },
      set (value) {
        this.$store.commit('changeRegion', value)
      }
    },
    comparison: {
      get () {
        return this.$store.state.comparison
      },
      set (value) {
        this.$store.commit('changeComparison', value)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";

.key {
  width: 100%;
  display: static;
  .legend{
      font-size: 0.8em;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0 10px 5px 10px;
      .dot {
        border-radius: 50%;
        display: inline-block;
        background-color: getColor(grey,80);
        margin-right: 3px;
        &.one {
          width: 10px;
          height: 10px;
        }
        &.two {
          width: 15px;
          height: 15px;
        }
        &.three {
          width: 20px;
          height: 20px;
          margin-right: 8px;
        }
        &.cpol{
          width: 15px;
          height: 15px;
          margin-left: 15px !important;
          margin-right: 8px !important;
          border: 1px solid getColor(grey,40);
          margin: 0px 3px;
          border-style: dashed;
          background-color: getColor(grey,100);
        }
      }
    }
  .title, .selectors {
    font-size: 0.8em;
    display: inline-flex;
    width: 100%;
    margin: 0 10px 5px 10px;
    .senses-select {
      margin-bottom: 20px;
      margin-right: 4px;
    }

    .comparison_selector {
      margin-left: 1%;
      display: inline-flex;
      span.comparison {
        margin: 0 2px;
        cursor: pointer;
      }
      span.active-comparison {
        color: getColor(neon, 40);
        text-decoration: underline;
      }
    }

    svg {
      width: 100%;
      height: 20px;
      background: lightblue;
    }
  }
  h3 {
    .model-label    {
      color: getColor(neon, 40);
      font-weight: normal;
      display: inline;
      margin-left: 5px;
    }
  }
}
</style>
