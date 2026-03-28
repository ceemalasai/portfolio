import data from './db.js';

(function () {
    'use strict';

    const populatePortfolio = () => {
        // --- About Section ---
        const aboutContainer = document.querySelector('.about-container');
        if (aboutContainer && data.bio) {
            const introPara = aboutContainer.querySelector('.about-intro');
            if (introPara) introPara.innerHTML = data.bio.about.text[0];

            const mainBioPara = aboutContainer.querySelector('.main-bio');
            if (mainBioPara) mainBioPara.innerHTML = data.bio.about.text[1];

            const identityList = aboutContainer.querySelector('.identity-list');
            if (identityList && data.bio.about.text[2]) {
                const cleanText = data.bio.about.text[2].replace('🚀 What I Do: ', '');
                const items = cleanText.split('; ');
                identityList.innerHTML = items.map(item => `<li class="identity-card">${item.trim()}</li>`).join('');
            }
        }

        // --- Experience Section ---
        const expContainer = document.querySelector('#experience-list');
        if (expContainer && data.experience) {
            expContainer.innerHTML = data.experience.map(exp => `
                <div class="exp-item" style="margin-bottom: 30px; border-left: 2px solid #f9bf3f; padding-left: 20px;">
                    <h3 style="margin:0; font-size:18px; font-weight:700;">${exp.role}</h3>
                    <h4 style="margin:5px 0; font-size:15px; color:#2c98f0;">${exp.company}</h4>
                    <span style="font-size:12px; color:#888; font-weight:500;">${exp.duration}</span>
                    <ul style="margin-top:10px; padding-left:20px; font-size:14px; color:#555;">
                        ${exp.details.map(d => `<li style="margin-bottom:5px;">${d}</li>`).join('')}
                    </ul>
                </div>
            `).join('');
        }

        // --- Technical Skills ---
        const skillCategories = document.querySelectorAll('.skill-category');
        if (skillCategories.length > 0 && data.skills) {
            data.skills.forEach((skill, index) => {
                if (skillCategories[index]) {
                    const titleEl = skillCategories[index].querySelector('h3');
                    const listEl = skillCategories[index].querySelector('ul');
                    if (titleEl) titleEl.innerText = skill.title;
                    if (listEl) {
                        const icons = ["fa-check-square-o", "fa-code", "fa-linux", "fa-github"];
                        const currentIcon = icons[index] || "fa-code";
                        listEl.innerHTML = `
                            <li><i class="fa ${currentIcon}"></i> ${skill.skillName}</li>
                            <li>
                                <div class="progress-wrap" style="width:100%; background:#eee; height:5px; border-radius:5px; margin:8px 0 4px;">
                                    <div class="progress-bar" style="width:${skill.percentage}%; background:#2c98f0; height:100%; border-radius:5px;"></div>
                                </div>
                                <small style="color:#888;">Proficiency: ${skill.percentage}%</small>
                            </li>
                        `;
                    }
                }
            });
        }

        // --- Projects ---
        const populateProjectList = (projectList, containerId) => {
            const container = document.getElementById(containerId);
            if (!container || !projectList) return;
            container.innerHTML = projectList.map(project => `
                <li class="project-item" style="display:flex; justify-content:space-between; align-items:center; background:#f9f9f9; padding:15px; margin-bottom:10px; border-radius:5px; border-left:3px solid #2c98f0;">
                    <div style="flex: 1; padding-right: 15px;">
                        <strong style="font-size:15px; color:#333;">${project.projectName}</strong>
                        <p style="margin:5px 0; font-size:13px; color:#666;">${project.summary}</p>
                        <span style="font-size:11px; color:#2c98f0; font-weight:600;">Tech: ${project.techStack.join(', ')}</span>
                    </div>
                    <a href="${project.preview}" target="_blank" style="white-space:nowrap; padding:6px 15px; border:1px solid #2c98f0; border-radius:4px; font-size:12px; font-weight:700;">View Code</a>
                </li>
            `).join('');
        };
        populateProjectList(data.projects.web, 'web-projects');
        populateProjectList(data.projects.software, 'software-projects');

        // --- Education & Contact ---
        const eduBlock = document.querySelector('.education-block');
        if (eduBlock && data.education) {
            eduBlock.innerHTML = data.education.map(edu => `
                <div class="edu-item">
                    <table style="width:100%;">
                        <tr><td style="font-weight:bold; width:120px; padding:5px 0;">Degree:</td><td>${edu.title}</td></tr>
                        <tr><td style="font-weight:bold; padding:5px 0;">Institution:</td><td>${edu.subtitle}</td></tr>
                        <tr><td style="font-weight:bold; padding:5px 0;">Year:</td><td>${edu.duration}</td></tr>
                    </table>
                </div>
            `).join('<hr>');
        }
        
        const contactDiv = document.querySelector('.contact-info');
        if(contactDiv && data.bio.contact) {
            contactDiv.innerHTML = data.bio.contact.text.map(t => `<p style="font-size:16px;">${t}</p>`).join('');
        }
    };

    $(function() {
        populatePortfolio();
        $('.js-colorlib-nav-toggle').on('click', function(e) {
            e.preventDefault();
            $('body').toggleClass('offcanvas');
            $(this).toggleClass('active');
        });
        $('#accordion .link').on('click', function() {
            $(this).next().slideToggle();
            $('.submenu').not($(this).next()).slideUp();
        });
        $('#colorlib-main-menu a[data-nav-section]').on('click', function(e) {
            e.preventDefault();
            const section = $(this).data('nav-section');
            const target = $(`section[data-section="${section}"]`);
            if (target.length) {
                $('html, body').animate({ scrollTop: target.offset().top }, 500);
            }
            if ($('body').hasClass('offcanvas')) {
                $('body').removeClass('offcanvas');
                $('.js-colorlib-nav-toggle').removeClass('active');
            }
            $('#colorlib-main-menu li').removeClass('active');
            $(this).parent().addClass('active');
        });
    });
}());