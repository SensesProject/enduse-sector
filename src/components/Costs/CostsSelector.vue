<template>
  <div class="key">
    <div class="title">
      <h3>Fuel costs and final energy use</h3>
      <a href="https://docs.messageix.org/projects/global/en/latest/" target="_blank">(Model: MESSAGEix-GLOBIOM_1.0)</a>
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
          >Absolute</span>
          | <span
          class="comparison"
          :class="comparison === 'relative' ? '' : 'active-comparison'"
          v-on:click="comparison = 'relative'"
          >Relative</span><span>to current policy scenario</span>
        </p>
      </div>
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
  .title, .selectors {
    display: inline-flex;
    width: 100%;
    margin-bottom: 20px;
    .senses-select {
      margin-right: 10px;
    }

    .comparison_selector {
      margin-left: 5%;
      display: inline-flex;
      span.comparison {
        margin: 0 5px;
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
    margin-right: 10px;
  }
}
</style>
