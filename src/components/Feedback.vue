<template>
    <div class="feedback">
        <button class="button button-secondary button-secondary-naked button-icon button-icon-only" @click="open = !open" :class="{open: open}" >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256,32C114.6,32,0,125.1,0,240c0,49.6,21.4,95,57,130.7C44.5,421.1,2.7,466,2.2,466.5a8,8,0,0,0-1.5,8.7A7.83,7.83,0,0,0,8,480c66.3,0,116-31.8,140.6-51.4A305,305,0,0,0,256,448c141.4,0,256-93.1,256-208S397.4,32,256,32Zm-4.55,344.31a37.18,37.18,0,1,1,37.17-37.17A37.21,37.21,0,0,1,251.45,376.31Zm32.33-106.13v1.07a9.7,9.7,0,0,1-9.7,9.7H228.82a9.69,9.69,0,0,1-9.69-9.7V268c0-33.18,25.15-46.44,44.16-57.1,16.3-9.14,26.29-15.35,26.29-27.46,0-16-20.42-26.63-36.93-26.63-22,0-31.87,10.62-46.3,28.93a9.7,9.7,0,0,1-13.47,1.71l-28-21.26a9.71,9.71,0,0,1-2.2-13.14c22.06-33,50.15-51.52,94.19-51.52C302.38,101.55,351,137.1,351,184,351,246.22,283.78,247.18,283.78,270.18Z"/></svg>
        </button>
    </div>
</template>

<script>
    export default {
        name: "Feedback",
        data() {
            return {
                open: false
            }
        }
    }
</script>

<style lang="scss">

    @import '/styles/theme.scss';
    @import '/styles/shared/variables.scss';

    .feedback {
        position: fixed;
        bottom: $spacing-8;
        right: 0;
        z-index: 1;

        .button.button-icon {
            background: white;
            border-radius: 50% 0 0 50%;

            box-shadow: 0px 4px 8px -4px rgba($color-black,0.2);

            svg {
                top: 10px;
                left: 10px;
                width: 20px;
                height: 20px;
            }
        }

        &.open {
            background: red;
        }
    }


    @media only screen and (min-width: $viewport-tablet-portrait) {

        .feedback {
            .button.button-icon {

                svg {
                    top: 14px;
                    left: 14px;
                }
            }
        }

    }

</style>
