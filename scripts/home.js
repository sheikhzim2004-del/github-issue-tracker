let allIssues = [];
const issuesContainer = document.getElementById('issues-container');
const spinner = document.getElementById('loading-spinner');
const allFilterBtn = document.getElementById('all-filter-btn');
const openFilterBtn = document.getElementById('open-filter-btn');
const closedFilterBtn = document.getElementById('closed-filter-btn');
const countIssues = document.getElementById('issues-count');
const boxDetails = document.getElementById('details-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');


// search input
searchBtn.addEventListener('click',  ()=>{
    const searchValue = searchInput.value.trim().toLowerCase();;
    
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res=> res.json())
    .then(data=> {
        const allIssues = data.data;
        // console.log(allIssues)
        const filterIssus = allIssues.filter(issues=> issues.title.toLowerCase().includes(searchValue));
        // console.log(filterIssus);
        displayIssues(filterIssus);
    })
})

// sound the the word
function issuesTitle(title) {
    const utterance = new SpeechSynthesisUtterance(title);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}

// show loading spinner
const showSpinner = () => {
    spinner.classList.remove('hidden');
    spinner.classList.add('flex');
}
// hide loading spinner
const hideSpinner = () => {
    spinner.classList.add('hidden');
}

// load issues
const loadIssues = async () => {
    showSpinner();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    hideSpinner()
    displayIssues(data.data);
    alldata = data.data; //alldata er modde shokol issues card add kora
    // console.log(alldata)
}

// fetch id wise issue
const showModal = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayIssuesDetails(details.data)
}


// show modal
const displayIssuesDetails = (issue) => {

    // const borderClass = issue.status.trim().toLowerCase() === 'open' ? 'border-green-500' : 'border-purple-500';
    boxDetails.classList.add('border-4', 'border-teal-700');

    boxDetails.innerHTML = `
    <h1 class="font-bold text-2xl">${issue.title}</h1>
            <div class="gap-2 flex">
                <div class="badge badge-success rounded-full text-white">${issue.status}</div>
                <p>•  ${issue.author}  •</p>
                <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
            </div>
            <div class="flex gap-1">
                <div class="badge badge-soft badge-secondary border-1 border-red-300 p-3 rounded-full font-medium"><i
                        class="fa-solid fa-bug"></i>${issue.labels[0] ? issue.labels[0] : 'No labels'}</div>
                <div class="badge badge-soft badge-warning border-1 border-yellow-300 p-3 rounded-full font-medium"><i
                        class="fa-regular fa-life-ring"></i>${issue.labels[1] ? issue.labels[1] : 'No labels'}</div>
            </div>
            <p class="py-4">${issue.description}</p>
            <div class="flex bg-gray-100 p-5 rounded-md">
                <div class="flex-1">
                    <p class="text-[#64748B]">Assignee:</p>
                    <p class="font-semibold text-4">${issue.assignee}</p>
                </div>
                <div class="flex-1">
                    <p class="text-[#64748B]">Priority:</p>
                    <p class="badge text-white rounded-full ${issue.priority === 'high' ? 'badge-secondary' : issue.priority === 'medium' ? 'badge-warning' : 'badge-info'}">${issue.priority}</p>
                </div>
            </div>
            <div class="modal-action flex justify-between">
            <button  id="mic" class="btn btn-accent"><i class="fa-solid fa-microphone"></i></button>
                <form method="dialog" flex justify-center>
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-error">Close</button>
                </form>
            </div>
    `
    const mic = document.getElementById('mic');
    mic.addEventListener('click',()=>{
        issuesTitle(issue.title)
    })
    document.getElementById('issue_modal').showModal()
}


// display issues
const displayIssues = (issues) => {
    issuesContainer.innerHTML = '';
    countIssues.innerText = issues.length;  //count the cardsissues

    issues.forEach(issue => {
        const issuesCard = document.createElement('div');
        issuesCard.className = `card p-4 shadow-lg transition-all  hover:-translate-y-1 hover:shadow-xl space-y-3 border-t-4 ${issue.status === 'open' ? 'border-green-500' : 'border-purple-500'}`;

        issuesCard.innerHTML = `
        <div onclick="showModal(${issue.id})">
            <div class="flex justify-between">
                <img src="${issue.status === 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="">
                <p class="badge badge-soft ${issue.priority === 'high' ? 'badge-secondary' : issue.priority === 'medium' ? 'badge-warning' : ''}">${issue.priority}</p>
            </div>
            <div class="space-y-3">
                <h1 class="font-semibold mt-3">${issue.title}</h1>
                <p class="line-clamp-2 text-[#64748B]">${issue.description}</p>
                <div>
                    <div class="badge badge-soft badge-secondary border-1 border-red-300 p-3 rounded-full font-medium"><i class="fa-solid fa-bug"></i>${issue.labels[0] ? issue.labels[0] : 'No labels'}</div>
                    <div class="badge badge-soft badge-warning border-1 border-yellow-300 p-3 rounded-full font-medium"><i class="fa-regular fa-life-ring"></i>${issue.labels[1] ? issue.labels[1] : 'No labels'}</div>
                </div>
                <hr class="border-0 h-0.5 bg-gray-300">
                <p class="text-[#64748B]">#${issue.id} ${issue.author}</p>
                <p class="text-[#64748B]">${new Date(issue.updatedAt).toLocaleDateString()}</p>
            </div>
        </div>
        `;


        issuesContainer.appendChild(issuesCard)
    });
}

// filter catagories
const filterCategories = (id) => {
    // remove active btn
    allFilterBtn.classList.remove('btn-primary');
    openFilterBtn.classList.remove('btn-primary');
    closedFilterBtn.classList.remove('btn-primary');

    // add active btn style
    const active = document.getElementById(id);
    active.classList.add('btn-primary');
}


//open btn filter 
openFilterBtn.addEventListener('click', () => {
    const openCards = alldata.filter(open => open.status === 'open');
    displayIssues(openCards)
})

//closed btn filter
closedFilterBtn.addEventListener('click', () => {
    const closedCards = alldata.filter(closed => closed.status === 'closed');
    displayIssues(closedCards);
})

//all btn filter
allFilterBtn.addEventListener('click', () => {
    const allCards = alldata;
    displayIssues(allCards)
})

loadIssues()