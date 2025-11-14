const hamburgerButton = document.getElementById("hamburger");

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar-placeholder");

    if (sidebar) {
        sidebar.classList.toggle("sidebar-visible");
    }
}

hamburgerButton.addEventListener("click", toggleSidebar);