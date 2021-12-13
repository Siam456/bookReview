import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Motivation.css';
const Motivation = () => {
    return (
        <Container>
            <Row md={2} sm={1}>
                <Col className='quoteContainer'>
                    <div className='quoteContent'>
                        <img src="https://www.seekpng.com/png/detail/73-739253_quote-mark-png-transparent-background-quotation-marks.png" alt="" width='100%' />
                        <p>That's the thing about books. They let you travel without moving your feet. <span> - Jhumpa Laheri</span></p>
                    </div>
                </Col>
                <Col>
                    <img src="https://institute.careerguide.com/wp-content/uploads/2020/09/1576518436-1576518436_goodreads_misc.gif" alt="" width='100%' />
                </Col>

            </Row>
        </Container>
    );
};

export default Motivation;