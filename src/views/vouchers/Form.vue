<template>
    <div class="aboutUs">
        <!-- Page Head -->
        <div class="page--head">
            <div class="wrap--content">
                <div class="page--title">
                    <div>
                        <h1 class="title--text">
                            Vouchers
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
                                <div class="col-12 mt-2">
                                    <b-field class="field-group">
                                        <b-input  placeholder="Ar Title" 
                                            type="text"  v-model="data.arTitle">
                                        </b-input>
                                    </b-field>
                                    <b-field class="field-group">
                                        <b-input  placeholder="En Title" 
                                            type="text"  v-model="data.enTitle">
                                        </b-input>
                                    </b-field>
                                </div>
                                <div class="col-12 mt-2">
                                    <b-field class="field-group">
                                        <b-input  placeholder="Ar Description" 
                                            type="textarea"  v-model="data.arDescription" rows="2">
                                        </b-input>
                                    </b-field>
                                    <b-field class="field-group">
                                        <b-input  placeholder="En Description" 
                                            type="textarea"  v-model="data.enDescription" rows="2">
                                        </b-input>
                                    </b-field>
                                </div>
                                 <div class="col-6">
                                    <b-field class="field-group flex-column">
                                    <datetime
                                        type="datetime"
                                        class="custom--datetime theme-primary"
                                        placeholder="Start At"
                                        v-model="data.started_at"
                                        use12-hour
                                    ></datetime>
                                    </b-field>
                                </div>
                                <div class="col-6">
                                    <b-field class="field-group flex-column">
                                    <datetime
                                        type="datetime"
                                        class="custom--datetime theme-primary"
                                        placeholder="End At"
                                        v-model="data.ended_at"
                                        use12-hour
                                    ></datetime>
                                    </b-field>
                                </div>
                                 <div class="col-6">
                                    <b-field class="field-group flex-column">
                                        <b-input  placeholder="Max Usage" 
                                            type="number" min="1"  v-model="data.max_usage">
                                        </b-input>
                                    </b-field>
                                </div>
                                <div class="col-6">
                                    <b-field class="field-group flex-column">
                                        <b-input  placeholder="User Max Usage" 
                                            type="number" min="1"  v-model="data.user_max_usage">
                                        </b-input>
                                    </b-field>
                                </div>
                                <div class="col-6">
                                    <b-field class="field-group">
                                        <b-input type="number" :min="0" :max="data.discount_type === 'percent'? 99 : 999999999" placeholder="Discount" v-model="data.discount"/>
                                    </b-field>
                                </div>
                                <div class="col-6">
                                    <b-field class="field-group flex-column">
                                        <v-select
                                            :clearable="false"
                                            :options="['percent', 'cash']"
                                            v-model="data.discount_type"
                                            label="name"
                                            placeholder="Discount Type"
                                            class="select--with--icon w-100 v--select--scroll"
                                        >
                                            <template slot="option" slot-scope="option">{{ option.name }}</template>
                                        </v-select>
                                    </b-field>
                                </div>
                                <div class="col-12">
                                     <b-field class="field-group flex-column">
                                        <v-select
                                            :clearable="false"
                                            :options="['general', 'custom', 'user_general', 'user_custom']"
                                            v-model="data.type"
                                            label="name"
                                            placeholder="Type"
                                            class="select--with--icon w-100 v--select--scroll"
                                        >
                                            <template slot="option" slot-scope="option">{{ option.name }}</template>
                                        </v-select>
                                     </b-field>
                                     <p>{{$t('completeAll.DescriptionForType')}}</p>
                                     <ul>
                                         <li>{{$t('completeAll.general')}}: {{$t('completeAll.genralDesc')}}</li>
                                         <li>{{$t('completeAll.custom')}}: {{$t('completeAll.customDesc')}}</li>
                                         <li>{{$t('completeAll.user_general')}}: {{$t('completeAll.user_generalDesc')}}</li>
                                         <li>{{$t('completeAll.user_custom')}}: {{$t('completeAll.user_customDesc')}}</li>
                                     </ul>
                                </div>

                                <div class="col-12">
                                    <b-field class="field-group">
                                        <b-switch v-model="status" :true-value="1" :false-value="0" class="my-2">Status</b-switch>
                                    </b-field>
                                </div>
                                
                                <div class="col-12 col-sm-6 mt-4">
                                    <div class="square--photo square--photo-placeholder field-group " >
                                        <img :src="image_base_url + previewImageOne" class="avatar-l" v-if="previewImageOne && !imageOne">
                                    </div>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="ar image" disabled
                                            type="text" :value="imageOne? imageOne.name : ''">
                                        </b-input>
                                        <p class="control">
                                            <button type="button" 
                                             @click="$refs.uploadImageOne.click()"
                                             class="button is-info">Upload</button>
                                        </p>
                                    </b-field>
                                    <input type="file" hidden @change="uploadImageOne" ref="uploadImageOne">
                                </div>
                                <div class="col-12 col-sm-6 mt-4">
                                    <div class="square--photo square--photo-placeholder field-group">
                                        <img :src="image_base_url + previewImageTwo" class="avatar-l" v-if="previewImageTwo && !imageTwo">
                                    </div>
                                    <b-field class="field-group">
                                        <b-input expanded placeholder="en image" disabled
                                            type="text" :value="imageTwo? imageTwo.name : ''">
                                        </b-input>
                                        <p class="control">
                                            <button type="button" 
                                             @click="$refs.uploadImageTwo.click()"
                                             class="button is-info">Upload</button>
                                        </p>
                                    </b-field>
                                    <input type="file" hidden @change="uploadImageTwo" ref="uploadImageTwo">
                                </div>                                
                            </div>                                                        
                        </div>

                        <div class="col-12 text-center button--save--form">
                            <button class="button is-primary"
                                :class="{'is-loading': isLoading}">{{$t('saveChanges')}}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    // Repository Data
    import {
        RepositoryFactory
    } from '../../repositories/RepositoryFactory'

    const repository = RepositoryFactory.get('vouchers')
    // DatePicker
    import { Datetime } from "vue-datetime";
    // DatePicker Style
    import "vue-datetime/dist/vue-datetime.css";

    export default {
        name: 'homeSliderForm',
        data() {
            return {
                isLoading: false,
                status: 1,
                data:{
                    arTitle: '',
                    enTitle: '',
                    arDescription: '',
                    enDescription: '',
                    discount: '',
                    discount_type: 'percent',
                    max_usage: '',
                    user_max_usage: 1,
                    started_at: null,
                    ended_at: null,
                    type: null,
                },
                toolbarEditor: [
                    [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
                    ['bold', 'italic', 'underline'],
                    [{
                        'list': 'ordered'
                    }, {
                        'list': 'bullet'
                    }, {
                        'header': [1, 2, 3, false]
                    }],
                    ['link']
                ],
                breadcrumb: [{
                    link: '/vouchers',
                    label: 'vouchers'
                }, {
                    link: '',
                    label: 'Add & Update Voucher'
                }],
                image_base_url: null,
                imageOne: '',
                previewImageOne: '',
                imageTwo: '',
                previewImageTwo: '',
            };
        },
        created() {
            this.getContent(this.$route.params.id)
        },
        components: {
            Datetime,
        },
        
        methods: {
            submitForm() {
                this.isLoading = true
                const formData = new FormData()
                this.data.arTitle && formData.append('ar.title', this.data.arTitle)
                this.data.enTitle && formData.append('en.title', this.data.enTitle)
                this.data.arDescription && formData.append('ar.description', this.data.arDescription)
                this.data.enDescription && formData.append('en.description', this.data.enDescription)
                this.data.started_at && formData.append('started_at', this.data.started_at)
                this.data.ended_at && formData.append('ended_at', this.data.ended_at)
                this.data.max_usage && formData.append('max_usage', this.data.max_usage)
                this.data.user_max_usage && formData.append('user_max_usage', this.data.user_max_usage)
                this.data.discount && formData.append('discount', this.data.discount)
                this.data.discount_type && formData.append('discount_type', this.data.discount_type)
                this.data.type && formData.append('type', this.data.type)
                this.imageOne && formData.append('ar.image', this.imageOne)
                this.imageTwo && formData.append('en.image', this.imageTwo)                
                this.status && formData.append('status', this.status)
                
                if (this.$route.params.id) {
                    this.updateContent(formData)
                } else {
                    this.newItem(formData)
                }
            },

            async newItem(data) {
                const item = await repository.newVoucher(data)
                if (item.status === 200) {
                    this.successMessage('Successful')
                    // this.$router.push('/vouchers')
                } else {
                    this.errorMessage(item.message)
                }
                this.isLoading = false
            },

            async getContent(id) {
                const data = await repository.getVoucher(id)
                if(data){
                    this.status = data.status ? 1 : 0
                    this.data.arTitle = data.trans[1].title
                    this.data.enTitle = data.trans[0].title
                    this.data.arDescription = data.trans[1].description
                    this.data.enDescription = data.trans[0].description
                    this.data.max_usage = data.max_usage
                    this.data.discount = data.discount
                    this.data.discount_type = data.discount_type
                    this.data.user_max_usage = data.user_max_usage
                    this.data.started_at = data.started_at
                    this.data.ended_at = data.ended_at
                    this.data.type = data.type
                    this.previewImageOne = data.trans[0].image
                    this.previewImageTwo = data.trans[1].image
                    this.image_base_url = data.image_base_url
                }
            },
            async updateContent(data) {
                const response = await repository.updateVoucher(this.$route.params.id, data)
                if (response.status === 200) {
                    this.successMessage('Successful')
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

            // Handle File Upload
            readFile(file) {
                return new Promise(resolve => {
                    const reader = new FileReader()
                    reader.addEventListener('load', () => resolve(reader.result), false)
                    reader.readAsDataURL(file)
                })
            },
            
            // Handle Upload Image
             async uploadImageOne (event) {
                this.imageOne = event.target.files[0]
            },
             async uploadImageTwo (event) {
                this.imageTwo = event.target.files[0]
            },

        }
    }
</script>
