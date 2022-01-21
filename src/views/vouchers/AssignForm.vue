<template>
    <div class="aboutUs">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            Vouchers
                        </h1>
                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />

                    </div>
                </div>
            </div>
        </div>

        <div class="wrap--content">
            <div class="card--block">
                <div class="card--content">
                    <form class="row mt-3 justify-content-center" @submit.prevent="submitForm()">
                        <div class="col-12 col-md-10 col-lg-6">
                            <div class="row">
                                <!-- <div class="col-12 mt-2">
                                    <b-field class="field-group">
                                        <b-input type="text" v-model="data.arTitle" disabled> </b-input>
                                    </b-field>
                                </div> -->
                                <div class="col-12" v-if="data.type === 'custom' || data.type === 'user_custom'">
                                     <!-- <b-field class="field-group flex-column">
                                        <v-select
                                            :clearable="false"
                                            :options="['general', 'custom', 'user_general', 'user_custom']"
                                            v-model="data.type"
                                            label="name"
                                            placeholder="Type"
                                            class="select--with--icon w-100 v--select--scroll">
                                            <template slot="option" slot-scope="option">{{ option.name }}</template>
                                        </v-select>
                                     </b-field> -->
                                     <b-field class="field-group flex-column">
                                        <v-select
                                            :options="categories"
                                            v-model="categoriesInput"
                                            label="name"
                                            multiple
                                            placeholder="Category"
                                            class="select--with--icon w-100 v--select--scroll">
                                            <template slot="option" slot-scope="option">{{ option.name }}</template>
                                        </v-select>
                                     </b-field>
                                </div>
                                <div class="col-12" v-if="data.type === 'custom' || data.type === 'user_custom'">
                                    <b-field class="field-group flex-column mb-0">
                                        <label class="label">All Products</label>
                                        <b-taginput
                                        v-model="productsInput"
                                        :data="filteredProducts"
                                        autocomplete
                                        :allow-new="false"
                                        :open-on-focus="true"
                                        field="name"
                                        icon-pack="fa"
                                        icon="shopping-basket"
                                        placeholder="All Products"
                                        :loading="productsFilterLoading"
                                        @typing="getFilteredProducts"
                                        ></b-taginput>
                                    </b-field>
                                </div>
                                <div class="col-12" v-if="data.type === 'user_general' || data.type === 'user_custom'">
                                    <b-field class="field-group flex-column mt-4">
                                        <v-select
                                            :options="users"
                                            v-model="usersInput"
                                            label="name"
                                            multiple
                                            placeholder="Users"
                                            class="select--with--icon w-100 v--select--scroll">
                                            <template slot="option" slot-scope="option">{{ option.name }}</template>
                                        </v-select>
                                     </b-field>
                                </div>
                            </div>                                                        
                        </div>

                        <div class="col-12 text-center button--save--form">
                            <button class="button is-primary"
                                :class="{'is-loading': isLoading}">{{$t('saveChanges')}}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'

    const repository = RepositoryFactory.get('vouchers')
    const categoriesRepository = RepositoryFactory.get("categories");
    const productsRepository = RepositoryFactory.get('products')
    const repositoryUsers = RepositoryFactory.get('users')
    export default {
        name: 'assignForm',
        data() {
            return {
                isLoading: false,
                categoriesInput: null,
                productsInput: null,
                usersInput: null,
                data:{
                    arTitle: '',
                    enTitle: '',
                    type: null,
                },
                
                breadcrumb: [{
                    link: '/vouchers',
                    label: 'vouchers'
                }, {
                    link: '',
                    label: 'Add & Update Voucher'
                }],
                filteredProducts: [],
                productsFilterLoading: false,
                page: 1,
                limit: 10,
                categories: [],
                products: [],
                users: [],
            };
        },
        created() {
            this.getContent(this.$route.params.id)
        },
        
        methods: {
            submitForm() {

                if(this.data.type === 'user_general' || this.data.type === 'user_custom'){
                    let usersIds = []
                    this.usersInput.map(item => {
                        usersIds.push(item.id)
                    })
                    this.setVoucherUsers({users: usersIds})
                }

                if(this.data.type === 'custom' || this.data.type === 'user_custom'){
                    let categoriesIds = []
                    this.categoriesInput.map(item => {
                        categoriesIds.push(item.id)
                    })
                    this.setVoucherCategories({categories: categoriesIds})

                    let productsIds = []
                    this.productsInput.map(item => {
                        productsIds.push(item.id)
                    })
                    this.setVoucherProducts({products: productsIds})
                }
                                
            },

            async setVoucherCategories(data) {
                const item = await repository.setVoucherCategories(this.$route.params.id, data)
                if (item.status === 200) {
                    this.successMessage('Successful')
                    // this.$router.push('/vouchers')
                } else {
                    this.errorMessage(item.message)
                }
                this.isLoading = false
            },
            async fetchAllVoucherCategories(id) {
                const data = await repository.getVoucherCategories(id)                
                if(data){
                    let allCategories = []
                    data.map(item => {
                        allCategories.push({id: item.id, name: item.trans.title})
                    })
                    this.categoriesInput = allCategories
                    
                }
            },
            async setVoucherProducts(data) {
                const item = await repository.setVoucherProducts(this.$route.params.id, data)
                if (item.status === 200) {
                    this.successMessage('Successful')
                    // this.$router.push('/vouchers')
                } else {
                    this.errorMessage(item.message)
                }
                this.isLoading = false
            },
            async fetchAllVoucherProducts(id) {
                const data = await repository.getVoucherProducts(id)                
                if(data){
                    let allCategories = []
                    data.map(item => {
                        allCategories.push({id: item.id, name: item.trans.name})
                    })
                    this.productsInput = allCategories
                }
            },
            async getContent(id) {
                const data = await repository.getVoucher(id)
                if(data){
                    this.data.arTitle = data.trans.title
                    this.data.type = data.type
                }
                if(this.data.type === 'user_general' || this.data.type === 'user_custom'){
                    this.fetchAllUsers();
                    this.fetchAllVoucherUsers(this.$route.params.id);
                }
                if(this.data.type === 'custom' || this.data.type === 'user_custom'){
                    this.fetchAllCategories();
                    this.fetchAllVoucherCategories(this.$route.params.id);
                    this.fetchAllProducts();
                    this.fetchAllVoucherProducts(this.$route.params.id);
                }
            },
            async updateContent(data) {
                const response = await repository.updateVoucher(this.$route.params.id, data)
                if (response.status === 200) {
                    this.successMessage('Successful')
                }
                this.isLoading = false
                
            },

            async fetchAllCategories() {
                const categories = await categoriesRepository.getAllSubCategories(1, 99999);
                let allCategories = []
                categories.map(category => {
                    if(category.children){
                        category.children.map(item => {
                            allCategories.push({id: item.id, name: item.trans[0].title})
                        })
                    }
                })
                this.categories = allCategories
            },

            async fetchAllUsers() {
                const data = await repositoryUsers.getAllItems(1, 99999)
                let allUsers = []
                data.Users.rows.map(user => {
                    if(user.name){
                        allUsers.push(user)
                    }
                })
                this.users = allUsers
            },

            getFilteredProducts(text) {
                this.filteredProducts = [];
                let filters = {};
                filters.searchQuery = text;
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    this.fetchAllProducts(filters);
                }, 500);
            },
            // Fetch Products
            async fetchAllProducts(filters) {
                this.productsFilterLoading = true;
                const products = await productsRepository.getAllProducts(this.page, this.limit, filters)
                if( products&&products.Products.rows){
                    products.Products.rows.map(item => {
                    this.filteredProducts.push({id: item.id, name: item.trans.name});
                    });
                }     
                this.productsFilterLoading = false;
            },

            async setVoucherUsers(data) {
                const item = await repository.setVoucherUsers(this.$route.params.id, data)
                if (item.status === 200) {
                    this.successMessage('Successful')
                    // this.$router.push('/vouchers')
                } else {
                    this.errorMessage(item.message)
                }
                this.isLoading = false
            },
            async fetchAllVoucherUsers(id) {
                const data = await repository.getVoucherUsers(id)                
                if(data){
                    this.usersInput = data
                }
            },

            errorMessage(textMessage) {
                this.$snackbar.open({
                    message: textMessage,
                    type: 'is-danger',
                    position: 'is-bottom-right',
                    actionText: 'OK',
                    queue: false,
                    duration: 10000,
                    indefinite: false,
                })
            },
            successMessage(textMessage) {
                this.$snackbar.open({
                    message: textMessage,
                    type: 'is-success',
                    position: 'is-bottom-right',
                    actionText: 'OK',
                    queue: false,
                    duration: 10000,
                    indefinite: false,
                })
            },

        }
    }
</script>
