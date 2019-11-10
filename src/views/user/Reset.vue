<i18n>
{

    "en": {

    "page-title": "Reset Password",

    "heading": "Reset Password",
    "label-password": "Password",
    "label-password-repeat": "Repeat Password",
    "button-reset": "Reset",

    "error-length": "Has to be more than 8 characters.",
    "error-match": "Passwords don't match."

    },

    "de": {

    "page-title": "Passwort zurücksetzen",

    "heading": "Passwort zurücksetzen",
    "label-password": "Password",
    "label-password-repeat": "Password wiederholen",
    "button-reset": "Zurücksetzen",

    "error-length": "Muss mehr als 8 Zeichen lang sein.",
    "error-match": "Passwörter stimmen nicht überein."

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
                    <form @submit.prevent="reset">
                        <div class="form-field form-field-block">
                            <label for="password">{{ $t("label-password") }}</label>
                            <input v-model="password" type="password" id="password" name="password" autocomplete="password" :disabled="loading" />
                            <span class="message error" v-if="errors.len">{{ $t("error-length") }}</span>
                        </div>
                        <div class="form-field form-field-block">
                            <label for="password-repeat">{{ $t("label-password-repeat") }}</label>
                            <input v-model="confPassword" type="password" id="password-repeat" name="password-repeat" autocomplete="password" :disabled="loading" />
                            <span class="message error" v-if="errors.match">{{ $t("error-match") }}</span>
                        </div>

                        <div class="button-group right-aligned">
                            <button type="submit" class="button button-primary" :disabled="loading">{{ $t('button-reset') }}</button>
                        </div>
                        <span class="message error" v-if="error">{{error}}</span>
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
  name: "Reset",
    components: {
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
        oldPassword: "",
        password: "",
        confPassword: "",
        userSaved: false,
        errors: {
            match: false,
            len: false
        }
      }
  },
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
  computed: mapState({
    loading: state => state.settings.loading,
    error: state => state.settings.error
  }),
  mounted() {
      console.log('reset mounted');
      const id = this.$route.params.token.split('.')[0];
      console.log(id)
  },
  methods: {
      reset() {
          console.log('reset');
          if (this.password.length >= 8 && this.confPassword === this.password) {
            const id = this.$route.params.token.split('.')[0];
            const reset = {
              id: id,
              token: this.$route.params.token,
              pwd: this.password
            }
            this.$store.dispatch('c3s/user/resetPwd', reset).then(r => {
                if(r !== false) {
                    this.$router.push('/')
                }
              })
          } else {
            this.errors.match = this.password !== this.confPassword;
            this.errors.len = this.password.length <= 8
          }
    }
  }
};
</script>
