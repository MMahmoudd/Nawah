<template>
    <div class="categories">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('completeAll.socialLinks')}}
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
                            
                            <b-field class="field-group" label="Facebook">
                                <b-input type="text" placeholder="facebook" v-model="data.facebook" />
                            </b-field>
                            <b-field class="field-group" label="Twitter">
                                <b-input type="text" placeholder="twitter" v-model="data.twitter" />
                            </b-field>
                            <b-field class="field-group" label="Instagram">
                                <b-input type="text" placeholder="instagram" v-model="data.instagram" />
                            </b-field>
                            <b-field class="field-group" label="Youtube">
                                <b-input type="text" placeholder="youtube" v-model="data.youtube" />
                            </b-field>
                                                                             
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

    const repository = RepositoryFactory.get('pages')

    export default {
        name: 'social',
        data() {
            return {
                isLoading: false,
                data:{
                    facebook: '',
                    twitter: '',
                    instagram: '',
                    youtube: '',
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
                    label: this.$t('completeAll.socialLinks')
                }]
            };
        },

        created() {
            this.getContent()
        },
        
        methods: {

            // Add New Category Button
            submitForm() {
                this.isLoading = true
                const formData = new FormData()
                this.data.facebook && formData.append('facebook', this.data.facebook)
                this.data.twitter && formData.append('twitter', this.data.twitter)
                this.data.instagram && formData.append('instagram', this.data.instagram)
                this.data.youtube && formData.append('youtube', this.data.youtube)
                this.updateContent(formData)
            },

            langChanged(val){
                this.getContent(val)
            },

            async getContent() {
                const data = await repository.getSocial()
                if(data){
                    this.data.facebook = data.facebook
                    this.data.twitter = data.twitter
                    this.data.instagram = data.instagram
                    this.data.youtube = data.youtube
                }
            },
            async updateContent(data) {
                const response = await repository.updateSocial(data)
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

        }
    }
</script>
