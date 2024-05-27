//授業名取得
let AssignURL = document.querySelectorAll(".courselistweekly-nonborder          courselistweekly-c");
let classNames = document.querySelectorAll(".course.course-cell");
let courseweeklyFav= document.querySelectorAll("courseweekly-fav");

//必要なオブジェクト
let Classes=new Array(8);//授業名入れる配列
let ClassNumArray=new Array(8);//授業番号入れる配列
let ClassAssingNum=new Array(8);//href授業番号入れる配列
var ALLofThem = new Array(13);//レポートのページを入れる配列
var AssignNames=new Array(3);//課題の名前
var AssignDeadLine=new Array(3);//課題の締切
var AssignStates=new Array(3);//課題提出状況
var unSubmitted = new Array(3).fill(null).map(() => new Array(3));
let countClass=0;//クラスを数える
let unSubmitedCount=0;
let Counts=0;
let unsubCount=0;
let callNum=0;
let count=0

//main関数
console.log("classInfo");
Search_URL_Num()
console.log( "" )

console.log("Assign");

console.log( "" )
// クラスからhrefを取得する(動作確認)

function Search_URL_Num(){
    let elements = document.querySelectorAll(".courseweekly-fav");
    elements.forEach(element => {
        let href = element.getAttribute('href'); // href属性を取得
        if (href) {
            // console.log(href);
            let hrefText = href.slice(21, 27);
            ClassAssingNum[countClass] = hrefText;
            getAssignInfo(hrefText)
            console.log(countClass + "=   " + ClassAssingNum[countClass]);
            countClass++;
        }
    });
}







