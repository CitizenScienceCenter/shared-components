<template>
    <div class="step-wizard" :class="{displayed:displayed,open:open}">
        <div class="overlay" @click="closeWizard"></div>
        <div class="box">
            <div class="slider" :style="{width:($slots.default.length*100)+'%', left:(step*-100+'%')}">
                <slot></slot>
            </div>
            <div class="box-footer">
                <div class="button-group right-aligned">
                    <button class="button button-secondary" v-if="step > 0" @click="prevStep">Zurück</button>
                    <button class="button button-primary-main" v-if="step+1 < $children.length" @click="nextStep">Weiter</button>
                    <button class="button button-primary-main" v-else @click="closeWizard">Starten</button>
                </div>
                <div class="progress">
                    <div class="progress-bar">
                        <div class="progress-bar-back">
                            <div class="progress-bar-fill" :style="{width:((step+1)/$children.length*100)+'%'}"></div>
                        </div>
                    </div>
                    <div class="text">
                        <span class="text-short">{{(step+1)}} / {{$children.length}}</span>
                        <span class="text-normal"><span class="label">Schritt </span>{{(step+1)}} von {{$children.length}}</span>
                    </div>
                </div>
            </div>
            <button class="button button-secondary button-icon button-icon-only button-secondary-naked close-button" @click="closeWizard">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M322.72,256,422.79,155.93a31.46,31.46,0,0,0,0-44.48L400.55,89.21a31.46,31.46,0,0,0-44.48,0L256,189.28,155.93,89.21a31.46,31.46,0,0,0-44.48,0L89.21,111.45a31.46,31.46,0,0,0,0,44.48L189.28,256,89.21,356.07a31.46,31.46,0,0,0,0,44.48l22.24,22.24a31.46,31.46,0,0,0,44.48,0L256,322.72,356.07,422.79a31.46,31.46,0,0,0,44.48,0l22.24-22.24a31.46,31.46,0,0,0,0-44.48Z"/>
                </svg>
            </button>
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
                },900);
            }

        },
        methods: {
            openWizard() {
                document.body.classList.add("locked");

                this.step = 0;
                this.displayed = true;
                let self = this;
                this.timeout = setTimeout( function() {
                    self.open = true;
                },10);

                this.$store.dispatch("settings/setWizardSeen");

            },
            closeWizard() {
                document.body.classList.remove("locked");

                this.open = false;
                let self = this;
                this.timeout = setTimeout( function() {
                    self.displayed = false;
                },300);
            },
            nextStep() {
                if( this.step+1 < this.$children.length ) {
                    this.step++;
                }
            },
            prevStep() {
                if( this.step > 0 ) {
                    this.step--;
                }
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

    $box-max-width: 1140px;
    $box-max-height: 720px;

    .step-wizard {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: none;
        opacity: 0;
        align-items: center;
        z-index: 60;

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
            cursor: pointer;
        }

        .box {
            margin: auto;
            margin-top: 2.5vh;
            transition: all $transition-duration-long $transition-timing-function;
            transition-delay: $transition-delay-1;
            transform: translateY( $spacing-3 );
            opacity: 0;
            width: 90vw;
            height: 85vh;
            max-height: $box-max-height;
            max-width: $box-max-width;
            background: white;
            border-radius: $border-radius;
            overflow: hidden;
            position: relative;
            box-shadow: 0px 4px 20px -4px rgba($color-black, 0.2);

            .slider {
                transition: left $transition-duration-long $transition-timing-function;
                position: absolute;
                top: 0;
                left: 0;
                height: calc( 100% - 72px );
                display: flex;
                flex-direction: row;

                .slide {
                    width: 90vw;
                    height: 100%;
                    max-width: $box-max-width;
                    display: flex;
                    flex-direction: column;

                    .header {
                        font-size: $font-size-medium;
                        color: $color-secondary;
                        font-weight: 700;
                        line-height: 1.25;
                        box-sizing: border-box;
                        padding: $spacing-2 0;
                        padding-right: $spacing-5;
                        padding-left: $spacing-1 + $grid-gutter-mobile/2;
                    }
                    .content {
                        overflow-y: scroll;
                        flex: 1;

                        .content-section {
                            padding: 0;
                            .content-wrapper {
                                padding: 0 $spacing-1;
                                max-width: none;
                            }
                        }

                    }
                }
            }
            .box-footer {
                background: white;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                padding: ( $spacing-1 + $grid-gutter-mobile/2 );

                .progress {
                    position: absolute;
                    top: $spacing-1 + $grid-gutter-mobile/2;
                    left: $spacing-1 + $grid-gutter-mobile/2;
                    .progress-bar {
                        height: 40px;
                        width: 32px;
                        padding-top: calc( 40px / 2 - #{$spacing-1} / 2 );
                        margin-right: $spacing-2;
                        float: left;
                        .progress-bar-back {
                            width: 100%;
                            height: $spacing-1;
                            border-radius: $border-radius;
                            overflow: hidden;
                            background-color: $color-secondary-tint-90;
                            .progress-bar-fill {
                                height: 100%;
                                width: 50%;
                                background-color: $color-secondary;
                                transition: width $transition-duration-long $transition-timing-function;
                            }
                        }
                        display: none;
                    }
                    .text {
                        display: inline-block;
                        line-height: 40px;
                        font-size: $font-size-small;

                        .text-short {
                        }
                        .text-normal {
                            display: none;
                            .label {
                                display: none;
                            }
                        }
                    }
                }
            }
            .close-button {
                position: absolute;
                top: $spacing-1;
                right: $spacing-1;
            }
        }

    }


    @media only screen and (min-width: $viewport-mobile-large) {

        .step-wizard {
            .box {
                .slider {
                    .slide {
                        .header {
                            padding-left: $spacing-1 + $grid-gutter-mobile-large/2;
                        }
                    }
                }
                .box-footer {
                    padding: ( $spacing-1 + $grid-gutter-mobile-large/2 );
                    .progress {
                        top: $spacing-1 + $grid-gutter-mobile-large/2;
                        left: $spacing-1 + $grid-gutter-mobile-large/2;
                        .progress-bar {
                            display: block;
                        }
                    }
                }
            }
        }

    }

    @media only screen and (min-width: $viewport-tablet-portrait) {

        .step-wizard {
            .box {
                .slider {
                    .slide {
                        .header {
                            padding-top: $spacing-3;
                            padding-bottom: $spacing-3;
                            padding-left: $spacing-1 + $grid-gutter-tablet-portrait/2;
                        }
                    }
                }
                .box-footer {
                    padding: ( $spacing-1 + $grid-gutter-tablet-portrait/2 );
                    .progress {
                        top: $spacing-1 + $grid-gutter-tablet-portrait/2;
                        left: $spacing-1 + $grid-gutter-tablet-portrait/2;
                        .progress-bar {
                            height: 48px;
                            width: 64px;
                            padding-top: calc( 48px / 2 - #{$spacing-1} / 2 );
                        }
                        .text {
                            line-height: 48px;
                            .text-short {
                                display: none;
                            }
                            .text-normal {
                                display: inline;
                                .label {
                                    display: inline;
                                }
                            }
                        }
                    }
                }
            }
        }

    }

    @media only screen and (min-width: $viewport-large) {

        .step-wizard {
            .box {
                .slider {
                    .slide {
                        .header {
                            padding-left: $spacing-1 + $grid-gutter-large/2;
                        }
                    }
                }
                .box-footer {
                    padding: ( $spacing-1 + $grid-gutter-large/2 );
                    .progress {
                        top: $spacing-1 + $grid-gutter-large/2;
                        left: $spacing-1 + $grid-gutter-large/2;
                    }
                }
            }
        }

    }

    @media only screen and (min-width: $viewport-xlarge) {

        .step-wizard {
            .box {
                .slider {
                    .slide {
                        .header {
                            padding-top: $spacing-4;
                            padding-bottom: $spacing-4;
                            padding-left: $spacing-1 + $grid-gutter-xlarge/2;
                        }
                    }
                }
                .box-footer {
                    padding: ( $spacing-1 + $grid-gutter-xlarge/2 );
                    .progress {
                        top: $spacing-1 + $grid-gutter-xlarge/2;
                        left: $spacing-1 + $grid-gutter-xlarge/2;
                    }
                }
            }
        }

    }


</style>
