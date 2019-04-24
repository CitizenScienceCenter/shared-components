<template>
    <a class="inline-hover" @click.prevent="$emit('click')" href="#">
        <span v-if="$slots['display-icon']" class="display-icon"><slot name="display-icon"></slot></span>
        <span v-if="$slots['display-text']" class="display-text"><slot name="display-text"></slot></span>
        <div v-if="$slots['hover']" class="hover">
            <slot name="hover"></slot>
        </div>
    </a>
</template>

<script>
    export default {
        name: "InlineHover"
    }
</script>

<style lang="scss">

    @import '@/styles/theme.scss';
    @import '@/styles/shared/variables.scss';

    .inline-hover {
        position: relative;
        cursor: default;

        .display-icon {
            display: inline-block;
            height: 1em;
            width: 1em;
            padding-left: 1.2em;
            position: relative;
            margin: 0 4px;
            svg {
                position: absolute;
                left: 0;
                width: 1rem;
                height: 1rem;
                line-height: 1.5;
                fill: $color-primary;
            }
        }
        .display-text {
        }

        .hover {
            opacity: 0;
            pointer-events: none;
            transform: translateY( $spacing-1 );
            transition: all $transition-duration-long $transition-timing-function;

            position: absolute;
            bottom: 1.5rem;
            left: -$spacing-1;
            width: 240px;
            font-size: $font-size-small;
            box-sizing: border-box;
            padding: $spacing-2;
            border-radius: $border-radius;
            background-color: white;
            box-shadow: 0px 4px 12px -4px rgba($color-black, 0.2);
            color: $color-black;
        }
        &.overlay-right-aligned {
            .hover {
                left: auto;
                right: -$spacing-1;
            }
        }


        &:visited {
            .display-icon {
                svg {
                    fill: $color-primary;
                }
            }
        }
        &:active {
            .display-icon {
                svg {
                    fill: $color-primary-shade-20;
                }
            }
        }
        @media (hover: hover) {
            &:hover {
                .display-icon {
                    svg {
                        fill: $color-primary-shade-20;
                    }
                }
                .hover {
                    transform: translateY( 0 );
                    opacity: 1;
                }
            }
        }
    }


</style>
