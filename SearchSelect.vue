<template>
    <div class="search-select">

        <div class="custom-input">
            <input type="text" ref="answer"
                :placeholder="placeholder"
                v-model="inputValue"
                v-on:keyup.prevent="handleInputKeys"
                @click.prevent="!showResults ? showResults = true : showResults = false"
                @blur="inputBlur"/>
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <path d="M127.3,192h257.3c17.8,0,26.7,21.5,14.1,34.1L270.1,354.8c-7.8,7.8-20.5,7.8-28.3,0L113.2,226.1 C100.6,213.5,109.5,192,127.3,192z"/>
            </svg>
        </div>
        <ul class="results" v-if="showResults" @click="clickOnResults">
            <template v-for="filteredOptionContainer in filteredOptionContainers">
                <li class="label" v-if="filteredOptionContainer.options.length > 0 && filteredOptionContainer.showLabel">
                    <b>{{filteredOptionContainer.label}}</b>
                </li>
                <li v-for="option in filteredOptionContainer.options"
                    :ref="'option_'+option.id"
                    @click="focusedOptionIndex = option.id; selectOptionByClick()"
                    :class="{ 'focused' : focusedOptionIndex === option.id }"
                    :value="option.value"
                    :info="option.info">
                    {{ option.value }}
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "SearchSelect",
        data() {
            return {
                focusedOptionIndex: 0,
                maxOptionIndex: 0,
                inputValue: '',
                showResults: false
            }
        },
        props: {
            value: {
                type: Object,
                default: function () { return null }
            },
            placeholder: {
                type: String,
                default: ''
            },
            optionContainers: {
                type: Array,
                default: function () { return [] }
            }
        },
        watch: {
            value: function() {
                if( this.value ) {
                    this.showResults = false;
                }
                else {
                    this.$refs.answer.focus();
                    this.inputValue = '';
                }
            },
            inputValue: function(to, from) {
                if( this.inputValue !== '' ) {
                    if( this.value ) {
                        if( this.inputValue !== this.value.value ) {
                            this.showResults = true;
                        }
                        else {
                            this.showResults = false;
                        }
                    }
                    else {
                        this.showResults = true;
                    }
                }
                else {
                    this.showResults = false;
                }
            }
        },
        computed: {
            filteredOptionContainers: function() {

                if( this.optionContainers.length > 0 ) {

                    let filteredOptionContainers = [];
                    let id = 0;

                    for( let i = 0; i < this.optionContainers.length; i++ ) {
                        let options = this.optionContainers[i].options.filter( option => option.value.toUpperCase().includes( this.inputValue.toUpperCase() ) );

                        for( let j = 0; j < options.length; j++ ) {
                            options[j].id = id;
                            id++;
                        }

                        let filteredOptionContainer = { 'label': this.optionContainers[i].label, 'showLabel': this.optionContainers[i].showLabel, 'options': options };
                        filteredOptionContainers.push( filteredOptionContainer );
                    }

                    this.focusedOptionIndex = 0;
                    this.maxOptionIndex = id-1;

                    return filteredOptionContainers;
                }
                else {
                    return {}
                }
            }
        },
        methods: {
            inputBlur: function() {
                console.log( 'blur: hide resultes delayed');
                const self = this;
                setTimeout(function(){
                    self.showResults = false;
                }, 500);
            },
            clickOnResults: function() {
                this.$refs.answer.focus();
                console.log('click on results');
            },
            selectOptionByClick: function() {
                console.log("click on it");
                this.inputValue = this.$refs['option_'+this.focusedOptionIndex][0].getAttribute('value');
                let returnObject = {
                    'value': this.$refs['option_'+this.focusedOptionIndex][0].getAttribute('value'),
                    'info': this.$refs['option_'+this.focusedOptionIndex][0].getAttribute('info')
                };
                this.$emit('input', returnObject );
            },
            handleInputKeys: function(event) {
                switch(event.key){
                    case 'ArrowDown':
                        if( this.focusedOptionIndex < this.maxOptionIndex ) {
                            this.focusedOptionIndex++;
                            this.$refs['option_'+this.focusedOptionIndex][0].scrollIntoView({block: "end"});
                        }
                        break;
                    case 'ArrowUp':
                        this.$refs.answer.setSelectionRange(this.inputValue.length,this.inputValue.length);
                        if( this.focusedOptionIndex > 0 ) {
                            this.focusedOptionIndex--;
                            this.$refs['option_'+this.focusedOptionIndex][0].scrollIntoView({block: "end"});
                        }
                        break;
                    case 'Enter':
                        if( this.$refs['option_'+this.focusedOptionIndex][0] ) {
                            this.inputValue = this.$refs['option_'+this.focusedOptionIndex][0].getAttribute('value');
                            let returnObject = {
                              'value': this.$refs['option_'+this.focusedOptionIndex][0].getAttribute('value'),
                              'info': this.$refs['option_'+this.focusedOptionIndex][0].getAttribute('info')
                            };
                            this.$emit('input', returnObject );
                        }
                        break;
                }
            }
        },
        mounted: function() {
            this.$refs.answer.focus();
        }
    }
</script>

<style lang="scss">


    @import '@/styles/theme.scss';
    @import '@/styles/shared/variables.scss';

    .search-select {
        position: relative;

        .custom-input {
            svg {
                position: absolute;
                top: 13px;
                right: 10px;
                height: 12px;
                fill: $color-black;
                pointer-events: none;
            }
        }

        .results {
            z-index: 1;
            position: absolute;
            top: 48px;
            left: 0;
            width: 100%;
            background: red;
            max-height: calc( 40px*6 );
            overflow: hidden;
            overflow-y: scroll;

            li {
                margin: 0;
                padding: 0;
                line-height: 40px;
                &:before {
                    display: none;
                }

                &.focused {
                    background: blue;
                }

                cursor: pointer;
            }
        }
    }



    @media only screen and (min-width: $viewport-tablet-portrait) {

        .search-select {

            .custom-input {
                svg {
                    top: 17px;
                }
            }

        }

    }

</style>
