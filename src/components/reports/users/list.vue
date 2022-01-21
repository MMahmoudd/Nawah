<template>
    <div>
        <item  v-for="user in data" :key="user.id" :user="user"
        @fetchAllItems="fetchAllItems"
        :usersSelected="usersSelected"/>
    </div>
</template>



<script>

import Item from './ListItem'
// Repository Data
import { RepositoryFactory } from '../../../repositories/RepositoryFactory'
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
    // created(){
    //     this.fetchAllNotidications()
    // },
    watch:{

    },
    methods:{   
        fetchAllItems(){
            this.$emit('fetchAllItems')
        },

        //  // Fetch All Items
        // async fetchAllNotidications() {
        //     const data = await repository.getAllItems(1, 99999)
        //     let alldata = data.Notifications.rows;

        //     this.allNotifications = alldata.map(item => {
        //         return {id: item.id, name: item.trans.title}
        //     })
        // },

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
