<template>
    <div v-else class="loader-wrapper">
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

    @import '@/styles/theme.scss';
    @import '@/styles/shared/variables.scss';

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

                &.head-1 {
                    background-color: $color-primary;
                    margin-right: $spacing-1;
                }
                &.head-2 {
                    background-color: $color-secondary;
                }
            }
        }
    }


</style>
