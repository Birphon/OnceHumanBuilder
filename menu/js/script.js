document.addEventListener("DOMContentLoaded", () => {
	const foodInfo = document.getElementById("food-info");

	fetch("json/foods.json")
		.then((response) => response.json())
		.then((data) => {
			const { ingredients, foods } = data;

			foods.forEach((food) => {
				const foodItem = document.createElement("div");
				foodItem.className = "food-item";

				const foodName = document.createElement("h2");
				foodName.textContent = food.Name;
				foodItem.appendChild(foodName);

				const details = document.createElement("div");
				details.className = "details";

				for (const key in food.Cost) {
					if (food.Cost.hasOwnProperty(key)) {
						const detail = document.createElement("div");
						const ingredientType = key;
						const ingredientAmount = food.Cost[key];

						switch (ingredientType) {
							case "meat":
								const meatSelect = createDropdown(
									ingredients.meat,
									ingredientAmount,
									details
								);
								detail.appendChild(meatSelect);
								break;
							case "flower":
								const flowerSelect = createDropdown(
									ingredients.flower,
									ingredientAmount,
									details
								);
								detail.appendChild(flowerSelect);
								break;
							case "deviated flower":
								const deviatedFlowerSelect = createDropdown(
									ingredients["deviated flower"],
									ingredientAmount,
									details
								);
								detail.appendChild(deviatedFlowerSelect);
								break;
							case "fish":
								const fishSelect = createDropdown(
									ingredients.fish,
									ingredientAmount,
									details
								);
								detail.appendChild(fishSelect);
								break;
							default:
								detail.textContent = `${ingredientType} - ${ingredientAmount}`;
						}
						details.appendChild(detail);
					}
				}

				for (const key in food.Survival) {
					if (food.Survival.hasOwnProperty(key)) {
						const detail = document.createElement("div");
						detail.textContent = `${key}: ${food.Survival[key]}`;
						details.appendChild(detail);
					}
				}

				for (const key in food.Effect) {
					if (food.Effect.hasOwnProperty(key)) {
						const detail = document.createElement("div");
						detail.textContent = `${key}: ${food.Effect[key]}`;
						details.appendChild(detail);
					}
				}

				if (food["Spoil Timer"] !== null) {
					const spoilTimer = document.createElement("p");
					spoilTimer.textContent = `Spoil Timer: ${food["Spoil Timer"]} hours`;
					details.appendChild(spoilTimer);
				}

				const duration = document.createElement("p");
				duration.textContent = `Duration: ${food.Duration} seconds`;
				details.appendChild(duration);

				foodItem.appendChild(details);
				foodInfo.appendChild(foodItem);
			});
		});

	function createDropdown(items, amount, details) {
		const select = document.createElement("select");
		items.forEach((item) => {
			const option = document.createElement("option");
			option.value = JSON.stringify(item.Effect);
			option.textContent = item.Name;
			select.appendChild(option);
		});

		const detail = document.createElement("div");
		detail.appendChild(select);

		const selectedItem = document.createElement("p");
		selectedItem.textContent = `${
			select.options[select.selectedIndex].text
		} - ${amount}`;
		detail.appendChild(selectedItem);

		select.addEventListener("change", () => {
			const effect = JSON.parse(select.value);
			selectedItem.textContent = `${
				select.options[select.selectedIndex].text
			} - ${amount}`;
			appendEffect(details, effect);
		});

		return detail;
	}

	function appendEffect(details, effect) {
		const effectText = Object.keys(effect)
			.map((key) => `${key}: ${effect[key]}`)
			.join(", ");
		const detail = document.createElement("div");
		detail.textContent = `Selected Effect: ${effectText}`;
		details.appendChild(detail);
	}
});
