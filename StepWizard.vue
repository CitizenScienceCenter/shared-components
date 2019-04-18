<template>
    <div class="step-wizard" :class="{displayed:displayed,open:open}">
        <div class="overlay" @click="closeWizard"></div>
        <div class="box">
            <div class="slider" :style="{width:($slots.default.length*100)+'%', left:(step*-100+'%')}">
                <slot></slot>
            </div>
            <div class="box-footer">
                <button class="button button-secondary" @click="step--">Prev</button>
                <button class="button button-primary" @click="step++">Next</button>
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
                timeout: undefined,
                step: 0
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

            .box {
                opacity: 1;
                transform: translateY( 0 );
            }
        }

        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba( $color-secondary-shade-50, 0.2);
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
            overflow: hidden;
            position: relative;

            .slider {
                transition: left $transition-duration-long $transition-timing-function;
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;

                .slide {
                    display: inline-block;
                    width: 80vw;
                    height: 80vh;
                    max-width: 1440px;

                    .header {
                        height: 80px;
                        pointer-events: auto;
                    }
                    .content {
                        height: calc( 100% - 160px);
                        overflow-y: scroll;
                        pointer-events: auto;

                        .content-wrapper {
                            max-width: none;
                        }
                    }
                }
            }
            .box-footer {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 80px;
                width: 100%;
                pointer-events: auto;
                padding: $spacing-2;
            }
        }

    }


</style>
