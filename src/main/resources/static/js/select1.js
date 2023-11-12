let placeObjectList = [];
const elementList = document.querySelector("#leftSection ul");
// 예제: Fetch API를 사용하여 데이터 받아오기
fetch('/moeng/main')
    .then(response => response.json())
    .then(data => {
        // 받아온 데이터를 처리하는 로직 작성
        placeObjectList = data;
        placeObjectList.forEach((item) => {
            console.log(item);
            const newLister = document.createElement("li");
            newLister.innerText += `✅ Address: ${data.address}\nTime: ${data.timezone}`;
            elementList.appendChild(newLister);
        });
    })
    .catch(error => console.error('Error:', error));