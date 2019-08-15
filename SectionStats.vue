<template>
    <app-content-section :color=" color ? color : false" class="content-section-condensed stats-section">
        <div class="content-wrapper">
            <div class="row row-centered row-wrapping">

                <div v-show="submissionCount" class="col col-wrapping col-large-3 col-xlarge-2 scroll-effect centered">
                    <label>Number of Submissions</label>
                    <span class="value">{{submissionCount}}</span>
                </div>

                <div v-show="userCount" class="col col-wrapping col-large-3 col-xlarge-2 scroll-effect scroll-effect-delayed-1 centered">
                    <label>Number of Users</label>
                    <span class="value">{{userCount}}</span>
                </div>

                <div v-show="taskCount" class="col col-wrapping col-large-3 col-xlarge-2 scroll-effect scroll-effect-delayed-2 centered">
                    <label>Number of Tasks</label>
                    <span class="value">{{taskCount}}</span>
                </div>

            </div>
        </div>
    </app-content-section>
</template>

<script>

    import ContentSection from '@/components/shared/ContentSection.vue';

    export default {
        name: "SectionStats",
        components: {
            'app-content-section': ContentSection
        },
        props: {
            color: String,

            submissionCount: Number,
            userCount: Number,
            taskCount: Number
        }
    }
</script>

<style lang="scss">

    @import '@/styles/theme.scss';
    @import '@/styles/shared/variables.scss';

    .stats-section {
        label {
            margin-right: $spacing-2;
        }
        .value {
            font-size: $font-size-large;
            font-weight: 700;
        }
    }

</style>
