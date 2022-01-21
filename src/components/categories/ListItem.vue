<template>
    <div>
        <div class="block--item no--checkbox">
            
            <div class="row align-items-center">
                <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="block--item--title d-flex align-items-center item--text">
                        <div class="text--title">
                             {{item.trans[0].title}}
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="block--item--title d-flex align-items-center item--text">
                        <div class="text--title">
                            {{item.trans[0].sub_title}}
                        </div>
                    </div>
                </div>

                <div class="col-12 col-sm-12 col-xl item--text table--item">
                    <div class="all--item--action d-flex align-item-center">
                        <div class="all--item--action d-flex align-item-center">
                            <button class="button--circle is-warning-light" v-if="item.children.length" @click="openSubitems =! openSubitems"><i class="fas fa-arrow-down"></i></button>
                            <router-link :to="'/categoryForm/' + item.id"
                                class="button--circle is-primary-light"><i class="fas fa-pen"></i></router-link>
                            <button class="button--circle is-danger-light" @click="deleteItem(item.id)"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <template v-if="openSubitems">
                
                <div class="px-4 mt-4" v-for="subitem in item.children" :key="subitem.id" >
                    <div class="block--item no--checkbox py-1">
                        <div class="row align-items-center">
                            <div class="col-12 col-sm-6 col-xl table--item">
                                <div class="block--item--title d-flex align-items-center item--text">
                                    <div class="text--title">
                                        {{subitem.trans[0].title}}
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 col-sm-6 col-xl table--item">
                                <div class="block--item--title d-flex align-items-center item--text">
                                    <div class="text--title">
                                        {{subitem.trans[0].sub_title}}
                                    </div>
                                </div>
                            </div>

                            <div class="col-12 col-sm-12 col-xl item--text table--item">
                                <div class="all--item--action d-flex align-item-center">
                                    <div class="all--item--action d-flex align-item-center">
                                        <router-link :to="'/categoryForm/' + subitem.id"
                                            class="button--circle is-primary-light"><i class="fas fa-pen"></i></router-link>
                                        <button class="button--circle is-danger-light" @click="deleteItem(subitem.id)"><i class="fas fa-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const categoriesRepository = RepositoryFactory.get('categories')
    export default {
        props: ['item', 'itemsSelected'],
        data() {
            return {
                checkItemSelected: false,
                openSubitems: false,
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
            async updateCategory(id, data) {
                const category = await categoriesRepository.updateCategory(id, data)
                this.aleartMessage(category.message)
            },
            async deleteCategory(id) {
                const category = await categoriesRepository.deleteCategory(id)
                if(category.status === 200){
                    this.aleartMessage('Successful')
                    this.$emit('fetchAllItems')
                } else {
                    this.aleartMessage(category.message)
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
                    title: this.$t('categoriesPage.messages.deleteCategory.title'),
                    message: this.$t('categoriesPage.messages.deleteCategory.message'),
                    confirmText: this.$t('categoriesPage.messages.deleteCategory.confirmText'),
                    cancelText: this.$t('categoriesPage.messages.deleteCategory.cancelText'),
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deleteCategory(id)
                })
            }
        }
    }
</script>
