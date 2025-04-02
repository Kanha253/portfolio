document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Show more button functionality
    const showMoreBtn = document.getElementById('showMoreBtn');
    const moreInfo = document.getElementById('moreInfo');
    showMoreBtn.addEventListener('click', function() {
        moreInfo.classList.toggle('d-none');
        this.textContent = moreInfo.classList.contains('d-none') ? 'Show More' : 'Show Less';
    });

    // Skills data
    const skills = [
        { name: 'Java', level: 85, icon: 'fab fa-java' },
        { name: 'CSS', level: 80, icon: 'fab fa-css3-alt' },
        { name: 'HTML', level: 90, icon: 'fab fa-html5' },
        { name: 'JavaScript', level: 75, icon: 'fab fa-js-square' },
        { name: 'C++', level: 70, icon: 'fab fa-cuttlefish' }
    ];

    // Render skills
    const skillsContainer = document.getElementById('skillsContainer');
    function renderSkills() {
        skillsContainer.innerHTML = '';
        skills.forEach(skill => {
            const skillCol = document.createElement('div');
            skillCol.className = 'col-md-4 mb-4';
            skillCol.innerHTML = `
                <div class="card skill-card h-100 fade-in">
                    <div class="card-body text-center">
                        <i class="${skill.icon} skill-icon"></i>
                        <h5 class="card-title">${skill.name}</h5>
                        <div class="progress mt-3">
                            <div class="progress-bar" role="progressbar" style="width: ${skill.level}%" 
                                 aria-valuenow="${skill.level}" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <p class="mt-2 mb-0">${skill.level}% Proficiency</p>
                    </div>
                </div>
            `;
            skillsContainer.appendChild(skillCol);
        });
    }
    renderSkills();

    // Add skill button functionality
    const addSkillBtn = document.getElementById('addSkillBtn');
    addSkillBtn.addEventListener('click', function() {
        const newSkillName = prompt('Enter new skill name:');
        if (newSkillName) {
            const newSkillLevel = parseInt(prompt('Enter skill proficiency (0-100):'));
            if (!isNaN(newSkillLevel) && newSkillLevel >= 0 && newSkillLevel <= 100) {
                const newSkillIcon = prompt('Enter icon class (e.g., "fab fa-react"):') || 'fas fa-code';
                skills.push({
                    name: newSkillName,
                    level: newSkillLevel,
                    icon: newSkillIcon
                });
                renderSkills();
            } else {
                alert('Please enter a valid number between 0 and 100');
            }
        }
    });

    // Academic data
    const academicData = [
        { semester: '1st Semester', cgpa: 6.87 },
        { semester: '2nd Semester', cgpa: 7.37 },
        { semester: '3rd Semester', cgpa: 7.69 },
        { semester: '4th Semester', cgpa: 7.7 },
        { semester: '5th Semester', cgpa: 7.67 },
        { semester: '6th Semester', cgpa: 7.73 },
        { semester: '7th Semester', cgpa: 7.88 }
    ];

    // Render academic table
    const academicTable = document.getElementById('academicTable');
    function renderAcademicTable() {
        academicTable.innerHTML = '';
        academicData.forEach(item => {
            const progressWidth = (item.cgpa / 10) * 100;
            const row = document.createElement('tr');
            row.className = 'fade-in';
            row.innerHTML = `
                <td>${item.semester}</td>
                <td>${item.cgpa}</td>
                <td>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" style="width: ${progressWidth}%" 
                             aria-valuenow="${progressWidth}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </td>
            `;
            academicTable.appendChild(row);
        });
    }
    renderAcademicTable();

    // Export as JSON button
    const exportBtn = document.getElementById('exportBtn');
    exportBtn.addEventListener('click', function() {
        const dataStr = JSON.stringify(academicData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'academic-performance.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        setTimeout(() => {
            contactForm.reset();
            formSuccess.classList.remove('d-none');
            setTimeout(() => {
                formSuccess.classList.add('d-none');
            }, 3000);
        }, 1000);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
            }
        });
    };

    // Set initial opacity for fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.6s ease-out';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});