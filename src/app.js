const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const helmet = require( 'helmet' );
const hpp = require( 'hpp' );
const path = require( 'path' );
const Brinkbit = require( 'brinkbit' );
global.Promise = require( 'bluebird' );

const env = require( '../env' );

const app = express();

app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended: true }));
app.use( helmet());
app.use( hpp());
app.set( 'views', path.join( __dirname, 'routes' ));
app.set( 'view engine', 'pug' );
app.use( express.static( 'public' ));
app.get( '/', ( req, res ) => {
    res.render( 'index' );
});

app.use( '/api', new Brinkbit( env.server.config ).createMiddleware());

app.use( express.static( 'public' ));
app.disable( 'x-powered-by' );
app.listen( env.server.port, () => {
    console.log( 'server started' );
});
