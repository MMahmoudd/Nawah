<template>
    <div class="statistics">
        <div class="row">
            <!-- <div class="col-12 col-sm-6 col-md-3 col-lg-6 pr-2">
                <div class="card--block">
                    <template v-if="usersTotal">
                        <div class="statistics--content">
                            <span class="statistics--icon is-primary-light">
                                <i class="far fa-user"></i>
                            </span>
                            <div class="text-center">
                                <p class="statistics--title">{{$t('dashboardPage.statistics.users')}}</p>
                                <p class="statistics--number">{{usersTotal}}</p>
                            </div>
                        </div>
                        <template v-if="chartUsersData">
                            <trend
                                :data="chartUsersData"
                                :gradient="['#89f7fe', '#66a6ff']"
                                auto-draw
                                smooth
                                :height="68"
                                :padding="0"
                                >
                            </trend>
                        </template>
                    </template>
                    <template v-else>
                        <loading-data></loading-data>
                    </template>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 col-lg-6 pl-2">
                <div class="card--block">
                    <template v-if="postsTotal">
                        <div class="statistics--content">
                            <span class="statistics--icon is-success-light">
                                <i class="far fa-newspaper"></i>
                            </span>
                            <div class="text-center">
                                <p class="statistics--title">{{$t('dashboardPage.statistics.posts')}}</p>
                                <p class="statistics--number">{{postsTotal}}</p>
                            </div>
                        </div>
                        <template v-if="chartPostsData">
                            <trend
                                :data="chartPostsData"
                                :gradient="['#84fab0', '#8fd3f4']"
                                auto-draw
                                smooth
                                :height="68"
                                :padding="0"
                                >
                            </trend>
                        </template>
                    </template>
                    <template v-else>
                        <loading-data></loading-data>
                    </template>
                </div>
            </div> -->
            <div class="col-12 col-sm-6 col-md-3 col-lg-6 pr-2">
                <div class="card--block">
                    <router-link to="/orders">
                    <template v-if="chartOrderCounts">
                        <div class="statistics--content">
                            <span class="statistics--icon is-purple-light">
                                <i class="fas fa-shopping-basket"></i>
                            </span>
                            <div class="text-center">
                                <p class="statistics--title">{{$t('dashboardPage.statistics.totalOrders')}}</p>
                                <p class="statistics--number">{{chartOrderTotal}}</p>
                            </div>
                        </div>
                            <trend
                                :data="chartOrderCounts"
                                :gradient="['#f6d365', '#fda085']"
                                auto-draw
                                smooth
                                :height="68"
                                :padding="0"
                                >
                            </trend>
                    </template>
                    <template v-else>
                        <loading-data></loading-data>
                    </template>
                    </router-link>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 pl-2">
                <div class="card--block">
                    <div class="statistics--content">
                            <span class="statistics--icon is-purple-light">
                                <i class="fas fa-user-tie"></i>
                            </span>
                            <div class="text-center">
                                <p class="statistics--title">
                                    {{$t('dashboardPage.statistics.totalAdmins')}}
                                </p>
                                <p class="statistics--number">{{adminsCount}}</p>
                            </div>
                        </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 pl-2">
                <div class="card--block">
                    <div class="statistics--content">
                            <span class="statistics--icon is-purple-light">
                                <i class="fas fa-shopping-cart"></i>
                            </span>
                            <div class="text-center">
                                <p class="statistics--title">
                                    {{$t('dashboardPage.statistics.totalCarts')}}
                                </p>
                                <p class="statistics--number">{{cartCount}}</p>
                            </div>
                        </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 pl-2">
                <div class="card--block">
                    <div class="statistics--content">
                            <span class="statistics--icon is-purple-light">
                                <i class="fab fa-product-hunt"></i>
                            </span>
                            <div class="text-center">
                                <p class="statistics--title">
                                    {{$t('dashboardPage.statistics.totalFeaturedProduct')}}
                                </p>
                                <p class="statistics--number">{{featuredProductCount}}</p>
                            </div>
                        </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 pl-2">
                <div class="card--block">
                    <div class="statistics--content">
                            <span class="statistics--icon is-purple-light">
                                <i class="far fa-object-group"></i>
                            </span>
                            <div class="text-center">
                                <p class="statistics--title">
                                    {{$t('dashboardPage.statistics.totalMainCategory')}}
                                </p>
                                <p class="statistics--number">{{mainCategoryCount}}</p>
                            </div>
                        </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 pl-2">
                <div class="card--block">
                    <div class="statistics--content">
                            <span class="statistics--icon is-purple-light">
                                <i class="fab fa-product-hunt"></i>
                            </span>
                            <div class="text-center">
                                <p class="statistics--title">
                                    {{$t('dashboardPage.statistics.totalProducts')}}
                                </p>
                                <p class="statistics--number">{{productCount}}</p>
                            </div>
                        </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 pl-2">
                <div class="card--block">
                    <div class="statistics--content">
                            <span class="statistics--icon is-purple-light">
                                <i class="far fa-object-group"></i>
                            </span>
                            <div class="text-center">
                                <p class="statistics--title">
                                    {{$t('dashboardPage.statistics.totalSubCategory')}}
                                </p>
                                <p class="statistics--number">{{subCategoryCount}}</p>
                            </div>
                        </div>
                </div>
            </div>
            
            <div class="col-12 col-sm-6 col-md-3 pl-2">
                <div class="card--block">
                    <div class="statistics--content">
                            <span class="statistics--icon is-purple-light">
                                <i class="fas fa-users"></i>
                            </span>
                            <div class="text-center">
                                <p class="statistics--title">
                                    {{$t('dashboardPage.statistics.totalUsers')}}
                                </p>
                                <p class="statistics--number">{{usersCount}}</p>
                            </div>
                        </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 pl-2">
                <div class="card--block">
                    <div class="statistics--content">
                            <span class="statistics--icon is-purple-light">
                                <i class="fas fa-user-clock"></i>
                            </span>
                            <div class="text-center">
                                <p class="statistics--title">
                                    {{$t('dashboardPage.statistics.totalPendingUsers')}}
                                </p>
                                <p class="statistics--number">{{usersPendingCount}}</p>
                            </div>
                        </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 pl-2">
                <div class="card--block">
                    <div class="statistics--content">
                            <span class="statistics--icon is-purple-light">
                                <i class="fas fa-user-slash"></i>
                            </span>
                            <div class="text-center">
                                <p class="statistics--title">
                                    {{$t('dashboardPage.statistics.totalUsersRejected')}}
                                </p>
                                <p class="statistics--number">{{usersRejectedCount}}</p>
                            </div>
                        </div>
                </div>
            </div>
            <!-- <div class="col-12 col-sm-6 col-md-3 col-lg-6 pl-2">
                <div class="card--block">
                    <template v-if="tagsTotal">
                        <div class="statistics--content">
                            <span class="statistics--icon is-purple-light">
                                <i class="fas fa-tags"></i>
                            </span>
                            <div class="text-center">
                                <p class="statistics--title">{{$t('tags')}}</p>
                                <p class="statistics--number">{{tagsTotal}}</p>
                            </div>
                        </div>
                        <template v-if="chartTagsData">
                            <trend
                                :data="chartTagsData"
                                :gradient="['#6a11cb', '#2575fc']"
                                auto-draw
                                smooth
                                :height="68"
                                :padding="0"
                                >
                            </trend>
                        </template>
                    </template>
                    <template v-else>
                        <loading-data></loading-data>
                    </template>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
// Repository Data
import { RepositoryFactory } from "../../repositories/RepositoryFactory";
const postsRepository = RepositoryFactory.get("posts");
const tagRepository = RepositoryFactory.get("tags");
const usersRepository = RepositoryFactory.get("users");
const mediaRepository = RepositoryFactory.get("media");

const chartsRepository = RepositoryFactory.get("charts");


import Vue from "vue"
import Trend from "vuetrend"

Vue.use(Trend)

export default {
    data() {
        return {
            chartOrderTotal: null,
            adminsCount: null,
            cartCount: null,
            featuredProductCount: null,
            mainCategoryCount: null,
            productCount: null,
            subCategoryCount: null,
            usersCount: null,
            usersPendingCount: null,
            usersRejectedCount: null,
            page: 1,
            limit: 0,
            chartOrderCounts: [],
        };
    },
    created() {
        // this.getAllStatistics();
        this.getAllChart();
    },
    methods: {
        async getAllChart() {
            const statistics = await chartsRepository.getChartData()
            // console.log(statistics.Home.Counts)
            const arrayOfData = statistics.Home.OrderCountByMonth
            this.chartOrderCounts = arrayOfData.map(function(item) {
                return item.ordersCount;
            });
            const countsData = statistics.Home.Counts
            this.chartOrderTotal = countsData.orderCount
            this.adminsCount = countsData.adminsCount
            this.cartCount = countsData.cartCount
            this.featuredProductCount = countsData.featuredProductCount
            this.mainCategoryCount = countsData.mainCategoryCount
            this.productCount = countsData.productCount
            this.subCategoryCount = countsData.subCategoryCount
            this.usersCount = countsData.usersCount
            this.usersPendingCount = countsData.usersPendingCount
            this.usersRejectedCount = countsData.usersRejectedCount

            // console.log('countsData', countsData)
         },

        // async getAllStatistics() {
        //     const posts = await postsRepository.getAllPosts(
        //         this.page,
        //         this.limit,
        //         "filters",
        //         "post"
        //     );
        //     if (posts.success) {
        //         this.postsTotal = posts.data.total;
        //     }

        //     const tags = await tagRepository.getAllTags(
        //         this.page,
        //         this.limit
        //     );
        //     this.tagsTotal = tags.data.total;

        //     const users = await usersRepository.getAllUsers(
        //         this.page,
        //         this.limit
        //     );
        //     this.usersTotal = users.total;

        //     const media = await mediaRepository.getAllMedia(
        //         this.page,
        //         this.limit
        //     );
        //     this.mediaTotal = media.total;
        // },

        // async getAllChart() {

        //     const chartPostsData = await chartsRepository.getChartData(
        //         "post",
        //         "weeks",
        //         "7"
        //     );
        //     this.chartPostsData = chartPostsData.map(function(item) {
        //         return item.total;
        //     });
        //     const chartUsersData = await chartsRepository.getChartData(
        //         "user",
        //         "weeks",
        //         "7"
        //     );
        //     this.chartUsersData = chartUsersData.map(function(item) {
        //         return item.total;
        //     });
        //     const chartTagsData = await chartsRepository.getChartData(
        //         "tag",
        //         "weeks",
        //         "7"
        //     );
        //     this.chartTagsData = chartTagsData.map(function(item) {
        //         return item.total;
        //     });

        //     const chartMediaData = await chartsRepository.getChartData(
        //         "media",
        //         "weeks",
        //         "7"
        //     );
        //     this.chartMediaData = chartMediaData.map(function(item) {
        //         return item.total;
        //     });
        // }
    }
};
</script>

<style>
</style>
