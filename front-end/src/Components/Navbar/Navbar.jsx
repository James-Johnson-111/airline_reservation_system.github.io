import React, { useEffect, useState } from 'react'

import './Navbar.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import axios from '../../axios';
import * as passHash from 'password-hash';
import Cookies from 'js-cookie';

import { useSelector, useDispatch } from 'react-redux';
import { Authenticate } from '../../Redux/Actions/auth';

const Navbar = () => {

    const [ authName, setAuthName ] = useState('');
    const [ usrInfo, setUsrInfo ] = useState('');
    const User = useSelector( ( state ) => state.User );
    const dispatch = useDispatch();

    useEffect(() => {

        $('.signin-form').slideUp(0);
        setAuthName('Signup');
        $('.signin').on('click', () => {

            $('.signup-form').slideUp();
            $('.signin-form').slideDown();
            setAuthName('Signin');

        });

        $('.signup').on('click', () => {

            $('.signup-form').slideDown();
            $('.signin-form').slideUp();
            setAuthName('Signup');

        });

    }, []);

    const onChangeHandler = ( event ) => {

        const { name, value } = event.target;
        const setValues = { ...usrInfo, [ name ]: value };
        setUsrInfo( setValues );

    }

    const userSignup = ( event ) => {

        event.preventDefault();
        let hashedPass = passHash.generate( usrInfo.usrpass );
        const Data = new FormData();
        Data.append( 'usrfname', usrInfo.usrfname );
        Data.append( 'usrlname', usrInfo.usrlname );
        Data.append( 'usraddress', usrInfo.usraddress );
        Data.append( 'usrcell', usrInfo.usrcell );
        Data.append( 'usremail', usrInfo.usremail );
        Data.append( 'usrsax', usrInfo.usrsax );
        Data.append( 'usrage', usrInfo.usrage );
        Data.append( 'usrpass', hashedPass );
        Data.append( 'usrcredit', usrInfo.usrcredit );

        axios.post( '/signup', Data ).then( response => {

            Cookies.set( 'usrID', response.data[0].user_id );
            Cookies.set( 'usrNAME', response.data[0].user_first_name );
            $('.form-control').html('');
            $('button.close').trigger('click');

        } ).catch( error => console.log( error ) );

    }
    
    const userSignin = ( event ) => {

        event.preventDefault();
        const Data = new FormData();
        Data.append( 'usremail', usrInfo.usremail );

        axios.post( '/signin', Data ).then( response => {

            if( passHash.verify( usrInfo.usrpass, response.data[0].user_password ) )
            {

                Cookies.set( 'usrID', response.data[0].user_id );
                Cookies.set( 'usrNAME', response.data[0].user_first_name );
                $('.form-control').html('');
                $('button.close').trigger('click');
                dispatch( Authenticate() );

            }

        } ).catch( error => console.log( error ) );

    }

    return (
        
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand w-25 text-center" to="/">AIRLINE<br />RESERVATION SYSTEM</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item active">
                            <Link className="nav-link d-block px-4" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-block px-4" to="#">Features</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-block px-4" to="#">Pricing</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link d-block px-4 dropdown-toggle" to="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown link
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to="#">Action</Link>
                                <Link className="dropdown-item" to="#">Another action</Link>
                                <Link className="dropdown-item" to="#">Something else here</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a href="##" className="nav-link d-block px-3 pl-5 font-weight-bolder" data-toggle="modal" data-target="#Authenticate"><i className="las la-user-circle"></i> <span> { User.authenticate ? 'true' : 'Account' } </span></a>
                        </li>
                        <li className="nav-item">
                            <a href="##" className="nav-link d-block px-3 font-weight-bolder" style={ { 'fontFamily' : 'Lato' } }><i className="las la-phone"></i> <span style={ { 'color' : 'red' } }>03303744620</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="modal fade authenticate_modal" id="Authenticate" role="dialog" aria-labelledby="AuthenticateLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="AuthenticateLabel"> { authName } </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            
                            <form onSubmit={ userSignup }>
                                <div className="signup-form">
                                    <div className="d-flex justify-content-center mb-3">
                                        <div className="px-2 d-grid">
                                            <i className="las la-file-signature"></i>
                                        </div>
                                        <div className="w-100 d-flex justify-content-center">
                                            <input onChange={onChangeHandler} name="usrfname" type="text" className="rounded-0 form-control form-control-sm mr-1" placeholder="Your First Name" />
                                            <input onChange={onChangeHandler} name="usrlname" type="text" className="rounded-0 form-control form-control-sm ml-1" placeholder="Your Last Name" />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mb-3">
                                        <div className="px-2 d-grid">
                                            <i className="las la-location-arrow"></i>
                                        </div>
                                        <div className="w-100">
                                            <input onChange={onChangeHandler} name="usraddress" type="text" className="rounded-0 form-control form-control-sm" placeholder="Your Address" />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mb-3">
                                        <div className="px-2 d-grid">
                                            <i className="las la-phone-alt"></i>
                                        </div>
                                        <div className="w-100">
                                            <input onChange={onChangeHandler} name="usrcell" type="text" className="rounded-0 form-control form-control-sm" placeholder="Your Phone NO." />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mb-3">
                                        <div className="px-2 d-grid">
                                            <i className="las la-at"></i>
                                        </div>
                                        <div className="w-100">
                                            <input onChange={onChangeHandler} name="usremail" type="email" className="rounded-0 form-control form-control-sm" placeholder="Your Email" />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mb-3">
                                        <div className="px-2 d-grid">
                                            <i className="las la-mercury"></i>
                                        </div>
                                        <div className="w-100">
                                            <select onChange={onChangeHandler} name="usrsax" id="" className="form-control form-control-sm">
                                                <option defaultValue="">Your Sax</option>
                                                <option defaultValue="Male">Male</option>
                                                <option defaultValue="FeMale">FeMale</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mb-3">
                                        <div className="px-2 d-grid">
                                            <i className="las la-sort-amount-up-alt"></i>
                                        </div>
                                        <div className="w-100">
                                            <input onChange={onChangeHandler} name="usrage" type="number" className="rounded-0 form-control form-control-sm" placeholder="Your Age" />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mb-3">
                                        <div className="px-2 d-grid">
                                            <i className="las la-key"></i>
                                        </div>
                                        <div className="w-100 d-flex justify-content-center">
                                            <input onChange={onChangeHandler} name="usrpass" type="password" className="rounded-0 form-control form-control-sm mr-1" placeholder="Your Password" />
                                            <input onChange={onChangeHandler} name="cnfpass" type="password" className="rounded-0 form-control form-control-sm ml-1" placeholder="Your Password" />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mb-3">
                                        <div className="px-2 d-grid">
                                            <i className="las la-credit-card"></i>
                                        </div>
                                        <div className="w-100">
                                            <input onChange={onChangeHandler} name="usrcredit" type="text" className="rounded-0 form-control form-control-sm" placeholder="Your Preferred Credit Card NO." />
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="btn w-50">Signup</button>
                                        <small className="d-block mt-3">Already have an account? <b className="cursor-pointer color-blue signin">Signin</b></small>
                                    </div>
                                </div>
                            </form>
                            <form onSubmit={ userSignin }>
                                <div className="signin-form">
                                    <div className="d-flex justify-content-center mb-3">
                                        <div className="px-2 d-grid">
                                            <i className="las la-at"></i>
                                        </div>
                                        <div className="w-100">
                                            <input onChange={onChangeHandler} name="usremail" type="email" className="rounded-0 form-control form-control-sm" placeholder="Your Email" />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mb-3">
                                        <div className="px-2 d-grid">
                                            <i className="las la-key"></i>
                                        </div>
                                        <div className="w-100">
                                            <input onChange={onChangeHandler} name="usrpass" type="password" className="rounded-0 form-control form-control-sm" placeholder="Your Password" />
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="btn w-50">Signin</button>
                                        <small className="d-block mt-3">Don't have an account? <b className="cursor-pointer color-blue signup">Signup</b></small>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}

export default Navbar;