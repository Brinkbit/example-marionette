/* eslint-env browser */

const Backbone = require( 'backbone' );
const Mn = require( 'backbone.marionette' );
const $ = require( 'jquery' );

const template = require( '../templates/login.pug' );

const LoginView = Mn.View.extend({
    template,
    ui: {
        username: 'input[name="username"]',
        password: 'input[name="password"]',
        login: 'button[name="submit"]',
        stayLoggedIn: 'input[name="stayLoggedIn"]',
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
            stayLoggedIn: this.getUI( 'stayLoggedIn' ).is( ':checked' ),
        })
        .then(() => {
            Backbone.history.navigate( 'app', { trigger: true });
        })
        .catch(( error ) => {
            this.model.set( 'error', error );
            this.getUI( 'login' ).attr( 'disabled', false );
        });
    },
    initialize: function initialize( options ) {
        this.brinkbit = options.brinkbit;
    },
});

module.exports = LoginView;
