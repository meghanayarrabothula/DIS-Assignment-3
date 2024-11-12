document.addEventListener('DOMContentLoaded', function () {
    const addressInput = document.getElementById('addressInput');
    const calculateSolarButton = document.getElementById('calculateSolar');
    const estimateSection = document.getElementById('estimateSection');
    const savedQuotesList = document.getElementById('savedQuotesList');
    let currentData = {};

    const baseAddressData = {
        "13802 Heritage Club Drive": {
            leasingSavings: 6000,
            cashPurchaseSavings: 18000,
            financedPurchaseSavings: 15000,
            outOfPocketCost: 2500,
            upfrontCost: 21000
        },
        "15501 Bruce B Downs Blvd": {
            leasingSavings: 5500,
            cashPurchaseSavings: 17000,
            financedPurchaseSavings: 14000,
            outOfPocketCost: 2800,
            upfrontCost: 22000
        }
    };

    function displayMetrics(data, billValue = 100) {
        estimateSection.innerHTML = `
            <h3>Financial Metrics</h3>
            <ul id="metricsList">
                <li id="leasingSavings">Leasing Savings: $${(data.leasingSavings + billValue * 0.2).toFixed(2)}</li>
                <li id="cashPurchaseSavings">Cash Purchase Savings: $${(data.cashPurchaseSavings + billValue * 0.4).toFixed(2)}</li>
                <li id="financedPurchaseSavings">Financed Purchase Savings: $${(data.financedPurchaseSavings + billValue * 0.3).toFixed(2)}</li>
                <li id="outOfPocketCost">Out-of-Pocket Cost: $${(data.outOfPocketCost + billValue * 0.1).toFixed(2)}</li>
                <li id="upfrontCost">Upfront Cost: $${(data.upfrontCost + billValue * 0.5).toFixed(2)}</li>
            </ul>
            <label for="electricityBill">Adjust Electricity Bill:</label>
            <input type="range" id="electricityBill" min="0" max="1000" value="${billValue}">
            <span id="billDisplay">$${billValue}</span>
            <button id="saveQuoteButton" class="hover-btn">Save Quote</button>
            <button id="estimationAnalyticsButton" class="hover-btn">Estimation Analytics</button>
        `;

        document.getElementById('saveQuoteButton').addEventListener('click', saveQuote);
        document.getElementById('estimationAnalyticsButton').addEventListener('click', () => {
            window.location.href = 'analytics.html';
        });

        // Smooth slider functionality with a direct update to metric elements
        const electricityBillSlider = document.getElementById('electricityBill');
        electricityBillSlider.addEventListener('input', function () {
            const updatedBillValue = parseFloat(this.value);
            document.getElementById('billDisplay').textContent = `$${updatedBillValue}`;
            updateMetricValues(updatedBillValue);
        });
    }

    function updateMetricValues(billValue) {
        document.getElementById('leasingSavings').textContent = `Leasing Savings: $${(currentData.leasingSavings + billValue * 0.2).toFixed(2)}`;
        document.getElementById('cashPurchaseSavings').textContent = `Cash Purchase Savings: $${(currentData.cashPurchaseSavings + billValue * 0.4).toFixed(2)}`;
        document.getElementById('financedPurchaseSavings').textContent = `Financed Purchase Savings: $${(currentData.financedPurchaseSavings + billValue * 0.3).toFixed(2)}`;
        document.getElementById('outOfPocketCost').textContent = `Out-of-Pocket Cost: $${(currentData.outOfPocketCost + billValue * 0.1).toFixed(2)}`;
        document.getElementById('upfrontCost').textContent = `Upfront Cost: $${(currentData.upfrontCost + billValue * 0.5).toFixed(2)}`;
    }

    calculateSolarButton.addEventListener('click', function () {
        const enteredAddress = addressInput.value.trim();
        if (!enteredAddress) {
            alert("Please enter an address.");
            return;
        }

        currentData = baseAddressData[enteredAddress] || {
            leasingSavings: 5000,
            cashPurchaseSavings: 15000,
            financedPurchaseSavings: 13000,
            outOfPocketCost: 2000,
            upfrontCost: 19000
        };

        displayMetrics(currentData);
    });

    function saveQuote() {
        const address = addressInput.value.trim();
        if (!address) {
            alert("Please enter an address and calculate the estimate first.");
            return;
        }

        const metricsList = document.getElementById('metricsList').innerHTML;
        const quoteItem = document.createElement('li');
        quoteItem.innerHTML = `
            <strong>${address}</strong>
            <ul>${metricsList}</ul>
            <button class="hover-btn" onclick="editQuote('${address}')">Edit</button>
            <button class="hover-btn" onclick="deleteQuote(this)">Delete</button>
            <button class="hover-btn" onclick="placeOrder('${address}')">Place Order</button>
        `;
        savedQuotesList.appendChild(quoteItem);
    }

    window.deleteQuote = function(button) {
        button.parentElement.remove();
    };

    window.editQuote = function(address) {
        addressInput.value = address;
        const data = baseAddressData[address] || {
            leasingSavings: 5000,
            cashPurchaseSavings: 15000,
            financedPurchaseSavings: 13000,
            outOfPocketCost: 2000,
            upfrontCost: 19000
        };
        currentData = data;
        displayMetrics(currentData);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.placeOrder = function(address) {
        alert(`Order placed for: ${address}`);
    };
});
