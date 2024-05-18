// 全部とってくる(変更ばん)
var ALLofThem = new Array(13);
var AssignNames=new Array(3);
var AssignDeadLine=new Array(3);
var AssignStates=new Array(3);
let count=0;

let searchString = "未提出";

fetch("https://ct.ritsumei.ac.jp/ct/course_8317295_report")
.then(response => response.text())
.then(html => {
const parser = new DOMParser();
const doc = parser.parseFromString(html, "text/html");
const elements = doc.querySelectorAll(".border.center");

// テキストを配列に入れる
elements.forEach(element => {
const text = element.textContent.trim();
ALLofThem[count]=text;
// 入ってる
// console.log(text);
count++;
});

console.log("")
console.log("display Name")
SetNames();
// displayAssignNames();
console.log("-----------")

console.log("DeadLine")
SetDeadLines();
// displayDeadLines();
// 
console.log("-----------")
console.log("AssignStates")
SetAssignStates();
displayAssignStates();
console.log("-----------")
console.log("whether or not")
judgeAssignStates()


})
.catch(error => console.log("Fetch error:", error));

//全部表示
    function ShowAll() {
        for (let i = 0; i < ALLofThem.length; i++) {
            console.log(i+"=  "+ALLofThem[i])
        }  
    }

//配列に分ける
    function SetNames() {
        for (let i = 0; i < ALLofThem.length; i=i+4) {
            //課題を取得
            AssignNames[i/4]=ALLofThem[i];
            // console.log(ALLofThem[i]);
        }
    }
    function SetDeadLines() {
        for (let j = 0; j < AssignNames.length; j++) {
            AssignDeadLine[j]=ALLofThem[3+j*4];
        }  
    }
    function SetAssignStates() {
        for (let j = 0; j < AssignStates.length; j++) {
            AssignStates[j]=ALLofThem[1+j*4];
        }  
    }

//表示機能
    function displayAssignNames() {
        for (let i = 0; i < AssignNames.length; i++) {
            console.log("Assing is"+i+"    "+AssignNames[i] );
        }  
    }
    function displayDeadLines() {
        for (let i = 0; i < AssignDeadLine.length; i++) {
            console.log("DeadLine is"+i+AssignDeadLine[i] );
        }  
    }function displayAssignStates() {
        for (let i = 0; i < AssignStates.length; i++) {
            console.log("Assign States is"+i+AssignStates[i] );
        }  
    }
    function judgeAssignStates() {
        for (let i = 0; i < AssignStates.length; i++) {
            if (AssignStates[i].includes(searchString)) {
                console.log(i+"'が未提出'.");
            } 
        }  
}


