import React, { useEffect, useState, useRef } from "react";
import "../styles/KakaoMapBox.css";

function KakaoMapBox() {
  const [map, setMap] = useState(null);
  const [search, setSearch] = useState("");
  const [mapType, setMapType] = useState("roadmap");
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // ✅ Kakao SDK 로드
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      initMap();
      return;
    }

    const existing = document.getElementById("kakao-map-sdk");
    if (existing) {
      existing.addEventListener("load", initMap);
      return;
    }

    const script = document.createElement("script");
    script.id = "kakao-map-sdk";
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=003886aac0beda9c1fe23ae6ece8b689&autoload=false&libraries=services";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(initMap);
    };
  }, []);

  // ✅ 지도 초기화
  const initMap = () => {
    const container = mapRef.current;
    if (!container) return;

    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 제주도 좌표
      level: 3,
    };

    const createdMap = new window.kakao.maps.Map(container, options);
    setMap(createdMap);

    // 기본 마커 표시 (인포윈도우 제거)
    const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
    const marker = new window.kakao.maps.Marker({ position: markerPosition });
    marker.setMap(createdMap);
    markerRef.current = marker;
  };

  // 🔍 장소 검색
  const handleSearch = (e) => {
    e.preventDefault();
    if (!map || !search.trim()) return;

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(search, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const first = data[0];
        const moveLatLon = new window.kakao.maps.LatLng(first.y, first.x);
        map.setCenter(moveLatLon);

        // 기존 마커 제거
        if (markerRef.current) markerRef.current.setMap(null);

        // 새 마커 생성
        const marker = new window.kakao.maps.Marker({
          map,
          position: moveLatLon,
        });
        markerRef.current = marker;

        // 인포윈도우 내용: 장소명 + 큰지도보기 + 길찾기
        const iwContent = `
          <div style="padding:5px;font-size:13px;">
            <b>${first.place_name}</b><br>
            <a href="https://map.kakao.com/link/map/${first.place_name},${first.y},${first.x}" 
               target="_blank" style="color:blue;">큰지도보기</a>
            <a href="https://map.kakao.com/link/to/${first.place_name},${first.y},${first.x}" 
               target="_blank" style="color:blue;margin-left:5px;">길찾기</a>
          </div>
        `;

        const infowindow = new window.kakao.maps.InfoWindow({
          content: iwContent,
        });
        infowindow.open(map, marker);
      } else {
        alert("검색 결과가 없습니다.");
      }
    });
  };

  // 🗺️ 지도 타입 전환
  const handleMapTypeChange = (type) => {
    if (!map) return;
    if (type === "roadmap") {
      map.setMapTypeId(window.kakao.maps.MapTypeId.ROADMAP);
      setMapType("roadmap");
    } else {
      map.setMapTypeId(window.kakao.maps.MapTypeId.HYBRID);
      setMapType("skyview");
    }
  };

  // 🔍 확대/축소
  const zoomIn = () => map && map.setLevel(map.getLevel() - 1);
  const zoomOut = () => map && map.setLevel(map.getLevel() + 1);

  return (
    <div className="map-container">
      <h3 className="map-title">📍 약속 위치 검색</h3>

      <form onSubmit={handleSearch} className="map-search-form">
        <input
          type="text"
          placeholder="장소를 입력하세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="map-input"
        />
        <button type="submit" className="map-btn">
          검색
        </button>
      </form>

      {/* 지도 타입 및 줌 버튼 */}
      <div className="control-box">
        <button
          onClick={() => handleMapTypeChange("roadmap")}
          className={mapType === "roadmap" ? "selected_btn" : "btn"}
        >
          일반지도
        </button>
        <button
          onClick={() => handleMapTypeChange("skyview")}
          className={mapType === "skyview" ? "selected_btn" : "btn"}
        >
          스카이뷰
        </button>
        <button className="btn" onClick={zoomIn}>
          +
        </button>
        <button className="btn" onClick={zoomOut}>
          -
        </button>
      </div>

      {/* 지도 영역 */}
      <div id="mapBox" ref={mapRef} className="map-box"></div>
    </div>
  );
}

export default KakaoMapBox;
