<template>
    <div class="filter--items">
        <div class="row">
            <div class="col-12 col-lg-6">
                <div class="filter--items--right">
                    <div class="input--fuild">
                        <div class="search icon--right">
                            <b-input :placeholder="$t('search') + '...'" type="search" icon-pack="fa" icon="search" v-model="searchQuery">
                            </b-input>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchQuery: '',
                filters: {}
            }
        },
        watch:{
            searchQuery(){
                
                this.filters.searchQuery = this.searchQuery
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    this.$emit('featchByFilter', this.filters)
                }, 500);
            }
        },
        methods: {
            goBack(){
                window.history.back()
            }
        }
    }

</script>