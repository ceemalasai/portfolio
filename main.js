/**
 * PROJECT REPOSITORY DATA
 * Edit this array to add or update your work
 */
const repos = [
    {
        title: "VEON 5G - Telecom Billing",
        desc: "End-to-end automation for UI and API testing of 5G services (Voice, Data, SMS). Validates MSISDN-based charging and product codes.",
        tech: ["Java", "Selenium", "Rest Assured"],
        id: "PRJ-01",
        url: "https://github.com/ceemalasai"
    },
    {
        title: "Restore Management System",
        desc: "Automation test suites for UI, CLI, and API testing. Created reusable libraries in TestNG for device configuration validation.",
        tech: ["Java", "Selenium", "TestNG"],
        id: "PRJ-02",
        url: "https://github.com/ceemalasai"
    }
];

/**
 * RENDER PROJECTS TO THE GRID
 */
function renderProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = repos.map(repo => `
        <div class="glass-card p-8 rounded-3xl border border-white/5 hover:border-cyber-primary/40 transition-all group relative flex flex-col justify-between">
            <div>
                <div class="flex justify-between items-start mb-4">
                     <div class="text-[10px] font-mono text-slate-600">${repo.id}</div>
                     <a href="${repo.url}" target="_blank" class="text-slate-500 hover:text-cyber-primary transition-colors">
                        <i data-lucide="external-link" class="w-4 h-4"></i>
                     </a>
                </div>
                <h3 class="text-xl font-bold text-white mb-4 group-hover:translate-x-1 transition-transform">${repo.title}</h3>
                <p class="text-sm text-slate-400 mb-6 leading-relaxed">${repo.desc}</p>
            </div>
            <div>
                <div class="flex flex-wrap gap-2 mb-6">
                    ${repo.tech.map(t => `<span class="tech-tag font-mono">${t}</span>`).join('')}
                </div>
                <a href="${repo.url}" target="_blank" class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyber-primary group-hover:gap-4 transition-all">
                    View Repository <i data-lucide="arrow-right" class="w-3 h-3"></i>
                </a>
            </div>
        </div>
    `).join('');

    // Re-initialize Lucide icons for dynamically added HTML
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

/**
 * INTERACTION LOGIC
 */
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Toggle Mobile Sidebar
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
    });
}

// Close sidebar on link click (mobile optimized)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            sidebar.classList.add('-translate-x-full');
        }
    });
});

// Scroll Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

// Active Navigation State on Scroll
window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= (sectionTop - 250)) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("sidebar-active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("sidebar-active");
        }
    });
});

/**
 * INITIALIZATION
 */
window.onload = () => {
    // Render Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Render Portfolio Projects
    renderProjects();
    
    // Start Animation Observers
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    
    // Default Sidebar Active State
    const aboutLink = document.querySelector('[data-section="about"]');
    if (aboutLink) aboutLink.classList.add('sidebar-active');
};
