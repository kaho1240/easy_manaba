//食べログカレンダー消去
      let calendars = document.querySelectorAll(".list-rst__calendar-frame");
      for(let i = 0; i < calendars.length; i++){
        let e = calendars[i];
        // console.log(e);
        e.style.display = 'none';
      }
//manaba上の曜日を消去
      let reminders = document.querySelectorAll(".top.day");
      for(let i = 0; i < reminders.length; i++){
        let e = reminders[i];
        // console.log(e);
        let newDiv = document.createElement("div");
        // テキストノードを作成し、その中に e の内容を挿入
        let textNode = document.createTextNode(e.textContent);
        // 新しい要素にテキストノードを追加
        newDiv.appendChild(textNode);
        // HTML 上に新しい要素を挿入
        // document.body.appendChild(newDiv);
        e.style.display = 'none';
      }
//outlook
      let HEADS = document.querySelectorAll(".wrapperElement-346");
      for(let i = 0; i < HEADS.length; i++){
        let e = HEADS[i];
        e.style.display = 'none';
      }
//授業名取得
let names = document.querySelectorAll(".course.course-cell");

names.forEach(element => {
  let text = element.textContent;
  let newTextElement = document.createElement("div"); 
  console.log(text);
  newTextElement.textContent = text;
  let firstChild = document.body.firstChild;
  if (firstChild) {
    document.body.insertBefore(newTextElement, firstChild);
  } else {
    document.body.appendChild(newTextElement); // ページに既存の要素が存在しない場合は、新しい要素を追加する
  }

});
fetch("https://ct.ritsumei.ac.jp/ct/course_8317295_report")
  .then(response => response.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    
    // border.center クラス内の要素を取得
    const elements = doc.querySelectorAll(".border.center");
    
    // テキストを抽出して表示
    elements.forEach(element => {
      const text = element.textContent.trim();
      console.log(text);
    });
  })
  .catch(error => console.log("Fetch error:", error));



 
