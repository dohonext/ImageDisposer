# ImageDisposer

![alt tag](https://github.com/dohonext/ImageDisposer/blob/master/Screen%20Shot%202015-09-11%20at%2013.45.37.png)

## 이미지를 화면에 배치하는 라이브러리입니다.
- 참고 웹사이트: https://www.flickr.com/explore  (데스크탑에서 보셔야 합니다)  
- 이미지를 잘라내지 않고 고유의 비율을 유지하면서 여러장을 화면에 배치  
- 화면 사이즈 (모바일 포함)에 따라 이미지들을 몇장 넣을지 감안해서 배치  
- 애니메이션 사용하여 여러가지 옵션으로 사진을 순차적 혹은 동시적으로 렌더링  
- 이런 부분을 고정으로 정해두지 않고 변수로 받아 커스터마이징 할수있도록 제작  
- 서버에서 JSON파일을 받아서 화면에 렌더링 
- 사진을 클릭하면 큰 화면으로 보여주기 (전체화면)  
  
### WEEK 1 : DONE
- 기본 페이지 생성  
- 하위 디렉토리에 있는 사진 10여장을 화면비율과 상관없이 일정 너비로 2줄로 배치해보기  
  (이미지를 배열하는 핵심 로직 완성.)  
- 사용 스펙: JQuery  
  
### WEEK 2 
- 애니메이션 사용하여 사진을 순차적 혹은 동시적(여러 효과)로 렌더링하기
- 사용 스펙: Transiton, Transform, RequestAnimationFrame  
  
### WEEK 3
- 서버에서 JSON 파일을 받아서 화면에 렌더링하기(템플릿 사용), API 연동  
- 사용 스펙: Promise, XMLHttpRequest(CORS), Template(아마도 Handlebars)  
  
### WEEK 4 : DONE
- 화면 사이즈 대응 
- 변수로 받아 여러 부분 커스터마이징 할 수 있도록 옵션 추가 
- 사용 스펙: CSS MediaQuery, JQuery
