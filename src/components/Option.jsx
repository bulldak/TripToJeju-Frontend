import React from "react";
import Place from "./Place";

function Option(props) {
  return (
    <div>
      <div className="check">
        <input
          type="checkbox"
          id={props.label}
          checked={props.checked}
          onChange={() => props.onChange(props.label)}
        />
        {props.label}
      </div>
      <div>
        {props.duration === 1 ? (
          <>
            <p>Day 1</p>
            <div className="summary">
              <Place placeData={props.responseData.day1_preview[0]} />
              <Place placeData={props.responseData.day1_preview[1]} />
              <Place placeData={props.responseData.day1_preview[2]} />
            </div>
          </>
        ) : props.duration === 2 ? (
          <>
            <p>Day 1</p>
            <div className="summary">
              <Place placeData={props.responseData.day1_preview[0]} />
              <Place placeData={props.responseData.day1_preview[1]} />
              <Place placeData={props.responseData.day1_preview[2]} />
            </div>
            <p>Day 2</p>
            <div className="summary">
              <Place placeData={props.responseData.day2_preview[0]} />
              <Place placeData={props.responseData.day2_preview[1]} />
              <Place placeData={props.responseData.day2_preview[2]} />
            </div>
          </>
        ) : (
          <>
            <p>Day 1</p>
            <div className="summary">
              <Place placeData={props.responseData.day1_preview[0]} />
              <Place placeData={props.responseData.day1_preview[1]} />
              <Place placeData={props.responseData.day1_preview[2]} />
            </div>
            <p>Day 2</p>
            <div className="summary">
              <Place placeData={props.responseData.day2_preview[0]} />
              <Place placeData={props.responseData.day2_preview[1]} />
              <Place placeData={props.responseData.day2_preview[2]} />
            </div>
            <p>Day 3</p>
            <div className="summary">
              <Place placeData={props.responseData.day3_preview[0]} />
              <Place placeData={props.responseData.day3_preview[1]} />
              <Place placeData={props.responseData.day3_preview[2]} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Option;
