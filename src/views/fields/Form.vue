<template>
    <div class="categories">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('fields')}}
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
                                    <b-field class="field-group">
                                        <b-input required type="text" placeholder="ar title" v-model="field.arTitle" />
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <b-field class="field-group">
                                        <b-input required type="text" placeholder="en title" v-model="field.enTitle" />
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <b-field class="field-group">
                                        <b-input required type="text" placeholder="Sort" v-model="field.sort" />
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <label class="label">Options</label>
                                    <b-field class="field-group mb-2" v-for="(item, index) in currentOptions" :key="index">
                                        <p class="control w-100">
                                            <b-input expanded placeholder="AR Name" id="item.trans[0].id" @input="editOptionsFun(item.trans[0])" v-model="item.trans[0].name"></b-input>
                                        </p>
                                        <p class="control w-100">
                                            <b-input expanded placeholder="EN Name" id="item.trans[1].id" @input="editOptionsFun(item.trans[1])" v-model="item.trans[1].name"></b-input>
                                        </p>
                                        <p class="control w-100">
                                            <b-input expanded placeholder="Info" id="item.id" @input="editOptionsInfoFun(item)" v-model="item.info"></b-input>
                                        </p>
                                        <p class="control">
                                            <button type="button" class="button is-danger btn-small" @click="deleteCurrentOption(index, item.id)"><i class="fas fa-trash"></i></button>
                                        </p>
                                    </b-field>
                                    <b-field class="field-group mb-2" v-for="(item, index) in options" :key="index">
                                        <p class="control w-100">
                                            <b-input expanded placeholder="AR Name"  v-model="item.ar"></b-input>
                                        </p>
                                        <p class="control w-100">
                                            <b-input expanded placeholder="EN Name" v-model="item.en"></b-input>
                                        </p>
                                        <p class="control w-100">
                                            <b-input expanded placeholder="Info" v-model="item.info"></b-input>
                                        </p>
                                        <p class="control">
                                            <button type="button" class="button is-danger btn-small" @click="deleteOption(index)"><i class="fas fa-trash"></i></button>
                                        </p>
                                    </b-field>
                                    <hr class="my-3">
                                    <button type="button" class="button" @click="addVariant">Add New Option</button>
                                </div>
                            </div>                                                        
                        </div>

                        <div class="col-12 text-center button--save--form">
                            <button class="button is-primary"
                                :class="{'is-loading': isLoading}">{{this.$route.params.id ? $t('saveChanges') : $t('add')}}</button>
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

    const fieldsRepository = RepositoryFactory.get('fields')

    export default {
        name: 'fieldForm',
        data() {
            return {
                isLoading: false,
                options: [],
                currentOptions: [],
                del_options: [],
                editOptionObj: {},
                editOptionInfoObj: {},
                field:{
                    arTitle: '',
                    enTitle: '',
                    sort: null,
                },
                breadcrumb: [{
                    link: '/fields',
                    label: this.$t("fieldsPage.breadcrumb[0]")
                }, {
                    link: '',
                    label: this.$t("fieldsPage.breadcrumb[1]")
                }]
            };
        },

        created() {
            if (this.$route.params.id) {
                this.getField(this.$route.params.id)
            }            
        },
        methods: {
            editOptionsFun(item) {
                this.editOptionObj[item.id]=item.name
                console.log(this.editOptionObj)
            },
            editOptionsInfoFun(item) {
                this.editOptionInfoObj[item.id]=item.info
                console.log(this.editOptionInfoObj)
            },
            // Add New Category Button
            submitForm() {
                this.isLoading = true
                const formData = {'ar.name': this.field.arTitle, 'en.name': this.field.enTitle, 'sort': this.field.sort}

                if (this.$route.params.id) {
                    if(this.currentOptions.length){
                       console.log('optData', this.editOptionObj)
                        formData['edit_options'] = this.editOptionObj
                    }
                    if(this.currentOptions.length){
                       console.log('optData', this.editOptionInfoObj)
                        formData['edit_options_info'] = this.editOptionInfoObj
                    }
                    if(this.options.length){
                        formData['new_options'] = this.options
                    }
                    if(this.del_options.length){
                        formData['del_options'] = this.del_options
                    }
                    this.updateField(this.$route.params.id, formData)
                } else {
                    if(this.options.length){
                        formData['options'] = this.options
                    }
                    this.newfield(formData)
                }
                
            },

            async newfield(data) {
                const field = await fieldsRepository.newField(data)
                if (field.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/fields')
                } else {
                    this.errorMessage(field.message)
                }
                this.isLoading = false
            },

            async getField(data) {
                const field = await fieldsRepository.getField(data)
                console.log(field)
                if(field.Field){
                    this.field.arTitle = field.Field.trans[0].name
                    this.field.enTitle = field.Field.trans[1].name
                    this.field.sort = field.Field.sort
                    this.currentOptions = field.Field.options
                }
            
            },
            async updateField(id, data) {
                console.log('update data', data)
                const field = await fieldsRepository.updateField(id, data)
                if (field.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/fields')
                } else {
                    this.errorMessage(field.message)
                }
                this.isLoading = false

            },

             // Add New Variant
            addVariant(){
                this.options.push({ar: '', en: '', sort:'', info: ''})
            },
            
            deleteCurrentOption(index, id){
                this.del_options.push(id)
                this.currentOptions.splice(index, 1)
            },
            deleteOption(index){
                this.options.splice(index, 1)
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
