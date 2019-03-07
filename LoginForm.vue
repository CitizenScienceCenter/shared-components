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
                <label for="email">{{ $t('label-email') }}</label>
                <input ref="email" tabindex="90" v-model="email" type="email" name="email" id="email" autocomplete="email" :disabled="loading"/>
            </div>

            <div class="form-field form-field-block">
                <label for="password">{{ $t('label-password') }}</label>
                <input tabindex="91" v-model="password" type="password" id="password" name="password" autocomplete="password"
                       :disabled="loading"/>
            </div>

            <div class="button-group right-aligned">
                <a tabindex="93" @click.prevent="reset" class="button button-secondary button-secondary-naked" :disabled="loading">{{ $t('button-forgotten') }}</a>
                <button tabindex="92" type="submit" class="button button-primary" :disabled="loading">{{ $t('button-login') }}</button>
            </div>
            <span class="message error" v-if="error">{{error}}</span>
        </form>
    </div>
</template>

<script>
    import _default, {mapState, mapGetters} from 'vuex'

    export default {
        name: 'LoginForm',
        data() {
            return {
                email: '',
                password: '',
                username: '',
                success: false,
                error: false
            }
        },
        computed: mapState({
            currentUser: state => state.c3s.user.currentUser,
            loading: state => state.c3s.settings.loading,
        }),
        watch: {
            'currentUser'(to, from) {
                // console.log(to)
                if (to !== null || to !== undefined) {
                }
            }
        },
        mounted() {
            this.$refs.email.focus();
        },
        methods: {
            login() {
                console.log('login');
                this.error = null;
                this.$store
                    .dispatch('c3s/user/login', {user: {email: this.email, pwd: this.password}})
                    .then(user => {
                        if (user.status === 200) {
                            this.$store.commit('c3s/user/SET_ANON', false);
                            this.$router.push('/');
                        } else {
                            this.error = 'Login failed'
                        }
                    })
            },
            reset() {
                console.log('reset');
                this.$router.push({name: 'ResetRequest'})
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
