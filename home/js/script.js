document.addEventListener("DOMContentLoaded", () => {
	const darkModeToggle = document.getElementById("darkModeToggle");

	// Check if dark mode was previously enabled
	if (localStorage.getItem("dark-mode") === "enabled") {
		document.body.classList.add("dark-mode");
		darkModeToggle.textContent = "🌞";
	}

	darkModeToggle.addEventListener("click", () => {
		if (document.body.classList.contains("dark-mode")) {
			document.body.classList.remove("dark-mode");
			localStorage.setItem("dark-mode", "disabled");
			darkModeToggle.textContent = "🌙"; // Moon icon
		} else {
			document.body.classList.add("dark-mode");
			localStorage.setItem("dark-mode", "enabled");
			darkModeToggle.textContent = "🌞"; // Sun icon
		}
	});
});
