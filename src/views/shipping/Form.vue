<template>
    <div class="categories">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('currencies')}}
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
                                        <b-input required type="text" placeholder="ar name" v-model="data.arName" />
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <b-field class="field-group">
                                        <b-input required type="text" placeholder="en name" v-model="data.enName" />
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <b-switch v-model="data.status" :true-value="1" :false-value="0"></b-switch>
                                </div>
                                <div class="col-12 mt-3">
                                    <label class="label">Options</label>
                                    <b-field class="field-group mb-2" v-for="(item, index) in currentOptions" :key="'current-' + index">
                                        <p class="control w-100">
                                            <b-input expanded placeholder="AR Name" disabled v-model="item.trans[0].name"></b-input>
                                        </p>
                                        <p class="control w-100">
                                            <b-input expanded placeholder="EN Name" disabled v-model="item.trans[1].name"></b-input>
                                        </p>
                                        <p class="control">
                                            <button type="button" class="button is-danger btn-small" @click="deleteCurrentOption(index, item.id)"><i class="fas fa-trash"></i></button>
                                        </p>
                                    </b-field>
                                    <b-field class="field-group mb-2" v-for="(item, index) in options" :key="index">
                                        <p class="control w-100">
                                            <b-input expanded placeholder="AR Name" v-model="item.ar"></b-input>
                                        </p>
                                        <p class="control w-100">
                                            <b-input expanded placeholder="EN Name" v-model="item.en"></b-input>
                                        </p>
                                        <p class="control">
                                            <button type="button" class="button is-danger btn-small" @click="deleteOption(index)"><i class="fas fa-trash"></i></button>
                                        </p>
                                    </b-field>
                                    <hr class="my-3">
                                    <button type="button" class="button" @click="addOptions">Add New Option</button>
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

    const repository = RepositoryFactory.get('shopping')


    export default {
        name: 'currencyForm',
        data() {
            return {
                isLoading: false,
                data:{
                    arName: '',
                    enName: '',
                    status: 1,
                },
                options: [],
                currentOptions: [],
                del_options: [],

                breadcrumb: [{
                    link: '/shippingMethoud',
                    label: 'shipping Methoud'
                }, {
                    link: '',
                    label: 'Add & update'
                }]
            };
        },       
        created() {
            if (this.$route.params.id) {
                this.getItem(this.$route.params.id)
            }
        },
        methods: {
            // Add New Category Button
            submitForm() {
                this.isLoading = true
                const formData = { 
                    'ar': {name: this.data.arName} ,
                    'en': {name: this.data.enName} ,
                    'status': this.data.status,
                }
                
                if (this.$route.params.id) {
                    formData['options']  = {}
                    if(this.options.length){
                        formData.options['new'] = this.options
                    }
                    if(this.del_options.length){
                        formData.options['del'] = this.del_options
                    }
                    this.updateItem(this.$route.params.id, formData)
                } else {
                    if(this.options.length){
                        formData['options'] = this.options
                    }
                    this.newItem(formData)

                }
                                
            },

            async newItem(data) {
                const item = await repository.newItemShipping(data)
                if (item.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/shippingMethoud')
                } else {
                    this.errorMessage(item.message)
                }
                this.isLoading = false
            },

            async getItem(data) {
                const item = await repository.getItemShipping(data)
                console.log('item', item.ShippingMethoud)
                
                if(item.ShippingMethoud){
                    this.data.arName = item.ShippingMethoud.trans[0].name
                    this.data.enName = item.ShippingMethoud.trans[1].name
                    this.data.status = item.ShippingMethoud.status? 1 : 0
                    this.currentOptions = item.ShippingMethoud.options
                }
            
            },
            async updateItem(id, data) {
                const item = await repository.updateItemShipping(id, data)
                if (item.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/shippingMethoud')
                } else {
                    this.errorMessage(item.message)
                }
                this.isLoading = false

            },

            // Add New Variant
            addOptions(){
                this.options.push({ar: '', en: ''})
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
