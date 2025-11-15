function debuggingMode () {
    const isDebugging = false; // CHANGE TO FALSE BEFORE PRODUCTION RELEASE
    let componentPathPrefix = '';

    if (isDebugging) {
        componentPathPrefix = '/components/';
    } else {
        componentPathPrefix = '/portfolio/components/';
    }

    return componentPathPrefix;
}


async function loadComponents() {
    
    const componentPathPrefix = debuggingMode();
    console.log(componentPathPrefix);
    // 1. Define paths and target IDs

    const components = [
        { path: componentPathPrefix + 'navbar.html', targetId: 'navbar-placeholder' },
        { path: componentPathPrefix + 'sidebar.html', targetId: 'sidebar-placeholder' },
        { path: componentPathPrefix + 'index.html', targetId: 'index-placeholder' },
        { path: componentPathPrefix + 'about.html', targetId: 'about-placeholder' }
    ];

    // 2. Fetch and inject all components asynchronously
    for (const comp of components) {
        // Find the target element
        const targetElement = document.getElementById(comp.targetId);

        // Check if the element exists on the current page
        if (targetElement) { 
            try {
                const response = await fetch(comp.path);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const html = await response.text();
                // Inject into the found element
                targetElement.innerHTML = html;
            } catch (error) {
                // The error message will now only show for actual loading errors
                console.error(`Could not load ${comp.path}:`, error);
            }
        }
    }

    // 3. Highlight the active link after injection
    highlightActiveLink();
    toggleSidebar();
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

// Sidebar toggle functionality

/**
 * 
 * 
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar-placeholder');
    const hamburgerButton = document.getElementById('hamburger');

    
    hamburgerButton.addEventListener('click', () => {
        if (sidebar.classList.contains('sidebar-close')) {
            sidebar.classList.remove('sidebar-close');
            sidebar.classList.add('sidebar-open');
            sidebar.style.display = 'flex';
        } else {
            sidebar.classList.remove('sidebar-open');
            sidebar.classList.add('sidebar-close');
            sidebar.style.display = 'none';
        }
    });
}
 * 
 */

// FIX NEED TO ALSO OPEN SIDEBAR WITH TRANSITION

function toggleSidebar() {
    const sidebarContainer = document.getElementById('sidebar-placeholder');
    const hamburgerBtn = document.getElementById('hamburger');
    const hamburgerIcon = document.getElementById('hamburger-icon');

    if (sidebarContainer && hamburgerBtn) {
        
        // This line ensures the sidebar starts with the "opened" style
        // after loadComponents has run.
        sidebarContainer.classList.add('sidebar-closed');
        
        hamburgerBtn.addEventListener('click', () => {
            // Check if the sidebar is currently closed
            if (sidebarContainer.classList.contains('sidebar-closed')) {
                // OPENING: Remove closed, add opened, which triggers the slideRight animation
                sidebarContainer.classList.remove('sidebar-closed');
                sidebarContainer.classList.add('sidebar-opened');
                hamburgerIcon.className = "fas fa-chevron-left";
            } else {
                // CLOSING: Remove opened, add closed, which triggers the sidebarSlideRight animation
                sidebarContainer.classList.remove('sidebar-opened');
                sidebarContainer.classList.add('sidebar-closed');
                hamburgerIcon.className = "fas fa-bars";
            }
        });
    }
    

}

// Start the process once the page structure is ready
document.addEventListener('DOMContentLoaded', loadComponents);