<template>
    <div class="fields">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('completeAll.vouchers')}}
                            <span class="badge--count" v-if="total">
                                ({{total}})
                            </span>
                        </h1>

                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />

                    </div>
                    <div class="page--title--action ml-auto">
                        <router-link :to="{ path: '/voucherForm'}"
                            class="button is-primary">{{$t('completeAll.addNewVoucher')}}</router-link>
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
                    @checkButtonSelectAll="checkButtonSelectAll" :data="vouchers" v-if="vouchers.length" />
                <template v-else>
                    <no-data :text="$t('fieldsPage.messages.noData')"/>
                </template>
            </template>
            <template v-if="vouchers.length">
                <div class="pagination--custom--number">
                    <b-pagination :total="total" :current.sync="page" :order="order" :rounded="true" :per-page="limit">
                    </b-pagination>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import List from '../../components/vouchers/list'
    import FilterItems from '../../components/vouchers/Filter'

    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const vouchersRepository = RepositoryFactory.get('vouchers')

    export default {
        name: 'vouchers',
        data() {
            return {
                vouchers: [],
                total: null,
                allItemsSelected: false,
                allItemChecked: 0,
                page: 1,
                limit: 12,
                order: 'is-centered',
                dataLoading: true,
                breadcrumb: [{
                    link: '',
                    label: this.$t('completeAll.vouchers')
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
            '$route'() {
                this.fetchAllItems()
            }
        },
        methods: {
            selectAllItems(checkButton) {
                if (checkButton) {
                    this.allItemsSelected = true
                } else {
                    this.allItemsSelected = false
                }
                // this.allItemsSelected =! this.allItemsSelected
            },
            // Check Button Select All Active Or Not
            checkButtonSelectAll(data) {
                this.allItemChecked = data
            },

            // Fetch All Items
            async fetchAllItems(filters) {
                this.dataLoading = true
                const Vouchers = await vouchersRepository.getAllVouchers(this.page, this.limit, filters)
                this.total = Vouchers.count;
                this.vouchers = Vouchers.rows;
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
