document.addEventListener('DOMContentLoaded', function () {
    const baseAddressData = {
        "13802 Heritage Club Drive": {
            leasingSavings: 6000,
            cashPurchaseSavings: 18000,
            financedPurchaseSavings: 15000,
            outOfPocketCost: 2500,
            upfrontCost: 21000,
            maxArrayAreaMeters2: 120,
            areaMeters2: [50, 40, 30]
        },
        "15501 Bruce B Downs Blvd": {
            leasingSavings: 5500,
            cashPurchaseSavings: 17000,
            financedPurchaseSavings: 14000,
            outOfPocketCost: 2800,
            upfrontCost: 22000,
            maxArrayAreaMeters2: 115,
            areaMeters2: [45, 35, 25]
        }
    };

    const addressSelect = document.getElementById('addressSelect');
    const electricityBillSlider = document.getElementById('electricityBill');
    const billDisplay = document.getElementById('billDisplay');
    const metricsList = document.getElementById('metricsList');
    const saveQuoteButton = document.getElementById('saveQuoteButton');
    const savedQuotesList = document.getElementById('savedQuotesList');

    let savedQuotes = [];
    let purchaseOptionsChart, monthlySavingsChart, roofAreaChart;

    function updateBillDisplay() {
        const billValue = parseFloat(electricityBillSlider.value);
        billDisplay.textContent = `$${billValue}`;
        updateMetrics(addressSelect.value, billValue);
    }

    function updateMetrics(address, billValue) {
        const baseData = baseAddressData[address];
        const data = {
            leasingSavings: baseData.leasingSavings + billValue * 0.2,
            cashPurchaseSavings: baseData.cashPurchaseSavings + billValue * 0.4,
            financedPurchaseSavings: baseData.financedPurchaseSavings + billValue * 0.3,
            outOfPocketCost: baseData.outOfPocketCost + billValue * 0.1,
            upfrontCost: baseData.upfrontCost + billValue * 0.5,
            monthlySavings: Array(6).fill().map((_, i) => billValue * (0.3 + 0.05 * i)),
            maxArrayAreaMeters2: baseData.maxArrayAreaMeters2 + billValue * 0.1,
            areaMeters2: baseData.areaMeters2.map(area => area + billValue * 0.05)
        };

        metricsList.innerHTML = `
            <li>Leasing Savings: $${data.leasingSavings.toFixed(2)}</li>
            <li>Cash Purchase Savings: $${data.cashPurchaseSavings.toFixed(2)}</li>
            <li>Financed Purchase Savings: $${data.financedPurchaseSavings.toFixed(2)}</li>
            <li>Out-of-Pocket Cost: $${data.outOfPocketCost.toFixed(2)}</li>
            <li>Upfront Cost: $${data.upfrontCost.toFixed(2)}</li>
        `;

        renderCharts(data);
    }

    function renderCharts(data) {
        const purchaseOptionsCtx = document.getElementById('purchaseOptionsChart').getContext('2d');
        if (purchaseOptionsChart) purchaseOptionsChart.destroy();
        purchaseOptionsChart = new Chart(purchaseOptionsCtx, {
            type: 'bar',
            data: {
                labels: ['Leasing', 'Cash Purchase', 'Financed Purchase'],
                datasets: [{
                    label: 'Total Savings ($)',
                    data: [data.leasingSavings, data.cashPurchaseSavings, data.financedPurchaseSavings],
                    backgroundColor: 'rgba(75, 192, 192, 0.7)'
                }, {
                    label: 'Out-of-Pocket Cost ($)',
                    data: [data.outOfPocketCost, data.upfrontCost, data.upfrontCost],
                    backgroundColor: 'rgba(255, 159, 64, 0.7)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Cost ($)' } }
                },
                plugins: { legend: { position: 'top' } }
            }
        });

        const monthlySavingsCtx = document.getElementById('monthlySavingsChart').getContext('2d');
        if (monthlySavingsChart) monthlySavingsChart.destroy();
        monthlySavingsChart = new Chart(monthlySavingsCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Monthly Savings ($)',
                    data: data.monthlySavings,
                    backgroundColor: 'rgba(54, 162, 235, 0.7)'
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Savings ($)' } } },
                plugins: { legend: { position: 'top' } }
            }
        });

        const roofAreaCtx = document.getElementById('roofAreaChart').getContext('2d');
        if (roofAreaChart) roofAreaChart.destroy();
        roofAreaChart = new Chart(roofAreaCtx, {
            type: 'bar',
            data: {
                labels: ['Segment 1', 'Segment 2', 'Segment 3'],
                datasets: [{
                    label: 'Roof Usable Area (m²)',
                    data: data.areaMeters2,
                    backgroundColor: 'rgba(153, 102, 255, 0.7)'
                }, {
                    label: 'Maximum Array Area (m²)',
                    data: [data.maxArrayAreaMeters2, data.maxArrayAreaMeters2, data.maxArrayAreaMeters2],
                    backgroundColor: 'rgba(255, 99, 132, 0.7)'
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Area (m²)' } } },
                plugins: { legend: { position: 'top' } }
            }
        });
    }

    function displaySavedQuotes() {
        savedQuotesList.innerHTML = ''; // Clear previous list items
        savedQuotes.forEach((quote, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${quote.address}</strong> - Bill: $${quote.billValue}
                <select id="optionSelect${index}">
                    <option value="Lease" ${quote.option === "Lease" ? "selected" : ""}>Lease</option>
                    <option value="Buy" ${quote.option === "Buy" ? "selected" : ""}>Buy</option>
                    <option value="Finance" ${quote.option === "Finance" ? "selected" : ""}>Finance</option>
                </select>
                <button onclick="saveEdit(${index})">Save</button>
                <button onclick="deleteQuote(${index})">Delete</button>
                <button onclick="placeOrder(${index})">Place Order</button>
                <ul>
                    <li>Leasing Savings: $${quote.metrics.leasingSavings.toFixed(2)}</li>
                    <li>Cash Purchase Savings: $${quote.metrics.cashPurchaseSavings.toFixed(2)}</li>
                    <li>Financed Purchase Savings: $${quote.metrics.financedPurchaseSavings.toFixed(2)}</li>
                    <li>Out-of-Pocket Cost: $${quote.metrics.outOfPocketCost.toFixed(2)}</li>
                    <li>Upfront Cost: $${quote.metrics.upfrontCost.toFixed(2)}</li>
                </ul>
            `;
            savedQuotesList.appendChild(li);
        });
    }

    // Place Order Function
    window.placeOrder = function (index) {
        const quote = savedQuotes[index];
        alert(`Order placed for address: ${quote.address} with the financing option: ${quote.option}`);
    };

    // Save edited quote (for financing option only)
    window.saveEdit = function (index) {
        const optionSelect = document.getElementById(`optionSelect${index}`);
        const selectedOption = optionSelect.value;
        const address = savedQuotes[index].address;
        const billValue = savedQuotes[index].billValue;

        const updatedMetrics = {
            leasingSavings: baseAddressData[address].leasingSavings + billValue * 0.2,
            cashPurchaseSavings: baseAddressData[address].cashPurchaseSavings + billValue * 0.4,
            financedPurchaseSavings: baseAddressData[address].financedPurchaseSavings + billValue * 0.3,
            outOfPocketCost: baseAddressData[address].outOfPocketCost + billValue * 0.1,
            upfrontCost: baseAddressData[address].upfrontCost + billValue * 0.5
        };

        savedQuotes[index] = {
            address,
            billValue,
            option: selectedOption,
            metrics: updatedMetrics
        };

        displaySavedQuotes(); // Refresh the displayed list with updated values
    };

    // Delete a saved quote from memory and refresh display
    window.deleteQuote = function (index) {
        savedQuotes.splice(index, 1); // Remove the selected quote
        displaySavedQuotes(); // Refresh the list display
    };

    // Save a new quote with current values
    saveQuoteButton.addEventListener('click', function () {
        const address = addressSelect.value;
        const billValue = parseFloat(electricityBillSlider.value);

        const quote = {
            address,
            billValue,
            option: "Lease", // Default option, can be changed later
            metrics: {
                leasingSavings: baseAddressData[address].leasingSavings + billValue * 0.2,
                cashPurchaseSavings: baseAddressData[address].cashPurchaseSavings + billValue * 0.4,
                financedPurchaseSavings: baseAddressData[address].financedPurchaseSavings + billValue * 0.3,
                outOfPocketCost: baseAddressData[address].outOfPocketCost + billValue * 0.1,
                upfrontCost: baseAddressData[address].upfrontCost + billValue * 0.5
            }
        };

        savedQuotes.push(quote); // Add to in-memory array
        alert("Quote saved successfully!");
        displaySavedQuotes(); // Display updated list
    });

    addressSelect.addEventListener('change', updateBillDisplay);
    electricityBillSlider.addEventListener('input', updateBillDisplay);
    updateBillDisplay(); // Initialize with default values
    displaySavedQuotes(); // Display saved quotes at page load
});
