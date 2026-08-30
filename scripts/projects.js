
const projects = [
    {
        github : "https://github.com/norma1guy/Automated-Test-Generation",
        name : "Automated Test Generator",
        description : "Automated test generator for python using fuzzing logic and genetic algorithms."
    },
    {
        github : "https://github.com/norma1guy/Multi-source-code-search",
        name : "Code Search with ML",
        description : "Search engine to query a large code base using FREQ (bag of words count),TF-IDF,LSI and Doc2Vec embeddings."
    },
    {
        github : "https://github.com/norma1guy/Bug-Prediction",
        name : "Bug Prediction using NLP",
        description : "Predict the bug proneness of classes using code and NLP (Natural Language Processing) metrics."
    },
    {
        github : "https://github.com/norma1guy/EmeRLd",
        name : "EmeRLd",
        description : "A Reinforcement Learning agent to play Pokemon Emerald."
    },
    {
        github : "https://github.com/norma1guy/God-Classes",
        name : "God Classes",
        description : "Using clustering algorithms to determine god classes in a code base."
    }
]

const container = document.querySelector(".project-container");

projects.forEach(project => {
    const card = document.createElement("div");
    card.classList.add('project');
    
    card.innerHTML = `
        <div class="pokeball">
            <img class="closed" src="images/ball-closed.png">
            <img class="opening" src="images/ball-opening.png">
            <img class="open" src="images/ball-open.png">
        </div>
        <div class="project-card">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <a href="${project.github}">Github</a>
        </div>
        `;
    
    container.appendChild(card);
});