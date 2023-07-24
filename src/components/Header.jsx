import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className='flex flex-row justify-between p-12'>
                <div className=''>
                    <h1 className='text-3xl font-bold text-red-500 '>Header</h1>
                </div>
                <div className='flex flex-row space-x-4'>
                    <Link to='/'><span>Home</span></Link>
                    <Link to='/about'> <span>About</span></Link>
                    <Link to='/contact'> <span>Contact</span></Link>
                    <Link to='/products'> <span>Shop</span></Link>

                </div>

            </div>
        </>
    )
}


export default Header;
