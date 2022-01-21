<template>
    <div class="categories">

        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            {{$t('stores')}}
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
                            </div>
                            
                            <div class="row">
                                <div class="col-6">
                                    <b-field class="field-group">
                                        <b-input placeholder="phone" expanded v-model="data.phone" type="text"></b-input>
                                    </b-field>
                                </div>
                                <div class="col-6">
                                    <b-field class="field-group">
                                        <b-switch v-model="data.status" :true-value="1" :false-value="0" class="my-2">Status</b-switch>
                                    </b-field>
                                </div>
                                <div class="col-12">
                                    <b-field class="field-group">
                                        <b-input placeholder="address" expanded v-model="data.address" type="text"></b-input>
                                    </b-field>
                                </div>
                                <!-- <div class="col-6">
                                    <b-field class="field-group">
                                        <b-input placeholder="lat" expanded v-model="data.lat" type="text"></b-input>
                                    </b-field>
                                </div>
                                <div class="col-6">
                                    <b-field class="field-group">
                                        <b-input placeholder="long" expanded v-model="data.long" type="text"></b-input>
                                    </b-field>
                                </div> -->
                                <!-- <div class="col-12">
                                    <b-field class="field-group">
                                        <button class="button is-primary" type="button"
                                        @click="isCardModalActive = true">shipping point</button>
                                    </b-field>
                                </div> -->
                            </div>  
                            <div class="row">
                                <div class="col-12 col-sm-6">
                                    <div class="square--photo field-group mt-3" v-if="previewImageAr && !storeImageAr">
                                        <img :src="image_base_url + previewImageAr" class="avatar-l">
                                    </div>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="AR store image" disabled
                                            type="text" :value="storeImageAr? storeImageAr.name : ''">
                                        </b-input>
                                        <p class="control">
                                            <button type="button" 
                                             @click="$refs.uploadStoreImageAR.click()"
                                             class="button is-info">Upload</button>
                                        </p>
                                    </b-field>
                                    <input type="file" hidden @change="onImageUploadStoreAR" ref="uploadStoreImageAR">
                                </div>
                                <div class="col-12 col-sm-6">
                                    <div class="square--photo field-group mt-3" v-if="previewImageEn && !storeImageEn">
                                        <img :src="image_base_url + previewImageEn" class="avatar-l">
                                    </div>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="EN store image" disabled
                                            type="text" :value="storeImageEn? storeImageEn.name : ''">
                                        </b-input>
                                        <p class="control">
                                            <button type="button" 
                                             @click="$refs.uploadStoreImageEN.click()"
                                             class="button is-info">Upload</button>
                                        </p>
                                    </b-field>
                                    <input type="file" hidden @change="onImageUploadStoreEN" ref="uploadStoreImageEN">
                                </div>                                                         
                            </div>  
                            <div class="p-3">
                                <label class="label pb-3 font-weight-bold">Working Hours</label>
                                <b-field horizontal :label="item.name" v-for="(item, index) of workingHours" :key="index">
                                    <b-select placeholder="From" v-model="item.value.from" expanded>
                                        <option :value="(item <= 9 ? '0'+ item : item)+':00:00'" v-for="item in 23" :key="item">
                                            {{item <= 9 ? '0'+ item : item}} :00
                                        </option>
                                    </b-select>
                                    <b-select placeholder="To" v-model="item.value.to" expanded>
                                        <option :value="(item <= 9 ? '0'+ item : item)+':00:00'" v-for="item in 23" :key="item">
                                            {{item <= 9 ? '0'+ item : item}} :00
                                        </option>
                                    </b-select>
                                </b-field>
                            </div> 
                        </div>

                        <div class="col-12 text-center button--save--form">
                            <button class="button is-primary"
                                :class="{'is-loading': isLoading}" type="submit">{{this.$route.params.id ? $t('saveChanges') : $t('add')}}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- <b-modal :active.sync="isCardModalActive" :width="1000">
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
        </b-modal> -->
    </div>
</template>

<script>
    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    // import { ModalProgrammatic as Modal } from 'buefy'

    const repository = RepositoryFactory.get('stores')


    export default {
        name: 'currencyForm',
        data() {
            return {
                center: { lat: 26.820553, lng: 30.802498 },
                markers: [{
                    position: { lat: 26.820553, lng: 30.802498 }
                }],
                place: null,
                isCardModalActive: false,
                isLoading: false,
                // handle image
                storeImageAr: '',
                storeImageEn: '',
                image_base_url: null,
                previewImageAr: '',
                previewImageEn: '',
                workingHours:[
                    {name: 'saturday', value: {"from": null , "to": null}},
                    {name: 'sunday', value: {"from": null , "to": null}},
                    {name: 'monday', value: {"from": null , "to": null}},
                    {name: 'tuesday', value: {"from": null , "to": null}},
                    {name: 'wednesday', value: {"from": null , "to": null}},
                    {name: 'thursday', value: {"from": null , "to": null}},
                    {name: 'friday', value: {"from": null , "to": null}},
                 ],
                data:{
                    arName: '',
                    enName: '',
                    phone: '',
                    address: '',
                    long: '',
                    lat: '',
                    status: 1,
                },

                breadcrumb: [{
                    link: '/stores',
                    label: this.$t("storesPage.breadcrumb[0]")
                }, {
                    link: '',
                    label: this.$t("storesPage.breadcrumb[1]")
                }]
            };
        },
        created() {
            if (this.$route.params.id) {
                this.getItem(this.$route.params.id)
            }
        },
        methods: {
            setPlace(place) {
                this.place = place
            },
            setDescription(description) {
                this.description = description;
            },
        //     usePlace(place) {
        //         if (this.place) {
        //             var newPostion = {
        //                 lat: this.place.geometry.location.lat(),
        //                 lng: this.place.geometry.location.lng(),
        //             };
        //             this.center = newPostion;
        //             this.markers[0].position =  newPostion;
        //             this.data.lat = this.markers[0].position.lat
        //             this.data.long = this.markers[0].position.lng 
        //             this.place = null;
        //         }
        //     },
        //     updateMaker: function(event) {
        //     //   console.log('updateMaker, ', event.latLng.lat());
        //       this.markers[0].position = {
        //         lat: event.latLng.lat(),
        //         lng: event.latLng.lng(),
        //       }
        //         this.data.lat = this.markers[0].position.lat
        //         this.data.long = this.markers[0].position.lng 
        //       const geocoder = new google.maps.Geocoder()
        //       geocoder.geocode({ 'latLng': event.latLng }, (result, status) => {
        //           if (status === google.maps.GeocoderStatus.OK) {
        //             this.$refs.gmapAutocomplete.$refs.input.value = result[0].formatted_address
        //           }
        //       })
        //   },
            // Add New Category Button
            submitForm() {
                this.isLoading = true
                 const formData = new FormData()
                this.data.arName && formData.append('ar.name', this.data.arName)
                this.data.enName && formData.append('en.name', this.data.enName)
                this.data.phone && formData.append('phone', this.data.phone)
                this.data.address && formData.append('address', this.data.address)
                this.data.long && formData.append('long', this.data.long)
                this.data.lat && formData.append('lat', this.data.lat)
                formData.append('status', this.data.status)
                this.storeImageAr && formData.append('ar.image', this.storeImageAr)
                this.storeImageEn && formData.append('en.image', this.storeImageEn)

                let working_hours = {}
                this.workingHours.map(item => {
                    working_hours[item.name] = item.value
                })
                working_hours && formData.append('working_hours', JSON.stringify(working_hours))

                if (this.$route.params.id) {
                    this.updateItem(this.$route.params.id, formData)
                } else {
                    this.newItem(formData)
                }
            },
            // handleTimeFormat(time) {
            //     return new Intl.DateTimeFormat( { timezome: "UTC" }).format(time)
            // },
            async newItem(data) {
                const item = await repository.newItem(data)
                if (item.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/stores')
                } else {
                    this.errorMessage(item.message)
                }
                this.isLoading = false
            },

            async getItem(data) {
                const item = await repository.getItem(data)
                console.log(item)
                if(item.Store){
                    this.image_base_url = item.Store.image_base_url
                    this.data.arName = item.Store.trans[0].name
                    this.data.enName = item.Store.trans[1].name
                    this.data.status = item.Store.status? 1 : 0
                    this.data.address = item.Store.address
                    this.data.lat = item.Store.lat
                    this.data.long = item.Store.long
                    this.data.phone = item.Store.phone
                    if(item.Store.trans[0].image){
                        this.previewImageAr = item.Store.trans[0].image
                    }
                    if(item.Store.trans[1].image){
                        this.previewImageEn = item.Store.trans[1].image
                    }
                    if(item.Store.timeTable){
                        this.workingHours = []
                        item.Store.timeTable.map(item => {
                            // console.log('item', item)
                            this.workingHours.push({name: item.day, value: {"from": item.from , "to": item.to}})
                        })
                        // console.log('this.workingHour', this.workingHours)
                    }
                }
                
            
            },
            async updateItem(id, data) {
                const item = await repository.updateItem(id, data)
                if (item.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/stores')
                } else {
                    this.errorMessage(item.message)
                }
                this.isLoading = false

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
            // Handle Upload Image
             async onImageUploadStoreAR (event) {
                this.storeImageAr = event.target.files[0]
            },
            // Handle Upload Image
             async onImageUploadStoreEN (event) {
                this.storeImageEn = event.target.files[0]
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
