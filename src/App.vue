<template>
  <div id="app">
    <SensesMenu :id="'power-sector'"/>
    <div class="content" :class="mobile ? 'isMobile' : 'isDesktop'" ref="container">
      <div class="title-wrapper">
        <h1 class="module-title">Transition risks <br>Enduse Sector Transformation</h1>
        <div class="text-wrapper">
        <p class="intro-paragraph" >This is the third chapter of the Transition Risks modules. You can select another chapter below.
          The Transition Risks modules are based on the Risk Factor Pathways as created by the UNEP
          Finance Initiative and Olyver Wyman in their report <a id="link" href="https://www.unepfi.org/wordpress/wp-content/uploads/2018/04/EXTENDING-OUR-HORIZONS.pdf" target="_blank">Extending Our Horizons</a>.
          These Risk Factor Pathways (RFPs) structure the different types of risks that emerge for the finance sector from the transition
          to a low-carbon future.</p>
      </div>
    </div>
      <h3 id="header">Transition Risks modules:</h3>
      <RiskPathway :mobile="mobile"/>
      <div class="text-wrapper">
        <h3 class="chapter-title" id="introduction">
          What risks will be discussed?
        </h3>
        <p class="two-column-paragraph">The Enduse sector goes through a transition from Lorem ipsum dolor sit amet, consetetur
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
      <LayoutScrollytelling>
        <template v-slot:vis="{ width, height, step }">
          <div class="vis-inner" :style="{width: `${width}px`, height: `${height}px`}">
            <FinalEnergy :width="width" :height="height" :step="step"/>
          </div>
        </template>
        <div slot="text" class="observer">
          <IntersectionObserver :step="0"  align="left">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </p>
          </IntersectionObserver>
          <IntersectionObserver :step="1"  align="left" class="changeheight">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </p>
          </IntersectionObserver>
        </div>
      </LayoutScrollytelling>
      <div class="text-wrapper">
        <h2 class="chapter-title" id="costs">
          Costs risks
        </h2>
        <p class="two-column-paragraph"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.</p>
      </div>
     <LayoutScrollytelling>
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
              <IntersectionObserver :step="3"  align="right" class="changeheight">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat...</p>
              </IntersectionObserver>
              <IntersectionObserver no-styling :step="4"  align="right" class="changeheight">
                <p></p>
              </IntersectionObserver>
            </div>
          </LayoutScrollytelling>
      <div class="text-wrapper">
        <h2 class="chapter-title" id="costs">
          Revenue changes
        </h2>
        <p class="two-column-paragraph"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.</p>
      </div>
      <LayoutScrollytelling>
        <template v-slot:vis="{ width, height, step }">
          <div class="vis-inner" :style="{width: `${width}px`, height: `${height}px`}">
            <Revenue :width="width" :height="height" :step="step"/>
          </div>
        </template>
        <div slot="text" class="observer">
        <IntersectionObserver :step="0"  align="right">
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
        <p class="two-column-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
          ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.</p>
      </div>
      <LayoutScrollytelling>
        <template v-slot:vis="{ width, height, step }">
          <div class="vis-inner" :style="{width: `${width}px`, height: `${height}px`}">
            <InvestmentNeed :width="width" :height="height" :step="step"/>
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
        </div>
      </LayoutScrollytelling>
      <div class="text-wrapper" id="last-text">
        <h2 class="chapter-title" id="conclusion">
          Assessing risks with the help of climate scenarios
        </h2>
        <p class="two-column-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
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
import InvestmentNeed from './components/InvestmentNeed.vue'
import Costs from './components/Costs.vue'
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
    InvestmentNeed,
    Costs,
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
      if (el !== 'undefined') {
        const totalWidth = el.clientWidth
        const totalHeight = el.clientHeight || el.parentNode.clientHeight
        this.width = Math.max(totalWidth, 400)
        this.height = Math.max(totalHeight, 400)
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

<style lang="scss">
@import "library/src/style/base.scss";
@import "library/src/style/variables.scss";

#app {
  margin: 0 auto;

  .changeheight {
    padding-bottom: 2000px;
  }
  .changeheightstructure {
    padding-bottom: 1000px;
  }
  #link {
    background: none;
  }
  .content {
    max-width: 900px;
    margin: 0 auto;
    .title-wrapper {
      margin-bottom: $spacing;
      .module-title {
        font-size: 40px;
        margin-bottom: $spacing *1.5;
        padding-top: $spacing;
      }
    }
    .not-available {
      cursor: not-allowed;
        color: gray;
        opacity: 0.7;
        background: none;
    }
    #header {
      margin-bottom: $spacing/2;
    }
    .text-wrapper {
      margin-top: $spacing;
      margin-bottom: $spacing;

      .two-column-paragraph {
        margin-bottom: $spacing * 2;
        column-count: 2;
      }
      .intro-paragraph {
        margin-bottom: $spacing * 0.5;
        column-count: 2;
      }
      .chapter-title {
        margin-bottom: $spacing;
        padding-top: $spacing;
        &#introduction {
          margin-bottom: $spacing/3;

        }

      }

      &#last-text {
        margin-bottom: 100px;
      }

      #conclusion {
        padding-top: 30px;
      }
    }
    .intersection-observer .default {
      -webkit-box-shadow: 2px 2px 9px 0px rgba(128,128,128,0.12);
      -moz-box-shadow: 2px 2px 9px 0px rgba(128,128,128,0.12);
      box-shadow: 2px 2px 9px 0px rgba(128,128,128,0.12);
      width: 33%;
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
      .module-title {
        padding-left: $spacing/2;
      }
      #header {
        padding-left: $spacing/2;
      }
    }
  }
}

.tooltip {
  $background-color: #fff;
  $text-color: #222;

  display: block !important;
  z-index: 10000;
  box-shadow: $box-shadow--strong;

  font-weight: $font-weight-regular;
  letter-spacing: 0.02em;
  max-width: 400px;

  .tooltip-inner {
    background: $background-color;
    color: $text-color;
    border-radius: $border-radius;
    padding: $spacing / 3 $spacing / 2 $spacing / 2;

    header {
      font-weight: $font-weight-bold;
      line-height: 1.12;
      margin: 0 0 $spacing / 6;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid $color-pale-gray;
      padding-bottom: 0.6rem;
      margin-bottom: 0.9rem;
    }

    p {
      font-size: 0.8rem;
    }

    footer {
      border-top: 1px solid $color-pale-gray;
      display: flex;
      justify-content: space-between;
      padding-top: 0.6rem;
      margin-top: 0.9rem;
    }
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: $background-color;
    z-index: 1;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, .1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}
</style>
