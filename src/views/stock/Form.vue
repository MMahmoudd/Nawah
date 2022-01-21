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
                          {{this.$route.params.id ? 'Update Stock' : 'Add New Stock'}}
                    </div>
               </div>
                <div class="card--content">
                    <form class="row mt-3 justify-content-center" @submit.prevent="submitForm()">
                        <div class="col-12 col-md-10 col-lg-8 ">
                            <b-field class="field-group">
                                <b-input placeholder="title" 
                                    type="text" v-model="data.title">
                                </b-input>
                            </b-field>
                            <b-field class="field-group">
                                <b-input placeholder="column number" 
                                rows="4"
                                    type="text" v-model="data.column_number">
                                </b-input>
                            </b-field>
                            <b-field class="field-group">
                                <b-input placeholder="row number" 
                                rows="4"
                                    type="text" v-model="data.row_number">
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
    const repository = RepositoryFactory.get('stocks')

    export default {
        name: 'stockForm',
        data() {
            return {
                data:{
                    title: '',
                    column_number: '',
                    row_number: '',
                    status: true,
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
                    link: '/stock',
                    label: 'stocks'
                }, {
                    link: '',
                    label: 'stockForm'
                }]

            };
        },

        created() {
            if (this.$route.params.id) {
                this.getStock(this.$route.params.id)
            }
        },

        methods: {
            async  submitForm() {
                this.isLoading = true
                if (this.$route.params.id) {
                    this.updateContent(this.$route.params.id, this.data)
                } else {
                    this.newItem(this.data)
                }
                
            },


             async newItem(data) {
                 console.log(data)
                const item = await repository.newStock(data)
                if (item.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/stock')
                } else {
                    this.errorMessage(item.message)
                }
                this.isLoading = false
            },

            async getStock(id) {
                const stock = await repository.getOneStock(id)
                console.log('stockByID', stock)
                this.data.title = stock.Stock.title
                this.data.column_number = stock.Stock.column_number
                this.data.row_number = stock.Stock.row_number

            },
            async updateContent(id, data) {
                const response = await repository.updateStock(id, data)
                if (response.status === 200) {
                    console.log(response)
                    this.successMessage('Successful')
                    this.$router.push('/stock')
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
