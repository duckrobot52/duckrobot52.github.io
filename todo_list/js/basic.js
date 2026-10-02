    //초기 데이터
let mockData = [
{id:0, isDone:false, content:"React study", date: new Date().getTime()},
{id:1, isDone:true, content:"친구만나기", date: new Date().getTime()},
{id:2, isDone:false, content:"낮잠자기", date: new Date().getTime()},
];

// 요일 출력을 위한 배열
let day =["일","월","화","수","목","금","토"];

onload = ()=>{
    initData(mockData);

    let today = new Date();

    document.getElementById("date").innerHTML =
    `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${day[today.getDay()]}요일`;

     
}

const initData = (printData) => {
    document.querySelector(".todos_wrapper").innerHTML = "";

    printData.forEach((todo) => {
        document.querySelector(".todos_wrapper").innerHTML += `
        <div class="TodoItem">
            <input type="checkbox" onchange="onUpdate(${todo.id})" ${todo.isDone ? "checked" : ""}/>
            <div class="content">${todo.content}</div>
            <div class="date">${new Date(todo.date).toLocaleString()}</div>
            <button name="btn" value="${todo.id}" onclick="todoDel(this)">삭제</button>
        </div>`;
    });
}

//추가 기능
let idIndex = 3; 

document.querySelector(".Editor > button").addEventListener("click", function(event){
    event.preventDefault(); 

    const inputEle = document.querySelector("[name=inputlist]");

    mockData.push({
        id: idIndex++,
        isDone: false,
        content: inputEle.value,
        date: new Date().getTime()
    });

    inputEle.value = "";
    initData(mockData); 
});

//수정
const onUpdate = (targetId) => {
    mockData = mockData.map((todo) => {
        if(todo.id === targetId){
            todo.isDone = !todo.isDone;
        }
        return todo;
    });

    initData(mockData);
}

//삭제
const todoDel = (th) => {
    mockData = mockData.filter((todo) => todo.id !== parseInt(th.value));

    initData(mockData);
}

//검색
const getFilterData = (search) => {
    if(search === ""){
        return mockData;
    }

    return mockData.filter((todo) => todo.content.includes(search));
}

document.querySelector("#search").addEventListener("keyup", (event) => {
    initData(getFilterData(event.target.value));
});
