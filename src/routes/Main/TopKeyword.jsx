import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getKeywords } from "../../lib/apis/Shinhan";
import Keyword from "./keyword.png";
import styles from "./PopularStock.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

export default function TopKeyword() {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await getKeywords();
        const keywordList = response.map((item) => item.keyword);
        setKeywords(keywordList);
      } catch (error) {
        console.error("Error fetching keywords:", error);
      }
    };

    fetchKeywords();
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <img src={Keyword} className={styles.chart} alt="" />
        <div className={styles.text}>인기 키워드</div>
      </div>
      <br />
      <div className={styles.keywordRow}>
        <Swiper
          direction="horizontal"
          slidesPerView="3"
          // spaceBetween={"20px"}
          autoplay={{ delay: 3000 }}
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
          className={styles.swiper}
        >
          {keywords.map((keyword, index) => (
            <SwiperSlide key={index} className={styles.keywordItem}>
              <Link to={`/keyword/${keyword}`}>{keyword}</Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <br />
      <br />
    </div>
  );
}
