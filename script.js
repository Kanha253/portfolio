document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    const supportRobin = document.querySelector('.support-img');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
                if (supportRobin) supportRobin.classList.add('support-img-above-top');
            } else {
                backToTopButton.style.display = 'none';
                if (supportRobin) supportRobin.classList.remove('support-img-above-top');
            }
        });
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Show more button functionality
    const showMoreBtn = document.getElementById('showMoreBtn');
    const moreInfo = document.getElementById('moreInfo');
    if (showMoreBtn && moreInfo) {
        showMoreBtn.addEventListener('click', function() {
            moreInfo.classList.toggle('d-none');
            this.textContent = moreInfo.classList.contains('d-none') ? 'Show More' : 'Show Less';
        });
    }

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
        if (!skillsContainer) return;
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
    if (addSkillBtn && skillsContainer) {
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
    }

    // Academic data
    const academicData = [
        { semester: '1st Semester', cgpa: 6.87 },
        { semester: '2nd Semester', cgpa: 7.37 },
        { semester: '3rd Semester', cgpa: 7.69 },
        { semester: '4th Semester', cgpa: 7.7 },
        { semester: '5th Semester', cgpa: 7.67 },
        { semester: '6th Semester', cgpa: 7.73 },
        { semester: '7th Semester', cgpa: 7.88 },
        { semester: '8th Semester', cgpa: 7.9 }
    ];

    // Render academic table
    const academicTable = document.getElementById('academicTable');
    function renderAcademicTable() {
        if (!academicTable) return;
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
    if (exportBtn && academicTable) {
        exportBtn.addEventListener('click', function() {
            const dataStr = JSON.stringify(academicData, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            const exportFileDefaultName = 'academic-performance.json';
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        });
    }

    const exportExcelBtn = document.getElementById('exportExcelBtn');
    if (exportExcelBtn && academicTable) {
        exportExcelBtn.addEventListener('click', function() {
            // Convert academicData to CSV
            let csv = 'Semester,CGPA\n';
            academicData.forEach(item => {
                csv += `${item.semester},${item.cgpa}\n`;
            });
            // Create a Blob and trigger download as .xlsx (Excel can open CSV files)
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'academic-performance.xlsx';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    if (contactForm && formSuccess) {
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
    }

    // Smooth scrolling for navigation links (only for anchor links on the same page)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
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

    // Profile image carousel logic (fixed rotation)
    const carouselImages = [
        { src: 'pics/pic1.jpg', alt: 'Left Pic' },
        { src: 'pics/kanhaiya_profile.jpg', alt: 'Profile' },
        { src: 'pics/pic3.jpg', alt: 'Right Pic' }
    ];
    const leftCard = document.querySelector('.left-card .card-img');
    const centerImg = document.getElementById('centerProfileImg');
    const rightCard = document.querySelector('.right-card .card-img');
    const leftArrow = document.querySelector('.carousel-arrow.left-arrow');
    const rightArrow = document.querySelector('.carousel-arrow.right-arrow');

    function updateCarousel() {
        if (leftCard && centerImg && rightCard) {
            leftCard.src = carouselImages[0].src;
            leftCard.alt = carouselImages[0].alt;
            centerImg.src = carouselImages[1].src;
            centerImg.alt = carouselImages[1].alt;
            rightCard.src = carouselImages[2].src;
            rightCard.alt = carouselImages[2].alt;
        }
    }
    updateCarousel();

    if (leftArrow && rightArrow) {
        leftArrow.addEventListener('click', function() {
            // Rotate left: center -> left, right -> center, left -> right
            const temp = carouselImages[0];
            carouselImages[0] = carouselImages[1];
            carouselImages[1] = carouselImages[2];
            carouselImages[2] = temp;
            updateCarousel();
        });
        rightArrow.addEventListener('click', function() {
            // Rotate right: center -> right, left -> center, right -> left
            const temp = carouselImages[2];
            carouselImages[2] = carouselImages[1];
            carouselImages[1] = carouselImages[0];
            carouselImages[0] = temp;
            updateCarousel();
        });
    }

    // Auto-rotate carousel from left to right every 3 seconds
    setInterval(function() {
        // Same as right arrow click
        const temp = carouselImages[2];
        carouselImages[2] = carouselImages[1];
        carouselImages[1] = carouselImages[0];
        carouselImages[0] = temp;
        updateCarousel();
    }, 3000);

    // Education timeline data and rendering
    const educationData = [
        {
            title: "Siksha 'O' Anusandhan University",
            subtitle: "Bachelor of Technology in Computer Science and Engineering (B.Tech. CSE)",
            date: "2021 — 2025",
            location: "Bhubaneswar, Odisha",
            details: [
                "Current CGPA: 7.9",
                "Relevant Coursework: Data Structures, Algorithms, DBMS, Operating Systems",
                "Projects: Web-based Student Portal, IoT Home Automation"
            ]
        },
        {
            title: "Kendriya Vidyalaya AFS, Bamrauli, Prayagraj",
            subtitle: "12th Science",
            date: "2020 — 2021",
            location: "Prayagraj, UP",
            details: [
                "Percentage: 81% (CBSE Board)",
                "Subjects: Physics, Chemistry, Mathematics, Computer Science"
            ]
        },
        {
            title: "Kendriya Vidyalaya AFS, Bamrauli, Prayagraj",
            subtitle: "10th Science",
            date: "2018 — 2019",
            location: "Prayagraj, UP",
            details: [
                "Percentage: 82% (CBSE Board)",
                "Awarded for Academic Excellence",
                "Active in Science Club and School Quiz Team"
            ]
        }
    ];

    function renderEducationTimeline() {
        const container = document.getElementById('educationTimeline');
        if (!container) return;
        container.innerHTML = '<div class="timeline"></div>';
        const timeline = container.querySelector('.timeline');
        educationData.forEach((item, idx) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item fade-in';
            timelineItem.style.transitionDelay = (idx * 0.15) + 's';
            let detailsHtml = '';
            if (item.details && item.details.length > 0) {
                detailsHtml = '<ul class="timeline-item-list">' + item.details.map(d => `<li>${d}</li>`).join('') + '</ul>';
            }
            timelineItem.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-item-title">${item.title}</div>
                <div class="timeline-item-subtitle">${item.subtitle}</div>
                <div class="timeline-item-date">${item.date}</div>
                <div class="timeline-item-location">${item.location}</div>
                ${detailsHtml}
            `;
            timeline.appendChild(timelineItem);
        });
        // Set initial opacity for fade-in
        timeline.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.7s cubic-bezier(.4,0,.2,1)';
        });
        setTimeout(() => {
            timeline.querySelectorAll('.fade-in').forEach(el => {
                el.style.opacity = '1';
            });
        }, 100);
    }
    renderEducationTimeline();
});