document.addEventListener('DOMContentLoaded', function () {
    const addressInput = document.getElementById('addressInput');
    const calculateSolarButton = document.getElementById('calculateSolar');

    // Base data for specific addresses
    const baseAddressData = {
        "13802 Heritage Club Drive": {
            leasingSavings: 6000,
            cashPurchaseSavings: 18000,
            financedPurchaseSavings: 15000,
            outOfPocketCost: 2500,
            upfrontCost: 21000,
            maxArrayAreaMeters2: 120,
            areaMeters2: [50, 40, 30],
            annualSavings: 1200,
            paybackPeriod: 10,
            lifetimeSavings: 24000,
            CO2_offset: 5,
            equivalentTreesPlanted: 50
        },
        "15501 Bruce B Downs Blvd": {
            leasingSavings: 5500,
            cashPurchaseSavings: 17000,
            financedPurchaseSavings: 14000,
            outOfPocketCost: 2800,
            upfrontCost: 22000,
            maxArrayAreaMeters2: 115,
            areaMeters2: [45, 35, 25],
            annualSavings: 1300,
            paybackPeriod: 11,
            lifetimeSavings: 26000,
            CO2_offset: 6,
            equivalentTreesPlanted: 55
        }
    };

    calculateSolarButton.addEventListener('click', function () {
        const enteredAddress = addressInput.value.trim();

        if (!enteredAddress) {
            alert("Please enter an address.");
            return;
        }

        // Retrieve metrics for the entered address or default metrics if the address is unknown
        const data = baseAddressData[enteredAddress] || {
            leasingSavings: 5000,
            cashPurchaseSavings: 15000,
            financedPurchaseSavings: 13000,
            outOfPocketCost: 2000,
            upfrontCost: 19000,
            maxArrayAreaMeters2: 100,
            areaMeters2: [40, 30, 20],
            annualSavings: 1000,
            paybackPeriod: 12,
            lifetimeSavings: 22000,
            CO2_offset: 4.5,
            equivalentTreesPlanted: 45
        };

        // Store address and metrics data in sessionStorage
        sessionStorage.setItem('selectedAddress', enteredAddress);
        sessionStorage.setItem('metricsData', JSON.stringify(data));

        // Navigate to results page
        window.location.href = 'results.html';
    });
});
