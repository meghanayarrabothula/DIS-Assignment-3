function saveQuote() {
    const address = document.getElementById('addressSelect').value;
    const billValue = parseFloat(document.getElementById('electricityBill').value);
    const metricsList = document.getElementById('metricsList').innerHTML;

    const savedQuoteHTML = `
        <h2>Saved Quotes</h2>
        <ul id="savedQuotesList">
            <li><strong>${address}</strong> - Bill: $${billValue}
                <select id="optionSelect">
                    <option value="Lease">Lease</option>
                    <option value="Buy">Buy</option>
                    <option value="Finance">Finance</option>
                </select>
                <button onclick="editQuote()">Edit</button>
                <button onclick="deleteQuote()">Delete</button>
                <button onclick="placeOrder()">Place Order</button>
                <ul>${metricsList}</ul>
            </li>
        </ul>
    `;

    document.getElementById('estimateSection').innerHTML += savedQuoteHTML;
}

function editQuote() {
    alert("Edit functionality to be implemented");
}

function deleteQuote() {
    document.getElementById('savedQuotesList').innerHTML = ''; // Clears the saved quote display
}

function placeOrder() {
    alert("Order placed successfully.");
}
