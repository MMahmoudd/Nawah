<template>
    <div class="aboutUs">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('completeAll.aboutUs')}}
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
                                <div class="col-12">
                                    <b-field class="field-group">
                                        <b-input type="text" placeholder="title" v-model="data.title" />
                                    </b-field>
                                </div>
                                <div class="col-12 mt-2">
                                    <label class="label">{{$t('completeAll.mission')}}</label>
                                    <vue-editor
                                    :editorToolbar="toolbarEditor"
                                    v-model="data.mission"/>
                                </div>
                                <div class="col-12 mt-3">
                                    <label class="label">{{$t('completeAll.vision')}}</label>
                                    <vue-editor
                                    :editorToolbar="toolbarEditor"
                                    v-model="data.vision"/>
                                </div>

                                <div class="col-12 col-sm-6 mt-4">
                                    <div class="square--photo square--photo-placeholder field-group " >
                                        <img :src="image_base_url + previewImageOne" class="avatar-l" v-if="previewImageOne && !imageOne">
                                    </div>
                                    <b-radio v-model="image_mobile_default"
                                        native-value="image1">
                                        {{$t('completeAll.mobileDefault')}}
                                    </b-radio>
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
                                <div class="col-12 col-sm-6 mt-4">
                                    <div class="square--photo square--photo-placeholder field-group">
                                        <img :src="image_base_url + previewImageTwo" class="avatar-l" v-if="previewImageTwo && !imageTwo">
                                    </div>
                                    <b-radio v-model="image_mobile_default"
                                        native-value="image2">
                                        {{$t('completeAll.mobileDefault')}}
                                    </b-radio>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="Image 2" disabled
                                            type="text" :value="imageTwo? imageTwo.name : ''">
                                        </b-input>
                                        <p class="control">
                                            <button type="button" 
                                             @click="$refs.uploadImageTwo.click()"
                                             class="button is-info">{{$t('completeAll.upload')}}</button>
                                        </p>
                                    </b-field>
                                    <input type="file" hidden @change="uploadImageTwo" ref="uploadImageTwo">
                                </div>                                
                                <div class="col-12 col-sm-6 mt-4">
                                    <div class="square--photo square--photo-placeholder field-group ">
                                        <img :src="image_base_url + previewImageThree" class="avatar-l" v-if="previewImageThree && !imageThree">
                                    </div>
                                    <b-radio v-model="image_mobile_default"
                                        native-value="image3">
                                        {{$t('completeAll.mobileDefault')}}
                                    </b-radio>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="Image 2" disabled
                                            type="text" :value="imageThree? imageThree.name : ''">
                                        </b-input>
                                        <p class="control">
                                            <button type="button" 
                                             @click="$refs.uploadImageThree.click()"
                                             class="button is-info">{{$t('completeAll.upload')}}</button>
                                        </p>
                                    </b-field>
                                    <input type="file" hidden @change="uploadImageThree" ref="uploadImageThree">
                                </div>                                
                                <div class="col-12 col-sm-6 mt-4">
                                    <div class="square--photo square--photo-placeholder field-group ">
                                        <img :src="image_base_url + previewImageFour" class="avatar-l" v-if="previewImageFour && !imageFour">
                                    </div>
                                    <b-radio v-model="image_mobile_default"
                                        native-value="image4">
                                        {{$t('completeAll.mobileDefault')}}
                                    </b-radio>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="Image 2" disabled
                                            type="text" :value="imageFour? imageFour.name : ''">
                                        </b-input>
                                        <p class="control">
                                            <button type="button" 
                                             @click="$refs.uploadImageFour.click()"
                                             class="button is-info">{{$t('completeAll.upload')}}</button>
                                        </p>
                                    </b-field>
                                    <input type="file" hidden @change="uploadImageFour" ref="uploadImageFour">
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
        name: 'aboutUs',
        data() {
            return {
                isLoading: false,
                contentLang: 'en',
                data:{
                    title: '',
                    mission: '',
                    vision: '',
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
                    label: this.$t('completeAll.aboutUs')
                }],
                image_base_url: null,
                imageOne: '',
                previewImageOne: '',
                imageTwo: '',
                imageThree: '',
                imageFour: '',
                previewImageTwo: '',
                previewImageThree: '',
                previewImageFour: '',
                image_mobile_default: '',
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
                this.data.mission && formData.append('mission', this.data.mission)
                this.data.vision && formData.append('vision', this.data.vision)
                this.contentLang && formData.append('lang', this.contentLang)
                this.imageOne && formData.append('image1', this.imageOne)
                this.imageTwo && formData.append('image2', this.imageTwo)
                this.imageThree && formData.append('image3', this.imageThree)
                this.imageFour && formData.append('image4', this.imageFour)
                this.image_mobile_default && formData.append('image_mobile_default', this.image_mobile_default)
                
                this.updateContent(formData)
            },

            langChanged(val){
                this.getContent(val)
            },

            async getContent(lang) {
                const data = await repository.getAboutUs(lang)
                if(data){
                    this.data.title = data.title
                    this.data.mission = data.mission
                    this.data.vision = data.vision
                    this.image_base_url = data.image_base_url
                    this.image_mobile_default = data.image_mobile_default
                    if(data.images&&data.images.length){
                        this.previewImageOne = data.images[0]
                        this.previewImageTwo = data.images[1]
                        this.previewImageThree = data.images[2]
                        this.previewImageFour = data.images[3]
                    }
                }
            },
            async updateContent(data) {
                const response = await repository.updateAboutUs(data)
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
             async uploadImageThree (event) {
                this.imageThree= event.target.files[0]
            },
             async uploadImageFour (event) {
                this.imageFour = event.target.files[0]
            },


        }
    }
</script>
