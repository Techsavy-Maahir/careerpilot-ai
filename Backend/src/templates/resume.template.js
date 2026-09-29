function escapeHtml(value = "") {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
}

function renderContactLine({ phone, email, github, linkedin, location }) {
    const parts = []

    if (phone) parts.push(escapeHtml(phone))
    if (email) parts.push(escapeHtml(email))
    if (github) {
        parts.push(github.startsWith("http")
            ? `<a href="${escapeHtml(github)}">GitHub</a>`
            : "GitHub")
    }
    if (linkedin) {
        parts.push(linkedin.startsWith("http")
            ? `<a href="${escapeHtml(linkedin)}">LinkedIn</a>`
            : "LinkedIn")
    }
    if (location) parts.push(escapeHtml(location))

    return parts.join(" &bull; ")
}

function renderResumeHtml(resumeData) {
    const {
        name,
        phone,
        email,
        github,
        linkedin,
        location,
        professionalSummary,
        technicalSkills = [],
        projects = [],
        education = [],
        certifications = []
    } = resumeData

    const skillsHtml = technicalSkills.map(({ category, skills }) => `
        <p class="skill-line"><span class="skill-category">${escapeHtml(category)}:</span> ${escapeHtml(skills)}</p>
    `).join("")

    const projectsHtml = projects.map(({ name: projectName, techStack, githubLink, bullets = [] }) => `
        <div class="project">
            <p class="project-name">${escapeHtml(projectName)}</p>
            <p class="project-tech">${escapeHtml(techStack)}${githubLink ? ` | <a href="${escapeHtml(githubLink)}">GitHubLink</a>` : ""}</p>
            <ul>
                ${bullets.map(bullet => `<li>${escapeHtml(bullet)}</li>`).join("")}
            </ul>
        </div>
    `).join("")

    const educationHtml = education.map(({ institution, degree, details = [] }) => `
        <div class="education-item">
            <p class="education-institution">${escapeHtml(institution)}</p>
            <p class="education-degree">${escapeHtml(degree)}</p>
            <ul>
                ${details.map(detail => `<li>${escapeHtml(detail)}</li>`).join("")}
            </ul>
        </div>
    `).join("")

    const certificationsHtml = certifications.length
        ? `<ul>${certifications.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
        : ""

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>${escapeHtml(name)} - Resume</title>
    <style>
        * { box-sizing: border-box; }

        body {
            font-family: "Times New Roman", Times, serif;
            font-size: 11pt;
            color: #000;
            margin: 0;
            padding: 0;
            line-height: 1.35;
        }

        .resume {
            width: 100%;
            max-width: 100%;
        }

        .name {
            font-size: 16pt;
            font-weight: 700;
            margin: 0 0 4px 0;
        }

        .contact {
            font-size: 10pt;
            margin: 0 0 12px 0;
        }

        .contact a {
            color: #000;
            text-decoration: none;
        }

        .section-title {
            font-size: 11pt;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.3px;
            margin: 10px 0 6px 0;
            padding-bottom: 2px;
            border-bottom: 1px solid #000;
        }

        .summary {
            margin: 0 0 4px 0;
            text-align: justify;
        }

        .skill-line {
            margin: 2px 0;
        }

        .skill-category {
            font-weight: 700;
        }

        .project {
            margin-bottom: 8px;
        }

        .project-name {
            font-weight: 700;
            margin: 0 0 2px 0;
        }

        .project-tech {
            font-size: 10pt;
            margin: 0 0 4px 0;
        }

        .project-tech a {
            color: #000;
            text-decoration: none;
        }

        .education-item {
            margin-bottom: 8px;
        }

        .education-institution {
            font-weight: 700;
            margin: 0 0 2px 0;
        }

        .education-degree {
            margin: 0 0 4px 0;
        }

        ul {
            margin: 0 0 6px 0;
            padding-left: 18px;
        }

        li {
            margin-bottom: 2px;
        }
    </style>
</head>
<body>
    <div class="resume">
        <h1 class="name">${escapeHtml(name)}</h1>
        <p class="contact">${renderContactLine({ phone, email, github, linkedin, location })}</p>

        <h2 class="section-title">Professional Summary</h2>
        <p class="summary">${escapeHtml(professionalSummary)}</p>

        <h2 class="section-title">Technical Skills</h2>
        ${skillsHtml}

        <h2 class="section-title">Projects</h2>
        ${projectsHtml}

        <h2 class="section-title">Education</h2>
        ${educationHtml}

        <h2 class="section-title">Certifications &amp; Achievements</h2>
        ${certificationsHtml}
    </div>
</body>
</html>`
}

module.exports = { renderResumeHtml }
