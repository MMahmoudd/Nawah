<template>
    <div class="users">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            <!-- {{$t('users')}} -->
                            {{$t('completeAll.usersReports')}}
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
                <filter-items
                @featchByFilter="featchByFilter"
                @selectAllItems="selectAllItems"
                :allItemChecked="allItemChecked" />
            </div>

            <template v-if="dataLoading">
                <loading-data></loading-data>
            </template>

            <template v-else>
                <list-users
                @fetchAllItems="fetchAllItems"
                @checkButtonSelectAll="checkButtonSelectAll"
                :allUserSelected="allUserSelected"
                v-if="users.length"
                    :data="users" />
                <template v-else>
                    <no-data :text="$t('usersPage.messages.noData')"/>
                </template>
            </template>

            <template v-if="users">
                <div class="pagination--custom--number" v-if="total">
                    <b-pagination :total="total" :current.sync="page" :order="order" :rounded="true" :per-page="limit">
                    </b-pagination>
                </div>
            </template>
        </div>

    </div>
</template>

<script>
    import ListUsers from '../../components/reports/users/list'
    import FilterItems from '../../components/reports/users/Filter'

    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const repository = RepositoryFactory.get('reports')


    export default {
        name: 'users',
        data() {
            return {
                users: [],
                total: null,
                allUserSelected: false,
                page: 1,
                limit: 20,
                order: 'is-centered',
                dataLoading: true,
                allItemChecked: 0,
                filters: {},
                userType: 'user',
                breadcrumb: [{
                    link: '',
                    label: this.$t('completeAll.usersReports')
                }]
            };
        },
        components: {
            ListUsers,
            FilterItems,
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
            selectAllItems() {
                this.allUserSelected = !this.allUserSelected
            },
            // Filters
            featchByFilter(filters) {
                this.fetchAllItems(filters)
            },
            // Check Button Select All Active Or Not
            checkButtonSelectAll(data) {
                this.allItemChecked = data
            },

            // Fetch All Items
            async fetchAllItems(filters) {
                this.dataLoading = true
                const data = await repository.getAllUsers(this.page, this.limit, filters, this.userType)
                console.log(data)
                this.total = data.Users.count
                this.users = data.Users.rows
                this.dataLoading = false;
            },


        }
    }
</script>
