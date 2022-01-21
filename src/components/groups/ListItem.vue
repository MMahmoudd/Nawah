<template>
    <div class="block--item">
        <div class="row align-items-center">
                <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="block--item--title d-flex align-items-center item--text">
                        <div class="text--title">
                            {{item.name}}
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="item--text">
                        {{item.description}}
                    </div>
                </div>

                <div class="col-12 col-sm-12 col-xl item--text table--item">
                    <div class="all--item--action d-flex align-item-center">
                        <div class="all--item--action d-flex align-item-center">
                            <router-link :to="'/groupForm/' + item.id"  class="button--circle is-primary-light"><i class="fas fa-pen"></i></router-link>
                            <button class="button--circle is-danger-light" @click="deleteItem(item.id)"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>

     // Repository Data
     import { RepositoryFactory } from '../../repositories/RepositoryFactory'
     const groupsRepository = RepositoryFactory.get('groups')
    export default {
        props: ['item', 'itemsSelected'],
        data () {
            return {
                checkItemSelected: false,
            };
        },
        
        methods: {
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
