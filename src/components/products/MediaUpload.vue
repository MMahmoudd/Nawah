<template>
    <div class="row">
        <div class="col-12">
            <!-- Media Card -->
            <div class="card--block">
                <div class="card-header">
                    <p class="card-header-title">
                        Default Image 
                    </p>
                </div>
                <div class="card--content" v-if="!defaultImagePreview && !avatarDefault">
                    <b-upload class="w-100" drag-drop accept="image/*" :multiple="false" expanded @input="handleUploadFilesDefaultImage" >
                        <section class="section">
                            <div class="content has-text-centered">
                                <p>
                                    <b-icon icon="upload" size="is-large"></b-icon>
                                </p>
                                <p>Drop your default image here or click to upload</p>
                            </div>
                        </section>
                    </b-upload>
                </div>
                <div class="default-image" v-if="defaultImagePreview">
                    <div class="img-preview">
                        <img :src="defaultImagePreview">
                        <a class="delete btn-delete" @click="removeDefaultImage()"></a>
                    </div>
                </div>
                <div class="default-image" v-else-if="avatarDefault">
                    <div class="img-preview">
                        <img :src="avatarDefault">
                        <a class="delete btn-delete" @click="removeDefaultImage()"></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12">
            <!-- Media Card -->
            <div class="card--block">
                <div class="card-header">
                    <p class="card-header-title">
                        Media
                    </p>
                </div>
                <div class="card--content">
                    <b-upload  v-model="allImages" class="w-100" multiple accept="image/*" drag-drop expanded @input="handleUploadFiles">
                        <section class="section">
                            <div class="content has-text-centered">
                                <p>
                                <b-icon icon="upload" size="is-large"></b-icon>
                                </p>
                                <p>Drop your images here or click to upload</p>
                            </div>
                        </section>
                    </b-upload>
                </div>
                <div class="card--content media-images pt-0" v-if="allMediaSelectedPreview.length">
                    <div class="img-preview" v-for="(item, index) in allMediaSelectedPreview" :key="index">
                        <template v-if="item.type === 'file'">
                            <img :src="item.src">
                            <a class="delete btn-delete" @click="removeImg(index, item)"></a>
                        </template>
                        <template v-if="item.type === 'url'">
                            <img :src="image_base_url + item.src">
                            <a class="delete btn-delete" @click="removeImg(index, item)"></a>
                        </template>
                    </div>
                </div>
                <!-- <div class="card--content media-images pt-0" v-if="allImages.length">
                    <div class="img-preview" v-for="(item, index) in allImages" :key="index">
                        <img :src="item.src">
                        <a class="delete btn-delete" @click="removeImg(index)"></a>
                    </div>
                </div> -->
            </div>
        </div>
    </div>

</template>


<script>

    export default {
        props: ['product'],
        data() {
            return {
                dropFiles: [],
                allMediaSelected: [],
                allMediaSelectedPreview: [],
                defaultImageSelected: null,
                defaultImagePreview: null,
                avatarDefault: null,
                allImages: [],
                urlImagesDelete: [],
                image_base_url: null,
                
            };
        },

        watch:{
            allMediaSelected: {
                handler(){
                    this.sentDataToParent()
                },
                deep: true
            },
            defaultImageSelected: {
                handler(){
                    this.sentDataToParent()
                },
                deep: true
            },
            urlImagesDelete: {
                handler(){
                    this.sentDataToParent()
                },
                deep: true
            },
            
            product(){
                if(this.product){
                    this.image_base_url = this.product.image_base_url
                    if(this.product.avatar){
                        this.avatarDefault = this.product.image_base_url + this.product.avatar
                    }
                    if(this.product.images&&this.product.images.length){
                        console.log('this.product.images', this.product.images)
                        this.allImages = []
                        this.product.images.map(img => {
                            this.allMediaSelectedPreview.push({src: img, type: 'url'})
                        })
                    }
                }
            }
        },
        methods: {
            // Send Data To Parent
            sentDataToParent() {
                this.$emit('setDataFromChild', {defaultImage: this.defaultImageSelected, media: this.allMediaSelectedPreview, deletedImages: this.urlImagesDelete })
            },
            handleUploadFiles(event){
                console.log('event', event)
                // this.allMediaSelected = event
                this.filterFiles(event)
            },
            
            filterFiles(event){
                let filesData = []
                event.map( async file => {
                   let data = await this.readFile(file)
                    filesData.push({type: 'file', src: data, file: file})
                })
                // console.log('event', event)
                setTimeout(() => {
                    this.allMediaSelectedPreview.push(...filesData)
                    this.allImages = []
                }, 300);
            },
            handleUploadFilesDefaultImage(event){
                this.defaultImageSelected = event
                this.filterFilesDefaultImage()
            },
            async filterFilesDefaultImage(){
                let fileData = await this.readFile(this.defaultImageSelected)
                this.defaultImagePreview =  fileData
            },
            removeImg(index, item) {
                this.allMediaSelectedPreview.splice(index, 1)
                if(item.type === 'url'){
                    this.urlImagesDelete.push(item.src)
                }
                console.log('urlImagesDelete', this.urlImagesDelete)
            },
            removeDefaultImage() {
                this.defaultImageSelected = null
                this.defaultImagePreview = null
                this.avatarDefault = null
            },
             // Handle File Upload
            async readFile(file) {
                return new Promise(resolve => {
                    const reader = new FileReader()
                    reader.addEventListener('load', () => resolve(reader.result), false)
                    reader.readAsDataURL(file)
                })
            },
        },
    }
</script>

