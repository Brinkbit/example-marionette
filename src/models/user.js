const Backbone = require( 'backbone' );

const User = Backbone.Model.extend({
    defaults: {
        username: '',
    },
});

module.exports = User;
