<template>
    <div>
        <aside class="menu shadow main--sidebar" :class="{ 'toggleNavSlide': toggleNavSlide}">
            <div class="wrap--upper--nav">
                <span class="icon" @click="toggleNavOpen">
                    <i class="mdi mdi-menu"></i>
                </span>
                <div class="head-logo">
                    <img src="../../assets/images/logo.png" alt="Nawah">
                </div>
            </div>
            <perfect-scrollbar class="menu--scroll">
                <ul class="menu-list">
                    <li v-for="(list,i) in AsideLinks" :key="i">
                        <a v-if="list.media" class="navbar-item" @click="openMedia()">
                            <span class="icon">
                                <i :class="list.icon"></i>
                            </span>
                            <span class="text-aside">{{ list.name }}</span>
                        </a>
                        <router-link
                            v-else-if="!list.childLinks"
                            :to="list.link"
                            class="navbar-item"
                            exact-active-class="is-active"
                        >
                            <span class="icon">
                                <i :class="list.icon"></i>
                            </span>
                            <span class="text-aside">{{ list.name }}</span>
                        </router-link>

                        <menu-item
                            v-if="list.childLinks"
                            :toggleNavSlide="toggleNavSlide"
                            :list="list"
                        />
                    </li>
                </ul>
            </perfect-scrollbar>
        </aside>
        <transition name="fade">
            <div @click="closeSidebar()" class="overlay--mainSidebar"></div>
        </transition>

        <div class="overlay--sidebar" @click="closeNavMenu"></div>
    </div>
</template>

<script>
import MenuItem from "./MenuItem";
import { mapState } from "vuex";
import { LangAR, LangEN } from "./../../helpers/lang/Lang";

export default {
    data() {
        return {
            scrollSettings: {
                maxScrollbarLength: 160
            },
            links: [],
            AsideLinks: []
        };
    },
    computed: {
        ...mapState({
            userData: state => state.login.userData,
            role: state => state.login.userDataPermission,
            toggleNavSlide: state => state.toggleNavSlide
        })
    },
    // watch: {
    //     role() {
    //         if (this.role) {
    //             this.checkLinksRole();
    //         }
    //     }
    // },
    // created() {
    //     this.checkLinksRole();
    // },
    mounted() {

        if (this.userData.lang === "ar") {
            this.lang = LangAR;
            this.setMenuItems();
        } else {
            this.lang = LangEN;
            this.setMenuItems();
        }
    },
    components: {
        MenuItem
    },

    methods: {
        // Set Menu Items
        setMenuItems() {
            this.AsideLinks = [
                {
                    name: this.lang.menuItems.dashboard,
                    link: "/",
                    icon: "fas fa-tachometer-alt",
                    role: true,
                },
                {
                    name: this.lang.menuItems.geography,
                    icon: "fas fa-atlas",
                    role: true,
                    childLinks:[
                         {
                            name: this.lang.menuItems.countries,
                            link: "/countries",
                            icon: "fas fa-flag",
                            role: true
                        },
                        {
                            name: this.lang.menuItems.currencies,
                            link: "/currencies",
                            icon: "fas fa-dollar-sign",
                            role: true
                        },
                    ]
                },
                {
                    name: this.lang.menuItems.products,
                    icon: "fas fa-shopping-cart",
                    role: true,
                    childLinks:[
                         {
                            name: this.lang.menuItems.allProducts,
                            link: "/products",
                            icon: "fas fa-shopping-cart",
                            role: true
                        },
                        {
                            name: this.lang.menuItems.categories,
                            link: "/categories",
                            icon: "fas fa-puzzle-piece",
                            role: true
                        },
                        {
                            name: this.lang.menuItems.attributes ,
                            link: "/fields",
                            icon: "fas fa-tasks",
                            role: true
                        },
                        // {
                        //     name: this.lang.menuItems.featured ,
                        //     link: "/featured",
                        //     // icon: "fas fa-tasks",
                        //     role: true
                        // },
                    ]
                },
                {
                    name: this.lang.menuItems.optionsView,
                    icon: "fas fa-binoculars",
                    role: true,
                    childLinks:[
                         {
                            name: this.lang.menuItems.paymentMethoud,
                            link: "/paymentMethoud",
                        },
                        {
                            name: this.lang.menuItems.shippingMethoud,
                            link: "/shippingMethoud",
                        },
                    ]
                },
                {
                    name: this.lang.menuItems.orders,
                    icon: "fas fa-shopping-basket",
                    role: true,
                    childLinks:[
                         {
                            name: this.lang.menuItems.orders,
                            link: "/orders",
                        },
                        {
                            name: this.lang.menuItems.orderStatus,
                            link: "/order-status",
                        },
                    ]
                },
                {
                    name: this.lang.menuItems.contactForm,
                    link: "/contacts",
                    icon: "far fa-address-card",
                    role: true
                },
                {
                    name: this.lang.menuItems.notificationsCenter,
                    icon: "far fa-bell",
                    role: true,
                    childLinks:[
                        {
                            name: this.lang.menuItems.notifications,
                            link: "/notifications",
                        },
                        {
                            name: this.lang.menuItems.user,
                            link: "/users",
                        },
                        {
                            name: this.lang.menuItems.history,
                            link: "notificationsHistory",
                        },
                    ]
                },
                {
                    name: this.lang.menuItems.marketing,
                    icon: "fas fa-mail-bulk",
                    role: true,
                    childLinks:[
                        {
                            name: this.lang.menuItems.vouchers,
                            link: "/vouchers",
                            icon: "far fa-list-alt",
                            role: true
                        },
                    ]
                },
                {
                    name: this.lang.menuItems.websiteHomePage,
                    icon: "fas fa-home",
                    role: true,
                    childLinks:[
                        {
                            name: this.lang.menuItems.homeSlider,
                            link: "/homeSlider",
                        },
                        {
                            name: this.lang.menuItems.preferences,
                            link: "/preferences",
                        },
                        {
                            name: this.lang.menuItems.websiteTitleAndIcon,
                            link: "/websiteTitle",
                        },
                        {
                            name: this.lang.menuItems.chooseUs,
                            link: "/chooseUs",
                        },
                    ]
                },
                {
                    name: this.lang.menuItems.websiteFooter,
                    icon: "fas fa-microchip",
                    role: true,
                    childLinks:[
                        {
                            name: this.lang.menuItems.ShippingAndDelivery,
                            link: "/shippingPolicy",
                        },
                        {
                            name: this.lang.menuItems.PaymentOptions,
                            link: "/paymentPolicy",
                        },
                        {
                            name: this.lang.menuItems.RefundPolicy,
                            link: "/refundPolicy",
                        },
                        // {
                        //     name: 'Keywords',
                        //     link: "/Keywords",
                        // },
                        {
                            name: this.lang.menuItems.GiftCards,
                            link: "/giftCarts",
                        },
                        {
                            name: this.lang.menuItems.Subscribes,
                            link: "/subscribe",
                        },
                        {
                            name: this.lang.menuItems.mobileLinkes,
                            link: "/mobileLinks",
                        },
                    ]
                },
                {
                    name: this.lang.menuItems.mobileConfiguration,
                    icon: "fas fa-mobile",
                    role: true,
                    childLinks:[
                        {
                            name: this.lang.menuItems.WalkThrough,
                            link: "/splash",
                        },
                    ]
                },
                {
                    name: this.lang.menuItems.commonConfiguration,
                    icon: "fas fa-store",
                    role: true,
                    childLinks:[
                        {
                            name: this.lang.menuItems.SocialLinks,
                            link: "/social",
                        },
                        {
                            name: this.lang.menuItems.ContactInfo,
                            link: "/contactUs",
                        },
                        {
                            name: this.lang.menuItems.AboutUs,
                            link: "/aboutUs",
                        },
                        {
                            name: this.lang.menuItems.TermsAndCondition,
                            link: "/termsAndCondition",
                        },
                        {
                            name: this.lang.menuItems.stores,
                            link: "/stores",
                        },
                    ]
                },
                // {
                //     name: "Banks",
                //     icon: "fas fa-university",
                //     role: true,
                //     childLinks:[
                //         {
                //             name: "Banks",
                //             link: "/banks",
                //         },
                //     ]
                // },
                // {
                //     name: "Stock",
                //     icon: "fas fa-cubes",
                //     role: true,
                //     childLinks:[
                //         {
                //             name: "Stock",
                //             link: "/stock",
                //         },
                //     ]
                // },
                {
                    name: this.lang.menuItems.Reports,
                    icon: "fas fa-scroll",
                    role: true,
                    childLinks:[
                        {
                            name: this.lang.menuItems.productsReport,
                            link: "/product-reports",
                        },
                        {
                            name: this.lang.menuItems.usersReports,
                            link: '/users-reports'
                        },
                        {
                            name: this.lang.menuItems.orderReports,
                            link: '/orders-reports'
                        }
                    ]
                },
                {
                    name: this.lang.menuItems.SEO,
                    icon: "fab fa-searchengin",
                    link:"/",
                    role: true,
                    childLinks:[
                        {
                            name: this.lang.menuItems.Keywords,
                            link: "/keywords",
                        },
                    ]
                },
                // {
                //     name: "Privilages",
                //     icon: "fab fa-superpowers",
                //     link:"/groups",
                //     role: true
                // },
                {
                    name: this.lang.menuItems.Privilages,
                    icon: "fab fa-superpowers",
                    role: true,
                    childLinks:[
                        {
                            name: this.lang.menuItems.Roles,
                            link: "/roles",
                        },
                        {
                            name: this.lang.menuItems.Admins,
                            link: "/admins",
                        },
                    ]
                },
            ];
            // this.checkLinksRole();
        },

        closeSidebar() {
            this.$store.commit("closeMainMenu");
        },
        toggleNavOpen() {
            this.$store.commit("toggleNavOpen");
        },
        closeNavMenu() {
            document.body.classList.remove("is--mainSidebar--open");
        },
        checkLinksRole() {
            this.links = [];
            const userPermission = JSON.parse(localStorage.getItem("userData"));
            this.AsideLinks.map(item => {
                if (userPermission.permissions.indexOf(item.role) > -1 || item.role === true) {
                    this.links.push(item);
                }
            });
        },
        openMedia() {
            this.$store.commit("openMediaModal");
        }
    }
};
</script>

<style>
.active--menu {
    display: block;
}
.close--menu {
    display: none;
}
.menu--scroll{
    direction: ltr;
}
</style>
