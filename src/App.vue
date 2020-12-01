<template>
  <div id="app">
    <SensesMenu :id="'power-sector'"/>
    <div class="content" :class="mobile ? 'isMobile' : 'isDesktop'" ref="container">
      <div class="title-wrapper">
        <h1 class="module-title">Transition risks <br>End-use Sector Transformation</h1>
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
        <p class="two-column-paragraph">The end-use sector goes through a transition from carbon-emitting fuels towards cleaner
          fuels that don’t emit CO2. These cleaner fuels are for example electricity, hydrogen or biofuels. This transition is
          primarily driven by climate policies, posing several transition risks to investors in the industry, transport and
          residential and commercial (or buildings) sectors. The consumption of energy is associated with both direct and
          indirect emissions of energy. Direct emissions occur when energy consumers burn fossil fuels themselves, whereas
          indirect emissions occur when they consume carbon-free energy carriers (like electricity) that have been produced
          from fossil fuels. Once climate policies are introduced, both these direct emission costs and the indirect changes
          in fuel costs create a risk for companies in these sectors by changing their cost structures. When these new costs
          are trickling through towards the prices of the product or services that these sectors provide, customers can respond
          by consuming more or less of these services. Depending on this customer response, the revenue for the sector can increase
          or decrease during the transition. Finally, the transition to a low-carbon system requires investments in efficiency
          in these end-use sectors as well, increasing  the capital requirements for these end-use sectors.
          </p>
      </div>
      <div class="text-wrapper">
        <h2 class="chapter-title">
          Physical Transition
        </h2>
        <p class="two-column-paragraph">We first look into the physical changes occuring in the three end-use sectors.
          Under a 1.5 degree scenario, we see a strong increase in electricity across all three sectors, followed by an
          increase of hydrogen later in the century. The use of liquids and gases, which are mostly based on fossil fuels,
          is reduced. The speed of this transition is determined by the uptake and diffusion of new technologies. On top of
          these changes in fuel use, increased efficiency also reduces the demand for energy.
        </p>
      </div>
      <LayoutScrollytelling>
        <template v-slot:vis="{ width, height, step }">
          <div class="vis-inner" :style="{width: `${width}px`, height: `${height}px`}">
            <FinalEnergy :width="width" :height="height" :step="step"/>
          </div>
        </template>
        <div slot="text" class="observer">
          <IntersectionObserver :step="0"  align="left">
            <p>The industry sector sees the strongest increase in hydrogen use and a large growth in electricity demand.
            </p>
          </IntersectionObserver>
          <IntersectionObserver :step="1"  align="left">
            <p>The buildings sector shows a strong electrification as well, combined with reduction of gases and liquids.
            </p>
          </IntersectionObserver>
          <IntersectionObserver :step="2"  align="left" class="changeheight">
            <p>In the transport sector, liquids keep playing a larger role, even though a lot of transport energy demand
              is electrified. These liquids can however be based on biofuels, rather than fossil oil.
            </p>
          </IntersectionObserver>
        </div>
      </LayoutScrollytelling>
      <div class="text-wrapper">
        <h2 class="chapter-title" id="costs">
          Costs risks
        </h2>
        <p class="two-column-paragraph">The end use sectors face two types of cost risks. First, change in direct emission costs,
          as the introduction of carbon pricing for end-users of fossil fuels leads to a cost increase associated with the use of
          fossil fuels. A present day example of this risk is the European Emission Trading System (ETS) which requires industry
          and airlines to obtain emission rights.
          The second cost risk is about indirect changes in fuels costs. These can either be driven by emission costs that are
          incurred upstream (for instance if electricity is produced from fossil fuels) or by changes in the fuel markets in
          response to climate policies. An example of the latter dynamic would be the reduction of oil prices in response to
          lower demand under climate policy scenarios.
        </p>
      </div>
     <LayoutScrollytelling>
              <template v-slot:vis="{ width, height, step }">
                <div class="vis-inner" :style="{width: `${width}px`, height: `${height}px`}">
                  <Costs :width="width" :height="height" :step="step"/>
                </div>
              </template>
              <div slot="text" class="observer">
              <IntersectionObserver :step="0"  align="left">
                <p>The absolute levels of direct emission costs differ between sectors, depending on the use of fossil fuels
                  and the ease of substituting these fuels for low-carbon options.
                </p>
              </IntersectionObserver>
              <IntersectionObserver :step="1"  align="left">
                <p>Fuel costs changes over time in all scenarios, with and without climate policy due to changes in the upstream
                  sector and an increased energy demand. Therefore these costs are best viewed relative to a current policies scenario.
                </p>
              </IntersectionObserver>
              <IntersectionObserver :step="2"  align="left" class="changeheight">
                <p>The change in total fuel costs, without accounting for direct emission costs, is largest in the industry and building
                  sectors. In the transport sector, the switch to electricity and the associated efficiency increases can sometimes
                  even lead to a gain in fuel costs.
                </p>
              </IntersectionObserver>
            </div>
          </LayoutScrollytelling>
      <div class="text-wrapper">
        <h2 class="chapter-title" id="costs">
          Revenue changes
        </h2>
        <p class="two-column-paragraph">If the energy expenditures of the end-use sectors increase, the costs of goods and services
          that these sectors produce will increase as well. Consumers can respond to these cost changes in different ways, by
          consuming more or less of the goods and services. The changes in demand depend on so-called elasticities, which economists
          have derived historically for many different goods and services. These elasticities can vary widely across specific goods
          and services. In general, transport demand has been relatively inelastic, whereas demand for industrial goods has been elastic.
        </p>
      </div>
      <LayoutScrollytelling>
        <template v-slot:vis="{ width, height, step }">
          <div class="vis-inner" :style="{width: `${width}px`, height: `${height}px`}">
            <Revenue :width="width" :height="height" :step="step"/>
          </div>
        </template>
        <div slot="text" class="observer">
        <IntersectionObserver :step="0"  align="right">
          <p>If the consumer response is unit elastic, the increase in costs of the end-use sectors is compensated equally with an
            increase in revenues and the revenue-risk would be zero.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="1"  align="right">
          <p>If consumers respond relatively inelastic, they keep consuming the goods and services even at a higher price.
            Hence, the increase in costs for the end-use sectors is more than compensated by a higher revenue.
          </p>
        </IntersectionObserver>
        <IntersectionObserver :step="2"  align="right">
          <p>However, if consumers respond relatively elastic, the increase in prices leads to a drop in the consumption of
            goods and services. In this case, the end-use sector not only risk an increase in their costs, but also a decrease
            in their revenues.
            </p>
        </IntersectionObserver>
      </div>
      </LayoutScrollytelling>
      <div class="text-wrapper">
        <h2 class="chapter-title" id="structure">
          Investment need
        </h2>
        <p class="two-column-paragraph">The increase in the costs of energy also stimulates a shift towards higher efficiency
          in the end-use sectors. This higher efficiency can be reached by switching to more efficient fuels, such as electric
          transport or by using energy more efficiently, such as home insulation. The former of these two options is not included
          in the numbers below, which only look into additional energy efficiency measures.  As increasing energy efficiency
          requires investments in more efficient equipment or insulation,these investments are adding to the cost profile of
          the Industry, Transport and Building sectors.
        </p>
      </div>
      <LayoutScrollytelling>
        <template v-slot:vis="{ width, height, step }">
          <div class="vis-inner" :style="{width: `${width}px`, height: `${height}px`}">
            <InvestmentNeed :width="width" :height="height" :step="step"/>
          </div>
        </template>
        <div slot="text" class="observer">
          <IntersectionObserver :step="0"  align="right">
            <p>Under a current policy scenario, we are globally investing a total of 250 Bn$ per year in energy efficiency measures,
              which increases to 300 or 333 Bn$ per year in the 2 degrees and 1.5 degrees scenarios. The largest shares of these
              investments go towards the buildings and transport sectors.
            </p>
          </IntersectionObserver>
        </div>
      </LayoutScrollytelling>
      <div class="text-wrapper" id="last-text">
        <h2 class="chapter-title" id="conclusion">
          Assessing risks with the help of climate scenarios
        </h2>
        <p class="two-column-paragraph">Climate scenarios can help assessing transition risks in the end-use sectors.
          We have seen that the industry, transport and buildings sector are exposed to different types of risk during the
          transition to a low-carbon future. They may see an increase of costs due to pricing of carbon emissions and changes
          in the costs of the fuels that they use. They also need increased investments in more energy efficient equipment and
          buildings. As the costs for these sectors increase, the response of the consumer to price changes in the goods and services
          that they produce is uncertain and poses a revenue risk.
        </p>
      </div>
      <SensesMeta :id="'end-use'"/>
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
    .intersection-observer .default.left{
      -webkit-box-shadow: 2px 2px 9px 0px rgba(128,128,128,0.12);
      -moz-box-shadow: 2px 2px 9px 0px rgba(128,128,128,0.12);
      box-shadow: 2px 2px 9px 0px rgba(128,128,128,0.12);
      width: 33%;
    }
    .intersection-observer .default.right{
      width: 33%;
      padding-top: 20vh;
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
