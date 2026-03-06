

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
        issuesCard.className = ''
        issuesCard.innerHTML = ` nothing to say
        `;
        
        issuesContainer.appendChild(issuesCard)
    });
}


loadIssues()