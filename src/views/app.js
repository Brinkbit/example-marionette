/* eslint-env browser */

const Mn = require( 'backbone.marionette' );

const template = require( '../templates/app/index.pug' );

const AppView = Mn.View.extend({
    template,
});

module.exports = AppView;
