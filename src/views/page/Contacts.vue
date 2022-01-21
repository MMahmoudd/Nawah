<template>
    <div class="allData">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                             {{$t('completeAll.contacts')}}
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
                <filter-items @featchByFilter="featchByFilter"/>
            </div>
            <template v-if="dataLoading">
                <loading-data></loading-data>
            </template>
            <template v-else>
                <list @fetchAllItems="fetchAllItems" 
                    :data="allData" v-if="allData.length" />
                <template v-else>
                    <no-data :text="$t('fieldsPage.messages.noData')"/>
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
    import List from '../../components/pages/listContacts'
    import FilterItems from '../../components/pages/Filter'

    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const repository = RepositoryFactory.get('pages')

    export default {
        name: 'contacts',
        data() {
            return {
                allData: [],
                total: null,
                allItemChecked: 0,
                page: 1,
                limit: 12,
                order: 'is-centered',
                dataLoading: true,
                breadcrumb: [{
                    link: '',
                    label: this.$t('completeAll.contacts')
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
            }
        },
        methods: {
            // Fetch All Items
            async fetchAllItems(filters) {
                this.dataLoading = true
                const allData = await repository.getAllContacts(this.page, this.limit, filters)
                this.total = allData.count;
                this.allData = allData.rows;
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
