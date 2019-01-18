<template>
    <div class="comments">
        <ul>
            <li v-for="task in tasks">
                <router-link tag="button" :to="'/challenge/'+task.id" class="button button-primary">{{ task.id }}</router-link>
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

                loading: state => state.c3s.settings.loading
            })
        },
        mounted() {
            this.loadCommentedTasks();
        },
        methods: {
            loadCommentedTasks: function() {
                console.log('load commented tasks');
                console.log(this.sourceId);


                let taskQuery = {
                    'select': {
                        'fields': [
                            '*'
                        ],
                        'tables': [
                            'tasks'
                        ]
                    },
                    'where': [
                        {
                            "field": 'activity_id',
                            'op': 'e',
                            'val': this.sourceId
                        }
                    ]
                };


                this.$store.dispatch('c3s/task/getTasks', [taskQuery, 0]).then(tasks => {


                    console.log( 'tasks loaded');

                    console.log( this.tasks );


                    if ( this.tasks.length > 0 ) {


                        /*
                        const mediaQuery = {
                            'select': {
                                'fields': [
                                    '*'
                                ],
                                'tables': [
                                    'media'
                                ]
                            },
                            'where': [
                                {
                                    "field": "source_id",
                                    'op': 'e',
                                    'val': this.tasks[0].id
                                }
                            ]
                        };

                        this.$store.dispatch('c3s/media/getMedia', [mediaQuery, 'c3s/task/SET_MEDIA', 0]).then(media => {

                            console.log('media loaded');


                            console.log( this.media );

                        });
                        */

                    }


                });


            }
        }
    }
</script>

<style lang="scss">

</style>
