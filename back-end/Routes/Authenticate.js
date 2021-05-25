const express = require('express'), path = require('path');
const router = express.Router();
const db = require('../db/connection');

router.post( '/signup', ( req, res ) => {

    const { usrfname, usrlname, usraddress, usrcell, usremail, usrsax, usrage, usrpass, usrcredit } = req.body;

    db.query(
        "INSERT INTO users(user_first_name, user_last_name, user_address, user_phone, user_email, user_sax, user_age, user_password, user_credit_card) VALUES (?,?,?,?,?,?,?,?,?)",
        [ usrfname, usrlname, usraddress, usrcell, usremail, usrsax, usrage, usrpass, usrcredit ],
        ( err, rslt ) => {

            if( err )
            {
                console.log( err );
            }else
            {
                db.query(
                    "SELECT * FROM users WHERE user_email = '" + usremail + "'",
                    ( err, rslt ) => {

                        if( err )
                        {
                            console.log( err );
                        }else
                        {
                            res.send( rslt );
                        }

                    }
                )
            }

        }
    )

} );

router.post( '/signin', ( req, res ) => {

    const { usremail } = req.body;

    db.query(
        "SELECT * FROM users WHERE user_email = '" + usremail + "'",
        ( err, rslt ) => {

            if( err )
            {
                console.log( err );
            }else
            {
                res.send( rslt );
            }

        }
    )

} );

router.post( '/getuserdata', ( req, res ) => {

    const { usremail } = req.body;

    db.query(
        "SELECT * FROM users WHERE user_email = '" + usremail + "'",
        ( err, rslt ) => {

            if( err )
            {
                console.log( err );
            }else
            {
                res.send( rslt );
            }

        }
    )

} );

module.exports = router;