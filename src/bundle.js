/* eslint-env browser */

const Mn = require( 'backbone.marionette' );
const $ = require( 'jquery' );
const Backbone = require( 'backbone' );
const Promise = require( 'bluebird' );
const Brinkbit = require( 'brinkbit.js' );

const SignupModel = require( './models/signup' );
const LoginModel = require( './models/login' );
const UserModel = require( './models/user' );

const SignupView = require( './views/signup' );
const LoginView = require( './views/login' );
const AppView = require( './views/app' );

const env = require( '../env' );

const App = Mn.Application.extend({
    region: 'div[name="root"]',
    showLogin: function showLogin() {
        if ( this.brinkbit.Player.primary ) return Backbone.history.navigate( 'app', { trigger: true });
        return this.showView( new LoginView({ model: new LoginModel(), brinkbit: this.brinkbit }));
    },
    showSignup: function showSignup() {
        if ( this.brinkbit.Player.primary ) return Backbone.history.navigate( 'app', { trigger: true });
        return this.showView( new SignupView({ model: new SignupModel(), brinkbit: this.brinkbit }));
    },
    showApp: function showApp() {
        if ( !this.brinkbit.Player.primary ) return Backbone.history.navigate( 'login', { trigger: true });
        const player = this.brinkbit.Player.primary;
        return player.fetch()
        .then(() => {
            this.showView( new AppView({
                model: new UserModel( player.data ),
                brinkbit: this.brinkbit,
            }));
        });
    },
    logout: function logout() {
        this.brinkbit.logout();
        Backbone.history.navigate( 'login', { trigger: true });
    },
    initialize: function initialize() {
        this.brinkbit = new Brinkbit( env.client.config );
    },
    onStart: function onStart() {
        Backbone.history.start();
        if ( !this.brinkbit.Player.primary ) return Backbone.history.navigate( 'login', { trigger: true });
        return Backbone.history.navigate( 'app', { trigger: true });
    },
});

const AppRouter = Mn.AppRouter.extend({
    appRoutes: {
        login: 'showLogin',
        signup: 'showSignup',
        app: 'showApp',
        logout: 'logout',
    },
});

$( document ).ready(() => {
    const app = new App();
    new AppRouter({
        controller: app,
    });
    app.start();
});
