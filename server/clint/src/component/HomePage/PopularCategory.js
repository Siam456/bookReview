import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './PopularCategory.css';
const PopularCategory = () => {
    return (
        <Container className='py-4'>
            
            <h1 className='text-center text-success mb-4'>POPULAR CATEGORY</h1>
            <div className='popularCategoryItems'>
                <Link to='/cat/story' className='popularCategoryItem'>
                    <img src="https://media.istockphoto.com/photos/open-book-with-hand-drawn-landscape-picture-id1146007104?k=20&m=1146007104&s=612x612&w=0&h=2e-mjcg5Xswi3JoWR9S5cG8AoQBED3THHFfrSt25nqk=" alt="" />
                    <img className='popularCategoryImg2' src="https://media.istockphoto.com/photos/open-book-with-a-red-rose-flower-on-it-picture-id472008326?k=20&m=472008326&s=612x612&w=0&h=I9DdGyy8DpbJYUxGHPItwPg-2DucbPDJxCWS5tjxzdw=" alt="" />
                    <button className='popularCategoryBtn'>Story</button>
                </Link>
                <Link to='/cat/novel' className='popularCategoryItem'>
                    <img src="https://media.istockphoto.com/photos/row-of-old-books-with-colorful-covers-on-pastel-blue-background-up-picture-id1126130554?k=20&m=1126130554&s=612x612&w=0&h=eohHCqhH7lUd8l4nxjVf9jGhxrvQbm7Fu8EFZZWbD0o=" alt='novel'/>
                    <img className='popularCategoryImg2' src="https://www.ftd.com/blog/wp-content/uploads/2018/04/book-flower-pairing-hero.jpg" alt="" />
                    <button className='popularCategoryBtn'>Novel</button>
                </Link>
                <Link to='/cat/friction' className='popularCategoryItem'>
                    <img src='https://cdn.vox-cdn.com/thumbor/Gf2YEIdhhdH59_gA2b5oo-KwkcQ=/0x0:1019x1024/1400x1050/filters:focal(429x431:591x593):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/52605333/new_books.1483624478.png' alt='friction'/>
                    <img className='popularCategoryImg2' src="https://images-na.ssl-images-amazon.com/images/I/61zk7G3q18L.jpg" alt="" />
                    <button className='popularCategoryBtn'>fiction</button>
                </Link>
                <Link to='/cat/sports' className='popularCategoryItem'>
                    <img src='https://i.pinimg.com/736x/34/c7/a3/34c7a3711ac7cdea339a5e69f4f4c774.jpg' alt='sports' />
                    <img className='popularCategoryImg2' src="https://static01.nyt.com/images/2015/05/23/sports/23sportsbooks-1/23sportsbooks-1-articleLarge.jpg?quality=75&auto=webp&disable=upscale" alt="" />
                    <button className='popularCategoryBtn'>Sports</button>
                </Link >

            </div>
        </Container>
    );
};

export default PopularCategory;