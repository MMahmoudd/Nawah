<template>
    <div class="groups">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            Form
                        </h1>

                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />

                    </div>

                </div>
            </div>
        </div>

        <div class="wrap--content">
            <div class="card--block">
                <!-- <div class="card--hreader">
                    <div class="card--header--title">
                          {{this.$route.params.id ? 'Update Group' : 'Add New Group'}}
                    </div>
               </div> -->
                <div class="card--content">
                    <form class="row mt-3 justify-content-center" @submit.prevent="submitForm()">
                        <div class="row mt-3 justify-content-center arabic-section">
                            <h3 class="col-12 col-md-10 col-lg-8 ">arabic feilds</h3>
                        <div class="col-12 col-md-10 col-lg-8 ">
                            <b-field class="field-group">
                                <b-input placeholder="ar name" 
                                    type="text" v-model="data.trans[0].name">
                                </b-input>
                            </b-field>
                        </div>
                        <div class="col-12 col-md-10 col-lg-8">
                            <b-field class="field-group">
                                <b-input placeholder="ar short name"
                                    type="text" v-model="data.trans[0].short_name">
                                </b-input>
                            </b-field>
                        </div>
                        </div>
                        <div class="row mt-3 justify-content-center english-section">
                            <h3 class="col-12 col-md-10 col-lg-8 ">english feilds</h3>
                        <div class="col-12 col-md-10 col-lg-8 ">
                            <b-field class="field-group">
                                <b-input placeholder="en name" 
                                    type="text" v-model="data.trans[1].name">
                                </b-input>
                            </b-field>
                        </div>
                        <div class="col-12 col-md-10 col-lg-8">
                            <b-field class="field-group">
                                <b-input placeholder="en short name"
                                    type="text" v-model="data.trans[1].short_name">
                                </b-input>
                            </b-field>
                        </div>
                        </div>
                        



                        <div class="col-12 text-center button--save--form mt-0">
                            <button class="button is-primary"
                                :class="{'is-loading': isLoading}">{{this.$route.params.id ? $t('saveChanges') : $t('add') }}</button>
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
    const repository = RepositoryFactory.get('orders')

    export default {
        name: 'assignForm',
        data() {
            return {
                data:{
                    trans: [
                        {
                            name: "",
                            short_name: ""
                        },
                        {
                            name: "",
                            short_name: ""
                        },
                    ]
                },
                
                putData: {
                    ar: {
                        name : "",
                        short_name: ""
                    },
                    en: {
                        name: "",
                        short_name: ""
                    }
                },
                isLoading: false,
                page: 1,
                limit: 10,
                groupStatus: 0,
                policies: [],
                roleStatus: [],
                selectPermissions: [],
                currentPermissions: [],
                permissions: [],
                allPermissions: [],
                breadcrumb: [{
                    link: '/order-status',
                    label: 'Status'
                }, {
                    link: '',
                    label: 'Form'
                }]

            };
        },

        created() {
            if (this.$route.params.id) {
                this.getAdmin(this.$route.params.id)
            }
        },

        methods: {
            async  submitForm() {
                this.isLoading = true
                const formData = { 
                    'ar.name': this.data.trans[0].name, 
                    'en.name': this.data.trans[1].name,
                    'ar.short_name':this.data.trans[0].short_name,
                    'en.short_name':this.data.trans[1].short_name,
                    }
                    if (this.$route.params.id) {
                    this.updateStatus(this.$route.params.id, formData)
                } else {
                    this.newItem(formData)
                }
            },


             async newItem(data) {
                const item = await repository.addStatus(data)
                if (item) {
                    this.$router.push('/order-status')
                }
                this.isLoading = false
            },

            async getAdmin(id) {
                const admin = await repository.getStatus(id)
                console.log(admin.deliveryOption.trans)
                this.data.trans[0].name = admin.deliveryOption.trans[0].name
                this.data.trans[0].short_name = admin.deliveryOption.trans[0].short_name
                this.data.trans[1].name = admin.deliveryOption.trans[1].name
                this.data.trans[1].short_name = admin.deliveryOption.trans[1].short_name

            },
            async updateStatus(id, data) {
                console.log('from page', data)
                const response = await repository.updateStatus(id, data)
                if (response.status === 200) {
                    console.log(response)
                    this.successMessage('Successful')
                    this.$router.push('/order-status')
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
