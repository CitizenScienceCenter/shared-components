<i18n>
    {


    "de": {

    "feedback-heading": "Haben Sie Fragen oder Anregungen?",
    "feedback-text": "Für Fragen oder Anregungen zum Projekt kontaktieren Sie uns bitte via Email:"

    },
    "en": {

    "feedback-heading": "Do you Have Questions or Feedback?",
    "feedback-text": "For questions about this project, please contact us via email:"

    }

    }
</i18n>


<template>
    <app-content-section :color=" color ? color : 'white'" class="feedback-section">
        <div class="content-wrapper">
            <div class="row row-centered row-middle row-wrapping">

                <div class="col col-4 col-large-2 col-large-before-3 col-wrapping scroll-effect">
                    <div class="image-wrapper">
                        <img src="@/assets/shared/feedback.svg" />
                    </div>
                </div>

                <div class="col col-10 col-large-4 col-large-after-3 col-wrapping scroll-effect scroll-effect-delayed-1">
                    <div>
                        <h2 class="subheading centered left-aligned-large reduced-bottom-margin">{{ $t('feedback-heading') }}</h2>
                        <p v-html="$t('feedback-text')" class="reduced-bottom-margin"></p>
                        <div class="button-group centered left-aligned-large">
                            <button class="button button-primary button-icon button-normal-case" @click="openInNewTab('mailto:'+email+'?subject='+subject)" >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M502.3,190.8c3.9-3.1,9.7-0.2,9.7,4.7V400c0,26.5-21.5,48-48,48H48c-26.5,0-48-21.5-48-48V195.6c0-5,5.7-7.8,9.7-4.7
                      c22.4,17.4,52.1,39.5,154.1,113.6c21.1,15.4,56.7,47.8,92.2,47.6c35.7,0.3,72-32.8,92.3-47.6C450.3,230.4,479.9,208.2,502.3,190.8z
                       M256,320c23.2,0.4,56.6-29.2,73.4-41.4c132.7-96.3,142.8-104.7,173.4-128.7c5.8-4.5,9.2-11.5,9.2-18.9v-19c0-26.5-21.5-48-48-48H48
                      C21.5,64,0,85.5,0,112v19c0,7.4,3.4,14.3,9.2,18.9c30.6,23.9,40.7,32.4,173.4,128.7C199.4,290.8,232.8,320.4,256,320L256,320z"/>
                    </svg>
                                {{ email }}
                            </button>
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
        name: "SectionFeedback",
        components: {
            'app-content-section': ContentSection
        },
        props: {
            color: String,
            email: {
                type: String,
                default: 'help@citizenscience.ch'
            },
            subject: {
                type: String,
                default: ''
            }
        },
        methods: {
            openInNewTab: function(url) {
                var win = window.open(url, '_blank');
                win.focus();
            }
        }
    }

</script>

<style lang="scss">

    @import '@/styles/theme.scss';
    @import '@/styles/shared/variables.scss';

    $color-gradient-middle: mix($color-gradient-start, $color-gradient-end, 75%);

    .feedback-section {

        .image-wrapper {
            background: linear-gradient(120deg, $color-gradient-start,$color-gradient-middle );
            border-radius: 50%;
            line-height: 0;
            img {
            }
        }

    }

    @media only screen and (min-width: $viewport-tablet-portrait) {


    }



    @media only screen and (min-width: $viewport-large) {



    }


    @media only screen and (min-width: $viewport-xlarge) {


    }

</style>
