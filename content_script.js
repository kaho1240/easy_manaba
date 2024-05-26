//授業名取得
let AssignURL = document.querySelectorAll(".courselistweekly-nonborder          courselistweekly-c");
let classNames = document.querySelectorAll(".course.course-cell");
let AssignPage= document.querySelectorAll("courseweekly-fav");

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
let count=0;
let unsubCount=0;
let callNum=0;
// unSubmitted[unSubmitedCount] = [];//配列を作成

// クラスからhrefを取得する
// console.log("Href Info");
// let elements = document.querySelectorAll(".courseweekly-fav");
//     elements.forEach(element => {
//         let href = element.getAttribute('href'); // href属性を取得
//         if (href) {
//             // console.log(href);
//             let hrefText = href.slice(21, 27);
//             ClassAssingNum[countClass] = hrefText;
//             getAssignInfo(hrefText)
//             console.log(countClass + "=   " + ClassAssingNum[countClass]);
//             countClass++;
//         }
//     });
//     countClass=0;
 
//授業の情報を取ってくる
console.log("classInfo");
SearchInfo(classNames, ClassNumArray)//時間割取得
console.log("Assign");
// AssignSearchInfo(AssignPage,ClassAssingNum)
//宿題の情報をとってくる
getAssignInfo(374977)//スポーツのサイエンス
// getAssignInfo(317310)//実世界実験
getAssignInfo(317331)//機械学習

function  SearchInfo(name,List){
    name.forEach(element => {
        let text = element.textContent;
        let newTextElement = document.createElement("div"); 
        newTextElement.textContent = text.trim();
        const computedStyle = window.getComputedStyle(element);
            //授業のコマ情報を取ってくる
            let ClassText=text.replace(/\s+/g, '');
            List[countClass]=ClassText;
            console.log(ClassText);
            countClass++;
            //html上に表示
            displayOnSite(name,newTextElement)
    });
    let separator = document.createElement("div");
    separator.textContent = "-------";
    document.body.appendChild(separator);
    countClass=0;
}

//html上に表示
function  displayOnSite(name,newTextElement){
    let firstChild = document.body.firstChild;
    if (firstChild) {
        document.body.insertBefore(newTextElement, firstChild);
    } else {
        document.body.appendChild(newTextElement); // ページに既存の要素が存在しない場合は、新しい要素を追加する
    }
}
SearchInfo(AssignPage, ClassAssingNum);

//配列に分ける
    function SetNames() {
        for (let i = 0; i < ALLofThem.length; i=i+4) {
            AssignNames[i/4]=ALLofThem[i];
        }
    }function SetDeadLines() {
        for (let j = 0; j < AssignNames.length; j++) {
            AssignDeadLine[j]=ALLofThem[3+j*4];
        }  
    }function SetAssignStates() {
        for (let j = 0; j < AssignStates.length; j++) {
            AssignStates[j]=ALLofThem[1+j*4];
        }  
    }function display(array) {
        for (let i = 0; i < array.length; i++) {
            console.log("Assing is"+i+"    "+array[i] );
        }  
    }

function judgeAssignStates(num) {
    unSubmitted[unSubmitedCount] = [];//配列を作成
    console.log(num)
    for (let i = callNum; i < AssignStates.length; i++) {
        let firstChild = document.body.firstChild;
        let brNode1 = document.createElement("br");
        if (AssignStates[i] !== undefined && AssignStates[i].includes("未提出")) {
            unSubmitted[unsubCount][0] = AssignNames[i];
            unSubmitted[unsubCount][1] = AssignDeadLine[i];
            console.log(callNum)
            console.log(unSubmitted[unsubCount][0])
            console.log(unSubmitted[unsubCount][1])
        } 
    }  
    callNum++;
} 

function showAssignStates() {
    let firstChild = document.body.firstChild;
       for (let i = 0; i < unSubmitted.length; i++) {
            let brNode1 = document.createElement("br");//改行ノード
            let brNode2 = document.createElement("br");//改行ノード

            let text1 = document.createTextNode(unSubmitted[i][1]);
            let text2 = document.createTextNode(unSubmitted[i][1]);
            
            document.body.insertBefore(brNode2, firstChild); // 2つ目の改行を最初に追加（順序に注意）
            // document.body.insertBefore(deadlineNode, firstChild);
            document.body.insertBefore(text1, firstChild);
            document.body.insertBefore(brNode1, firstChild);
            // document.body.insertBefore(textNode, firstChild);//課題名
            document.body.insertBefore(text2, firstChild);//課題名
            document.body.insertBefore(brNode1, firstChild);
        } 
    }   
showAssignStates()

function getAssignInfo(classAssignNum) {
  fetch("https://ct.ritsumei.ac.jp/ct/course_8"+classAssignNum+"_report")
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const elements = doc.querySelectorAll(".border.center");

        // テキストを配列に入れる
        elements.forEach(element => {
            const text = element.textContent.trim();
            ALLofThem[count]=text;
            count++;
        });

    SetNames();//課題名取得
    SetDeadLines();//締め切り取得
    SetAssignStates();//未提出かどうか

    judgeAssignStates(classAssignNum)
    })
    .catch(error => console.log("Fetch error:", error));
}   







