<template>
  <div class="posts">
    <!-- Page Head -->
    <div class="page--head">
      <div class="wrap--content">
        <div class="page--title">
          <div>
            <h1 class="title--text">{{$t('products')}}</h1>
            <!-- Breadcrumb -->
            <breadcrumb :links="breadcrumb" />
          </div>
          <div class="page--title--action ml-auto">
            <button class="button is-primary" @click="submitForm" :class="{'is-loading': isLoading}">
                {{$t('saveChanges')}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap--content">
      <form @submit.prevent="submitForm()">
        <div class="row">
          <div class="col-12 col-lg-8">
            <div class="post--content">
              <!-- Main Field Post -->
              <main-field-post @setDataFromChild="setDataFromMainField" :product="this.product" />

              <!-- Media Upload -->
              <media-upload @setDataFromChild="setDataFromMediaUpload" :product="this.product" />

              <Fields :product="this.product"/>

              <!-- Main Button Save On Desktop Screen -->
              <div class="text-center button--save--form d-none d-lg-block">
                <button
                  class="button is-primary"
                  :class="{'is-loading': isLoading}"
                  type="submit"
                >
                {{$t('saveChanges')}}
                </button>
              </div>
            </div>
          </div>
          

          <!-- Post Info -->
          <post-info @setDataFromChild="setDataFromPostInfo" :product="this.product" />

        </div>
      </form>
    </div>
  </div>
</template>


<script>
// Post Information
import PostInfo from "../../components/products/PostInfo";
// Main Field Post
import MainFieldPost from "../../components/products/MainFieldPost";
import MediaUpload from "../../components/products/MediaUpload";
import Fields from "../../components/products/Fields";
// Repository Data
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const productsRepository = RepositoryFactory.get("products");

export default {
  name: "articleForm",
  data() {
    return {
      breadcrumb: [
        {
          link: "/products",
          label: this.$t('productsPage.breadcrumb[0]')
        },
        {
          link: "",
          label: this.$t('productsPage.breadcrumb[1]')
        }
      ],
      postInfo: {},
      postMainField: {},
      postMainFieldData: {},
      defaultImage: null,
      media: [],
      deletedImages: [],
      isLoading: false,
      product: {},
    };
  },
  components: {
    PostInfo,
    MainFieldPost,
    MediaUpload,
    Fields
  },
  created() {
    if (this.$route.params.id) {
      this.getOneProduct(this.$route.params.id);
    }
  },
  methods: {
    // Set Data From Post Info Components
    setDataFromPostInfo(data) {
      this.postInfo = data;
    },
    // Set Data From Post Info Components
    setDataFromMainField(data) {
      this.postMainField = data;
    },
    // Set Data From Media Upload
    setDataFromMediaUpload(data) {
      this.defaultImage = data.defaultImage
      this.media = data.media
      this.deletedImages = data.deletedImages
    },
    // Submit Form
    submitForm() {
      this.isLoading = false;

        const formData = new FormData()
        this.postMainField.arName && formData.append('ar.name', this.postMainField.arName)
        this.postMainField.enName && formData.append('en.name', this.postMainField.enName)
        this.postMainField.arDescription && formData.append('ar.description', this.postMainField.arDescription)
        this.postMainField.enDescription && formData.append('en.description', this.postMainField.enDescription)
        this.postMainField.arBrief && formData.append('ar.brief', this.postMainField.arBrief)
        this.postMainField.enBrief && formData.append('en.brief', this.postMainField.enBrief)
        formData.append('status', this.postInfo.status)
        formData.append('review', this.postInfo.review)
        formData.append('featured', this.postInfo.featured)
        this.defaultImage && formData.append('avatar', this.defaultImage)
        if(this.media.length){
            this.media.map((item, index) => {
              if(item.type === 'file'){
                formData.append('image' + (index + 1), item.file)
              }
            })
        }
        this.postInfo.category && formData.append('category_id', this.postInfo.category.id)
        this.postInfo.price && formData.append('price', this.postInfo.price)
        this.postInfo.discount && formData.append('discount', this.postInfo.discount)
        this.postInfo.discount && formData.append('discount_type', this.postInfo.discount_type)
        this.postInfo.barcode && formData.append('barcode', this.postInfo.barcode)
        this.postInfo.available_quantity && formData.append('available_quantity', this.postInfo.available_quantity)
        this.postInfo.weight && formData.append('weight', this.postInfo.weight)
        this.postInfo.width && formData.append('width', this.postInfo.width)
        this.postInfo.length && formData.append('length', this.postInfo.length)
        this.postInfo.height && formData.append('height', this.postInfo.height)
        this.postInfo.discount_start_at && formData.append('discount_start_at', this.postInfo.discount_start_at)
        this.postInfo.discount_end_at && formData.append('discount_end_at', this.postInfo.discount_end_at)
        // if(this.$route.params.id){
        //   this.postInfo.variants.length && formData.append('new_fields', JSON.stringify(this.postInfo.variants))
        // } else {
        //   this.postInfo.variants.length && formData.append('fields', JSON.stringify(this.postInfo.variants))
        // }
        // this.postInfo.variantsDeleted.length && formData.append('del_field_options', JSON.stringify(this.postInfo.variantsDeleted))

        if(this.postInfo.related_products){
            let relatedIds = [] 
            this.postInfo.related_products.map( item => {
                relatedIds.push(item.id)
            })
            formData.append('related_products', JSON.stringify(relatedIds))
        }
        if(this.deletedImages.length){
            formData.append('delete_image', JSON.stringify(this.deletedImages))
        }
        // if(this.postInfo.optionsChanged.length){
        //   let handleData = {}
        //    this.postInfo.optionsChanged.map((item, index) => {
        //       handleData[item.id] = item.name
        //     })
        //     formData.append('edit_field_options', JSON.stringify(handleData))
        // }
      this.isLoading = true;
      if (this.$route.params.id) {
        if (this.postInfo.available_quantity) {
          this.updatePost(this.$route.params.id, formData);
        } else {
          this.errorMessage('quantity in required')
        }
      } else {
        if (this.postInfo.available_quantity) {
          this.newPost(formData);
        } else {
          this.errorMessage('quantity in required')
        }
        
      }
    },
    // Add New Post
    async newPost(data) {
      const product = await productsRepository.newProduct(data);
        if (product.status === 200) {
            this.successMessage('Successful')
            this.$router.push('/products')
        } else {
            this.errorMessage(product.message)
        }
        this.isLoading = false
    },
    // Get Product Data
    async getOneProduct(id) {
      const product = await productsRepository.getProduct(id);
      console.log(product)
      console.log('One product', product)
      if(product.status === 200){
          this.product = product.Product
      }
      console.log('post', product.Product)
    //   this.post = post;
    },
    // Update Product
    async updatePost(id, data) {
      console.log(id, data)
      const product = await productsRepository.updateProduct(id, data);
       if (product.status === 200) {
            this.successMessage('Successful')
            // this.$router.push('/products')
        } else {
            this.errorMessage(product.message)
        }
        this.isLoading = false
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
    
    
  }
};
</script>