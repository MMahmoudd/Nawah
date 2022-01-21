<template>
    <div class="block--item no--checkbox">
        <div class="row align-items-center">
            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="block--item--title d-flex align-items-center item--text">
                    <div class="text--title">
                         TO: {{ JSON.parse(item.shipping_to).full_name}}
                    </div>
                    
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="block--item--title d-flex align-items-center item--text">
                    <div class="text--title">
                        {{item.Products.length}} items
                    </div>
                    
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="block--item--title d-flex align-items-center item--text">
                    <div class="text--title">
                        <span class="mr-2">
                            <i class="fas fa-shipping-fast"></i>
                        </span>
                        {{item.order_shipping.trans.name}}
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
            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="block--item--title d-flex align-items-center item--text justify-content-center">
                    <div class="text--title">
                        {{item.status}}
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="block--item--title d-flex align-items-center item--text justify-content-center">
                    <b-field v-if="item.delivery_id" class="field-group flex-column" >
                            <v-select
                                :options="delivery"
                                v-model="item.delivery_id.name"
                                label="name"
                                placeholder="Status Delivery"
                                @input="updateItem(item)"
                                class="select--with--icon w-100 v--select--scroll"
                            >
                            <template slot="option" slot-scope="option">{{ option.name }}</template>
                        </v-select>
                    </b-field>
                </div>
            </div>

             <div class="col-12 col-sm-12 col-xl item--text table--item">
                <div class="all--item--action d-flex align-item-center">
                    <div class="all--item--action d-flex align-item-center">
                        <router-link :to="'/viewOrder/' + item.id"
                            class="button--circle is-warning-light"><i class="far fa-eye"></i>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import status from './Status'
    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const repository = RepositoryFactory.get('stores')
    const statusRepository = RepositoryFactory.get('orders')
    import moment from 'moment-timezone'
import Status from './Status.vue'
    
    export default {
        props: ['item'],
        data() {
            return {
                checkItemSelected: false,
                status: '',
                delivery: [],
                deliveryItems: {
                    id: 0,
                    name: "",
                    short_name: "",
                },
                selected: [],
            };
        },
        components: {
            status
        },
        created() {
            this.fetchAllstatus()
            if (this.$route) {
      }
        },
        watch: {
            '$route' (to, from) {
        if (this.$route) {
        } else {

        }
      },
        },
        methods: {
           changeValue(option){
               console.log(option)
           },
            async fetchAllstatus(filters) {
                this.dataLoading = true
                const delivery = await statusRepository.getAllStatus()
                this.delivery = delivery.DeliveryOptions.rows
                this.dataLoading = false;
            },
            async updateItem(data) {
                const id = data.id
                const statusId = data.delivery_id.name.id
                const items = await statusRepository.updateOrder(id, statusId)
                if (items.status === 200){
                    this.$router.go('/orders')
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
