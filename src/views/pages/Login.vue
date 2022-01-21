<template>
    <div class="login--page">
        <div class="login--form">
            <div class="card--block">
                <template v-if="loginErrorMessage">
                    <b-message type="is-danger" has-icon class="align-items-center">
                        {{loginErrorMessage}}
                    </b-message>
                </template>
                <form @submit.prevent="loginSubmit()">
                    <div class="logo--head">
                        <img src="../../assets/images/logo.png" alt="Nawah">
                    </div>
                    <b-field class="field-group">
                        <b-input type="text" placeholder="Enter your email or mobile number" icon="email-outline" v-model="userLogin.user_id" />
                    </b-field>
                    <b-field class="field-group">
                        <b-input type="password" placeholder="Password" icon="key" v-model="userLogin.password"/>
                    </b-field>
                    <div class="text-center">
                        <button class="button button-block is-primary w-100" :disabled="formValid" :class="{'is-loading': isLoading}">Login</button>
                    </div>
                </form>
            </div>
            <div class="text--lower">
                <router-link to="/forgotPassword">Forgot Password?</router-link>
            </div>
        </div>

    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {

        userLogin:{
          user_id: '+201065353173',
          password: 'Super123!@#',
          // user_id: '',
          // password: '',
        },
        formValid: false,
      }
    },
    computed: {
      ...mapState({
          isLoading: state => state.login.isLoading,
          loginErrorMessage: state => state.login.loginErrorMessage,
          loginSuccessful: state => state.login.loggingIn,
      })
    },
    created(){
        this.$store.commit('resetState')
    },
    watch: {
      userLogin: {
        handler(){
          if(this.userLogin.user_id&& this.userLogin.password){
            this.formValid = false
          } else {
            this.formValid = true
          }
        },
        deep: true
      }
    },
    methods: {
      ...mapActions([
        'doLogin',
      ]),
      loginSubmit() {
        if(!this.formValid){
          this.doLogin({
            user_id: this.userLogin.user_id,
            password: this.userLogin.password
          })
        }

      }
    }
  }
</script>
