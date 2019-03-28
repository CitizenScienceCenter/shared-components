<i18n>
{
  "en": {
    "login": "Login"
  },
  "de": {
    "login": "Anmelden"
  }
}
</i18n>

<template>
  <header :class="{ 'fixed': fixed,'animated': animated, 'pulled': pulled }" :style="{  }">

    <button class="menu-button" @click="showMenu">
      <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Artboard 1</title><rect x="32" y="68" width="448" height="56" rx="28" ry="28"/><rect x="32" y="228" width="448" height="56" rx="28" ry="28"/><rect x="32" y="388" width="448" height="56" rx="28" ry="28"/></svg>
    </button>

    <template v-if="!projectName">
      <router-link to="/" class="home-link" active-class="active" exact>
        <h1><img alt="Citizen Science Center Zurich" class="logo" src="@/assets/shared/logo.svg"/></h1>
      </router-link>
    </template>

    <template v-else>
      <router-link to="/" class="home-link home-link-project" active-class="active" exact>
        <h1 v-html="projectName"></h1>
      </router-link>
      <a href="https://citizenscience.ch" class="home-link home-link-platform" target="_blank">
        <img alt="Citizen Science Center Zurich" class="logo" src="@/assets/shared/logo.svg"/>
      </a>
      <a v-if="cyberlabLogo" href="http://www.citizencyberlab.org/" class="home-link home-link-platform" target="_blank">
        <img alt="Citizen Cyberlab" class="logo" src="@/assets/shared/cyberlab-logo.png"/>
      </a>
    </template>

    <div class="navigation-wrapper" :class="{ 'active': menuOn }">
      <div class="drawer">
        <div class="drawer-content">
          <div class="menu-header">
            <button class="menu-button" @click="hideMenu">
              <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32" y="68" width="448" height="56" rx="28" ry="28"/><rect x="32" y="228" width="448" height="56" rx="28" ry="28"/><rect x="32" y="388" width="448" height="56" rx="28" ry="28"/></svg>
            </button>

            <template v-if="!projectName">
              <router-link to="/" class="home-link" active-class="active" exact @click.native="hideMenu">
                <img alt="Citizen Science Center Zurich" class="logo" src="@/assets/shared/logo-white.svg"/>
              </router-link>
            </template>

            <template v-else>
              <router-link to="/" class="home-link home-link-project" active-class="active" exact>
                <h1 v-html="projectName"></h1>
              </router-link>
            </template>

          </div>

          <ul class="navigation">
            <li v-for="route in routes" v-if="route.meta.nav == true"><router-link :to="route.path" active-class="active" @click.native="hideMenu"><span>{{ $t(route.meta.i18n+'.link') }}</span></router-link></li>
            <li v-if="!projectName">
              <a href="https://citizensciencezurich.blog/" target="_blank">
                <span>
                  Blog
                </span>
              </a>
            </li>
          </ul>

          <div class="custom-select language-select">
            <select v-model="language">
              <option v-for="lang in languages" :value="lang">{{lang}}</option>
            </select>
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
               <path d="M127.3,192h257.3c17.8,0,26.7,21.5,14.1,34.1L270.1,354.8c-7.8,7.8-20.5,7.8-28.3,0L113.2,226.1
            	C100.6,213.5,109.5,192,127.3,192z"/>
            </svg>
          </div>

          <div v-if="score" class="score">{{score}}</div>
          <template v-if="!currentUser || isAnon">
            <template v-if="!hideLogin" >
              <router-link v-if="score && score > 0" tag="button" to="/login" class="button button-primary button-login">Register</router-link>
              <router-link v-else tag="button" to="/login" class="button button-secondary button-login">{{ $t('login') }}</router-link>
            </template>
          </template>
          <template v-else>
            <user-avatar :username="currentUser.username"></user-avatar>
          </template>
        </div>
      </div>
      <div class="overlay" @click="hideMenu"></div>
    </div>

    <div class="mobile-top-right">
      <div v-if="score" class="score">{{score}}</div>
      <template v-if="!currentUser || isAnon">
        <template v-if="!hideLogin" >
          <router-link v-if="score && score > 0" tag="button" to="/login" class="button button-primary button-login">Register</router-link>
          <router-link v-else tag="button" to="/login" class="button button-secondary button-login">{{ $t('login') }}</router-link>
        </template>
      </template>
      <template v-else>
        <user-avatar :username="currentUser.username"></user-avatar>
      </template>
      <a v-if="projectName" href="https://citizenscience.ch" class="home-link home-link-platform" target="_blank">
        <img alt="Citizen Science Center Zurich" class="logo" src="@/assets/shared/logo.svg"/>
      </a>
    </div>
  </header>
</template>

<script>

import { i18n } from "../../i18n.js"
import UserAvatar from "./UserAvatar";

export default {
  name: "Header",
    components: {UserAvatar},
    props: {
        projectName: undefined,
        cyberlabLogo: {
            type: Boolean,
            default: false
        },
      hideLogin: Boolean,
        languages: {
          type: Array,
            default: function () { return ['en','de'] }
        },
        score: undefined
    },
  data: function() {
    return {
      routes: this.$router.options.routes,
      menuOn: false,
      scrollY: 0,
      scrollYpreviously: 0,
      fixed: false,
      animated: false,
      pulled: false
    };
  },
    /*
    computed: mapState({
        currentUser: state => state.c3s.user.currentUser,
        language: state => state.settings.language
    }),
    */
    computed: {
        currentUser: {
            get() {
                if( !this.hideLogin ) {
                    return this.$store.state.c3s.user.currentUser;
                }
                else {
                    return null;
                }
            }
        },
        isAnon: {
            get() {
                if( !this.hideLogin ) {
                    return this.$store.state.c3s.user.isAnon;
                }
                else {
                    return false;
                }
            }
        },
        language: {
            get() {
              return this.$store.state.settings.language;
            },
            set(language) {
              this.$store.dispatch("settings/setLanguage", language);
              this.hideMenu();
            }
        }
      },
  watch: {
      language(to, from) {
      i18n.locale = to;
    }
  },
  methods: {
    reset() {
      this.menuOn = false;
      this.scrollY = 0;
      this.scrollYpreviously = 0;
      this.fixed = false;
      this.animated = false;
      this.pulled = false;
    },
    scroll() {
      if (window.scrollY === 0) {
        this.reset();
      }

      if (window.scrollY <= this.scrollY) {
        // scroll up

        if (this.scrollYpreviously <= this.scrollY) {
          // first time
          if (window.scrollY > 80) {
            this.pulled = false;
            this.fixed = true;
          }
        } else {
          // second time
          if (window.scrollY > 80) {
            this.pulled = true;
            this.animated = true;
          } else {
            if (window.scrollY === 0) {
              this.animated = false;
              this.pulled = false;
              this.fixed = false;
            }
          }
        }
      } else {
        // scroll down

        if (this.scrollYpreviously >= this.scrollY) {
          // first time
        } else {
          // second time
          if (window.scrollY > 80) {
            this.fixed = true;
            this.pulled = false;
          } else {
            this.fixed = false;
            this.animated = false;
          }
        }
      }

      this.scrollYpreviously = this.scrollY;
      this.scrollY = window.scrollY;
    },
    showMenu() {
      this.menuOn = true;
    },
    hideMenu() {
      this.menuOn = false;
    }
  },
  created() {
    window.addEventListener("scroll", this.scroll);
  }
};
</script>

<style lang="scss">
@import "@/styles/theme.scss";
@import "@/styles/shared/variables.scss";

header {
  height: 48px;
  width: 100%;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  backface-visibility: hidden;

  margin-top: 0px;
  box-shadow: 0px 4px 8px -4px rgba($color-black, 0.2);

  &.fixed {
    position: fixed;
    margin-top: -48px;
    box-shadow: none;
  }
  &.animated {
    transition: all $transition-duration-long $transition-timing-function;
  }
  &.pulled {
    margin-top: 0px;
    box-shadow: 0px 4px 8px -4px rgba($color-black, 0.2);
  }

  .menu-button {
    display: block;
    float: left;
    width: 48px;
    height: 48px;
    background: transparent;
    outline: none;
    position: relative;
    cursor: pointer;

    svg {
      position: absolute;
      top: 16px;
      left: 16px;
      width: 16px;
      height: 16px;
      fill: $color-black;
    }

    &:active {
      svg {
        fill: $color-black-tint-50;
      }
    }
    @media (hover: hover) {
      &:hover {
        svg {
          fill: $color-black-tint-50;
        }
      }
    }
  }

  .home-link {
    float: left;
    height: 48px;
    padding: $spacing-1 0;

    .logo {
      display: block;
      height: 32px;
    }

    h1 {
      display: block;
    }

    &.home-link-platform {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      padding-right: $spacing-1;
      padding-left: $spacing-1;
    }

    &.home-link-project {
      display: flex;
      align-items: center;

      h1 {
        white-space: pre-wrap;
        line-height: 16px;
        font-size: $font-size-normal;
        font-weight: 700;
        color: $color-primary;
        text-transform: uppercase;
        transform: translateY(1px);
      }

      &:active {
        h1 {
          color: $color-primary-shade-20;
        }
      }
      @media (hover: hover) {
        &:hover {
          h1 {
            color: $color-primary-shade-20;
          }
        }
      }
    }
  }

  .score {
    background: $color-secondary;
    height: 32px;
    min-width: 32px;
    line-height: 32px;
    display: inline-block;
    text-align: center;
    color: white;
    font-size: $font-size-small;
    font-weight: bold;
    padding: 0 $spacing-1;
    border-radius: 16px;
    pointer-events: none;
  }

  .navigation-wrapper {
    position: fixed;
    left: 0;
    top: 0;

    height: 100vh;

    z-index: 999;

    &.active {
      width: 100%;
      .drawer {
        width: 240px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
          0 6px 6px rgba(0, 0, 0, 0.23);
      }
    }

    .drawer {
      width: 0;
      overflow: hidden;

      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;

      height: 100%;
      background: $color-primary;
      transition: width $transition-duration-long $transition-timing-function;
      backface-visibility: hidden;

      .drawer-content {
        height: 100%;
        width: 240px;
        position: relative;

        overflow: hidden;

        .menu-header {
          height: 48px;
          margin-bottom: 48px;

          .menu-button {
            svg {
              fill: white;
            }
          }
          .home-link {
            h1 {
              color: white;
            }
          }
        }

        .navigation {
          border-top: 1px solid rgba(255, 255, 255, 0.2);

          li {
            display: block;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);

            a {
              display: block;
              height: 48px;
              padding: 12px 24px;
              text-decoration: none;
              text-transform: uppercase;
              color: white;

              span {
                display: block;
                font-size: $font-size-small;
                line-height: 24px;
                transform: translateY(0px);
              }

              &.active {
                background-color: $color-primary-shade-20;
              }

              &:active {
                color: $color-black-tint-90;
              }
              @media (hover: hover) {
                &:hover {
                  color: $color-black-tint-90;
                }
              }

            }
          }
        }

        .language-select {
          margin-left: 12px;
          margin-top: $spacing-3;

          select {
            font-size: $font-size-small;
            text-transform: uppercase;
            padding-left: 12px;
            color: white;
            border: 1px solid rgba($color-black-tint-90, 0.25);
            border-radius: $border-radius;
          }
          svg {
            fill: white;
          }
        }

        .score {
          display: none;
        }
        .button-login {
          display: none;
        }
        .button-user {
          display: none;
        }
      }
    }

    .overlay {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: transparent;
    }
  }

  .mobile-top-right {
    display: block;
    position: absolute;
    top: 0;
    right: 0;

    .home-link {
      display: block;
      position: relative;
      padding: 12px 0;
      img {
        height: 24px;
      }
    }

    .score {
      margin-left: $spacing-1;
    }
    .button-login {
      padding: 0 $spacing-1;
      height: 32px;
      margin: $spacing-1;
      font-size: 13px;
    }
    .button-user {
      height: 36px;
      width: 36px;
      svg {
        top: 9px;
        left: 10px;
      }
      margin: 6px;
      margin-left: $spacing-1;
    }
  }
}

@media only screen and (min-width: $viewport-mobile-large) {
  header {
    height: 64px;

    &.fixed {
      margin-top: -64px;
    }
    &.pulled {
      margin-top: 0px;
    }

    .menu-button {
      width: 64px;
      height: 64px;
      svg {
        top: 24px;
        left: 24px;
        pointer-events: none;
      }
    }

    .home-link {
      height: 64px;
      padding: 14px 0;

      .logo {
        height: 36px;
      }
      &.home-link-project {
        h1 {
          line-height: 18px;
        }
      }
    }

    .navigation-wrapper {
      &.active {
        .drawer {
          width: 280px;
        }
      }
      .drawer {
        .drawer-content {
          width: 280px;
          .menu-header {
            height: 64px;
            margin-bottom: 64px;
          }
          .navigation {
            li {
              a {
                height: 64px;
                padding: 20px 32px;
              }
            }
          }
          .language-select {
            margin-left: 20px;
            margin-top: $spacing-4;
          }
        }
      }
    }

    .mobile-top-right {
      .home-link {
        padding: 18px 0;
        img {
          height: 28px;
        }
      }
      .button-login {
        padding: 0 $spacing-1;
        height: 36px;
        margin: 14px;
        margin-right: $spacing-2;
        margin-left: $spacing-1;
      }
      .button-user {
        height: 40px;
        width: 40px;
        svg {
          top: 11px;
          left: 12px;
        }
        margin: 12px;
      }
    }
  }
}

@media only screen and (min-width: $viewport-tablet-portrait) {
  header {
    height: 64px;

    &.fixed {
      margin-top: -64px;
    }
    &.pulled {
      margin-top: 0px;
    }

    .menu-button {
      width: 64px;
      height: 64px;
      svg {
        top: 24px;
        left: 24px;
      }
    }

  }
}

@media only screen and (min-width: $viewport-large) {
  header {
    height: 80px;

    &.fixed {
      margin-top: -80px;
    }
    &.pulled {
      margin-top: 0px;
    }

    .menu-button {
      display: none;
    }

    .home-link {
      padding: $spacing-2;
      height: 80px;
      display: block;

      .logo {
        height: 48px;
      }

      &.home-link-project {
        //border-right: 1px solid $color-black-tint-90;
        padding: $spacing-2 $spacing-3;

        h1 {
          line-height: 24px;
          font-size: $font-size-medium;
        }
      }

      &.home-link-platform {
        display: inline-block;
        position: relative;
        margin-left: $spacing-2;
        padding: 20px 0;

        .logo {
          height: 40px;
        }
      }

    }

    .score {
      height: 32px;
      min-width: 32px;
      line-height: 32px
    }

    .navigation-wrapper {
      &.active {
        width: auto;
        .drawer {
          width: auto;
          box-shadow: none;
        }
      }

      position: absolute;
      height: 100%;
      top: 0;
      left: auto;
      right: 0;

      .drawer {
        width: auto;
        height: auto;
        position: relative;
        background: transparent;

        .drawer-content {
          width: auto;
          padding-right: 16px;

          .menu-header {
            display: none;
          }

          .navigation {
            border-top: 0;
            display: inline-block;

            li {
              display: inline-block;
              border: none;
              a {
                color: $color-black;
                height: 80px;
                padding: 28px 10px;
                &:active {
                  color: $color-primary;
                }
                @media (hover: hover) {
                  &:hover {
                    color: $color-primary;
                  }
                }
                &.active {
                  color: $color-primary;
                  background-color: transparent;
                }
              }
            }
          }

          .language-select {
            margin: $spacing-2 0;

            select {
              color: $color-black;
              border-color: transparent;
              padding-left: $spacing-1;
              padding-right: $spacing-3;

              &:active {
                color: $color-primary;
                border-color: $color-black-tint-90;
              }
              @media (hover: hover) {
                &:hover {
                  color: $color-primary;
                  border-color: $color-black-tint-90;
                }
              }
            }
            svg {
              fill: $color-black;
            }
          }

          .score {
            display: inline-block;
            margin-left: $spacing-2;
          }
          .button-login {
            display: inline-block;
            margin-left: $spacing-1;
            padding: 0 $spacing-1;
          }

          .button-user {
            display: block;
            float: right;
            margin: $spacing-2 0;
            margin-left: $spacing-2;
          }
        }
      }

      .overlay {
        display: none;
      }
    }

    .mobile-top-right {
      display: none;
    }
  }
}

@media only screen and (min-width: $viewport-xlarge) {
  header {

    .home-link {
      h1 {
        font-size: $font-size-large;
      }
    }

    .navigation-wrapper {


      .drawer {

        .drawer-content {


          .navigation {

            li {
              a {
                padding: 28px $spacing-2;
              }
            }
          }

          .language-select {
            margin-left: $spacing-1;
            select {
              padding-left: 12px;
              padding-right: $spacing-4;
            }
          }


          .button-login {
            margin-left: $spacing-2;
            padding: 0 $spacing-2;
          }


        }
      }

    }

  }
}
</style>
