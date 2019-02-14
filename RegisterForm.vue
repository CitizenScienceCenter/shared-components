<i18n>
    {

    "en": {

    "label-email": "Email",
    "label-password": "Password",
    "label-password-repeat": "Repeat Password",
    "button-register": "Register",

    "error-empty": "Enter an email address.",
    "error-len": "Password needs to be at least 8 characters long.",
    "error-match": "Passwords don't match.",

    "notifications-label": "Notifications",
    "notifications-option-1": "I want to receive information about this challenge.",
    "notifications-option-2": "I want to receive information about the Citizen Science Center Zurich in general."

    },

    "de": {

    "label-email": "Email",
    "label-password": "Passwort",
    "label-password-repeat": "Passwort wiederholen",
    "button-register": "Registrieren",

    "error-empty": "Du musst eine E-Mail angeben.",
    "error-len": "Muss mehr als 8 Zeichen lang sein.",
    "error-match": "Passwörter stimmen nicht überein.",

    "notifications-label": "Benachrichtigungen",
    "notifications-option-1": "Ich möchte über die Challenge informiert werden.",
    "notifications-option-2": "Ich möchte Informationen zum Citizen Science Center Zurich erhalten."

    }

    }
</i18n>


<template>

    <form @submit.prevent="register">
        <div class="form-field form-field-block">
            <label for="reg-email">{{ $t("label-email") }}</label>
            <input v-model="email" type="email" id="reg-email" name="reg-email" autocomplete="new-password" :disabled="loading" />
            <span class="error" v-if="errors.empty">{{ $t("error-empty") }}</span>
        </div>

        <div class="form-field form-field-block">
            <label for="reg-password">{{ $t("label-password") }}</label>
            <input v-model="password" type="password" id="reg-password" name="reg-password" autocomplete="new-password" :disabled="loading"/>
            <span class="error" v-if="errors.len">{{ $t("error-len") }}</span>
        </div>
        <div class="form-field form-field-block">
            <label for="reg-password-2">{{ $t("label-password-repeat") }}</label>
            <input v-model="confPassword" type="password" id="reg-password-2" name="reg-password-2" autocomplete="new-password" :disabled="loading"/>
            <span class="error" v-if="errors.match">{{ $t("error-match") }}</span>
        </div>
        <div class="form-field form-field-block">
            <label for="notification-options">{{ $t("notifications-label") }}</label>
            <div class="options" id="notification-options">
                <label>
                    <input type="checkbox" v-model="checkbox1">
                    <div class="checkbox">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                        </svg>
                    </div>
                    <span>{{ $t("notifications-option-1") }}</span>
                </label>
                <label>
                    <input type="checkbox" v-model="checkbox2" >
                    <div class="checkbox">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                        </svg>
                    </div>
                    <span>{{ $t("notifications-option-2") }}</span>
                </label>
            </div>
            <span class="error" v-if="false">Passwörter stimmen nicht überein</span>
        </div>
        <!--
        <div class="form-field form-field-block">
            <label for="radio-options">Radio test</label>
            <div class="options" id="radio-options">
                <label>
                    <input type="radio" checked="checked" name="radio-options-1">
                    <div class="radio">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path>
                        </svg>
                    </div>
                    <span>I want to receive information about</span>
                </label>
                <label>
                    <input type="radio" name="radio-options-1">
                    <div class="radio">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path>
                        </svg>
                    </div>
                    <span>I want to receive information about</span>
                </label>
            </div>
            <span class="error" v-if="false">Passwörter stimmen nicht überein</span>
        </div>
        -->

        <div class="button-group right-aligned">
            <button type="submit" class="button button-primary" :disabled="loading">{{ $t("button-register") }}</button>
        </div>
        <span class="error" v-if="errors.server">User already exists or server error occurred</span>
    </form>

</template>

<script>
    import {mapState} from "vuex"

    export default {
        name: "RegisterForm",
        data() {
            return {
                msg: "Sign up for an account",
                email: "",
                password: "",
                confPassword: "",
                checkbox1: true,
                checkbox2: true,
                userSaved: false,
                errors: {
                    empty: false,
                    match: false,
                    len: false,
                    server: false
                }
            };
        },
        computed: mapState({
            loading: state => state.settings.loading
        }),
        methods: {
            register() {
                this.errors.server = false;
                if (this.email.length > 0 && this.password.length >= 8 && this.confPassword === this.password) {
                    const user = {
                        email: this.email,
                        pwd: this.password,
                        info: {
                            'anonymous': false,
                            'project-notifications': this.checkbox1,
                            'center-notifications': this.checkbox2
                        }
                    };
                    this.$store.dispatch('c3s/user/register', user).then(r => {
                        if (r.ok === true) {
                            this.$router.push({name: 'Home'})
                        } else {
                            this.errors.server = true
                        }
                    })
                } else {
                    this.errors.match = this.password !== this.confPassword
                    this.errors.len = this.password.length <= 8
                    this.errors.empty = this.email.length === 0
                }
            }
        }
    };
</script>

<style lang="scss">


    @import '@/styles/theme.scss';
    @import '@/styles/shared/variables.scss';

    .error {
        color: $color-error;
    }

</style>
