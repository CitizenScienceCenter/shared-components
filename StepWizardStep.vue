<template>
    <div class="slide">
        <div class="header">
            <slot name="title"></slot>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "StepWizardStep"
    }
</script>
