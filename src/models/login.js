const Backbone = require( 'backbone' );

module.exports = Backbone.Model.extend({
    defaults: {
        error: {
            description: '',
            details: {
                username: '',
                password: '',
            },
        },
        username: '',
        password: '',
    },
});
