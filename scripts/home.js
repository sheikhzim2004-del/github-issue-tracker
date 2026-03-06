const issuesContainer = document.getElementById('issues-container');
const spinner = document.getElementById('loading-spinner');
const allFilterBtn = document.getElementById('all-filter-btn');
const openFilterBtn = document.getElementById('open-filter-btn');
const closedFilterBtn = document.getElementById('closed-filter-btn');

// show loading spinner
const showSpinner = ()=>{
    spinner.classList.remove('hidden');
    spinner.classList.add('flex');
}
// hide loading spinner
const hideSpinner = () =>{
    spinner.classList.add('hidden');
}

// load issues
const loadIssues = async ()=>{
    showSpinner();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
     hideSpinner()
    displayIssues(data.data);
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
const displayIssues = (issues)=>{
    issuesContainer.innerHTML = '';

    issues.forEach(issue => {
        const issuesCard = document.createElement('div');
        issuesCard.className = 'card p-4 shadow-lg space-y-3 border-t-5 border-green-500';
        issuesCard.innerHTML = `
        <div  class="flex justify-between">
                <img src="${issue.status==='open'? './assets/Open-Status.png' : './assets/Closed- Status .png'}" alt="">
                <p class="badge badge-soft ${issue.priority==='high'? 'badge-secondary' : issue.priority==='medium'? 'badge-warning' : ''}">${issue.priority}</p>
            </div>
            <div class="space-y-3">
                <h1 class="font-semibold">${issue.title}</h1>
                <p class="line-clamp-2 text-[#64748B]">${issue.description}</p>
                <div>
                    <div class="badge badge-soft badge-secondary border-1 border-red-300 p-3 rounded-full font-medium"><i class="fa-solid fa-bug"></i>${issue.labels[0]? issue.labels[0] : 'No labels'}</div>
                    <div class="badge badge-soft badge-warning border-1 border-yellow-300 p-3 rounded-full font-medium"><i class="fa-regular fa-life-ring"></i>${issue.labels[1]? issue.labels[1] : 'No labels'}</div>
                </div>
                <hr class="border-0 h-0.5 bg-gray-300">
                <p class="text-[#64748B]">${issue.author}</p>
                <p class="text-[#64748B]">${issue.updatedAt}</p>
            </div>
        `;

        
        issuesContainer.appendChild(issuesCard)
    });
}

// filter catagories
const filterCategories = (id)=>{
    // remove active btn
    allFilterBtn.classList.remove('btn-primary');
    openFilterBtn.classList.remove('btn-primary');
    closedFilterBtn.classList.remove('btn-primary');

    // add active btn style
    const active = document.getElementById(id);
    active.classList.add('btn-primary');
}


loadIssues()