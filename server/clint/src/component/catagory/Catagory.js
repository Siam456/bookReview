import React from 'react'
import { Link } from 'react-router-dom';

export default function Catagory() {
    return (
        <div>
            <h1>Catagory</h1>
            <div className="container">
                <div className="row">
                    <Link to='/cat/story' style={{color: 'black', textDecoration :'none'}} className="col sm-12 mx-5">
                        <img src='https://media.istockphoto.com/photos/open-book-with-hand-drawn-landscape-picture-id1146007104?k=20&m=1146007104&s=612x612&w=0&h=2e-mjcg5Xswi3JoWR9S5cG8AoQBED3THHFfrSt25nqk=' alt='story' width= '50%' />
                        <p className='text-muted mx-2'>Story</p>
                    </Link>
                    <Link to='/cat/novel' style={{color: 'black', textDecoration :'none'}} className="col sm-12  mx-5">
                        <img src='https://media.istockphoto.com/photos/row-of-old-books-with-colorful-covers-on-pastel-blue-background-up-picture-id1126130554?k=20&m=1126130554&s=612x612&w=0&h=eohHCqhH7lUd8l4nxjVf9jGhxrvQbm7Fu8EFZZWbD0o=' alt='novel' width= '50%' />
                        <p className='text-muted mx-2'>Novel</p>
                    </Link>
                </div>
                <br />
                <div className="row">
                    <Link to='/cat/friction' style={{color: 'black', textDecoration :'none'}} className="col sm-12  mx-5">
                        <img src='https://cdn.vox-cdn.com/thumbor/Gf2YEIdhhdH59_gA2b5oo-KwkcQ=/0x0:1019x1024/1400x1050/filters:focal(429x431:591x593):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/52605333/new_books.1483624478.png' alt='friction' width='50%' />
                        <p className='text-muted mx-2'>Friction</p>
                    </Link>
                    <Link to='/cat/sports' style={{color: 'black', textDecoration :'none'}} className="col sm-12  mx-5">
                        <img src='https://i.pinimg.com/736x/34/c7/a3/34c7a3711ac7cdea339a5e69f4f4c774.jpg' alt='sports' width="50%" height= '60%' />
                        <p className='text-muted mx-2'>Sports</p>
                    </Link>
                    
                </div>
                
                </div>
        </div>
    )
}
