<template>
    <div class="categories">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            Policy
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
                                    <label class="label">policy</label>
                                    <vue-editor
                                    :editorToolbar="toolbarEditor"
                                    v-model="data.policy"/>
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
        name: 'policy',
        data() {
            return {
                isLoading: false,
                contentLang: 'en',
                data:{
                    policy: '',
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
                    label: 'Policy'
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
                this.data.policy && formData.append('policy', this.data.policy)
                this.contentLang && formData.append('lang', this.contentLang)
                this.updateContent(formData)
            },

            langChanged(val){
                this.getContent(val)
            },

            async getContent(lang) {
                const data = await repository.getPolicy(lang)
                if(data){
                    this.data.policy = data.policy
                }
            },
            async updateContent(data) {
                const response = await repository.updatePolicy(data)
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
