/**
 * Loads and injects HTML components from their static files.
 * It also handles setting the 'active' link in the sidebar.
 */


async function loadComponents() {
    // 1. Define paths and target IDs

    let path = "../components/";
    const components = [
        { path: (path,'navbar.html'), targetId: 'navbar-placeholder' },
        { path: (path,'sidebar.html'), targetId: 'sidebar-placeholder' }
    ];

    // 2. Fetch and inject all components asynchronously
    for (const comp of components) {
        try {
            const response = await fetch(comp.path);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            document.getElementById(comp.targetId).innerHTML = html;
        } catch (error) {
            console.error(`Could not load ${comp.path}:`, error);
        }
    }

    // 3. Highlight the active link after injection
    highlightActiveLink();
}

/**
 * Finds the current page's file name and adds the 'active' class to the corresponding sidebar link.
 */
function highlightActiveLink() {
    const currentPath = window.location.pathname;
    // Extract the page filename (e.g., '/index.html', '/about.html')
    const fileName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html'; 

    // Determine the corresponding link ID (e.g., 'index.html' -> 'link-index')
    const linkId = `link-${fileName.replace('.html', '')}`;
    
    // Find the link and set the 'active' class
    const activeLink = document.getElementById(linkId);
    if (activeLink) {
        activeLink.classList.add('active');
    } else {
        // Fallback for root path ('/') which usually leads to index.html
        document.getElementById('link-index')?.classList.add('active');
    }
}

// Start the process once the page structure is ready
document.addEventListener('DOMContentLoaded', loadComponents);