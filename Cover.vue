<template>
  <section class="cover" :style="{ 'background-image': 'url(' + imageUrl + ')' }">
    <div class="content-wrapper">
      <div class="row">
        <div class="col">
          <slot></slot>
        </div>
      </div>
    </div>

    <div class="uzh-eth">
      <span v-if="this.$i18n.locale === 'en'">A joint initiative by</span>
      <span v-else>Ein gemeinsamer Effort von</span>
      <img v-if="this.$i18n.locale === 'en'" alt="University of Zurich / ETH Zurich" src="@/assets/shared/uzh_eth_logo_e_neg.svg" @click="logoClick($event)"/>
      <img v-else alt="Universität Zürich / ETH Zürich" src="@/assets/shared/uzh_eth_logo_d_neg.svg" @click="logoClick($event)"/>
    </div>

    <img class="sdg-logo" src="@/assets/shared/sdg-logo-white.svg"/>
    <div class="cover-overlay"></div>
  </section>
</template>

<script>
export default {
  name: 'Cover',
  props: {
    'imageUrl': String
  },
  methods: {
    openInNewTab: function(url) {
        var win = window.open(url, '_blank');
        win.focus();
    },
    logoClick: function(e) {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var width = rect.width;
        if (x < width / 2) {
            this.openInNewTab('https://www.uzh.ch');
        }
        else {
            this.openInNewTab('https://www.ethz.ch');
        }
    }
  },
  mounted: function() {
    var matches = this.$el.querySelectorAll(".scroll-effect");
    window.setTimeout(function() {
      matches.forEach(function(element) {
        element.classList.add("scrolled");
      });
    }, 1);
  }
}
</script>

<style lang="scss">

@import '@/styles/theme.scss';
@import '@/styles/shared/variables.scss';

.cover {
  height: 440px;
  background-position: 50% 50%;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;

  .scroll-effect {
    transition: all $transition-duration-super-long $transition-timing-function;
    transform: translateY($scroll-effect-offset);
    opacity: 0;

    &.scroll-effect-delayed-1 {
      transition-delay: 0.25s;
    }
    &.scroll-effect-delayed-2 {
      transition-delay: 0.5s;
    }
    &.scroll-effect-delayed-3 {
      transition-delay: 0.75s;
    }

    &.scrolled {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .button {
    margin: $spacing-1;
  }

  .uzh-eth {
    display: block;
    position: absolute;
    bottom: $spacing-2;
    left: $spacing-2;
    z-index: 1;

    span {
      display: block;
      font-size: $font-size-small / $font-scale;
      line-height: 1;
      margin-bottom: $spacing-1;
      color: white;
    }
    img {
      display: block;
      height: 28px;
      cursor: pointer;
    }
  }

  .sdg-logo {
    height: 32px;
    position: absolute;
    bottom: $spacing-2;
    right: $spacing-2;
    z-index: 1;
    cursor: pointer;
  }

  .content-wrapper {
    position: relative;
    z-index: 1;
    width: 100%;

    padding-bottom: $spacing-4;

    .cover-heading {
      font-size: $font-size-large;
      line-height: 1.25;
      font-weight: 700;
      color: white;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: $spacing-1;
    }
    .cover-subheading {
      font-size: $font-size-normal;
      font-weight: 400;
      color: white;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: $spacing-1;
    }

  }

  .cover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    //background: linear-gradient(to bottom right, $color-secondary, $color-primary-secondary-mix );
    background: linear-gradient(to bottom right, $color-gradient-start, $color-gradient-end );
    opacity: 0.8;
  }


  &.subpage {
    height: 64px;
    .sdg-logo {
      display: none;
    }
    .cover-heading, .cover-subheading {
      margin: 0;
    }
    .cover-overlay {
      opacity: 1;
    }
  }
}

@media only screen and (min-width: $viewport-mobile-large) {
  .cover {
    height: 480px;

    .content-wrapper {
      .cover-heading {
        font-size: $font-size-xlarge;
      }
      .cover-subheading {
        font-size: $font-size-normal;
        margin-bottom: $spacing-2;
      }
    }

    &.subpage {
      height: 80px;
    }
  }
}

@media only screen and (min-width: $viewport-tablet-portrait) {
  .cover {
    height: 560px;

    .uzh-eth {
      bottom: $spacing-3;
      left: $spacing-3;
      img {
        height: 36px;
      }
    }
    .sdg-logo {
      height: 40px;
      bottom: $spacing-3;
      right: $spacing-3;
    }

    .content-wrapper {
      .cover-heading {
        font-size: $font-size-xlarge;
      }
      .cover-subheading {
        font-size: $font-size-medium;
      }
    }

    &.subpage {
      height: 96px;
    }
  }
}

@media only screen and (min-width: $viewport-large) {
  .cover {

    .uzh-eth {
      bottom: $spacing-3;
      left: $spacing-3;
      img {
        height: 48px;
      }
    }
    .sdg-logo {
      height: 48px;
      bottom: $spacing-3;
      right: $spacing-3;
    }

    .content-wrapper {
      .cover-heading {
        font-size: $font-size-xxlarge;
      }
      .cover-subheading {
        font-size: $font-size-large;
      }
    }

    &.subpage {
      height: 128px;
    }
  }
}

@media only screen and (min-width: $viewport-xlarge) {
  .cover {

    height: 640px;

    .content-wrapper {
      .cover-heading {
        font-size: $font-size-xxxlarge;
      }
      .cover-subheading {
        font-size: $font-size-xlarge;
      }
    }
  }
}

</style>
