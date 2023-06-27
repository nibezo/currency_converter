document.addEventListener("DOMContentLoaded", function () {
	function convertCurrency(from, to, amount, callback) {
		const url = `https://api.exchangerate-api.com/v4/latest/${from}`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				const rate = data.rates[to];
				const result = (amount * rate).toFixed(2);
				callback(result);
			})
			.catch((error) => {
				console.error("An error occurred:", error);
				callback(null);
			});
	}

	function loadExchangeRates() {
		// USD to AMD
		convertCurrency("USD", "AMD", 1, function (result) {
			document.getElementById("result-usd-amd").innerHTML = result
				? `1 USD = <b>${result}</b> AMD`
				: "Error loading exchange rates";
		});

		// USD to RUB
		convertCurrency("USD", "RUB", 1, function (result) {
			document.getElementById("result-usd-rub").innerHTML = result
				? `1 USD = <b>${result}</b> RUB`
				: "Error loading exchange rates";
		});

		// RUB to AMD
		convertCurrency("RUB", "AMD", 1, function (result) {
			document.getElementById("result-rub-amd").innerHTML = result
				? `1 RUB = <b>${result}</b> AMD`
				: "Error loading exchange rates";
		});
	}

	// Load exchange rates on page load
	loadExchangeRates();

	document
		.getElementById("convert-usd-amd")
		.addEventListener("click", function () {
			const amount = parseFloat(document.getElementById("usd-amd").value);
			convertCurrency("USD", "AMD", amount, function (result) {
				document.getElementById("result-usd-amd").innerHTML = result
					? `Result: <b>${result}</b> AMD`
					: "Error converting currency";
			});
		});

	document
		.getElementById("convert-usd-rub")
		.addEventListener("click", function () {
			const amount = parseFloat(document.getElementById("usd-rub").value);
			convertCurrency("USD", "RUB", amount, function (result) {
				document.getElementById("result-usd-rub").innerHTML = result
					? `Result: <b>${result}</b> RUB`
					: "Error converting currency";
			});
		});

	document
		.getElementById("convert-rub-amd")
		.addEventListener("click", function () {
			const amount = parseFloat(document.getElementById("rub-amd").value);
			convertCurrency("RUB", "AMD", amount, function (result) {
				document.getElementById("result-rub-amd").innerHTML = result
					? `Result: <b>${result}</b> AMD`
					: "Error converting currency";
			});
		});
});
