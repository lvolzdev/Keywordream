// HotTopic.jsx

import React, { useState, useEffect } from "react";
import Fire from "../../assets/image/Fire.png";
import styles from "./HotTopic.module.css";
import Gold from "../../assets/image/Gold.png";
import Silver from "../../assets/image/Silver.png";
import Bronze from "../../assets/image/Bronze.png";
import { getTrends } from "../../lib/apis/GoogleTrend.js";
import { useNavigate } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

export default function HotTopic() {
  const [trends, setTrends] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const data = await getTrends();
        setTrends(data);
      } catch (error) {
        console.error("Error fetching hot topics:", error);
      }
    };

    fetchTrends();
  }, []);

  const formatTraffic = (traffic) => {
    if (traffic.includes("K")) {
      const num = parseFloat(traffic.replace("K", ""));
      return num >= 10 ? `${num / 10}만+` : `${num}천+`;
    }
    return traffic;
  };

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
            {trends.map((trend, index) => (
              <SwiperSlide key={index} className={styles.slide}>
                {index === 0 && (
                  <img src={Gold} className={styles.medal} alt="" />
                )}
                {index === 1 && (
                  <img src={Silver} className={styles.medal} alt="" />
                )}
                {index === 2 && (
                  <img src={Bronze} className={styles.medal} alt="" />
                )}
                <div
                  className={styles.textContainer}
                  onClick={() => {
                    window.open(trend.shareUrl, "_blank");
                  }}
                >
                  <div className={styles.title}>
                    {trend.title.query.length > 10
                      ? `${trend.title.query.slice(0, 10)}...`
                      : trend.title.query}
                  </div>
                  <div className={styles.viewCount}>
                    {formatTraffic(trend.formattedTraffic)}
                  </div>
                </div>
                <div
                  className={styles.news}
                  onClick={() => {
                    window.open(trend.image.newsUrl, "_blank");
                  }}
                >
                  <img
                    src={trend.image.imageUrl}
                    className={styles.image}
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
