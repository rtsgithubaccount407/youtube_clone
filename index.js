const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&key=AIzaSyB0nijAw0nOkDEX0aui5DU9rUqtaPe0nXE&maxResults=24`
    // AIzaSyB0nijAw0nOkDEX0aui5DU9rUqtaPe0nXE
let videoContainer = document.getElementById("videoContainer");
let apiObj = [];

async function getData() {
    let response = await fetch(url)
    let data = await response.json()
    const arr = data.items
    buildData(arr)

}

getData()

function buildData(s) {

    s.forEach(itm => {
        const obj = {
            videoId: itm.id,
            varified: itm.contentDetails.caption,
            videoTitle: itm.snippet.localized.title,
            description: itm.snippet.description,
            channelName: itm.snippet.channelTitle,
            channelId: itm.snippet.channelId,
            publishDate: itm.snippet.publishedAt,
            thumbnail: itm.snippet.thumbnails.medium.url,
            commentCount: itm.statistics.commentCount,
            likeCount: itm.statistics.likeCount,
            viewCount: itm.statistics.viewCount
        }
        apiObj.push(obj)
    });

    render(apiObj)


}

// console.log(apiObj)


function render(apiObj) {

    apiObj.forEach((item) => {


        let videoCard = document.createElement("div");
        videoCard.className = "videoCard"
        videoCard.innerHTML = ` <img onclick="infoShow('${item.videoId}')" class="thumbnail" src="${item.thumbnail}" alt="">
                            <div class="videoInfo">
                                <img style="width: 40px; height: 40px;" src="icons/profileBlue.png" alt="..." class="dp">
                                <div class="info">
                                    <p  id="title">${item.videoTitle}</p>
                                    <p class="channelName">${item.channelName} </p>
                                    <span>${item.viewCount} </span><span>&bullet;</span><span>${item.publishedAt} </span>
                                </div>
                            </div>
        `


        videoContainer.appendChild(videoCard)




    })
}




function infoShow(vdata) {
    localStorage.setItem("videoId", vdata);
    window.open("content.html");
}



// search results



let query = ""

function searchData() {
    query = document.getElementById("search").value;

    localStorage.setItem("searchTerm", query);
    window.open("searchresults.html");
}