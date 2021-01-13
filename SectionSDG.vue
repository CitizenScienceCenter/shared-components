<template>
    <app-content-section :color=" color ? color : false" id="sdg">
        <div class="content-wrapper">
            <div class="row row-centered">

                <div class="col col-large-8 col-xlarge-8 scroll-effect">
                    <div class="sdg-box">

                        <div class="box-content">
                            <div class="sdg-logo">
                                <img src="@/assets/shared/sdg-logo.svg" />
                            </div>

                            <div class="text">
                                <p class="small reduced-bottom-margin">
                                    <slot></slot>
                                    <a href="https://sustainabledevelopment.un.org" target="_blank">The Sustainable Development Goals</a>
                                </p>
                            </div>

                            <div class="goal">
                                <img :src="goalImage" alt="goal"/>
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
                default: 'overall'
            }
        },
        computed: {
            goalImage () {
                return require('@/assets/shared/sdgs/' + this.goal + '.svg')
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

        padding: $grid-gutter-mobile;

        //box-shadow: 0px 2px 8px -4px rgba($color-black,0.2);

        .box-content {
            position: relative;

            display: flex;
            flex-direction: column-reverse;

            .sdg-logo {
                position: absolute;
                top: 0;
                left: 0;
                img {
                    width: 72px;
                }
            }
            .text {
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
            }
            .goal {
                text-align: right;
                margin-bottom: $grid-gutter-mobile;
                img {
                    height: 72px;
                }
            }
            .sdg-logo, .goal {
                font-size: 0;
            }

        }

    }


    @media only screen and (min-width: $viewport-mobile-large) {

        .sdg-box {
            padding: $grid-gutter-mobile-large;

            .box-content {

                .sdg-logo {

                }
                .text {

                }
                .goal {
                    margin-bottom: $grid-gutter-mobile-large;
                }

            }
        }

    }

    @media only screen and (min-width: $viewport-tablet-portrait) {

        .sdg-box {
            padding: $grid-gutter-tablet-portrait;

            .box-content {

                .sdg-logo {
                    img {
                        width: 80px;
                    }
                }
                .text {

                }
                .goal {
                    margin-bottom: $grid-gutter-tablet-portrait;
                    img {
                        height: 80px;
                    }
                }

            }

        }

    }



    @media only screen and (min-width: $viewport-large) {

        .sdg-box {
            padding: $grid-gutter-large;

            .box-content {

                display: flex;
                flex-direction: row;

                .sdg-logo {
                    margin-right: $grid-gutter-large;
                    position: relative;
                    top: auto;
                    left: auto;

                    img {
                        width: auto;
                    }
                }
                .text {

                }
                .goal {
                    position: relative;
                    top: auto;
                    right: auto;
                    margin-left: $grid-gutter-large;
                    margin-bottom: 0;
                }
                .sdg-logo, .goal {
                    min-width: 96px;
                    img {
                        height: auto;
                    }
                }
            }

        }

    }


    @media only screen and (min-width: $viewport-xlarge) {

        .sdg-box {
            padding: $grid-gutter-xlarge;

            .box-content {
                .sdg-logo {
                    margin-right: $grid-gutter-xlarge;
                }
                .text {

                }
                .goal {
                    margin-left: $grid-gutter-xlarge;
                }
                .sdg-logo, .goal {
                    min-width: 104px;
                }
            }

        }

    }

</style>
