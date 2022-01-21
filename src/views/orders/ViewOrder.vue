<template>
    <div class="categories">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            Orders
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
                   <div class="table-container">
                        <table class="table is-bordered is-striped w-100" v-if="order">
                            <tbody>
                                <tr v-for="(item, index) in order.Products" :key="index">
                                    <td>Product</td>
                                    <td>
                                        <div class="product-cossntent py-3">
                                            <div class="media">
                                                <div class="media-left">
                                                    <figure class="image is-64x64">
                                                        <img :src="item.avatar" :alt="item.name">
                                                    </figure>
                                                </div>
                                                <div class="media-content">
                                                    <p class="title is-5">{{item.name}}</p>
                                                    <p class="subtitle is-6">{{item.price}}</p>
                                                    <p class="subtitle is-6">{{item.quantity}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Created At</td>
                                    <td>{{order.createdAt}}</td>
                                </tr>
                                <tr>
                                    <td>Gift</td>
                                    <td>{{order.gift}}</td>
                                </tr>
                                <tr>
                                    <td>Order Payment</td>
                                    <td>{{order.order_payment_option.trans.name}}</td>
                                </tr>
                                <tr>
                                    <td>Order Shipping</td>
                                    <td>{{order.order_shipping.trans.name}}</td>
                                </tr>
                                <tr>
                                    <td>Shipping Address</td>
                                    <td>{{order.shipping_address}}</td>
                                </tr>
                                <tr>
                                    <td>Shipping Cost</td>
                                    <td>{{order.shipping_cost}}</td>
                                </tr>
                                <tr>
                                    <td>Shipping To</td>
                                    <td>
                                        <div>Name: {{JSON.parse(order.shipping_to).full_name}}</div>
                                        <div>Email: {{JSON.parse(order.shipping_to).email}}</div>
                                        <div>Phone: {{JSON.parse(order.shipping_to).phone}}</div>                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>{{order.status}}</td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                    <td>{{order.total}}</td>
                                </tr>
                                <tr>
                                    <td>Total Discount</td>
                                    <td>{{order.total_discount}}</td>
                                </tr>
                                
                            </tbody>
                        </table>
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

    const repository = RepositoryFactory.get('orders')


    export default {
        name: 'ViewOrder',
        data() {
            return {
                image_base_url: null,
                order: null,
                breadcrumb: [{
                    link: '/orders',
                    label: "orders"
                }, {
                    link: '',
                    label: 'View Order'
                }]
            };
        },       
        created() {
            if (this.$route.params.id) {
                this.getItem(this.$route.params.id)
            }
        },
        methods: {

            async getItem(data) {
                const item = await repository.getItem(data)
                console.log('item', item.Order)
                if(item.Order){
                    this.order = item.Order
                }
                
            
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
           
        }
    }
</script>
