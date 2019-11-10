<i18n>
  {

  "en": {

  "page-title": "Reset Password",

  "heading": "Reset Password",
  "label-email": "Email",
  "button-reset": "Reset",

  "info-check-mail": "You'll find an email with a link to reset the password."

  },

  "de": {

  "page-title": "Passwort zurücksetzen",

  "heading": "Passwort zurücksetzen",
  "label-email": "Email",
  "button-reset": "Zurücksetzen",

  "info-check-mail": "In Ihren Mails finden Sie einen Link zum zurücksetzen des Passworts."

  }

  }
</i18n>


<template>
  <div>
    <app-content-section>
      <div class="content-wrapper">

          <div class="row row-centered">
            <div class="col col-large-6">

              <h2 class="heading">{{ $t('heading') }}</h2>
              <form>
                <div class="form-field form-field-block">
                  <label for="email">{{ $t("label-email") }}</label>
                  <input v-model="email" type="email" name="email" id="email" autocomplete="email" :disabled="loading" />
                </div>
                <div class="button-group right-aligned margin-bottom">
                  <button @click.prevent="request" type="submit" class="button button-primary" :disabled="loading">{{ $t('button-reset') }}</button>
                </div>
                <p v-if="success" class="success">{{ $t('info-check-mail') }}</p>
            </form>


            </div>
          </div>

      </div>
    </app-content-section>

    <app-footer :platform="platform"></app-footer>

  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ContentSection from '@/components/shared/ContentSection.vue'
import Footer from '@/components/shared/Footer.vue'

export default {
  name: "RequestReset",
  components :{
      'app-content-section': ContentSection,
      'app-footer': Footer
  },
    props: {
        platform: {
            type: Boolean,
            default: false
        }
    },
  data() {
    return {
      email: undefined,
      success: false
    }
  },
  computed: mapState({
    loading: state => state.settings.loading
  }),
    metaInfo: function() {
        return {
            title: this.$t('page-title'),
            meta: [
                {
                    property: 'og:title',
                    content: this.$t('page-title'),
                    template: '%s | '+this.$t('site-title')
                }
            ]
        }
    },
  mounted() {
  },
  methods: {

    request() {
        console.log('dispatch request');
      this.$store.dispatch('c3s/user/requestReset', this.email ).then(res => {
          console.log('request came back');
        console.log(res);
        if (res) {
          this.success = true
        }
      });

    }

  }
};
</script>

