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

        <div class="button-group right-aligned  ">
            <button :disabled="this.commentTitle === '' || this.commentText === ''" class="button button-primary" @click="newComment()">Comment</button>
        </div>

        <ul class="list">
            <li v-for="comment in commentTree">
                <h3 class="subheading">{{ comment[0].content.title }}</h3>
                <p>{{ comment[0].content.text }}</p>
                <button v-if="comment[1].length > 0" class="button button-secondary">{{ comment[1].length }} Replies</button>
                <span v-else>No Replies</span>

                <div class="form-field">
                    <label>Reply</label>
                    <input type="text" v-model="replyText" />
                </div>
                <button class="button button-secondary" @click="newComment(comment[0].id)">Reply</button>

                <ul class="children">
                    <li v-for="child in comment[1]">
                        <p>{{ child.content.text }}</p>
                    </li>
                </ul>
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
            },
            commentText() {
            }
        },
        computed: {
            ...mapState({
                user: state => state.c3s.user.currentUser,
                comments: state => state.c3s.comments.comments,

                loading: state => state.c3s.settings.loading
            }),
            commentTree: function() {
                let tree = [];
                for( let i = this.comments.length-1; i >= 0; i-- ) {
                    if( this.comments[i].parent === null ) {
                        //console.log( 'no p' );
                        tree.unshift( [ this.comments[i], [] ] );
                        //console.log( 'tree length: '+ tree.length );
                    }
                    else {
                        //console.log( 'p: '+ this.comments[i].parent);

                        //console.log( 'tree length: '+ tree.length );
                        for( let j = 0; j < tree.length; j++ ) {
                            //console.log( 'check: ');
                            //console.log( tree[j][0].id );
                            if( tree[j][0].id ===  this.comments[i].parent ) {
                                //console.log('found in '+ tree[j][0] )
                                tree[j][1].unshift( this.comments[i] );
                                break;
                            }
                        }
                    }
                }
                return tree;
            }
        },
        mounted: function() {
            console.log('comments mounted > load comments');
            this.loadComments();
        },
        methods: {
            loadComments: function() {
                //console.log('load comments');
                //console.log(this.sourceId);
                this.$store.dispatch('c3s/comments/getCommentsForID', [this.sourceId, 'c3s/comments/SET_COMMENTS', 0] ).then(comments => {

                    console.log('comments loaded');

                });
            },
            newComment: function(parentId) {


                console.log('new comment');

                let comment;
                if( !parentId ) {

                    console.log('no parent');

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
                            title: this.commentTitle,
                            text: this.commentText
                        }
                    };
                }



                this.$store.dispatch('c3s/comments/createComment', comment).then(res => {

                    this.commentTitle = '';
                    this.commentText = '';

                    console.log('comment created > load comments');
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
        .form-field {
            display: block;

            margin-bottom: $spacing-3;
        }
        .list {
            margin-top: $spacing-4;
        }
    }

</style>
