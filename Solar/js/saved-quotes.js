document.addEventListener('DOMContentLoaded', function () {
    const savedQuotesList = document.getElementById('savedQuotesList');
    let savedQuotes = JSON.parse(localStorage.getItem('savedQuotes')) || [];

    function displaySavedQuotes() {
        savedQuotesList.innerHTML = '';
        savedQuotes.forEach(quote => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${quote.address}</strong> - Bill: $${quote.billValue} 
                <button onclick="editQuote(${quote.id})">Edit</button>
                <button onclick="deleteQuote(${quote.id})">Delete</button>
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

    window.editQuote = function (id) {
        const quote = savedQuotes.find(q => q.id === id);
        if (quote) {
            localStorage.setItem('editQuote', JSON.stringify(quote));
            window.location.href = 'results.html';
        }
    };

    window.deleteQuote = function (id) {
        savedQuotes = savedQuotes.filter(q => q.id !== id);
        localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes));
        displaySavedQuotes();
    };

    displaySavedQuotes();
});
