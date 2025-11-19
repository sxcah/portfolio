// Function placeholder for post-injection UI logic.
// This function is typically used to handle tasks that require components to be loaded,
// such as highlighting the active navigation link based on the current page URL.
function highlightActiveLink() {
    console.log('Active Page to be added')
}

/**
 * Loads defined HTML components asynchronously into their respective placeholders.
 * The function uses async/await for robust, sequential loading of components.
 */
async function loadComponents() {
    // 1. Get the component path prefix
    const componentPathPrefix = '/portfolio/components/';

    // 2. Define components to load: path is the file location, targetId is the element ID in index.html
    const components = [
        // SYNTAX: { path: '<prefix> + <filename>', targetId: '<id>' }
        { path: componentPathPrefix + 'navBar.html', targetId: 'topBarPlaceholder' },
    ];

    // 3. Iterate through the components, fetch the HTML, and inject it into the DOM
    for (const comp of components) {
        try {
            // Fetch the component HTML file
            const response = await fetch(comp.path);
            
            // Check for a non-success HTTP status code
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} for ${comp.path}`);
            }
            
            // Get the HTML content as text
            const html = await response.text();
            
            // Find the target placeholder element
            const placeholder = document.getElementById(comp.targetId);

            // Inject the HTML if the placeholder exists
            if (placeholder) {
                placeholder.innerHTML = html;
            } else {
                // Log a warning if the placeholder is missing, but continue execution
                console.warn(`Placeholder element with ID "${comp.targetId}" not found in the DOM.`);
            }

        } catch (error) {
            // Log an error if the fetch operation or injection fails
            console.error(`Could not load component from ${comp.path}:`, error);
        }
    }

    // 4. Run post-injection setup tasks
    highlightActiveLink();
}

// Start the component initialization process when the script runs
loadComponents();