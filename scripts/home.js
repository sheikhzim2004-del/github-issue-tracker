let allIssues = [];
const issuesContainer = document.getElementById('issues-container');
const spinner = document.getElementById('loading-spinner');
const allFilterBtn = document.getElementById('all-filter-btn');
const openFilterBtn = document.getElementById('open-filter-btn');
const closedFilterBtn = document.getElementById('closed-filter-btn');
const countIssues = document.getElementById('issues-count');
const boxDetails =document.getElementById('details-container');

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
    console.log(alldata)
}

// fetch id wise issue
const showModal = async (id)=> {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details =await res.json();
    displayIssuesDetails(details.data)
}

// "data": {
// "id": 20,
// "title": "Login page shows error on slow connections",
// "description": "Login page displays timeout error when internet connection is slow. Need better error handling.",
// "status": "open",
// "labels": [
// "bug"
// ],
// "priority": "medium",
// "author": "network_nancy",
// "assignee": "security_sam",
// "createdAt": "2024-01-13T15:45:00Z",
// "updatedAt": "2024-01-13T15:45:00Z"
// }

// show modal
const displayIssuesDetails = (issue)=>{
    boxDetails.innerHTML = `
    <h1 class="font-bold text-2xl">${issue.title}</h1>
            <div class="gap-2 flex">
                <div class="badge badge-success rounded-full text-white">${issue.status}</div>
                <p>•  ${issue.author}  •</p>
                <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
            </div>
            <div class="flex gap-1">
                <div class="badge badge-soft badge-secondary border-1 border-red-300 p-3 rounded-full font-medium"><i
                        class="fa-solid fa-bug"></i>${issue.labels[0]? issue.labels[0] : 'No labels'}</div>
                <div class="badge badge-soft badge-warning border-1 border-yellow-300 p-3 rounded-full font-medium"><i
                        class="fa-regular fa-life-ring"></i>${issue.labels[1]? issue.labels[1] : 'No labels'}</div>
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
            <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-error">Close</button>
                </form>
            </div>
    `
    document.getElementById('issue_modal').showModal()
}

// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// },
// display issues
const displayIssues = (issues) => {
    issuesContainer.innerHTML = '';
    countIssues.innerText = issues.length;  //count the cardsissues

    issues.forEach(issue => {
        const issuesCard = document.createElement('div');
        issuesCard.className = `card p-4 shadow-lg space-y-3 border-t-5 ${issue.status === 'open' ? 'border-green-500' : 'border-purple-500'}`;
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
                <p class="text-[#64748B]">${issue.author}</p>
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