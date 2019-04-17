<template>
    <div class="step-wizard" :class="{displayed:displayed,open:open}" @click="closeWizard">
        <div class="box">
            <div class="box-header">
                <h3>Was sind geschlechtsspezifische Hass-Ausdrücke?</h3>
                <button class="button button-secondary button-icon button-icon-only button-secondary-naked">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352.26,273l-136,136a23.9,23.9,0,0,1-33.9,0l-22.6-22.6a23.9,23.9,0,0,1,0-33.9l96.4-96.4-96.4-96.4a23.9,23.9,0,0,1,0-33.9l22.5-22.8a23.9,23.9,0,0,1,33.9,0l136,136A23.93,23.93,0,0,1,352.26,273Z"/></svg>
                </button>
            </div>
            <div class="box-content">
                <div class="content-wrapper">
                    <div class="row row-wrapping">
                        <div class="col col-large-6 col-wrapping">
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                        </div>
                        <div class="col col-large-6 col-wrapping">
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                            content<br/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="box-footer">
                footer
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "StepWizard",
        data() {
            return {
                displayed: false,
                open: false,
                timeout: undefined
            }
        },
        computed: {
            ...mapState({
                wizardSeen: state => state.settings.wizardSeen
            })
        },
        mounted() {

            if( !this.wizardSeen ) {
                this.displayed = false;
                this.open = false;
                let self = this;
                this.timeout = setTimeout( function() {
                    self.openWizard();
                },600);
            }

        },
        methods: {
            openWizard() {
                document.body.classList.add("locked");

                this.displayed = true;
                let self = this;
                this.timeout = setTimeout( function() {
                    self.open = true;
                },1);

                this.$store.dispatch("settings/setWizardSeen");

            },
            closeWizard() {
                document.body.classList.remove("locked");

                this.open = false;
                let self = this;
                this.timeout = setTimeout( function() {
                    self.displayed = false;
                },300);
            }
        }
    }
</script>


<style lang="scss">

    @import '@/styles/theme.scss';
    @import '@/styles/shared/variables.scss';

    body {
        &.locked {
            overflow: hidden;
        }
    }

    .step-wizard {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba( $color-secondary-shade-50, 0.2);
        display: none;
        opacity: 0;
        justify-content: center;
        align-items: center;
        z-index: 60;
        cursor: pointer;

        &.displayed {
            transition: all $transition-duration-long $transition-timing-function;
            display: flex;
        }
        &.open {
            opacity: 1;
            width: 100vw;
            height: 100vh;

            .box {
                opacity: 1;
                transform: translateY( 0 );
            }
        }

        .box {
            transition: all $transition-duration-long $transition-timing-function;
            transition-delay: $transition-delay-1;
            transform: translateY( $spacing-3 );
            opacity: 0;
            pointer-events: none;
            cursor: pointer;
            width: 80vw;
            height: 80vh;
            max-width: 1440px;
            background: white;
            border-radius: $border-radius;
            position: relative;
            overflow: hidden;

            .box-header {
                height: 100px;
                pointer-events: auto;
            }
            .box-content {
                height: calc( 100% - 200px);
                overflow-y: scroll;
                pointer-events: auto;

                .content-wrapper {
                    max-width: none;
                }
            }
            .box-footer {
                height: 100px;
                pointer-events: auto;
            }
        }

    }


</style>
