<template>
    <div class="tabbed-content">
        {{ tabs }}
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "TabbedContent",
        data() {
            return {
                tabs: [],
                openTab: 0
            }
        },
        mounted() {
            for( let i=0; i<this.$children.length; i++ ) {
                this.tabs.push( this.$children[i].$slots.title[0].text );
            }
            this.$children[0].active = true;
        }
    }
</script>

<style lang="scss">

    .tabbed-content {
        .tab {
            display: none;
            &.active {
                display: block;
             }
        }
    }

</style>
