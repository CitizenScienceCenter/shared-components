<i18n>
  {
  "de": {
    "logo-text": "Ein gemeinsamer Effort von"
  },
  "en": {
    "logo-text": "A joint initiative by"
  },
  "fr": {
    "logo-text": "Une initiative conjointe de"
  },
  "it": {
    "logo-text": "Un'iniziativa congiunta di"
  }
  }
</i18n>

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
      <span>{{ $t('logo-text') }}</span>
      <img v-if="this.$i18n.locale === 'en'" alt="University of Zurich / ETH Zurich" src="@/assets/shared/uzh_eth_logo_e_neg.svg" @click="logoClick($event)"/>
      <img v-else alt="Universität Zürich / ETH Zürich" src="@/assets/shared/uzh_eth_logo_d_neg.svg" @click="logoClick($event)"/>
    </div>

    <div class="bottom-right-logo" v-scroll-to="'#sdg'">
      <img v-if="goal" class="goal" :src="goalImage" />
      <img src="@/assets/shared/sdg-logo-white.svg" />
    </div>

    <div class="top-right-logo" v-if="logoUrl" :class="{'mitrends':logosMitrends}">
      <img :src="logoUrl" />
      <img v-if="logo2Url" :src="logo2Url" />
    </div>

    <div class="cover-overlay"></div>
  </section>
</template>

<script>
export default {
  name: 'Cover',
  props: {
    imageUrl: String,
    logoUrl: String,
    logo2Url: String,
    logosMitrends: Boolean,
    goal: String
  },
    computed: {
        goalImage () {
            return require('@/assets/shared/sdgs/neg/' + this.goal + '.svg')
        }
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
      let matches = this.$el.querySelectorAll(".scroll-effect");
      window.setTimeout(function() {
          for( let i=0; i < matches.length; i++ )  {
              matches[i].classList.add("scrolled");
          }
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

  .bottom-right-logo {
    height: 28px;
    position: absolute;
    bottom: $spacing-2;
    right: $spacing-2;
    z-index: 1;
    cursor: pointer;

    img {
      height: 100%;
      &.goal {
        margin-right: $spacing-1;
      }
    }
  }
  .top-right-logo {
    position: absolute;
    top: $spacing-2;
    right: $spacing-2;
    z-index: 1;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;

    img {
      max-height: 48px;
      max-width: 72px;

      &:nth-child(2) {
        margin-left: $spacing-1;
      }
    }

    &.mitrends {
      img {
        max-height: 56px;
        max-width: none;
      }
    }
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
    background: linear-gradient(120deg, $color-gradient-start, $color-gradient-end );
    opacity: 0.8;
  }

}

@media only screen and (min-width: $viewport-mobile-large) {
  .cover {
    height: 480px;

    .top-right-logo {
      &.mitrends {
        img {
          max-height: 64px;
          max-width: none;
        }
      }
    }

    .content-wrapper {
      .cover-heading {
        font-size: $font-size-xlarge;
      }
      .cover-subheading {
        font-size: $font-size-normal;
        margin-bottom: $spacing-2;
      }
    }
  }
}

@media only screen and (min-width: $viewport-tablet-portrait) {
  .cover {
    height: 470px;

    .uzh-eth {
      bottom: $spacing-3;
      left: $spacing-3;
      img {
        height: 36px;
      }
    }
    .bottom-right-logo {
      height: 36px;
      bottom: $spacing-3;
      right: $spacing-3;
    }
    .top-right-logo {

      img {
        max-height: 64px;
        max-width: 80px;

        &:nth-child(2) {
          margin-left: $spacing-2;
        }
      }

      &.mitrends {
        img {
          max-height: 80px;
          max-width: none;
        }
      }
    }

    .content-wrapper {
      .cover-heading {
        font-size: $font-size-xlarge;
      }
      .cover-subheading {
        font-size: $font-size-medium;
      }
    }

  }
}

@media only screen and (min-width: $viewport-large) {
  .cover {

    height: 80vh;
    max-height: 470px;

    .uzh-eth {
      bottom: $spacing-3;
      left: $spacing-3;
      img {
        height: 48px;
      }
    }
    .bottom-right-logo {
      height: 48px;
      bottom: $spacing-3;
      right: $spacing-3;
    }
    .top-right-logo {
      top: $spacing-3;
      right: $spacing-3;

      img {
        max-height: 72px;
        max-width: 104px;
      }

      &.mitrends {
        img {
          max-height: 88px;
          max-width: none;
        }
      }
    }

    .content-wrapper {
      .cover-heading {
        font-size: $font-size-xxlarge;
      }
      .cover-subheading {
        font-size: $font-size-large;
      }
    }

  }
}

@media only screen and (min-width: $viewport-xlarge) {
  .cover {

    height: 80vh;
    max-height: 600px;

    .top-right-logo {
      &.mitrends {
        img {
          max-height: 104px;
          max-width: none;
        }
      }
    }

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
