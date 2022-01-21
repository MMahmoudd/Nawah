
const GlobalSettings = {
    state: {
        menuTheme: localStorage.getItem('menuThemeType') ? localStorage.getItem('menuThemeType') : 'vertical',
    },
    getters: {

    },
    mutations: {
        setMenuTheme(state, theme){
            state.menuTheme = theme
            localStorage.setItem('menuThemeType', theme)
            this.commit('miniSidebarOpen')
        },
    },
    actions: {

    }
};

export default GlobalSettings;
