<template>
    <div>
        <div class="card--block">
            <div class="card-header">
                <p class="card-header-title">
                    Main Data
                </p>
            </div>
            <div class="card--content">
                <div class="row align-items-center">
                    <div class="col-12 col-xl-6">
                        <b-field class="field-group">
                            <b-input type="text" placeholder="AR Name" v-model="mainFieldPost.arName"/>
                        </b-field>
                    </div>
                    <div class="col-12 col-xl-6">
                        <b-field class="field-group">
                            <b-input type="text" placeholder="EN Name" v-model="mainFieldPost.enName"/>
                        </b-field>
                    </div>
                    <div class="col-12">
                        <b-field class="field-group">
                            <b-input type="textarea" rows="3" placeholder="AR Brief" v-model="mainFieldPost.arBrief"/>
                        </b-field>
                    </div>
                    <div class="col-12">
                        <b-field class="field-group mb-0">
                            <b-input type="textarea" rows="3" placeholder="EN Brief" v-model="mainFieldPost.enBrief"/>
                        </b-field>
                    </div>

                </div>
            </div>
            
        </div>
        <!-- AR Description Card -->
        <div class="card--block">
            <div class="card-header">
                <p class="card-header-title">
                    AR Description
                </p>
            </div>
            <div class="card--content">
                <vue-editor
                    :editorToolbar="toolbarEditor"
                    v-model="mainFieldPost.arDescription"/>
            </div>
        </div>
        <!-- EN Description Card -->
        <div class="card--block">
            <div class="card-header">
                <p class="card-header-title">
                    EN Description
                </p>
            </div>
            <div class="card--content">
                <vue-editor
                    :editorToolbar="toolbarEditor"
                    v-model="mainFieldPost.enDescription"/>
            </div>
        </div>
        
    </div>

</template>


<script>
    // Vue Editor
    import { VueEditor } from "vue2-editor";

    export default {
        props: ['product'],
        data() {
            return {
                mainFieldPost: {
                    arName: '',
                    enName: '',
                    arDescription: '',
                    enDescription: '',
                    arBrief: null,
                    enBrief: null,
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
                ]
            };
        },
        created(){
            this.resetData()
        },
        components: {
            VueEditor,
        },
        watch:{
            mainFieldPost: {
                handler(val){
                    this.sentDataToParent()
                },
                deep: true
            },
            product(){
                if(this.product){
                    // this.mainFieldPost.arName = this.product.trans.find(i => i.locale === 'ar').name
                    this.mainFieldPost.arName = this.product.trans[0].name
                    this.mainFieldPost.enName = this.product.trans[1].name
                    this.mainFieldPost.arDescription = this.product.trans[0].description
                    this.mainFieldPost.enDescription = this.product.trans[1].description
                    this.mainFieldPost.arBrief = this.product.trans[0].brief
                    this.mainFieldPost.enBrief = this.product.trans[1].brief
                }
            }
        },
        methods: {
            // Send Data To Parent
            sentDataToParent() {
                this.$emit('setDataFromChild', this.mainFieldPost)
            },
            // Reset Data
            resetData(){
                this.$store.commit('resetPostData')
            }
        },
        
    }
</script>

