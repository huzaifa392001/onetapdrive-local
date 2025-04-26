import Image from 'next/image';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import '../CarsPageLayout.scss';

function Advertisement() {
    return (
        <>
            <div className="addSlider">
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={16}
                    slidesPerView={1} // Default for smaller screens
                    pagination={{ clickable: true }}
                    breakpoints={{
                        575: {
                            slidesPerView: 2,
                        },
                        992: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    <SwiperSlide>
                        <div className="adImg">
                            <Image src={'/images/ads/1.jpg'} width={400} height={140} alt='' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="adImg">
                            <Image src={'/images/ads/2.jpg'} width={400} height={140} alt='' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="adImg">
                            <Image src={'/images/ads/3.jpg'} width={400} height={140} alt='' />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
}

export default React.memo(Advertisement);
