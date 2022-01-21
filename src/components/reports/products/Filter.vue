<template>
    <div class="filter--items">
        <div class="row">
            <div class="col-12 col-lg-4">
                <div class="filter--items--right">
                    
                    <div class="input--fuild">
                        <div class="search">
                            <a @click="fetchFile()" type="button" class="button is-info" download>Export</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-lg-6">
                <div class="filter--items--left">
                    <a class="button is-rounded is-small" @click="goBack()"><i class="fas fa-arrow-left"></i></a>
                    <!-- <div class="input--fuild">
                        <button class="button w-100"
                              :class="{'is-primary' : checkItem && allItemChecked.length}"
                              @click="selectAllItems">
                              {{$t('selectAll')}}
                         </button>
                    </div> -->
                    <div class="input--fuild">
                        <v-select :clearable="true" :options="categories" v-model="category" label="name"
                            placeholder="Filter by category"
                            class="select--with--icon w-100 v--select--scroll w-fuild-md">
                            <template slot="option" slot-scope="option">
                                {{ option.name }}
                            </template>
                        </v-select>
                    </div>
                    <div class="input--fuild">
                        <v-select :clearable="true" :options="['featured', 'unfeatured']" v-model="featured" label="name"
                            placeholder="Filter by featured"
                            class="select--with--icon w-100 v--select--scroll w-fuild-md">
                            <template slot="option" slot-scope="option">
                                {{ option.name }}
                            </template>
                        </v-select>
                    </div>
                    <div class="input--fuild">
                        <v-select :clearable="true" :options="['discount', 'not discount']" v-model="discount" label="name"
                            placeholder="Filter by discount"
                            class="select--with--icon w-100 v--select--scroll w-fuild-md">
                            <template slot="option" slot-scope="option">
                                {{ option.name }}
                            </template>
                        </v-select>
                    </div>
                    <div class="input--fuild">
                        <div class="search icon--right">
                            <b-input :placeholder="$t('search') + '...'" type="search" icon-pack="fa" icon="search" v-model="searchQuery">
                            </b-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    // Repository Data
    import { RepositoryFactory } from "../../../repositories/RepositoryFactory";
    const categoriesRepository = RepositoryFactory.get("categories");
    const repoetsRepository = RepositoryFactory.get('reports')
    let download = require("downloadjs");

    export default {
        props:['allItemChecked'],
        data() {
            return {
                group: '',
                groups: ['All', 'admin', 'editor', 'users'],
                checkItem: false,
                searchQuery: '',
                filters: {},
                exportExcel: null,
                categories: [],
                category: null,
                featured: null,
                discount: null,
            }
        },
        watch:{
            allItemChecked(){
                if(this.allItemChecked == 0){ 
                    this.checkItem= false
                }
            },
            searchQuery(){
                this.filters.searchQuery = this.searchQuery
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    this.$emit('featchByFilter', this.filters)
                }, 500);
            },
            category(){
                this.filters.category = this.category ? this.category.id : ''
                this.$emit('featchByFilter', this.filters)
                console.log(this.filters)
            },
            featured(){
                this.filters.featured  = this.featured ? this.featured : ''
                // if(this.featured === 'featured') {
                //     this.filters.featured = 1
                // } else if(this.featured === 'unfeatured'){
                //     this.filters.featured = 3
                // } else {
                //     this.filters.featured = ''
                // }
                this.$emit('featchByFilter', this.filters)
            },
            discount(){
                if(this.discount === 'discount'){
                     this.filters.discount = '&discount=true'
                } else if(this.discount === 'not discount'){
                    this.filters.discount = '&discount=false'
                } else {
                    this.filters.discount  = ''
                }
                this.$emit('featchByFilter', this.filters)
            }
        },
        created(){
            this.fetchAllCategories();
        },
        methods: {
            async fetchFile() {
                const products = await repoetsRepository.getFiles(this.page, this.limit, this.filters)
                // download(products, "sheet.xls", "text/plain");
                console.log(products)
                window.open(products.download_url)
            },
            selectAllItems() {
                this.checkItem = !this.checkItem
                this.$emit('selectAllItems', this.checkItem)
            },
            goBack(){
                window.history.back()
            },
            async fetchAllCategories(){
                const categories = await categoriesRepository.getAllSubCategories(1, 9999);
                let allCategories = []
                categories.map(category => {
                    if(category.children){
                      category.children.map(item => {
                        return allCategories.push({id: item.id, name: item.trans[0].title})
                      })
                    }
                    allCategories.push({id: category.id, name: category.trans[0].title})
                })
                this.categories = allCategories
            }
        }
    }

</script>


