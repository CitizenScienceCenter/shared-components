<i18n>
  {


  "de": {


    "label-number-of-submissions": "Gesamte Anzahl<br>Antworten",
    "label-number-of-users": "Anzahl<br>Benutzer",
    "label-number-of-tasks": "Anzahl<br>Aufgaben",

    "label-number-of-my-submissions": "Anzahl Ihrer<br>Antworten",
    "label-my-progress": "Ihr<br>Fortschritt",
    "label-my-rank": "Ihr<br>Rang"

    },

  "en": {

    "label-number-of-submissions": "Total Number of<br>Submissions",
    "label-number-of-users": "Number<br>of Users",
    "label-number-of-tasks": "Number<br>of Tasks",

    "label-number-of-my-submissions": "Number of your<br>Submissions",
    "label-my-progress": "Your<br>Progress",
    "label-my-rank": "Your<br>Rank"

    },

  "fr": {

    "label-number-of-submissions": "Nombre total<br>de soumissions",
    "label-number-of-users": "Nombre<br>d'utilisateurs",
    "label-number-of-tasks": "Nombre<br>de tâches",

    "label-number-of-my-submissions": "Nombre de<br>vos soumissions",
    "label-my-progress": "Vos<br>progrès",
    "label-my-rank": "Votre<br>rang"

  },

  "it": {

    "label-number-of-submissions": "Numero totale<br>di invii",
    "label-number-of-users": "Numero<br>di utenti",
    "label-number-of-tasks": "Numero<br>di attività",

    "label-number-of-my-submissions": "Numero<br>di invii",
    "label-my-progress": "I tuoi<br>progressi",
    "label-my-rank": "Il tuo<br>grado"

  }

  }
</i18n>

<template>
    <div class="content-subsection stats-sub-section">
        <div class="row row-centered row-wrapping">

            <div v-show="submissionCount !== undefined" class="col col-wrapping col-large-3 col-xlarge-2 scroll-effect centered">
                <label v-html="$t('label-number-of-submissions')"></label>
                <span class="value">{{submissionCount}}</span>
            </div>

            <div v-show="userCount !== undefined" class="col col-wrapping col-large-3 col-xlarge-2 scroll-effect scroll-effect-delayed-1 centered">
                <label v-html="$t('label-number-of-users')"></label>
                <span class="value">{{userCount}}</span>
            </div>

            <div v-show="taskCount !== undefined" class="col col-wrapping col-large-3 col-xlarge-2 scroll-effect scroll-effect-delayed-2 centered">
                <label v-html="$t('label-number-of-tasks')"></label>
                <span class="value">{{taskCount}}</span>
            </div>


            <div v-show="mySubmissionCount !== undefined" class="col col-wrapping col-large-3 col-xlarge-2 scroll-effect centered">
                <label v-html="$t('label-number-of-my-submissions')"></label>
                <span class="value">{{mySubmissionCount}}</span>
            </div>

            <div v-show="myProgress !== undefined" class="col col-wrapping col-large-3 col-xlarge-2 scroll-effect scroll-effect-delayed-1 centered">
                <label v-html="$t('label-my-progress')"></label>
                <span class="value">{{myProgress}}%</span>
            </div>

            <div v-show="myRank !== undefined" class="col col-wrapping col-large-3 col-xlarge-2 scroll-effect scroll-effect-delayed-2 centered">
                <label v-html="$t('label-my-rank')"></label>
                <span class="value">{{myRank}}.</span>
            </div>

            <div v-show="ranking !== undefined" class="col col-wrapping col-large-6 scroll-effect">
                <h3 class="subheading centered">Top Contributors</h3>
                <ranking-table :ranking="ranking" :limit="3"></ranking-table>
                <div class="button-group centered">
                    <router-link tag="button" to="/ranking/current" class="button button-secondary">Show Full Ranking</router-link>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

    import RankingTable from "./RankingTable";

    export default {
        name: "SubSectionStats",
        components: {
            RankingTable
        },
        props: {
            submissionCount: Number,
            userCount: Number,
            taskCount: Number,

            mySubmissionCount: Number,
            myProgress: Number,
            myRank: Number,

            ranking: Array
        }
    }
</script>

<style lang="scss">

    @import '@/styles/theme.scss';
    @import '@/styles/shared/variables.scss';

    .stats-sub-section {
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
