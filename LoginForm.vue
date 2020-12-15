<i18n>
    {
    "de": {
        "label-email": "Email",
        "label-password": "Passwort",
        "button-login": "Anmelden",
        "button-forgotten": "Passwort vergessen?"
    },
    "en": {
        "label-email": "Email",
        "label-password": "Password",
        "button-login": "Login",
        "button-forgotten": "Forgot Password?"
    }
    }
</i18n>

<template>
  <div>
    <form @submit.prevent="login">
      <div class="form-field form-field-block">
        <label for="email">{{ $t("label-email") }}</label>
        <input
          ref="email"
          tabindex="90"
          v-model="email"
          type="email"
          name="email"
          id="email"
          autocomplete="email"
        />
      </div>

      <div class="form-field form-field-block">
        <label for="password">{{ $t("label-password") }}</label>
        <input
          tabindex="91"
          v-model="password"
          type="password"
          id="password"
          name="password"
          autocomplete="password"
        />
      </div>

      <div class="button-group right-aligned">
        <a
          tabindex="93"
          @click.prevent="reset"
          class="button button-secondary button-secondary-naked"
          >{{ $t("button-forgotten") }}</a
        >
        <button
          tabindex="92"
          type="submit"
          class="button button-primary-main"
          :disabled="!email || !password"
        >
          {{ $t("button-login") }}
        </button>
      </div>
      <div
        class="form-message"
        :class="
          error.login.type == 'success'
            ? 'form-message-success'
            : 'form-message-error'
        "
        v-if="error && error.login"
      >
        <div class="text">
          <i :class="setErrorIcon"></i>
          <span class="text">{{ error.login.msg }}</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      success: false,
    };
  },
  computed: {
    ...mapState({ error: (state) => state.user.error }),
    setErrorIcon() {
      switch (this.error.login.type) {
        case "success":
          return "far fa-check-circle";
        case "error":
          return "fas fa-times";
        case "info":
          return "fas fa-exclamation";
      }
      return null;
    },
  },
  mounted() {
    this.$refs.email.focus();
    this.setError(null);
  },
  methods: {
    ...mapActions({ signIn: "user/signIn" }),
    ...mapMutations({ setError: "user/setLoginError" }),
    login() {
      const user = { email: this.email, password: this.password };
      this.signIn(user);
    },
    reset() {
      this.$router.push("/reset");
    },
  },
  watch: {
    email: function() {
      if (this.error.login) {
        this.setError(null);
      }
    },
    password: function() {
      if (this.error.login) {
        this.setError(null);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
