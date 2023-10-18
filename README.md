# Trip To Jeju 🍊

사용자가 예정된 여행에 대한 간단한 정보를 선택하면 그에 맞는 제주도 여행 경로 3가지를 추천해주는 프로그램입니다.

## 화면 구성

메인 화면, 정보 선택 화면, 추천된 3가지 여행 경로를 요약해서 보여주는 화면, 3가지 중 선택된 경로에 대한 전체 경로를 보여주는 화면
<br/>

-> 4페이지로 이루어져 있습니다.

### `Home page`

![main](https://github.com/2oo1s/Capstone-TripToJeju-Frontend/assets/90839206/ded27dd5-0c89-43a8-8b09-e7ca71736d87)

### `CheckInfo page`

![localhost_3000_checkinfo](https://github.com/2oo1s/Capstone-TripToJeju-Frontend/assets/90839206/01265152-2756-4f05-a301-50d09e65bb49)|![localhost_3000_checkinfo](https://github.com/2oo1s/Capstone-TripToJeju-Frontend/assets/90839206/00f4201c-c984-4b0b-909f-4975f35cb8bd)
--- | --- | 

좌측 사진은 정보 선택 전 화면, 우측 사진은 정보 선택 후 화면입니다.

### `ShowOptions page`

![localhost_3000_details (2)](https://github.com/2oo1s/Capstone-TripToJeju-Frontend/assets/90839206/e66d8ad0-857f-41a3-81b8-164c56469aba)

추천된 3가지 여행 경로를 요약해서 보여줍니다.
<br/>

하루 일정 중 3가지 장소를 랜덤으로 보여주며, 사용자가 3가지 선택지 중 마음에 드는 경로를 선택하면 해당 경로에 대한 전체 경로를 보여주는 화면으로 넘어가게 됩니다.

### `DetailRoute page`

![localhost_3000_details (1)](https://github.com/2oo1s/Capstone-TripToJeju-Frontend/assets/90839206/c465ebbd-e5c5-42f8-a897-f43296eaa1e9)

*** 현재 구현 중인 페이지입니다 ***
<br/>

좌측 상단에는 날짜별로 일정을 확인할 수 있는 버튼이 있고, 중앙에는 예정된 여행에 대한 키워드가, 하단에는 날짜별 전체 일정이 보여집니다.
<br/>
우측에는 kakaomap api를 사용하여 불러온 지도 위에 마커와 이동경로를 표시하여 사용자에게 경로를 가시적으로 제공합니다.
<br/>
구현 예정인 기능으로는 사용자가 버튼을 눌렀을 때, 특정 장소를 대체할 장소를 재추천 받거나 삭제할 수 있는 기능이 있습니다.
