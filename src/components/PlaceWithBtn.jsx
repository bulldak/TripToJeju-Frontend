import React from "react";

function PlaceWithBtn(props) {
  return (
    <div className="PlaceWithBtn">
      <div className="leftImg">
        <img src={props.item.thumbnail} alt="no Img" />
      </div>
      <div className="right">
        <div className="modifyBtn">
          <button id="recommend">재추천</button>
          <button id="delete">삭제</button>
        </div>
        <div id="pName">{props.item.title}</div>
        <div id="pStar">{props.item.star} / 5</div>
        <div id="pAddress">{props.item.address}</div>
      </div>
    </div>
  );
}

export default PlaceWithBtn;
