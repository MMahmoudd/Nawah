<template>
    <div class="filter--items">
        <div class="row">
            <div class="col-12 col-lg-6">
                <div class="filter--items--left">
                    <div class="input--fuild">
                        <button class="button w-100" :class="{'is-primary' : checkItem && allItemChecked.length}"
                            @click="selectAllItems">
                            {{$t('selectAll')}}
                        </button>
                    </div>
                    
                    <div class="input--fuild">
                        <v-select :clearable="false" :options="['user', 'admin', 'guest']" v-model="userType" label="name"
                            placeholder="user type"
                            class="select--with--icon w-100 v--select--scroll w-fuild-md">
                            <template slot="option" slot-scope="option">
                                {{ option.name }}
                            </template>
                        </v-select>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6">
                <div class="filter--items--right">
                    <div class="input--fuild">
                        <div class="search icon--right">
                            <b-input :placeholder="$t('search') + '...'" type="search" icon-pack="fa" icon="search"
                                v-model="searchQuery">
                            </b-input>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        props:['allItemChecked'],
        data() {
            return {
                checkItem: false,
                filters: {},
                searchQuery: '',
                userType: 'user',
            }
        },
        watch: {
            allItemChecked(){
                if(this.allItemChecked == 0){
                    this.checkItem= false
                }
            },
            // Status
            userType() {
                if (this.userType) {
                    this.filters.userType = this.userType
                    this.$emit('featchByFilter', this.filters)
                } else {
                    this.filters.userType = ''
                    this.$emit('featchByFilter', this.filters)
                }
            },
            searchQuery() {
                this.filters.searchQuery = this.searchQuery
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    this.$emit('featchByFilter', this.filters)
                }, 500);
            }
        },
        methods: {
            selectAllItems() {
                this.checkItem = !this.checkItem
                this.$emit('selectAllItems')
            }
            
        }
    }
</script>
