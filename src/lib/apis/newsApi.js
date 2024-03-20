import instance from "./baseApi";

export const getNewsList = async (stockCode) => {
    try {
        const {data} = await instance.post("/news/list", {
            stockCode : stockCode
        })
        return data;
      } catch (error) {
        console.error('Error fetching news list:', error);
        throw error;
      }
};

export const getNewsTagTop3 = async (stockCode) => {
    try{
        const {data} = await instance.post("/news/tags", {
            stockCode : stockCode
        })
        return data
    } catch (error) {
        console.error('Error fetching news tagTop3: ', error);
        throw error;
    }
}

export const getNewsDetail = (newsId) => {
    //TODO 추후에 실제 api와 연결
    const data = {
        title : "강원도민 5명 중 1명은 주식 투자…소유 주식 역대 처음 10억주 넘겨",
        date : "2024년 3월 17일 21:04",
        press : "강원일보",
        event : "호재", //TODO 변수명 바뀔 수 있음
        content : "<article class=\"go_trans _article_content\" id=\"dic_area\">\n <strong class=\"media_end_summary\">\n  '2023년 12월 결산 상장법인 주식 소유자 현황'\n  <br/>\n  도내 개인투자자 28만8천여명 10억1551주 소유\n </strong>\n <div>\n  <span class=\"end_photo_org\">\n   <div class=\"nbd_im_w _LAZY_LOADING_WRAP\">\n    <div class=\"nbd_a _LAZY_LOADING_ERROR_HIDE\" id=\"img_a1\">\n     <img class=\"_LAZY_LOADING\" id=\"img1\" src=\"https://imgnews.pstatic.net/image/087/2024/03/17/0001032379_001_20240317210401216.jpg?type=w647\">\n     </img>\n    </div>\n   </div>\n  </span>\n </div>\n <div>\n  <span class=\"end_photo_org\">\n   <div class=\"nbd_im_w _LAZY_LOADING_WRAP\">\n    <div class=\"nbd_a _LAZY_LOADING_ERROR_HIDE\" id=\"img_a2\">\n     <img class=\"_LAZY_LOADING\" id=\"img2\" src=\"https://imgnews.pstatic.net/image/087/2024/03/17/0001032379_002_20240317210401268.png?type=w647\">\n     </img>\n    </div>\n   </div>\n  </span>\n </div>\n <br/>\n <br/>\n 지난해 강원 지역 개인 투자자들이 소유한 주식이 사상 처음 10억주를 돌파했다. 투자자 수 역시 도민 5명 중 1명 꼴로 높은 비중을 보였다.\n <br/>\n <br/>\n 한국예탁결제원이 최근 발표한 '2023년 12월 결산 상장법인 주식 소유자 현황' 자료에 따르면 지난해 12월 결산 상장법인 2,602개사의 소유자(중복 소유자 제외)는 1,416만명으로, 이들이 소유한 총 주식 수는 1,135억주로 나타났다.\n <br/>\n <br/>\n 이중 도내 개인 투자자들이 소유한 주식은 10억1,551만주로 집계됐다. 2022년(9억8,441만주)대비 3.16% 늘어난 수치로 역대 최대다. 도내 개인투자자 소유 주식은 2018년까지 6억5,000만주 수준에 그쳤으나 코로나19 기간 불어닥친 투자 광풍으로 2020년 8억4,500만주, 2022년 9억8,400만주까지 치솟았고 지난해 10억주를 넘겼다. 최근 5년 간 증가율은 55.5%에 달한다.\n <br/>\n <br/>\n 지난해 도내 개인 투자자 수는 28만8,846명을 기록했다. 투자 붐이 이어졌던 2022년(29만3,360명)보다는 소폭 줄었지만, 도내 전체 인구(152만7,807명)의 5분의1(18.9%)에 해당한다. 도내 개인 투자자들은 1인당 평균 3,515주의 주식을 보유하고 있었다.\n <br/>\n <br/>\n 지난해 유가증권시장에서 가장 많은 투자자를 기록한 법인은 삼성전자(521만6,409명)였다. 코스닥시장에서는 에코프로비엠의 투자자가 55만9,688명으로 최다였다.\n <br/>\n <br/>\n</article>\n"
    }
    return data
}