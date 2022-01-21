<template>
    <div class="categories">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            Keywords
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
                                    <b-taginput
                                        v-model="data.keywords"
                                        autocomplete
                                        :allow-new="true"
                                        :open-on-focus="true"
                                        icon="label"
                                        placeholder="Add a keyword" >
                                    </b-taginput>
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
        name: 'Keywords',
        data() {
            return {
                isLoading: false,
                contentLang: 'en',
                data:{
                    title: '',
                    keywords: [],
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
                    label: 'Keywords'
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
                console.log(`this.data`, this.data)
                this.isLoading = true
                const formData = new FormData()
                this.data.keywords.length && formData.append('metaKeys', JSON.stringify(this.data.keywords))
                this.contentLang && formData.append('lang', this.contentLang)
                this.updateContent(formData)
            },

            langChanged(val){
                this.getContent(val)
            },

            async getContent(lang) {
                const data = await repository.getKeywords(lang)
                console.log('data', data)
                if(data){
                    this.data.keywords = data
                }
            },
            async updateContent(data) {
                const response = await repository.updateKeywords(data)
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
