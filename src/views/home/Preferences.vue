<template>
    <div class="aboutUs">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('completeAll.preferences')}}
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
                                <div class="col-12">
                                    <b-field class="field-group flex-column" label="Default Country">
                                        <v-select
                                            :options="handleParentData(allCountries)"
                                            v-model="data.default_country"
                                            label="title"
                                            placeholder="Country"
                                            class="select--with--icon w-100 v--select--scroll" >
                                        <template slot="option" slot-scope="option">{{ option.title }}</template>
                                        </v-select>
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <b-field class="field-group flex-column" label="Top Selling Limit">
                                        <b-input type="number" v-model="data.top_selling_limit" />
                                    </b-field>
                                </div>
                                
                                <div class="col-12">
                                    <b-field class="field-group flex-column" label="Featured Limit">
                                        <b-input type="number" v-model="data.featured_limit" />
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <b-field class="field-group flex-column" label="New Arrivals Limit">
                                        <b-input type="number" v-model="data.new_arrivals_limit" />
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <b-field class="field-group flex-column" label="Home Categories">
                                        <v-select
                                            :options="categories"
                                            v-model="data.home_categories"
                                            label="name"
                                            multiple
                                            placeholder="Country"
                                            class="select--with--icon w-100 v--select--scroll">
                                        <template slot="option" slot-scope="option">{{ option.name }}</template>
                                        </v-select>
                                    </b-field>
                                </div>                                
                            </div>                                                        
                        </div>

                        <div class="col-12 text-center button--save--form">
                            <button class="button is-primary"
                                :class="{'is-loading': isLoading}">{{$t('completeAll.save')}}</button>
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

    const repository = RepositoryFactory.get('home')
    const countriesRepository = RepositoryFactory.get('countries')
    const categoriesRepository = RepositoryFactory.get("categories");
    export default {
        name: 'preferences',
        data() {
            return {
                isLoading: false,
                data:{
                    default_country: null,
                    top_selling_limit: null,
                    featured_limit: null,
                    new_arrivals_limit: null,
                    home_categories: [],
                },
                allCategories: [],
                categories: [],
                breadcrumb: [{
                    link: '',
                    label: this.$t('completeAll.preferences')
                }],
                image_base_url: null,
                imageOne: '',
                previewImageOne: '',
               allCountries: [],
            };
        },

        created() {
            this.fetchAllCategories();
            this.fetchAllICountries()
            this.getContent()
        },
        
        methods: {

            submitForm() {
                this.isLoading = true
                // let formData = {}
                // this.data.default_country? formData['default_country'] = this.data.default_country.id : null
                // this.data.top_selling_limit? formData['top_selling_limit'] = this.data.top_selling_limit : null
                // this.data.featured_limit? formData['featured_limit'] = this.data.featured_limit : null
                // this.data.new_arrivals_limit? formData['new_arrivals_limit'] = this.data.new_arrivals_limit : null
                // if(this.data.home_categories.length){
                //     let categoriesIDS = []
                //     this.data.home_categories.map(item => {
                //         categoriesIDS.push(item.id)
                //     })
                //     formData['home_categories'] = categoriesIDS
                // }

                

                const formData = new FormData()
                this.data.default_country && formData.append('default_country', this.data.default_country.id)
                this.data.top_selling_limit && formData.append('top_selling_limit', this.data.top_selling_limit)
                this.data.featured_limit && formData.append('featured_limit', this.data.featured_limit)
                this.data.new_arrivals_limit && formData.append('new_arrivals_limit', this.data.new_arrivals_limit)
                if(this.data.home_categories.length){
                    let categoriesIDS = [] 
                    this.data.home_categories.map( item => {
                        categoriesIDS.push(item.id)
                    })
                    formData.append('home_categories', JSON.stringify(categoriesIDS))
                }
                this.updateContent(formData)
            },

            async getContent() {
                const Preference = await repository.getPreferences()
                if(Preference){
                    this.data.top_selling_limit = Preference.Preference.top_selling_limit
                    this.data.featured_limit = Preference.Preference.featured_limit
                    this.data.new_arrivals_limit = Preference.Preference.new_arrivals_limit
                    this.image_base_url = Preference.image_base_url

                    if(Preference.Preference.default_country){
                        setTimeout(() => {
                            this.getFullObjectCurrencies(Preference.Preference.default_country) 
                        }, 1000);
                    }
                    if(Preference.Preference.home_categories){
                        setTimeout(() => {
                            this.getFullObjectCategories(Preference.Preference.home_categories) 
                        }, 1000);
                    }
                }
            },
            
            async updateContent(data) {
                const response = await repository.updatePreferences(data)
                if (response.status === 200) {
                    this.successMessage('Successful')
                }
                this.isLoading = false
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

           // Fetch All Items
            async fetchAllICountries() {
                const items = await countriesRepository.getAllItems(1, 999)
                this.allCountries = items.Geographies.rows;
            },

            handleParentData(data) {
                let handleData = []
                data.map(item => {
                    handleData.push({title: item.trans.name, id: item.id})
                })
                return handleData
            },

            getFullObjectCurrencies(id){
                this.allCountries.map(item => {                    
                    if(item.id.toString() === id) {
                        this.data.default_country = {title: item.trans.name, id: item.id}
                    }
                })
            },
            getFullObjectCategories(ids){
                let allIDS = JSON.parse(ids)
                this.categories.map(item => {     
                    allIDS.map(id => {
                        if(id === item.id){
                            this.data.home_categories.push(item)
                        }
                    })  
                })
            },

            async fetchAllCategories() {
                const categories = await categoriesRepository.getAllSubCategories(
                    this.page,
                    this.limit
                );
                this.allCategories = categories
                let allCategories = []
                categories.map(category => {
                    // if(category.children){
                    //   category.children.map(item => {
                    //     allCategories.push({id: item.id, name: item.trans[0].title})
                    //   })
                    // }
                    allCategories.push({id: category.id, name: category.trans[0].title})
                })
                this.categories = allCategories
            },
            // Handle File Upload
            readFile(file) {
                return new Promise(resolve => {
                    const reader = new FileReader()
                    reader.addEventListener('load', () => resolve(reader.result), false)
                    reader.readAsDataURL(file)
                })
            },

            
            // Handle Upload Image
             async uploadImageOne (event) {
                this.imageOne = event.target.files[0]
            },

        }
    }
</script>
