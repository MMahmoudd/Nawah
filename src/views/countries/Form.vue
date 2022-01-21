<template>
    <div class="categories">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('countries')}}
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
                    <form class="row mt-3 justify-content-center" @submit.prevent="submitForm()">
                        <div class="col-12 col-md-10 col-lg-6">
                            <div class="row">
                                <div class="col-12">
                                    <b-field class="field-group">
                                        <b-input required type="text" placeholder="ar name" v-model="data.arName" />
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <b-field class="field-group">
                                        <b-input required type="text" placeholder="en name" v-model="data.enName" />
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <b-field class="field-group">
                                        <button class="button is-primary" type="button"
                                        @click="isCardModalActive = true">shipping point</button>
                                    </b-field>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-12 col-sm-6">
                                    <b-field class="field-group flex-column">
                                        <v-select
                                            :options="handleParentData(allCountries)"
                                            v-model="data.parentId"
                                            label="title"
                                            placeholder="Country"
                                            class="select--with--icon w-100 v--select--scroll"
                                        >
                                        <template slot="option" slot-scope="option">{{ option.title }}</template>
                                        </v-select>
                                    </b-field>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <b-field class="field-group flex-column">
                                        <v-select
                                            :options="currencies"
                                            v-model="data.currencyId"
                                            label="name"
                                            placeholder="Currency"
                                            class="select--with--icon w-100 v--select--scroll"
                                        >
                                        <template slot="option" slot-scope="option">{{ option.name }}</template>
                                        </v-select>
                                    </b-field>
                                </div>
                                <div class="col-6">
                                    <b-field class="field-group">
                                        <b-input placeholder="taxs" expanded v-model="data.taxs" type="number" max="99" min="0"></b-input>
                                        <p class="control">
                                            <span class="button is-static">%</span>
                                        </p>
                                    </b-field>
                                </div>
                                
                            </div>                                                           
                        </div>

                        <div class="col-12 text-center button--save--form">
                            <button type="submit" class="button is-primary">{{this.$route.params.id ? $t('saveChanges') : $t('add')}}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <b-modal :active.sync="isCardModalActive" :width="1000">
            <div class="card">
                <div class="locations">
                     <div>
                        <div class="map-header">
                            <h2>Search and add a pin</h2>
                            <label class="label-auto">
                                <GmapAutocomplete :position.sync="markers[0].position" @keyup.enter="usePlace" @place_changed="setPlace"
                                :options="{fields: ['geometry', 'formatted_address', 'address_components']}">
                                </GmapAutocomplete>
                                <button class="button is-primary" @click="usePlace">Add</button>
                            </label>
                        </div>
                            <br/>

                            <gmap-map
                                :center="center"
                                :zoom="5"
                                map-type-id="terrain"
                                style="width: 100%; height: 500px"
                            >
                                <gmap-marker
                                    @dragend="updateMaker" 
                                    :key="index"
                                    v-for="(m, index) in markers"
                                    :position="m.position"
                                    :clickable="true"
                                    :draggable="true"
                                    @click="center=m.position"
                                ></gmap-marker>

                            </gmap-map>

                        </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    import { ModalProgrammatic as Modal } from 'buefy'
    const repository = RepositoryFactory.get('countries')
    const currenciesRepository = RepositoryFactory.get('currencies')


    export default {
        name: 'currencyForm',
        data() {
            return {
                center: { lat: 26.820553, lng: 30.802498 },
                markers: [{
                    position: { lat: 26.820553, lng: 30.802498 }
                }],
                place: null,
                isLoading: false,
                isCardModalActive: false,
                allCountries: [],
                currencies: [],
                data:{
                    arName: '',
                    enName: '',
                    parentId: '',
                    currencyId: '',
                    taxs: '',
                    lat: '',
                    long: ''
                },

                breadcrumb: [{
                    link: '/countries',
                    label: this.$t("countriesPage.breadcrumb[0]")
                }, {
                    link: '',
                    label: this.$t("countriesPage.breadcrumb[1]")
                }]
            };
        },   
        created() {
            if (this.$route.params.id) {
                this.getItem(this.$route.params.id)
            }
            this.fetchAllItems() 
            this.fetchAllCurrencies() 
        },
        methods: {
            setPlace(place) {
                this.place = place
            },
            setDescription(description) {
                this.description = description;
            },
            usePlace(place) {
                if (this.place) {
                    var newPostion = {
                        lat: this.place.geometry.location.lat(),
                        lng: this.place.geometry.location.lng(),
                    };
                    this.center = newPostion;
                    this.markers[0].position =  newPostion;
                    this.data.lat = this.markers[0].position.lat
                    this.data.long = this.markers[0].position.lng 
                    this.place = null;
                }
            },
            updateMaker: function(event) {
            //   console.log('updateMaker, ', event.latLng.lat());
              this.markers[0].position = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
              }
                this.data.lat = this.markers[0].position.lat
                this.data.long = this.markers[0].position.lng 
              const geocoder = new google.maps.Geocoder()
              geocoder.geocode({ 'latLng': event.latLng }, (result, status) => {
                  if (status === google.maps.GeocoderStatus.OK) {
                    this.$refs.gmapAutocomplete.$refs.input.value = result[0].formatted_address
                  }
              })
          },
            // Add New Category Button
            submitForm() {
                this.isLoading = true
                const formData = new FormData()
                this.data.arName && formData.append('ar.name', this.data.arName)
                this.data.enName && formData.append('en.name', this.data.enName)
                    if(this.data.taxs){
                        this.data.taxs && formData.append('taxs', this.data.taxs)
                    }
                    if(this.data.currencyId){
                        this.data.currencyId && formData.append('currency_id', this.data.currencyId.id)
                    }
                    if(this.data.parentId){
                        this.data.parentId && formData.append('parent_id', this.data.parentId.id)
                    }
                    if(this.data.lat){
                        // formData['lat'] = this.data.parentId.id
                        this.data.lat && formData.append('lat', this.data.lat)
                    }
                    if(this.data.long){
                        this.data.long && formData.append('long', this.data.long)
                    }
                if (this.$route.params.id) {
                    this.updateItem(this.$route.params.id, formData)
                } else {
                    this.newItem(formData)
                }
                
            },

            async newItem(data) {
                const item = await repository.newItem(data)
                if (item.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/countries')
                } else {
                    this.errorMessage(item.message)
                }
                this.isLoading = false
            },

            // Fetch All Items
            async fetchAllItems() {
                const items = await repository.getAllItems(1, 999)
                this.allCountries = items.Geographies.rows;
            },
            // Fetch All Items
            async fetchAllCurrencies(filters) {
                const currencies = await currenciesRepository.getAllItems(1, 999, filters)
                this.currencies = currencies.Currencies.rows;
            },

            async getItem(data) {
                const item = await repository.getItem(data)
                console.log(item.Geography)
                if(item.Geography){
                    this.data.arName = item.Geography.trans[0].name
                    this.data.enName = item.Geography.trans[1].name
                    this.data.taxs = item.Geography.taxs
                }
                if(item.Geography.parent_id){
                    setTimeout(() => {
                        this.getFullObject(item.Geography.parent_id) 
                    }, 1000);
                }
                if(item.Geography.currency_id){
                    setTimeout(() => {
                        this.getFullObjectCurrencies(item.Geography.currency_id) 
                    }, 1000);
                }
            
            },
            async updateItem(id, data) {
                console.log(data)
                const item = await repository.updateItem(id, data)
                if (item.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/countries')
                } else {
                    this.errorMessage(item.message)
                }
                this.isLoading = false

            },

             handleParentData(data) {
                let handleData = []
                data.map(item => {
                    handleData.push({title: item.trans.name, id: item.id})
                })
                return handleData
            },

            getFullObject(id){
                this.allCountries.map(item => {
                    if(item.id === id) {
                        this.data.parentId = {title: item.trans.name, id: item.id}
                    }
                })
            },
            getFullObjectCurrencies(id){
                this.currencies.map(item => {
                    if(item.id === id) {
                        this.data.currencyId = {name: item.name, id: item.id}
                    }
                })
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
  .map-header{
    margin: auto;
    text-align: center;
    padding: 20px;
    h2{
      margin-bottom: 15px;
    }
    input{
      border: 1px solid #333;
      padding: 15px 4px;
      border-radius: 7px;
      text-align: right;
      direction: rtl;
      outline: none;
    }
  }
</style>

