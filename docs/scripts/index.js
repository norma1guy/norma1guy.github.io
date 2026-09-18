const intro = "Hello my name is Anuj Kumar. I am a computer science enthusiast who loves video games and is trying to intersect both my interests with the help of reinforcement learning. If I am not on my computer then you can find me on the football field trying to nutmeg people.";

const degrees = [
    {
    degree : "MS in Software and Data Engineering",
    start : "Sept 2023",
    end : "Feb 2026",
    college : "Università della Svizzera italiana",
    website : "https://www.usi.ch/en",
    location : "Lugano, Switzerland",
    },
    {
    degree : "B.Tech in Electronics and Communication Engineering",
    start : " Aug 2016",
    end : "Aug 2021",
    college : "Manipal Institute of Technology",
    website : "https://www.manipal.edu/mit.html",
    location : "Manipal, India",
    }
]

const projects = {

    testgen :   {
                    github : "https://github.com/norma1guy/Automated-Test-Generation",
                    name : "Automated Test Generator",
                    description : "Automated test generator for python using fuzzing logic and genetic algorithms."
                },
    codesearch :    {
                        github : "https://github.com/norma1guy/Multi-source-code-search",
                        name : "Code Search",
                        description : "Search engine to query a large code base using different NLP vector embeddings."
                    },
    bugpredict :    {
                        github : "https://github.com/norma1guy/Bug-Prediction",
                        name : "Bug Prediction",
                        description : "Predict the bug proneness of classes using code and NLP metrics."
                    },
    bugtriage :     {
                        github : "https://github.com/JacobSalvi/software-analytics-bug-triaging",
                        name : "Bug Triaging",
                        description : "Fine tuned LLM for automated bug triaging using data scraped from GitHub."
                    },
    emerld :    {
                    github : "https://github.com/norma1guy/EmeRLd",
                    name : "EmeRLd",
                    description : "A Reinforcement Learning agent to play Pokemon Emerald."
                }
}

function displayAboutMe() {
    const aboutme = document.createElement("div");
    aboutme.classList.add("intro-about-me");

    aboutme.innerHTML = `<p>${intro}</p>`;

    return [aboutme];
}
function displayEducation(){

    const education = document.querySelector('.content')
    let cards = []
    degrees.forEach((degree,index) => {
        const card = document.createElement('div');
        card.classList.add('degree-card');

        card.innerHTML = `
        <div class="degree-info">
            <p class="degree-info-degree"><b>${degree.degree}</b></p>
            <p><b>${degree.start} - ${degree.end}</b></p>
        </div>
        <div class="logo-container">
            <img src="assets/images/clg-icon-${index + 1}.svg" class="clg-logo-${index + 1}">
        </div>
        <div class="degree-college">
            <a href="${degree.website}"><b>${degree.college}</b></a>
            <p><b>${degree.location}</b></p>
        </div>
        `
        cards.push(card)

        //education.appendChild(card);

    })
    return cards;
}

function createTitleElement(text){

    

    return titleContainer;
}

function displayProjects(){

    const content = document.querySelector('.content')
    const projectsContainer = document.createElement('div')
    projectsContainer.classList.add('projects-container');
    const cards = document.createElement('div');
    cards.classList.add('project-cards');

    Object.entries(projects).forEach(([key,project],index) => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.id = key;

        //Title
        const titleContainer = document.createElement('div');
        titleContainer.classList.add('project-title')
        const title = document.createElement('h3');
        title.classList.add('project-name')
        title.textContent =  project.name;
        titleContainer.appendChild(title);
        
        //Description
        const description = document.createElement('div');
        description.classList.add('project-description');
        description.textContent = project.description;
        description.style.fontWeight = 'bold';

        //Github Link
        const gitLink = document.createElement('a');
        gitLink.href = `${project.github}`;
        const gitIcon = document.createElement('img');
        gitIcon.classList.add('github-icon');
        gitIcon.src = 'assets/images/github-dark.svg'
        gitLink.appendChild(gitIcon);
        gitLink.classList.add('github-link');
        const githubContainer = document.createElement('div');
        githubContainer.appendChild(gitLink);
        githubContainer.classList.add('project-link');

        card.appendChild(titleContainer);
        card.appendChild(description)
        card.appendChild(githubContainer);
        cards.appendChild(card);
    })

    projectsContainer.appendChild(cards);
    return [projectsContainer];
}




let activeIndex = -1;
let automaticScroll = false;
let sections = { 1 : 'Home', 2 : 'Education', 3 : 'Projects'}
const displayContent = [displayAboutMe,displayEducation,displayProjects];
document.querySelector('main').style.height = `${displayContent.length * 100}vh`;

const content = document.querySelector('.content');

// Create container and sidebar
const contentInner = document.createElement('div');
contentInner.classList.add('content-inner');
content.appendChild(contentInner);
let options = ['Home','Education','Projects'];
const sidebar = document.querySelector('.sidebar');
const sidebarContainer = document.createElement('div');
sidebarContainer.classList.add('sidebar-container');
sidebar.appendChild(sidebarContainer);

options.forEach((option,index) => {
    const button = document.createElement('a');
    button.classList.add('sidebar-button');
    button.href = '#';
    button.textContent = option;
    
    button.addEventListener('click',(e) =>{
        e.preventDefault();
        scrollToSection(index);
    });

    sidebarContainer.appendChild(button);
})


let lastScrollY = window.scrollY;

function waitForScrollToFinish(index){

    const target = index * window.innerHeight;

    function check(){
        const distance = Math.abs(window.scrollY - target);
        if(distance < 2 ){
            automaticScroll = false;
            return;
        }

        requestAnimationFrame(check);
    }
    requestAnimationFrame(check);
}

function scrollToSection(index){
    const scrollPosition = index * window.innerHeight;

    updateSidebar(index);

    if(index > activeIndex){
        contentInner.classList.add('fade-up');
    } else {
        contentInner.classList.add('fade-down');
    }
    setTimeout(() => {
        contentInner.innerHTML = '';
        let contentList = displayContent[index]();
        contentList.forEach((con) => {contentInner.appendChild(con);});
        contentInner.classList.remove('fade-up','fade-down');
    },300);
    activeIndex = index;


    automaticScroll = true;
    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
    });

    waitForScrollToFinish(index);

}

function updateSidebar(index){

    const buttons = document.querySelectorAll('.sidebar-button');
    buttons.forEach((button,i) => {
        button.classList.toggle('active',i === index);
    })
}


function updateActiveSection() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight === 0 ? 0 : window.scrollY / scrollableHeight;
    const index = Math.min( displayContent.length - 1,Math.floor(progress * displayContent.length));
    const scrollingDown = lastScrollY < window.scrollY;
    lastScrollY = window.scrollY;

    if(index == activeIndex){
        return;
    }

    if(automaticScroll){
        return;
    }

    activeIndex = index;
    updateSidebar(index);
    
    if(scrollingDown){
        contentInner.classList.add('fade-up');
    } else {
        contentInner.classList.add('fade-down');
    }
    setTimeout(() => {
        contentInner.innerHTML = '';
        let contentList = displayContent[index]();
        contentList.forEach((con) => {contentInner.appendChild(con);});
        contentInner.classList.remove('fade-up','fade-down');
    },300);
}
window.addEventListener('scroll',updateActiveSection);
updateActiveSection();

function updateProjectCard(event){
    const target = event.target;
    if(target.className === 'project-card'){
        for(const child of target.children){
            child.classList.add('visible')
        }
    }
}

function emptyProjectCard(event){
    const target = event.target;
    if(target.className === 'project-card'){
        for(const child of target.children){
            child.classList.remove('visible'); 
        }
    }
}

contentInner.addEventListener('mouseenter',updateProjectCard,true);
contentInner.addEventListener('mouseleave',emptyProjectCard,true);

