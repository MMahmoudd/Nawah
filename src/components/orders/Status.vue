<template>
    <div>
        <b-field class="align-items-center mb-2">
                <b-select placeholder="change status">
                    <option
                    :options="status"
                    :value="option.id"
                    :key="option.id"
                    v-bind="option"
                    @input="changeStatus(option)">
                    {{ option.name }}
                </option>
                </b-select>
        </b-field>
    </div>
</template>


<script>

    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const repository = RepositoryFactory.get('orders')

    export default {
        props: ['status'],
        data() {
            return {
                status: [],
                isLoading: false,
                allStatus: [],
                currentIndexItem: null,
                currentStatus: [],
            };
        },
        created(){
            this.fetchAllStatus()
        },
        watch:{
            
        },
        methods: {
            // Send Data To Parent
            changeStatus(item) {
                console.log(item)
            },
            sentDataToParent() {
                this.$emit('setDataFromChild', this.mainFieldPost)
            },
             // Fetch All Items
            async fetchAllStatus() {
                const status = await repository.getAllStatus()
                console.log(status)
                this.status = status.DeliveryOptions.rows
                this.dataLoading = false;
            },
    }
    }
</script>
<style lang="scss" scoped>
  .v-select.select--with--icon{
    width: auto !important;
  }
</style>
