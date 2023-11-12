var container = document.getElementById("rightSection"); //지도를 담을 영역의 DOM 레퍼런스
//여기서부터 지도 보여주기

var options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(35.888118, 128.6115287), //지도의 중심좌표.
    level: 5, //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
// 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다
var positions = [
    {
        content: "<div>[커피와빵]<br>대구 북구 대학로23길 23<br>n/n</div>",
        latlng: new kakao.maps.LatLng(35.8937943, 128.609712),
    },
    {
        content:
            "<div>[스테디커피 경대북문점]<br>대구 북구 대학로 91<br>n/n</div>",
        latlng: new kakao.maps.LatLng(35.8932796, 128.60979),
    },
    {
        content:
            "<div>[애리스커피 펙스코점]<br>대구 북구 엑스코로 3<br>n/n</div>",
        latlng: new kakao.maps.LatLng(35.9058724, 128.612183),
    },
    {
        content:
            "<div>[골목서재]<br>대구 북구 대구체육관로11길 29-1<br>n/n</div>",
        latlng: new kakao.maps.LatLng(35.8939026, 128.60431),
    },
    {
        content:
            "<div>[코펜하겐커피]<br>대구 북구 대학로13길 13<br>n/n</div>",
        latlng: new kakao.maps.LatLng(35.8929492, 128.607547),
    },
    {
        content:
            "<div>[촌실빵실살롱드테]<br>대구 북구 동북로37길 56<br>n/n</div>",
        latlng: new kakao.maps.LatLng(35.9021966, 128.610779),
    },
    {
        content: "<div>[니타커피]<br>대구 북구 대불로 45<br>n/n</div>",
        latlng: new kakao.maps.LatLng(35.9044323, 128.613394),
    },
    {
        content: "<div>[해비치커피]<br>대구 북구 경대로7길 2<br>n/n</div>",
        latlng: new kakao.maps.LatLng(35.8847664, 128.613638),
    },
    {
        content: "<div>[머머커피]<br>대구 북구 신암로 51<br>n/n</div>",
        latlng: new kakao.maps.LatLng(35.8771486, 128.606475),
    },
    {
        content: "<div>[콘크리트]<br>대구 북구 대현로13길 29<br>n/n</div>",
        latlng: new kakao.maps.LatLng(35.8863141, 128.60708),
    },
    {
        content: "<div>[카페비탈]<br>대구 북구 대현로9길 33<br>n/n</div>",
        latlng: new kakao.maps.LatLng(35.8871881, 128.604385),
    },
    {
        content: "<div>[유즈]<br>대구 북구 대현로19길 38-1<br>n/n</div>",
        latlng: new kakao.maps.LatLng(35.885893, 128.610261),
    },
    {
        content:
            "<div>[더블유컬렉션 경북대점]<br>대구 북구 경대로 31<br>n/n</div>",
        latlng: new kakao.maps.LatLng(35.8844446, 128.613443),
    },
    {
        content: "<div>[안스커피]<br>대구 북구 대현남로5길 12-1<br>n/n</div>",
        latlng: new kakao.maps.LatLng(35.882266, 128.606556),
    },
    {
        content: "<div>[카네기]<br>대구 북구 동북로 311<br>n/n</div>",
        latlng: new kakao.maps.LatLng(35.8920714, 128.623908),
    },
    {
        content: "<div>[바라보다커피]<br>대구 북구 동북로 244<br>n/n</div>",
        latlng: new kakao.maps.LatLng(35.8952575, 128.617516),
    },
    {
        content: "<div>[유영]<br>대구 북구 복현로 27<br>n/n</div>",
        latlng: new kakao.maps.LatLng(35.8946396, 128.623905),
    },
    {
        content: "[라임커피]<br>대구 북구 경진로 38<br>n/n",
        latlng: new kakao.maps.LatLng(35.8937883, 128.616202),
    },
    {
        content: "<div>[디에이]<br>대구 북구 경진로 22-12<br>n/n</div>",
        latlng: new kakao.maps.LatLng(35.89447, 128.614422),
    },
    {
        content: "<div>[포레스트]<br>대구 북구 경대로19길 7<br>n/n</div>",
        latlng: new kakao.maps.LatLng(35.889308, 128.616997),
    },
];

for (var i = 0; i < positions.length; i++) {
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커의 위치
    });

    // 마커에 표시할 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content, // 인포윈도우에 표시할 내용
    });

    // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
    // 이벤트 리스너로는 클로저를 만들어 등록합니다
    // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    kakao.maps.event.addListener(
        marker,
        "mouseover",
        makeOverListener(map, marker, infowindow)
    );
    kakao.maps.event.addListener(
        marker,
        "mouseout",
        makeOutListener(infowindow)
    );
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
function makeOverListener(map, marker, infowindow) {
    return function () {
        infowindow.open(map, marker);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다
function makeOutListener(infowindow) {
    return function () {
        infowindow.close();
    };
}

var drawingFlag = false; // 원이 그려지고 있는 상태를 가지고 있을 변수입니다
var centerPosition; // 원의 중심좌표 입니다
var drawingCircle; // 그려지고 있는 원을 표시할 원 객체입니다
var drawingLine; // 그려지고 있는 원의 반지름을 표시할 선 객체입니다
var drawingOverlay; // 그려지고 있는 원의 반경을 표시할 커스텀오버레이 입니다
var drawingDot; // 그려지고 있는 원의 중심점을 표시할 커스텀오버레이 입니다

var circles = []; // 클릭으로 그려진 원과 반경 정보를 표시하는 선과 커스텀오버레이를 가지고 있을 배열입니다
// 지도에 클릭 이벤트를 등록합니다(1)
kakao.maps.event.addListener(map, "click", function (mouseEvent) {
    // 클릭 이벤트가 발생했을 때 원을 그리고 있는 상태가 아니면 중심좌표를 클릭한 지점으로 설정합니다
    if (!drawingFlag) {
        removeCircles(); // 원 새로 그리면 그 전의 원을 지움
        // 상태를 그리고있는 상태로 변경합니다
        drawingFlag = true;

        // 원이 그려질 중심좌표를 클릭한 위치로 설정합니다
        centerPosition = mouseEvent.latLng;

        // 그려지고 있는 원의 반경을 표시할 선 객체를 생성합니다
        if (!drawingLine) {
            drawingLine = new kakao.maps.Polyline({
                strokeWeight: 3, // 선의 두께입니다
                strokeColor: "#00a0e9", // 선의 색깔입니다
                strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                strokeStyle: "solid", // 선의 스타일입니다
            });
        }

        // 그려지고 있는 원을 표시할 원 객체를 생성합니다
        if (!drawingCircle) {
            drawingCircle = new kakao.maps.Circle({
                strokeWeight: 1, // 선의 두께입니다
                strokeColor: "#00a0e9", // 선의 색깔입니다
                strokeOpacity: 0.1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                strokeStyle: "solid", // 선의 스타일입니다
                fillColor: "#00a0e9", // 채우기 색깔입니다
                fillOpacity: 0.2, // 채우기 불투명도입니다
            });
        }

        // 그려지고 있는 원의 반경 정보를 표시할 커스텀오버레이를 생성합니다
        if (!drawingOverlay) {
            drawingOverlay = new kakao.maps.CustomOverlay({
                xAnchor: 0,
                yAnchor: 0,
                zIndex: 1,
            });
        }
    }
});

// 지도에 마우스무브 이벤트를 등록합니다
// 원을 그리고있는 상태에서 마우스무브 이벤트가 발생하면 그려질 원의 위치와 반경정보를 동적으로 보여주도록 합니다
kakao.maps.event.addListener(map, "mousemove", function (mouseEvent) {
    // 마우스무브 이벤트가 발생했을 때 원을 그리고있는 상태이면
    if (drawingFlag) {
        // 마우스 커서의 현재 위치를 얻어옵니다
        var mousePosition = mouseEvent.latLng;

        // 그려지고 있는 선을 표시할 좌표 배열입니다. 클릭한 중심좌표와 마우스커서의 위치로 설정합니다
        var linePath = [centerPosition, mousePosition];

        // 그려지고 있는 선을 표시할 선 객체에 좌표 배열을 설정합니다
        drawingLine.setPath(linePath);

        // 원의 반지름을 선 객체를 이용해서 얻어옵니다
        var length = drawingLine.getLength();

        if (length > 0) {
            // 그려지고 있는 원의 중심좌표와 반지름입니다
            var circleOptions = {
                center: centerPosition,
                radius: length,
            };

            // 그려지고 있는 원의 옵션을 설정합니다
            drawingCircle.setOptions(circleOptions);

            // 반경 정보를 표시할 커스텀오버레이의 내용입니다
            var radius = Math.round(drawingCircle.getRadius()),
                content =
                    '<div class="info">반경 <span class="number">' +
                    radius +
                    "</span>m</div>";

            // 반경 정보를 표시할 커스텀 오버레이의 좌표를 마우스커서 위치로 설정합니다
            drawingOverlay.setPosition(mousePosition);

            // 반경 정보를 표시할 커스텀 오버레이의 표시할 내용을 설정합니다
            drawingOverlay.setContent(content);

            // 그려지고 있는 원을 지도에 표시합니다
            drawingCircle.setMap(map);

            // 그려지고 있는 선을 지도에 표시합니다
            drawingLine.setMap(map);

            // 그려지고 있는 원의 반경정보 커스텀 오버레이를 지도에 표시합니다
            drawingOverlay.setMap(map);
        } else {
            drawingCircle.setMap(null);
            drawingLine.setMap(null);
            drawingOverlay.setMap(null);
        }
    }
});

// 지도에 마우스 클릭이벤트를 등록합니다
// 원을 그리고있는 상태에서 마우스 클릭 이벤트가 두번째로 발생하면
// 마우스 클릭한 위치를 기준으로 원과 원의 반경정보를 표시하는 선과 커스텀 오버레이를 표시하고 그리기를 종료합니다
kakao.maps.event.addListener(map, "rightclick", function (mouseEvent) {
    if (drawingFlag) {
        // 마우스로 두번째 클릭한 위치입니다
        var rClickPosition = mouseEvent.latLng;

        // 원의 반경을 표시할 선 객체를 생성합니다
        var polyline = new kakao.maps.Polyline({
            path: [centerPosition, rClickPosition], // 선을 구성하는 좌표 배열입니다. 원의 중심좌표와 클릭한 위치로 설정합니다
            strokeWeight: 3, // 선의 두께 입니다
            strokeColor: "#00a0e9", // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: "solid", // 선의 스타일입니다
        });

        // 원 객체를 생성합니다
        var circle = new kakao.maps.Circle({
            center: centerPosition, // 원의 중심좌표입니다
            radius: polyline.getLength(), // 원의 반지름입니다 m 단위 이며 선 객체를 이용해서 얻어옵니다
            strokeWeight: 1, // 선의 두께입니다
            strokeColor: "#00a0e9", // 선의 색깔입니다
            strokeOpacity: 0.1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle: "solid", // 선의 스타일입니다
            fillColor: "#00a0e9", // 채우기 색깔입니다
            fillOpacity: 0.2, // 채우기 불투명도입니다
        });

        var radius = Math.round(circle.getRadius()), // 원의 반경 정보를 얻어옵니다
            content = getTimeHTML(radius); // 커스텀 오버레이에 표시할 반경 정보입니다

        // 반경정보를 표시할 커스텀 오버레이를 생성합니다
        var radiusOverlay = new kakao.maps.CustomOverlay({
            content: content, // 표시할 내용입니다
            position: rClickPosition, // 표시할 위치입니다. 클릭한 위치로 설정합니다
            xAnchor: 0,
            yAnchor: 0,
            zIndex: 1,
        });

        // 원을 지도에 표시합니다
        circle.setMap(map);

        // 선을 지도에 표시합니다
        polyline.setMap(map);

        // 반경 정보 커스텀 오버레이를 지도에 표시합니다
        radiusOverlay.setMap(map);

        // 배열에 담을 객체입니다. 원, 선, 커스텀오버레이 객체를 가지고 있습니다
        var radiusObj = {
            polyline: polyline,
            circle: circle,
            overlay: radiusOverlay,
        };

        // 배열에 추가합니다
        // 이 배열을 이용해서 "모두 지우기" 버튼을 클릭했을 때 지도에 그려진 원, 선, 커스텀오버레이들을 지웁니다
        circles.push(radiusObj);

        // 그리기 상태를 그리고 있지 않는 상태로 바꿉니다
        drawingFlag = false;

        // 중심 좌표를 초기화 합니다
        centerPosition = null;

        // 그려지고 있는 원, 선, 커스텀오버레이를 지도에서 제거합니다
        drawingCircle.setMap(null);
        drawingLine.setMap(null);
        drawingOverlay.setMap(null);
    }
});

// 지도에 표시되어 있는 모든 원과 반경정보를 표시하는 선, 커스텀 오버레이를 지도에서 제거합니다
function removeCircles() {
    for (var i = 0; i < circles.length; i++) {
        circles[i].circle.setMap(null);
        circles[i].polyline.setMap(null);
        circles[i].overlay.setMap(null);
    }
    circles = [];
}

// 마우스 두번째 클릭 하여 원 그리기가 종료됐을 때 호출하여
// 그려진 원의 반경 정보와 반경에 대한 도보, 자전거 시간을 계산하여
// HTML Content를 만들어 리턴하는 함수입니다
function getTimeHTML(distance) {
    // 도보의 시속은 평균 4km/h 이고 도보의 분속은 67m/min입니다
    var walkkTime = (distance / 67) | 0;
    var walkHour = "",
        walkMin = "";

    // 계산한 도보 시간이 60분 보다 크면 시간으로 표시합니다
    if (walkkTime > 60) {
        walkHour =
            '<span class="number">' +
            Math.floor(walkkTime / 60) +
            "</span>시간 ";
    }
    walkMin = '<span class="number">' + (walkkTime % 60) + "</span>분";

    // 자전거의 평균 시속은 16km/h 이고 이것을 기준으로 자전거의 분속은 267m/min입니다
    var bycicleTime = (distance / 227) | 0;
    var bycicleHour = "",
        bycicleMin = "";

    // 계산한 자전거 시간이 60분 보다 크면 시간으로 표출합니다
    if (bycicleTime > 60) {
        bycicleHour =
            '<span class="number">' +
            Math.floor(bycicleTime / 60) +
            "</span>시간 ";
    }
    bycicleMin = '<span class="number">' + (bycicleTime % 60) + "</span>분";

    // 거리와 도보 시간, 자전거 시간을 가지고 HTML Content를 만들어 리턴합니다
    var content = '<ul class="info">';
    content += "    <li>";
    content +=
        '        <span class="label">총거리</span><span class="number">' +
        distance +
        "</span>m";
    content += "    </li>";
    content += "    <li>";
    content +=
        '        <span class="label">도보</span>' + walkHour + walkMin;
    content += "    </li>";
    content += "    <li>";
    content +=
        '        <span class="label">자전거</span>' +
        bycicleHour +
        bycicleMin;
    content += "    </li>";
    content += "</ul>";

    return content;
}