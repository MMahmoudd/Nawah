<template>
  <div class="col-12 col-lg-4">
    <div class="card--block">
      <div class="card--content">
        <!-- Status -->
        <div class="post--info--item">
          <b-field class="field-group align-items-center justify-content-between">
            <label class="label">{{$t('status')}}</label>
            <b-switch v-model="postInfo.status" :true-value="1" :false-value="0"></b-switch>
          </b-field>
        </div>
        <!-- Review -->
        <div class="post--info--item">
          <b-field class="field-group align-items-center justify-content-between">
            <label class="label">Review</label>
            <b-switch v-model="postInfo.review" :true-value="1" :false-value="0"></b-switch>
          </b-field>
        </div>
        <!-- Featured -->
        <div class="post--info--item">
          <b-field class="field-group align-items-center justify-content-between">
            <label class="label">Featured</label>
            <b-switch v-model="postInfo.featured" :true-value="1" :false-value="0"></b-switch>
          </b-field>
        </div>
      </div>
    </div>  
    <!-- Price  -->
    <div class="card--block">
      <div class="card--content">
        <b-field class="field-group">
            <b-input type="number" placeholder="Price" :min="0" v-model="postInfo.price"/>
        </b-field>
      </div>
    </div>
    <!-- <prices />   -->
    <!-- Add attr -->
    <div class="card--block">
      <div class="card--content">
        <div class="row">
          <div class="col-6">
            <b-field class="field-group ">
                <b-input type="number" :min="0" :max="postInfo.discount_type === 'percent'? 99 : 999999999" placeholder="Discount" v-model="postInfo.discount"/>
            </b-field>
          </div>
          <div class="col-6">
            <b-field class="field-group flex-column">
              <v-select
                :clearable="false"
                :options="['percent', 'cash']"
                v-model="postInfo.discount_type"
                label="name"
                placeholder="Discount Type"
                class="select--with--icon v--select--scroll"
              >
                <template slot="option" slot-scope="option">{{ option.name }}</template>
              </v-select>
            </b-field>
          </div>
          <div class="col-6">
            <b-field class="field-group flex-column mb-0">
              <datetime
                type="datetime"
                class="custom--datetime theme-primary"
                placeholder="Discount Start At"
                v-model="postInfo.discount_start_at"
                use12-hour
              ></datetime>
            </b-field>
          </div>
          <div class="col-6">
            <b-field class="field-group flex-column mb-0">
              <datetime
                type="datetime"
                class="custom--datetime theme-primary"
                placeholder="Discount End At"
                v-model="postInfo.discount_end_at"
                use12-hour
              ></datetime>
            </b-field>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="card--block">
      <div class="card--content variants-content">
         <label class="label">Variants</label>

          <b-field class="field-group mb-2" v-for="(item, index) in currentVariants" :key="item.id">
              <p class="control control-select">
                  <v-select
                  :options="variantsType"
                  label="name"
                  :clearable="false"
                  placeholder="Type"
                  disabled
                  v-model="item.type"
                  class="select--with--icon w-100 v--select--scroll">
                  <template slot="option" slot-scope="option">{{ option.name }}</template>
                </v-select>
              </p>
              <p class="control">
                  <b-input placeholder="AR Name" @input="optionChanged(item.ar)" v-model="item.ar.name"></b-input>
              </p>
              <p class="control">
                  <b-input placeholder="EN Name" @input="optionChanged(item.en)" v-model="item.en.name"></b-input>
              </p>
              <p class="control">
                  <button type="button" class="button is-danger btn-small" @click="deleteCurrentVariant(index, item)"><i class="fas fa-trash"></i></button>
              </p>
          </b-field>
          <b-field class="field-group mb-2" v-for="(item, index) in variants" :key="index">
              <p class="control control-select">
                  <v-select
                  :options="variantsType"
                  label="name"
                  :clearable="false"
                  placeholder="Type"
                  v-model="item.type"
                  class="select--with--icon w-100 v--select--scroll">
                  <template slot="option" slot-scope="option">{{ option.name }}</template>
                </v-select>
              </p>
              <p class="control">
                  <b-input placeholder="AR Name" v-model="item.arName"></b-input>
              </p>
              <p class="control">
                  <b-input placeholder="EN Name" v-model="item.enName"></b-input>
              </p>
              <p class="control">
                  <button type="button" class="button is-danger btn-small" @click="deleteVariant(index)"><i class="fas fa-trash"></i></button>
              </p>
          </b-field>
          <hr class="my-3">
          <button type="button" class="button" @click="addVariant">Add New Variant</button>
      </div>
    </div> -->


    <div class="card--block">
      <div class="card--content">
        <div class="row">
          <div class="col-6">
          <b-field class="field-group flex-column w-100">
           <v-select
              :options="mainCategories"
              v-model="mainCategory"
              @input="changeMainCategory"
              placeholder="Main Category"
              class="select--with--icon w-100 v--select--scroll width-100">
              <template slot="option" slot-scope="option">{{ option.name }}</template>
            </v-select>
          </b-field>
          </div>
          <div class="col-6">
          <b-field class="field-group flex-column">
           <v-select
              :options="categories"
              v-model="postInfo.category"
              label="name"
              placeholder="Category"
              class="select--with--icon w-100 v--select--scroll width-100">
              <template slot="option" slot-scope="option">{{ option.name }}</template>
            </v-select>
          </b-field>
          </div>
        </div>
      </div>
    </div>
    <div class="card--block">
      <div class="card--content">
           <b-field class="field-group">
              <b-input placeholder="Barcode" expanded type="number" v-model="postInfo.barcode"></b-input>
          </b-field>
          <b-field required class="field-group">
              <b-input required placeholder="Available Quantity" expanded type="text" v-model="postInfo.available_quantity"></b-input>
              <p class="control">
                  <span class="button is-static">Available Quantity</span>
              </p>
          </b-field>
           <b-field class="field-group">
              <b-input placeholder="Weight" expanded v-model="postInfo.weight" type="text"></b-input>
              <p class="control">
                  <span class="button is-static">Kilo Gram</span>
              </p>
          </b-field>
           <b-field class="field-group mb-0">
              <b-input placeholder="width" expanded v-model="postInfo.width"></b-input>
              <p class="control">
                  <span class="button is-static">Meter</span>
              </p>
          </b-field>
          <b-field class="field-group mb-0">
              <b-input placeholder="length" expanded v-model="postInfo.length"></b-input>
              <p class="control">
                  <span class="button is-static">Meter</span>
              </p>
          </b-field>
          <b-field class="field-group mb-0">
              <b-input placeholder="height" expanded v-model="postInfo.height"></b-input>
              <p class="control">
                  <span class="button is-static">Meter</span>
              </p>
          </b-field>
      </div>
    </div>
    <!-- Related Products -->
    <div class="card--block">
      <div class="card--content">
        <div class="post--info--item">
          <b-field class="field-group flex-column mb-0">
            <label class="label">Related Products</label>
            <b-taginput
              v-model="postInfo.related_products"
              :data="filteredProducts"
              autocomplete
              :allow-new="false"
              :maxtags="6"
              :open-on-focus="true"
              field="name"
              icon-pack="fa"
              icon="shopping-basket"
              placeholder="Related Products"
              :loading="productsFilterLoading"
              @typing="getFilteredProducts"
            ></b-taginput>
          </b-field>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
// DatePicker
import { Datetime } from "vue-datetime";
// import prices from './Prices'
// DatePicker Style
import "vue-datetime/dist/vue-datetime.css";

// Repository Data
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const categoriesRepository = RepositoryFactory.get("categories");
const productsRepository = RepositoryFactory.get('products')
const fieldsRepository = RepositoryFactory.get('fields')

export default {
  props: ["product"],
  data() {
    return {
      postInfo: {
        status: 1,
        review: 1,
        featured: 0,
        price: "",
        discount: "",
        discount_type: "percent",
        barcode: "",
        available_quantity: "",
        weight: "",
        width: "",
        length: "",
        height: "",
        discount_start_at: null,
        discount_end_at: null,
        related_products: null,
        category: null,
        optionsChanged: [],
      },
      filteredProducts: [],
      productsFilterLoading: false,
      scheduleDate: "",
      page: 1,
      limit: 10,
      categories: [],
      products: [],
      variants: [],
      variantsType: [],
      currentVariants: [],
      mainCategories: [],
      mainCategory: null,
      allCategories: [],
    };
  },
  components: {
    Datetime,
    // prices
  },
  watch: {
    postInfo: {
      handler() {
        this.sentDataToParent();
      },
      deep: true
    },
    variants: {
      handler() {
        this.handleVariantData()
      },
      deep: true
    },
    
    product() {
      if (this.product) {
          this.postInfo.status = this.product.status? 1 : 0
          this.postInfo.review = this.product.review? 1 : 0
          this.postInfo.featured = this.product.featured? 1 : 0
          this.postInfo.price = this.product.price
          this.postInfo.discount = this.product.discount
          this.postInfo.discount_type = this.product.discount_type
          this.postInfo.barcode = this.product.barcode
          this.postInfo.available_quantity = this.product.available_quantity
          this.postInfo.weight = this.product.weight
          this.postInfo.width = this.product.width
          this.postInfo.length = this.product.length
          this.postInfo.height = this.product.height
          this.postInfo.discount_start_at = this.product.discount_start_at
          this.postInfo.discount_end_at = this.product.discount_end_at
         if(this.product.category_id){
            setTimeout(() => {
                this.filterCategory(this.product.category) 
            }, 1000);
          }
          // if(this.product && this.product.FieldsOptions){
          //   setTimeout(() => {
          //     this.filterFields(this.product.FieldsOptions) 
          //     }, 1000);
          // }
         if(this.product.RelatedProducts){
             this.handleRelatedProducts()
          }
      }
    }
  },
  created() {
    this.$emit("setDataFromChild", this.postInfo);
    this.fetchAllCategories();
    this.fetchAllProducts();
    this.fetchAllFields();
  },
  methods: {
    // Send Data To Parent
    sentDataToParent() {
      this.$emit("setDataFromChild", this.postInfo);
    },
    getFilteredProducts(text) {
      this.filteredProducts = [];
      let filters = {};
      filters.searchQuery = text;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.fetchAllProducts(filters);
      }, 500);
    },
    // Fetch Products
    async fetchAllProducts(filters) {
      this.productsFilterLoading = true;
      const products = await productsRepository.getAllProducts(this.page, this.limit, filters)
      console.log('products',products)
      if( products&&products.Products.rows){
         products.Products.rows.map(item => {
           this.filteredProducts.push({id: item.id, name: item.trans.name});
        });
      }     
      this.productsFilterLoading = false;
    },
    // Fetch Categories
    async fetchAllCategories() {
      const categories = await categoriesRepository.getAllSubCategories(
        this.page,
        this.limit
      );
      this.allCategories = categories
      let allCategories = []
      categories.map(category => {
        // if(category.children){
        //   category.children.map(item => {
        //     allCategories.push({id: item.id, name: item.trans[0].title})
        //   })
        // }
        allCategories.push({id: category.id, name: category.trans[0].title})
      })
      this.mainCategories = allCategories
      // this.categories = allCategories
    },

    changeMainCategory(e){
      let allCategories = []
      this.postInfo.category = null
      this.allCategories.map(category => {
        if(category.id === e.id){
          category.children.map(item => {
            allCategories.push({id: item.id, name: item.trans[0].title})
          })
        }
      })
      this.categories = allCategories
    },
    filterCategory(itemCategory){
        // this.categories.map(item => {
        //   if(item.id === categoryId){
        //      this.postInfo.category = item
        //   }
        // })
        this.allCategories.map(category => {
          if(category.id === itemCategory.parent_id){
            this.mainCategory  = {name: category.trans[0].title, id: category.id}
            this.changeMainCategory(this.mainCategory)
              category.children.map(item => {
                  if(item.id === itemCategory.id){
                    this.postInfo.category = {id: item.id, name: item.trans[0].title}
                    
                  }
              })
          }
          
        })
        
    },
    handleRelatedProducts(){
        let allProduct = []
        this.product.RelatedProducts.map(item => {
          allProduct.push({id: item.related_prod.id, name: item.related_prod.trans[0].name})
        })
        this.postInfo.related_products = allProduct
    },
    // Add New Variant
    addVariant(){
      this.variants.push({type: '', arName: '', enName: ''})
    },
    handleVariantData(){
      let data = []
      this.variantsType.map((item, index) => {
        data.push({fieldId: item.id, options: []})
        this.variants.map(variant => {
          if(item.id === variant.type.id){
            data[index].options.push({ar: variant.arName, en: variant.enName})
          }
        })
      })
      let allData = data.filter(item=>{ 
        if(item.options.length){
          return item
        }
       })
      this.postInfo.variants = allData
    },
    // Fetch All Items
    async fetchAllFields() {
        const fields = await fieldsRepository.getAllFields(1, 9999)
        if(fields.rows){
          fields.rows.map(item => {
            this.variantsType.push({id: item.id, name: item.trans[1].name})
          })
          
        }
        
    },
    
    filterFields(fields) {
        fields.map(item => {
          let type = null
          this.variantsType.map(itemData => {
            if(itemData.id === item.field_id){
              type = itemData
            }
          })
          this.currentVariants.push({type: type, ar: item.trans[0], en: item.trans[1], id: item.id})
        })
    },
    deleteCurrentVariant(index, item){
      this.currentVariants.splice(index, 1)
      this.postInfo.variantsDeleted.push(item.id)
    },
    deleteVariant(index){
      this.variants.splice(index, 1)
    },
    optionChanged(option){
        this.postInfo.optionsChanged.map((item, index) => {
          if(option.id === item.id){
             this.postInfo.optionsChanged[index].name = option.name
          }
        })
        this.postInfo.optionsChanged.push({id: option.id, name: option.name})
      
      this.postInfo.optionsChanged = [...new Map(this.postInfo.optionsChanged.map(item => [item.id, item])).values()]
   
    },
   
  }
};


</script>
<style lang="scss" scoped>
  .v-select.select--with--icon{
    width: 100% !important;
    min-width: unset !important;
  }
  .width-100{
    width: 100% !important;
    min-width: 100% !important;
  }
</style>