<i18n>
  {
  "en": {
    "button-twitter": "Follow us on Twitter",
    "button-facebook": "Visit us on Facebook"
  },
  "de": {
    "button-twitter": "Folge uns auf Twitter",
    "button-facebook": "Besuche uns auf Facebook"
  }
  }
</i18n>

<template>
  <footer class="footer">
    <div v-if="!platform" class="logo-wrapper">
      <a
        href="https://www.citizenscience.ch"
        class="home-link home-link-platform"
        target="_blank"
        rel="noopener"
      >
        <img src="@/assets/shared/logo-white.svg" alt="logo-white.svg" />
      </a>
    </div>
    <div v-else class="logo-wrapper">
      <router-link to="/" class="home-link" active-class="active" exact>
        <img src="@/assets/shared/logo-white.svg" alt="logo-white.svg" />
      </router-link>
    </div>
    <div class="uzh-eth">
      <span v-if="this.$i18n.locale === 'en'">A joint initiative by</span>
      <span v-else>Ein gemeinsamer Effort von</span>
      <img
        v-if="this.$i18n.locale === 'en'"
        alt="University of Zurich / ETH Zurich"
        src="@/assets/shared/uzh_eth_logo_e_neg.svg"
        @click="logoClick($event)"
      />
      <img
        v-else
        alt="Universität Zürich / ETH Zürich"
        src="@/assets/shared/uzh_eth_logo_d_neg.svg"
        @click="logoClick($event)"
      />
    </div>
    <div class="contact centered">
      <div class="buttons centered">
        <button
          class="button button-secondary button-secondary-inverted button-icon button-secondary-naked button-normal-case"
          @click="openInNewTab('mailto:info@citizenscience.ch')"
        >
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style="enable-background:new 0 0 512 512;"
            xml:space="preserve"
          >
            <path
              d="M502.3,190.8c3.9-3.1,9.7-0.2,9.7,4.7V400c0,26.5-21.5,48-48,48H48c-26.5,0-48-21.5-48-48V195.6c0-5,5.7-7.8,9.7-4.7
            c22.4,17.4,52.1,39.5,154.1,113.6c21.1,15.4,56.7,47.8,92.2,47.6c35.7,0.3,72-32.8,92.3-47.6C450.3,230.4,479.9,208.2,502.3,190.8z
             M256,320c23.2,0.4,56.6-29.2,73.4-41.4c132.7-96.3,142.8-104.7,173.4-128.7c5.8-4.5,9.2-11.5,9.2-18.9v-19c0-26.5-21.5-48-48-48H48
            C21.5,64,0,85.5,0,112v19c0,7.4,3.4,14.3,9.2,18.9c30.6,23.9,40.7,32.4,173.4,128.7C199.4,290.8,232.8,320.4,256,320L256,320z"
            />
          </svg>
          info@citizenscience.ch
        </button>
        <button
          class="button button-secondary button-secondary-inverted button-icon button-secondary-naked button-normal-case"
          @click="openInNewTab('tel:+41446342197')"
        >
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style="enable-background:new 0 0 512 512;"
            xml:space="preserve"
          >
            <path
              d="M493.4,24.6l-104-24c-11.3-2.6-22.9,3.3-27.5,13.9l-48,112c-4.2,9.8-1.4,21.3,6.9,28l60.6,49.6
            c-36,76.7-98.9,140.5-177.2,177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112,48c-10.7,4.7-16.6,16.3-14,27.6l24,104
            C27.1,504.2,36.7,512,48,512c256.1,0,464-207.5,464-464C512,36.8,504.3,27.1,493.4,24.6z"
            />
          </svg>
          +41 44 634 21 97
        </button>
        <button
          class="button button-secondary button-secondary-inverted button-icon button-secondary-naked button-normal-case"
          @click="openInNewTab('https://goo.gl/maps/anvs2yRcgGhCcjif6')"
        >
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style="enable-background:new 0 0 512 512;"
            xml:space="preserve"
          >
            <path
              d="M236.3,501.7C91,291,64,269.4,64,192C64,86,150,0,256,0s192,86,192,192c0,77.4-27,99-172.3,309.7
            C266.2,515.4,245.8,515.4,236.3,501.7L236.3,501.7z M256,272c44.2,0,80-35.8,80-80s-35.8-80-80-80s-80,35.8-80,80S211.8,272,256,272
            z"
            />
          </svg>
          Kurvenstrasse 17, 8006 Zürich
        </button>
      </div>
    </div>
    <div class="sharing centered">
      <button
        class="button button-secondary button-secondary-inverted button-icon button-secondary-naked"
        @click="openInNewTab('https://twitter.com/CitSciZurich')"
      >
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          style="enable-background:new 0 0 512 512;"
          xml:space="preserve"
        >
          <path
            d="M459.4,151.7c0.3,4.5,0.3,9.1,0.3,13.6c0,138.7-105.6,298.6-298.6,298.6c-59.5,0-114.7-17.2-161.1-47.1
        	c8.4,1,16.6,1.3,25.3,1.3c49.1,0,94.2-16.6,130.3-44.8c-46.1-1-84.8-31.2-98.1-72.8c6.5,1,13,1.6,19.8,1.6c9.4,0,18.8-1.3,27.6-3.6
        	c-48.1-9.7-84.1-52-84.1-103v-1.3c14,7.8,30.2,12.7,47.4,13.3c-28.3-18.8-46.8-51-46.8-87.4c0-19.5,5.2-37.4,14.3-53
        	C87.4,130.9,165,172.5,252.1,177.1c-1.6-7.8-2.6-15.9-2.6-24c0-57.8,46.8-104.9,104.9-104.9c30.2,0,57.5,12.7,76.7,33.1
        	c23.7-4.5,46.5-13.3,66.6-25.3c-7.8,24.4-24.4,44.8-46.1,57.8c21.1-2.3,41.6-8.1,60.4-16.2C497.7,118.3,479.8,136.8,459.4,151.7
        	L459.4,151.7z"
          />
        </svg>
        {{ $t("button-twitter") }}
      </button>
      <button
        class="button button-secondary button-secondary-inverted button-icon button-secondary-naked"
        @click="openInNewTab('https://www.facebook.com/CitSciZurich/')"
      >
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          style="enable-background:new 0 0 512 512;"
          xml:space="preserve"
        >
          <path
            d="M200.7,512V283H124v-91h76.7v-71.7C200.7,42.4,248.3,0,317.8,0c33.3,0,61.9,2.5,70.2,3.6V85h-48.2
        	c-37.8,0-45.1,18-45.1,44.3V192H380l-11.7,91h-73.6v229H200.7z"
          />
        </svg>
        {{ $t("button-facebook") }}
      </button>

      <!-- <button class="button button-secondary button-secondary-inverted button-icon button-secondary-naked">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
        <path d="M502.3,190.8c3.9-3.1,9.7-0.2,9.7,4.7V400c0,26.5-21.5,48-48,48H48c-26.5,0-48-21.5-48-48V195.6c0-5,5.7-7.8,9.7-4.7
          c22.4,17.4,52.1,39.5,154.1,113.6c21.1,15.4,56.7,47.8,92.2,47.6c35.7,0.3,72-32.8,92.3-47.6C450.3,230.4,479.9,208.2,502.3,190.8z
           M256,320c23.2,0.4,56.6-29.2,73.4-41.4c132.7-96.3,142.8-104.7,173.4-128.7c5.8-4.5,9.2-11.5,9.2-18.9v-19c0-26.5-21.5-48-48-48H48
          C21.5,64,0,85.5,0,112v19c0,7.4,3.4,14.3,9.2,18.9c30.6,23.9,40.7,32.4,173.4,128.7C199.4,290.8,232.8,320.4,256,320L256,320z"/>
        </svg>
        Tell a Friend
      </button> -->
    </div>

    <div class="copyright">
      <p>
        © Except where otherwise noted, content on this site is licensed under a
        <a
          href="https://creativecommons.org/licenses/by-sa/3.0/"
          target="_blank"
          rel="noopener"
          >Creative Commons License BY-SA 3.0 Unported</a
        >
      </p>

      <p></p>
      <p>
        <router-link :to="'/' + language + '/terms'"
          >Privacy Policy & Terms of Use</router-link
        >
      </p>
    </div>
  </footer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Footer",
  props: {
    platform: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      language: (state) => state.settings.language,
    }),
  },
  methods: {
    openInNewTab: function(url) {
      var win = window.open(url, "_blank", "noopener");
      win.focus();
    },
    logoClick: function(e) {
      var rect = e.target.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var width = rect.width;
      if (x < width / 2) {
        this.openInNewTab("https://www.uzh.ch");
      } else {
        this.openInNewTab("https://www.ethz.ch");
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/theme.scss";
@import "@/styles/shared/variables.scss";

.footer {
  background: linear-gradient(
    120deg,
    $color-gradient-start,
    $color-gradient-end
  );
  position: relative;

  .logo-wrapper {
    padding-top: $spacing-5;
    padding-bottom: $spacing-3;
    text-align: center;
    img {
      height: 48px;
    }
  }

  .uzh-eth {
    text-align: center;
    margin-bottom: $spacing-5;

    span {
      font-size: $font-size-small/1.25;
      color: white;
      display: block;
      margin-bottom: $spacing-1;
    }

    img {
      height: 36px;
      cursor: pointer;
    }
  }

  .contact {
    margin-bottom: $spacing-1;
    .button {
      display: block;
      margin: auto;
    }
  }

  .sharing {
    width: 100%;
    background-color: rgba($color-secondary-shade-20, 0.5);
    padding: $spacing-1 0;

    .button {
      display: block;
      margin: auto;
    }
  }

  .copyright {
    background-color: rgba($color-secondary-shade-20, 0.5);
    padding: 0 $spacing-3;
    padding-bottom: $spacing-1;
    p {
      text-align: center;
      color: rgba(255, 255, 255, 0.5);
      font-size: $font-size-small / 1.25;
      a {
        color: rgba(255, 255, 255, 0.5);
        text-decoration: underline;

        &:active {
          color: rgba(255, 255, 255, 0.75);
        }
        @media (hover: hover) {
          &:hover {
            color: rgba(255, 255, 255, 0.75);
          }
        }
      }
    }
  }
}

@media only screen and (min-width: $viewport-mobile-large) {
}

@media only screen and (min-width: $viewport-tablet-portrait) {
  .footer {
    .logo-wrapper {
      padding-top: $spacing-6;
      img {
        height: 64px;
      }
    }
    .uzh-eth {
      img {
        height: 48px;
      }
    }

    .contact {
      .button {
        display: inline-block;
      }
    }
    .sharing {
      .button {
        display: inline-block;
      }
    }
  }
}

@media only screen and (min-width: $viewport-large) {
  .footer {
    .copyright {
      text-align: center;
      p {
        display: inline;
        &:first-child {
          margin-right: $spacing-2;
        }
      }
    }
  }
}

@media only screen and (min-width: $viewport-xlarge) {
  .footer {
  }
}
</style>
