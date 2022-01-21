<template>
    <div class="users admins">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('completeAll.admins')}}
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
                                <router-link to="/add-new-user" type="button" class="button is-info">Add New</router-link>
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
                    <div v-if="users.length">
        <div class="block--item" v-for="item in users" :key="item.id">
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
                            <p v-bind:item="'item.name'">{{item.name}}</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="item--text">
                        <p v-bind:item="'item.email'">{{item.email}}</p>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-xl table--item">
                <div class="item--text">
                    <span class="icon">
                        <i class="fas fa-phone"></i>
                    </span>
                    <p v-bind:item="'item.phone'">{{item.phone}}</p>
                </div>
            </div>

                <div class="col-12 col-sm-12 col-xl item--text table--item">
                    <div class="all--item--action d-flex align-item-center">
                        <div class="all--item--action d-flex align-item-center">
                            <router-link :to="'/adminForm/' + item.id"  class="button--circle is-primary-light"><i class="fas fa-pen"></i></router-link>
                            <button class="button--circle is-danger-light" @click="deleteItem(item.id)"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    </div>
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
    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const repository = RepositoryFactory.get('users')


    export default {
        name: 'users',
        data() {
            return {
                users: [],
                total: null,
                page: 1,
                limit: 20,
                order: 'is-centered',
                dataLoading: true,
                filters: {},
                userType: 'admin',
                breadcrumb: [{
                    link: '',
                    label: this.$t('completeAll.admins')
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
                title: this.$t('groupsPage.messages.deleteGroups.title'),
                message: this.$t('groupsPage.messages.deleteGroups.message'),
                confirmText: this.$t('groupsPage.messages.deleteGroups.confirmText'),
                cancelText: this.$t('groupsPage.messages.deleteGroups.cancelText'),
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => this.deleteGroups(ids)
            })
        },
        async deleteGroups(id) {
            const groups = await repository.deleteGroup(id)
            this.fetchAllItems()
            // this.aleartMessage(groups.message)
        },

            // Fetch All Items
            async fetchAllItems(filters) {
                this.dataLoading = true
                const data = await repository.getAllAdmins(this.page, this.limit, filters, this.userType)
                this.total = data.Users.count
                console.log('admins', data)
                this.users = data.Users.rows
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
