import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface IPlanTravelKakaoMap {
  data: IKeywordTravel[];
  isScale?: boolean;
  isDrag?: boolean;
}
const PlanTravelKakaoMap = (props: IPlanTravelKakaoMap) => {
  useEffect(() => {
    // 카카오 지도 API 스크립트를 동적으로 로드
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=d2189919c6fb960a702c4ef6b3863876&autoload=false";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Kakao Maps API 로드 후 초기화
      window.kakao.maps.load(() => {
        const container = document.getElementById("map"); // 지도를 표시할 div
        let centerX = 0;
        let centerY = 0;
        let validLocationCount = 0;
        const locations = props.data.map((i, index) => {
          if (+i.mapy > 35 && +i.mapy < 38 && +i.mapx > 126 && +i.mapx < 128) {
            centerY += +i.mapy;
            centerX += +i.mapx;
            validLocationCount++;
            return {
              title: `${index + 1}번 위치`,
              latlng: new window.kakao.maps.LatLng(i.mapy, i.mapx),
            };
          }
          return {
            title: `${index + 1}번 위치`,
            latlng: undefined,
          };
        });

        const averageLat = centerY / validLocationCount;
        const averageLon = centerX / validLocationCount;

        // 지도의 중심 위치 설정
        const options = {
          center: new window.kakao.maps.LatLng(
            validLocationCount > 0 ? averageLat : 37.5665,
            validLocationCount > 0 ? averageLon : 126.978,
          ),
          level: 6, // 기본적으로 레벨 6로 설정, 필요에 따라 조정
        };

        const map = new window.kakao.maps.Map(container, options);
        map.setZoomable(props.isScale ?? true);
        map.setDraggable(props.isDrag ?? true);
        const bounds = new window.kakao.maps.LatLngBounds();

        // 각 위치에 마커와 번호 표시
        locations.forEach((location, index) => {
          //   // 마커 생성

          if (location.latlng) {
            bounds.extend(location.latlng);

            // 번호를 표시할 CustomOverlay
            const content = `<div style="padding:2px;background:#fff;border:1px solid #888;border-radius:16px;width:32px;height:32px;display:flex;justify-content:center;align-items:center;">${index + 1}</div>`;
            const customOverlay = new window.kakao.maps.CustomOverlay({
              position: location.latlng,
              content: content,
              yAnchor: 1,
            });

            // CustomOverlay 지도에 표시
            customOverlay.setMap(map);
          }
        });

        // 마커가 모두 추가된 후에 경계를 설정
        if (validLocationCount > 0) {
          map.setBounds(bounds);
        }
      });
    };

    return () => {
      // 컴포넌트 언마운트 시 스크립트와 지도 관련 요소 제거
      document.head.removeChild(script);
    };
  }, [props.data]);

  return <div id="map" style={{width: "100%", height: "480px"}}></div>;
};

export default PlanTravelKakaoMap;
