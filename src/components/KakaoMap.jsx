import React, { useEffect } from "react";

const { kakao } = window;

function KakaoMap(props) {
  useEffect(() => {
    const container = document.getElementById("map");

    if (props.placeData && Array.isArray(props.placeData)) {
      const markerPositions = props.placeData.map((item) => {
        const latitude = item.latitude;
        const longitude = item.longitude;
        return new kakao.maps.LatLng(latitude, longitude);
      });

      const bounds = new kakao.maps.LatLngBounds();
      markerPositions.forEach((position) => {
        bounds.extend(position);
      });

      const center = getCenter(bounds);

      const options = {
        center: center,
        level: 9,
      };

      const map = new kakao.maps.Map(container, options);

      const overlays = [];
      const markers = [];

      props.placeData.forEach((place, index) => {
        const latitude = place.latitude;
        const longitude = place.longitude;

        const position = new kakao.maps.LatLng(latitude, longitude);
        const marker = addMarker(position, index, place.title);

        markers.push(marker);

        // 장소명 오버레이
        const overlayContent = `<div class="overlay">${place.title}</div>`;
        const overlayPosition = marker.getPosition();

        const overlay = new kakao.maps.CustomOverlay({
          content: overlayContent,
          position: overlayPosition,
          yAnchor: 2.5,
          map: map,
        });

        overlays.push(overlay);

        kakao.maps.event.addListener(marker, "click", function () {
          bringOverlayToFront(overlay);
        });
      });

      // 경로 생성
      const drawLinePath = props.routeData.map((item) => {
        const linePath = [];
        for (const road of item.routes[0].sections[0].roads) {
          const r = road.vertexes;
          for (let i = 0; i < r.length; i += 2) {
            linePath.push(new kakao.maps.LatLng(r[i + 1], r[i]));
          }
        }
        return linePath;
      });

      // 경로 생성
      drawLinePath.forEach((linePath) => {
        const polyline = new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 2,
          strokeColor: "blue",
          strokeOpacity: 0.7,
          strokeStyle: "line",
        });
        polyline.setMap(map);
      });

      // 마커 표시 부분
      function addMarker(position, idx) {
        var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
        var imageSize = new kakao.maps.Size(36, 37);
        var imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691),
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10),
          offset: new kakao.maps.Point(13, 37),
        };
        var markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        );
        var marker = new kakao.maps.Marker({
          position: position,
          image: markerImage,
        });

        marker.setMap(map);
        return marker;
      }

      function bringOverlayToFront(clickedOverlay) {
        overlays.forEach((overlay) => {
          if (overlay === clickedOverlay) {
            overlay.setZIndex(1);
          } else {
            overlay.setZIndex(0);
          }
        });
      }
    }
  }, [props.placeData]);

  function getCenter(bounds) {
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    const centerLat = (ne.getLat() + sw.getLat()) / 2;
    const centerLng = (ne.getLng() + sw.getLng()) / 2;
    return new kakao.maps.LatLng(centerLat, centerLng);
  }

  return <div id="map"></div>;
}

export default KakaoMap;
