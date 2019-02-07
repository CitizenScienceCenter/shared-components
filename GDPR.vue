<template>
    <div class="gdpr">
        <div class="drawer" :class="{'accepted':gdprAccepted}">
            <div class="content-wrapper">

                <div class="row row-centered">
                    <div class="col right-aligned">

                        Topping sugar plum cupcake marshmallow croissant gummies. Cake oat cake candy canes candy canes pie.
                        <button class="button button-primary" @click.prevent="acceptGdpr()">Yes</button>

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
                console.log('dispatch');
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
        height: 64px;
        pointer-events: none;
        z-index: 500;

        .drawer {
            pointer-events: all;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba( $color-black, 0.8 );
            color: white;

            &.accepted {
                transition: all $transition-duration-short $transition-timing-function;
                top: 100%;
                opacity: 0;
            }
        }
    }

</style>
