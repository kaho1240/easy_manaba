//授業名取得
let names = document.querySelectorAll(".course.course-cell");

names.forEach(element => {
let text = element.textContent;
let newTextElement = document.createElement("div"); 
// console.log(text);
newTextElement.textContent = text;

const computedStyle = window.getComputedStyle(element);
// const width = parseFloat(computedStyle.getPropertyValue("width"));
// console.log(`Element width: ${width}px`);
//こっちはできてるっぽい
    // if (width === 99.9826) {
    //     console.log("done");
    //     const text = element.textContent.trim();
    //     console.log(text);
    //   }

let firstChild = document.body.firstChild;
if (firstChild) {
document.body.insertBefore(newTextElement, firstChild);
} else {
document.body.appendChild(newTextElement); // ページに既存の要素が存在しない場合は、新しい要素を追加する
}

});
document.addEventListener("DOMContentLoaded", function() {
  fetch("https://ct.ritsumei.ac.jp/ct/course_8317295_report")
      .then(response => response.text())
      .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");

          // 対象のHTML要素を取得
          let deadlineElement = doc.querySelector("tr:nth-child(5) td.border.center");


          // テキストコンテンツを取得
          let deadlineText = deadlineElement.textContent.trim();

          // 抽出したテキストを表示
          console.log(deadlineText);
      })
      .catch(error => console.log("Fetch error:", error));
});
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    
    fetch("https://ct.ritsumei.ac.jp/ct/course_8317295_report")
        .then(response => {
            console.log("Fetch response received");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            console.log("HTML fetched successfully");
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            // すべての <td class="border center"> 要素を取得
            let elements = doc.querySelectorAll("td.border.center");
            console.log("Elements found:", elements.length);

            // 特定の要素を抽出（例: 5番目の <td> 要素）
            if (elements.length >= 5) {
                let deadlineElement = elements[4]; // 0-based indexで5番目の要素は4番目
                let deadlineText = deadlineElement.textContent.trim();
                console.log("Deadline text:", deadlineText);
            } else {
                console.log("Not enough elements found");
            }
        })
        .catch(error => console.log("Fetch error:", error));
});






