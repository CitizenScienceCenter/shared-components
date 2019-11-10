<template>
    <div class="tab" :class="{active: active}">
        <div style="display:none;">
            <slot name="title"></slot>
        </div>
        <slot name="content"></slot>
    </div>
</template>

<script>
    export default {
        name: "Tab",
        data() {
            return {
                active: false
            }
        }
    }
</script>


<style>

</style>
