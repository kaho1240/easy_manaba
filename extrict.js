
// 全部とってくる
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



