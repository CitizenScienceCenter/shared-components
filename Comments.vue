<template>
    <div class="comments">
        <template v-if="withTitles">
            <h3 class="subheading">Start a new Topic</h3>

            <div class="form-field">
                <growing-textarea v-model="commentTitle" placeholder="Topic Title" fat></growing-textarea>
            </div>
        </template>
        <div class="form-field">
            <growing-textarea v-model="commentText" placeholder="What's on your mind?"></growing-textarea>
        </div>

        <div class="button-group right-aligned">
            <button v-if="withTitles" :disabled="commentTitle === '' || commentText === ''" class="button button-primary" @click="newComment()">Comment</button>
            <button v-else :disabled="commentText === ''" class="button button-primary" @click="newComment()">Comment</button>
        </div>

        <ul class="comment-list">
            <li v-for="(comment,index) in commentTree" :ref="'comment-'+index">

                {{ comment[2] }}
                <h3 class="subheading">{{ comment[0].content.title }}</h3>
                <p>{{ comment[0].content.text }}</p>

                <template v-if="opened.indexOf(index) > -1">
                    <ul class="reply-list">
                        <li v-for="reply in comment[1]">
                            <p>{{ child.content.text }}</p>
                        </li>
                    </ul>
                    <div class="form-field">
                        <growing-textarea v-model="replyText" placeholder="Reply"></growing-textarea>
                    </div>
                    <div class="button-group right-aligned">
                        <button :disabled="replyText.length === 0" class="button button-primary" @click="newComment(comment[0].id)">Reply</button>
                    </div>
                </template>

                <div v-else class="button-group right-aligned">
                    <button @click.prevent="opened.push(index)" class="button button-secondary button-secondary-naked">
                        <template v-if="comment[1].length > 0">{{ comment[1].length }} Replies</template>
                        <template v-else>Reply</template>
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

    import {mapState} from 'vuex'
    import GrowingTextarea from "./GrowingTextarea";


    export default {
        name: "Comments",
        components: {GrowingTextarea},
        data() {
            return {
                commentTree: [],
                opened: [],
                commentTitle: '',
                commentText: '',
                replyText: ''
            }
        },
        props: {
            sourceId: {
              type: String,
              default: null
            },
            withTitles: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            sourceId: function() {
                this.loadComments();
            }
        },
        computed: {
            ...mapState({
                user: state => state.c3s.user.currentUser,
                comments: state => state.c3s.comments.comments,

                loading: state => state.c3s.settings.loading
            })
        },
        mounted: function() {
            //console.log('comments mounted > load comments');
            this.loadComments();
        },
        methods: {
            loadComments: function() {
                //console.log('load comments');
                //console.log(this.sourceId);

                let query = {
                    'select': {
                        'fields': [
                            'users.username as username',
                            '*'
                        ],
                        'tables': [
                            'comments'
                        ]
                    },
                    "join": {
                        "type": "LEFT",
                        "conditions":{
                            "from": {
                                "table": "users",
                                "field": "id"
                            },
                            "to": {
                                "table": "comments",
                                "field": "user_id"
                            }
                        }
                    },
                    'where': [
                        {
                            "field": 'source_id',
                            'op': 'e',
                            'val': this.sourceId
                        }
                    ]
                };


                this.$store.dispatch('c3s/media/getMedia', [query, 'c3s/comments/SET_COMMENTS', 0] ).then(res => {

                    //console.log('comments loaded');
                    this.buildTree();

                });
            },
            buildTree: function() {
                this.commentTree = [];
                for( let i = this.comments.length-1; i >= 0; i-- ) {
                    if( this.comments[i].parent === null ) {
                        //console.log( 'no p' );
                        this.commentTree.unshift( [ this.comments[i], [] ] );
                        //console.log( 'tree length: '+ tree.length );
                    }
                    else {
                        //console.log( 'p: '+ this.comments[i].parent);

                        //console.log( 'tree length: '+ tree.length );
                        for( let j = 0; j < tree.length; j++ ) {
                            //console.log( 'check: ');
                            //console.log( tree[j][0].id );
                            if( this.commentTree[j][0].id ===  this.comments[i].parent ) {
                                //console.log('found in '+ tree[j][0] )
                                this.commentTree[j][1].unshift( this.comments[i] );
                                break;
                            }
                        }
                    }
                }
            },
            newComment: function(parentId) {


                //console.log('new comment');

                let comment;
                if( !parentId ) {

                    //console.log('no parent');

                    comment = {
                        user_id: this.user.id,
                        source_id: this.sourceId,
                        content: {
                            title: this.commentTitle,
                            text: this.commentText
                        }
                    };
                }
                else {
                    console.log('parent: '+parentId);

                    comment = {
                        user_id: this.user.id,
                        source_id: this.sourceId,
                        parent: parentId,
                        content: {
                            text: this.replyText
                        }
                    };
                }



                this.$store.dispatch('c3s/comments/createComment', comment).then(res => {

                    console.log(res);
                    this.loadComments();

                });
            },
            expand( i ) {
                console.log( this.commentTree[i][2] );
                this.commentTree[i][2] = true;
                console.log( this.commentTree[i][2] );
                this.commentTree = this.commentTree;
            }
        }
    }

</script>

<style lang="scss">

    @import '@/styles/theme.scss';
    @import '@/styles/shared/variables.scss';


    .comments {
        .form-field {
            display: block;

            margin-bottom: $spacing-3;
        }
        ul {
            li {
                padding-left: 0;
                margin-left: 0;
                &:before {
                    display: none;
                }
            }
        }
        .comment-list {
            margin-top: $spacing-4;

            .subheading, p {
                margin-bottom: $spacing-2;
            }
        }
    }

    @media only screen and (min-width: $viewport-tablet-portrait) {

        .comments {

            .comment-list {
                margin-top: $spacing-5;

                .subheading, p {
                    margin-bottom: $spacing-3;
                }
            }
        }

    }

</style>
