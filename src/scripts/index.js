const intro = "Hello my name is Anuj Kumar. I am a computer science enthusiast who loves video games and is trying to intersect both my interests with the help of reinforcement learning. If I am not on my computer then you can find me on the football field trying to nutmeg people.";

const degrees = [
    {
    degree : "MS in Software and Data Engineering",
    start : "Sept 2023",
    end : "Feb 2026",
    college : "Università della Svizzera italiana",
    location : "Lugano,Switzerland",
    jist : "",

    },
    {
    degree : "B.Tech in Electronics and Communication Engineering",
    start : " Aug 2016",
    end : "Aug 2021",
    college : "Manipal Institute of Technology",
    location : "Manipal,India",
    jist : "",
    }
]

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

function displayAboutMe() {
    const aboutme = document.createElement("div");
    aboutme.classList.add("intro-about-me");

    aboutme.innerHTML = `<p>${intro}</p>`;

    return [aboutme];
}
function displayEducation(){

    const education = document.querySelector('.content')
    let cards = []
    degrees.forEach(degree => {
        const card = document.createElement('div');
        card.classList.add('degree-card');

        card.innerHTML = `
        <div class="degree-info">
            <h3>${degree.degree}</h3>
            <p>${degree.start} - ${degree.end}</p>
        </div>
        <div class="degree-college">
            <p><b>${degree.college}</b></p>
            <p>${degree.location}</p>
        </div>
        <div class="degree-jist">
            <p>${degree.jist}</p>
        </div>
        `
        cards.push(card)

        //education.appendChild(card);

    })
    return cards;
}

function displayProjects(){

    //const section = document.querySelector('.content');
    const container = document.createElement('div');
    container.classList.add('project-container');

    // Create the icons 
    const pokeballs = document.createElement('div');
    pokeballs.classList.add('pokeballs');
    projects.forEach(project => {
        const icon = document.createElement("img");
        icon.classList.add('icon');
        icon.src = 'assets/images/ball-closed.png';
        icon.draggable = true;
        project.iconElement = icon;
        icon.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('project',project.name);
        });
        pokeballs.appendChild(icon);
    })



    //Scanner for placing the icons
    const scanner = document.createElement('div');
    scanner.classList.add('scanner');
    const scanLine = document.createElement('div');
    scanLine.classList.add('scan-line');
    scanner.appendChild(scanLine);
    let scannerBusy = false;
    let activeIcon = null;
    let activeProject = null;

    // Card that will be used to display information
    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');


    function highlightProject(project){

        if(activeIcon){
            activeIcon.classList.remove('active');
        }
        project.iconElement.classList.add('active');
        activeIcon = project.iconElement;
    }

    function showProject(project) {
        const card = document.querySelector('.project-card');

        card.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <a href="${project.github}">Github</a>
            `;
        card.classList.add('visible');
        highlightProject(project);
    }

    function showScanError() {
        projectCard.innerHTML = `
            <h3>Scan Failed</h3>
            <p>No matching project found.</p>
        `;

        projectCard.classList.add("visible");
    }

    function startScan(){
        scannerBusy = true;
        scanner.classList.add('scanning');
        if(activeIcon){
            activeIcon.classList.remove('active');
        }
        projectCard.classList.remove('visible');
    }

    function finishScan(project){
        showProject(project);
        scanner.classList.remove('scanning');
        projectCard.classList.add('visible');
        scannerBusy = false;
        activeProject = project;
    }

    scanner.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    scanner.addEventListener('drop', (event) =>{
        event.preventDefault();

        if (scannerBusy) {
            scanner.classList.add("busy");

            setTimeout(() => {
                scanner.classList.remove("busy");
            }, 300);

            return;
        }

        

        const projectId = event.dataTransfer.getData('project');

        const project = projects.find(
            p => p.name === projectId
        );

        if (!project){
            showScanError();
            scannerBusy = false;
            scanner.classList.remove('scanning');
            return;
        }

        if(activeProject === project){
            return;
        }
        startScan();

        setTimeout(() => {
            finishScan(project);
        },1500);
    });

    // Add everything to container

    container.appendChild(pokeballs);
    container.appendChild(scanner);
    container.appendChild(projectCard);
    return [container];

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


