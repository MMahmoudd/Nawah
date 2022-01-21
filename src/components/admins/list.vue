<template>
    <div>
        <div class="block--item" v-for="item in data" :key="item.id">
        <div class="row align-items-center">
            <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="block--item--title d-flex align-items-center item--text">
                        <div class="text--title">
                            {{item.id}}
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="block--item--title d-flex align-items-center item--text">
                        <div class="text--title">
                            <p v-bind:item="'item.name'">{{item.name}}</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="item--text">
                        <p v-bind:item="'item.email'">{{item.email}}</p>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-xl table--item">
                <div class="item--text">
                    <span class="icon">
                        <i class="fas fa-phone"></i>
                    </span>
                    <p v-bind:item="'item.phone'">{{item.phone}}</p>
                </div>
            </div>

                <div class="col-12 col-sm-12 col-xl item--text table--item">
                    <div class="all--item--action d-flex align-item-center">
                        <div class="all--item--action d-flex align-item-center">
                            <router-link :to="'/adminForm/' + item.id"  class="button--circle is-primary-light"><i class="fas fa-pen"></i></router-link>
                            <button class="button--circle is-danger-light" @click="deleteItem(item.id)"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    </div>
</template>



<script>
// Repository Data
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const repository = RepositoryFactory.get('users')

export default {
    props:['data'],
    data () {
            return {
                
            };
        },
    methods:{
        async deleteGroups(id) {
            const groups = await repository.deleteGroup(id)
            this.$emit('fetchAllItems')
            // this.aleartMessage(groups.message)
        },
        fetchAllItems(){
            this.$emit('fetchAllItems')
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
        confirmCustomDelete(ids) {
            this.$dialog.confirm({
                title: this.$t('groupsPage.messages.deleteGroups.title'),
                message: this.$t('groupsPage.messages.deleteGroups.message'),
                confirmText: this.$t('groupsPage.messages.deleteGroups.confirmText'),
                cancelText: this.$t('groupsPage.messages.deleteGroups.cancelText'),
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => this.deleteGroups(ids)
            })
        },
        deleteItem(id) {
                this.confirmCustomDelete(id)
            },
           
            async deleteGroup(id) {
                const group = await groupsRepository.deleteGroup(id)
                this.$emit('fetchAllItems')
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


            aleartMessage(textMessage) {
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
            confirmCustomDelete(id) {
                this.$dialog.confirm({
                    title: this.$t('groupsPage.messages.deleteGroup.title'),
                    message: this.$t('groupsPage.messages.deleteGroup.message'),
                    confirmText: this.$t('groupsPage.messages.deleteGroup.confirmText'),
                    cancelText: this.$t('groupsPage.messages.deleteGroup.cancelText'),
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deleteGroup(id)
                })
            }
    }
}
</script>
