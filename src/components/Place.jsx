import React from "react";

function Place({ placeData }) {
  return (
    <div className="Place">
      <div id="image">
        <img src={placeData.thumbnail} alt="no Img" />
      </div>
      <div className="placeinfo">
        <div id="name">{placeData.title}</div>
        <div id="address">- {placeData.address}</div>
      </div>
    </div>
  );
}

export default Place;
