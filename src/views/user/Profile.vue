<i18n>
    {

    "en": {

    "page-title": "Your Profile",

    "heading": "Your Profile",

    "label-email": "Email",
    "label-username": "Username",
    "label-firstname": "First Name",
    "label-lastname": "Last Name",
    "label-notifications": "Notifications",
    "label-center-notifications": "I want to receive information about the Citizen Science Center Zurich.",
    "label-project-notifications": "I want to receive information about this project.",
    "label-project-notifications-prefix": "I want to receive information about the",

    "label-project-snakes": "Snake ID Challenge",
    "label-project-hatespeech": "Hate Speech",
    "label-project-cohco": "Cause of Health",
    "label-project-mustelids": "Mustelid Wanted",

    "label-project-notifications-suffix": "Project.",

    "thanks": "Thanks for helping!",
    "button-logout": "Logout",
    "button-reset": "Reset Password",
    "button-save": "Save",
    "button-save-message": "Saved",

    "error-username-empty": "Enter a Username",
    "error-username": "Username already in use."
    },

    "de": {

    "page-title": "Ihr Profil",

    "heading": "Ihr Profil",

    "label-email": "Email",
    "label-username": "Benutzername",
    "label-firstname": "Vorname",
    "label-lastname": "Nachname",
    "label-notifications": "Benachrichtigungen",
    "label-center-notifications": "Ich möchte Informationen zum Citizen Science Center Zurich erhalten.",
    "label-project-notifications": "Ich möchte Informationen zu diesem Projekt erhalten.",
    "label-project-notifications-prefix": "Ich möchte Informationen zum Projekt",

    "label-project-snakes": "Snake ID Challenge",
    "label-project-hatespeech": "Hate Speech",
    "label-project-cohco": "Cause of Health",
    "label-project-mustelids": "Wiesel gesucht",

    "label-project-notifications-suffix": "erhalten.",

    "thanks": "Vielen Dank für Ihre Hilfe!",
    "button-logout": "Ausloggen",
    "button-reset": "Passwort zurücksetzen",
    "button-save": "Speichern",
    "button-save-message": "Gespeichert",

    "error-username-empty": "Geben Sie einen Benutzernamen an",
    "error-username": "Benutzername bereits vergeben."

    }

    }
</i18n>

<template>
    <div v-if="currentUser">
        <app-content-section>
            <div class="content-wrapper">

                <div class="row row-centered">
                    <div class="col col-large-5 col-xlarge-4">

                        <div class="content-subsection">
                            <h2 class="heading">{{ $t('heading') }}</h2>

                            <div class="form-field form-field-block">
                                <label>{{ $t('label-email') }}</label>
                                <p>{{ currentUser.email }}</p>
                            </div>
                            <div class="form-field form-field-block">
                                <label>{{ $t('label-username') }}</label>
                                <input v-model="username" id="reg-username" name="reg-email" autocomplete="new-password" :disabled="loading" />
                                <span class="message error" v-if="errors.username">{{ $t("error-username") }}</span>
                                <!--<p>{{ currentUser.username }}</p>-->
                            </div>

                            <div class="form-field form-field-block">
                                <label>{{ $t('label-firstname') }}</label>
                                <input v-model="firstname" autocomplete="new-password" placeholder="optional" />
                                <!--<p>{{ currentUser.username }}</p>-->
                            </div>

                            <div class="form-field form-field-block">
                                <label>{{ $t('label-lastname') }}</label>
                                <input v-model="lastname" autocomplete="new-password" placeholder="optional" />
                                <!--<p>{{ currentUser.username }}</p>-->
                            </div>

                            <div class="form-field form-field-block">
                                <label for="notification-options">{{ $t("label-notifications") }}</label>
                                <div class="options" id="notification-options">

                                    <template v-if="projectId !== '667461b5-353e-4dae-b83b-c59b0563133b' && projectNotificationsStates && projectNotificationsStates.length > 0">
                                        <label>
                                            <input type="checkbox" v-model="projectNotificationsStates[myProjectIndex][1]">
                                            <div class="checkbox">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                                                </svg>
                                            </div>
                                            <span>{{ $t("label-project-notifications") }}</span>
                                        </label>
                                    </template>

                                    <label>
                                        <input type="checkbox" v-model="centerNotifications">
                                        <div class="checkbox">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                                            </svg>
                                        </div>
                                        <span>{{ $t("label-center-notifications") }}</span>
                                    </label>

                                    <template v-if="projectId === '667461b5-353e-4dae-b83b-c59b0563133b'">
                                        <label v-for="(projectNotification,index) in projectNotificationsStates">
                                            <input type="checkbox" v-model="projectNotificationsStates[index][1]">
                                            <div class="checkbox">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                                                </svg>
                                            </div>
                                            <span>{{ $t("label-project-notifications-prefix") }} <i>{{ $t( 'label-'+projectNamesI18n[projectNotificationsStates[index][0]] ) }}</i> {{ $t("label-project-notifications-suffix") }}</span>
                                        </label>
                                    </template>

                                </div>
                            </div>

                            <div class="button-group right-aligned">
                                <submit-button @click="save()" :disabled="usernameCheckInProgress || !username || errors.username || !saveNeeded || saveInProgress" :submissionInfo="showSubmissionInfo" :infoMessage="$t('button-save-message')">{{ $t('button-save') }}</submit-button>
                                <!-- <button class="button button-primary" @click.prevent="save()" :disabled="usernameCheckInProgress || !username || errors.username || !saveNeeded">{{ $t('button-save') }}</button> -->
                            </div>
                        </div>
                        <div class="content-subsection">
                            <div class="button-group right-aligned">
                                <!-- <router-link tag="button" to="/logout" class="button button-secondary">{{ $t('button-logout') }}</router-link> -->
                                <button class="button button-secondary" @click.prevent="logout()">{{ $t('button-logout') }}</button>
                                <router-link tag="button" to="/reset" class="button button-secondary">{{ $t('button-reset') }}</router-link>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </app-content-section>

        <app-footer></app-footer>

    </div>
</template>

<script>
    import {mapState} from "vuex";
    import ContentSection from '@/components/shared/ContentSection.vue';
    import Footer from '@/components/shared/Footer.vue';
    import SubmitButton from "../../../components/shared/SubmitButton";

    export default {
        name: "ViewUser",
        components: {
            SubmitButton,
            'app-content-section': ContentSection,
            'app-footer': Footer
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
        data() {
            return {
                username: '',
                firstname: '',
                lastname: '',
                centerNotifications: false,
                projectNotificationsStates: undefined,
                myProjectIndex: undefined,
                projectNotifications: [],
                projectNamesI18n: {
                    'b04bc186-1e0e-4fd3-87b8-a25262c1c79f': 'project-snakes',
                    'ecf805f8-5a03-4af4-9882-f70ced27ed94': 'project-hatespeech',
                    '3f97e6cc-ede6-4a60-8582-5638668d45e1': 'project-cohco',
                    'a7cc9fde-607c-473e-8ff5-90e86d81f9b6': 'project-mustelids'
                },
                errors: {
                    username: false
                },
                usernameCheckTimeout: undefined,
                usernameCheckInProgress: false,

                saveNeeded: false,
                saveInProgress: false,
                showSubmissionInfo: false
            }
        },
        computed: {
            ...mapState({
                currentUser: state => state.c3s.user.currentUser,
                projectId: state => state.consts.projectId,
                loading: state => state.settings.loading
            })
        },
        mounted() {

            this.$store.dispatch('c3s/user/validate').then(v => {
                //update user from db

                this.username = this.currentUser.username;

                if( this.currentUser.info.firstname ) {
                    this.firstname = this.currentUser.info.firstname;
                }
                if( this.currentUser.info.lastname ) {
                    this.lastname = this.currentUser.info.lastname;
                }

                if( this.currentUser.info["center-notifications"] ) {
                    this.centerNotifications = this.currentUser.info["center-notifications"];
                }

                this.projectNotificationsStates = [];
                if( this.currentUser.info["project-notifications"] ) {
                    if( Array.isArray(this.currentUser.info["project-notifications"]) ) {
                        for( let i=0; i<this.currentUser.info["project-notifications"].length; i++ ) {
                            this.projectNotificationsStates.push( [ this.currentUser.info["project-notifications"][i], true ] );
                        }
                    }
                    else {
                        // snake users:
                        if( this.currentUser.info["project-notifications"] ) {
                            this.projectNotificationsStates.push( [ 'b04bc186-1e0e-4fd3-87b8-a25262c1c79f', true ] );
                        }
                    }

                    if( this.projectId !== '667461b5-353e-4dae-b83b-c59b0563133b' ) {

                        // if on a project page,
                        if( this.currentUser.info["project-notifications"].indexOf( this.projectId ) === -1 ) {
                            // but has not checked project notifications
                            this.projectNotificationsStates.push( [ this.projectId, false ] );
                        }

                        let self = this;
                        this.myProjectIndex = this.projectNotificationsStates.findIndex(function(element) {
                            return element[0] === self.projectId;
                        });
                    }
                }
                else {
                    this.projectNotificationsStates.push( [ this.projectId, false ] );
                    this.myProjectIndex = 0;
                }


            });

        },
        watch: {
            username() {
                this.errors.username = false;

                if (this.username !== this.currentUser.username) {
                    this.usernameCheckInProgress = true;
                    clearTimeout(this.usernameCheckTimeout);
                    var self = this;
                    this.usernameCheckTimeout = setTimeout(function () {
                        self.checkUsername();
                        self.usernameCheckInProgress = false;
                    }, 500);

                    this.saveNeeded = true;
                }
            },
            firstname() {
                if( this.firstname !== this.currentUser.info.firstname ) {
                    this.saveNeeded = true;
                }
            },
            lastname() {
                if( this.lastname !== this.currentUser.info.lastname ) {
                    this.saveNeeded = true;
                }
            },
            centerNotifications(to, from) {
                if( this.centerNotifications !== this.currentUser.info['center-notifications'] ) {
                    this.saveNeeded = true;
                }
            },
            projectNotificationsStates(to,from) {
                this.projectNotifications = [];
                for( let i=0; i<this.projectNotificationsStates.length; i++ ) {
                    if( this.projectNotificationsStates[i][1] ) {
                        this.projectNotifications.push( this.projectNotificationsStates[i][0] );
                    }
                }
                if( from !== undefined ) {
                    this.saveNeeded = true;
                }
            }
        },
        methods: {
            getUserObject() {
                let info = JSON.parse(JSON.stringify(this.currentUser.info));

                info['firstname'] = this.firstname;
                info['lastname'] = this.lastname;
                info['center-notifications'] = this.centerNotifications;
                info['project-notifications'] = this.projectNotifications;

                return {
                    'username': this.username,
                    'info': info
                };
            },
            checkUsername() {
                let query = {
                    'select': {
                        'fields': [
                            '*'
                        ],
                        'tables': [
                            'users'
                        ]
                    },
                    'where': [
                        {
                            "field": 'username',
                            'op': 'e',
                            'val': this.username
                        }
                    ]
                };
                this.$store.dispatch('c3s/submission/getSubmissions', [query, 1] ).then(res => {
                    if( res.body.length > 0 ) {
                        // email already registered
                        this.errors.username = true;
                    }
                });
            },
            logout() {
                this.$store.commit('c3s/user/SET_CURRENT_USER', null);
                this.$store.commit('c3s/user/SET_ANON', false);
                this.$router.push('/');
            },
            save() {
                this.saveInProgress = true;
                this.$store.dispatch('c3s/user/updateUser', [ this.currentUser.id, this.getUserObject() ] ).then(r => {

                    this.$store.dispatch('c3s/user/validate').then(v => {

                        this.showSubmissionInfo = true;
                        let self = this;
                        setTimeout( function() {
                            self.showSubmissionInfo = false;
                            self.saveNeeded = false;
                            self.saveInProgress = false;
                        }, 900 );

                    });

                });
            }
        }
    }
</script>

