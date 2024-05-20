//授業名取得
let AssignURL = document.querySelectorAll(".courselistweekly-nonborder          courselistweekly-c");
let classNames = document.querySelectorAll(".course.course-cell");
let AssignPage= document.querySelectorAll("courseweekly-fav");


let Classes=new Array(8);//授業名入れる配列
let ClassNum=new Array(8);//授業番号入れる配列
let ClassAssingNum=new Array(8);//授業番号入れる配列
var ALLofThem = new Array(13);//レポートのページを入れる配列
var AssignNames=new Array(3);//課題の名前
var AssignDeadLine=new Array(3);//課題の締切
var AssignStates=new Array(3);//課題提出状況
var unSubmitted = new Array(3).fill(null).map(() => new Array(3));
let countClass=0;//クラスを数える
let unSubmitedCount=0;
let count=0;

// 消さないで
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
// href取得
    for (let i = 0; i < ClassAssingNum.length; i++) {
        // console.log(ClassAssingNum[i]);
        getAssignInfo(ClassAssingNum[i]);
        
    }   

//授業の情報を取ってくる
console.log("classInfo");
SearchInfo(classNames,ClassNum)
console.log("Assign");
// AssignSearchInfo(AssignPage,ClassAssingNum)
//宿題の情報をとってくる
// getAssignInfo(317295)
// getAssignInfo(317310)

function  SearchInfo(name,List){
    name.forEach(element => {
        let text = element.textContent;
        let newTextElement = document.createElement("div"); 
        newTextElement.textContent = text.trim();
        const computedStyle = window.getComputedStyle(element);
            //授業のコマ情報を取ってくる
            let ClassText=text.replace(/\s+/g, '');
            List[countClass]=ClassText;
            let classNum = ClassText.slice(0, 5);
            List[countClass]=classNum;
            console.log(countClass+"=   "+List[countClass]);
            // console.log(countClass+"=   "+List[countClass]);
            countClass++;
            //html上に表示
            displayOnSite(name,newTextElement)
    });
    let separator = document.createElement("div");
    separator.textContent = "-------";
    document.body.appendChild(separator);
    countClass=0;
}
// function  SearchInfoHerf(name,List){
//     name.forEach(element => {
//         let text = element.href;
//         // let newTextElement = document.createElement("div"); 
//         // newTextElement.textContent = text.trim();
//         // const computedStyle = window.getComputedStyle(element);
//             //授業のコマ情報を取ってくる
//             let ClassText=text.replace(/\s+/g, '');
//             List[countClass]=ClassText;
//             // let classNum = ClassText.slice(0, 5);
//             // List[countClass]=ClassText;
//             console.log(countClass+"=   "+List[countClass]);
//             // console.log(countClass+"=   "+List[countClass]);
//             countClass++;
//             // //html上に表示
//             // displayOnSite(name,newTextElement)
//     });
//     let separator = document.createElement("div");
//     separator.textContent = "-------";
//     document.body.appendChild(separator);
//     countClass=0;
// }
function SearchInfoHerf(elements, List) {
    elements.forEach(element => {
        let href = element.getAttribute('href'); // href属性を取得
        List[countClass] = href;
        console.log(countClass + "=   " + List[countClass]);
        countClass++;
    });

    let separator = document.createElement("div");
    separator.textContent = "-------";
    document.body.appendChild(separator);
    countClass = 0;
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

//全部表示
function ShowAll(ALLofThem) {
    for (let i = 0; i < ALLofThem.length; i++) {
        console.log(i+"=  "+ALLofThem[i])
    }  
}
//配列に分ける
    function SetNames() {
        for (let i = 0; i < ALLofThem.length; i=i+4) {
            AssignNames[i/4]=ALLofThem[i];
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
        function display(array) {
        for (let i = 0; i < array.length; i++) {
            console.log("Assing is"+i+"    "+array[i] );
        }  
    }


function judgeAssignStates() {
    for (let i = 0; i < AssignStates.length; i++) {
        
        if (AssignStates[i] !== undefined && AssignStates[i].includes("未提出")) {
            let textNode = document.createTextNode(AssignNames[i]);
            let brNode1 = document.createElement("br");

            let deadlineNode = document.createTextNode(AssignDeadLine[i]);
            let brNode2 = document.createElement("br");

            let textNodes = document.createTextNode("");
            unSubmitted[unSubmitedCount] = [];
            unSubmitted[unSubmitedCount][0] = document.createTextNode(AssignNames[i]);
            unSubmitted[unSubmitedCount][1] = document.createTextNode(AssignDeadLine[i]);
            
            let firstChild = document.body.firstChild;
            document.body.insertBefore(brNode2, firstChild); // 2つ目の改行を最初に追加（順序に注意）
            document.body.insertBefore(deadlineNode, firstChild);
            document.body.insertBefore(brNode1, firstChild);
            document.body.insertBefore(textNode, firstChild);//課題名
            unSubmitedCount++;
        } 
    }  
//課題のページから取ってくるだけ
} function getAssignInfo(classNum) {
  fetch("https://ct.ritsumei.ac.jp/ct/course_8"+classNum+"_report")
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

    SetNames();
    SetDeadLines();
    SetAssignStates();

    judgeAssignStates()
    })
    .catch(error => console.log("Fetch error:", error));
}   







