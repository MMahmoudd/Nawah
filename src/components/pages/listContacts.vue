<template>
    <div>
        <div class="block--item no--checkbox" v-for="item in data" :key="item.id">
            <div class="row align-items-center">

                <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="block--item--title d-flex align-items-center item--text">
                        <div class="text--title">
                            {{item.name}}
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="block--item--title d-flex align-items-center item--text">
                        <div class="text--title">
                            {{item.email}}
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="block--item--title d-flex align-items-center item--text">
                        <div class="text--title">
                            {{item.phone}}
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-xl table--item">
                    <div class="block--item--title d-flex align-items-center item--text">
                        <div class="text--title" v-if="item.message">
                            {{item.message}}
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
            </div>
        </div>

    </div>
</template>



<script>
 import moment from 'moment-timezone'
export default {
    props:['data'],
    data () {
            return {
              
            };
        },
    methods:{      
        fetchAllItems(){
            this.$emit('fetchAllItems')
        },
        formatDate(date){
            return moment(date).startOf('hour').fromNow()
        },
    }
}
</script>
