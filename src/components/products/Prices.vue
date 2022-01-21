<template>
    <div>
        <div class="card--block">
            <div class="card-header">
                <p class="card-header-title">
                    prices
                </p>
            </div>
            <div class="card--content" v-if="$route.params.id">
                <div v-for="(price) in allPrices" :key="price">
                    <b-field class="field-group align-items-center mb-2" v-for="(subItem) in price.fields" :key="subItem">
                        <p class="control w-100 mr-1">
                            <v-select
                                :clearable="false"
                                :options="allPrices"
                                disabled
                                :value="subItem.field.name"
                                label="name"
                                placeholder="Field Type"
                                class="select--with--icon w-100 v--select--scroll">
                                <template slot="option" slot-scope="option">{{ option.name }}</template>
                            </v-select>
                        </p>
                        <p class="control w-100 ml-1">
                            <v-select
                                :clearable="false"
                                :value="subItem.fieldOption.name"
                                label="name"
                                disabled
                                placeholder="Option"
                                class="select--with--icon w-100 v--select--scroll">
                                <template slot="option" slot-scope="option">{{ option.name }}</template>
                            </v-select>
                        </p>
                        <div class="control w-100 ml-1">
                            <b-input
                            v-model="price.price"
                            label="price"
                            disabled
                            placeholder="price"
                        />
                        </div>
                        <button type="button" class="button is-danger btn-small ml-2" @click="deleteCurrentOption(index, subIndex, subItem.id)"><i class="fas fa-trash"></i></button>
                    </b-field>
                </div>

                <b-field class="field-group align-items-center mb-2" v-for="(item, index) in fields" :key="index + 'new'">
                    <p class="control w-100 mr-1">
                        <v-select
                            :clearable="false"
                            :options="allFields"
                            v-model="item.field"
                            label="name"
                            placeholder="Field Type"
                            @input="item.option = null"
                            class="select--with--icon w-100 v--select--scroll">
                            <template slot="option" slot-scope="option">{{ option.name }}</template>
                        </v-select>
                    </p>
                    <p class="control w-100 ml-1">
                        <v-select
                            :clearable="false"
                            :options="item.field? item.field.options : []"
                            v-model="item.option"
                            label="name"
                            placeholder="Option"
                            class="select--with--icon w-100 v--select--scroll">
                            <template slot="option" slot-scope="option">{{ option.name }}</template>
                        </v-select>
                    </p>
                    <p class="control w-100 ml-1">
                        <b-input
                            v-model="item.price"
                            label="price"
                            placeholder="price"/>
                    </p>
                    <button type="button" class="button is-danger btn-small ml-2" @click="deleteOption(index)"><i class="fas fa-trash"></i></button>
                </b-field>
                <hr class="my-3">
                

                <div class="d-flex justify-content-between">
                    <button type="button" class="button" @click="addNewOption">Add New Price</button>
                    <button
                        class="button is-info"
                        :class="{'is-loading': isLoading}"
                        type="button"
                        @click="updateFields()" >
                        {{$t('saveChanges')}}
                    </button>
                </div>
            </div>
            <div class="message-add" v-else>
                The product must be added first
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
    const productsRepository = RepositoryFactory.get('products')

    export default {
        props: ['product'],
        data() {
            return {
                fields: [],
                pricesData: [
                    {
                    price:0,
                    fields:[
                        {
                            field_id:0,
                            option_id:0
                        }
                        ]
                    },
                ],
                isLoading: false,
                allFields: [],
                allPrices:[],
                currentPrices: [],
                currentIndexItem: null,
                currentFields: [],
                deleteOptionsIds: [],
            };
        },
        created(){
            this.fetchAllItems()
            this.fetchAllPrices()
        },
        watch:{
            product(){
                if(this.prices){
                    this.currentFields = this.product.Fields
                }
            },
            prices(){
                if(this.prices){
                    this.currentPrices = this.prices
                }
            }
        },
        methods: {
            // watchChoses(prams){
            //     console.log(prams)
            // },
            // Send Data To Parent
            sentDataToParent() {
                this.$emit('setDataFromChild', this.mainFieldPost)
            },
            addNewOption(){
                this.fields.push({field: null, option: null, price: 0})
            },

            updateFields(){
                let allData = []
                this.fields.map(item => {
                    allData.push({price: item.price, fields:[{field_id: item.field? item.field.id : '', option_id: item.option? item.option.id : ''}] })
                })
                this.newOptions({'prices': allData})
                
            },
            // Add New Options
            async newOptions(data) {
                this.isLoading = true
                const product = await productsRepository.addProductPrices(this.$route.params.id, data);
                if (product.status === 200) {
                    this.successMessage('Successful')
                    // this.$router.push('/products')
                } else {
                    this.errorMessage(product.message)
                }
                this.isLoading = false
            },
            async fetchAllPrices() {
                const prices = await productsRepository.getProductPrices(this.$route.params.id)
                
                this.allPrices = prices.productPrice
                // if(fields.rows){
                //     fields.rows.map(item => {
                //         this.allPrices.push({name: item.trans[1].name, id: item.id, options: this.optionsFilter(item.options) })
                //     })
                // }
            },

             // Fetch All Items
            async fetchAllItems() {
                this.allFields = []
                const fields = await fieldsRepository.getAllFields(1, 9999)
                if(fields.rows){
                    fields.rows.map(item => {
                        this.allFields.push({name: item.trans[1].name, id: item.id, options: this.optionsFilter(item.options) })
                    })
                }
            },
            optionsFilter(options){
                let allOptions = []
                options.map(item => {
                    allOptions.push({id: item.id, name: item.trans[0].name})
                })
                return allOptions
            },
            // Delete Option
            deleteOption(index) {
                this.fields.splice(index, 1)
                // this.allImages.map(item => {})
            },
            // Delete Current Option
            deleteCurrentOption(index, subIndex, id) {
                this.deleteOptionsIds = []
                this.currentFields[index].options.splice(subIndex, 1)
                this.deleteOptionsIds.push(id)
                this.deleteItems()
            },
            async deleteItems() {
                const items = await productsRepository.deleteOption(this.$route.params.id, {options: this.deleteOptionsIds})
                if(items.status === 200){
                    this.successMessage('Successful')
                } else {
                    this.errorMessage(items.message)
                }
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
        },
        
    }
</script>
<style lang="scss" scoped>
  .v-select.select--with--icon{
    width: auto !important;
    min-width: unset !important;
  }
  .card--block .card--content, .card--nodata .card--content, .no-data .card--content, .loading--data .card--content{
      padding: 5px !important;
  }
</style>