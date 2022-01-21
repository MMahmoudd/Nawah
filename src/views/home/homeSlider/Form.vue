<template>
    <div class="aboutUs">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            Sliders
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
                                <div class="col-12 mt-2">
                                    <b-field class="field-group">
                                        <b-input  placeholder="Ar Title" 
                                            type="text"  v-model="data.arTitle">
                                        </b-input>
                                    </b-field>
                                    <b-field class="field-group">
                                        <b-input  placeholder="En Title" 
                                            type="text"  v-model="data.enTitle">
                                        </b-input>
                                    </b-field>
                                </div>
                                <div class="col-12 mt-2">
                                    <b-field class="field-group">
                                        <b-input  placeholder="Ar Subtitle" 
                                            type="textarea"  v-model="data.arSubtitle" rows="2">
                                        </b-input>
                                    </b-field>
                                    <b-field class="field-group">
                                        <b-input  placeholder="En Subtitle" 
                                            type="textarea"  v-model="data.enSubtitle" rows="2">
                                        </b-input>
                                    </b-field>
                                </div>

                                <!-- Related Products -->
                                    <div class="col-12 mt-2">
                                    <div class="card--content">
                                        <div class="post--info--item">
                                        <b-field class="field-group flex-column mb-0">
                                            <label class="label">Related Products</label>
                                            <b-taginput
                                            v-model="data.related_products"
                                            :data="filteredProducts"
                                            autocomplete
                                            :allow-new="false"
                                            :maxtags="1"
                                            :open-on-focus="true"
                                            field="name"
                                            icon-pack="fa"
                                            icon="shopping-basket"
                                            placeholder="Related Products"
                                            :loading="productsFilterLoading"
                                            @typing="getFilteredProducts"
                                            ></b-taginput>
                                        </b-field>
                                        </div>
                                    </div>
                                    </div>

                                <div class="col-12">
                                    <b-field class="field-group">
                                        <b-switch v-model="status" :true-value="1" :false-value="0" class="my-2">Status</b-switch>
                                    </b-field>
                                </div>
                                
                                
                                <div class="col-12 col-sm-6 mt-4">
                                    <div class="square--photo square--photo-placeholder field-group " >
                                        <img :src="image_base_url + previewImageOne" class="avatar-l" v-if="previewImageOne && !imageOne">
                                    </div>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="ar image" disabled
                                            type="text" :value="imageOne? imageOne.name : ''">
                                        </b-input>
                                        <p class="control">
                                            <button type="button" 
                                             @click="$refs.uploadImageOne.click()"
                                             class="button is-info">Upload</button>
                                        </p>
                                    </b-field>
                                    <input type="file" hidden @change="uploadImageOne" ref="uploadImageOne">
                                </div>
                                <div class="col-12 col-sm-6 mt-4">
                                    <div class="square--photo square--photo-placeholder field-group">
                                        <img :src="image_base_url + previewImageTwo" class="avatar-l" v-if="previewImageTwo && !imageTwo">
                                    </div>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="en image" disabled
                                            type="text" :value="imageTwo? imageTwo.name : ''">
                                        </b-input>
                                        <p class="control">
                                            <button type="button" 
                                             @click="$refs.uploadImageTwo.click()"
                                             class="button is-info">Upload</button>
                                        </p>
                                    </b-field>
                                    <input type="file" hidden @change="uploadImageTwo" ref="uploadImageTwo">
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
    } from '../../../repositories/RepositoryFactory'

    const repository = RepositoryFactory.get('home')
    const productsRepository = RepositoryFactory.get('products')

    export default {
        name: 'homeSliderForm',
        data() {
            return {
                isLoading: false,
                status: 1,
                data:{
                    arTitle: '',
                    enTitle: '',
                    arSubtitle: '',
                    enSubtitle: '',
                    related_products: null,
                },
                filteredProducts: [],
                productsFilterLoading: false,
                toolbarEditor: [
                    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
                    ['bold', 'italic', 'underline'],
                    [{
                        'list': 'ordered'
                    }, {
                        'list': 'bullet'
                    }, {
                        'header': [1, 2, 3, false]
                    }],
                    ['link']
                ],
                breadcrumb: [{
                    link: '/homeSlider',
                    label: 'Sliders',
                },{
                     link: '',
                    label: 'Add & Update Slider',
                }
                ],
                image_base_url: null,
                imageOne: '',
                previewImageOne: '',
                imageTwo: '',
                previewImageTwo: '',
            };
        },
        beforeCreate(){
            
        },
        created() {
            this.fetchAllProducts();
            this.getContent(this.$route.params.id)
        },
        
        methods: {
                getFilteredProducts(text) {
                    this.filteredProducts = [];
                    let filters = {};
                    filters.searchQuery = text;
                    clearTimeout(this.debounce);
                    this.debounce = setTimeout(() => {
                        this.fetchAllProducts(filters);
                    }, 500);
                },

                async fetchAllProducts(filters) {
                    this.productsFilterLoading = true;
                    const products = await productsRepository.getAllProductsForSkider()
                    // console.log(products.Products.rows)

                    if( products&&products.Products.rows){
                        products.Products.rows.map(item => {
                        this.filteredProducts.push({id: item.id, name: item.trans.name});
                        });
                    }    
                    this.productsFilterLoading = false;
                },
                        
            submitForm() {
                this.isLoading = true
                const formData = new FormData()
                this.data.arTitle && formData.append('ar.title', this.data.arTitle)
                this.data.enTitle && formData.append('en.title', this.data.enTitle)
                this.data.arSubtitle && formData.append('ar.sub_title', this.data.arSubtitle)
                this.data.enSubtitle && formData.append('en.sub_title', this.data.enSubtitle)
                this.data.related_products && formData.append('product_id', this.data.related_products[0].id)
                this.imageOne && formData.append('ar.image', this.imageOne)
                this.imageTwo && formData.append('en.image', this.imageTwo)                
                this.status && formData.append('status', this.status)                
                if (this.$route.params.id) {
                    this.updateContent(formData)
                } else {
                    this.newItem(formData)
                }
            },

            async newItem(data) {
                const item = await repository.newSlider(data)
                if (item.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/homeSlider')
                } else {
                    this.errorMessage(item.message)
                }
                this.isLoading = false
            },


            async getContent(id) {
                const data = await repository.getSlider(id)
                if(data){
                    this.status = data.status ? 1 : 0
                    this.data.arTitle = data.trans[0].title
                    this.data.enTitle = data.trans[1].title
                    this.data.arSubtitle = data.trans[0].sub_title
                    this.data.enSubtitle = data.trans[1].sub_title
                    this.previewImageOne = data.trans[0].image
                    this.previewImageTwo = data.trans[1].image
                    this.image_base_url = data.image_base_url
                }
                    const object_from_products = await this.filteredProducts.find(product => product.id === data.product_id);
                    this.data.related_products = [object_from_products]
                    
            },
            async updateContent(data) {
                const response = await repository.updateSlider(this.$route.params.id, data)
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
             async uploadImageTwo (event) {
                this.imageTwo = event.target.files[0]
            },

        }
    }
</script>
