/* eslint-env browser */

const Mn = require( 'backbone.marionette' );
const Backbone = require( 'backbone' );

const template = require( '../templates/app/index.pug' );

const AppView = Mn.View.extend({
    template,
    ui: {
        logout: '[name="logout"]',
    },
    events: {
        'click @ui.logout': 'logout',
    },
    initialize: function initialize( options ) {
        this.brinkbit = options.brinkbit;
    },
    logout: function logout() {
        this.brinkbit.logout();
        Backbone.history.navigate( 'login', { trigger: true });
    },
});

module.exports = AppView;
