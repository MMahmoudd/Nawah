<template>
    <div class="categories">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('categories')}}
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
                        <div class="col-12 col-md-10 col-lg-8">
                            <div class="row">
                                <div class="col-12 col-sm-6">
                                    <b-field class="field-group">
                                        <b-input required type="text" placeholder="ar title" v-model="category.arTitle" />
                                    </b-field>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <b-field class="field-group">
                                        <b-input required type="text" placeholder="en title" v-model="category.enTitle" />
                                    </b-field>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-sm-6">
                                    <b-field class="field-group">
                                        <b-input type="text" placeholder="ar subtitle" v-model="category.arSubTitle" />
                                    </b-field>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <b-field class="field-group">
                                        <b-input type="text" placeholder="en subtitle" v-model="category.enSubTitle" />
                                    </b-field>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-sm-6">
                                    <b-field class="field-group flex-column">
                                        <v-select
                                            :options="handleCategoriesData(allCategories)"
                                            v-model="category.parentId"
                                            label="title"
                                            placeholder="Parent Categories"
                                            class="select--with--icon w-100 v--select--scroll"
                                        >
                                        <template slot="option" slot-scope="option">{{ option.title }}</template>
                                        </v-select>
                                    </b-field>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <b-field class="field-group">
                                        <b-input type="text" placeholder="price" v-model="category.shipping_cost" />
                                    </b-field>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-sm-6">
                                    <b-field class="field-group">
                                        <b-input type="text" placeholder="sort" v-model="category.sort" />
                                    </b-field>
                                </div>
                                <div class="col-6 col-sm-3">
                                    <b-field class="field-group">
                                        <b-switch v-model="category.status" :true-value="1" :false-value="0" class="my-2">Status</b-switch>
                                    </b-field>
                                </div>
                                <div class="col-12 col-sm-3">
                                    <b-field class="field-group">
                                        <b-switch v-model="category.review" :true-value="1" :false-value="0" class="my-2">Review</b-switch>
                                    </b-field>
                                </div>
                            </div>

                             <div class="row">
                                <div class="col-12 col-sm-6">
                                    <div class="square--photo field-group mt-3" v-if="previewImageAr && !categoryImageAr">
                                        <img :src="image_base_url + previewImageAr" class="avatar-l">
                                    </div>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="AR category image" disabled
                                            type="text" :value="categoryImageAr? categoryImageAr.name : ''">
                                        </b-input>
                                        <p class="control">
                                            <button type="button" 
                                             @click="$refs.uploadCategoryImageAR.click()"
                                             class="button is-info">Upload</button>
                                        </p>
                                    </b-field>
                                    <input type="file" hidden @change="onImageUploadCategoryAR" ref="uploadCategoryImageAR">
                                </div>
                                <div class="col-12 col-sm-6">
                                    <div class="square--photo field-group mt-3" v-if="previewImageEn && !categoryImageEn">
                                        <img :src="image_base_url + previewImageEn" class="avatar-l">
                                    </div>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="EN category image" disabled
                                            type="text" :value="categoryImageEn? categoryImageEn.name : ''">
                                        </b-input>
                                        <p class="control">
                                            <button type="button" 
                                             @click="$refs.uploadCategoryImageEN.click()"
                                             class="button is-info">Upload</button>
                                        </p>
                                    </b-field>
                                    <input type="file" hidden @change="onImageUploadCategoryEN" ref="uploadCategoryImageEN">
                                </div>
                            </div>
                             <div class="row">
                                 <div class="col-12 col-sm-6">
                                    <div class="square--photo field-group mt-3" v-if="previewIconAr && !categoryIconAr">
                                        <img :src="image_base_url + previewIconAr" class="avatar-l">
                                    </div>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="AR category icon" disabled
                                            type="text" :value="categoryIconAr? categoryIconAr.name : ''">
                                        </b-input>
                                        <p class="control">
                                            <button type="button" 
                                             @click="$refs.uploadCategoryIconAR.click()"
                                             class="button is-info">Upload</button>
                                        </p>
                                    </b-field>
                                    <input type="file" hidden @change="onIconUploadCategoryAR" ref="uploadCategoryIconAR">
                                </div>

                                <div class="col-12 col-sm-6">
                                    <div class="square--photo field-group mt-3" v-if="previewIconEn && !categoryIconEn">
                                        <img :src="image_base_url + previewIconEn" class="avatar-l">
                                    </div>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="EN category icon" disabled
                                            type="text" :value="categoryIconEn? categoryIconEn.name : ''">
                                        </b-input>
                                        <p class="control">
                                            <button type="button" 
                                             @click="$refs.uploadCategoryIconEn.click()"
                                             class="button is-info">Upload</button>
                                        </p>
                                    </b-field>
                                    <input type="file" hidden @change="onIconUploadCategoryEN" ref="uploadCategoryIconEn">
                                </div>

                            </div>

                        </div>

                        <div class="col-12 text-center button--save--form">
                            <button class="button is-primary"
                                :class="{'is-loading': isLoading}">{{this.$route.params.id ? $t('saveChanges') : $t('add')}}</button>
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

    const categoriesRepository = RepositoryFactory.get('categories')

    import {
        mapState
    } from 'vuex';

    export default {
        name: 'categoryForm',
        data() {
            return {
                allCategories: [],
                // handle image
                categoryImageAr: '',
                categoryImageEn: '',
                categoryIconAr: '',
                categoryIconEn: '',
                image_base_url: null,
                previewImageAr: '',
                previewImageEn: '',
                previewIconAr: '',
                previewIconEn: '',
                isLoading: false,
                photo: '',
                category:{
                    arTitle: '',
                    enTitle: '',
                    arSubTitle: '',
                    enSubTitle: '',
                    parentId: null,
                    sort: '',
                    shipping_cost: '',
                    status: 1,
                    review: 1,
                },
                breadcrumb: [{
                    link: '/categories',
                    label: this.$t("categoriesPage.breadcrumb[0]")
                }, {
                    link: '',
                    label: this.$t("categoriesPage.breadcrumb[1]")
                }]
            };
        },

        watch: {
            '$route'(to, from) {
                if (this.$route.params.id) {
                    this.getCategory(this.$route.params.id)
                } else {
                    this.resetfuild()
                }
            },
        },
        created() {
            if (this.$route.params.id) {
                this.getCategory(this.$route.params.id)
            }
            this.fetchAllItems()
            
        },
        computed: {
            ...mapState({
                imageSelected: state => state.media.imageSelected,
            })
        },
        // watch: {
        //     imageSelected() {
        //         if (this.imageSelected.thumbnails) {
        //             this.photo = this.imageSelected.thumbnails.medium
        //         }
        //     }
        // },
        methods: {

            // Add New Category Button
            submitForm() {
                this.isLoading = true
                const formData = new FormData()
                this.category.arTitle && formData.append('ar.title', this.category.arTitle)
                this.category.enTitle && formData.append('en.title', this.category.enTitle)
                this.category.arSubTitle && formData.append('ar.sub_title', this.category.arSubTitle)
                this.category.enSubTitle && formData.append('en.sub_title', this.category.enSubTitle)
                this.category.parentId && formData.append('parent_id', this.category.parentId.id)
                formData.append('status', this.category.status)
                formData.append('review', this.category.review)
                this.category.sort && formData.append('sort', this.category.sort)
                this.category.shipping_cost && formData.append('shipping_cost', this.category.shipping_cost)
                this.categoryImageAr && formData.append('ar.image', this.categoryImageAr)
                this.categoryImageEn && formData.append('en.image', this.categoryImageEn)
                this.categoryIconAr && formData.append('ar.icon', this.categoryIconAr)
                this.categoryIconEn && formData.append('en.icon', this.categoryIconEn)

                if (this.$route.params.id) {
                    this.updateCategory(this.$route.params.id, formData)
                } else {
                    this.newCategory(formData)
                }

                
            },
            handleCategoriesData(data) {
                let handleData = []
                data.map(item => {
                    handleData.push({title: item.trans.title, id: item.id})
                })
                return handleData
            },
            // submitForm() {
            //     this.isLoading = false
            //     let data = {}
            //     data.name = this.name
            //     if (this.imageSelected) {
            //         data.image = this.imageSelected.id
            //     }
            //     if (this.$route.query.parentId) {
            //         data.parent = this.$route.query.parentId
            //     }


            //     this.isLoading = true
            //     if (this.$route.params.id) {
            //         this.updateCategory(this.$route.params.id, data)
            //     } else {
            //         this.newCategory(data)
            //     }

            // },

            async newCategory(data) {
                const category = await categoriesRepository.newCategory(data)
                if (category.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/categories')
                } else {
                    this.errorMessage(category.message)
                }
                this.isLoading = false
            },

           // Fetch All Items
            async fetchAllItems() {
                const categories = await categoriesRepository.getAllCategories(1, 999)
                this.allCategories = categories.rows;
            },

            async getCategory(data) {
                const category = await categoriesRepository.getCategory(data)
                console.log(category)
                let arContent = category.Category.trans[0]
                let enContent = category.Category.trans[1]

                this.image_base_url = category.Category.image_base_url

                this.previewImageAr = arContent.image
                this.previewIconAr = arContent.icon
                this.previewImageEn = enContent.image
                this.previewIconEn = enContent.icon

                this.category = {
                        arTitle: arContent.title,
                        enTitle: enContent.title,
                        arSubTitle: arContent.sub_title,
                        enSubTitle: enContent.sub_title,
                        status: category.Category.status? 1 : 0,
                        review: category.Category.review? 1 : 0,
                        parentId: '',
                        sort: category.Category.sort,
                        shipping_cost: category.Category.shipping_cost
                    }
                    if(category.Category.parent_id){
                        setTimeout(() => {
                            this.getFullObject(category.Category.parent_id) 
                        }, 1000);
                    }
                
            },
            async updateCategory(id, data) {
                const category = await categoriesRepository.updateCategory(id, data)
                if (category.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/categories')
                } else {
                    this.errorMessage(category.message)
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

            // Handle File Upload
            readFile(file) {
                return new Promise(resolve => {
                    const reader = new FileReader()
                    reader.addEventListener('load', () => resolve(reader.result), false)
                    reader.readAsDataURL(file)
                })
            },

            
            // Handle Upload Image
             async onImageUploadCategoryAR (event) {
                this.categoryImageAr = event.target.files[0]
            },
             // Delete 
            deleteImageUploadCategoryAR() {
                this.categoryImageAr = ''
            },
            // Handle Upload Image
             async onImageUploadCategoryEN (event) {
                this.categoryImageEn = event.target.files[0]
            },
             // Delete 
            deleteImageUploadCategoryEN() {
                this.categoryImageEnPreview = ''
            },
            // Handle Upload Image
             async onIconUploadCategoryAR (event) {
                this.categoryIconAr = event.target.files[0]
            },
             // Delete 
            deleteIconUploadCategoryAR() {
                this.categoryIconAr = ''
            },
            // Handle Upload Icon
             async onIconUploadCategoryEN (event) {
                this.categoryIconEn = event.target.files[0]
            },
             // Delete 
            deleteIconUploadCategoryEN() {
                this.categoryIconEn = ''
            },
            getFullObject(id){
                this.allCategories.map(item => {
                    if(item.id === id) {
                        this.category.parentId = {title: item.trans.title, id: item.id}
                    }
                })
            }

        }
    }
</script>
