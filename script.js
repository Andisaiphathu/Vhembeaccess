// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const loginButton = document.getElementById('login-button');
const modal = document.getElementById('id01');
const closeButton = document.getElementsByClassName('close')[0];
const announcementText = document.getElementById('announcement-text');
const notificationList = document.getElementById('notification-list');
const resultForm = document.getElementById('result-form');
const resultDisplay = document.getElementById('result-display');
const courseGrid = document.querySelector('.course-grid');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Login modal functionality
loginButton.onclick = () => {
    modal.style.display = 'block';
}

closeButton.onclick = () => {
    modal.style.display = 'none';
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Simulated user database (replace with actual backend integration)
const users = [
    { username: 'student1', password: 'password1' },
    { username: 'student2', password: 'password2' }
];

// Login form submission
document.querySelector('.modal-content').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.querySelector('input[name="uname"]').value;
    const password = document.querySelector('input[name="psw"]').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert('Login successful!');
        modal.style.display = 'none';
    } else {
        alert('Invalid username or password. Please try again.');
    }
});

// Registration functionality (simplified, replace with actual backend integration)
document.querySelector('.psw a[href="#"]').onclick = (e) => {
    e.preventDefault();
    const username = prompt('Enter a new username:');
    const password = prompt('Enter a new password:');
    if (username && password) {
        users.push({ username, password });
        alert('Registration successful! You can now log in.');
    }
};

// Animated counters
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    const range = end - start;
    const minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    const startTime = new Date().getTime();
    const endTime = startTime + duration;
    let timer;

    function run() {
        const now = new Date().getTime();
        const remaining = Math.max((endTime - now) / duration, 0);
        const value = Math.round(end - (remaining * range));
        obj.innerHTML = value;
        if (value == end) {
            clearInterval(timer);
        }
    }

    timer = setInterval(run, stepTime);
    run();
}

// Animate counters when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            animateValue("student-count", 0, 5000, 2000);
            animateValue("course-count", 0, 50, 2000);
            animateValue("graduate-count", 0, 1000, 2000);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.stats-container'));

// Rotating announcements
const announcements = [
    "Admissions open for August 2024: Engineering, Business, IT, and more!",
    "New scholarship opportunities available. Apply now!",
    "Campus job fair next month. Prepare your resumes!"
];

let currentAnnouncementIndex = 0;

setInterval(() => {
    currentAnnouncementIndex = (currentAnnouncementIndex + 1) % announcements.length;
    announcementText.textContent = announcements[currentAnnouncementIndex];
}, 5000);

// Notifications
const notifications = [
    "Exam results for the Spring semester are now available.",
    "Library hours extended during final exam week.",
    "New online course registration system launching next month."
];

notifications.forEach(notification => {
    const li = document.createElement('li');
    li.textContent = notification;
    notificationList.appendChild(li);
});

// Results checking (simulated)
resultForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rollNumber = document.getElementById('roll-number').value;
    // Simulated result (replace with actual data fetching)
    const result = {
        name: "John Doe",
        rollNumber: rollNumber,
        grade: "A"
    };
    resultDisplay.innerHTML = `
        <h3>Result for Roll Number: ${result.rollNumber}</h3>
        <p>Name: ${result.name}</p>
        <p>Grade: ${result.grade}</p>
    `;
});

// Course data
const courses = [
    { name: "Civil Engineering", icon: "fas fa-hard-hat" },
    { name: "Computer Science", icon: "fas fa-laptop-code" },
    { name: "Business Administration", icon: "fas fa-chart-line" },
    { name: "Electrical Engineering", icon: "fas fa-bolt" },
    { name: "Mechanical Engineering", icon: "fas fa-cogs" },
    { name: "Accounting", icon: "fas fa-calculator" }
];

// Populate course grid
courses.forEach(course => {
    const courseCard = document.createElement('div');
    courseCard.className = 'course-card';
    courseCard.innerHTML = `
        <i class="${course.icon}"></i>
        <h3>${course.name}</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <a href="#" class="apply-button">Apply Now</a>
    `;
    courseGrid.appendChild(courseCard);
});