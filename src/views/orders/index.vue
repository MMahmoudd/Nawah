<template>
    <div class="orders">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                             {{$t('completeAll.orders')}}
                            <span class="badge--count" v-if="total">
                                ({{total}})
                            </span>
                        </h1>

                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />

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
                <list @fetchAllItems="fetchAllItems" :data="orders" :delivery="delivery" v-if="orders.length" />
                <div @fetchAllstatus="fetchAllstatus" :delivery="delivery" v-if="delivery.length" ></div>
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
    import List from '../../components/orders/list'
    import FilterItems from '../../components/orders/Filter'

    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const repository = RepositoryFactory.get('orders')

    export default {
        name: 'orders',
        data() {
            return {
                orders: [],
                delivery: [],
                total: null,
                allItemsSelected: false,
                allItemChecked: 0,
                page: 1,
                limit: 12,
                order: 'is-centered',
                dataLoading: true,
                breadcrumb: [{
                    link: '',
                    label: this.$t('completeAll.orders')
                }]
            };
        },
        components: {
            List,
            FilterItems,
        },
        created() {
            this.fetchAllItems().then(res => {
            this.fetchAllstatus()
            })
        },
        watch: {
            page() {
                this.fetchAllItems()
                this.fetchAllstatus()
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
                const orders = await repository.getAllItems(this.page, this.limit, filters, this.$route.params.id)
                this.orders = orders.Orders.rows;
                this.total = orders.Orders.count;
                this.dataLoading = false;
            },
            async fetchAllstatus(filters) {
                this.dataLoading = true
                const delivery = await repository.getAllStatus()
                this.delivery = delivery.DeliveryOptions.rows
                this.orders = this.orders.map(order => {
                    return {...order, delivery_id : delivery.DeliveryOptions.rows.find(x => x.id === order.delivery_id)}
                })
                console.log('delivery', this.delivery)
                console.log('orders', this.orders)

                this.dataLoading = false;
            },
            // Filters
            featchByFilter(filters) {
                this.page = 1
                this.fetchAllItems(filters)
                this.fetchAllstatus(filters)
            }

        }
    }
</script>
