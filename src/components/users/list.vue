<template>
    <div>
        <item  v-for="user in data" :key="user.id" :user="user"
        @fetchAllItems="fetchAllItems"
        @checkboxUser="checkboxUserItems"
        :usersSelected="usersSelected"/>

        <template>
            <div class="all--actions" :class="{'show--action--bottom': usersSelected.length}">
                <div class="wrap--content">
                    <button class="button is-warning" @click="addNotifications()">Add User Notification</button>
                </div>
            </div>
        </template>

            <b-modal
                :has-modal-card="false"
                :active.sync="modalNotifications"
                :can-cancel="false"
                :width="600" scroll="keep"
                class="modal--custom">
                <div class="wrap--content p-4">
                    <b-tabs position="is-centered" class="block" v-model="activeTab">

                        <b-tab-item label="All Notifications">
                            <div class="mt-3">
                                <v-select :options="allNotifications" v-model="currentNotification" label="name"
                                    placeholder="select notification"
                                    class="select--with--icon w-100 v--select--scroll w-fuild-md">
                                    <template slot="option" slot-scope="option">
                                        {{ option.name }}
                                    </template>
                                </v-select>
                            </div>
                        </b-tab-item>
                        <b-tab-item label="Add Custom Notification">
                            <div class="mt-3">
                                <form class="mt-3 justify-content-center">
                                        <div class="row">
                                            <div class="col-6">
                                                <b-field class="field-group">
                                                    <b-input required type="text" placeholder="ar title" v-model="formData.arTitle" />
                                                </b-field>
                                            </div>
                                            <div class="col-6">
                                                <b-field class="field-group">
                                                    <b-input required type="text" placeholder="en title" v-model="formData.enTitle" />
                                                </b-field>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <b-field class="field-group">
                                                    <b-input type="textarea" rows="3" placeholder="ar body" v-model="formData.arBody" />
                                                </b-field>
                                            </div>
                                            <div class="col-6">
                                                <b-field class="field-group">
                                                    <b-input type="textarea" rows="3" placeholder="en body" v-model="formData.enBody" />
                                                </b-field>
                                            </div>
                                        </div>
                                        
                                        <div class="row">
                                            <div class="col-6">
                                                <b-field class="field-group">
                                                    <b-input placeholder="link" expanded v-model="formData.link" type="url"></b-input>
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
                                </form>
                            </div>
                        </b-tab-item>
                    </b-tabs>
                    
                    <div class="d-flex justify-content-lg-center mt-5">

                        <button type="button" v-show="activeTab === 0" class="button is-primary" @click="addUsersNotifications"> Add Notification </button>
                        <button type="button" v-show="activeTab === 1" class="button is-primary" @click="submitForm"> Add Notification </button>
                    </div>
                </div>

          </b-modal>

    </div>
</template>



<script>

import Item from './ListItem'
// Repository Data
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const repository = RepositoryFactory.get('notifications')

export default {
    props:['data', 'allUserSelected'],
    data () {
        return {
            usersSelected:[],
            allNotifications:[],
            modalNotifications: false,
            currentNotification: null,
            storeIcon: '',
            image_base_url: null,
            previewIcon: '',
            activeTab: 0,
            formData:{
                arTitle: '',
                enTitle: '',
                arBody: '',
                enBody: '',
                link: '',
            },
        };
    },
    components: {
        Item
    },
    created(){
        this.fetchAllNotidications()
    },
    watch:{
        allUserSelected(){
            if(this.allUserSelected){
                this.data.map(item => {
                    this.usersSelected.push(item.id)
                })
            } else {
                 this.usersSelected = []
            }
        },
        usersSelected(){
            if(this.usersSelected){
                this.$emit('checkButtonSelectAll', this.usersSelected)
            }
        }

    },
    methods:{
         checkboxUserItems(data){
             if(data.status == true){
                if(!this.usersSelected.indexOf(data.id) > -1){
                    this.usersSelected.push(data.id)
                }
            } else {
                if(this.usersSelected.indexOf(data.id) > -1){
                    for(var i = 0; i < this.usersSelected.length; i++){
                        if(this.usersSelected[i] == data.id){
                            this.usersSelected.splice(i, 1)
                        }
                    }
                }
            }

        },
        async addUsersNotifications(){
            const users = await repository.addUserNotification({users_id: this.usersSelected}, this.currentNotification? this.currentNotification.id : '')
            // this.$emit('fetchAllItems')
            if (users.status === 200) {
                this.successMessage('Successful')
                this.modalNotifications = false
            } else {
                this.errorMessage(users.message)
            }
            
        },

        async addNotifications() {
            this.modalNotifications = true
        },
         
        fetchAllItems(){
            this.$emit('fetchAllItems')
        },

         // Fetch All Items
        async fetchAllNotidications() {
            const data = await repository.getAllItems(1, 99999)
            let alldata = data.Notifications.rows;

            this.allNotifications = alldata.map(item => {
                return {id: item.id, name: item.trans.title}
            })
        },

        aleartMessage(textMessage){
            this.$snackbar.open({
                message: textMessage,
                type: 'is-success',
                position: 'is-bottom-right',
                actionText: 'OK',
                queue: false,
                duration: 3000,
                indefinite: false,
            })
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

        confirmCustomDelete(ids) {
            this.$dialog.confirm({
                title: this.$t('usersPage.messages.deleteUsers.title'),
                message: this.$t('usersPage.messages.deleteUsers.message'),
                confirmText: this.$t('usersPage.messages.deleteUsers.confirmText'),
                cancelText: this.$t('usersPage.messages.deleteUsers.cancelText'),
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => this.deleteUsers(ids)
            })
        },
        confirmCustomUpdate() {
            this.$dialog.confirm({
               title: this.$t('usersPage.messages.banUsers.title'),
                message: this.$t('usersPage.messages.banUsers.message'),
                confirmText: this.$t('usersPage.messages.banUsers.confirmText'),
                cancelText: this.$t('usersPage.messages.banUsers.cancelText'),
                type: 'is-primary',
                icon: 'information-outline',
                hasIcon: true,
                onConfirm: () => this.activeItems()
            })
        },

        submitForm() {
            const formData = new FormData()
            this.formData.arTitle && formData.append('ar.title', this.formData.arTitle)
            this.formData.enTitle && formData.append('en.title', this.formData.enTitle)
            this.formData.arBody && formData.append('ar.body', this.formData.arBody)
            this.formData.enBody && formData.append('en.body', this.formData.enBody)
            this.formData.link && formData.append('link', this.formData.link)
            this.storeIcon && formData.append('icon', this.storeIcon)
            this.usersSelected && formData.append('users_id', JSON.stringify(this.usersSelected))
            this.newItem(formData)
        },
        async newItem(data) {
            const item = await repository.addUserCustomNotification(data)
            if (item.status === 200) {
                this.successMessage('Successful')
                this.modalNotifications = false
            } else {
                this.errorMessage(item.message)
            }
        },
        // Handle Upload Image
            async onImageUploadIcon (event) {
            this.storeIcon = event.target.files[0]
        },
    }
}
</script>
