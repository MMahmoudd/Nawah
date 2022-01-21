<template>
    <div>
        <div class="card--block">
            <div class="card-header">
                <p class="card-header-title">
                    Options
                </p>
            </div>
            <div class="card--content" v-if="$route.params.id">
                <div v-for="(item, index) in currentFields" :key="index">
                    <b-field class="field-group align-items-center mb-2" v-for="(subItem, subIndex) in item.options" :key="subIndex">
                        <p class="control w-100 mr-1">
                            <v-select
                                :clearable="false"
                                :options="allFields"
                                disabled
                                :value="item"
                                label="name"
                                placeholder="Field Type"
                                class="select--with--icon w-100 v--select--scroll">
                                <template slot="option" slot-scope="option">{{ option.name }}</template>
                            </v-select>
                        </p>
                        <p class="control w-100 ml-1">
                            <v-select
                                :clearable="false"
                                :value="subItem"
                                label="name"
                                disabled
                                placeholder="Option"
                                class="select--with--icon w-100 v--select--scroll">
                                <template slot="option" slot-scope="option">{{ option.name }}</template>
                            </v-select>
                        </p>
                        <p class="control w-100 ml-1">
                        <b-input
                            v-model="subItem.price"
                            disabled
                            label="price"
                            placeholder="price"/>
                        </p>
                        <div class="option-image ml-2">
                            <img :src="subItem.image" v-if="subItem.image">
                        </div>
                        <button type="button" class="button is-danger btn-small ml-2" @click="deleteCurrentOption(index, subIndex, subItem.id)"><i class="fas fa-trash"></i></button>
                    </b-field>
                </div>
                <b-field class="field-group align-items-center mb-2" v-for="(item, index) in fields" :key="index + 'new'">
                    <p class="control w-100 mr-1">
                        <v-select
                            :clearable="false"
                            :options="allFields"
                            v-model="item.field"
                            label="name"
                            placeholder="Field Type"
                            @input="item.option = null"
                            class="select--with--icon w-100 v--select--scroll">
                            <template slot="option" slot-scope="option">{{ option.name }}</template>
                        </v-select>
                    </p>
                    <p class="control w-100 ml-1">
                        <v-select
                            :clearable="false"
                            :options="item.field? item.field.options : []"
                            v-model="item.option"
                            label="name"
                            placeholder="Option"
                            class="select--with--icon w-100 v--select--scroll">
                            <template slot="option" slot-scope="option">{{ option.name }}</template>
                        </v-select>
                    </p>

                    <p class="control w-100 ml-1">
                        <b-input
                            v-model="item.price"
                            label="price"
                            placeholder="price"/>
                    </p>
                    
                    <div class="option-image ml-2" @click="uploadOptionImage(index)">
                        <span class="placeholder">upload image</span>
                        <img :src="item.image" v-if="item.image">
                    </div>
                    <button type="button" class="button is-danger btn-small ml-2" @click="deleteOption(index)"><i class="fas fa-trash"></i></button>
                </b-field>
                <hr class="my-3">
                
                <input type="file" hidden @change="handleUploadImage" ref="uploadImage">

                <div class="d-flex justify-content-between">
                    <button type="button" class="button" @click="addNewOption">Add New Option</button>
                    <button
                        class="button is-info"
                        :class="{'is-loading': isLoading}"
                        type="button"
                        @click="updateFields()" >
                        {{$t('saveChanges')}}
                    </button>
                </div>
            </div>
            <div class="message-add" v-else>
                The product must be added first
            </div>
            
        </div>
        
    </div>

</template>


<script>

    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'
    const fieldsRepository = RepositoryFactory.get('fields')
    const productsRepository = RepositoryFactory.get('products')

    export default {
        props: ['product'],
        data() {
            return {
                fields: [],
                isLoading: false,
                allFields: [],
                currentIndexItem: null,
                allImages: [],
                currentFields: [],
                deleteOptionsIds: [],
            };
        },
        created(){
            this.fetchAllItems()
        },
        watch:{
            product(){
                if(this.product){
                    this.currentFields = this.product.Fields
                }
            }
        },
        methods: {
            uploadOptionImage(index){
                this.currentIndexItem = index
                this.$refs.uploadImage.click()
            },
            // Handle Upload Image
             async handleUploadImage (event) {
                 let file = event.target.files[0]
                 let fileData = await this.readFile(file)
                this.allImages.push({file: file, index: this.currentIndexItem})
                this.fields[this.currentIndexItem]['image'] = fileData
                this.fields[this.currentIndexItem]['imageName'] = 'image' + (this.currentIndexItem + 1)
            },
            // Send Data To Parent
            sentDataToParent() {
                this.$emit('setDataFromChild', this.mainFieldPost)
            },
            addNewOption(){
                this.fields.push({field: null, options: [], option: null, price: 0 , image: null, imageName: ''})
            },

            updateFields(){
                const formData = new FormData()
                if(this.fields.length){
                    let fields = []
                    this.fields.map(item => {
                        fields.push({field_id: item.field.id, option_id: item.option.id, price: item.price ,image: item.imageName})
                    })
                    formData.append('fields', JSON.stringify(fields))
                }
                if(this.allImages.length){
                    this.allImages.map(item => {
                        formData.append('image'+ (item.index + 1), item.file)
                    })
                }

                this.newOptions(formData)
                
            },
            // Add New Options
            async newOptions(data) {
                this.isLoading = true
                const product = await productsRepository.newOptions(this.$route.params.id, data);
                if (product.status === 200) {
                    this.successMessage('Successful')
                    this.$router.push('/products')
                } else {
                    this.errorMessage(product.message)
                }
                this.isLoading = false
            },
             // Fetch All Items
            async fetchAllItems() {
                this.allFields = []
                const fields = await fieldsRepository.getAllFields(1, 9999)
                if(fields.rows){
                    fields.rows.map(item => {
                        this.allFields.push({name: item.trans[1].name, id: item.id, options: this.optionsFilter(item.options) })
                    })
                }
            },
            optionsFilter(options){
                let allOptions = []
                options.map(item => {
                    allOptions.push({id: item.id, name: item.trans[0].name})
                })
                return allOptions
            },
             // Handle File Upload
            async readFile(file) {
                return new Promise(resolve => {
                    const reader = new FileReader()
                    reader.addEventListener('load', () => resolve(reader.result), false)
                    reader.readAsDataURL(file)
                })
            },
            // Delete Option
            deleteOption(index) {
                this.fields.splice(index, 1)
                // this.allImages.map(item => {})
            },
            // Delete Current Option
            deleteCurrentOption(index, subIndex, id) {
                this.deleteOptionsIds = []
                this.currentFields[index].options.splice(subIndex, 1)
                this.deleteOptionsIds.push(id)
                this.deleteItems()
            },
            async deleteItems() {
                const items = await productsRepository.deleteOption(this.$route.params.id, {options: this.deleteOptionsIds})
                if(items.status === 200){
                    this.successMessage('Successful')
                } else {
                    this.errorMessage(items.message)
                }
            },
            errorMessage(textMessage) {
                this.$snackbar.open({
                    message: textMessage,
                    type: "is-danger",
                    position: "is-bottom-right",
                    actionText: "OK",
                    queue: false,
                    duration: 10000,
                    indefinite: false
                });
                },
                successMessage(textMessage) {
                this.$snackbar.open({
                    message: textMessage,
                    type: "is-success",
                    position: "is-bottom-right",
                    actionText: "OK",
                    queue: false,
                    duration: 10000,
                    indefinite: false
                });
                },
        },
        
    }
</script>
<style lang="scss" scoped>
  .v-select.select--with--icon{
    width: auto !important;
  }
</style>
