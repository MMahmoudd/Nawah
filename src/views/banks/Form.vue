<template>
    <div class="groups">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{ $t('Assign')}}
                        </h1>

                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />

                    </div>

                </div>
            </div>
        </div>

        <div class="wrap--content">
            <div class="card--block">
                <div class="card--hreader">
                    <div class="card--header--title">
                          {{this.$route.params.id ? 'Update Bank' : 'Add New Bank'}}
                    </div>
               </div>
                <div class="card--content">
                    <form class="row mt-3 justify-content-center" @submit.prevent="submitForm()">
                        <div class="col-12 col-md-10 col-lg-8 ">
                            <b-field class="field-group">
                                <b-input placeholder="AR Name" 
                                    type="text" v-model="data.trans[0].name">
                                </b-input>
                            </b-field>
                            <b-field class="field-group">
                                <b-input placeholder="EN Name"
                                    type="text" v-model="data.trans[1].name">
                                </b-input>
                            </b-field>
                            <b-field class="field-group">
                                <b-input placeholder="sort" 
                                rows="4"
                                    type="text" v-model="data.sort">
                                </b-input>
                            </b-field>
                            <b-field class="field-group">
                                <b-input placeholder="number" 
                                rows="4"
                                    type="text" v-model="data.number">
                                </b-input>
                            </b-field>
                            <b-field class="field-group">
                                <b-input placeholder="iban" 
                                rows="4"
                                    type="text" v-model="data.iban">
                                </b-input>
                            </b-field>
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
    const repository = RepositoryFactory.get('banks')

    export default {
        name: 'BankForm',
        data() {
            return {
                data:{
                    id: null,
                    sort: null,
                    number: null,
                    iban: null,
                    status: false,
                    trans: [
                        {
                            name: "",
                        },
                        {
                            name: "",
                        }
                    ]
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
                    link: '/banks',
                    label: 'Banks'
                }, {
                    link: '',
                    label: 'bank Form'
                }]

            };
        },

        created() {
            if (this.$route.params.id) {
                this.getBank(this.$route.params.id)
            }
        },

        methods: {
            async  submitForm() {
                this.isLoading = true
                const formData = 
                    {
                        'ar.name': this.data.trans[0].name,
                        'en.name': this.data.trans[1].name,
                        'iban': this.data.iban,
                        'number': this.data.number,
                        'sort': this.data.sort
                    }
                
                if (this.$route.params.id) {
                    this.updateContent(this.$route.params.id, formData)
                } else {
                    this.newItem(formData)
                }
                
            },


             async newItem(data) {
                 console.log(data)
                const item = await repository.newBank(data)
                if (item.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/banks')
                } else {
                    this.errorMessage(item.message)
                }
                this.isLoading = false
            },

            async getBank(id) {
                const bank = await repository.getOneBank(id)
                console.log('bank', bank)
                this.data.sort = bank.Bank.sort
                this.data.iban = bank.Bank.iban
                this.data.number = bank.Bank.number
                this.data.trans[0].name = bank.Bank.trans[0].name
                this.data.trans[1].name = bank.Bank.trans[1].name

            },
            async updateContent(id, data) {
                const response = await repository.updateBank(id, data)
                if (response.status === 200) {
                    console.log(response)
                    this.successMessage('Successful')
                    this.$router.push('/banks')
                }
                this.isLoading = false
            },

            // async getAllPrivileges() {
            //     const allPermissions = await repository.getAllGroups(this.page, this.limit)
            //     this.allPermissions = allPermissions.rows
            //     setTimeout(() => {
            //         this.allPermissions.map(item=>{
            //         if(this.currentPermissions.includes(item.name)){
            //             this.permissions.push(item.id)
            //         }
            //     })
            //     }, 1500);
            // },

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
