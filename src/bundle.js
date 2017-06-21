/* eslint-env browser */

const Mn = require( 'backbone.marionette' );
const $ = require( 'jquery' );
const Backbone = require( 'backbone' );
const Promise = require( 'bluebird' );
const Brinkbit = require( 'brinkbit.js' );

const SignupModel = require( './models/signup' );
const LoginModel = require( './models/login' );
const UserModel = require( './models/user' );
// const DataModel = require( './models/data' );

const SignupView = require( './views/signup' );
const LoginView = require( './views/login' );
const AppView = require( './views/app' );

const env = require( '../env' );

const App = Mn.Application.extend({
    region: 'div[name="root"]',
    showLogin: function showLogin() {
        if ( this.brinkbit.isLoggedIn()) return Backbone.history.navigate( 'app', { trigger: true });
        return this.showView( new LoginView({ model: new LoginModel() }));
    },
    showSignup: function showSignup() {
        if ( this.brinkbit.isLoggedIn()) return Backbone.history.navigate( 'app', { trigger: true });
        return this.showView( new SignupView({ model: new SignupModel() }));
    },
    showApp: function showApp() {
        if ( !this.brinkbit.isLoggedIn()) return Backbone.history.navigate( 'login', { trigger: true });
        console.log( this.brinkbit.getCurrentUser());
        const user = this.brinkbit.getCurrentUser();
        return Promise.all([
            user.fetch(),
            // this.brinkbit.plugin( '9f2a8752-ce0c-4d64-b5da-f3eeae4b63de' ).user().data( 'resource1' ).get()
            // .catch(() => ({
            //     key1: '',
            //     key2: '',
            //     key3: '',
            //     key4: '',
            // })),
        ])
        .then(( res ) => {
            console.log( user );
            this.showView( new AppView({
                model: new UserModel( user.data ),
                // dataModel: new DataModel( res[1].dataValue ),
            }));
        });
    },
    initialize: function initialize() {
        this.brinkbit = new Brinkbit( env.client.config );
    },
    onStart: function onStart() {
        Backbone.history.start();
        if ( !this.brinkbit.isLoggedIn()) return Backbone.history.navigate( 'login', { trigger: true });
        return Backbone.history.navigate( 'app', { trigger: true });
    },
});

const AppRouter = Mn.AppRouter.extend({
    appRoutes: {
        login: 'showLogin',
        signup: 'showSignup',
        app: 'showApp',
    },
});

$( document ).ready(() => {
    const app = new App();
    new AppRouter({
        controller: app,
    });
    app.start();
});
