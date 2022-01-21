<template>
    <div class="main--menu--horizontal">
        <!-- <div class="wrap--content"> -->

        <ul class="menu-list nav">
            <li v-for="(list, index) in allLinks" :key="index">
                <router-link
                    :to="list.link"
                    class="navbar-item"
                    exact-active-class="is-active"
                >
                    <!-- <span class="icon">
                        <i :class="list.icon"></i>
                    </span> -->
                    <span class="text-aside">{{ list.name }}</span>
                </router-link>

                <!-- <ul class="sub--menu">
                        <li v-for="(item, indexSub) in list.childLinks" :key="indexSub">
                            <router-link :to="item.link" class="navbar-item" exact-active-class="is-active">
                                <span class="icon">
                                    <i :class="item.icon"></i>
                                </span>
                                <span class="text-aside">{{ item.name }}</span>
                            </router-link>
                        </li>
                </ul>-->
            </li>
            <li>
                <b-dropdown aria-role="list">
                    <a class="navbar-item" slot="trigger">
                        <!-- <span class="icon">
                            <i class="far fa-flag"></i>
                        </span> -->
                        <span class="text-aside">Pages</span>
                        <span class="icon icon--right">
                            <i class="fas fa-angle-down"></i>
                        </span>
                    </a>
                    <b-dropdown-item class="sub--item" has-link>
                        <router-link
                            to="/contactUs"
                            class="navbar-item"
                            exact-active-class="is-active"
                        >
                            <span class="text-aside">Contact Us</span>
                        </router-link>
                    </b-dropdown-item>
                    <b-dropdown-item class="sub--item" has-link>
                        <router-link
                            to="/aboutUs"
                            class="navbar-item"
                            exact-active-class="is-active"
                        >
                            <span class="text-aside">About Us</span>
                        </router-link>
                    </b-dropdown-item>
                    <b-dropdown-item class="sub--item" has-link>
                        <router-link
                            to="/policy"
                            class="navbar-item"
                            exact-active-class="is-active"
                        >
                            <span class="text-aside">Policy</span>
                        </router-link>
                    </b-dropdown-item>
                    <b-dropdown-item class="sub--item" has-link>
                        <router-link
                            to="/refundPolicy"
                            class="navbar-item"
                            exact-active-class="is-active"
                        >
                            <span class="text-aside">Refund Policy</span>
                        </router-link>
                    </b-dropdown-item>
                    <b-dropdown-item class="sub--item" has-link>
                        <router-link
                            to="/termsAndCondition"
                            class="navbar-item"
                            exact-active-class="is-active"
                        >
                            <span class="text-aside">Terms And Condition</span>
                        </router-link>
                    </b-dropdown-item>
                    <b-dropdown-item class="sub--item" has-link>
                        <router-link
                            to="/splash"
                            class="navbar-item"
                            exact-active-class="is-active"
                        >
                            <span class="text-aside">Splash</span>
                        </router-link>
                    </b-dropdown-item>
                    <b-dropdown-item class="sub--item" has-link>
                        <router-link
                            to="/shippingPolicy"
                            class="navbar-item"
                            exact-active-class="is-active">
                            <span class="text-aside">Shipping Policy</span>
                        </router-link>
                    </b-dropdown-item>
                    <b-dropdown-item class="sub--item" has-link>
                        <router-link
                            to="/paymentPolicy"
                            class="navbar-item"
                            exact-active-class="is-active">
                            <span class="text-aside">Payment Policy</span>
                        </router-link>
                    </b-dropdown-item>
                    <b-dropdown-item class="sub--item" has-link>
                        <router-link
                            to="/giftCarts"
                            class="navbar-item"
                            exact-active-class="is-active">
                            <span class="text-aside">Gift Carts</span>
                        </router-link>
                    </b-dropdown-item>
                    <b-dropdown-item class="sub--item" has-link>
                        <router-link
                            to="/social"
                            class="navbar-item"
                            exact-active-class="is-active">
                            <span class="text-aside">Social</span>
                        </router-link>
                    </b-dropdown-item>
                    <b-dropdown-item class="sub--item" has-link>
                        <router-link
                            to="/contacts"
                            class="navbar-item"
                            exact-active-class="is-active">
                            <span class="text-aside">Contacts</span>
                        </router-link>
                    </b-dropdown-item>
                    <b-dropdown-item class="sub--item" has-link>
                        <router-link
                            to="/subscribe"
                            class="navbar-item"
                            exact-active-class="is-active">
                            <span class="text-aside">Subscribes</span>
                        </router-link>
                    </b-dropdown-item>
                </b-dropdown>
            </li>
            <li>
                <b-dropdown aria-role="list">
                    <a class="navbar-item" slot="trigger">
                        <span class="text-aside">Home</span>
                        <span class="icon icon--right">
                            <i class="fas fa-angle-down"></i>
                        </span>
                    </a>
                    <b-dropdown-item class="sub--item" has-link>
                        <router-link
                            to="/homeSlider"
                            class="navbar-item"
                            exact-active-class="is-active">
                            <span class="text-aside">Home Slider</span>
                        </router-link>
                    </b-dropdown-item>
                    <b-dropdown-item class="sub--item" has-link>
                        <router-link
                            to="/chooseUs"
                            class="navbar-item"
                            exact-active-class="is-active">
                            <span class="text-aside">Choose Us</span>
                        </router-link>
                    </b-dropdown-item>
                </b-dropdown>
            </li>
        </ul>
        <!-- </div> -->
    </div>
</template>

<script>
import { mapState } from "vuex";
import { LangAR, LangEN } from "./../../helpers/lang/Lang";

export default {
    data() {
        return {
            scrollSettings: {
                maxScrollbarLength: 160,
            },
            allLinks: [
                {
                    name: LangEN.menuItems.dashboard,
                    link: "/",
                    icon: "fas fa-tachometer-alt",
                    role: true,
                },
                {
                    name: LangEN.menuItems.categories,
                    link: "/categories",
                    icon: "fas fa-puzzle-piece",
                    role: true,
                },
                {
                    name: LangEN.menuItems.products,
                    link: "/products",
                    icon: "fas fa-shopping-cart",
                    role: true,
                },
                {
                    name: LangEN.menuItems.fields,
                    link: "/fields",
                    icon: "fas fa-tasks",
                    role: true,
                },
                {
                    name: LangEN.menuItems.currencies,
                    link: "/currencies",
                    icon: "fas fa-dollar-sign",
                    role: true,
                },
                {
                    name: LangEN.menuItems.countries,
                    link: "/countries",
                    icon: "fas fa-flag",
                    role: true,
                },
                {
                    name: LangEN.menuItems.stores,
                    link: "/stores",
                    icon: "fas fa-store",
                    role: true,
                },
                {
                    name: LangEN.menuItems.orders,
                    link: "/orders",
                    icon: "far fa-list-alt",
                    role: true,
                },
                {
                    name: 'Notifications',
                    link: "/notifications",
                    icon: "far fa-bell",
                    role: true,
                },
            ],
            AsideLinks: [],
        };
    },
    computed: {
        ...mapState({
            userData: (state) => state.login.userData,
            // role: state => state.login.userDataPermission
        }),
    },
    // mounted() {
    //     if (this.userData.lang === "ar") {
    //         this.lang = LangAR;
    //         this.setMenuItems();
    //     } else {
    //         this.lang = LangEN;
    //         this.setMenuItems();
    //     }
    // },
    // watch: {
    //     role() {
    //         if (this.role) {
    //             this.checkLinksRole();
    //         }
    //     }
    // },
    created() {
        // this.checkLinksRole();
    },

    methods: {
        // Set Menu Items
    },
};
</script>

<style>
.active--menu {
    display: block;
}

.close--menu {
    display: none;
}
</style>
