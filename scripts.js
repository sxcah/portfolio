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
}

document.addEventListener('DOMContentLoaded', loadComponents);