<i18n>
    {

    "en": {

    "label-email": "Email",
    "label-password": "Password",
    "label-password-repeat": "Repeat Password",

    "button-register": "Register",

    "error-empty": "Enter an email address.",
    "error-email": "Email already in use.",
    "error-email-format": "No valid email address",
    "error-username": "Username already in use",
    "error-username-format": "No valid username",
    "error-len": "Password needs to be at least 8 characters long.",
    "error-match": "Passwords don't match.",
    "error-server": "Server error occured",

    "notifications-label": "Notifications",
    "notifications-option-1": "I want to receive information about the Citizen Science Center Zurich.",
    "notifications-option-2": "I want to receive information about this project."

    },

    "de": {

    "label-email": "Email",
    "label-password": "Passwort",
    "label-password-repeat": "Passwort wiederholen",

    "button-register": "Registrieren",

    "error-empty": "Sie müssen eine E-Mail angeben.",
    "error-email": "Email bereits registriert.",
    "error-email-format": "Keine gültige E-Mail.",
    "error-username": "Benutzername bereits registriert.",
    "error-username-format": "Keine gültige Benutzername.",
    "error-len": "Muss mehr als 8 Zeichen lang sein.",
    "error-match": "Passwörter stimmen nicht überein.",
    "error-server": "Serverfehler aufgetreten.",

    "notifications-label": "Benachrichtigungen",
    "notifications-option-1": "Ich möchte Informationen zum Citizen Science Center Zurich erhalten.",
    "notifications-option-2": "Ich möchte Informationen zu diesem Projekt erhalten."

    }

    }
</i18n>

<template>
  <form @submit.prevent="registerNewUser">
    <div class="form-field form-field-block">
      <label for="reg-email">{{ $t("label-email") }}</label>
      <input
        v-model="email"
        type="email"
        id="reg-email"
        name="reg-email"
        autocomplete="new-password"
      />
      <span class="message error" v-if="errors.empty">{{
        $t("error-empty")
      }}</span>
      <span class="message error" v-if="errors.emailFormat">{{
        $t("error-email-format")
      }}</span>
      <span
        class="message error"
        v-if="error.register && error.register.email_addr"
        >{{ $t("error-email") }}
      </span>
    </div>
    <div class="form-field form-field-block">
      <label for="reg-username">Username</label>
      <input
        v-model="username"
        id="reg-username"
        name="reg-email"
        autocomplete="new-password"
      />
      <span class="message error" v-if="errors.username">{{
        $t("error-username-format")
      }}</span>
      <span class="message error" v-if="error.register && error.register.name"
        >{{ $t("error-username") }}
      </span>
    </div>
    <div class="form-field form-field-block">
      <label for="reg-password">{{ $t("label-password") }}</label>
      <input
        v-model="password"
        type="password"
        id="reg-password"
        name="reg-password"
        autocomplete="new-password"
      />
      <span class="message error" v-if="errors.len">{{ $t("error-len") }}</span>
    </div>
    <div class="form-field form-field-block">
      <label for="reg-password-2">{{ $t("label-password-repeat") }}</label>
      <input
        v-model="confPassword"
        type="password"
        id="reg-password-2"
        name="reg-password-2"
        autocomplete="new-password"
      />
      <span class="message error" v-if="errors.match">{{
        $t("error-match")
      }}</span>
    </div>

    <!-- <div class="form-field form-field-block">
      <label for="notification-options">{{ $t("notifications-label") }}</label>
      <div class="options" id="notification-options">
        <label>
          <input type="checkbox" v-model="checkbox1" />
          <div class="checkbox">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
              ></path>
            </svg>
          </div>
          <span>{{ $t("notifications-option-1") }}</span>
        </label>

        <label v-if="projectId !== '667461b5-353e-4dae-b83b-c59b0563133b'">
          <input type="checkbox" v-model="checkbox2" />
          <div class="checkbox">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
              ></path>
            </svg>
          </div>
          <span>{{ $t("notifications-option-2") }}</span>
        </label>
      </div>
    </div> -->

    <div class="button-group right-aligned">
      <button
        :disabled="
          !email ||
            !username ||
            !password ||
            !confPassword ||
            errors.emailFormat ||
            errors.empty ||
            errors.len ||
            errors.match ||
            errors.password ||
            errors.username
        "
        type="submit"
        class="button button-primary-main"
      >
        {{ $t("button-register") }}
      </button>
    </div>
  </form>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "RegisterForm",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      confPassword: "",      
      errors: {
        empty: false,
        emailFormat: false,
        username: false,
        match: false,
        len: false
      },
      // checkbox1: true,
      // checkbox2: true,
    };
  },
  computed: { ...mapState({ error: (state) => state.user.error }) },
  watch: {
    email() {
      this.errors.emailFormat = false;
      if (this.error.register) {
        this.setError(null);
      }
      this.username = this.email.split("@")[0];
      this.checkEmail();
    },
    username() {
      if (this.error.register) {
        this.setError(null);
      }
      this.errors.username = false;
      this.checkUsername();
    },
    password() {
      if (this.password.length < 8) {
        this.errors.len = true;
      } else {
        this.errors.len = false;
      }
    },
    confPassword() {
      if (this.confPassword && this.confPassword !== this.password) {
        this.errors.match = true;
      } else {
        this.errors.match = false;
      }
    },
  },
  methods: {
    ...mapActions({ register: "user/register" }),
    ...mapMutations({ setError: "user/setRegisterError" }),
    checkUsername() {
      var re = /[^A-Za-z0-9_.-]+/;
      if (re.test(this.username)) {
        this.errors.username = true;
      } else {
        this.errors.username = false;
      }
    },
    checkEmail() {
      var re = /\S+@\S+\.\S+/;
      if (re.test(this.email)) {
        this.errors.emailFormat = false;
      } else {
        this.errors.emailFormat = true;
      }
    },
    registerNewUser() {
      this.errors.username = false;

      const user = {
        name: this.username,
        email_addr: this.email,
        password: this.password,
        confirm: this.confPassword,
      };

      this.register(user);
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/theme.scss";
@import "@/styles/shared/variables.scss";

.error {
  color: $color-error;
}
</style>
