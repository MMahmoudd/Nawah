<template>
    <div class="filter--items">
        <div class="row">
            <div class="col-12 col-lg-3">
                <div class="filter--items--left">
                    <!-- <div class="input--fuild">
                        <button class="button w-100" :class="{'is-primary' : checkItem && allItemChecked.length}"
                            @click="selectAllItems">
                            {{$t('selectAll')}}
                        </button>
                    </div> -->
                    <div class="input--fuild">
                        <div class="search">
                            <a @click="fetchFile()" type="button" class="button is-info" download>Export</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-9">
                <div class="filter--items--right">
                    <!-- <div class="input--fuild">
                        <v-select :clearable="true" :options="['male', 'female']" v-model="gender" label="gender"
                            placeholder="gender"
                            class="select--with--icon w-100 v--select--scroll w-fuild-md">
                            <template slot="option" slot-scope="option">
                                {{ option.gender }}
                            </template>
                        </v-select>
                    </div> -->
                    <div class="input--fuild">
                        <v-select :clearable="false" :options="['user', 'admin', 'guest']" v-model="userType" label="name"
                            placeholder="user type"
                            class="select--with--icon w-100 v--select--scroll w-fuild-md">
                            <template slot="option" slot-scope="option">
                                {{ option.name }}
                            </template>
                        </v-select>
                    </div>
                    <div class="input--fuild">
                        <div class="search icon--right">
                            <b-input :placeholder="$t('search') + ' By Email'" type="search" icon-pack="fa" icon="search"
                                v-model="searchQuery">
                            </b-input>
                        </div>
                    </div>
                    <div class="input--fuild">
                        <div class="search icon--right">
                            <b-input :placeholder="$t('search') + ' By Phone'" type="search" icon-pack="fa" icon="search"
                                v-model="searchQueryByPhone">
                            </b-input>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-lg-9">
                <div class="filter--items--right">
                    <div class="input--fuild">
                        <b-field label="Birthdate">
                            <b-datepicker
                                v-model="birthDate"
                                placeholder="Click to select birthDate"
                                icon="calendar-today"
                                trap-focus>
                            </b-datepicker>
                        </b-field>
                    </div>

                    <div class="input--fuild">
                        <b-field label="Gender">
                        <v-select :clearable="true" :options="['male', 'female']" v-model="gender" label="gender"
                            placeholder="gender"
                            class="select--with--icon w-100 v--select--scroll w-fuild-md">
                            <template slot="option" slot-scope="option">
                                {{ option.gender }}
                            </template>
                        </v-select>
                        </b-field>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    // Repository Data
    import { RepositoryFactory } from "../../../repositories/RepositoryFactory";
    const repoetsRepository = RepositoryFactory.get('reports')
    let download = require("downloadjs");
    export default {    
        props:['allItemChecked'],
        data() {
            return {
                checkItem: false,
                filters: {},
                searchQuery: '',
                searchQueryByPhone: '',
                userType: 'user',
                gender: '',
                birthDate: new Date()
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
            gender() {
                if (this.gender) {
                    this.filters.gender = this.gender
                    this.$emit('featchByFilter', this.filters)
                } else {
                    this.filters.gender = ''
                    this.$emit('featchByFilter', this.gender)
                }
            },
            birthDate() {
                // console.log(this.birthDate.toISOString().slice(0, 10))
                this.filters.birthDate = this.birthDate.toISOString().slice(0, 10)
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    this.$emit('featchByFilter', this.filters)
                }, 500);
            },
            searchQuery() {
                this.filters.searchQuery = this.searchQuery
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    this.$emit('featchByFilter', this.filters)
                }, 500);
            },
            searchQueryByPhone() {
                this.filters.searchQueryByPhone = this.searchQueryByPhone
                clearTimeout(this.debounce);
                this.debounce = setTimeout(() => {
                    this.$emit('featchByFilter', this.filters)
                }, 500);
            }
        },
        methods: {
            async fetchFile() {
                const users = await repoetsRepository.getUsersFile(this.filters, this.userType, this.gender, this.birthDate)
                window.open(users.download_url)
            },
            selectAllItems() {
                this.checkItem = !this.checkItem
                this.$emit('selectAllItems')
            }
            
        }
    }
</script>
