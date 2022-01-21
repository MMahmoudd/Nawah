<template>
    <div class="stock-data">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('completeAll.stockData')}}
                            <span class="badge--count" v-if="total">
                                ({{total}})
                            </span>
                        </h1>
                        <!-- Breadcrumb -->
                        <breadcrumb :links="breadcrumb" />

                    </div>
                </div>
            </div>
        </div>

        <div class="wrap--content">
            <div class="card-filter--herader">
                <filter-items @featchByFilter="featchByFilter" @fetchAllItems="fetchAllItems" />
            </div>
            <template v-if="dataLoading">
                <loading-data></loading-data>
            </template>
           <template v-else>
                <div v-if="tableData.length">
                    <div v-for="(row, indexRow) in tableData" :key="indexRow">
                        <div class="row overflow-scroll">
                            <div class="col-12">
                                <div class="d-flex">
                                    <div class="ml-2" v-for="(item, indexCoulmn) in row" :key="item.id">
                                        <div class="card block--item">
                                            <div v-if="stockData[((indexCoulmn+1).toString()+(indexRow+1).toString())]">
                                                <div @click="openDialog(stockData[((indexCoulmn+1).toString()+(indexRow+1).toString())])" class="red">
                                                       <!-- {{$t('completeAll.Invoice')}} -->
                                                    <!-- <br> -->
                                                    {{stockData[((indexCoulmn+1).toString()+(indexRow+1).toString())].bill_number}} 
                                                </div>
                                            </div>
                                            <div v-else>
                                                <div class="green" @click="openAddDialog((indexCoulmn+1), (indexRow+1))">
                                                        <!-- {{$t('completeAll.noData')}} -->
                                                        <br>
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <template v-else>
                    <no-data text="No Stock Data have been created" />
                </template>
            </template>

        </div>
        <b-modal :active.sync="isCardModalActive" :width="600">
                <section class="row">
                    <b-field class="col-md-6" :label="$t('completeAll.column')">
                        <b-input type="number" v-model="cardData.column"></b-input>
                    </b-field>
                    <b-field class="col-md-6" :label="$t('completeAll.row')">
                        <b-input type="number" v-model="cardData.row"></b-input>
                    </b-field>
                    <b-field class="col-md-6" :label="$t('completeAll.invoiceNumber')">
                        <b-input v-model="cardData.bill_number"></b-input>
                    </b-field>
                    <b-field class="col-md-6" :label="$t('completeAll.status')">
                        <v-select 
                        :clearable="false" 
                        :options="['Active', 'Delivered']"
                        v-model="cardData.status"
                        label="status"
                        :placeholder="$t('completeAll.status')"
                        class="select--with--icon w-100 v--select--scroll w-fuild-md">
                            <template slot="option" slot-scope="option">
                                {{ option.status }}
                            </template>
                        </v-select>
                    </b-field>
                    <b-field class="col-md-6" :label="$t('completeAll.userName')">
                        <v-select 
                        :clearable="false" 
                        :options="handelUserData(users)"
                        v-model="cardData.user_id"
                        label="name"
                        :placeholder="$t('completeAll.userName')"
                        class="select--with--icon w-100 v--select--scroll w-fuild-md">
                            <template slot="option" slot-scope="option">
                                {{ option.name }}
                            </template>
                        </v-select>
                    </b-field>
                    <b-field class="col-md-6" :label="$t('completeAll.productType')">
                        <v-select 
                        :clearable="false" 
                        :options="['raw', 'product']"
                        v-model="cardData.type"
                        label="type"
                        :placeholder="$t('completeAll.productType')"
                        class="select--with--icon w-100 v--select--scroll w-fuild-md">
                            <template slot="option" slot-scope="option">
                                {{ option.type }}
                            </template>
                        </v-select>
                    </b-field>
                    <b-field class="col-12" :label="$t('completeAll.note')">
                        <b-input maxlength="200" type="textarea" v-model="cardData.note"></b-input>
                    </b-field>
                    <div class="col-12 text-center button--save--form">
                    <button class="button is-primary" @click="editCard(cardData)">{{$t('completeAll.save')}}</button>
                    </div>
                </section>
        </b-modal>
        <b-modal :active.sync="isCardModalActive1" :width="600">
                <section class="row">
                    <b-field class="col-md-6" :label="$t('completeAll.column')">
                        <b-input type="number" v-model="cardData.column"></b-input>
                    </b-field>
                    <b-field class="col-md-6" :label="$t('completeAll.row')">
                        <b-input type="number" v-model="cardData.row"></b-input>
                    </b-field>
                    <b-field class="col-md-6" :label="$t('completeAll.invoiceNumber')">
                        <b-input v-model="cardData.bill_number"></b-input>
                    </b-field>
                    <b-field class="col-md-6" :label="$t('completeAll.status')">
                        <v-select 
                        :clearable="false" 
                        :options="['Active', 'Delivered']"
                        v-model="cardData.status"
                        label="status"
                        :placeholder="$t('completeAll.status')"
                        class="select--with--icon w-100 v--select--scroll w-fuild-md">
                            <template slot="option" slot-scope="option">
                                {{ option.status }}
                            </template>
                        </v-select>
                    </b-field>
                    <b-field class="col-md-6" :label="$t('completeAll.userName')">
                        <v-select 
                        :clearable="false" 
                        :options="handelUserData(users)"
                        v-model="cardData.user_id"
                        label="name"
                        :placeholder="$t('completeAll.userName')"
                        class="select--with--icon w-100 v--select--scroll w-fuild-md">
                            <template slot="option" slot-scope="option">
                                {{ option.name }}
                            </template>
                        </v-select>
                    </b-field>
                    <b-field class="col-md-6" :label="$t('completeAll.productType')">
                        <v-select 
                        :clearable="false" 
                        :options="['raw', 'product']"
                        v-model="cardData.type"
                        label="type"
                        :placeholder="$t('completeAll.productType')"
                        class="select--with--icon w-100 v--select--scroll w-fuild-md">
                            <template slot="option" slot-scope="option">
                                {{ option.type }}
                            </template>
                        </v-select>
                    </b-field>
                    <b-field class="col-12" :label="$t('completeAll.note')">
                        <b-input maxlength="200" type="textarea" v-model="cardData.note"></b-input>
                    </b-field>
                    <div class="col-12 text-center button--save--form">
                    <button class="button is-primary" @click="addCard(cardData)">{{$t('completeAll.save')}}</button>
                    </div>
                </section>
        </b-modal>
    </div>
</template>

<script>
import FilterItems from '../../components/stock/Filter'
    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const repository = RepositoryFactory.get('stocks')
    const usersRepository = RepositoryFactory.get('users')


    export default {
        name: 'stockData',
        data() {
            return {
                stocks: [],
                stockData: {},
                users: [],
                itemData: null,
                cardData: {
                    column: null,
                    row: null,
                    bill_number: null,
                    status: null,
                    user_id: null,
                    type: '',
                    note: '',
                },
                userType: 'admin',
                isCardModalActive: false,
                isCardModalActive1: false,
                total: null,
                page: 1,
                limit: 20,
                order: 'is-centered',
                dataLoading: true,
                rowsCount: 0,
                columnCount: 0,
                tableData: [],
                data: [],
                countTable: true,
                breadcrumb: [{
                    link: '',
                    label: "Stock"
                }]
            };
        },
        components: {
            FilterItems,
        },
        created() {
            if (this.$route.params.id) {
                this.fetchAllItems(this.$route.params.id)
            }
            this.fetchAllUsers()
        },
        watch: {
            '$route'(to, from) {
                if (this.$route.params.id) {
                    this.fetchAllItems(this.$route.params.id)
                }
            },
            page() {
                if (this.page) {
                    this.fetchAllItems()
                }
            },
        },
        methods: {
            
        async openDialog (data) {
            this.isCardModalActive = true
            this.cardData = data
            if(this.cardData.user_id){
                    this.getFullObject(this.cardData.user_id)
            }
            if(this.cardData.status === 1){
                    this.cardData.status = 'Active'
            } else {
                this.cardData.status = 'Delivered'
            }
            console.log('cardData', this.cardData)
        },
        async openAddDialog (coulmn, row) {
            this.isCardModalActive1 = true
            this.cardData.column = coulmn
            this.cardData.row = row
        },
        async fetchAllUsers() {
                const data = await usersRepository.getAllAdmin()
                this.users = data.Users.rows
            },
            handelUserData (data) {
                let hadelData = []
                data.map(item => {
                    hadelData.push({name: item.name, id: item.id})
                })
                return hadelData
            },
            getFullObject(id){
                this.users.map(item => {
                    if(item.id === id) {
                        this.cardData.user_id = {name: item.name, id: item.id}
                    }
                })
            },

            // Fetch All Items
            async fetchAllItems(id, filters) {
                this.dataLoading = true
                console.log('filters',filters)
                const data = await repository.getAllStockData(id, filters)
                this.rowsCount = data.Stock.row_number
                this.columnCount = data.Stock.column_number
                this.stockData = data.stockData
                if (this.rowsCount > 0 && this.columnCount > 0) {
                this.applyTable()
                }
                this.dataLoading = false;
            },
         applyTable () {
             this.tableData = []
             for(let i = 1; i <= this.rowsCount; i++) {
                this.tableData.push([])
               if(i == this.rowsCount) {
                this.addCoulmn()
               }
            }
            this.tableData = this.tableData.filter(function(item){
                return item !== 0;
            });
        },
         addCoulmn() {
            for(let i = 0; i < this.rowsCount; i++) {
                this.tableData[i] = []
                for(let index = 0; index < this.columnCount; index++) {
                    this.tableData[i].push('')
                }
            }
            this.tableData = this.tableData.filter(item => {
                if(item != []) {
                    return item
                }
            });
            this.countTable = false
        },
        async editCard(cardData) {
            if(this.cardData.status === 'Active'){
                    this.cardData.status = 1
            } else {
                this.cardData.status = 0
            }
            const Data = {
                column: cardData.column,
                row: cardData.row,
                bill_number: cardData.bill_number,
                status: cardData.status,
                user_id: cardData.user_id.id,
                type: cardData.type,
                note: cardData.note,
                createdAt: cardData.createdAt,
                updatedAt: cardData.updatedAt,
                date: cardData.date
            }
            const id = cardData.stock_id
            console.log('Data', Data)
            const data = await repository.updateStockData(id, Data)
            console.log(data)
            if (data.status === 200) {
                    this.successMessage('Successful')
                    this.isCardModalActive = false
                    this.$router.go('/stockData'/{id})
                } else {
                    this.errorMessage(data.message)
                }
        },
        async addCard(cardData) {
            if(this.cardData.status === 'Active'){
                    this.cardData.status = 1
            } else {
                this.cardData.status = 0
            }
            const Data = {
                column: cardData.column,
                row: cardData.row,
                bill_number: cardData.bill_number,
                status: cardData.status,
                user_id: cardData.user_id.id,
                type: cardData.type,
                note: cardData.note,
                date: new Date().toLocaleString()
            }
            const id = this.$route.params.id
            const data = await repository.addStockData(id, Data)
            if (data.status === 200) {
                    this.successMessage('Successful')
                    this.$router.go('/stockData'/{id})
                } else {
                    this.errorMessage(data.message)
                }
        },
        // Filters
            featchByFilter( filters) {
                this.fetchAllItems(this.$route.params.id, filters)
                console.log(filters)
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
<style lang="scss">
.overflow-scroll{
    overflow-x: auto;
}
.card{
        padding: 0;
        border-radius: 7px;
    .red{
        border-radius: 7px;
        text-align: center;
        background-color: #ff4747;
        color: #fff;
        padding: 20px;
        cursor: pointer;
    }
    .green{
        border-radius: 7px;
        text-align: center;
        background-color: #46a646;
        color: #fff;
        padding: 20px;
        cursor: pointer;
    }
}
    
</style>
