function highlightActiveLink() {
}

async function loadComponents() {
    const componentPathPrefix = '/portfolio/components/';

    const components = [
        { path: componentPathPrefix + 'navBar.html', targetId: 'topBarPlaceholder' }
    ];

    for (const comp of components) {
        try {
            const response = await fetch(comp.path);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} for ${comp.path}`);
            }
            
            const html = await response.text();
            const placeholder = document.getElementById(comp.targetId);

            if (placeholder) {
                placeholder.innerHTML = html;
            } else {
                console.warn(`Placeholder element with ID "${comp.targetId}" not found in the DOM.`);
            }

        } catch (error) {
            console.error(`Could not load component from ${comp.path}:`, error);
        }
    }

    highlightActiveLink();

    const placeholder = document.getElementById('placeholder');

    if (placeholder) {
        placeholder.style.display = 'flex';
        placeholder.style.flexGrow = '1';
        placeholder.style.width = "100%";
    }
}

loadComponents();