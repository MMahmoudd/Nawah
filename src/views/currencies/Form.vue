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
                                    <b-field class="field-group">
                                        <b-input required type="text" placeholder="ar short name" v-model="data.arShortName" />
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <b-field class="field-group">
                                       <b-input required type="text" placeholder="en short name" v-model="data.enShortName" />
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <b-field class="field-group flex-column">
                                        <v-select
                                            :clearable="false"
                                            :options="allCurrencyRate"
                                            v-model="data.currency_rate_id"
                                            label="code"
                                            placeholder="Currency Type"
                                            class="select--with--icon w-100 v--select--scroll"
                                        >
                                            <template slot="option" slot-scope="option">{{ option.code }}</template>
                                        </v-select>
                                    </b-field>
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

    const repository = RepositoryFactory.get('currencies')


    export default {
        name: 'currencyForm',
        data() {
            return {
                isLoading: false,
                allCurrencyRate: [],
                data:{
                    arName: '',
                    enName: '',
                    arShortName: '',
                    enShortName: '',
                    currency_rate_id: null,
                },

                breadcrumb: [{
                    link: '/currencies',
                    label: this.$t("currenciesPage.breadcrumb[0]")
                }, {
                    link: '',
                    label: this.$t("currenciesPage.breadcrumb[1]")
                }]
            };
        },       
        created() {
            if (this.$route.params.id) {
                this.getItem(this.$route.params.id)
            }
            this.getAllCurrenciesRate()      
        },
        methods: {
            // Add New Category Button
            submitForm() {
                this.isLoading = true
                const formData = { 
                    'ar.name': this.data.arName, 
                    'en.name': this.data.enName,
                    'ar.short_name': this.data.arShortName,
                    'en.short_name': this.data.enShortName,
                    }
                    if(this.data.currency_rate_id){
                        formData['currency_rate_id'] = this.data.currency_rate_id.id
                    }
                if (this.$route.params.id) {
                    this.updateItem(this.$route.params.id, formData)
                } else {
                    this.newItem(formData)
                }
                
            },

            async newItem(data) {
                const item = await repository.newItem(data)
                if (item.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/currencies')
                } else {
                    this.errorMessage(item.message)
                }
                this.isLoading = false
            },

            async getItem(data) {
                const item = await repository.getItem(data)
                if(item.Currency){
                    this.data.arName = item.Currency.trans[0].name
                    this.data.enName = item.Currency.trans[1].name
                    this.data.arShortName = item.Currency.trans[0].short_name
                    this.data.enShortName = item.Currency.trans[1].short_name
                }
            
            },
            async updateItem(id, data) {
                const item = await repository.updateItem(id, data)
                if (item.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/currencies')
                } else {
                    this.errorMessage(item.message)
                }
                this.isLoading = false

            },
            async getAllCurrenciesRate() {
                const item = await repository.getAllCurrenciesRate()
                this.allCurrencyRate = item.CurrencyRate

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
