
const aboutme = document.querySelector('.intro');
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


aboutme.innerHTML = `
    <div class="intro-about-me">
        <p>${intro}</p>
    </div>
`

const education = document.querySelector('.education')

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

    education.appendChild(card);

})

aboutme.appendChild(education)
