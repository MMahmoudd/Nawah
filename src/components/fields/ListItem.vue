<template>
    <div class="block--item no--checkbox">
        <div class="row align-items-center">

            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="block--item--title d-flex align-items-center item--text">
                    <div class="text--title">
                        {{item.trans[1].name}}
                    </div>
                </div>
            </div>

             <div class="col-12 col-sm-12 col-xl item--text table--item">
                <div class="all--item--action d-flex align-item-center">
                    <div class="all--item--action d-flex align-item-center">
                        <router-link :to="'/fieldForm/' + item.id"
                            class="button--circle is-primary-light"><i class="fas fa-pen"></i></router-link>
                        <button class="button--circle is-danger-light" @click="deleteItem(item.id)"><i class="fas fa-trash"></i></button>
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
    const fieldsRepository = RepositoryFactory.get('fields')
    export default {
        props: ['item', 'itemsSelected'],
        data() {
            return {
                checkItemSelected: false,
            };
        },
        watch: {
            itemsSelected() {
                if (this.itemsSelected.length) {
                    this.itemsSelected.map(item => {
                        if (item == this.item.id) {
                            this.checkItemSelected = true
                        }
                    })
                } else {
                    this.checkItemSelected = false
                }
            },
            '$route' (to, from) {
                this.fetchAllItems()
            }
        },
        methods: {
            deleteItem(id) {
                this.confirmCustomDelete(id)
            },
            updateCheckbox() {
                this.$emit('checkboxItem', {
                    id: this.item.id,
                    status: this.checkItemSelected
                })
            },
            async updateFields(id, data) {
                const fields = await fieldsRepository.updateFields(id, data)
                this.aleartMessage(fields.message)
            },
            async deleteFields(id) {
                const fields = await fieldsRepository.deleteField(id)
                if(fields.status === 200){
                    this.aleartMessage('Successful')
                    this.$emit('fetchAllItems')
                } else {
                    this.aleartMessage(fields.message)
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
                    title: this.$t('fieldsPage.messages.deleteField.title'),
                    message: this.$t('fieldsPage.messages.deleteField.message'),
                    confirmText: this.$t('fieldsPage.messages.deleteField.confirmText'),
                    cancelText: this.$t('fieldsPage.messages.deleteField.cancelText'),
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deleteFields(id)
                })
            }
        }
    }
</script>
