<template>
  <div id="app">
    <SensesMenu :id="'power-sector'"/>
    <div class="content" :class="mobile ? 'isMobile' : 'isDesktop'" ref="container">
      <div class="text-wrapper">
        <h1 class="module-title">Transition risks – Enduse Sector</h1>
        <p>This is the third chapter of the Finance Risks Pathway.
          You can select another chapter below.</p>
      </div>
      <RiskPathway :mobile="mobile"/>
      <div class="text-wrapper">
        <h2 class="chapter-title" id="introduction">
          What kind of risks are we talking about?
        </h2>
        <p>The Enduse sector goes through a transition from Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
          no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua.
          </p>
      </div>
      <div class="text-wrapper">
        <h2 class="chapter-title-transition">
          Physical Transition
        </h2>
      </div>
      <div class="vis-wrapper finalenergy">
        <FinalEnergy :width="width" :height="height" :mobile="mobile"/>
      </div>
      <div class="text-wrapper">
        <h2 class="chapter-title" id="costs">
          Fuel cost changes
        </h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.</p>
      </div>
<!--      <LayoutScrollytelling>
              <template v-slot:vis="{ width, height, step }">
                <div class="vis-inner" :style="{width: `${width}px`, height: `${height}px`}">
                  <Costs :width="width" :height="height" :step="step"/>
                </div>
              </template>
              <div slot="text" class="observer">
              <IntersectionObserver :step="0"  align="right">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat.
                </p>
              </IntersectionObserver>
              <IntersectionObserver :step="1"  align="right">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat.
                </p>
              </IntersectionObserver>
              <IntersectionObserver :step="2"  align="right">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat.
                </p>
              </IntersectionObserver>
              <IntersectionObserver :step="3"  align="right">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat.</p>
              </IntersectionObserver>
              <IntersectionObserver no-styling :step="4"  align="right" class="changeheight">
                <p></p>
              </IntersectionObserver>
            </div>
          </LayoutScrollytelling> -->
      <LayoutScrollytelling>
        <template v-slot:vis="{ width, height, step }">
          <div class="vis-inner" :style="{width: `${width}px`, height: `${height}px`}">
            <Revenue :width="width" :height="height" :step="step"/>
          </div>
        </template>
        <div slot="text" class="observer">
        <IntersectionObserver :step="0"  align="left">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
            sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </IntersectionObserver>
      </div>
      </LayoutScrollytelling>
      <div class="text-wrapper">
        <h2 class="chapter-title" id="structure">
          Investment need
        </h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.</p>
      </div>
      <div class="text-wrapper" id="last-text">
        <h2 class="chapter-title" id="conclusion">
          Assessing risks with the help of climate scenarios
        </h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.</p>
      </div>
      <SensesMeta :id="'power-sector'"/>
    </div>
  </div>
</template>

<script>
import SensesMenu from 'library/src/components/SensesMenu.vue'
import RiskPathway from './components/RiskPathway.vue'
import FinalEnergy from './components/FinalEnergy.vue'
import Revenue from './components/Revenue.vue'
// import Costs from './components/Costs.vue'
import SensesMeta from 'library/src/components/SensesMeta.vue'
import LayoutScrollytelling from 'library/src/components/LayoutScrollytelling.vue'
import IntersectionObserver from 'library/src/components/IntersectionObserver.vue'

export default {
  name: 'App',
  components: {
    SensesMenu,
    RiskPathway,
    FinalEnergy,
    Revenue,
    // Costs,
    SensesMeta,
    LayoutScrollytelling,
    IntersectionObserver
  },
  data () {
    return {
      width: 0,
      height: 0
    }
  },
  computed: {
    mobile () {
      let isMobile = false
      if (this.width < 750) { isMobile = true }
      return isMobile
    }
  },
  methods: {
    calcSizes () {
      const { container: el } = this.$refs
      const totalWidth = el.clientWidth
      const totalHeight = el.clientHeight || el.parentNode.clientHeight
      this.width = Math.max(totalWidth, 400)
      this.height = Math.max(totalHeight, 400)
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

<style lang="scss">
@import "library/src/style/base.scss";
@import "library/src/style/variables.scss";

#app {
  margin: 0 auto;

  .content {
    max-width: 900px;
    margin: 0 auto;

    .text-wrapper {
      margin-top: $spacing;
      margin-bottom: $spacing;

      .module-title {
        font-size: 40px;
        margin-bottom: $spacing / 2;
        padding-top: $spacing;
      }

      .chapter-title {
        margin-bottom: $spacing;
      }

      .chapter-title-transition{
        margin-bottom: $spacing/4;
      }

      &#last-text {
        margin-bottom: 100px;
      }

      #conclusion {
        border-top: 1px solid $color-gray;
        padding-top: 30px;
      }
    }
    .intersection-observer .default.left {
      // -webkit-box-shadow: 2px 2px 9px 0px rgba(128,128,128,0.12);
      // -moz-box-shadow: 2px 2px 9px 0px rgba(128,128,128,0.12);
      // box-shadow: 2px 2px 9px 0px rgba(128,128,128,0.12);
      width: 35%;
    }

    .vis-wrapper {
      margin-top: $spacing;
      // border: 0.5px solid lightblue;
      height: 100vh;

      &.finalenergy  {
        height: 100vh;
        margin-top: $spacing/2;
      }
    }

    .module-meta {
      margin-bottom: $spacing;
    }

    &.isMobile {
      .text-wrapper {
        padding: 0 20px;
      }
    }
  }
}
</style>
