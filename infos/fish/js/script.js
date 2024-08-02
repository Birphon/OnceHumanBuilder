document.addEventListener("DOMContentLoaded", function () {
	let selectedCount = 0;

	// Load the JSON file
	fetch("json/fish.json")
		.then((response) => response.json())
		.then((data) => {
			populateLocations(data);
			populateFishCards(data);
			loadCheckboxState(); // Load checkbox states from localStorage
		})
		.catch((error) => console.error("Error loading JSON:", error));

	function populateLocations(data) {
		// Freshwater Locations
		const fwLocContainer = document.getElementById("freshwater-locations");
		fwLocContainer.innerHTML = "<h2>Freshwater Locations</h2>";
		data.Location.Freshwater.forEach((location) => {
			const div = document.createElement("div");
			div.textContent = location;
			fwLocContainer.appendChild(div);
		});

		// Saltwater Locations
		const swLocContainer = document.getElementById("saltwater-locations");
		swLocContainer.innerHTML = "<h2>Saltwater Locations</h2>";
		data.Location.Saltwater.forEach((location) => {
			const div = document.createElement("div");
			div.textContent = location;
			swLocContainer.appendChild(div);
		});

		// Event Locations
		const eventLocContainer = document.getElementById("event-locations");
		eventLocContainer.innerHTML = "<h2>Event Locations</h2>";
		data.Location.EventLoc.forEach((location) => {
			const div = document.createElement("div");
			div.textContent = location;
			eventLocContainer.appendChild(div);
		});
	}

	function populateFishCards(data) {
		function createCard(fishName) {
			const card = document.createElement("div");
			card.className = "card";
			card.innerHTML = `
                <input type="checkbox" class="fish-checkbox">
                <span>${fishName}</span>
            `;
			card.addEventListener("click", function () {
				const checkbox = card.querySelector(".fish-checkbox");
				checkbox.checked = !checkbox.checked;
				updateSelectedCount();
				saveCheckboxState(); // Save the checkbox state to localStorage
			});
			return card;
		}

		// Freshwater Fish
		const fwFishContainer = document.getElementById("freshwater-fish");
		fwFishContainer.innerHTML = "<h2>Freshwater Fish</h2>";
		data.Fresh.Name.forEach((fish) => {
			const card = createCard(fish);
			fwFishContainer.appendChild(card);
		});

		// Saltwater Fish
		const swFishContainer = document.getElementById("saltwater-fish");
		swFishContainer.innerHTML = "<h2>Saltwater Fish</h2>";
		data.Salt.Name.forEach((fish) => {
			const card = createCard(fish);
			swFishContainer.appendChild(card);
		});

		// Event Fish
		const eventFishContainer = document.getElementById("event-fish");
		eventFishContainer.innerHTML = "<h2>Event Fish</h2>";
		data.Event.Name.forEach((fish) => {
			const card = createCard(fish);
			eventFishContainer.appendChild(card);
		});
	}

	function updateSelectedCount() {
		selectedCount = document.querySelectorAll(
			".fish-checkbox:checked"
		).length;
		document.getElementById(
			"fish-counter"
		).textContent = `Fish Selected: ${selectedCount}`;
	}

	function saveCheckboxState() {
		const checkboxes = document.querySelectorAll(".fish-checkbox");
		const states = Array.from(checkboxes).map(
			(checkbox) => checkbox.checked
		);
		localStorage.setItem("checkboxStates", JSON.stringify(states));
	}

	function loadCheckboxState() {
		const states = JSON.parse(
			localStorage.getItem("checkboxStates") || "[]"
		);
		const checkboxes = document.querySelectorAll(".fish-checkbox");
		checkboxes.forEach((checkbox, index) => {
			if (index < states.length) {
				checkbox.checked = states[index];
			}
		});
		updateSelectedCount();
	}

	// Dark Mode Toggle Button
	const darkModeButton = document.getElementById("dark-mode-button");
	darkModeButton.addEventListener("click", function () {
		const isDarkMode = document.body.classList.toggle("dark-mode");
		darkModeButton.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
		localStorage.setItem("dark-mode", isDarkMode);
	});

	// Load dark mode preference from localStorage
	if (localStorage.getItem("dark-mode") === "true") {
		document.body.classList.add("dark-mode");
		darkModeButton.textContent = "Light Mode";
	} else {
		darkModeButton.textContent = "Dark Mode";
	}
});
