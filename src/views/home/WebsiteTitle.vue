<template>
    <div class="aboutUs">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('completeAll.websiteTitleAndIcon')}}
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
                                    <b-field class="field-group flex-column" label="Title">
                                        <b-input type="text" v-model="data.web_title" />
                                    </b-field>
                                </div>
                                <div class="col-12 col-lg-8 offset-2">
                                    <div class="square--photo square--photo-placeholder field-group ">
                                        <img :src="image_base_url + previewImageOne" class="avatar-l" v-if="previewImageOne && !imageOne">
                                    </div>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="Icon" disabled
                                            type="text" :value="imageOne? imageOne.name : ''">
                                        </b-input>
                                        <p class="control">
                                            <button type="button" 
                                             @click="$refs.uploadImageOne.click()"
                                             class="button is-info">{{$t('completeAll.update')}}</button>
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
    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'

    const repository = RepositoryFactory.get('home')
    export default {
        name: 'websiteTitle',
        data() {
            return {
                isLoading: false,
                data:{
                    web_title: '',
                    websiteIcon: ''
                },
                categories: [],
                breadcrumb: [{
                    link: '',
                    label: this.$t('completeAll.websiteTitleAndIcon')
                }],
                image_base_url: null,
                imageOne: '',
                previewImageOne: '',
            };
        },

        created() {
            this.getContent()
        },
        
        methods: {

            submitForm() {
                this.isLoading = true
                const formData = new FormData()
                this.data.web_title && formData.append('web_title', this.data.web_title)
                this.imageOne && formData.append('web_icon', this.imageOne)
                this.updateContent(formData)
            },

            async getContent() {
                const Preference = await repository.getPreferences()
                if(Preference){
                    this.data.web_title = Preference.Preference.web_title
                    this.image_base_url = Preference.image_base_url
                    this.previewImageOne = Preference.Preference.web_icon
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

            
            // Handle Upload Image
             async uploadImageOne (event) {
                this.imageOne = event.target.files[0]
            },

        }
    }
</script>
