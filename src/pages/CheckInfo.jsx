import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { addDays, differenceInDays } from "date-fns";
import "../CheckInfo.css";
import "../Calendar.css";
import axios from "axios";

function CheckInfo() {
  const navigate = useNavigate();
  const today = new Date();

  // 선택된 정보 저장
  const [selectedData, setSelectedData] = useState({
    startDate: null,
    endDate: null,
    times: { start: "아침", end: "18-20시" },
    price: "5",
    themes: [],
    with: null,
    location: null,
  });

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    const newEndDate =
      end && differenceInDays(end, start) > 2 ? addDays(start, 2) : end;

    setSelectedData({
      ...selectedData,
      startDate: start ? start : null,
      endDate: newEndDate ? newEndDate : null,
    });
  };

  const handleSelect = (name, value) => {
    setSelectedData({
      ...selectedData,
      [name]: value,
    });
  };

  const handleTimeSelect = (e) => {
    handleSelect("times", {
      ...selectedData.times,
      [e.target.name]: e.target.value,
    });
  };

  const handlePriceSelect = (e) => {
    handleSelect("price", e.target.value);
  };

  const handleLocationSelect = (index) => {
    handleSelect("location", index === selectedData.location ? null : index);
  };

  const handleWithSelect = (index) => {
    handleSelect("with", index === selectedData.with ? null : index);
  };

  const handleThemeSelect = (theme) => {
    if (selectedData.themes.includes(theme)) {
      if (selectedData.themes.length >= 1) {
        setSelectedData({
          ...selectedData,
          themes: selectedData.themes.filter((t) => t !== theme),
        });
      }
    } else if (selectedData.themes.length < 3) {
      setSelectedData({
        ...selectedData,
        themes: [...selectedData.themes, theme],
      });
    } else {
      alert("최대 3개까지 선택 가능합니다!");
    }
  };

  const startDateString = selectedData.startDate
    ? selectedData.startDate.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";

  const endDateString = selectedData.endDate
    ? selectedData.endDate.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";

  const duration =
    differenceInDays(selectedData.endDate, selectedData.startDate) + 1;

  const finalData = {
    ...selectedData,
    startDate: startDateString,
    endDate: endDateString,
  };

  // 선택 정보 Json 형식으로 변환
  const jsonData = JSON.stringify({
    ...selectedData,
    startDate: startDateString,
    endDate: endDateString,
  });

  const checkValidity = async () => {
    if (
      selectedData.startDate === null ||
      selectedData.times.start === null ||
      selectedData.times.end === null ||
      selectedData.price === null ||
      selectedData.themes.length === 0
    ) {
      const emptyData = [];

      if (selectedData.startDate === null || selectedData.endDate === null) {
        emptyData.push("여행일자");
      }
      if (selectedData.times.start === null) {
        emptyData.push("시작시간");
      }
      if (selectedData.times.end === null) {
        emptyData.push("종료시간");
      }
      if (selectedData.price === null) {
        emptyData.push("숙소 가격");
      }
      if (selectedData.themes.length === 0) {
        emptyData.push("여행테마");
      }
      alert(`' ${emptyData.join(", ")} '을(를) 선택해주세요!`);
    } else {
      try {
        // POST 요청 보내기
        const response = await axios.post(
          "http://3.37.27.117:8000/plan/",
          jsonData
        );

        // POST 요청에 대한 response -> ((여행기간 * 3) * 3)개의 kakaoId
        navigate("/options", {
          state: {
            duration: duration,
            finalData: finalData,
            responseData: response.data,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  // //  결과 확인용 지울 것! // //
  console.log(jsonData);
  // // // // // // // // // //

  return (
    <div className="CheckInfo">
      <div className="about">
        <button id="back" onClick={() => navigate(-1)}>
          {`<`}
        </button>
        <text>이번 제주 여행은 ... {"\uD83C\uDF4A"}</text>
      </div>
      <div className="Q">
        <text>1. 여행일자를 선택해주세요.</text>
        <DatePicker
          locale={ko}
          dateFormat="yyyy.MM.dd"
          minDate={today}
          selected={selectedData.startDate}
          onChange={handleDateChange}
          startDate={selectedData.startDate}
          endDate={selectedData.endDate}
          selectsRange
          placeholderText="최대 2박 3일까지 선택 가능"
        />
      </div>
      <div className="Q">
        <text>2. 여행 시작과 종료 시간을 선택해주세요.</text>
        <div className="CheckTime">
          <text>시작</text>
          <select
            name="start"
            value={selectedData.times.start}
            onChange={handleTimeSelect}
          >
            <option value={"아침"}>아침 (8-9시)</option>
            <option value={"점심"}>점심 (12-13시)</option>
            <option value={"오후"}>오후 (14-15시)</option>
          </select>
          <text>|</text>
          <text>종료</text>
          <select
            name="end"
            value={selectedData.times.end}
            onChange={handleTimeSelect}
          >
            <option value={"18-20시"}>18-20시</option>
            <option value={"20-21시"}>20-21시</option>
            <option value={"21-22시"}>21-22시</option>
          </select>
        </div>
      </div>
      <div className="Q">
        <text>3. 숙소 1박의 가격대를 선택해주세요.</text>
        <span className="price">
          <select value={selectedData.price} onChange={handlePriceSelect}>
            <option value={"5"}>5만원대</option>
            <option value={"10"}>10만원대</option>
            <option value={"15"}>15만원대</option>
            <option value={"20"}>20만원대</option>
          </select>
        </span>
      </div>
      <div className="Q">
        <text>4. 여행 테마를 선택해주세요. (최대 3개 선택 가능)</text>
        <span className="theme">
          <button
            className={
              selectedData.themes.includes("액티비티") ? "selected" : ""
            }
            onClick={() => handleThemeSelect("액티비티")}
          >
            <span className="button-text">액티비티</span>
          </button>
          <button
            className={selectedData.themes.includes("자연") ? "selected" : ""}
            onClick={() => handleThemeSelect("자연")}
          >
            <span className="button-text">자연</span>
          </button>
          <button
            className={selectedData.themes.includes("체험") ? "selected" : ""}
            onClick={() => handleThemeSelect("체험")}
          >
            <span className="button-text">체험</span>
          </button>
          <br />
          <button
            className={
              selectedData.themes.includes("포토스팟") ? "selected" : ""
            }
            onClick={() => handleThemeSelect("포토스팟")}
          >
            <span className="button-text">포토스팟</span>
          </button>
          <button
            className={selectedData.themes.includes("해변") ? "selected" : ""}
            onClick={() => handleThemeSelect("해변")}
          >
            <span className="button-text">해변</span>
          </button>
          <button
            className={selectedData.themes.includes("휴식") ? "selected" : ""}
            onClick={() => handleThemeSelect("휴식")}
          >
            <span className="button-text">휴식</span>
          </button>
        </span>
      </div>
      <div className="Q">
        <text>5. 동행자 유형을 선택해주세요. (필수 X)</text>
        <span className="with">
          <button
            className={selectedData.with === "부모님" ? "selected" : ""}
            onClick={() => handleWithSelect("부모님")}
          >
            부모님
          </button>
          <button
            className={selectedData.with === "아이" ? "selected" : ""}
            onClick={() => handleWithSelect("아이")}
          >
            아 이
          </button>
          <button
            className={selectedData.with === "연인" ? "selected" : ""}
            onClick={() => handleWithSelect("연인")}
          >
            연 인
          </button>
          <button
            className={selectedData.with === "친구" ? "selected" : ""}
            onClick={() => handleWithSelect("친구")}
          >
            친 구
          </button>
        </span>
      </div>
      <div className="Q">
        <text>6. 선호하는 여행 지역을 선택해주세요. (필수 X)</text>
        <span className="location">
          <button
            className={selectedData.location === "서부" ? "selected" : ""}
            onClick={() => handleLocationSelect("서부")}
          >
            서 부
          </button>
          <button
            className={selectedData.location === "동부" ? "selected" : ""}
            onClick={() => handleLocationSelect("동부")}
          >
            동 부
          </button>
        </span>
      </div>
      <button id="result" onClick={checkValidity}>
        추천된 경로 보기
      </button>
    </div>
  );
}

export default CheckInfo;
