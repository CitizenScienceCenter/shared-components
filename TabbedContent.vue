<template>
    <div class="tabbed-content">
        <div class="tab-navigation" ref="subnav">
            <ul ref="navlist">
                <li v-for="(tab,index) in tabs" :key="tab" :class="{ active: index === activeTab }" @click="setActive(index)">
                    <a>{{ tab }}</a>
                </li>
            </ul>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "TabbedContent",
        data() {
            return {
                tabs: [],
                activeTab: 0
            }
        },
        mounted() {
            for( let i=0; i<this.$children.length; i++ ) {
                this.tabs.push( this.$children[i].$slots.title[0].text );
            }
            this.$children[0].active = true;
        },
        methods: {
            setActive( index ) {
                for( let i=0; i<this.$children.length; i++ ) {
                    this.$children[i].active = false;
                }
                this.$children[index].active = true;
                this.activeTab = index;
            }
        }
    }
</script>

<style lang="scss">

    @import '@/styles/theme.scss';
    @import '@/styles/shared/variables.scss';

    .tabbed-content {
        .tab {
            display: none;
            &.active {
                display: block;
             }
        }

        .tab-navigation {
            overflow-x: auto;
            //background: linear-gradient(120deg, rgba($color-gradient-start, 0.025), rgba($color-gradient-end, 0.025) );

            ul {
                display: table;
                white-space: nowrap;
                box-sizing: border-box;
                font-size: 0;
                margin: auto;
                padding: 0 calc( #{$grid-margin-mobile} + #{$grid-gutter-mobile} / 2);

                li {
                    padding: 0;
                    margin-bottom: 0;
                    &:before {
                        display: none;
                    }

                    white-space: nowrap;
                    display: inline-block;

                    margin-right: $spacing-2;
                    &:last-child {
                        margin-right: 0;
                    }

                    a {
                        white-space: nowrap;
                        display: block;
                        font-size: $font-size-small;
                        color: $color-black-tint-50;
                        line-height: 40px;
                        cursor: pointer;

                        &:active {
                            color: $color-black;
                        }
                        @media (hover: hover) {
                            &:hover {
                                color: $color-black;
                            }
                        }
                    }

                    &.active {
                        a {
                            color: $color-black;
                        }
                    }
                }
            }
        }

    }


    @media only screen and (min-width: $viewport-tablet-portrait) {

        .tabbed-content {
            .tab-navigation {
                ul {
                    li {
                        margin-right: $spacing-3;

                        &:last-child {
                            margin-right: 0;
                        }

                        a {
                            line-height: 48px;
                        }
                    }
                }
            }
        }

    }



    @media only screen and (min-width: $viewport-large) {

        .tabbed-content {
            .tab-navigation {
                ul {
                    li {
                        margin-right: $spacing-4;

                        &:last-child {
                            margin-right: 0;
                        }
                    }
                }
            }
        }

    }

</style>
