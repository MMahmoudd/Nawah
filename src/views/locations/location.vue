<template>
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
</template>

<script>

    export default {
        data() {
            return {
                center: { lat: 26.820553, lng: 30.802498 },
                markers: [{
                    position: { lat: 26.820553, lng: 30.802498 }
                }],
                place: null,
            }
        },
        description: 'Autocomplete Example (#164)',
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
                    console.log(this.markers[0].position)
                    this.place = null;
                }
            },
            updateMaker: function(event) {
              console.log('updateMaker, ', event.latLng.lat());
              this.markers[0].position = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
              }
              console.log(this.markers[0].position)
              const geocoder = new google.maps.Geocoder()
              geocoder.geocode({ 'latLng': event.latLng }, (result, status) => {
                  if (status === google.maps.GeocoderStatus.OK) {
                    this.$refs.gmapAutocomplete.$refs.input.value = result[0].formatted_address
                  }
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
      margin: 0 10px;
      border-radius: 7px;
      text-align: right;
      direction: rtl;
      outline: none;
    }
  }
</style>