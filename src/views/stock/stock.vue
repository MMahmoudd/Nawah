<template>
    <div class="stocks">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            <!-- {{$t('completeAll.admins')}}  -->
                            Stock 
                            <span class="badge--count" v-if="total">
                                ({{total}})
                            </span>
                        </h1>
                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />
                    </div>
                    <div class="filter--items--right">
                    
                        <div class="input--fuild">
                            <div class="search">
                                <router-link to="/stockForm" type="button" class="button is-info">Add New</router-link>
                            </div>
                        </div>

                    </div>                   
                </div>
            </div>
        </div>

        <div class="wrap--content">
            <div class="card-filter--herader">
                <!-- <filter-items
                @featchByFilter="featchByFilter"
                @selectAllItems="selectAllItems"
                :allItemChecked="allItemChecked" /> -->
            </div>

            <template v-if="dataLoading">
                <loading-data></loading-data>
            </template>

            <template v-else>
                    <div v-if="stocks.length">
        <div class="block--item" v-for="item in stocks" :key="item.id">
        <div class="row align-items-center">
            <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="block--item--title d-flex align-items-center item--text">
                        <div class="text--title">
                            {{item.id}}
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="block--item--title d-flex align-items-center item--text">
                        <div class="text--title">
                            <p v-bind:item="'item.title'">{{item.title}}</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="item--text">
                        <span class="icon">
                        <i class="fas fa-arrows-alt-v"></i>
                    </span>
                        <p v-bind:item="'item.column_number'">{{item.column_number}}</p>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-xl table--item">
                <div class="item--text">
                    <span class="icon">
                        <i class="fas fa-arrows-alt-h"></i>
                    </span>
                    <p v-bind:item="'item.row_number'">{{item.row_number}}</p>
                </div>
            </div>

                <div class="col-12 col-sm-12 col-xl item--text table--item">
                    <div class="all--item--action d-flex align-item-center">
                        <div class="all--item--action d-flex align-item-center">
                            <router-link :to="'/stockDataSlider/' + item.id"  class="button--circle is-success-light"><i class="fas fa-eye"></i></router-link>
                            <router-link :to="'/stockForm/' + item.id"  class="button--circle is-primary-light"><i class="fas fa-pen"></i></router-link>
                            <button class="button--circle is-danger-light" @click="deleteItem(item.id)"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    </div>
                <template v-else>
                    <!-- <no-data :text="$t('usersPage.messages.noData')"/> -->
                    <no-data text="No Stocks have been created" />
                </template>
            </template>

            <template v-if="stocks">
                <div class="pagination--custom--number" v-if="total">
                    <b-pagination :total="total" :current.sync="page" :order="order" :rounded="true" :per-page="limit">
                    </b-pagination>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const repository = RepositoryFactory.get('stocks')


    export default {
        name: 'stocks',
        data() {
            return {
                stocks: [],
                total: null,
                page: 1,
                limit: 20,
                order: 'is-centered',
                dataLoading: true,
                filters: {},
                breadcrumb: [{
                    link: '',
                    label: "Stock"
                }]
            };
        },
        created() {
            this.fetchAllItems()
        },
        watch: {
            page() {
                if (this.page) {
                    this.fetchAllItems()
                }
            }
        },
        methods: {
            // Filters
            featchByFilter(filters) {
                this.fetchAllItems(filters)
            },
            deleteItem(id) {
                this.confirmCustomDelete(id)
            },
            confirmCustomDelete(ids) {
            this.$dialog.confirm({
                title: "Deleting Stock",
                message: "Are you sure you want to delete This Stock? This action cannot be undone.",
                confirmText: "Confirm",
                cancelText: "Cancel",
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => this.deleteStock(ids)
            })
        },
        async deleteStock(id) {
            const stock = await repository.deleteStock(id)
            this.fetchAllItems()
            // this.aleartMessage(stock.message)
        },

            // Fetch All Items
            async fetchAllItems(filters) {
                this.dataLoading = true
                const data = await repository.getAllItems()
                this.total = data.Stocks.count
                this.stocks = data.Stocks.rows
                this.dataLoading = false;
            },


        }
    }
</script>
<style lang="scss">
.admins{
    .item--checkbox{
        display: none;
    }
}
    
</style>
