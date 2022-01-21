<template>
    <div class="block--item no--checkbox">
        <div class="row align-items-center">
            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="block--item--title d-flex align-items-center item--text">
                    <div class="text--title">
                         {{item.notification.trans.title}}
                    </div>
                    
                </div>
            </div>
           <div class="col-12 col-sm-6 col-xl table--item">
                <div class="block--item--title d-flex align-items-center item--text">
                    <div class="text--title">
                        {{item.notification.trans.body}}
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="block--item--title d-flex align-items-center item--text justify-content-center">
                    <div class="text--title">
                        <span class="mr-2">
                            <i class="fas fa-clock"></i>
                        </span>
                            {{formatDate(item.createdAt)}}
                    </div>
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
    const repository = RepositoryFactory.get('stores')
    import moment from 'moment-timezone'
    export default {
        props: ['item', 'itemsSelected'],
        data() {
            return {
                checkItemSelected: false,
            };
        },
        methods: {
            deleteItem(id) {
                this.confirmCustomDelete(id)
            },
            formatDate(date){
                return moment(date).startOf('hour').fromNow()
            },
            updateCheckbox() {
                this.$emit('checkboxItem', {
                    id: this.item.id,
                    status: this.checkItemSelected
                })
            },
            async updateItem(id, data) {
                const items = await repository.updateItems(id, data)
                this.aleartMessage(items.message)
            },
            async deleteItems(id) {
                const items = await repository.deleteItem(id)
                if(items.status === 200){
                    this.aleartMessage('Successful')
                    this.$emit('fetchAllItems')
                } else {
                    this.aleartMessage(items.message)
                }
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
                    title: this.$t('storesPage.messages.deleteStores.title'),
                    message: this.$t('storesPage.messages.deleteStores.message'),
                    confirmText: this.$t('storesPage.messages.deleteStores.confirmText'),
                    cancelText: this.$t('storesPage.messages.deleteStores.cancelText'),
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deleteItems(id)
                })
            }
        }
    }
</script>
