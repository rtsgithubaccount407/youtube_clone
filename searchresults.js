// search functionality 
let box =document.getElementById("results")
const query = localStorage.getItem("searchTerm");

async function Data(){
  let response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=AIzaSyB0nijAw0nOkDEX0aui5DU9rUqtaPe0nXE`)
  let data = await response.json()
 const arr = data.items
 console.log(arr)

 renderSearch(arr);
 
}
Data();


function renderSearch(data){

  data.forEach(itm => {
       
   
         let obj ={ 

          videoId:itm.id,
          videoTitle:itm.snippet.title,
          description:itm.snippet.description,
          channelName:itm.snippet.channelTitle,
          channelId:itm.snippet.channelId,
          publishDate:itm.snippet.publishedAt,
          thumbnail:itm.snippet.thumbnails.medium.url,
          
        
        }


        let videoCard =document.createElement("div");
        videoCard.className="videoCard"
        videoCard.innerHTML=` <img onclick="infoShow('${obj.videoId}')" class="thumbnail" src="${obj.thumbnail}" alt="">
                            <div class="videoInfo">
                                <img style="width: 40px; height: 40px;" src="icons/profileBlue.png" alt="..." class="dp">
                                <div class="info">
                                    <p  id="title">${obj.videoTitle}</p>
                                    <p class="channelName">${obj.channelName} </p>
                                    <span>${obj.viewCount} </span><span>&bullet;</span><span>${obj.publishedAt} </span>
                                </div>
                            </div>
        `
        
        
        box.appendChild(videoCard)
       
        
    

});

}

function infoShow(vdata) {
    localStorage.setItem("videoId", vdata);
    window.open("content.html");
  }
