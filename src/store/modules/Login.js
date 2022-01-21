import axios from "axios";
import router from "./../../router";
const Login = {
    state: {
        isLoading: false,
        loginErrorMessage: null,
        loginSuccessful: false,
        userData: JSON.parse(localStorage.getItem("userData")) ,
        successMessage: "",
        successMessageReset: "",
        userDataPermission: [],
        userAuth: "",
        userToken: "",
        token: localStorage.getItem("token"),
    },
    getters: {
        token(state){
            return  state.token;
        }
    },
    mutations: {
        resetState(state) {
            state.isLoading = false;
            state.loginErrorMessage = null;
            state.loginSuccessful = false;
            state.successMessage = "";
            state.successMessageReset = "";
        },
        // Logout
        logout() {
            localStorage.removeItem("token");
            localStorage.removeItem("userData")
            router.push("/login");
        },
        //  Set Token
        setToken(state, data) {
            localStorage.setItem("token", data.token);
            state.token = data.token;
        }
    },
    actions: {
        doLogin({ commit, state, dispatch }, loginData) {
            commit("resetState");
            state.isLoading = true;
            axios
                .post("/auth/signin", loginData)
                .then(response => {
                    if(response.data.status === 404 || response.data.status === 401){
                        state.isLoading = false;
                        return state.loginErrorMessage = response.data.message;
                    }
                    state.isLoading = false;
                    
                    if(response.data.user){
                        commit("setToken", response.data.user.accessToken);
                        localStorage.setItem("userData", JSON.stringify(response.data.user));
                        state.userData = response.data.user
                        state.userDataPermission = response.data.user.roles;
                        window.location.href = "/";
                    }
                })
                .catch(error => {
                    state.isLoading = false;
                });
        },

        // Forgot Password
        forgotPassword({ commit, state }, loginData) {
            commit("resetState");
            axios
                .post("/auth/forget", loginData)
                .then(response => {
                    state.isLoading = false;
                    state.successMessage = response.data.message;
                })
                .catch(error => {
                    state.loginErrorMessage = error.data.errors[0];
                    state.isLoading = false;
                });
        },

        // Reset Password
        resetPassword({ commit, state }, loginData) {
            commit("resetState");
            axios
                .post("/auth/reset-password", loginData)
                .then(response => {
                    state.isLoading = false;
                    state.successMessageReset = response.data.message;
                })
                .catch(error => {
                    state.loginErrorMessage = error.data.errors[0];
                    state.isLoading = false;
                });
        },

        async checkUserData({ state }) {
            try {
                const AuthStr = 'Bearer ' + state.token;
                const response = await axios
                    .get("/auth/user", { headers: { Authorization: AuthStr }});
                localStorage.setItem("userData", JSON.stringify(response.data.data));
                state.userData = response.data.data;
                state.userDataPermission = response.data.user.permissions;
                window.location.href = "/";
            }
            catch (error) {
                state.loginErrorMessage = error.data.data[0];
            }
        },
        fetchUserData({ state }) {
            axios.get("/auth/user").then(response => {
                let userData = response.data.data
                let lang = localStorage.getItem('language')? localStorage.getItem('language') : null
                if (lang){
                    userData.lang = lang
                    localStorage.setItem("userData", JSON.stringify(userData));
                } else {
                    localStorage.setItem("userData", JSON.stringify(userData));
                }
                state.userData = response.data.data;
            })
        }
    }
};

export default Login;
