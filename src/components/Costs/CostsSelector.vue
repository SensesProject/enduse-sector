<template>
  <div class="key">
    <div class="title">
      <h3>Fuel costs and final energy use</h3>
      <a href="https://docs.messageix.org/projects/global/en/latest/" target="_blank">(Model: MESSAGEix-GLOBIOM_1.0)</a>
    </div>
    <div class="selectors">
      <SensesSelect :options="scenarios" v-model="currentScenario"/>
      <SensesSelect :options="regions" v-model="currentRegion"/>
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
