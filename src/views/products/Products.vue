<template>
    <div class="products">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                             {{$t('products')}}
                            <span class="badge--count" v-if="total">
                                ({{total}})
                            </span>
                        </h1>

                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />

                    </div>

                    <!-- <div class="page--title--action ml-auto" v-if="isInUserPermissions('category.create')">
                        <router-link :to="{ path: '/categoryForm', query: { parentId: this.$route.params.id}}"
                            class="button is-primary">{{$t('productsPage.addNewCategory')}}</router-link>
                    </div> -->
                    <div class="page--title--action ml-auto">
                        <router-link :to="{ path: '/productForm'}"
                            class="button is-primary">{{$t('productsPage.addNewProduct')}}</router-link>
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
                    @checkButtonSelectAll="checkButtonSelectAll" :data="products" 
                    :imageBaseUrl="imageBaseUrl"
                    v-if="products.length" />
                <template v-else>
                    <no-data :text="$t('productsPage.messages.noData')"/>
                </template>
            </template>
            <template v-if="products.length">
                <div class="pagination--custom--number">
                    <b-pagination :total="total" :current.sync="page" :order="order" :rounded="true" :per-page="limit">
                    </b-pagination>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import List from '../../components/products/list'
    import FilterItems from '../../components/products/Filter'

    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const productsRepository = RepositoryFactory.get('products')

    export default {
        name: 'products',
        data() {
            return {
                products: [],
                imageBaseUrl: '',
                total: null,
                allItemsSelected: false,
                allItemChecked: 0,
                page: 1,
                limit: 12,
                order: 'is-centered',
                dataLoading: true,
                breadcrumb: [{
                    link: '',
                    label: this.$t("productsPage.breadcrumb[0]")
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
            },
            // Check Button Select All Active Or Not
            checkButtonSelectAll(data) {
                this.allItemChecked = data
            },

            // Fetch All Items
            async fetchAllItems(filters) {
                this.dataLoading = true
                const products = await productsRepository.getAllProducts(this.page, this.limit, filters, this
                    .$route.params.id)
                if(products.Products.count != 0){
                    this.total = products.Products.count;
                }
                
                this.products = products.Products.rows;
                this.imageBaseUrl = products.image_base_url;
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
