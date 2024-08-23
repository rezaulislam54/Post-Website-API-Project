const loadLatestPost = async () => {
    const revs = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await revs.json();
    postDisplay(data);
}


const postDisplay = (posts) =>{
    console.log(posts);
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