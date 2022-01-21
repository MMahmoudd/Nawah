<template>
    <div class="groups">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            Add New User
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
                                <b-input placeholder="email" 
                                rows="4"
                                    type="text" v-model="data.email">
                                </b-input>
                            </b-field>
                            <b-field class="field-group">
                                <b-input placeholder="phone" 
                                rows="4"
                                    type="text" v-model="data.phone">
                                </b-input>
                            </b-field>
                            <b-field class="field-group">
                                <b-input placeholder="password" 
                                rows="4"
                                    type="password" v-model="data.password">
                                </b-input>
                            </b-field>
                                <b-field class="field-group">
                                    <v-select
                                        :clearable="false"
                                        :options="['Male', 'Female']"
                                        v-model="data.gender"
                                        label="name"
                                        placeholder="Gender"
                                        class="v--select--scroll"
                                    >
                                        <template slot="option" slot-scope="option">{{ option.name }}</template>
                                    </v-select>
                                </b-field>
                            <b-field class="field-group">
                                <b-input placeholder="birthdate" 
                                rows="4"
                                    type="date" v-model="data.birthdate">
                                </b-input>
                            </b-field>
                            
                            <b-field class="field-group">
                                <b-input placeholder="addresses" 
                                rows="4"
                                    type="text" v-model="data.addresses">
                                </b-input>
                            </b-field>
                            <b-field class="field-group">
                                    <v-select
                                        :clearable="false"
                                        :options="countries"
                                        v-model="data.country"
                                        label="name"
                                        placeholder="country"
                                        class="v--select--scroll"
                                    >
                                        <template slot="option" slot-scope="option">{{ option.name }}</template>
                                    </v-select>
                                </b-field>
                            <b-field class="field-group">
                                <b-input placeholder="city" 
                                rows="4"
                                    type="text" v-model="data.city">
                                </b-input>
                            </b-field>

                            <!-- <b-field label="These roles that this person has">
                                <div v-for="(item) in roleStatus" :key="item">
                                    <p style="d-block">
                                        ( {{item}} )
                                    </p>
                                </div>
                            </b-field> -->
                            <!-- <div class="error">{{errorMessege}}</div> -->
                        </div>
                        

                        <!-- <div class="col-12 col-md-10 col-lg-8 checkbox--group permissions--items">
                            <div class="row align-items-center">
                                <div class="col-12 col-sm-6">
                                    <h3>
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
                        </div> -->
                                <!-- :class="{'is-loading': isLoading}" -->
                        <div class="col-12 text-center button--save--form mt-0">
                            <button class="button is-primary"
                                @click="addUser(data)">{{this.$route.params.id ? $t('saveChanges') : $t('add') }}</button>
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
    const countriesRepository = RepositoryFactory.get('countries')

    export default {
        name: 'addUser',
        data() {
            return {
                data:{
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    user_type: 'admin',
                    birthdate: '',
                    gender: '',
                    addresses: '',
                    country: '',
                    city: ''
                },
                countries: [],
                errorMessege: '',
                
                isLoading: false,
                page: 1,
                limit: 10,
                groupStatus: 0,
                // policies: [],
                // roleStatus: [],
                // selectPermissions: [],
                // currentPermissions: [],
                // permissions: [],
                // allPermissions: [],
                breadcrumb: [{
                    link: '/admins',
                    label: 'Admins'
                }, {
                    link: '',
                    label: 'Add User'
                }]

            };
        },

        created() {
            // if (this.$route.params.id) {
            //     this.getAdmin(this.$route.params.id)
            // }
            // this.getAllPrivileges()
            this.fetchAllCountries()
        },

        methods: {
            async  submitForm() {
                this.isLoading = true
                this.permissions
                this.updateContent(this.$route.params.id, this.permissions)
            },
            async addUser(data) {
                console.log(data)
                const formData = {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    user_type: 'admin',
                    birthdate: data.birthdate,
                    gender: data.gender,
                    addresses: data.addresses,
                    country: data.country.id,
                    city: data.city
                }
                const addUser = await repository.addUser(formData)
                if (addUser.status === 200) {
                   this.successMessage('Successful')
                    this.$router.push('/admins')
                } else {
                    this.errorMessage(addUser.message)
                }
                console.log('addUser', addUser)

            },
            async fetchAllCountries() {
                this.dataLoading = true
                const countries = await countriesRepository.getAllItems(1, 100)
                this.countries = countries.Geographies.rows;
                let allCountries = []
                countries.Geographies.rows.map(cuntory => {
                    allCountries.push({id: cuntory.id, name: cuntory.trans.name})
                })
                this.countries = allCountries
                console.log(`this.countries`, this.countries)

                this.dataLoading = false;
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

            // async getAdmin(id) {
            //     const admin = await repository.getAdmin(id)
            //     this.data.name = admin.name
            //     this.data.email = admin.email
            //     this.data.phone = admin.phone
            //     this.roleStatus = admin.roles
            //     this.currentPermissions = admin.roles

            // },
            // async updateContent(id, data) {
            //     const response = await repository.updateUserRole(id, data)
            //     if (response.status === 200) {
            //         console.log(response)
            //         this.successMessage('Successful')
            //         this.$router.push('/admins')
            //     }
            //     this.isLoading = false
            // },

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
