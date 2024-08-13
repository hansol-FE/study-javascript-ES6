const ajax = new XMLHttpRequest(); // XHR

const container = document.getElementById("root");
const content = document.createElement("div");

const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

function getData(url) {
  ajax.open("GET", url, false); // 동기적 처리
  ajax.send();

  return JSON.parse(ajax.response); // JSON -> Object
}

const newsFeed = getData(NEWS_URL);

// createElement
const ul = document.createElement("ul");

// 해시 변경 이벤트 리스너
window.addEventListener("hashchange", function () {
  const id = this.location.hash.substring(1);

  const newsContent = getData(CONTENT_URL.replace("@id", id));

  const title = this.document.createElement("h1");
  title.innerHTML = newsContent.title;
  content.appendChild(title);
});

for (let i = 0; i < 10; i++) {
  const div = document.createElement("div");

  div.innerHTML = `
  <li>
    <a href="#${newsFeed[i].id}">
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
    </a>
  </li>
  `;

  ul.appendChild(div.firstElementChild);
}

container.appendChild(ul);
container.appendChild(content);
