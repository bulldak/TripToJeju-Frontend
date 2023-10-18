import React, { useEffect, useState } from "react";
import axios from "axios";

function Map(props) {
  const [mapData, setMapData] = useState("");
  useEffect(() => {
    // 서버로부터 HTML 데이터를 가져오는 AJAX 요청
    axios
      .get(`http://3.37.27.117:8000/map/${props.option}/${props.day}/`)
      .then((response) => {
        setMapData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching HTML data:", error);
      });
  }, []);
//   console.log(mapData);
  return <div id="map" dangerouslySetInnerHTML={{ __html: mapData }}></div>;
}

export default Map;
