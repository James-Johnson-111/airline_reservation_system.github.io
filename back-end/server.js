const express = require('express'), path = require('path');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');

app.use( cors() );
app.use( express.json() );
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

// * For User Authentication i.e Login/Signin
app.use( require( './Routes/Authenticate' ) );



app.listen( 8080, () => {

    console.log("Back-end Has Been Started");

} );