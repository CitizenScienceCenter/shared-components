<i18n>
    {
    "de": {
        "label-email": "Email",
        "label-password": "Passwort",
        "label-password-repeat": "Passwort wiederholen",
        "button-register": "Registrieren"
    },
    "en": {
        "label-email": "Email",
        "label-password": "Password",
        "label-password-repeat": "Repeat Password",
        "button-register": "Register"
    }
    }
</i18n>


<template>

    <form @submit.prevent="register">
        <div class="form-field form-field-block">
            <label for="reg-email">{{ $t("label-email") }}</label>
            <input v-model="email" type="email" name="email" id="reg-email" autocomplete="email" :disabled="loading"/>
            <span class="error" v-if="errors.empty">Du musst eine E-Mail angeben.</span>
        </div>

        <div class="form-field form-field-block">
            <label for="reg-password">{{ $t("label-password") }}</label>
            <input v-model="password" type="password" id="reg-password" name="password" autocomplete="password"
                   :disabled="loading"/>
            <span class="error" v-if="errors.len">Muss mehr als 8 Zeichen lang sein.</span>
        </div>
        <div class="form-field form-field-block">
            <label for="reg-password-2">{{ $t("label-password-repeat") }}</label>
            <input v-model="confPassword" type="password" id="reg-password-2" name="password" autocomplete="password"
                   :disabled="loading"/>
            <span class="error" v-if="errors.match">Passwörter stimmen nicht überein</span>
        </div>
        <div class="form-field form-field-block">
            <label for="notification-options">Notification Settings</label>
            <div class="options" id="notification-options">
                <label>
                    <input type="checkbox" checked="checked">
                    <div class="checkbox">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                        </svg>
                    </div>
                    <span>I want to receive information about</span>
                </label>
                <label>
                    <input type="checkbox" checked="checked">
                    <div class="checkbox">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                        </svg>
                    </div>
                    <span>I want to receive information about there are many variations of passages of Lorem Ipsum available</span>
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
                        pwd: this.password
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
                    console.log(this.errors.match)
                }
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
