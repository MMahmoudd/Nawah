<template>
    <div class="aboutUs">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('completeAll.mobileLinks')}}
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
                                    <b-field class="field-group flex-column" :label="$t('completeAll.WebIosLink')">
                                        <b-input type="text" v-model="data.web_ios_link" />
                                    </b-field>
                                </div>                                
                                <div class="col-12">
                                    <b-field class="field-group flex-column" :label="$t('completeAll.WebAndroidLink')">
                                        <b-input type="text" v-model="data.web_android_link" />
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

    const repository = RepositoryFactory.get('home')
    export default {
        name: 'mobileLinks',
        data() {
            return {
                isLoading: false,
                data:{
                    web_ios_link: '',
                    web_android_link: ''
                },
                breadcrumb: [{
                    link: '',
                    label: this.$t('completeAll.mobileLinks')
                }],
            };
        },

        created() {
            this.getContent()
        },
        
        methods: {

            submitForm() {
                this.isLoading = true
                const formData = new FormData()
                this.data.web_ios_link && formData.append('web_ios_link', this.data.web_ios_link)
                this.data.web_android_link && formData.append('web_android_link', this.data.web_android_link)
                this.updateContent(formData)
            },

            async getContent() {
                const Preference = await repository.getPreferences()
                if(Preference){
                    this.data.web_ios_link = Preference.Preference.web_ios_link
                    this.data.web_android_link = Preference.Preference.web_android_link
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
            
            // Handle Upload Image
             async uploadImageOne (event) {
                this.imageOne = event.target.files[0]
            },

        }
    }
</script>
