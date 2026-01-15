import React from 'react'
import { Link } from 'react-router-dom';
const BannerBox = (props) => {
    return (
        <div className='box bannerBox overflow-hidden !rounded-lg group !w-full h-[350px]'>
            <Link to="/" className='block w-full h-full'>
                <img src={props.img} className='w-full h-full object-cover transition-all group-hover:scale-105 !rounded-lg
            group-hover:rounded-lg' alt='banner' />
            </Link>
        </div>
    )
}
export default BannerBox;