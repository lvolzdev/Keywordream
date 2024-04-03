# Keywordream
> Keywordream은 주식이 왜 오르고 내리는지 알고 싶어하는 주린이들에게 각 종목에 대한 `정보`와 `시세 변화에 대한 이해`를 제공한다.

## Service Introduction
저희는 기존 주식 투자 서비스를 이용하며 이러한 불편함을 느꼈습니다.

> 🙋🏻‍♂️ "왜 특정 종목이 오르는지 모르겠어요😅"<br> 
> 🙋🏻‍♀️ "주식 관련 정보를 `한눈에` 보고 싶어요."<br>
> 🙋🏻 "많은 자료를 찾아볼 `시간이 부족`해요😥"<br>

‼️ 종목 관련 뉴스에서 키워드를 추출하고 한눈에 파악할 수 있게끔 보여주면 어떨까??  

따라서 저희는 주식 투자를 하려고 하는데 초보자에게는 이 종목이 왜 인기 종목인지, 왜 주식이 오르고 있는지 파악하기 쉽지 않습니다.  
단순히 검색을 하는 것보다 인기, 상승의 이유를 한 눈에 알아볼 수 있었으면 좋겠다는 니즈에서 프로젝트를 시작하게 되었습니다.  
<br/><br/>
💰 Keywordream을 통해 사용자는
- 실시간 뉴스를 분석하여 키워드를 제공해주고
- 실시간 시세 및 차트를 제공해주고
- 관련 재무제표를 확인할 수 있습니다.

## Project Architecture
<img width="600" alt="keywordream_architecture" src="https://github.com/Keywordream-PDA/Client/assets/99806443/04e430bd-8f7f-472f-92a1-0f05104e0e59">

## Team Member
|권기현|김시은|김영석|유영서|이한슬|
|:---:|:---:|:---:|:---:|:---:|
|<img width="160px" src="https://avatars.githubusercontent.com/u/99806443?v=4"/> |<img width="160px" src="https://avatars.githubusercontent.com/u/63188042?v=4" />|<img width="160px" src="https://avatars.githubusercontent.com/u/122508517?v=4" />|<img width="160px" src="https://avatars.githubusercontent.com/u/102814269?v=4" />|<img width="160px" src="https://avatars.githubusercontent.com/u/129421334?v=4" />|
|[@kkh0331](https://github.com/kkh0331)|[@lvolzdev](https://github.com/lvolzdev)|[@KimYoungSeok15](https://github.com/KimYoungSeok15)|[@YeongseoYoo](https://github.com/YeongseoYoo)|[@eehanseul](https://github.com/eehanseul)|
|뉴스크롤링<br/>Web Socket|실시간 시세 찿트<br/>주식 종목 Batch|실시간 인기 종목<br/>Web Socket|소설 분석 키워드<br/>일일 시세|키워드 워드클라우드<br/>DB 설계|

## Main Features
### ⭐️ 메인 페이지
- 인기주식 및 핫이슈 신한 api로 검색된 종목 가져오기
- 소셜 분석 키워드를 가져와서 관련 종목도 보여주기
- 구글 실시간 인기 급상승 검색어 가져오기

### ⭐️ 키워드 페이지
- 뉴스 크롤링한 데이터를 가지고 종목별 키워드 추출
- 상위 키워드 3개 명시
- 추출된 키워드 가지고 워드 클라우드 생성

### ⭐️ 뉴스 페이지
- 해당 종목에 대하여 네이버 뉴스 크롤링하여 리스트 보여주기
- 뉴스 디테일 페이지
  - kr-Finbert을 이용해서 감정분석
  - 상위 3개 키워드에 대하여 하이라이트 적용

### ⭐️ 차트 페이지
- 금일 시세 정보 api(이베스트)로 가져와서 차트로 그려주기
- 라인 차트 : Apex Chart 적용
- 캔들 차트 : React-Financial-Charts 적용
  
### ⭐️ 정보 페이지
- 종목의 자세한 재무정보 제공
- 한투 api 이용
- 어려운 재무정보에 대한 설명을 볼 수 있음

### ⭐️ 마이 페이지
- 찜한 종목 모아보기
- 정렬 기능(이름순, 코드순)
- 시장별로 보기

### ⭐️ 검색 페이지
- 종목 코드 및 이름을 통해 검색 가능 -> 무한 스크롤

### ⭐️ 공통
- 주식 실시간 시세 받아오기 -> 한투 웹소켓 이용

## Screen Configuration
|Landing Page|Login Page|Main Page|Keyword Page|News Page|
|:---:|:---:|:---:|:---:|:---:|
|<img width="150" alt="Landing Page" src="https://github.com/Keywordream-PDA/Client/assets/99806443/30cdaca9-b35f-4481-9348-cc0ef270f169">|<img width="150" alt="Login Page" src="https://github.com/Keywordream-PDA/Client/assets/99806443/5b5847b1-084c-44a9-90df-c8fdaeaddb7a">|<img width="150" alt="Main Page" src="https://github.com/Keywordream-PDA/Client/assets/99806443/e97f3868-fb33-4508-ae65-3f216280eab5">|<img width="150" alt="Keyword Page" src="https://github.com/Keywordream-PDA/Client/assets/99806443/4c08b6b4-be25-481e-aa11-c28d1c769430">|<img width="150" alt="News Page" src="https://github.com/Keywordream-PDA/Client/assets/99806443/57539ce5-1b06-4329-a9a1-9c12ec6da274">|

|Chart Page|Market Price Page|Info Page|My Page|Search page|
|:---:|:---:|:---:|:---:|:---:|
|<img width="150" alt="Chart Page" src="https://github.com/Keywordream-PDA/Client/assets/99806443/80342e20-cd85-42dc-96a9-d5127752cd80">|<img width="150" alt="Market Price Page" src="https://github.com/Keywordream-PDA/Client/assets/99806443/eaafe727-08b7-46dd-ae6d-6f10578270b8">|<img width="150" alt="Info Page" src="https://github.com/Keywordream-PDA/Client/assets/99806443/b986bbf6-643b-4ea9-941c-a64a37153d00">|<img width="150" alt="My Page" src="https://github.com/Keywordream-PDA/Client/assets/99806443/1d35f159-09dd-44e1-a60f-0fab5b039d43">|<img width="150" alt="My Page" src="https://github.com/Keywordream-PDA/Client/assets/99806443/f12f5d74-1acb-4516-b7da-659cc5e21393">|

## Trouble Shooting

### Socket.io

### Crawling

## Folder Structure
