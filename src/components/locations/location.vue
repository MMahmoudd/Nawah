<template>
  <div class="locations">
    <div class="map-header">
      <h2>Search and add a pin</h2>
      <label class="label-auto">
        <gmap-autocomplete
          :options="{fields: ['geometry', 'formatted_address', 'address_components']}"
          @place_changed="setPlace"
        />
        <button @click="addMarker">Add</button>
      </label>
    </div>
    <br>
    <gmap-map
      ref="mapRef"
      :center="center"
      :zoom="5"
      style="width:100%;  height: 600px;"
      :options="{
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true,
        disableDefaultUi: true
      }"
    >
      <gmap-marker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        @click="center=m.position"
      />
    </gmap-map>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        // default to Montreal to keep it simple
        // change this to whatever makes sense
        center: { lat: 45.508, lng: -73.587 },
        markers: [],
        places: [],
        currentPlace: null,
      }
    },
    computed: {

    },
    mounted () {
      this.geolocate()
    },
    methods: {
      setPlace (place) {
        this.currentPlace = place
      },
      addMarker () {
        if (this.currentPlace) {
          const marker = {
            lat: this.currentPlace.geometry.location.lat(),
            lng: this.currentPlace.geometry.location.lng(),
          }
          this.markers.push({ position: marker })
          console.log('this.markers', this.markers)
          this.places.push(this.currentPlace)
          this.center = marker
          this.currentPlace = null
        }
      },
      geolocate: function () {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        })
      },
    },
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
      padding: 7px 4px;
      border-radius: 7px;
      text-align: right;
      direction: rtl;
      outline: none;
    }
    button{
      background-color: #4caf50;
      padding: 7px 10px;
      border-radius: 5px;
      color: #fff;
      margin-left: 15px;
    }
  }
</style>
