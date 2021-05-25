import React from 'react';

import './Home.css';
import Carousel from './Carousel/Carousel';
import Navbar from '../Navbar/Navbar';

const Home = () => {

    return (

        <>
            <div className="Home">
                <Navbar />
                <Carousel />
                <div className="carousel-bottom">
                    <div className="carousel-cards">
                        <i className="las la-hand-holding-usd"></i>
                        <div>
                            <h4>BEST DEALS</h4>
                            <p>Demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
                        </div>
                    </div>
                    <div className="carousel-cards">
                        <i className="las la-tty"></i>
                        <div>
                            <h4>FREE CONSULTATION</h4>
                            <p>Demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
                        </div>
                    </div>
                    <div className="carousel-cards">
                        <i className="lar la-thumbs-up"></i>
                        <div>
                            <h4>CUSTOMER SATISFACTION</h4>
                            <p>Demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
                        </div>
                    </div>
                    <div className="carousel-cards">
                        <i className="las la-user-check"></i>
                        <div>
                            <h4>24/7 CUSTOMER CARE</h4>
                            <p>Demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );

}

export default Home;