<template>
  <div class="risk-card" :class="mobile ? 'mobileCard' : 'desktopCard'">
    <div class="other-chapters">
    </div>
    <nav class="risk-menu pathway">
      <section>
        <a class="wrapper" href="https://climatescenarios.org/fossil-fuels/" target="_blank">
          <div class="svg fossils"></div>
          <div><p>Chapter 1</p><span>Fossil Fuels&nbsp;&nearr;</span></div>
        </a>
      </section>
      <section>
        <a class="wrapper" href="https://climatescenarios.org/power-sector/" target="_blank">
          <div class="svg power"></div>
          <div><p>Chapter 2</p><span>Power Sector&nbsp;&nearr;</span></div>
        </a>
      </section>
      <section>
        <div class="wrapper active">
          <div class="svg enduse"></div>
          <div><p>Chapter 3</p><span>End-Use</span></div>
        </div>
      </section>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'RiskPathway',
  props: {
    mobile: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "library/src/style/variables.scss";

.risk-card {
  padding: $spacing*1.5;
  border-radius: 4px;
  background-color: rgba(221,214,255,.3);

  .other-chapters {
    text-align: center;
    font-size: 11px;
  }
}

.pathway {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 1100px;
  flex-direction: column;
  a {
    text-decoration: none;
    background: none;
    //color: getColor(neon, 60);
    }

  .active {
    color: getColor(violet, 40);
  }

  .risk-menu {
    display: flex;
  }

  .intro {
    display: flex;
    grid-template-columns: repeat(1, 1fr);
  }

  .wrapper {
    padding: 0 $spacing / 1.5 $spacing / 2 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    outline: none;
    color: getColor(violet, 40);
      div.svg {
        display: block;
        background-size: 80px 80px;
        width: 80px;
        height: 80px;
        color: getColor(violet, 40);
        &.fossils
        {filter: invert(30%) sepia(91%) saturate(2513%) hue-rotate(227deg) brightness(106%) contrast(102%);
          background-image: url('~@/assets/images/fossils.svg');
        }
        &.power
        {filter: invert(30%) sepia(91%) saturate(2513%) hue-rotate(227deg) brightness(106%) contrast(102%);
          background-image: url('~@/assets/images/power.svg');
        }
        &.enduse
        {filter: invert(18%) sepia(19%) saturate(6441%) hue-rotate(234deg) brightness(92%) contrast(91%);
          background-image: url('~@/assets/images/enduse.svg');
        }
      }

  }
}

.mobileCard {
  margin: 20px;
  .pathway {
    grid-template-columns: repeat(1, 1fr);

    .wrapper {
      padding: $spacing;
    }

    section {
      height: 50%;
      display: grid;
    }
  }
}

</style>
