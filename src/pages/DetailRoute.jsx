import React, { useState, useMemo, Component } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import WordCloud from "react-d3-cloud";
import KakaoMap from "../components/KakaoMap";
import Map from "../components/Map";
import DayBtn from "../components/DayBtn";
import Route from "../components/Route";
import "../DetailRoute.css";

function DetailRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const duration = location.state.duration;
  // 사용자가 선택한 정보
  const finalData = location.state.finalData;
  // 서버로부터 받은 response
  const responseData = location.state.responseData;
  const option = location.state.option;

  //확인용 지울 것! // // // // // // //
  console.log(responseData);
  // // // // // // // // // // // //

  const [selectedDay, setSelectedDay] = useState(1);

  let durationStr;
  if (duration === 1) {
    durationStr = "당일치기";
  } else if (duration === 2) {
    durationStr = "1박 2일";
  } else if (duration === 3) {
    durationStr = "2박 3일";
  }

  const data = useMemo(
    () => [
      { text: finalData.startDate, value: 50 },
      { text: durationStr, value: 300 },
      { text: finalData.location, value: 200 },
      { text: finalData.with, value: 500 },
      ...finalData.themes.map((theme) => ({ text: theme, value: 3000 })),
    ],
    [
      finalData.startDate,
      durationStr,
      finalData.location,
      finalData.with,
      finalData.themes,
    ]
  );

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className="DetailRoute">
      <div className="info">
        <div id="left">
          <div id="lTop">
            <button id="lastBack" onClick={() => navigate(-1)}>
              {`<`}
            </button>
            <DayBtn
              duration={duration}
              selectedDay={selectedDay}
              onDayClick={handleDayClick}
            />
          </div>
          <div id="lMiddle">
            <text># 키워드</text>
            <div className="wordcloud">
              <MemoizedWordCloud data={data} />
            </div>
          </div>
          <div id="lDown">
            <Route selectedDay={selectedDay} responseData={responseData} />
          </div>
        </div>
        <div id="right">
          {selectedDay === 1 && (
            <KakaoMap routeData={responseData.day1} placeData={responseData.day1_items}/>
          )}
          {selectedDay === 2 && (
            <KakaoMap routeData={responseData.day2} placeData={responseData.day2_items} />
          )}
          {selectedDay === 3 && (
            <KakaoMap routeData={responseData.day3} placeData={responseData.day3_items} />
          )}

          {/* {selectedDay === 1 && <Map option={option} day={0} />}
          {selectedDay === 2 && <Map option={option} day={1} />}
          {selectedDay === 3 && <Map option={option} day={2} />} */}
        </div>
      </div>
    </div>
  );
}

const MemoizedWordCloud = React.memo(({ data }) => (
  <WordCloud
    data={data}
    width={200}
    height={90}
    padding={4}
    fontSize={(word) => Math.log2(word.value) * 1.7}
    rotate={0}
    font="sunflowerL"
    fill={"#B17A5B"}
  />
));

export default DetailRoute;
