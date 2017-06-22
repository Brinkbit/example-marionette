/* eslint-env browser */

const Backbone = require( 'backbone' );
const Mn = require( 'backbone.marionette' );
const $ = require( 'jquery' );

const template = require( '../templates/signup.pug' );

const SignupView = Mn.View.extend({
    template,
    ui: {
        username: 'input[name="username"]',
        email: 'input[name="email"]',
        password: 'input[name="password"]',
        submit: 'button[name="submit"]',
    },
    events: {
        'submit form': 'preventSubmit',
        'keypress @ui.betaKey': 'signupOnEnter',
        'click @ui.submit': 'signup',
    },
    initialize: function initialize( options ) {
        this.listenTo( this.model, 'change', this.render );
        this.brinkbit = options.brinkbit;
    },
    onRender: function onRender() {
        this.getUI( 'username' ).focus();
    },
    preventSubmit: function preventSubmit( event ) {
        event.preventDefault();
    },
    signupOnEnter: function signupOnEnter( event ) {
        if ( event.keyCode !== 13 || $( event.target ).attr( 'name' ) !== 'password' ) {
            return;
        }
        event.preventDefault();
        this.signup();
    },
    signup: function signup() {
        const user = {
            username: this.getUI( 'username' ).val(),
            email: this.getUI( 'email' ).val(),
            password: this.getUI( 'password' ).val(),
        };
        this.getUI( 'submit' ).attr( 'disabled', true );
        this.brinkbit.Player.create( user )
        .then( player => player.login())
        .then(() => {
            Backbone.history.navigate( 'app', { trigger: true });
        })
        .catch(( error ) => {
            this.model.set( 'error', error );
            this.getUI( 'submit' ).attr( 'disabled', false );
        });
    },
});

module.exports = SignupView;
