async function loadComponents() {
    let componentPathPrefix = '/portfolio/components/';
    const components = [
        { path: componentPathPrefix + 'topbar.html', targetId: 'topbar-placeholder' },
        { path: componentPathPrefix + 'sidebar.html', targetId: 'sidebar-placeholder' },
        { path: componentPathPrefix + 'index.html', targetId: 'index-placeholder' }
    ];

    for (const comp of components) {
        const targetElement = document.getElementById(comp.targetId);

        if (targetElement) { 
            try {
                const response = await fetch(comp.path);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const html = await response.text();
                targetElement.innerHTML = html;
            } catch (error) {
                console.error(`Could not load ${comp.path}:`, error);
            }
        }
    }
    contactMeToggle();
    highlightActiveLink();
}

function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const fileName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html'; 
    const linkId = `link-${fileName.replace('.html', '')}`;
    const activeLink = document.getElementById(linkId);

    if (activeLink) {
        activeLink.classList.add('active');
    } else {
        document.getElementById('link-index')?.classList.add('active');
    }
}

function contactMeToggle() {
    const contactBlock = document.getElementById('contact-me');
    const contactIcon = document.getElementById('contact-icon');

    if (!contactIcon) {
        console.error("Element with ID 'contact-icon' not found.");
        return;
    }

    if (!contactBlock) {
        console.error("Element with ID 'contact-me' not found.");
        return;
    }
    
    contactIcon.addEventListener('mouseenter', () => {
        contactBlock.classList.add('show');
    });

    void contactBlock.offsetWidth;

    contactIcon.addEventListener('mouseleave', () => {
        contactBlock.classList.remove('hide');
    });
}

document.addEventListener('DOMContentLoaded', loadComponents);