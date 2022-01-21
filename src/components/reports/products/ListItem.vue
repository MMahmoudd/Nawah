<template>
    <div class="block--item no--checkbox">
        <div class="row align-items-center">
            <!-- <div class="item--checkbox">
                <b-checkbox v-model="checkItemSelected" @input="updateCheckbox(item.id)" :native-value="item.id">
                </b-checkbox>
            </div> -->

            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="block--item--title d-flex align-items-center item--text justify-content-center">
                    <div class="text--title">
                        {{item.id}}
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-6 col-xl-4 table--item">
                
                <div class="block--item--title d-flex align-items-center item--text">
                    <div class="text--title">
                        <div class="d-flex align-items-center">
                            <div class="square--photo-sm mr-2">
                                <img :src="imageBaseUrl + item.avatar" :alt="item.trans.name">
                            </div>
                            <div class="product-title">
                                {{item.trans.name}}
                                <p>{{item.trans.brief}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="block--item--title d-flex align-items-center item--text justify-content-center">
                    <div class="text--title">
                        <span class="mr-2">
                            <i class="fas fa-tag"></i>
                        </span>
                        {{item.price}}
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

             <!-- <div class="col-12 col-sm-12 col-xl item--text table--item">
                <div class="all--item--action d-flex align-item-center">
                    <div class="all--item--action d-flex align-item-center">
                        <router-link :to="'/productForm/' + item.id"
                            class="button--circle is-primary-light"><i class="fas fa-pen"></i></router-link>
                        <button class="button--circle is-danger-light" @click="deleteItem(item.id)"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
    // Repository Data
    import {
        RepositoryFactory
    } from '../../../repositories/RepositoryFactory'
    const reportsRepository = RepositoryFactory.get('reports')

    import moment from 'moment-timezone'
    export default {
        props: ['item', 'itemsSelected', 'imageBaseUrl'],
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
            updateCheckbox() {
                this.$emit('checkboxItem', {
                    id: this.item.id,
                    status: this.checkItemSelected
                })
            },
            async updateProduct(status) {
                const formData = new FormData()
                formData.append('featured', status)
                const product = await reportsRepository.updateProduct(this.item.id, formData);
                if (product.status === 200) {
                    this.successMessage('Successful')
                } else {
                    this.errorMessage(product.message)
                }
            },
            formatDate(date){
                return moment(date).startOf('hour').fromNow()
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
            errorMessage(textMessage) {
                this.$snackbar.open({
                    message: textMessage,
                    type: "is-danger",
                    position: "is-bottom-right",
                    actionText: "OK",
                    queue: false,
                    duration: 10000,
                    indefinite: false
                });
                },
                successMessage(textMessage) {
                this.$snackbar.open({
                    message: textMessage,
                    type: "is-success",
                    position: "is-bottom-right",
                    actionText: "OK",
                    queue: false,
                    duration: 10000,
                    indefinite: false
                });
                },
            confirmCustomDelete(id) {
                this.$dialog.confirm({
                    title: this.$t('productsPage.messages.deleteProduct.title'),
                    message: this.$t('productsPage.messages.deleteProduct.message'),
                    confirmText: this.$t('productsPage.messages.deleteProduct.confirmText'),
                    cancelText: this.$t('productsPage.messages.deleteProduct.cancelText'),
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deleteProduct(id)
                })
            }
        }
    }
</script>
