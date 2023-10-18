import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "../ShowOptions.css";
import Option from "../components/Option";

function ShowOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const duration = location.state.duration;
  const finalData = location.state.finalData;
  const responseData = location.state.responseData;

  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (label, responseData, option) => {
    setSelectedOption(label);
    navigate("/details", {
      state: {
        duration: duration,
        finalData: finalData,
        responseData: responseData,
        option: option,
      },
    });
  };

  console.log(responseData);

  return (
    <div className="ShowOptions">
      <div className="about">
        <button id="back" onClick={() => navigate(-1)}>
          {`<`}
        </button>
        <text>추천된 경로들은 ... {"\uD83D\uDDFA"}</text>
      </div>
      <div className="container">
        <div className="section">
          <Option
            responseData={responseData[0]}
            duration={duration}
            label="선택 1"
            checked={selectedOption === "선택 1"}
            onChange={(label) =>
              handleCheckboxChange(label, responseData[0], 0)
            }
          />
        </div>
        <div className="section" id="mid">
          <Option
            responseData={responseData[1]}
            duration={duration}
            label="선택 2"
            checked={selectedOption === "선택 2"}
            onChange={(label) =>
              handleCheckboxChange(label, responseData[1], 1)
            }
          />
        </div>
        <div className="section">
          <Option
            responseData={responseData[2]}
            duration={duration}
            label="선택 3"
            checked={selectedOption === "선택 3"}
            onChange={(label) =>
              handleCheckboxChange(label, responseData[2], 2)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ShowOptions;
