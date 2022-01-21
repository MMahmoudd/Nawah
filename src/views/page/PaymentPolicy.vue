<template>
    <div class="aboutUs">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('completeAll.paymentPolicy')}}
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
                            <div class="row justify-content-center">
                                <div class="col-12">
                                     <b-field class="field-group mb-4">
                                        <b-select v-model="contentLang" @input="langChanged" expanded>
                                            <option value="en" selected>
                                                En
                                            </option>
                                            <option value="ar">
                                                Ar
                                            </option>
                                        </b-select>
                                    </b-field>
                                </div>
                                <div class="col-12 mt-2">
                                    <label class="label">{{$t('completeAll.title')}}</label>
                                    <vue-editor
                                    :editorToolbar="toolbarEditor"
                                    v-model="data.title"/>
                                </div>
                                
                                <div class="col-12 col-sm-6 mt-4">
                                    <div class="square--photo square--photo-placeholder field-group " >
                                        <img :src="image_base_url + previewImageOne" class="avatar-l" v-if="previewImageOne && !imageOne">
                                    </div>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="Image 1" disabled
                                            type="text" :value="imageOne? imageOne.name : ''">
                                        </b-input>
                                        <p class="control">
                                            <button type="button" 
                                             @click="$refs.uploadImageOne.click()"
                                             class="button is-info">{{$t('completeAll.upload')}}</button>
                                        </p>
                                    </b-field>
                                    <input type="file" hidden @change="uploadImageOne" ref="uploadImageOne">
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
  // Vue Editor
    import { VueEditor } from "vue2-editor";
    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'

    const repository = RepositoryFactory.get('pages')


    export default {
        name: 'paymentPolicy',
        data() {
            return {
                isLoading: false,
                contentLang: 'en',
                data:{
                    title: ''
                },
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
                    link: '',
                    label: this.$t('completeAll.paymentPolicy')
                }],
                image_base_url: null,
                imageOne: '',
                previewImageOne: '',
            };
        },

       components: {
            VueEditor,
        },
        created() {
            this.getContent(this.contentLang)
        },
        
        methods: {

            // Add New Category Button
            submitForm() {
                this.isLoading = true
                const formData = new FormData()
                this.data.title && formData.append('title', this.data.title)
                this.contentLang && formData.append('lang', this.contentLang)
                this.imageOne && formData.append('image', this.imageOne)               
                this.updateContent(formData)
            },

            langChanged(val){
                this.getContent(val)
            },

            async getContent(lang) {
                const data = await repository.getPaymentPolicy(lang)
                if(data){
                    this.data.title = data.title
                    this.image_base_url = data.image_base_url
                    this.previewImageOne = data.image
                }
            },
            async updateContent(data) {
                const response = await repository.updatePaymentPolicy(data)
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

        }
    }
</script>
