<template>
    <div class="orders">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                             {{$t('completeAll.ordersRepoerts')}}
                            <span class="badge--count" v-if="total">
                                ({{total}})
                            </span>
                        </h1>

                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />
                        <div>
                        <h1>
                             total discount
                            <span class="badge--count">
                                {{SumOrders.total_discount}}
                            </span>
                        </h1>
                        <h1>
                             total product
                            <span class="badge--count">
                                {{SumOrders.total_product}}
                            </span>
                        </h1>
                        <h1>
                             total shipping
                            <span class="badge--count">
                                {{SumOrders.total_shipping}}
                            </span>
                        </h1>
                        <h1>
                             total taxs
                            <span class="badge--count">
                                {{SumOrders.total_taxs}}
                            </span>
                        </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="wrap--content">
            <div class="card-filter--herader">
                <filter-items @selectAllItems="selectAllItems" @featchByFilter="featchByFilter"
                    :allItemChecked="allItemChecked" />
            </div>
            <template v-if="dataLoading">
                <loading-data></loading-data>
            </template>
            <template v-else>
                <list @fetchAllItems="fetchAllItems" :allItemsSelected="allItemsSelected"
                    @checkButtonSelectAll="checkButtonSelectAll" :data="orders" v-if="orders.length" />
                <template v-else>
                    <no-data text="no data here"/>
                </template>
            </template>
            <template v-if="orders.length">
                <div class="pagination--custom--number">
                    <b-pagination :total="total" :current.sync="page" :order="order" :rounded="true" :per-page="limit">
                    </b-pagination>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import List from '../../components/reports/orders/list'
    import FilterItems from '../../components/reports/orders/Filter'

    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const repository = RepositoryFactory.get('reports')

    export default {
        name: 'orders',
        data() {
            return {
                orders: [],
                SumOrders: {},
                total: null,
                allItemsSelected: false,
                allItemChecked: 0,
                page: 1,
                limit: 12,
                order: 'is-centered',
                dataLoading: true,
                breadcrumb: [{
                    link: '',
                    label: this.$t('completeAll.ordersRepoerts')
                }]
            };
        },
        components: {
            List,
            FilterItems,
        },
        created() {
            this.fetchAllItems()
        },
        watch: {
            page() {
                this.fetchAllItems()
            },
            
        },
        methods: {
            selectAllItems(checkButton) {
                if (checkButton) {
                    this.allItemsSelected = true
                } else {
                    this.allItemsSelected = false
                }
            },
            // Check Button Select All Active Or Not
            checkButtonSelectAll(data) {
                this.allItemChecked = data
            },

            // Fetch All Items
            async fetchAllItems(filters) {
                this.dataLoading = true
                const orders = await repository.getAllOrders(this.page, this.limit, filters, this.$route.params.id)
                this.orders = orders.Orders.rows;
                this.SumOrders = orders.SumOrders
                this.total = orders.Orders.count;
                this.dataLoading = false;
            },
            // Filters
            featchByFilter(filters) {
                this.page = 1
                this.fetchAllItems(filters)
            }

        }
    }
</script>
