import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './CovidAlert.css';
const CovidAlert = () => {
    return (
        <Container>
            <Row>
                <Col className='covidAlertGif'>
                    <img src="https://c.tenor.com/DneBFw3RvxMAAAAi/stay-home-read.gif" alt='covidalert'></img>
                </Col>
                <Col className='covidAlertText'>
                    <div>
                        <h2>COVID 19</h2>
                        <h5>STAY HOME STAY SAFE</h5>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id explicabo sunt expedita necessitatibus, atque ea eligendi iure error impedit voluptas deleniti vel obcaecati at dicta? Repellendus quis doloribus, quam quo enim dicta exercitationem est esse distinctio ut molestiae possimus autem maiores iusto architecto, reiciendis totam voluptatibus id reprehenderit velit. Sequi.</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CovidAlert;