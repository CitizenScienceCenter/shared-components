<template>
    <div class="search-select">
        <input type="text" ref="answer"
               :placeholder="placeholder"
               v-model="inputValue"
               v-on:keyup="handleInputKeys" />
        <ul class="results" v-if="filteredSearchResults.length > 0 && inputValue != value">
            <li v-for="(filteredSearchResult, index) in filteredSearchResults"
                :class="{'focused':index==focusedOptionIndex}"
                :ref="'option_'+index"
                @click="focusedOptionIndex = index; selectOptionByClick()">
                {{ filteredSearchResult.name }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "SearchSelect",
        data() {
            return {
                focusedOptionIndex: undefined,
                inputValue: ''
            }
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            options: {
                type: Array,
                default: function () { return [] }
            }
        },
        watch: {
            value: function() {
                console.log( 'ss watch value');
                this.inputValue = this.value;
                if( this.inputValue === '' ) {
                    console.log("ss resetted")
                    this.$refs.answer.focus();
                }
                else {
                    console.log("ss entered")
                    this.$emit('entered');
                }
            }
        },
        computed: {
            filteredSearchResults: function() {
                if( this.inputValue ) {
                    this.focusedOptionIndex = 0;
                    return this.options.filter(option => option.name.toUpperCase().includes( this.inputValue.toUpperCase() )  );
                }
                else {
                    return {};
                }
            }
        },
        methods: {
            selectOptionByClick: function() {
                this.$refs['answer'].focus();
                this.inputValue = this.filteredSearchResults[this.focusedOptionIndex].name;
            },
            handleInputKeys: function(event) {
                switch(event.key){
                    case 'ArrowDown':
                        if( this.focusedOptionIndex < this.filteredSearchResults.length-1 ) {
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
                        if( this.filteredSearchResults.length > 0 ) {
                            this.inputValue = this.filteredSearchResults[this.focusedOptionIndex].name;
                            this.$emit('input', this.inputValue);
                            console.log('ss inputValue emit = ' + this.inputValue);
                        }
                        else {
                            this.inputValue = '';
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

    .search-select {
        position: relative;

        .results {
            z-index: 1;
            position: absolute;
            width: 100%;
            background: red;
            padding: 8px;
            max-height: calc( 48px*3 );
            overflow: hidden;
            overflow-y: scroll;

            li {
                margin: 0;
                padding: 0;
                line-height: 50px;
                &:before {
                    display: none;
                }

                &.focused {
                    background: blue;
                }
            }
        }
    }


</style>
