<template>
    <div class="expandable margin-bottom" :class="{open:open}">
        <div class="header">
            <h3 @click="toggle" :class="{small: small}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352.26,273l-136,136a23.9,23.9,0,0,1-33.9,0l-22.6-22.6a23.9,23.9,0,0,1,0-33.9l96.4-96.4-96.4-96.4a23.9,23.9,0,0,1,0-33.9l22.5-22.8a23.9,23.9,0,0,1,33.9,0l136,136A23.93,23.93,0,0,1,352.26,273Z"/></svg>
                <slot name="header"></slot>
            </h3>
        </div>
        <div class="content-box" :style="{height:contentBoxHeight+'px'}">
            <div class="content" :ref="id">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Expandable",
        props: {
          small: {
              type: Boolean,
              default: false
          }
        },
        data() {
            return {
                open: false,
                contentHeight: undefined,
                id: this._uid
            }
        },
        computed: {
            contentBoxHeight() {
                if( this.open ) {
                    return this.contentHeight;
                }
                else {
                    return 0;
                }
            }
        },
        mounted() {
            let self = this;
            window.addEventListener('resize', function() {
                self.contentHeight = self.$refs[self.id].offsetHeight;
            } );
        },
        methods: {
            toggle() {
                this.contentHeight = this.$refs[this.id].offsetHeight;
                this.open = !this.open;
            }
        }
    }
</script>

<style lang="scss">

    @import '@/styles/theme.scss';
    @import '@/styles/shared/variables.scss';

    .expandable {
        .header {
            h3 {
                font-size: $font-size-medium;
                font-weight: 700;
                color: $color-primary;
                cursor: pointer;
                position: relative;
                padding-left: $spacing-3;
                transition: color $transition-duration-short $transition-timing-function;

                svg {
                    position: absolute;
                    top: calc( ( #{$font-size-medium} *1.25 - #{$font-size-normal} ) /2 );
                    left: 0;
                    width: $font-size-normal;
                    height: $font-size-normal;
                    fill: $color-primary;
                    transition: all $transition-duration-long $transition-timing-function;
                }

                &:visited {
                    color: $color-primary;
                }
                &:active {
                    color: $color-primary-shade-20;
                    svg {
                        fill: $color-primary-shade-20;
                    }
                }
                @media (hover: hover) {
                    &:hover {
                        color: $color-primary-shade-20;
                        svg {
                            fill: $color-primary-shade-20;
                        }
                    }
                }

                &.small {
                    font-size: $font-size-normal;
                    font-weight: 400;
                    svg {
                        top: calc( ( #{$font-size-normal} *1.25 - #{$font-size-normal} ) /2 );
                    }
                }
            }
        }
        .content-box {
            overflow: hidden;
            transition: height $transition-duration-long $transition-timing-function;
            .content {
                padding: $spacing-3 0;
                padding-left: $spacing-3;
                padding-bottom: $spacing-2;
            }
        }

        &.open {
            .header {
                h3 {
                    color: $color-primary-shade-20;
                    svg {
                        fill: $color-primary-shade-20;
                        transform: rotate(90deg);
                    }
                }
            }
        }
    }

</style>
