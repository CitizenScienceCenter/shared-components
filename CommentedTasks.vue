<template>
    <div class="comments">
        <ul>
            <li v-for="(task, index) in tasks">
                <router-link tag="button" :to="'/challenge/'+tasks[index].id" class="button button-primary">{{ tasks[index].id }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>

    import {mapState} from 'vuex'

    export default {
        name: "CommentedTasks",
        props: {
            sourceId: {
                type: String,
                default: null
            }
        },
        computed: {
            ...mapState({
                user: state => state.c3s.user.currentUser,
                tasks: state => state.c3s.task.tasks,
                taskMedia: state => state.c3s.task.media,

                loading: state => state.c3s.settings.loading,

                activityId: state => state.consts.activityId
            })
        },
        mounted() {
            this.loadCommentedTasks();
        },
        methods: {
            loadCommentedTasks: function() {
                //console.log('load commented tasks');


                let query = {
                    'select': {
                        'fields': [
                            'tasks.id as task_id',
                            '*'
                        ],
                        'tables': [
                            'tasks'
                        ]
                    },
                    "join": {
                        "type": "LEFT",
                        "conditions":{
                            "from": {
                                "table": "media",
                                "field": "source_id"
                            },
                            "to": {
                                "table": "tasks",
                                "field": "id"
                            }
                        }
                    },
                    'where': [
                        {
                            "field": 'activity_id',
                            'op': 'e',
                            'val': this.activityId
                        },
                        {
                            'field': 'tasks.id',
                            'op': 'i',
                            'val': "(SELECT source_id FROM comments WHERE comments.source_id = tasks.id)",
                            'join': 'a',
                            'type': 'sql'
                        }
                    ]
                };

                this.$store.dispatch('c3s/media/getMedia', [query, undefined, 0]).then(res => {


                    let task_ids = [];
                    let media = [];
                    for( let i = 0; i < res.body.length; i++ ) {
                        task_ids.push( { 'id': res.body[i].task_id } );

                        delete res.body[i].task_id;
                        media.push( res.body[i] );
                    }

                    this.$store.commit('c3s/task/SET_TASKS', task_ids );
                    this.$store.commit('c3s/media/SET_MEDIA', media );


                    //console.log( media );

                });


            }
        }
    }
</script>

<style lang="scss">

</style>
