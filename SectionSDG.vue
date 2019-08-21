<template>
    <app-content-section :color=" color ? color : false" id="sdg">
        <div class="content-wrapper">
            <div class="row row-centered">

                <div class="col col-large-8 col-xlarge-7 scroll-effect">
                    <div class="sdg-box">
                        <div class="row row-centered row-wrapping">
                            <div class="col col-6 col-large-3 col-wrapping centered">
                                <div class="goal-wrapper">
                                    <img v-if="goal" class="goal" :src="goalImage" />
                                </div>
                            </div>
                            <div class="col col-10 col-large-7 col-wrapping">
                                <p class="reduced-bottom-margin"><b>The Sustainable Development Goals</b></p>
                                <p class="small reduced-bottom-margin">
                                    <slot></slot>
                                    <a href="https://www.un.org/sustainabledevelopment/sustainable-development-goals/" target="_blank">SDG Website</a>
                                </p>
                                <!--
                                <div class="button-group centered left-aligned-large">
                                    <button class="button button-secondary">
                                        SDG Website
                                    </button>
                                </div>
                                -->
                            </div>
                            <div class="col col-4 col-tablet-portrait-4 col-large-2 col-wrapping centered">
                                <img class="sdg" src="@/assets/shared/sdg-logo.svg" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </app-content-section>
</template>

<script>


    import ContentSection from '@/components/shared/ContentSection.vue';

    export default {
        name: "SectionSDG",
        components: {
            'app-content-section': ContentSection
        },
        props: {
            color: String,
            goal: {
                type: String,
                default: 1
            }
        },
        computed: {
            goalImage () {
                return require('@/assets/shared/sdgs/neg/' + this.goal + '.svg')
            }
        }
    }
</script>

<style lang="scss">

    @import '@/styles/theme.scss';
    @import '@/styles/shared/variables.scss';

    .sdg-box {

        background-color: white;
        border-radius: $border-radius;

        padding: $spacing-4;

        //box-shadow: 0px 2px 8px -4px rgba($color-black,0.2);

        .row {
            .col {

                .goal-wrapper {
                    position: relative;
                    img.goal {
                        display: block;
                        padding: 0;
                        border-radius: $border-radius;
                        background: linear-gradient(120deg, $color-gradient-start, $color-gradient-end );
                        position: relative;
                    }

                    &:after {
                        content: '';
                        display: block;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                        border: 1px solid white;
                    }
                }

                p {
                    color: $color-black;

                    &:first-child {
                        margin-bottom: $spacing-1;
                    }

                    a {
                        display: block;
                        margin-top: $spacing-1;
                        font-weight: 700;
                    }
                }

                img.sdg {
                    bottom: 0;
                }

            }
        }
    }

    @media only screen and (min-width: $viewport-tablet-portrait) {

        .sdg-box {
            padding: $spacing-5;

            .row {
                .col {

                    img.sdg {
                    }

                }
            }
        }

    }



    @media only screen and (min-width: $viewport-large) {

        .sdg-box {
            padding: $spacing-4;

            .row {
                .col {

                    img.goal {
                    }

                }
            }
        }

    }


    @media only screen and (min-width: $viewport-xlarge) {

        .sdg-box {

            .row {
                .col {

                    img.goal {

                    }

                }
            }
        }

    }

</style>
