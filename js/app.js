const ajax = new XMLHttpRequest(); // XHR

const container = document.getElementById("root");
const content = document.createElement("div");

const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

ajax.open("GET", NEWS_URL, false); // 동기적 처리
ajax.send();

// JSON -> Object
const newsFeed = JSON.parse(ajax.response);

// createElement
const ul = document.createElement("ul");

// 해시 변경 이벤트 리스너
window.addEventListener("hashchange", function () {
  const id = this.location.hash.substring(1);

  ajax.open("GET", CONTENT_URL.replace("@id", id), false);
  ajax.send();

  const newsContent = JSON.parse(ajax.response);
  console.log(newsContent);
  const title = this.document.createElement("h1");

  title.innerHTML = newsContent.title;
  content.appendChild(title);
});

for (let i = 0; i < 10; i++) {
  const li = document.createElement("li");
  const a = document.createElement("a");

  a.href = `#${newsFeed[i].id}`;
  a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;

  li.appendChild(a);
  ul.appendChild(li);
}

container.appendChild(ul);
container.appendChild(content);
