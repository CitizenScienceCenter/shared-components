<i18n>
    {
    "de": {

    "label-username": "Benutzername",
    "label-score": "Antworten",

    "anonymous-username": "Anonymer Benutzer"

    },
    "en": {

    "label-username": "Username",
    "label-score": "Submissions",

    "anonymous-username": "Anonymous User"

    }
    }
</i18n>

<template>
    <table class="ranking">
        <tr>
            <th></th>
            <th>{{ $t('label-username') }}</th>
            <th>{{ $t('label-score') }}</th>
        </tr>
        <tr v-for="rankingEntry in ranking" v-if="limit === undefined || rankingEntry.rank <= limit" :key="rankingEntry.username">
            <td>
                <template v-if="!rankingEntry.sameAsPrevious">{{rankingEntry.rank}}.</template>
            </td>
            <td><b>
                <template v-if="!rankingEntry.username.search('_anon')">{{ $t('anonymous-username') }}</template>
                <template v-else>{{rankingEntry.username}}</template>
            </b></td>
            <td>{{rankingEntry.subs}}</td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: "RankingTable",
        props: {
            ranking: Array,
            limit: {
                type: Number,
                default: undefined
            }
        }
    }
</script>
