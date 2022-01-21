<template>
    <div class="filter--items">
        <div class="row">
            <div class="col-12 col-lg-6">
                <div class="filter--items--left">
                    <div class="input--fuild">
                        <div class="search">
                            <a @click="fetchFile()" type="button" class="button is-info" download>Export</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6">
                <div class="filter--items--right">
                    <div class="input--fuild">
                    <v-select :clearable="true" :options="['order_placed', 'payment_success', 'payment_failed']" v-model="status" label="name"
                            placeholder="Filter by status"
                            class="select--with--icon w-100 v--select--scroll w-fuild-md">
                            <template slot="option" slot-scope="option">
                                {{ option.name }}
                            </template>
                        </v-select>
                    </div>
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
    // Repository Data
    import { RepositoryFactory } from "../../../repositories/RepositoryFactory";
    const repoetsRepository = RepositoryFactory.get('reports')
    let download = require("downloadjs");
    export default {
        props:['allItemChecked'],
        data() {
            return {
                group: '',
                groups: ['All', 'admin', 'editor', 'users'],
                checkItem: false,
                status: null,
                searchQuery: '',
                filters: {}
            }
        },
        watch:{
            allItemChecked(){
                if(this.allItemChecked == 0){
                    this.checkItem= false
                }
            },
            searchQuery(){
                
                this.filters.searchQuery = this.searchQuery
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    this.$emit('featchByFilter', this.filters)
                }, 500);
            },
            status(){
                this.filters.status = this.status ? this.status : ''
                this.$emit('featchByFilter', this.filters)
            },
        },
        methods: {
            async fetchFile() {
                const orders = await repoetsRepository.getOrdersFile(this.page, this.limit, this.filters)
                window.open(orders.download_url)
            },
            selectAllItems() {
                this.checkItem = !this.checkItem
                this.$emit('selectAllItems', this.checkItem)
            },
            goBack(){
                window.history.back()
            }
        }
    }

</script>


