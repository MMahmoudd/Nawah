import groupsRepository from "./groupsRepository";
import categoriesRepository from "./categoriesRepository";
import productsRepository from "./productsRepository";
import postsRepository from "./postsRepository";
import eventsRepository from "./eventsRepository";
import blocksRepository from "./blocksRepository";
import authorsRepository from "./authorsRepository";
import pagesRepository from "./pagesRepository";
import placesRepository from "./placesRepository";
import chartsRepository from "./chartsRepository";
import fieldsRepository from "./fieldsRepository";
import currenciesRepository from "./currenciesRepository";
import countriesRepository from "./countriesRepository";
import storesRepository from "./storesRepository";
import ordersRepository from "./ordersRepository";
import homeRepository from "./homeRepository";
import vouchersRepository from "./vouchersRepository";
import notificationsRepository from "./notificationsRepository";
import usersRepository from "./usersRepository";
import shoppingRepository from "./shoppingRepository";
import seoRepository from "./seoRepository"
import reportsRepository from "./reportsRepository"
import stockRepositry from "./stockRepositry";
import banksRepository from "./banksRepository";


const repositories = {
    groups: groupsRepository,
    categories: categoriesRepository,
    notifications: notificationsRepository,
    posts: postsRepository,
    events: eventsRepository,
    blocks: blocksRepository,
    authors: authorsRepository,
    pages: pagesRepository,
    places: placesRepository,
    charts: chartsRepository,
    products: productsRepository,
    fields: fieldsRepository,
    currencies: currenciesRepository,
    countries: countriesRepository,
    stores: storesRepository,
    orders: ordersRepository,
    home: homeRepository,
    vouchers: vouchersRepository,
    users: usersRepository,
    shopping: shoppingRepository,
    seo: seoRepository,
    reports: reportsRepository,
    stocks: stockRepositry,
    banks: banksRepository
};

export const RepositoryFactory = {
    get: name => repositories[name]
};
