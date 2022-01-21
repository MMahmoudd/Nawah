<template>
    <div>
        <item  v-for="item in data" :key="item.id" :item="item"
        @fetchAllItems="fetchAllItems"
        @fetchAllstatus="fetchAllstatus"/>
    </div>
</template>



<script>

import Item from './ListItem'
import Status from './Status'
// Repository Data
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const repository = RepositoryFactory.get('stores')

export default {
    props:['data'],
    data () {
            return {
                itemsSelected:[],
            };
        },
    components: {
        Item,
        Status
    },
    watch:{

    },
    methods:{

       
        // Ban Items
         async updateItem(id, data) {
            const items = await repository.updateItem(id, data)
            this.$emit('fetchAllItems')
            this.aleartMessage(items.message)
        },
        fetchAllItems(){
            this.$emit('fetchAllItems')
        },
        fetchAllstatus(){
            this.$emit('fetchAllstatus')
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
