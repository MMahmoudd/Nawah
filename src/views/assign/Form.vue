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
                <!-- <div class="card--hreader">
                    <div class="card--header--title">
                          {{this.$route.params.id ? 'Update Group' : 'Add New Group'}}
                    </div>
               </div> -->
                <div class="card--content">
                    <form class="row mt-3 justify-content-center" @submit.prevent="submitForm()">
                        <div class="col-12 col-md-10 col-lg-8 ">
                            <b-field class="field-group">
                                <b-input placeholder="name" 
                                    type="text" v-model="data.name" disabled>
                                </b-input>
                            </b-field>
                            <b-field class="field-group">
                                <b-input placeholder="email" 
                                rows="4"
                                    type="text" v-model="data.email" disabled>
                                </b-input>
                            </b-field>
                            <b-field class="field-group">
                                <b-input placeholder="phone" 
                                rows="4"
                                    type="text" v-model="data.phone" disabled>
                                </b-input>
                            </b-field>

                            <b-field label="These roles that this person has">
                                <div v-for="(item) in roleStatus" :key="item">
                                    <p style="d-block">
                                        ( {{item}} )
                                    </p>
                                </div>
                            </b-field>
                        </div>
                        

                        <div class="col-12 col-md-10 col-lg-8 checkbox--group permissions--items">
                            <div class="row align-items-center">
                                <div class="col-12 col-sm-6">
                                    <h3>
                                        <!-- {{ $t('groupsPage.addPermissionsToGroup')}} -->
                                        add Roles To Admin
                                    </h3>
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                
                                <div class="col-12">
                                    <div class="permissions--item" v-for="(value) in allPermissions" :key="value">
                                        <div class="row">
                                            <div
                                                class="col-12 col-sm-6 col-md-8 col-lg-9 col-xl-10 permission--content">
                                                <div class="item-checkbox checkbox--switch">
                                                    <b-checkbox-button v-model="permissions" :native-value="value.id"
                                                        type="is-light">
                                                        <span>
                                                            {{value.name}}
                                                        </span>
                                                        <span class="switch--item">
                                                            <span class="check"></span>
                                                        </span>
                                                    </b-checkbox-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
    const repository = RepositoryFactory.get('users')

    export default {
        name: 'assignForm',
        data() {
            return {
                data:{
                    name: '',
                    email: '',
                    phone: ''
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
                    link: '/admins',
                    label: 'Admins'
                }, {
                    link: '',
                    label: 'assignForm'
                }]

            };
        },

        created() {
            if (this.$route.params.id) {
                this.getAdmin(this.$route.params.id)
            }
            this.getAllPrivileges()
        },

        methods: {
            async  submitForm() {
                this.isLoading = true
                this.permissions
                this.updateContent(this.$route.params.id, this.permissions)
            },


            //  async newItem(data) {
            //     const item = await repository.newGroup(data)
            //     if (item.status === 200) {
            //         this.successMessage('Successful')
            //         this.$router.push('/assign')
            //     } else {
            //         this.errorMessage(item.message)
            //     }
            //     this.isLoading = false
            // },

            async getAdmin(id) {
                const admin = await repository.getAdmin(id)
                this.data.name = admin.name
                this.data.email = admin.email
                this.data.phone = admin.phone
                this.roleStatus = admin.roles
                this.currentPermissions = admin.roles

            },
            async updateContent(id, data) {
                const response = await repository.updateUserRole(id, data)
                if (response.status === 200) {
                    console.log(response)
                    this.successMessage('Successful')
                    this.$router.push('/admins')
                }
                this.isLoading = false
            },

            async getAllPrivileges() {
                const allPermissions = await repository.getAllGroups(this.page, this.limit)
                this.allPermissions = allPermissions.rows
                setTimeout(() => {
                    this.allPermissions.map(item=>{
                    if(this.currentPermissions.includes(item.name)){
                        this.permissions.push(item.id)
                    }
                })
                }, 1500);
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
