<template>
    <div class="comments">
        <template v-if="withTitles">
            <h3 class="subheading">Start a new Topic</h3>
        </template>

        <div class="comment">

            <user-avatar class="avatar" :username="user.username"></user-avatar>

            <template v-if="withTitles">
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

        </div>

        <ul class="comment-list">
            <li v-for="(comment,index) in commentTree">

                <div class="comment">

                    <user-avatar class="avatar" :username="user.username"></user-avatar>

                    <h3 class="subheading">{{ comment[0].content.title }}</h3>
                    <p>{{ comment[0].content.text }}</p>

                    <div v-if="!replyFieldsShown[index]" class="button-group right-aligned">
                        <button @click.prevent="showReplyField(index)" class="button button-secondary button-secondary-naked">Reply</button>
                    </div>
                    <div v-else>
                        <div class="form-field">
                            <growing-textarea v-model="replyText" placeholder="Reply"></growing-textarea>
                        </div>
                        <div class="button-group right-aligned">
                            <button :disabled="replyText.length === 0" class="button button-primary" @click="newComment(comment[0].comment_id)">Reply</button>
                        </div>
                    </div>

                    <template v-if="replyCounts[index] > 0">

                        <ul class="reply-list">
                            {{ (commentTree[index][1].length) }}
                            {{ replyCounts[index] }}
                            <li v-if="replyIndex < replyCounts[index]" v-for="(reply,replyIndex) in comment[1]">

                                <div class="comment">
                                    <user-avatar class="avatar" :username="user.username"></user-avatar>
                                    <p>{{ reply.content.text }}</p>
                                </div>

                            </li>
                            <li v-else>should not be here</li>
                        </ul>
                        <div v-if="commentTree[index].length > replyCounts[index]" class="button-group right-aligned">
                            <button @click.prevent="expand(index)" class="button button-secondary button-secondary-naked">Show More</button>
                        </div>
                    </template>

                </div>
            </li>
        </ul>
    </div>
</template>

<script>

    import {mapState} from 'vuex'
    import GrowingTextarea from "./GrowingTextarea";
    import UserAvatar from "./UserAvatar";


    export default {
        name: "Comments",
        components: {
            GrowingTextarea,
            UserAvatar
        },
        data() {
            return {
                commentTree: [],
                replyCounts: [],
                replyFieldsShown: [],
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
                            'comments.id as comment_id',
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

                    console.log('comments loaded');
                    this.buildCommentTree();

                });
            },
            buildCommentTree() {
                this.commentTree = [];
                this.replyCounts = [];
                this.replyFieldsShown = [];
                var unfoundChildren = [];

                for( let i = this.comments.length-1; i >= 0; i-- ) {

                    console.log('comment check');

                    if( this.comments[i].parent === null ) {

                        console.log('has no parent');

                        this.commentTree.unshift( [ this.comments[i], [] ] );
                        this.replyCounts.unshift( 0 );
                        this.replyFieldsShown.unshift( false );

                    }
                    else {

                        console.log('has parent');
                        var parentFound = false;

                        for( let j = 0; j < this.commentTree.length; j++ ) {

                            if( this.comments[i].parent === this.commentTree[j][0].comment_id ) {
                                console.log('parent found');
                                parentFound = true;
                                this.commentTree[j][1].unshift( this.comments[i] );

                                if( this.replyCounts[j] < 1 ) {
                                    this.replyCounts[j] = 1;
                                }
                                break;
                            }
                        }

                        if( !parentFound ) {
                            console.log('parent not found');
                            unfoundChildren.push( this.comments[i] );
                        }
                    }
                }

                for( let i = unfoundChildren.length-1; i >= 0; i-- ) {
                    for( let j = 0; j < this.commentTree.length; j++ ) {

                        if( unfoundChildren[i].parent === this.commentTree[j][0].comment_id ) {
                            console.log('parent found');
                            this.commentTree[j][1].unshift( unfoundChildren[i] );

                            if( this.replyCounts[j] < 1 ) {
                                this.replyCounts[j] = 1;
                            }
                            break;
                        }
                    }
                }
                console.log('comment tree generated');
                console.log( this.commentTree[0][1] );
            },
            expand(index) {
                var replyCounts = this.replyCounts;
                this.replyCounts  = [];
                this.replyCounts = replyCounts;
                this.replyCounts[index] += 10;
                console.log( 'expand');
                console.log( this.replyCounts );
            },
            showReplyField(index) {
                var replyFieldsShown = this.replyFieldsShown;
                this.replyFieldsShown = [];
                this.replyFieldsShown = replyFieldsShown;
                this.replyFieldsShown[index] = true;
                console.log( 'showReplyField');
                console.log( this.replyFieldsShown );
            },
            newComment: function(parentId) {


                //console.log('new comment');

                let comment;
                if( !parentId ) {

                    this.opened = [];
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

                    this.loadComments();

                });
            }
        }
    }

</script>

<style lang="scss">

    @import '@/styles/theme.scss';
    @import '@/styles/shared/variables.scss';


    .comments {

        .comment {
            position: relative;
            padding-left: calc( 40px + #{$spacing-2} );

            .avatar {
                position: absolute;
                top: 0;
                left: 0;
            }
        }

        .form-field {
            display: block;

            margin-bottom: $spacing-2;
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

            .comment {
                padding-left: calc( 48px + #{$spacing-3} );
            }

            .comment-list {
                margin-top: $spacing-5;

                .subheading, p {
                    margin-bottom: $spacing-3;
                }
            }
        }

    }

</style>
