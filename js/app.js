const postContainer=document.getElementById('post-container');
const postLetest=document.getElementById('post-Letest');

const fetchCategories = (cat) =>{
  // const cat='';
  const url =`https://openapi.programming-hero.com/api/retro-forum/posts?category=${cat}`
  fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
      // data.posts
        //console.log(data.posts)
        postContainer.innerHTML='';

        
        
        if(data.posts.length>0){
            document.getElementById("loading-spiner").style.display="none";
        }else{
          document.getElementById("loading-spiner").style.display="block";
        }

        data.posts.forEach((card)=>{
        
          console.log(card.isActive);
          
          
          
          let verifiedbadge=''
          if(card.isActive==true){
            verifiedbadge=` width: 20px;
            top: 35px;
            height: 20px;
            border-radius: 50%;
            left: 100px;
            background-color:green
            `
            
          }else{
            verifiedbadge=` width: 20px;
            top: 35px;
            height: 20px;
            border-radius: 50%;
            left: 100px;
            background-color:red `
          }
          const newPost=document.createElement('div')
          newPost.innerHTML=`
          

          <div class="card lg:card-side bg-base-100 shadow-xl bg-[#f2f2ff] p-[40px] mb-[30px]">
                <div class="w-[100px] h-[270px]">
               
                  <div class="bage absolute w-[20px] h-[20px]" style="${verifiedbadge}">
                  
                  </div>
                  <img src="${card.image}" class="w-[75px] h-[75px] rounded-2xl relative">
                  
                </div>
               
                <div class="card-body w-[600px] h-[205px]">
                  <div class="inter-font text-[14px] font-medium text-[#12132D]">
                    <span>#${card.category}</span>
                    <span>  Author : ${card.author.name}</span>
                  </div>
                  <h2 class="card-title text-[20px] font-bold	text-[#12132D]">${card.title}</h2>
                  <p class="inter-font text-[16px] font-light">${card.description}</p>
                  <div class="flex flex-col w-full">
                    <div class="divider"></div>
                  </div>
                  

                  <div class="flex justify-between">
                    <span class="flex justify-start gap-x-10 inter-font text-[16px] font-light">
                      <div class="flex justify-between gap-x-2"><span><img src="./images/comment/comment.png"></span><span>${card.comment_count}</span></div>
                      <div class="flex justify-between gap-x-2"><span><img src="./images/comment/eye.png"></span><span>${card.view_count}</span></div>
                      <div class="flex justify-between gap-x-2"><span><img src="./images/comment/time.png"></span><span>${card.posted_time}</span></div>
                     
                      
                    </span>
                    
                    <button class="btn-button" onclick="handleSearchBtn(${card.id})" id="emailBTN"><img src="./images/comment/email.png"></button>

                    

                  </div>
                </div>
              </div>
          
          
          `
          postContainer.appendChild(newPost)



        })
    })
}




const fetchLatestPost = () =>{

  const url ='https://openapi.programming-hero.com/api/retro-forum/latest-posts'
  fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
      // data.posts
      data.forEach((card)=>{
         let status=card.author.posted_date!=undefined?card.author.posted_date:'No publish date';
         let position=card.author.designation!=undefined?card.author.designation:'Unknown';
       
        // console.log(card.author.designation);
        const newPostLetest=document.createElement('div')
          newPostLetest.innerHTML=`
          <div class="card lg:w-96 bg-base-100 shadow-xl">
          <figure class="px-10 pt-10">
            <img src="${card.cover_image}" alt="Shoes" class="rounded-xl" />
          </figure>
          <div class="card-body">
            <h3 class="flex justify-start gap-4"><img src="./images/watch.png">
            
            ${status}
            
            </h3>
            <h2 class="card-title">${card.title}</h2>
            <p>${card.description}</p>
            <div class="flex justify-start gap-4">
              <div><img src="${card.profile_image}" class="w-[50px] h-[50px] rounded-full"></div>
              <div class="grid grid-cols-1">
                <span>${card.author.name}</span>
                <span>${position}</span>
              </div>
            </div>
          </div>
        </div>
          `
          postLetest.appendChild(newPostLetest)

      })


    })
  }


const handleSearch=()=>{
  const valueInnerText = document.getElementById("search-value").value;
  // console.log(valueInnerText);
  if(valueInnerText){
    
    fetchCategories(valueInnerText.toLowerCase().trim());
  }

}
// const handleSearchBtn=()=>{
//   const tip= document.getElementById("title-post").innerText;
//   console.log(tip);
// }
function handleSearchBtn(id){
  
   document.getElementsByClassName("comentId").innerText=id;
  
}
function getValue(id) {
  const valueInnerText = document.getElementById(id).innerHTML;
  return valueInnerText;
}
handleSearch()
fetchCategories(cat='')





fetchLatestPost()