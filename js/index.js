const loadDiscus = async (searchText) =>{
    const  rev = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category? =${searchText}`);
    const allPost = await rev.json();
    const totalPost = allPost.posts
    loadDiscusDisplay(totalPost);
}

const loadDiscusDisplay = (posts) =>{
    const discusContainer = document.getElementById('discus-container');
    discusContainer.textContent= '';
    posts.forEach(data => {
    // console.log(data);
    const div = document.createElement('div');
    div.classList=`my-5`;
    div.innerHTML=` 
        <div class="bg-gray-200 border border-black border-opacity-25 rounded-lg shadow-lg p-6">
            <div class="flex gap-x-5 ">
                <div class=" relative flex-shrink-0">
                    <div id="activeContainer" class="absolute -top-1 left-12 w-3 h-3 bg-green-700 border rounded-full border-gray-300 "></div>
                    <img src="${data.image}" alt="" class="w-14 h-14 border rounded-lg  dark:border-gray-300">
		            </div>
                    <div class="">
                        <span class="text-[16px] font-medium mr-3">#${data.category}</span>
                        <span>Author: ${data.author.name}</span>
                        <h1 class="text-2xl my-1 font-semibold">${data.title}</h1>
                        <p class="opacity-70 mt-3 mr-4 pb-4 border-dashed border-b-2 border-green-500">${data.description} consectetur adipisi itaque laudantium explicabo</p>
                        <div class="flex justify-between items-center mr-3 mt-3">
                            <div class="space-x-2">
                                <i class="fa-regular fa-message"></i> <span>${data.comment_count}</span>
                                <i class="fa-regular fa-eye pl-5"></i><span>${data.view_count}</span>
                                <i class="pl-5 fa-regular fa-clock"></i> <span>${data.posted_time} min</span>
                            </div>
                            <button onclick="handleRedPost('${data.id}'),incrementValue()" class="bg-green-500 w-8  h-8 rounded-full text-white"><i class="fa-solid fa-envelope-open"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    discusContainer.appendChild(div);
  });  
}
loadDiscus();



// hendle search Field
const handelSearchField = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadDiscus(searchText);
}

// handle Details Vew
const handleRedPost = async(id) => {
    console.log('clicked the button',id);
    const respons = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await respons.json();
    const allData = data.posts;
    const allPost = allData.find(p => p.id === +id);
    showRedPost(allPost);  
}

// Red Post Value Increment 
 const valueDisplay = document.getElementById('redCount');
  let value = 0;
   function incrementValue() {
         value += 1; 
        valueDisplay.textContent = value;
 }

 
const showRedPost = (data) =>{
    const showContainer = document.getElementById('showContainer');
    const div = document.createElement('div');
    div.classList=`flex justify-between bg-white rounded-lg border shadow-md p-4 my-5`;
    div.innerHTML = `
         <h2 class="text-xl font-medium">${data.title}</h2>
         <h1> <i class="fa-regular fa-eye"><span class="text-[14px] ml-2">${data.view_count}</span></i></h1>`;
         showContainer.appendChild(div);
}


const loadLatestPost = async () => {
    const revs = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await revs.json();
    postDisplay(data);
}

// Active bg color set
const setActiveBg = (isActive) =>{
    console.log(isActive);
    const activeContainer = document.getElementById('activeContainer');
    if(isActive){
        activeContainer.classList.add('bg-green-700');
    }
    else{
        activeContainer.classList=('bg-red-900');
    }
}


const postDisplay = (posts) =>{
    // console.log(posts);
    const postContainer = document.getElementById('post-container');
    posts.forEach(element => {
       const div  = document.createElement('div');
       div.classList = `rounded-lg shadow-lg border border-black border-opacity-25 p-5`;
       div.innerHTML = `
            <img src="${element.cover_image}" alt="" class="object-cover object-center rounded-lg mb-2 w-full h-72 dark:bg-gray-500 ">
                    <p>${element.author?.posted_date ||`No publish date`}</p>

                    <h1 class="text-xl font-semibold my-3">${element.title}</h1>
                    <p>${element.description} </p>

                    <div class="flex items-center space-x-3 my-3">
                        <img src="${element.profile_image}" alt="" class="object-cover object-center w-9 h-9 rounded-full shadow-sm dark:bg-gray-500 dark:border-gray-300">
                        <div class="-space-y-1">
                            <h2 class="text-sm font-semibold leading-none">${element.author.name}</h2>
                            <span class="inline-block text-xs leading-none dark:text-gray-600">${element.author?.designation || `Unknown`}</span>
                        </div>
                    </div>
       `;

       postContainer.appendChild(div);
    });
}

loadLatestPost();