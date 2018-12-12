<template>
    <div class="search-select">
        <input type="text" ref="answer"
               :placeholder="placeholder"
               v-model="value"
               v-on:keyup="handleInputKeys" />
        <ul class="results" v-if="filteredSearchResults.length > 0 && !selection">
            <li v-for="(filteredSearchResult, index) in filteredSearchResults"
                :class="{'focused':index==focusedOptionIndex}"
                :ref="'option_'+index"
                @click="focusedOptionIndex = index; selectOptionByHand()">
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
                selection: '',
                info: '',
                value: ''
            }
        },
        props: {
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
                this.$emit('input', this.value);
            },
            selection: function() {
                this.$emit('responseText', this.selection);
            },
            value: function() {
                if( this.selection ) {
                    if( this.value != this.selection ) {
                        this.selection = '';
                    }
                }
            }
        },
        computed: {
            filteredSearchResults: function() {
                if( this.value ) {
                    this.focusedOptionIndex = 0;
                    return this.options.filter(option => option.name.toUpperCase().includes( this.value.toUpperCase() )  );
                }
                else {
                    return {};
                }
            }
        },
        methods: {
            selectOptionByHand: function() {
                this.$refs['answer'].focus();
                this.value = this.filteredSearchResults[this.focusedOptionIndex].name;
                this.selection = this.value;
                this.$emit("focusSubmit");
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
                        if( this.focusedOptionIndex > 0 ) {
                            this.focusedOptionIndex--;
                            this.$refs['option_'+this.focusedOptionIndex][0].scrollIntoView({block: "end"});
                        }
                        break;
                    case 'Enter':
                        if( this.filteredSearchResults.length > 0 ) {
                            this.value = this.filteredSearchResults[this.focusedOptionIndex].name;
                            this.selection = this.value;
                        }
                        else {
                            this.value = '';
                            this.selection = '';
                        }
                        break;
                }
                this.$refs['answer'].setSelectionRange(this.value.length,this.value.length);
            }
        }
    }
</script>

<style lang="scss">

    .search-select {
        position: relative;

        .results {
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
