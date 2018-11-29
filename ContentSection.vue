<template>
  <section class="content-section" :class="[colorClass]">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'ContentSection',
  data: function() {
    return {
      matches: []
    }
  },
  props: {
    'color': String
  },
  computed: {
    colorClass: function() {
      switch( this.color ) {
        case 'greyish':
          return 'greyish';
          break;
        case 'light-greyish':
          return 'light-greyish';
          break;
        case 'dark':
          return 'dark';
          break;
        default:
          return 'white';
      }
    }
  },
  methods: {
    scroll: function() {
      this.matches.forEach(function(element) {
        let {top,bottom} = element.getBoundingClientRect();
        let height = document.documentElement.clientHeight;
        let scrolled = top < height && bottom >0;
        if( scrolled ) {
          element.classList.add("scrolled");
        }
      });
    }
  },
  mounted: function() {
    window.addEventListener('scroll', this.scroll);
    this.matches = this.$el.querySelectorAll(".scroll-effect");

    this.scroll();
  },
  destroyed() {
    //window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style lang="scss">

@import '@/styles/theme.scss';
@import '@/styles/shared/variables.scss';

.content-section {
  position: relative;
  padding: $spacing-6 0;
  background: white;
  overflow: hidden;


    &.content-section-condensed {
        padding: $spacing-4 0;
    }


  .content-subsection {
    padding-bottom: $spacing-5;

    &:last-of-type {
      padding-bottom: 0;
    }
  }


  .scroll-effect {
    transition: all $transition-duration-super-long $transition-timing-function;
    transform: translateY($scroll-effect-offset);
    opacity: 0;

    &.scrolled {
      transform: translateY(0);
      opacity: 1;
    }
  }

  // Section Style

  &.light-greyish {
    background: linear-gradient(to bottom right, rgba($color-gradient-start, 0.05), rgba($color-gradient-end, 0.05) );
  }

  &.greyish {
    background: linear-gradient(to bottom right, rgba($color-gradient-start, 0.2), rgba($color-gradient-end, 0.2) );
  }

  &.dark {
    background: linear-gradient(to bottom right, $color-gradient-start, $color-gradient-end );

    * {
      color: white;
    }
    a {
      color: rgba(white, 0.75);

      &:active {
        color: white;
      }
      @media (hover: hover) {
        &:hover {
          color: white;
        }
      }
    }
    .heading {
      color: white;

    }
  }


  .content-wrapper {
    position: relative;
  }

  .heading {
    font-size: $font-size-large;
    line-height: 1.25;
    font-weight: 700;
    color: $color-secondary;
    padding-bottom: $spacing-4;
    margin-bottom: $spacing-4;
    position: relative;

    &:after {
      content: '';
      width: 24px;
      height: 4px;
      background-color: $color-primary;
      border-radius: 2px;
      position: absolute;
      bottom: 0;
      left: 0;
    }

    &.centered {
      &:after {
        left: calc( 50% - 12px );
      }
    }

  }

  .subheading {
    font-size: $font-size-medium;
    line-height: 1.5;
    font-weight: 700;
    margin-bottom: $spacing-4;
  }


  p {
    margin-bottom: $spacing-4;

    .linebreak {
      display: block;
    }
    &:last-child {
      margin-bottom: 0;
    }


    &.lead {
      font-size: $font-size-medium;
    }
    &.small {
      font-size: $font-size-small;
    }
    &.quote {
      font-size: $font-size-medium;
      font-style: italic;
      margin-bottom: $spacing-2;
    }
    &.list-intro {
      margin-bottom: $spacing-3;
    }
  }

  ul, ol {
    margin-bottom: $spacing-4;
    &:last-child {
      margin-bottom: 0;
    }

    li {
      margin-bottom: $spacing-2;
      position: relative;
      padding-left: $spacing-3;
      margin-left: $spacing-1;

      &:before {
        content: '';
        width: 8px;
        height: 8px;
        background-color: $color-secondary;
        border-radius: 50%;
        position: absolute;
        top: calc(0.5rem);
        left: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .button-group {
    margin: -$spacing-1;

    .button {
      margin: $spacing-1;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .form-field {
    margin-bottom: $spacing-4;
  }

  figure {
    img {
      display: block;
    }
    figcaption {
      display: block;
      margin-top: $spacing-1;
      font-size: $font-size-small;
    }
  }

  // for youtube embeds fullwith over column
  .embed-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }


}


@media only screen and (min-width: $viewport-mobile-large) {

  .content-section {

  }

}

@media only screen and (min-width: $viewport-tablet-portrait) {

  .content-section {

    &.content-section-condensed {
      padding: $spacing-6 0;
    }

    .content-subsection {
      padding-bottom: $spacing-6;
    }

    .heading {
      font-size: $font-size-xlarge;
      padding-bottom: $spacing-5;
      margin-bottom: $spacing-5;
    }

    .subheading {
      margin-bottom: $spacing-5;
    }


    p {
      margin-bottom: $spacing-5;

      &.quote {
        font-size: $font-size-large;
      }
    }

    ul, ol {
      margin-bottom: $spacing-5;
    }

    .form-field {
      margin-bottom: $spacing-5;
    }

  }

}

@media only screen and (min-width: $viewport-large) {

  .content-section {

    padding: $spacing-7 0;
    overflow: hidden;


    .scroll-effect {
      &.scroll-effect-delayed-1 {
        transition-delay: $transition-delay-1;
      }
      &.scroll-effect-delayed-2 {
        transition-delay: $transition-delay-2;
      }
      &.scroll-effect-delayed-3 {
        transition-delay: $transition-delay-3;
      }
      &.scroll-effect-delayed-4 {
        transition-delay: $transition-delay-3;
      }
    }

    .background-wrapper {
      position: absolute;
      width: 100%;
      top: 5%;
      left: auto;
      pointer-events: none;

      &.background-wrapper-move-right {
        left: 33.333%;
      }
      &.background-wrapper-move-left {
        left: -33.333%;
      }
    }

    .heading {
      &.left-aligned-large {
        &:after {
          left: 0;
        }
      }
    }

    .heading {
      font-size: $font-size-xlarge;
    }

    .uzh-eth-logo {
      height: 56px;
    }

  }

}

@media only screen and (min-width: $viewport-xlarge) {

  .content-section {

    padding: $spacing-8 0;


      &.content-section-condensed {
          padding: $spacing-6 0;
      }

    &.image {
      min-height: 640px;
    }

  }

}

</style>
