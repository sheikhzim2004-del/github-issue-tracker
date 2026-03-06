

// load issues
const loadIssues = async ()=>{
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    displayIssues(data.data);
}


// display issues
const displayIssues = (issues)=>{
    const issuesContainer = document.getElementById('issues-container');
    issuesContainer.innerHTML = '';

    issues.forEach(issue => {
        const issuesCard = document.createElement('div');
        issuesCard.className = 'card p-4 shadow-lg space-y-3 border-t-5 border-green-500';
        issuesCard.innerHTML = `
        <div  class="flex justify-between">
                <img src="./assets/Open-Status.png" alt="">
                <p class="badge badge-soft badge-secondary">HIGH</p>
            </div>
            <div class="space-y-3">
                <h1 class="font-semibold">Fix navigation menu on mobile devices</h1>
                <p class="line-clamp-2 text-[#64748B]">The navigation menu doesn't collapse properly on mobile devices</p>
                <div>
                    <div class="badge badge-soft badge-secondary border-1 border-red-300 p-3 rounded-full font-medium"><i class="fa-solid fa-bug"></i>BUG</div>
                    <div class="badge badge-soft badge-warning border-1 border-yellow-300 p-3 rounded-full font-medium"><i class="fa-regular fa-life-ring"></i>Help Wanted</div>
                </div>
                <hr class="border-0 h-0.5 bg-gray-300">
                <p class="text-[#64748B]">#1 by john_doe</p>
                <p class="text-[#64748B]">1/15/2024</p>
            </div>
        `;
        
        issuesContainer.appendChild(issuesCard)
    });
}


loadIssues()