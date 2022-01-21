<template>
    <div>
        <item  v-for="item in data" :key="item.id" :item="item"
        @fetchAllItems="fetchAllItems"
        @checkboxItem="checkboxItemStatus"
        :itemsSelected="itemsSelected"/>

        <template>
            <div class="all--actions" :class="{'show--action--bottom': itemsSelected.length}">
                <div class="wrap--content">
                    <!-- <button class="button is-warning " @click="banItems()">Ban All Selected</button> -->
                    <button class="button is-danger" @click="deleteItems()">
                        {{$t('deleteAllSelected')}}
                    </button>
                </div>
            </div>
        </template>

    </div>
</template>



<script>

import Item from './ListItem'
// Repository Data
import { RepositoryFactory } from '../../../repositories/RepositoryFactory'
const fieldsRepository = RepositoryFactory.get('home')

export default {
    props:['data', 'allItemsSelected'],
    data () {
            return {
                itemsSelected:[],
            };
        },
    components: {
        Item
    },
    watch:{
        allItemsSelected(){
            if(this.allItemsSelected){
                this.data.map(item => {
                    this.itemsSelected.push(item.id)
                })
            } else {
                 this.itemsSelected = []
            }
        },
        itemsSelected(){
            if(this.itemsSelected.length){
                this.$emit('checkButtonSelectAll', this.itemsSelected)
            }
        }
    },
    methods:{
         checkboxItemStatus(data){
            if(data.status == true){
                if(!this.itemsSelected.indexOf(data.id) > -1){
                    this.itemsSelected.push(data.id)
                }
            } else {
                if(this.itemsSelected.indexOf(data.id) > -1){
                    for(var i = 0; i < this.itemsSelected.length; i++){
                        if(this.itemsSelected[i] == data.id){
                            this.itemsSelected.splice(i, 1)
                        }
                    }
                }
            }
        },
        deleteItems(){
            this.confirmCustomDelete(this.itemsSelected)
        },

        // Delete Items
        async deleteCategory(id) {
            const fields = await fieldsRepository.deleteCategory(id)
            this.$emit('fetchAllItems')
            // this.aleartMessage(fields.message)
        },
       
        // Ban Items
         async updateCategory(id, data) {
            const fields = await fieldsRepository.updateCategory(id, data)
            this.$emit('fetchAllItems')
            this.aleartMessage(fields.message)
        },
        fetchAllItems(){
            this.$emit('fetchAllItems')
        },
        aleartMessage(textMessage){
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
    }
}
</script>
