const BASE_URL_1 = "https://www.googleapis.com/youtube/v3";
const API_KEY_1 = "AIzaSyB0nijAw0nOkDEX0aui5DU9rUqtaPe0nXE";

const video_container = document.getElementById("yt-video");
const videoId = localStorage.getItem("videoId");
const commentsContainer = document.getElementById("comments");


video_container.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;



async function getComments() {
  const url = `${BASE_URL_1}/commentThreads?key=${API_KEY_1}&videoId=${videoId}&maxResults=80&order=time&part=snippet`;
  const response = await fetch(url, {
    method: "get",
  });
  const data = await response.json();

  const comments = data.items;

  renderComments(comments);

}



function renderComments(comments) {
  commentsContainer.innerHTML = "";
  comments.forEach((comment) => {
    commentsContainer.innerHTML += `
        <p>${comment.snippet.topLevelComment.snippet.textDisplay}</p>
    `;
  });
}

getComments();




const newUrl =`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&key=AIzaSyB0nijAw0nOkDEX0aui5DU9rUqtaPe0nXE&maxResults=24`
// AIzaSyB0nijAw0nOkDEX0aui5DU9rUqtaPe0nXE



async function getData(){
    let response = await fetch(newUrl)
    let data = await response.json()
   const arr = data.items
   buildData(arr)
//    console.log(arr)

}
getData()

const infoBox= document.getElementById("info")
let dataobj=[];
function buildData(res){
    res.forEach(itm => {
       
        if (itm.id==videoId) {
             let obj ={ channel:itm.snippet.channelTitle,
                Title:itm.snippet.localized.title,
                likes:itm.statistics.likeCount,
                Date:itm.snippet.publishedAt,
                viewCount:itm.statistics.viewCount,
                authentic:itm.contentDetails.caption,
            
            }

            dataobj.push(obj);
            
        }

    });

        renderInfo(dataobj)
        
}


function renderInfo(obj){
    let infoCard = document.createElement("div")
    infoCard.className="card"

    infoCard.innerHTML=`
                            <p  id="title">${obj[0].Title}</p>
                            <p class="channel">${obj[0].channel} </p>
                            <span>Likes: ${obj[0].likes} </span><span> &bullet; </span><span>Views: ${obj[0].viewCount} </span><span>&bullet;</span><span> Published on: ${obj[0].Date.split("T")[0]} </span>`


                            infoBox.appendChild(infoCard)
}


