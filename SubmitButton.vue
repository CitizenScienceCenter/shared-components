<template>
    <button class="button button-primary submit-button" :disabled="disabled" @click="submit" :class="{showInfoMessage: submissionInfo}" ref="submitButton">
        <span><slot></slot></span>
        <div class="button-group">
            <div class="info button button-primary button-icon" ref="info">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
                {{infoMessage}}
            </div>
        </div>
    </button>
</template>

<script>

    import {mapState} from 'vuex'

    export default {
        name: "SubmitButton",
        data() {
            return {
                buttonWidth: undefined
            }
        },
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            submissionInfo: {
                type: Boolean,
                default: false
            },
            infoMessage: {
                type: String,
                default: 'Thank you very much!'
            }
        },
        computed: {
            ...mapState({
                language: state => state.settings.language
            })
        },
        watch: {
            submissionInfo( to, from ) {
                if( to ) {
                    this.$refs.submitButton.style.width = this.$refs.info.clientWidth+'px';
                }
                else {
                    this.$refs.submitButton.style.width = this.buttonWidth+'px';
                }
            },
            language() {
                let self = this;
                setTimeout( function() {
                    self.setButtonWidth();
                }, 10 );
            }
        },
        mounted() {
            let self = this;
            window.addEventListener('resize', function() {
                self.setButtonWidth();
            } );
            this.setButtonWidth();
        },
        methods: {
            setButtonWidth() {
                if( this.$refs.submitButton && !this.submissionInfo ) {
                    this.$refs.submitButton.style.width = 'auto';
                    this.buttonWidth = this.$refs.submitButton.clientWidth;
                    this.$refs.submitButton.style.width = this.buttonWidth+'px';
                }
            },
            submit() {
                this.$emit('click');
            },
            focus(){
                this.$refs.submitButton.focus();
            }
        },
    }
</script>

<style lang="scss">

    @import '@/styles/theme.scss';
    @import '@/styles/shared/variables.scss';

    .button-primary.submit-button {
        position: relative;
        overflow: hidden;

        transition: all $transition-duration-short $transition-timing-function;

        .button-group {
            margin: 0;
            height: 100%;

            position: absolute;
            top: 0;
            right: 0;

            opacity: 0;

            .button {
                margin: 0;
            }

            .info {
                height: 100%;
                line-height: 40px;
            }
        }


        &.showInfoMessage {

            background-color: $color-success;
            &:active, &:focus {
                background-color: $color-success;
            }

            span {
                opacity: 0;
            }

            &:disabled {
                pointer-events: none;
                opacity: 1;
            }

            .button-group {

                opacity: 1;

                .button {
                    background-color: transparent;
                }

            }
        }
    }


    @media only screen and (min-width: $viewport-tablet-portrait) {


        .button-primary.submit-button {
            .button-group {
                .info {
                    line-height: 48px;
                }
            }
        }


    }

</style>
