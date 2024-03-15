import React from "react";
import Fire from "../../assets/image/Fire.png";
import styles from "./HotTopic.module.css";
import Gold from "../../assets/image/Gold.png";
import Silver from "../../assets/image/Silver.png";
import Bronze from "../../assets/image/Bronze.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// Swiper Core 사용 설정

export default function HotTopic() {
  return (
    <div>
      <div className={styles.container}>
        <img src={Fire} className={styles.fire} alt="" />
        <div className={styles.text}>인기 급상승 검색어</div>
      </div>
      <div className={styles.contentBox}>
        <div className={styles.swiperContainer}>
          <Swiper
            direction="vertical"
            slidesPerView={1}
            spaceBetween={30}
            autoplay={{ delay: 3000 }}
            modules={[Autoplay, Pagination, Navigation]}
            className={styles.swiper}
          >
            <SwiperSlide className={styles.slide}>
              <img src={Gold} className={styles.medal} alt="" />
              <div>세계 여성의 날</div>
              <div>2천+</div>
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <img src={Silver} className={styles.medal} alt="" />
              <div>일본 로켓발사 실패</div>
              <div>5천+</div>
            </SwiperSlide>
            <SwiperSlide className={styles.slide}>
              <img src={Bronze} className={styles.medal} alt="" />
              <div>김포시 공무원</div>
              <div>1천+</div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
