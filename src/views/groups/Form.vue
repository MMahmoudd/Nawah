<template>
    <div class="groups">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{ $t('groups')}}
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
                                    type="text" v-model="data.name">
                                </b-input>
                            </b-field>
                            <b-field class="field-group">
                                <b-input placeholder="description" 
                                rows="4"
                                    type="textarea" v-model="data.description">
                                </b-input>
                            </b-field>
                        </div>
                        

                        <div class="col-12 col-md-10 col-lg-8 checkbox--group permissions--items">
                            <div class="row align-items-center">
                                <div class="col-12 col-sm-6">
                                    <h3>
                                        {{ $t('groupsPage.addPermissionsToGroup')}}
                                    </h3>
                                </div>
                                <!-- <div class="col-12 col-sm-6 text-center text-sm-right">
                                    <button class="button my-3 mr-2" v-if="permissions.length" type="button"
                                        @click="unSelectAllPermissions">
                                        {{$t('unselectAll')}}
                                    </button>
                                    <button class="button my-3" type="button" @click="selectAllPermissions">
                                        {{$t('selectAll')}}
                                    </button>

                                </div> -->
                            </div>
                            <div class="row justify-content-center">
                                
                                <div class="col-12">
                                    <div class="permissions--item" v-for="(value , name) in allPermissions" :key="name">
                                        <div class="row">
                                            <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 permission--title">
                                                {{name}}
                                            </div>
                                            <div
                                                class="col-12 col-sm-6 col-md-8 col-lg-9 col-xl-10 permission--content">
                                                <div class="item-checkbox checkbox--switch"
                                                    v-for="(checkLabel , checkValue) in value" :key="checkLabel">
                                                    <b-checkbox-button v-model="permissions" :native-value="checkValue"
                                                        type="is-light">
                                                        <span>
                                                            {{checkLabel}}
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
    const groupsRepository = RepositoryFactory.get('groups')
    export default {
        name: 'groupForm',
        data() {
            return {
                data:{
                    name: '',
                    description: '',
                },
                
                isLoading: false,
                groupStatus: 0,
                policies: [],
                selectPermissions: [],
                permissions: [],
                allPermissions: [],
                breadcrumb: [{
                    link: '/groups',
                    label: this.$t('groupsPage.breadcrumb[0]')
                }, {
                    link: '',
                    label: this.$t('groupsPage.breadcrumb[1]')
                }]

            };
        },

        created() {
            if (this.$route.params.id) {
                this.getGroup(this.$route.params.id)
            }
            this.getAllPrivileges()
        },

        methods: {
            selectAllPermissions() {
                this.permissions = []
                for (let category in this.allPermissions) {
                    for (let item in this.allPermissions[category]) {
                        this.permissions.push(item)
                    }
                }
            },
            unSelectAllPermissions() {
                this.permissions = []
            },

             submitForm() {
                this.isLoading = true
                const formData = {}
                this.data.name? formData['name'] = this.data.name : ''
                this.data.description ? formData['description'] = this.data.description  : ''
                this.permissions ? formData['permissions'] = this.permissions  : ''
                if (this.$route.params.id) {
                    this.updateContent(this.$route.params.id, formData)
                } else {
                    this.newItem(formData)
                }
            },


             async newItem(data) {
                const item = await groupsRepository.newGroup(data)
                if (item.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/groups')
                } else {
                    this.errorMessage(item.message)
                }
                this.isLoading = false
            },

            async getGroup(data) {
                const group = await groupsRepository.getGroup(data)
                this.data.name = group.name
                this.data.description = group.description
                // this.roleStatus = group.status
                this.permissions = group.permission

            },
            async updateContent(id, data) {
                const response = await groupsRepository.updateGroup(id, data)
                if (response.status === 200) {
                    this.successMessage('Successful')
                }
                this.isLoading = false
            },

            async getAllPrivileges() {
                const allPermissions = await groupsRepository.getAllPrivileges()
                this.allPermissions = allPermissions
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
