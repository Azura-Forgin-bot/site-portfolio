// Admin Password (Change this to your own!)
// ⚠️ SECURITY NOTE: For a website deployed online, consider:
// - Using a backend server to validate passwords (not client-side)
// - Implementing proper authentication with tokens
// - Using HTTPS only
// - Never keep passwords in client-side code
const ADMIN_PASSWORD = 'julia2026';

// Portfolio Management System
document.addEventListener('DOMContentLoaded', function() {
    // Initialize portfolio data from localStorage
    const portfolio = new Portfolio();
    
    // Smooth scroll for navigation links
    setupSmoothScroll();
    
    // Admin Panel Setup
    setupAdminPanel(portfolio);
    
    // Feedback Tab Setup
    setupFeedbackTab();
    
    // Load initial data
    portfolio.loadData();
    
    // Load existing data from HTML (for first time users)
    loadExistingDataFromHTML(portfolio);
});

// Portfolio Class
class Portfolio {
    constructor() {
        this.defaultData = {
            profile: {
                photo: 'https://via.placeholder.com/200?text=Sua+Foto',
                location: 'Lisboa, Portugal',
                email: 'juliafpinh@hotmail.com',
                phone: '+351 91 234 5678',
                linkedin: 'https://linkedin.com/in/juliafpinh'
            },
            projects: [],
            experience: [],
            education: [],
            skills: []
        };
        this.data = this.getStoredData();
    }

    getStoredData() {
        const stored = localStorage.getItem('portfolioData');
        return stored ? JSON.parse(stored) : { ...this.defaultData };
    }

    saveData() {
        localStorage.setItem('portfolioData', JSON.stringify(this.data));
    }

    loadData() {
        this.updateProfileDisplay();
        this.updateProjectsDisplay();
    }

    updateProfileDisplay() {
        document.getElementById('profileImg').src = this.data.profile.photo;
        document.getElementById('location').textContent = this.data.profile.location;
        
        const emailLink = document.querySelector('#contactEmail a');
        emailLink.href = 'mailto:' + this.data.profile.email;
        emailLink.textContent = this.data.profile.email;
        
        const phoneLink = document.querySelector('#phone a');
        phoneLink.href = 'tel:' + this.data.profile.phone.replace(/\s/g, '');
        phoneLink.textContent = this.data.profile.phone;
        
        const linkedinLink = document.querySelector('#linkedin a');
        linkedinLink.href = this.data.profile.linkedin;
        linkedinLink.textContent = this.data.profile.linkedin;
    }

    updateProjectsDisplay() {
        const grid = document.getElementById('projectsGrid');
        
        if (this.data.projects.length === 0) {
            grid.innerHTML = `
                <div class="project-card">
                    <div class="project-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                        <span class="project-placeholder">🖼️</span>
                    </div>
                    <h3>Seu Projeto Aqui</h3>
                    <p>Adicione descrição do seu projeto</p>
                    <div class="project-tags">
                        <span class="tag-small">Em breve</span>
                    </div>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.data.projects.map(project => `
            <div class="project-card">
                <div class="project-image" style="background-image: url('${project.image}') ; background-color: linear-gradient(135deg, #667eea 0%, #764ba2 100%); ">
                </div>
                <h3>${escapeHtml(project.title)}</h3>
                <p>${escapeHtml(project.description)}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag-small">${escapeHtml(tag)}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    updateProjectsList() {
        const list = document.getElementById('editProjectsList');
        
        if (this.data.projects.length === 0) {
            list.innerHTML = '<p style="color: #999; text-align: center;">Nenhum projeto adicionado ainda</p>';
            return;
        }

        list.innerHTML = this.data.projects.map((project, index) => `
            <div class="project-edit-item">
                <div>
                    <h4>${escapeHtml(project.title)}</h4>
                    <small>${escapeHtml(project.description.substring(0, 50))}...</small>
                </div>
                <button onclick="deleteProject(${index})">Deletar</button>
            </div>
        `).join('');
    }

    addProject(project) {
        this.data.projects.unshift(project);
        this.saveData();
        this.updateProjectsDisplay();
        this.updateProjectsList();
    }

    deleteProject(index) {
        this.data.projects.splice(index, 1);
        this.saveData();
        this.updateProjectsDisplay();
        this.updateProjectsList();
    }

    // Experience Management
    addExperience(experience) {
        this.data.experience.unshift(experience);
        this.saveData();
        this.updateExperienceList();
    }

    deleteExperience(index) {
        this.data.experience.splice(index, 1);
        this.saveData();
        this.updateExperienceList();
    }

    updateExperienceList() {
        const list = document.getElementById('experienceList');
        if (!list) return;

        if (this.data.experience.length === 0) {
            list.innerHTML = '<p style="color: #999; text-align: center;">Nenhuma experiência adicionada ainda</p>';
            return;
        }

        list.innerHTML = this.data.experience.map((exp, index) => `
            <div class="project-edit-item">
                <div>
                    <h4>${escapeHtml(exp.title)}</h4>
                    <small>${escapeHtml(exp.company)} • ${escapeHtml(exp.period)}</small>
                </div>
                <div class="project-edit-item-buttons">
                    <button class="edit-btn" onclick="editExperienceItem(${index})">Editar</button>
                    <button onclick="deleteExperienceItem(${index})">Deletar</button>
                </div>
            </div>
        `).join('');
    }

    // Education Management
    addEducation(education) {
        this.data.education.unshift(education);
        this.saveData();
        this.updateEducationList();
    }

    deleteEducation(index) {
        this.data.education.splice(index, 1);
        this.saveData();
        this.updateEducationList();
    }

    updateEducationList() {
        const list = document.getElementById('educationList');
        if (!list) return;

        if (this.data.education.length === 0) {
            list.innerHTML = '<p style="color: #999; text-align: center;">Nenhuma formação adicionada ainda</p>';
            return;
        }

        list.innerHTML = this.data.education.map((edu, index) => `
            <div class="project-edit-item">
                <div>
                    <h4>${escapeHtml(edu.title)}</h4>
                    <small>${escapeHtml(edu.institution)} • ${escapeHtml(edu.period)}</small>
                </div>
                <div class="project-edit-item-buttons">
                    <button class="edit-btn" onclick="editEducationItem(${index})">Editar</button>
                    <button onclick="deleteEducationItem(${index})">Deletar</button>
                </div>
            </div>
        `).join('');
    }

    // Skills Management
    addSkill(skill) {
        this.data.skills.unshift(skill);
        this.saveData();
        this.updateSkillsList();
    }

    deleteSkill(index) {
        this.data.skills.splice(index, 1);
        this.saveData();
        this.updateSkillsList();
    }

    updateSkillsList() {
        const list = document.getElementById('skillsList');
        if (!list) return;

        if (this.data.skills.length === 0) {
            list.innerHTML = '<p style="color: #999; text-align: center;">Nenhuma habilidade adicionada ainda</p>';
            return;
        }

        list.innerHTML = this.data.skills.map((skill, index) => `
            <div class="project-edit-item">
                <div>
                    <h4>${escapeHtml(skill)}</h4>
                </div>
                <div class="project-edit-item-buttons">
                    <button class="edit-btn" onclick="editSkillItem(${index})">Editar</button>
                    <button onclick="deleteSkillItem(${index})">Deletar</button>
                </div>
            </div>
        `).join('');
    }

    updateProfile(updates) {
        this.data.profile = { ...this.data.profile, ...updates };
        this.saveData();
        this.loadData();
    }
}

// Global portfolio instance
let portfolio;

// Admin Panel Management
function setupAdminPanel(portfolioInstance) {
    portfolio = portfolioInstance;
    
    const adminBtn = document.getElementById('adminBtn');
    const loginModal = document.getElementById('loginModal');
    const adminModal = document.getElementById('adminModal');
    const closeLogin = document.getElementById('closeLogin');
    const closeAdmin = document.getElementById('closeAdmin');
    const loginBtn = document.getElementById('loginBtn');
    const adminPassword = document.getElementById('adminPassword');
    
    // Open login modal
    adminBtn.addEventListener('click', () => {
        loginModal.classList.remove('hidden');
        adminPassword.focus();
    });
    
    // Close login modal
    closeLogin.addEventListener('click', () => {
        loginModal.classList.add('hidden');
        adminPassword.value = '';
    });
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.add('hidden');
            adminPassword.value = '';
        }
    });
    
    // Close admin panel
    closeAdmin.addEventListener('click', closeAdminPanel);
    adminModal.addEventListener('click', (e) => {
        if (e.target === adminModal) closeAdminPanel();
    });
    
    // Login handler
    loginBtn.addEventListener('click', handleAdminLogin);
    adminPassword.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAdminLogin();
    });
    
    // Logout handler
    document.getElementById('logoutBtn').addEventListener('click', handleAdminLogout);
    
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchTab(tabName);
        });
    });
    
    // Save Profile
    document.getElementById('saveProfile').addEventListener('click', saveProfileChanges);
    
    // Profile photo upload
    document.getElementById('profilePhotoUpload').addEventListener('change', handleProfilePhotoUpload);
    
    // Project management
    document.getElementById('addProjectBtn').addEventListener('click', () => {
        document.getElementById('projectEditForm').classList.remove('hidden');
        document.getElementById('projectTitle').focus();
    });
    
    document.getElementById('cancelProjectBtn').addEventListener('click', () => {
        document.getElementById('projectEditForm').classList.add('hidden');
        clearProjectForm();
    });
    
    document.getElementById('saveProjectBtn').addEventListener('click', saveNewProject);
    
    // Project image upload
    document.getElementById('projectImageUpload').addEventListener('change', handleProjectImageUpload);
    
    // Experience management
    document.getElementById('addExperienceBtn').addEventListener('click', () => {
        document.getElementById('experienceForm').classList.remove('hidden');
        document.getElementById('experienceTitle').focus();
    });

    document.getElementById('cancelExperienceBtn').addEventListener('click', () => {
        document.getElementById('experienceForm').classList.add('hidden');
        clearExperienceForm();
        currentEditIndex = null;
    });

    document.getElementById('saveExperienceBtn').addEventListener('click', saveNewExperience);

    // Education management
    document.getElementById('addEducationBtn').addEventListener('click', () => {
        document.getElementById('educationForm').classList.remove('hidden');
        document.getElementById('educationTitle').focus();
    });

    document.getElementById('cancelEducationBtn').addEventListener('click', () => {
        document.getElementById('educationForm').classList.add('hidden');
        clearEducationForm();
        currentEditIndex = null;
    });

    document.getElementById('saveEducationBtn').addEventListener('click', saveNewEducation);

    // Skills management
    document.getElementById('addSkillBtn').addEventListener('click', () => {
        document.getElementById('skillForm').classList.remove('hidden');
        document.getElementById('skillName').focus();
    });

    document.getElementById('cancelSkillBtn').addEventListener('click', () => {
        document.getElementById('skillForm').classList.add('hidden');
        clearSkillForm();
        currentEditIndex = null;
    });

    document.getElementById('saveSkillBtn').addEventListener('click', saveNewSkill);
    
    // Load projects list
    portfolio.updateProjectsList();
    portfolio.updateExperienceList();
    portfolio.updateEducationList();
    portfolio.updateSkillsList();
}

function handleAdminLogin() {
    const password = document.getElementById('adminPassword').value;
    
    if (password === ADMIN_PASSWORD) {
        // Fechar modal de login
        document.getElementById('loginModal').classList.add('hidden');
        // Abrir modal de admin
        document.getElementById('adminModal').classList.remove('hidden');
        
        // Load current data into form
        document.getElementById('editProfileImg').value = portfolio.data.profile.photo;
        document.getElementById('editLocation').value = portfolio.data.profile.location;
        document.getElementById('editEmail').value = portfolio.data.profile.email;
        document.getElementById('editPhone').value = portfolio.data.profile.phone;
        document.getElementById('editLinkedin').value = portfolio.data.profile.linkedin;
        
        // Reset file input
        document.getElementById('profilePhotoUpload').value = '';
    } else {
        alert('Senha incorreta!');
        document.getElementById('adminPassword').value = '';
        document.getElementById('adminPassword').focus();
    }
}

function handleAdminLogout() {
    document.getElementById('adminModal').classList.add('hidden');
    document.getElementById('loginModal').classList.remove('hidden');
    document.getElementById('adminPassword').value = '';
    document.getElementById('adminPassword').focus();
}

function closeAdminPanel() {
    document.getElementById('adminModal').classList.add('hidden');
    document.getElementById('loginModal').classList.remove('hidden');
    document.getElementById('adminPassword').value = '';
}

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active from buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

function saveProfileChanges() {
    const updates = {
        photo: document.getElementById('editProfileImg').value || portfolio.data.profile.photo,
        location: document.getElementById('editLocation').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        linkedin: document.getElementById('editLinkedin').value
    };
    
    portfolio.updateProfile(updates);
    alert('✅ Perfil atualizado com sucesso!');
}

function saveNewProject() {
    const title = document.getElementById('projectTitle').value.trim();
    const description = document.getElementById('projectDescription').value.trim();
    const image = document.getElementById('projectImage').value.trim();
    const tagsStr = document.getElementById('projectTags').value.trim();
    
    if (!title || !description) {
        alert('Por favor, preencha título e descrição!');
        return;
    }
    
    const project = {
        title,
        description,
        image: image || 'https://via.placeholder.com/280x200?text=' + encodeURIComponent(title),
        tags: tagsStr ? tagsStr.split(',').map(tag => tag.trim()) : []
    };
    
    portfolio.addProject(project);
    clearProjectForm();
    document.getElementById('projectEditForm').classList.add('hidden');
    alert('✅ Projeto adicionado com sucesso!');
}

function clearProjectForm() {
    document.getElementById('projectTitle').value = '';
    document.getElementById('projectDescription').value = '';
    document.getElementById('projectImage').value = '';
    document.getElementById('projectTags').value = '';
    document.getElementById('projectImageUpload').value = '';
}

function deleteProject(index) {
    if (confirm('Tem certeza que deseja deletar este projeto?')) {
        portfolio.deleteProject(index);
    }
}

// Experience Management
function saveNewExperience() {
    const title = document.getElementById('experienceTitle').value.trim();
    const company = document.getElementById('experienceCompany').value.trim();
    const period = document.getElementById('experiencePeriod').value.trim();
    const description = document.getElementById('experienceDescription').value.trim();
    
    if (!title || !company) {
        alert('Por favor, preencha cargo e empresa!');
        return;
    }
    
    const experience = {
        title,
        company,
        period: period || 'Período não especificado',
        description: description || ''
    };
    
    if (currentEditIndex !== null) {
        // Update existing
        portfolio.data.experience[currentEditIndex] = experience;
        portfolio.saveData();
        portfolio.updateExperienceList();
        alert('✅ Experiência atualizada com sucesso!');
        currentEditIndex = null;
    } else {
        // Add new
        portfolio.addExperience(experience);
        alert('✅ Experiência adicionada com sucesso!');
    }
    
    clearExperienceForm();
    document.getElementById('experienceForm').classList.add('hidden');
}

function clearExperienceForm() {
    document.getElementById('experienceTitle').value = '';
    document.getElementById('experienceCompany').value = '';
    document.getElementById('experiencePeriod').value = '';
    document.getElementById('experienceDescription').value = '';
}

function deleteExperienceItem(index) {
    if (confirm('Tem certeza que deseja deletar esta experiência?')) {
        portfolio.deleteExperience(index);
    }
}

// Education Management
function saveNewEducation() {
    const title = document.getElementById('educationTitle').value.trim();
    const institution = document.getElementById('educationInstitution').value.trim();
    const period = document.getElementById('educationPeriod').value.trim();
    
    if (!title || !institution) {
        alert('Por favor, preencha curso e instituição!');
        return;
    }
    
    const education = {
        title,
        institution,
        period: period || 'Período não especificado'
    };
    
    if (currentEditIndex !== null) {
        // Update existing
        portfolio.data.education[currentEditIndex] = education;
        portfolio.saveData();
        portfolio.updateEducationList();
        alert('✅ Formação atualizada com sucesso!');
        currentEditIndex = null;
    } else {
        // Add new
        portfolio.addEducation(education);
        alert('✅ Formação adicionada com sucesso!');
    }
    
    clearEducationForm();
    document.getElementById('educationForm').classList.add('hidden');
}

function clearEducationForm() {
    document.getElementById('educationTitle').value = '';
    document.getElementById('educationInstitution').value = '';
    document.getElementById('educationPeriod').value = '';
}

function deleteEducationItem(index) {
    if (confirm('Tem certeza que deseja deletar esta formação?')) {
        portfolio.deleteEducation(index);
    }
}

// Skills Management
function saveNewSkill() {
    const skillName = document.getElementById('skillName').value.trim();
    
    if (!skillName) {
        alert('Por favor, escreva uma habilidade!');
        return;
    }
    
    if (currentEditIndex !== null) {
        // Update existing
        portfolio.data.skills[currentEditIndex] = skillName;
        portfolio.saveData();
        portfolio.updateSkillsList();
        alert('✅ Habilidade atualizada com sucesso!');
        currentEditIndex = null;
    } else {
        // Add new
        portfolio.addSkill(skillName);
        alert('✅ Habilidade adicionada com sucesso!');
    }
    
    clearSkillForm();
    document.getElementById('skillForm').classList.add('hidden');
}

function clearSkillForm() {
    document.getElementById('skillName').value = '';
}

function deleteSkillItem(index) {
    if (confirm('Tem certeza que deseja deletar esta habilidade?')) {
        portfolio.deleteSkill(index);
    }
}

// Edit Functions
let currentEditIndex = null;

function editExperienceItem(index) {
    currentEditIndex = index;
    const exp = portfolio.data.experience[index];
    
    document.getElementById('experienceTitle').value = exp.title;
    document.getElementById('experienceCompany').value = exp.company;
    document.getElementById('experiencePeriod').value = exp.period;
    document.getElementById('experienceDescription').value = exp.description || '';
    
    // Scroll to form
    document.getElementById('experienceForm').classList.remove('hidden');
    document.getElementById('experienceForm').scrollIntoView({ behavior: 'smooth' });
}

function editEducationItem(index) {
    currentEditIndex = index;
    const edu = portfolio.data.education[index];
    
    document.getElementById('educationTitle').value = edu.title;
    document.getElementById('educationInstitution').value = edu.institution;
    document.getElementById('educationPeriod').value = edu.period;
    
    // Scroll to form
    document.getElementById('educationForm').classList.remove('hidden');
    document.getElementById('educationForm').scrollIntoView({ behavior: 'smooth' });
}

function editSkillItem(index) {
    currentEditIndex = index;
    const skill = portfolio.data.skills[index];
    
    document.getElementById('skillName').value = skill;
    
    // Scroll to form
    document.getElementById('skillForm').classList.remove('hidden');
    document.getElementById('skillForm').scrollIntoView({ behavior: 'smooth' });
}

// Handle profile photo upload
function handleProfilePhotoUpload(e) {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
        alert(validation.message);
        return;
    }
    
    // Read and convert to data URL
    const reader = new FileReader();
    reader.onload = function(event) {
        const dataUrl = event.target.result;
        document.getElementById('editProfileImg').value = dataUrl;
        alert('✅ Imagem carregada! Clique em "Guardar Alterações" para salvar.');
    };
    reader.onerror = function() {
        alert('❌ Erro ao ler o arquivo. Tente novamente.');
    };
    reader.readAsDataURL(file);
}

// Handle project image upload
function handleProjectImageUpload(e) {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Validate file
    const validation = validateFile(file);
    if (!validation.valid) {
        alert(validation.message);
        return;
    }
    
    // Read and convert to data URL
    const reader = new FileReader();
    reader.onload = function(event) {
        const dataUrl = event.target.result;
        document.getElementById('projectImage').value = dataUrl;
        alert('✅ Imagem do projeto carregada!');
    };
    reader.onerror = function() {
        alert('❌ Erro ao ler o arquivo. Tente novamente.');
    };
    reader.readAsDataURL(file);
}

// Smooth scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Feedback Tab Setup
function setupFeedbackTab() {
    const feedbackTabBtn = document.getElementById('feedbackTabBtn');
    const feedbackModal = document.getElementById('feedbackModal');
    const closeFeedbackBtn = document.getElementById('closeFeedback');
    const feedbackForm = document.getElementById('feedbackForm');
    
    // Open feedback modal
    feedbackTabBtn.addEventListener('click', () => {
        feedbackModal.classList.remove('hidden');
    });
    
    // Close feedback modal
    closeFeedbackBtn.addEventListener('click', closeFeedbackModal);
    feedbackModal.addEventListener('click', (e) => {
        if (e.target === feedbackModal) closeFeedbackModal();
    });

    // Handle form submission for redirect
    feedbackForm.addEventListener('submit', function(e) {
        // Let Formspree handle the submission
        // After a short delay, redirect to thank you page
        setTimeout(() => {
            window.location.href = 'thank-you.html';
        }, 1000);
    });
}

function closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    modal.classList.add('hidden');
}

// utility
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Sanitize input to prevent XSS attacks
function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input
        .replace(/[<>\"']/g, char => ({
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[char]));
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate file size and type
function validateFile(file, maxSizeMB = 5, allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']) {
    if (!file) return { valid: false, message: 'Nenhum arquivo selecionado' };
    if (file.size > maxSizeMB * 1024 * 1024) {
        return { valid: false, message: `Arquivo muito grande! Máximo ${maxSizeMB}MB` };
    }
    if (!allowedTypes.includes(file.type)) {
        return { valid: false, message: 'Tipo de arquivo não permitido' };
    }
    return { valid: true };
}

// Load existing data from HTML on first load
function loadExistingDataFromHTML(portfolioInstance) {
    // Only load if data is empty (first time)
    if (portfolioInstance.data.experience.length === 0) {
        // Load experience from HTML
        document.querySelectorAll('#experiencia .job').forEach(jobEl => {
            const title = jobEl.querySelector('h3')?.textContent || '';
            const company = title.split(' @ ')[1]?.trim() || '';
            const titleOnly = title.split(' @ ')[0]?.trim() || title;
            const date = jobEl.querySelector('.date')?.textContent || '';
            
            if (title) {
                portfolioInstance.data.experience.push({
                    title: titleOnly,
                    company: company,
                    period: date,
                    description: jobEl.innerText.split('\n').slice(1).join('\n')
                });
            }
        });
    }
    
    if (portfolioInstance.data.education.length === 0) {
        // Load education from HTML
        document.querySelectorAll('#formacao li').forEach(liEl => {
            const text = liEl.textContent || '';
            if (text) {
                // Extract title and institution from format "Title - Institution"
                const parts = text.split(' - ');
                portfolioInstance.data.education.push({
                    title: parts[0]?.trim() || text,
                    institution: parts[1]?.trim() || '',
                    period: ''
                });
            }
        });
    }
    
    if (portfolioInstance.data.skills.length === 0) {
        // Load skills from HTML
        document.querySelectorAll('#tecnologias .tag').forEach(tagEl => {
            const skill = tagEl.textContent.trim();
            if (skill) {
                portfolioInstance.data.skills.push(skill);
            }
        });
    }
    
    // Save loaded data
    if (portfolioInstance.data.experience.length > 0 || 
        portfolioInstance.data.education.length > 0 || 
        portfolioInstance.data.skills.length > 0) {
        portfolioInstance.saveData();
    }
}



/* ============================================
   GitHub Synchronization Functions
   ============================================ */

// GitHub Credentials Management
function saveGithubCredentials() {
    const username = document.getElementById('githubUsername').value.trim();
    const token = document.getElementById('githubToken').value.trim();
    const repoName = document.getElementById('repoName').value.trim();
    
    if (!username || !token || !repoName) {
        alert('⚠️ Por favor, preencha todos os campos (username, token, repositório)');
        return false;
    }
    
    // Save to localStorage
    localStorage.setItem('github_credentials', JSON.stringify({
        username: username,
        token: token,
        repo: repoName
    }));
    
    alert('✅ Credenciais guardadas com sucesso!');
    return true;
}

function loadGithubCredentials() {
    const stored = localStorage.getItem('github_credentials');
    if (stored) {
        const creds = JSON.parse(stored);
        document.getElementById('githubUsername').value = creds.username || '';
        document.getElementById('githubToken').value = creds.token || '';
        document.getElementById('repoName').value = creds.repo || 'SitePortifolio';
    }
}

// Show Status Messages
function showSyncStatus(message, type = 'loading') {
    const statusDiv = document.getElementById('syncStatus');
    statusDiv.className = `sync-status ${type}`;
    statusDiv.innerHTML = `<span>${message}</span>`;
}

function hideSyncStatus() {
    const statusDiv = document.getElementById('syncStatus');
    statusDiv.className = 'sync-status hidden';
}

// GitHub API: Sync Portfolio Data
async function syncWithGithub() {
    const creds = JSON.parse(localStorage.getItem('github_credentials') || '{}');
    
    if (!creds.username || !creds.token || !creds.repo) {
        showSyncStatus('❌ Credenciais GitHub não configuradas!', 'error');
        setTimeout(hideSyncStatus, 5000);
        return;
    }
    
    showSyncStatus('🔄 Sincronizando com GitHub...', 'loading');
    
    try {
        // Get current portfolio data
        const portfolioData = JSON.stringify(portfolio.data, null, 2);
        
        // GitHub API base
        const api = 'https://api.github.com';
        const auth = btoa(`${creds.username}:${creds.token}`);
        
        // Get default branch
        const repoResponse = await fetch(`${api}/repos/${creds.username}/${creds.repo}`, {
            headers: { 'Authorization': `Basic ${auth}` }
        });
        
        if (!repoResponse.ok) {
            throw new Error('Repositório não encontrado ou acesso negado');
        }
        
        const repoData = await repoResponse.json();
        const branch = repoData.default_branch;
        
        // Get latest commit SHA
        const refResponse = await fetch(
            `${api}/repos/${creds.username}/${creds.repo}/git/refs/heads/${branch}`,
            { headers: { 'Authorization': `Basic ${auth}` } }
        );
        
        if (!refResponse.ok) {
            throw new Error('Não foi possível obter a branch padrão');
        }
        
        const refData = await refResponse.json();
        const latestCommitSha = refData.object.sha;
        
        // Get current tree
        const commitResponse = await fetch(
            `${api}/repos/${creds.username}/${creds.repo}/git/commits/${latestCommitSha}`,
            { headers: { 'Authorization': `Basic ${auth}` } }
        );
        
        const commitData = await commitResponse.json();
        const baseTreeSha = commitData.tree.sha;
        
        // Create new blob for portfolio data
        const blobResponse = await fetch(
            `${api}/repos/${creds.username}/${creds.repo}/git/blobs`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: portfolioData,
                    encoding: 'utf-8'
                })
            }
        );
        
        const blobData = await blobResponse.json();
        
        // Create new tree
        const treeResponse = await fetch(
            `${api}/repos/${creds.username}/${creds.repo}/git/trees`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    base_tree: baseTreeSha,
                    tree: [
                        {
                            path: 'portfolio_data.json',
                            mode: '100644',
                            type: 'blob',
                            sha: blobData.sha
                        }
                    ]
                })
            }
        );
        
        const treeData = await treeResponse.json();
        
        // Create new commit
        const newCommitResponse = await fetch(
            `${api}/repos/${creds.username}/${creds.repo}/git/commits`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `📝 Portfolio sync - ${new Date().toLocaleString('pt-PT')}`,
                    tree: treeData.sha,
                    parents: [latestCommitSha]
                })
            }
        );
        
        const newCommitData = await newCommitResponse.json();
        
        // Update reference
        const updateRefResponse = await fetch(
            `${api}/repos/${creds.username}/${creds.repo}/git/refs/heads/${branch}`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sha: newCommitData.sha })
            }
        );
        
        if (!updateRefResponse.ok) {
            throw new Error('Não foi possível atualizar a branch');
        }
        
        showSyncStatus(`✅ Sincronizado com sucesso! Commit: ${newCommitData.sha.substring(0, 7)}`, 'success');
        setTimeout(hideSyncStatus, 5000);
        
    } catch (error) {
        showSyncStatus(`❌ Erro: ${error.message}`, 'error');
        setTimeout(hideSyncStatus, 5000);
        console.error('GitHub sync error:', error);
    }
}


// GitHub Tab Event Listeners
document.getElementById('saveGithubCredentials').addEventListener('click', saveGithubCredentials);
document.getElementById('syncGithubBtn').addEventListener('click', syncWithGithub);

// Load GitHub credentials when admin panel opens
document.getElementById('adminBtn').addEventListener('click', function() {
    // Load all tab data including GitHub credentials
    setTimeout(() => {
        loadGithubCredentials();
    }, 100);
});

