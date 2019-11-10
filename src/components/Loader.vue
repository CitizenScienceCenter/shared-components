<template>
    <div class="loader-wrapper">
        <div class="loader">
            <div class="head head-1">

            </div>
            <div class="head head-2">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Loader"
    }
</script>

<style lang="scss">

    @import '/styles/theme.scss';
    @import '/styles/shared/variables.scss';

    .loader-wrapper {
        width: 100%;
        height: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;

        .loader {
            display: flex;

            .head {

                width: $spacing-1;
                height: $spacing-1;
                border-radius: 50%;

                transition: all $transition-duration-short $transition-timing-function;

                @keyframes pulse {
                    0%   { transform: scale(1) }
                    30% { transform: scale(1.5) }
                    60%   { transform: scale(1) }
                    100% { transform: scale(1) }
                }
                animation-name: pulse;
                animation-duration: 1s;
                animation-iteration-count: infinite;
                animation-timing-function: $transition-timing-function;

                &.head-1 {
                    background-color: $color-primary;
                    margin-right: $spacing-1;
                }
                &.head-2 {
                    background-color: $color-secondary;
                    animation-delay: 0.2s;
                }
            }
        }
    }


</style>
