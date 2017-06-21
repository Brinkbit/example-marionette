/* eslint-env browser */

const Backbone = require( 'backbone' );
const Mn = require( 'backbone.marionette' );
const $ = require( 'jquery' );
const Brinkbit = require( 'brinkbit.js' );

const template = require( '../templates/login.pug' );
const env = require( '../../env' );

const LoginView = Mn.View.extend({
    template,
    ui: {
        username: 'input[name="username"]',
        password: 'input[name="password"]',
        login: 'button[name="submit"]',
    },
    events: {
        'submit form': 'preventSubmit',
        'keypress @ui.password': 'loginOnEnter',
        'click @ui.login': 'login',
    },
    modelEvents: {
        change: 'render',
    },
    onRender: function onRender() {
        this.getUI( 'username' ).focus();
    },
    preventSubmit: function preventSubmit( event ) {
        event.preventDefault();
    },
    loginOnEnter: function loginOnEnter( event ) {
        if ( event.keyCode !== 13 ) {
            return;
        }
        if ( $( event.target ).attr( 'name' ) !== 'password' ) {
            return;
        }
        event.preventDefault();
        this.login();
    },
    login: function login() {
        this.getUI( 'login' ).attr( 'disabled', true );
        this.brinkbit.login({
            username: this.getUI( 'username' ).val(),
            password: this.getUI( 'password' ).val(),
        })
        .then(() => {
            Backbone.history.navigate( 'app', { trigger: true });
        })
        .catch(( error ) => {
            this.model.set( 'error', error );
            this.getUI( 'login' ).attr( 'disabled', false );
        });
    },
    initialize: function initialize() {
        this.brinkbit = new Brinkbit( env.client.config );
    },
});

module.exports = LoginView;
