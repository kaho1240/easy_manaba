//ファイルを分けれません！！

//授業名取得
let AssignURL = document.querySelectorAll(".courselistweekly-nonborder          courselistweekly-c");
let AssignTitle = document.querySelectorAll(".myassignments-title");

let classNames = document.querySelectorAll(".course.course-cell");
let AssignPage= document.querySelectorAll("courseweekly-fav");

//必要なオブジェクト
let Classes=new Array(9);//授業名入れる配列
let ClassNumArray=new Array(9);//授業番号入れる配列
let ClassAssingNum=new Array(9);//href授業番号入れる配列
var ALLofThem = new Array(80);//レポートのページを入れる配列
 var AssignNames=new Array(15);//課題の名前
var AssignDeadLine=new Array(15);//課題の締切
var AssignStates=new Array(15);//課題提出状況
var unSubmitted = new Array(3).fill(null).map(() => new Array(3));

let countClass=0;//クラスを数える
let unSubmitedCount=0;//未提出の宿題
let count=0;
let unsubCount=0;
let callNum=0;

let setnameCount=0;
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
// getAssignInfo(374977)//スポーツのサイエンス
// // getAssignInfo(317310)//実世界実験
// getAssignInfo(317331)//機械学習
// getAssignInfo(317349)//心理物理

// getAssignInfo(317100)//ソフトウェア
getAssignInfo()
// SetNames(AssignNames, ALLofThem);
    // SetDeadLines();//締め切り取得

function  SearchInfo(name,List){//①授業名をとってくる
    name.forEach(element => {
        let text = element.textContent;
        let newTextElement = document.createElement("div"); 
        newTextElement.textContent = text.trim();
        const computedStyle = window.getComputedStyle(element);
            let ClassText=text.replace(/\s+/g, '');//授業名＋教室
            List[countClass]=ClassText;
            // console.log(ClassText);
            countClass++;
            displayOnSite(name,newTextElement)//html上に表示
    });
    let separator = document.createElement("div");
    separator.textContent = "-------";
    document.body.appendChild(separator);
    console.log(countClass)
}

//html上に表示
function  displayOnSite(name,newTextElement){//①で呼び出す物(変更必要なし)
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
        console.log("Setname count   "+setnameCount)
        for (let i = callNum*4; i < ALLofThem.length; i=i+4) {
            if (ALLofThem[i] !== undefined && ALLofThem[i] !== null) {
                AssignNames[i / 4] = ALLofThem[i];
            
            if (ALLofThem[i] !== undefined && ALLofThem[3+i] !== null) {
                AssignDeadLine[i / 4]=ALLofThem[3+i];
        }
        if (ALLofThem[i] !== undefined && ALLofThem[1+i] !== null) {
                AssignStates[i / 4]=ALLofThem[1+i];
        }
            }
        setnameCount++;
    }
    callNum++;
}
    function SetDeadLines() {
        for (let j = 0; j < AssignNames.length; j++) {
            AssignDeadLine[j]=ALLofThem[3+j*4];
        }  
    }function SetAssignStates() {
        for (let j = 0; j < AssignStates.length; j++) {
            AssignStates[j]=ALLofThem[1+j*4];
        }  
    }
    
    function display(array) {
        for (let i = 0; i < array.length; i++) {
            console.log("Assing is"+i+"    "+array[i] );
        }  
    }



function judgeAssignStates(num) {
    unSubmitted[8] = [];//配列を作成
    // console.log(num)
    for (let i = 0; i < AssignStates.length; i++) {
        // let firstChild = document.body.firstChild;
        // let brNode1 = document.createElement("br");
        if (AssignStates[i] !== undefined && AssignStates[i].includes("未提出")) {
            unSubmitted[unsubCount][0] = AssignNames[i];
            unSubmitted[unsubCount][1] = AssignDeadLine[i];
            // console.log(unsubCount)
            // console.log(unSubmitted[unsubCount][0])
            // console.log(unSubmitted[unsubCount][1])
            unsubCount++;
        } 
    }  
    // callNum++;
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

function getAssignInfo() {//②レポートページをとってくる
  fetch("https://ct.ritsumei.ac.jp/ct/home_summary_report")
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const elements1 = doc.querySelectorAll(".myassignments-title");

        // テキストを配列に入れる
        elements1.forEach(element => {//この中は触らない
            const text = element.textContent.trim();
            AssignNames[count]=text;
            // console.log(AssignNames[count])
            count++;
        });
        count=0;
        console.log("")
        console.log("")
        
    })
    .catch(error => console.log("Fetch error:", error));
} 
let showCount=0;
function getDateElements() {
    // レポートページを取得
    fetch("https://ct.ritsumei.ac.jp/ct/home_summary_report")
      .then(response => response.text())
      .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
  
          // ページからすべての<td>要素を取得
          const dateElements = doc.querySelectorAll("td");
          // 取得した要素から日付のテキストを処理
          dateElements.forEach(td => {
              const text = td.textContent.trim();
              let ClassText = text.replace(/\s+/g, '');
              if (ClassText.length != 0&&!ClassText.includes("帆")) {
                if(showCount%3==0){
                    console.log("");
                  }
                  console.log(ClassText);
                  showCount++;

              }
              // 日付と時間の形式をチェック (例: 2024-06-12 14:40)
              if (/\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(ClassText)) {
                  console.log("Date found: " + ClassText);
              }
          });
      })
      .catch(error => console.log("Fetch error:", error));
  }
  
  // 関数を呼び出す
  getDateElements();
  