<template>
  <div>

    <div class="sub-navigation" ref="subnav">
      <ul ref="navlist">
        <li v-for="child in shownRoutes">
          <router-link :to="'/'+language+'/'+activeParentRoute.path+'/'+child.path" active-class="active" :ref="child.meta.i18n">{{ $t(child.meta.i18n+'.link') }}</router-link>
        </li>
      </ul>
    </div>

    <router-view platform></router-view>

  </div>
</template>

<script>


    import {mapState} from 'vuex'

    export default {
        name: 'ChildView',
        props: {
            platform: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                activeParentRoute: undefined
            }
        },
        created() {
            this.activeParentRoute = this.$router.options.routes[0].children.filter( x => x.path === this.$route.matched[1].path.split('/')[2] )[0]
        },
        computed: {
            ...mapState({
                language: state => state.settings.language,
            }),
            shownRoutes() {
                return this.activeParentRoute.children;
            }
        },
        updated() {
            this.activeParentRoute = this.$router.options.routes[0].children.filter( x => x.path === this.$route.matched[1].path.split('/')[2] )[0];
            /*
            if( this.$refs.subnav ) {
                this.$refs.subnav.scrollLeft = 0;
                if( this.$refs[ this.$router.currentRoute.meta.i18n ][0].$el.offsetLeft + this.$refs[ this.$router.currentRoute.meta.i18n ][0].$el.offsetWidth > window.innerWidth ) {
                    this.$refs.subnav.scrollLeft = this.$refs[ this.$router.currentRoute.meta.i18n ][0].$el.offsetLeft;
                }
            }
            */
        }
    }

</script>

<style lang="scss">

  @import '@/styles/theme.scss';
  @import '@/styles/shared/variables.scss';

  .sub-navigation {
    padding: $spacing-1 0;
    overflow-x: auto;
    background: linear-gradient(120deg, rgba($color-gradient-start, 0.025), rgba($color-gradient-end, 0.025) );

    ul {
      display: table;
      white-space: nowrap;
      box-sizing: border-box;
      font-size: 0;
      margin: auto;
      padding: 0 calc( #{$grid-margin-mobile} + #{$grid-gutter-mobile} / 2);

      li {
        white-space: nowrap;
        display: inline-block;

        margin-right: $spacing-2;
        &:last-child {
          margin-right: 0;
        }

        a {
          white-space: nowrap;
          display: block;
          font-size: $font-size-small;
          color: $color-black-tint-50;
          line-height: 40px;

          &:active {
            color: $color-black;
          }
          @media (hover: hover) {
            &:hover {
              color: $color-black;
            }
          }

          &.active {
            color: $color-black;
          }
        }
      }
    }
  }





  @media only screen and (min-width: $viewport-tablet-portrait) {

    .sub-navigation {
      ul {
        li {
          margin-right: $spacing-3;
          &:last-child {
            margin-right: 0;
          }
          a {
            line-height: 48px;
          }
        }
      }
    }

  }



  @media only screen and (min-width: $viewport-large) {

    .sub-navigation {
      ul {
        li {
          margin-right: $spacing-4;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

  }

</style>
