<template>
    <div class="block--item pl-5">
        <div class="row align-items-center">
            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="block--item--title d-flex align-items-center item--text">
                    <span class="icon ml-3">
                        <i class="fas fa-user"></i>
                    </span>
                    <div class="text--title text-capitalize">
                        {{user.name}}
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="item--text">
                    <span class="icon">
                        <i class="fas fa-envelope"></i>
                    </span>
                   {{user.email}}
                </div>
            </div>
            <div class="col-12 col-sm-6 col-xl table--item">
                <div class="item--text">
                    <span class="icon">
                        <i class="fas fa-phone"></i>
                    </span>
                    {{user.phone}}
                </div>
            </div>            
        </div>
    </div>
</template>

<script>

     // Repository Data
     import { RepositoryFactory } from '../../../repositories/RepositoryFactory'
     const usersRepository = RepositoryFactory.get('reports')
    export default {
        props: ['user', 'usersSelected'],
        data () {
            return {
                userSelected: false,
            };
        },
        watch:{
            usersSelected(){
                if(this.usersSelected.length){
                     this.usersSelected.map(item => {
                        if(item == this.user.id){
                            this.userSelected = true
                        }
                    })
                } else {
                     this.userSelected = false
                }

            }
        },
        methods: {

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

            aleartMessage(textMessage){
                this.$snackbar.open({
                    message: textMessage,
                    type: 'is-success',
                    position: 'is-bottom-right',
                    actionText: 'OK',
                    queue: false,
                    duration: 3000,
                    indefinite: false,
                })
            },
            confirmCustomDelete(id) {
                this.$dialog.confirm({
                    title: this.$t('usersPage.messages.deleteUser.title'),
                    message: this.$t('usersPage.messages.deleteUser.message'),
                    confirmText: this.$t('usersPage.messages.deleteUser.confirmText'),
                    cancelText: this.$t('usersPage.messages.deleteUser.cancelText'),
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.deleteUser(id)
                })
            }
        }
    }
</script>
