<template>
    <div class="aboutUs">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('completeAll.chooseUs')}}
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
                                <div class="col-12 mt-2">
                                    <b-input placeholder="Title 1" type="text" v-model="data.title1">
                                    </b-input>
                                </div>
                                <div class="col-12 mt-3">
                                    <label class="label">Description 1</label>
                                    <vue-editor
                                    :editorToolbar="toolbarEditor"
                                    v-model="data.description1"/>
                                </div>
                                <div class="col-12 mt-4">
                                    <div class="square--photo square--photo-placeholder field-group " >
                                        <img :src="image_base_url + previewIconOne" class="avatar-l" v-if="previewIconOne && !iconOne">
                                    </div>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="Image 1" disabled
                                            type="text" :value="iconOne? iconOne.name : ''">
                                        </b-input>
                                        <p class="control">
                                            <button type="button" 
                                             @click="$refs.uploadImageOne.click()"
                                             class="button is-info">{{$t('completeAll.upload')}}</button>
                                        </p>
                                    </b-field>
                                    <input type="file" hidden @change="uploadImageOne" ref="uploadImageOne">
                                </div>
                                <div class="col-12">
                                    <hr>
                                </div>
                                <div class="col-12 mt-2">
                                    <b-input placeholder="Title 2" type="text" v-model="data.title2">
                                    </b-input>
                                </div>
                                <div class="col-12 mt-3">
                                    <label class="label">Description 2</label>
                                    <vue-editor
                                    :editorToolbar="toolbarEditor"
                                    v-model="data.description2"/>
                                </div>
                                <div class="col-12 mt-4">
                                    <div class="square--photo square--photo-placeholder field-group">
                                        <img :src="image_base_url + previewIconTwo" class="avatar-l" v-if="previewIconTwo && !iconTwo">
                                    </div>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="Image 2" disabled
                                            type="text" :value="iconTwo? iconTwo.name : ''">
                                        </b-input>
                                        <p class="control">
                                            <button type="button" 
                                             @click="$refs.uploadImageTwo.click()"
                                             class="button is-info">{{$t('completeAll.upload')}}</button>
                                        </p>
                                    </b-field>
                                    <input type="file" hidden @change="uploadImageTwo" ref="uploadImageTwo">
                                </div>
                                <div class="col-12">
                                    <hr>
                                </div>
                                <div class="col-12 mt-2">
                                    <b-input placeholder="Title 3" type="text" v-model="data.title3">
                                    </b-input>
                                </div>
                                <div class="col-12 mt-3">
                                    <label class="label">Description 3</label>
                                    <vue-editor
                                    :editorToolbar="toolbarEditor"
                                    v-model="data.description3"/>
                                </div>
                                <div class="col-12 mt-4">
                                    <div class="square--photo square--photo-placeholder field-group ">
                                        <img :src="image_base_url + previewIconThree" class="avatar-l" v-if="previewIconThree && !iconThree">
                                    </div>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="Image 2" disabled
                                            type="text" :value="iconThree? iconThree.name : ''">
                                        </b-input>
                                        <p class="control">
                                            <button type="button" 
                                             @click="$refs.uploadImageThree.click()"
                                             class="button is-info">{{$t('completeAll.upload')}}</button>
                                        </p>
                                    </b-field>
                                    <input type="file" hidden @change="uploadImageThree" ref="uploadImageThree">
                                </div>
                                <div class="col-12">
                                    <hr>
                                </div>
                                <div class="col-12 mt-2">
                                    <b-input placeholder="Title 4" type="text" v-model="data.title4">
                                    </b-input>
                                </div>
                                <div class="col-12 mt-3">
                                    <label class="label">Description 4</label>
                                    <vue-editor
                                    :editorToolbar="toolbarEditor"
                                    v-model="data.description4"/>
                                </div>
                                <div class="col-12 mt-4">
                                    <div class="square--photo square--photo-placeholder field-group ">
                                        <img :src="image_base_url + previewIconFour" class="avatar-l" v-if="previewIconFour && !iconFour">
                                    </div>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="Image 2" disabled
                                            type="text" :value="iconFour? iconFour.name : ''">
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

    const repository = RepositoryFactory.get('home')


    export default {
        name: 'aboutUs',
        data() {
            return {
                isLoading: false,
                contentLang: 'en',
                data:{
                    title1: '',
                    description1: '',
                    title2: '',
                    description2: '',
                    title3: '',
                    description3: '',
                    title4: '',
                    description4: '',
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
                    label: this.$t('completeAll.chooseUs')
                }],
                image_base_url: null,
                iconOne: '',
                previewIconOne: '',
                iconTwo: '',
                iconThree: '',
                iconFour: '',
                previewIconTwo: '',
                previewIconThree: '',
                previewIconFour: '',
            };
        },

       components: {
            VueEditor,
        },
        created() {
            this.getContent(this.contentLang)
        },
        
        methods: {

            submitForm() {
                this.isLoading = true
                const formData = new FormData()
                this.data.title1 && formData.append('title1', this.data.title1)
                this.data.description1 && formData.append('description1', this.data.description1)
                this.data.title1 && formData.append('title2', this.data.title2)
                this.data.description1 && formData.append('description2', this.data.description2)
                this.data.title1 && formData.append('title3', this.data.title3)
                this.data.description1 && formData.append('description3', this.data.description3)
                this.data.title1 && formData.append('title4', this.data.title4)
                this.data.description1 && formData.append('description4', this.data.description4)
                this.contentLang && formData.append('lang', this.contentLang)
                this.iconOne && formData.append('icon1', this.iconOne)
                this.iconTwo && formData.append('icon2', this.iconTwo)
                this.iconThree && formData.append('icon3', this.iconThree)
                this.iconFour && formData.append('icon4', this.iconFour)                
                this.updateContent(formData)
            },


            langChanged(val){
                this.getContent(val)
            },

            async getContent(lang) {
                const {chooseUs} = await repository.getChooseUs(lang)
                if(chooseUs){
                    this.data.title1 = chooseUs.title1
                    this.data.title2 = chooseUs.title2
                    this.data.title3 = chooseUs.title3
                    this.data.title4 = chooseUs.title4
                    this.data.description1 = chooseUs.description1
                    this.data.description2 = chooseUs.description2
                    this.data.description3 = chooseUs.description3
                    this.data.description4 = chooseUs.description4
                    this.image_base_url = chooseUs.image_base_url
                    chooseUs.icon1 ? this.previewIconOne = chooseUs.icon1 : ''
                    chooseUs.icon2 ? this.previewIconTwo = chooseUs.icon2 : ''
                    chooseUs.icon3 ? this.previewIconThree = chooseUs.icon3 : ''
                    chooseUs.icon4 ? this.previewIconFour = chooseUs.icon4 : ''
                }
            },
            async updateContent(data) {
                const response = await repository.updateChooseUs(data)
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
                this.iconOne = event.target.files[0]
            },
             async uploadImageTwo (event) {
                this.iconTwo = event.target.files[0]
            },
             async uploadImageThree (event) {
                this.iconThree= event.target.files[0]
            },
             async uploadImageFour (event) {
                this.iconFour = event.target.files[0]
            },

        }
    }
</script>
