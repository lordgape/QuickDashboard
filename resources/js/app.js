
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import { Form, HasError, AlertError } from 'vform/src'
import moment from 'moment'

import dashboard from './components/Dashboard.vue'
import profile from './components/Profile.vue'
import developer from './components/Developer.vue'
import users from './components/Users.vue'



window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import VueRouter from 'vue-router'
import VueProgressBar from 'vue-progressbar'
import Swal from 'sweetalert2'

window.Swal = Swal;


const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

window.toast = toast;

Vue.use(VueProgressBar, {
    color: 'rgb(144, 255, 199)',
    failedColor: 'red',
    height: '3px'
})

Vue.use(VueRouter)

let routes = [
    { path: '/dashboard', component: dashboard },
    { path: '/profile', component: profile },
    { path: '/developer', component: developer },
    { path: '/users', component: users }
]

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);

// Event Instance of Vue

window.Fire = new Vue();


const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

// Filters
Vue.filter("capFirstLetter",function (text) {
   return text.charAt(0).toUpperCase() + text.slice(1);
});

Vue.filter("companyDateFormat",function (date) {
    return moment(date).format('MMMM Do YYYY');
})

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin addin  g components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
