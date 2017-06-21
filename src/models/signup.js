const Backbone = require( 'backbone' );

module.exports = Backbone.Model.extend({
    defaults: {
        errorHash: {
            username_missing_parameter: 'username is required',
            username_invalid_parameter: 'username must be at least 6 characters and only letters and numbers',
            username_conflicting_parameter: 'username is already taken',
            email_missing_parameter: 'email is required',
            email_invalid_parameter: 'must be a valid email',
            email_conflicting_parameter: 'an account already exist with this email',
            password_missing_parameter: 'password is required',
            password_invalid_parameter: 'password must be at least 6 characters',
            betaKey_missing_parameter: 'beta key is required',
            betaKey_invalid_parameter: 'invalid beta key',
        },
        error: {
            details: {},
        },
        username: '',
        email: '',
        password: '',
        betaKey: '',
    },
});
