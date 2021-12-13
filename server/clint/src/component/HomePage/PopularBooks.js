import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Container, Row, Col } from 'react-bootstrap';
import SwiperCore, {
    EffectCards
} from 'swiper';
import './PopularBooks.css';
import axios from 'axios';
// install Swiper modules
SwiperCore.use([EffectCards]);
const PopularBooks = () => {

    const [bookGet, setbookGet] = useState([]);


    useEffect(() => {
        axios.get("/book")
      .then((res) => {
        //if (unmount) {
          setbookGet(res.data.book);
          //console.log(bookGet)
        //}
      })
      .catch((err) => console.log(err));

    })
    return (
        <Container className='my-5'>
            <Row lg={3} md={3} sm={1}>
                <Col>
                    <Swiper effect={'cards'} grabCursor={true} className="mySwiper" initialSlide={1}>
                        {bookGet.map((book, index) => {
                            let url = 'https://previews.123rf.com/images/segawa7/segawa71805/segawa7180500056/102576552-fresh-green-leaves.jpg';
                            if(book.avatar){
                                url = window.location.origin+ `/bookUpload/${book.avatar}`;
                            }

                            if(book.catagory === 'story'){
                               // if(index<3){
                                    return(
                                        // <p className=''>{book.title}</p>
        
                                        <SwiperSlide>
                                            <img className="card-img-top" src={url} alt="Card" height='100%' width='100%' />
                                            <div style={{color: 'black', background: '#ad323a', padding: '10px', borderRadius: '10px'}}>
                                                <p className=''>{book.title}</p>
                                                <p>{book.author}</p>
                                                <p><i class="fas fa-thumbs-up"></i>{book.review.length}</p>
                                            </div>
                                        </SwiperSlide>
                                    )
                                //}
                            }
                            
                        })}
                        
                    </Swiper>
                    <h3 className='text-center mt-2'>story</h3>
                </Col>
                <Col>
                    <Swiper effect={'cards'} grabCursor={true} className="mySwiper" initialSlide={1}>
                    {bookGet.map((book, index) => {
                            let url = 'https://previews.123rf.com/images/segawa7/segawa71805/segawa7180500056/102576552-fresh-green-leaves.jpg';
                            if(book.avatar){
                                url = window.location.origin+ `/bookUpload/${book.avatar}`;
                            }

                            if(book.catagory === 'novel'){
                                //if(index<3){
                                    return(
                                        // <p className=''>{book.title}</p>
        
                                        <SwiperSlide>
                                            <img className="card-img-top" src={url} alt="Card" height='100%' width='100%' />
                                            <div style={{color: 'black', background: '#ad323a', padding: '10px', borderRadius: '10px'}}>
                                                <p className=''>{book.title}</p>
                                                <p>{book.author}</p>
                                                <p><i class="fas fa-thumbs-up"></i>{book.review.length}</p>
                                            </div>
                                        </SwiperSlide>
                                    )
                                //}
                            }
                            
                        })}
                        
                    </Swiper>
                    <h3 className='text-center mt-2'>NOVEL</h3>
                </Col>
                <Col>
                    <Swiper effect={'cards'} grabCursor={true} className="mySwiper" initialSlide={1}>
                    {bookGet.map((book, index) => {
                            let url = 'https://previews.123rf.com/images/segawa7/segawa71805/segawa7180500056/102576552-fresh-green-leaves.jpg';
                            if(book.avatar){
                                url = window.location.origin+ `/bookUpload/${book.avatar}`;
                            }

                            if(book.catagory === 'friction'){
                                //if(index>=6 || index<9){
                                    return(
                                        // <p className=''>{book.title}</p>
        
                                        <SwiperSlide>
                                            <img className="card-img-top" src={url} alt="Card" height='100%' width='100%' />
                                            <div style={{color: 'black',  background: '#ad323a', padding: '10px', borderRadius: '10px'}}>
                                                <p className=''>{book.title}</p>
                                                <p>{book.author}</p>
                                                <p><i class="fas fa-thumbs-up"></i>{book.review.length}</p>
                                            </div>
                                        </SwiperSlide>
                                    )
                                //}
                            }
                            
                        })}
                    </Swiper>
                    <h3 className='text-center mt-2'>FICTION</h3>
                </Col>



            </Row>
        </Container>
    );
};

export default PopularBooks;