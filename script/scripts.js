async function loadComponents() {
    
    componentPathPrefix = '/portfolio/components/';

    const components = [
        { path: componentPathPrefix + 'navbar.html', targetId: 'navbar-placeholder' },
        { path: componentPathPrefix + 'sidebar.html', targetId: 'sidebar-placeholder' },
        { path: componentPathPrefix + 'index.html', targetId: 'index-placeholder' },
        { path: componentPathPrefix + 'about.html', targetId: 'about-placeholder' }
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

document.addEventListener('DOMContentLoaded', loadComponents);