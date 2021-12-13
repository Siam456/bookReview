import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";
import Slider from "react-slick";

import './Partners.css';

export default class Partner extends Component {
    render() {
        var settings = {
            dots: true,
            infinite: true,
            autoplay: true,
            speed: 1500,
            slidesToShow: 4,
            slidesToScroll: 4,
            swipeToSlide: true,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <Container>
                <div>
                    <h1 className='my-5 text-center'> OUR PARTNERS </h1>
                    <Slider {...settings}>
                        <div>
                            <Card
                                style={{ width: '18rem' }}
                                className="mb-2"
                            >
                                <Card.Body>
                                    <Card.Img src='https://media-exp1.licdn.com/dms/image/C4E0BAQHW85YW1BkceQ/company-logo_200_200/0/1601388022542?e=2159024400&v=beta&t=-YrWSUX4mVfXHl-oglkFT9QGNhtSLpJNFuvbU32J4gI' height='200px' />
                                </Card.Body>
                            </Card>
                        </div>
                        <div>
                            <Card
                                style={{ width: '18rem' }}
                                className="mb-2"
                            >
                                <Card.Body>
                                    <Card.Img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjkO_iAG-rT9VjRVt-q4xWJuI0Fkr4GmeZ0q4Q1RcfcSBwUY8ELsyRoo-5N7BpEPO-cRY&usqp=CAU' height='200px' />
                                </Card.Body>
                            </Card>
                        </div>
                        <div>
                            <Card
                                style={{ width: '18rem' }}
                                className="mb-2"
                            >
                                <Card.Body>
                                    <Card.Img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9xQ3DtFyry2kNtOiK-kI80OoTU7E9b-O2JTxIDTXETiD_Gn6ZRKM08xpv3D_vn2MbtZ8&usqp=CAU' height='200px' />
                                </Card.Body>
                            </Card>
                        </div>
                        <div>
                            <Card
                                style={{ width: '18rem' }}
                                className="mb-2"
                            >
                                <Card.Body>
                                    <Card.Img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuaSHICu0yePsBxsoA8uDQERlhqv9OVGjs1cCWwZM5aUHtgDX7ZpLCXgoEZLz25Hi74N4&usqp=CAU' height='200px' />
                                </Card.Body>
                            </Card>
                        </div>
                        <div>
                            <div>
                                <Card
                                    style={{ width: '18rem' }}
                                    className="mb-2"
                                >
                                    <Card.Body>
                                        <Card.Img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Stockholms_stadsbibliotek.jpg/200px-Stockholms_stadsbibliotek.jpg' height='200px' />
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                        <div>
                            <Card
                                style={{ width: '18rem' }}
                                className="mb-2"
                            >
                                <Card.Body>
                                    <Card.Img src='https://pbs.twimg.com/profile_images/619122829062045696/yr5Z9YgA_400x400.png' height='200px' />
                                </Card.Body>
                            </Card>
                        </div>
                        <div>
                            <Card
                                style={{ width: '18rem' }}
                                className="mb-2"
                            >
                                <Card.Body>
                                    <Card.Img src='https://www.library.ca.gov/wp-content/uploads/2021/08/public_library_program.jpg' height='200px' />
                                </Card.Body>
                            </Card>
                        </div>
                    </Slider>
                </div>
            </Container>
        );
    }
}
