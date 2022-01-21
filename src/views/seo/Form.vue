<template>
    <div class="categories">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            <!-- {{$t('')}} -->
                            {{$t('completeAll.newKeyword')}}
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
                                        <b-input required type="text" placeholder="keyword" v-model="data.metaKey" />
                                    </b-field>
                                </div>
                                <!-- <div class="col-12">
                                    <b-field class="field-group">
                                        <b-input required type="text" placeholder="en name" v-model="data.enName" />
                                    </b-field>
                                </div> -->
                                <div class="col-12">
                                    <b-switch v-model="data.status" :true-value="1" :false-value="0"></b-switch>
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

    const repository = RepositoryFactory.get('seo')


    export default {
        name: 'currencyForm',
        data() {
            return {
                isLoading: false,
                allCurrencyRate: [],
                data:{
                    metaKey: '',
                    // enName: '',
                    status: 1,
                },

                breadcrumb: [{
                    link: '/keywords',
                    label: this.$t('completeAll.newKeyword')
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
                    'metaKeys': {keymeta1: this.data.metaKey} ,
                    // 'en': {name: this.data.enName} ,
                    'status': this.data.status,
                }
                if (this.$route.params.id) {
                    this.updateItem(this.$route.params.id, formData)
                } else {
                    this.newItem(formData)
                }
                
            },

            async newItem(data) {
                const item = await repository.newKeywords(data)
                if (item.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/keywords')
                } else {
                    this.errorMessage(item.message)
                }
                this.isLoading = false
            },

            async getItem(data) {
                const item = await repository.getItemShopping(data)
                
                if(item.PaymentMethoud){
                    this.data.status = item.PaymentMethoud.status? 1 : 0
                    this.data.enName = item.PaymentMethoud.trans[1].name
                    // this.data.arName = item.PaymentMethoud.trans[0].name
                }
            
            },
            async updateItem(id, data) {
                const item = await repository.updateItemShopping(id, data)
                if (item.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/keyword')
                } else {
                    this.errorMessage(item.message)
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
