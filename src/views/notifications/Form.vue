<template>
    <div class="categories">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            Notifications
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
                                        <b-input required type="text" placeholder="ar title" v-model="data.arTitle" />
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <b-field class="field-group">
                                        <b-input required type="text" placeholder="en title" v-model="data.enTitle" />
                                    </b-field>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <b-field class="field-group">
                                        <b-input type="textarea" rows="4" placeholder="ar body" v-model="data.arBody" />
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <b-field class="field-group">
                                        <b-input type="textarea" rows="4" placeholder="en body" v-model="data.enBody" />
                                    </b-field>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-12">
                                    <b-field class="field-group">
                                        <v-select :options="['basic', 'custom']" :clearable="false" v-model="data.type" label="name" placeholder="Type"
                                            class="select--with--icon w-100 v--select--scroll">
                                            <template slot="option" slot-scope="option">
                                                {{ option.name }}
                                            </template>
                                        </v-select>
                                    </b-field>
                                </div>
                                <div class="col-6">
                                    <b-field class="field-group">
                                        <b-input placeholder="link" expanded v-model="data.link" type="url"></b-input>
                                    </b-field>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <div class="square--photo field-group mt-3" v-if="previewIcon && !storeIcon">
                                        <img :src="image_base_url + previewIcon" class="avatar-l">
                                    </div>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="icon" disabled
                                            type="text" :value="storeIcon? storeIcon.name : ''">
                                        </b-input>
                                        <p class="control">
                                            <button type="button" 
                                             @click="$refs.uploadIconImage.click()"
                                             class="button is-info">Upload</button>
                                        </p>
                                    </b-field>
                                    <input type="file" hidden @change="onImageUploadIcon" ref="uploadIconImage">
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

    const repository = RepositoryFactory.get('notifications')


    export default {
        name: 'notificationForm',
        data() {
            return {
                isLoading: false,
                // handle image
                storeIcon: '',
                image_base_url: null,
                previewIcon: '',
               
                data:{
                    arTitle: '',
                    enTitle: '',
                    arBody: '',
                    enBody: '',
                    link: '',
                    type: 'custom',
                },

                breadcrumb: [{
                    link: '/notifications',
                    label: 'Notifications'
                }, {
                    link: '',
                    label: 'Add & Update Notification'
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
                 const formData = new FormData()
                this.data.arTitle && formData.append('ar.title', this.data.arTitle)
                this.data.enTitle && formData.append('en.title', this.data.enTitle)
                this.data.arBody && formData.append('ar.body', this.data.arBody)
                this.data.enBody && formData.append('en.body', this.data.enBody)
                this.data.link && formData.append('link', this.data.link)
                this.storeIcon && formData.append('icon', this.storeIcon)
                this.data.type && formData.append('type', this.data.type)
                formData.append('payload', JSON.stringify({"data":"data"}))

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
                    this.$router.push('/notifications')
                } else {
                    this.errorMessage(item.message)
                }
                this.isLoading = false
            },

            async getItem(data) {
                const item = await repository.getItem(data)
                if(item.Store){
                    this.image_base_url = item.Store.image_base_url
                    this.data.arTitle = item.Store.trans[0].title
                    this.data.enTitle = item.Store.trans[1].title
                    if(item.Store.trans[0].image){
                        this.previewIcon = item.Store.trans[0].image
                    }
                    if(item.Store.trans[1].image){
                        this.previewImageEn = item.Store.trans[1].image
                    }
                    
                }
                
            
            },
            async updateItem(id, data) {
                const item = await repository.updateItem(id, data)
                if (item.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/notifications')
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
            // Handle Upload Image
             async onImageUploadIcon (event) {
                this.storeIcon = event.target.files[0]
            },
        }
    }
</script>
