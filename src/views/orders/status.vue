<template>
    <div class="users admins">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('completeAll.status')}}
                            <span class="badge--count" v-if="total">
                                ({{total}})
                            </span>
                        </h1>
                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />
                    </div>
                    <div class="page--title--action ml-auto">
                        <router-link :to="{ path: '/statusForm'}"
                            class="button is-primary">{{$t('completeAll.addStatus')}}</router-link>
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

                <div class="col-12 col-sm-12 col-xl item--text table--item">
                    <div class="all--item--action d-flex align-item-center">
                        <div class="all--item--action d-flex align-item-center">
                            <router-link :to="'/statusForm/' + item.id"  class="button--circle is-primary-light"><i class="fas fa-pen"></i></router-link>
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
    const repository = RepositoryFactory.get('orders')


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
                    label: this.$t('completeAll.status')
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
                title: 'Deleting Status',
                message: 'Are you sure you want to delete this Status? This action cannot be undone.',
                confirmText: 'Delete',
                cancelText: 'Cancel',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => this.deleteStatus(ids)
            })
        },
        async deleteStatus(id) {
            const groups = await repository.deleteStatus(id)
            this.fetchAllItems()
            // this.aleartMessage(groups.message)
        },

            // Fetch All Items
            async fetchAllItems(filters) {
                this.dataLoading = true
                const data = await repository.getAllStatus(this.page, this.limit, filters, this.userType)
                console.log(data)
                this.total = data.DeliveryOptions.count
                this.users = data.DeliveryOptions.rows
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
