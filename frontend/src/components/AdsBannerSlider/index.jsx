import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import BannerBox from '../BannerBox';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

const AdsBannerSlider = (props) => {
    return (
        <div className='w-full px-4'>
            <Swiper
                slidesPerView={props.items}
                spaceBetween={10}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Navigation, Autoplay]}
                className="btn"
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 10 },
                    640: { slidesPerView: 2, spaceBetween: 10 },
                    768: { slidesPerView: 3, spaceBetween: 10 },
                    1024: { slidesPerView: props.items > 4 ? 4 : props.items, spaceBetween: 10 },
                    1280: { slidesPerView: props.items, spaceBetween: 10 }
                }}
            >
                <SwiperSlide>
                    <BannerBox img="https://api.spicezgold.com/download/file_1734525634299_NewProject(2).jpg" link={'/'} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img="https://www.jiomart.com/images/cms/aw_rbslider/slides/1768412998_Limited-Time-Deal_HPMC.jpg" link={'/'} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img="https://www.jiomart.com/images/cms/aw_rbslider/slides/1768415293_Har-Thaali-Mein_HPMC.jpg" link={'/'} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img="https://www.jiomart.com/images/cms/aw_rbslider/slides/1767887764_Sankranti-Savings-Festival_HPMC.jpg" link={'/'} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img="https://api.spicezgold.com/download/file_1734525653108_NewProject(20).jpg" link={'/'} />
                </SwiperSlide>
                <SwiperSlide>
                    <BannerBox img="https://api.spicezgold.com/download/file_1734532742018_NewProject(22).jpg" link={'/'} />
                </SwiperSlide>

            </Swiper>
        </div>


    )
}

export default AdsBannerSlider;