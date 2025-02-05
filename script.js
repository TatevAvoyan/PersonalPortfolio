document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navigation = document.querySelector('.navigation');

    // Add background to header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navigation.classList.toggle('mobile');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        // Collect form data
        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const message = document.querySelector('#message').value.trim();

        // Simple form validation
        if (!name || !email || !message) {
            alert('All fields are required!');
            return;
        }

        // Send the form data to the server
        try {
            const response = await fetch('http://localhost:5000/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });

            const result = await response.json();

            if (result.success) {
                alert('Your message was sent successfully!');
                contactForm.reset(); // Clear form fields
            } else {
                alert('Failed to send your message. Please try again.');
            }
        } catch (error) {
            alert('There was an error sending your message. Please check your internet connection and try again.');
            console.error('Error:', error);
        }
    });
});

const projects = {
    project1: {
        title: "Project 1 Title",
        description: "This is the detailed description for Project 1.",
        github: "https://github.com/TatevAvoyan/project1",
        live: "https://example.com/project1",
        image: "project1-image.jpg",
        video: "https://www.youtube.com/embed/sample1-id"
    },
    project2: {
        title: "Project 2 Title",
        description: "This is the detailed description for Project 2.",
        github: "https://github.com/TatevAvoyan/project2",
        live: "https://example.com/project2",
        image: "project2-image.jpg",
        video: "https://www.youtube.com/embed/sample2-id"
    }
};

// Get project name from URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const projectKey = urlParams.get('project');
const project = projects[projectKey];

// Populate project page with data if the project exists
if (project) {
    document.querySelector('h2').textContent = project.title;
    document.querySelector('p').textContent = project.description;
    document.querySelector('.project-links a:nth-child(1)').setAttribute('href', project.github);
    document.querySelector('.project-links a:nth-child(2)').setAttribute('href', project.live);
    document.querySelector('.project-media img').setAttribute('src', project.image);
    document.querySelector('.project-media iframe').setAttribute('src', project.video);
} else {
    document.querySelector('.project-details').innerHTML = '<p>Project not found.</p>';
}