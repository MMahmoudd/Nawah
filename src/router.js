import Vue from "vue";
import Router from "vue-router";
import Wrapper from "./Wrapper";
import AuthPages from "./views/pages/AuthPages";

Vue.use(Router);

// function isIModuleHasPermissions(userPermissions, role) {
//     for (var key in userPermissions) {
//         if (userPermissions[key] === role) {
//             return true;
//         }
//     }
//     return false;
// }

function routerGuard(to, from, next) {
    // const userData = JSON.parse(localStorage.getItem('userData'))
    // if (userData) {
    //     if (userData.status === 0) {
    //         return next("/login");
    //     }
    //     if (to.meta.role) {
    //         if (isIModuleHasPermissions(userData.permissions, to.meta.role)) {
    //             return next();
    //         }
    //         return next("/notAuthorized");
    //     } else {
    //         return next();
    //     }
    // }
    return next();
}

const router = new Router({
    mode: "hash",
    base: process.env.BASE_URL + "/dashboard",
    routes: [{
            path: "/authPages",
            component: AuthPages,
            children: [{
                    path: "/login",
                    name: "login",
                    component: () => import("./views/pages/Login.vue")
                },
                {
                    path: "/forgetPassword",
                    name: "forgotPassword",
                    component: () => import("./views/pages/forgotPassword.vue")
                },
            ]
        },
        {
            path: "/",
            component: Wrapper,
            beforeEnter: routerGuard,
            redirect: "/",
            children: [{
                    path: "",
                    name: "dashboard",
                    component: () => import("./views/dashboard/Dashboard"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/users",
                    name: "users",
                    component: () => import("./views/users/Users.vue"),
                    meta: {
                        role: "user.view"
                    },
                    beforeEnter: routerGuard
                },
                {
                    path: "/userForm/:id?",
                    name: "userForm",
                    props: true,
                    component: () => import("./views/users/Form.vue"),
                    meta: {
                        role: "user.update"
                    },
                    beforeEnter: routerGuard
                },
                {
                    path: "/myProfile",
                    name: "myProfile",
                    props: true,
                    component: () => import("./views/pages/MyProfile.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/roles",
                    name: "Roles",
                    component: () => import("./views/groups/Groups.vue"),
                    // meta: {
                    //     role: "role.view"
                    // },
                    beforeEnter: routerGuard
                },
                {
                    path: "/groupForm/:id?",
                    name: "groupForm",
                    component: () => import("./views/groups/Form.vue"),
                    // meta: {
                    //     role: "role.update"
                    // },
                    beforeEnter: routerGuard
                },
                {
                    path: "/categories/:id?",
                    name: "categories",
                    component: () =>
                        import("./views/categories/Categories.vue"),
                    // meta: {
                    //     role: "category.view"
                    // },
                    beforeEnter: routerGuard
                },
                {
                    path: "/categoryForm/:id?",
                    name: "categoryForm",
                    component: () => import("./views/categories/Form.vue"),
                    // meta: {
                    //     role: "category.update"
                    // },
                    beforeEnter: routerGuard
                },
                {
                    path: "/countries/:id?",
                    name: "countries",
                    component: () =>
                        import("./views/countries/Countries.vue"),
                    // meta: {
                    //     role: "category.view"
                    // },
                    beforeEnter: routerGuard
                },
                {
                    path: "/cities/:id?",
                    name: "cities",
                    component: () =>
                        import("./views/countries/Cities.vue"),
                    // meta: {
                    //     role: "category.view"
                    // },
                    beforeEnter: routerGuard
                },
                {
                    path: "/countryForm/:id?",
                    name: "countryForm",
                    component: () => import("./views/countries/Form.vue"),
                    // meta: {
                    //     role: "category.update"
                    // },
                    beforeEnter: routerGuard
                },
                {
                    path: "/fields/:id?",
                    name: "attributes",
                    component: () =>
                        import("./views/fields/Fields.vue"),
                    // meta: {
                    //     role: "category.view"
                    // },
                    beforeEnter: routerGuard
                },
                {
                    path: "/fieldForm/:id?",
                    name: "fieldForm",
                    component: () => import("./views/fields/Form.vue"),
                    // meta: {
                    //     role: "category.update"
                    // },
                    beforeEnter: routerGuard
                },
                {
                    path: "/currencies/:id?",
                    name: "currencies",
                    component: () =>
                        import("./views/currencies/Currencies.vue"),
                    // meta: {
                    //     role: "category.view"
                    // },
                    beforeEnter: routerGuard
                },
                {
                    path: "/currencyForm/:id?",
                    name: "currencyForm",
                    component: () => import("./views/currencies/Form.vue"),
                    // meta: {
                    //     role: "category.update"
                    // },
                    beforeEnter: routerGuard
                },
                {
                    path: "/products",
                    name: "All Products",
                    component: () =>
                        import("./views/products/Products.vue"),
                    // meta: {
                    //     role: "category.view"
                    // },
                    beforeEnter: routerGuard
                },
                {
                    path: "/productForm/:id?",
                    name: "productForm",
                    component: () => import("./views/products/Form.vue"),
                    meta: {
                        role: "product.update"
                    },
                    beforeEnter: routerGuard
                },

                {
                    path: "/stores/:id?",
                    name: "stores",
                    component: () =>
                        import("./views/stores/Stores.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/storeForm/:id?",
                    name: "storeForm",
                    component: () => import("./views/stores/Form.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/notifications/:id?",
                    name: "notifications",
                    component: () =>
                    import("./views/notifications/Notifications.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/notificationForm/:id?",
                    name: "notificationForm",
                    component: () => import("./views/notifications/Form.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/notificationsHistory/:id?",
                    name: "notificationsHistory",
                    component: () =>
                        import("./views/notifications/NotificationsHistory.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/orders/:id?",
                    name: "New Orders",
                    component: () =>
                        import("./views/orders/index.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/viewOrder/:id?",
                    name: "viewOrder",
                    component: () =>
                        import("./views/orders/ViewOrder.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/vouchers/:id?",
                    name: "vouchers",
                    component: () =>
                        import("./views/vouchers/index.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/voucherForm/:id?",
                    name: "voucherForm",
                    component: () =>
                        import("./views/vouchers/Form.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/assignForm/:id?",
                    name: "assignForm",
                    component: () =>
                        import("./views/vouchers/AssignForm.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/contactUs",
                    name: "contactUs",
                    component: () =>
                        import("./views/page/ContactUs.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/aboutUs",
                    name: "aboutUs",
                    component: () =>
                        import("./views/page/AboutUs.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/policy",
                    name: "policy",
                    component: () =>
                        import("./views/page/Policy.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/Keywords",
                    name: "Keywords",
                    component: () =>
                        import("./views/page/Keywords.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/refundPolicy",
                    name: "refundPolicy",
                    component: () =>
                        import("./views/page/RefundPolicy.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/termsAndCondition",
                    name: "termsAndCondition",
                    component: () =>
                        import("./views/page/TermsAndCondition.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/splash",
                    name: "splash",
                    component: () =>
                        import("./views/page/Splash.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/shippingPolicy",
                    name: "shippingPolicy",
                    component: () =>
                        import("./views/page/ShippingPolicy.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/paymentPolicy",
                    name: "paymentPolicy",
                    component: () =>
                        import("./views/page/PaymentPolicy.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/giftCarts",
                    name: "giftCarts",
                    component: () =>
                        import("./views/page/GiftCarts.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/social",
                    name: "social",
                    component: () =>
                        import("./views/page/Social.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/contacts",
                    name: "contacts",
                    component: () =>
                        import("./views/page/Contacts.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/subscribe",
                    name: "subscribe",
                    component: () =>
                        import("./views/page/Subscribe.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/homeSlider",
                    name: "homeSlider",
                    component: () =>
                        import("./views/home/homeSlider/index.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/homeSliderForm/:id?",
                    name: "homeSliderForm",
                    component: () =>
                        import("./views/home/homeSlider/Form.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/chooseUs/:id?",
                    name: "chooseUs",
                    component: () =>
                        import("./views/home/ChooseUs.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/preferences",
                    name: "preferences",
                    component: () =>
                        import("./views/home/Preferences.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/websiteTitle",
                    name: "websiteTitle",
                    component: () =>
                        import("./views/home/WebsiteTitle.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/mobileLinks",
                    name: "mobileLinks",
                    component: () =>
                        import("./views/home/MobileLinks.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/users/:id?",
                    name: "users",
                    component: () =>
                        import("./views/users/Users.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/paymentMethoud",
                    name: "paymentMethods",
                    component: () =>
                        import("./views/paymentMethods/PaymentMethods.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/paymentForm/:id?",
                    name: "paymentForm",
                    component: () => import("./views/paymentMethods/Form.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/shippingMethoud",
                    name: "shippingMethods",
                    component: () =>
                        import("./views/shipping/index.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/shippingForm/:id?",
                    name: "shippingForm",
                    component: () => import("./views/shipping/Form.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/featured",
                    name: "featured",
                    // component: () =>
                        // import("./views/shipping/index.vue"),
                    // beforeEnter: routerGuard
                },
                {
                    path: "/admins",
                    name: "assignRoleToAdmins",
                    component: () =>
                        import("./views/assign/Assign.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/adminForm/:id?",
                    name: "adminForm",
                    props: true,
                    component: () => 
                    import("./views/assign/Form.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/discount",
                    name: "discount",
                    // component: () =>
                        // import("./views/shipping/index.vue"),
                    // beforeEnter: routerGuard
                },
                {
                    path: "/product-reports",
                    name: "productReports",
                    component: () =>
                        import("./views/reports/products.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/users-reports",
                    name: "usersReports",
                    component: () =>
                        import("./views/reports/users.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/orders-reports",
                    name: "ordersReports",
                    component: () =>
                        import("./views/reports/orders.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/order-status",
                    name: "orderStatus",
                    component: () =>
                        import("./views/orders/status.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/statusForm/:id?",
                    name: "statusForm",
                    component: () => import("./views/orders/statusForm.vue"),
                    meta: {
                        role: "product.update"
                    },
                    beforeEnter: routerGuard
                },
                {
                    path: "/add-new-user",
                    name: "addNewUser",
                    component: () =>
                        import("./views/assign/AddNew.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/keywordForm/:id?",
                    name: "keywordForm",
                    component: () => import("./views/seo/Form.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/stock",
                    name: "stock",
                    component: () => import("./views/stock/stock.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/stockForm/:id?",
                    name: "stockForm",
                    component: () => import("./views/stock/Form.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/stockData/:id?",
                    name: "stockForm",
                    component: () => import("./views/stock/stockData.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/stockDataSlider/:id?",
                    name: "stockForm",
                    component: () => import("./views/stock/stockDataSlider.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/banks",
                    name: "banks",
                    component: () => import("./views/banks/Banks.vue"),
                    beforeEnter: routerGuard
                },
                {
                    path: "/bankForm/:id?",
                    name: "bankForm",
                    component: () => import("./views/banks/Form.vue"),
                    beforeEnter: routerGuard
                },
                // {
                //     path: "/maps",
                //     name: "maps",
                //     component: () => import("./views/locations/location.vue"),
                //     beforeEnter: routerGuard
                // },

                {
                    path: "/notAuthorized",
                    name: "notAuthorized",
                    component: () => import("./views/pages/NotAuthorized.vue")
                },

            ]
        }
    ],
    scrollBehavior() {
        return {
            x: 0,
            y: 0
        };
    }
});

router.beforeEach((to, from, next) => {
    const publicPages = ["/login", "/forgotPassword"];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem("token");
    if (to.path == "/login" && loggedIn) {
        router.push({
            path: "/"
        });
    }
    if (authRequired && !loggedIn) {
        return next({
            path: '/login',
            // query: { returnUrl: to.path }
        });
    }

    next();
});

export default router;
