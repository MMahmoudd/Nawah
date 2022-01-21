<template>
    <div class="allData">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                             {{$t('completeAll.paymentMethoud')}}
                            <span class="badge--count" v-if="total">
                                ({{total}})
                            </span>
                        </h1>

                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />

                    </div>
                    <div class="page--title--action ml-auto">
                        <router-link :to="{ path: '/paymentForm'}"
                            class="button is-primary">{{$t('completeAll.addNewPayment')}}</router-link>
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
                    @checkButtonSelectAll="checkButtonSelectAll" :data="allData" v-if="allData.length" />
                <template v-else>
                    <no-data text="No Data Here"/>
                </template>
            </template>
            <template v-if="allData.length">
                <div class="pagination--custom--number">
                    <b-pagination :total="total" :current.sync="page" :order="order" :rounded="true" :per-page="limit">
                    </b-pagination>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import List from '../../components/paymentMethods/list'
    import FilterItems from '../../components/paymentMethods/Filter'

    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const repository = RepositoryFactory.get('shopping')

    export default {
        name: 'paymentMethods',
        data() {
            return {
                allData: [],
                total: null,
                allItemsSelected: false,
                allItemChecked: 0,
                page: 1,
                limit: 12,
                order: 'is-centered',
                dataLoading: true,
                breadcrumb: [{
                    link: '',
                    label: this.$t('completeAll.paymentMethoud')
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
                const allData = await repository.getAllItemsPayment(this.page, this.limit, filters)
                this.total = allData.PaymentMethouds.count;
                this.allData = allData.PaymentMethouds.rows;
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
