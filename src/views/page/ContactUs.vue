<template>
    <div class="categories">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('completeAll.contactUs')}}
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
                                        <b-input type="text" placeholder="contact phone" v-model="data.contact_phone" />
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <b-field class="field-group">
                                        <b-input type="email" placeholder="contact email" v-model="data.contact_email" />
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <vue-editor
                                    :editorToolbar="toolbarEditor"
                                    v-model="data.contact_info"/>
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
        name: 'ContactUs',
        data() {
            return {
                isLoading: false,
                contentLang: 'en',
                data:{
                    contact_info: '',
                    contact_phone: '',
                    contact_email: '',
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
                    label: this.$t('completeAll.contactUs')
                }]
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
                this.data.contact_info && formData.append('contact_info', this.data.contact_info)
                this.data.contact_phone && formData.append('contact_phone', this.data.contact_phone)
                this.data.contact_email && formData.append('contact_email', this.data.contact_email)
                this.contentLang && formData.append('lang', this.contentLang)
                this.updateContent(formData)
            },

            langChanged(val){
                this.getContent(val)
            },

            async getContent(lang) {
                const data = await repository.getContactUs(lang)
                if(data){
                    this.data.contact_info = data.contact_info
                    this.data.contact_phone = data.contact_phone
                    this.data.contact_email = data.contact_email
                }
            },
            async updateContent(data) {
                const response = await repository.updateContactUs(data)
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
