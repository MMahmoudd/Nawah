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
        </div>
    </div>
</template>

<script>
    // Repository Data
    import {
        RepositoryFactory
    } from '../../../repositories/RepositoryFactory'
    const repository = RepositoryFactory.get('reports')
    import moment from 'moment-timezone'
    export default {
        props: ['item', 'itemsSelected'],
        data() {
            return {
                checkItemSelected: false,
            };
        },
        watch: {
        },
        methods: {
            formatDate(date){
                return moment(date).startOf('hour').fromNow()
            },
        }
    }
</script>
