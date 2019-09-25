<i18n>
    {


    "de": {


    "number-of-submissions": "Anzahl<br>Antworten",
    "number-of-users": "Anzahl<br>Benutzer",
    "number-of-tasks": "Anzahl<br>Aufgaben"

    },
    "en": {

    "number-of-submissions": "Number of<br>Submissions",
    "number-of-users": "Number<br>of Users",
    "number-of-tasks": "Number<br>of Tasks"

    }

    }
</i18n>

<template>
    <app-content-section :color=" color ? color : false" class="content-section-condensed stats-section">
        <div class="content-wrapper">
            <div class="row row-centered row-wrapping">

                <div v-show="submissionCount" class="col col-wrapping col-large-3 col-xlarge-2 scroll-effect centered">
                    <label v-html="$t('number-of-submissions')"></label>
                    <span class="value">{{submissionCount}}</span>
                </div>

                <div v-show="userCount" class="col col-wrapping col-large-3 col-xlarge-2 scroll-effect scroll-effect-delayed-1 centered">
                    <label v-html="$t('number-of-users')"></label>
                    <span class="value">{{userCount}}</span>
                </div>

                <div v-show="taskCount" class="col col-wrapping col-large-3 col-xlarge-2 scroll-effect scroll-effect-delayed-2 centered">
                    <label v-html="$t('number-of-tasks')"></label>
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
            display: inline-block;
            text-align: right;
            line-height: 1.1;
        }
        .value {
            font-size: $font-size-xlarge;
            font-weight: 700;
        }
    }

</style>
