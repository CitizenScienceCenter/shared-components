<i18n>
    {

    "en": {

    "text": "We use cookies to improve your experience on our sites."

    },

    "de": {

    "text": "Wir verwenden Cookies zur Verbesserung unserer Websites."

    }

    }
</i18n>




<template>
    <div :class="{'accepted':gdprAccepted}" class="gdpr">
        <div class="content-wrapper">

            <div class="row row-centered">
                <div class="col centered">


                    <div class="drawer">
                        <span>{{ $t('text') }}</span>
                        <button class="button button-primary" @click.prevent="acceptGdpr()">OK</button>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>

    import {mapState} from 'vuex'

    export default {
        name: "GDPR",
        computed: {
            ...mapState({
                gdprAccepted: state => state.gdpr.accepted,
            })
        },
        methods: {
            acceptGdpr() {
                console.log( this.$store );
                this.$store.dispatch('gdpr/accept');
            }
        }
    }
</script>

<style lang="scss">

    @import '@/styles/theme.scss';
    @import '@/styles/shared/variables.scss';

    .gdpr {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        pointer-events: none;
        z-index: 500;

        .drawer {
            display: inline-block;
            pointer-events: all;
            background-color: rgba( $color-black, 0.8 );
            color: white;
            padding: $spacing-1 $spacing-3;
            border-top-left-radius: $border-radius;
            border-top-right-radius: $border-radius;

            span {
                font-size: $font-size-small;
                margin-right: $spacing-2;
            }
        }


        &.accepted {
            display: none;
        }
    }

</style>
