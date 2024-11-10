// Array to store installation data
// let installations = [
//     { installation_id: 1, city: "Tampa", capacity_kw: 500, type: "Commercial", timestamp: "2024-01-15" },
//     { installation_id: 2, city: "Orlando", capacity_kw: 300, type: "Residential", timestamp: "2024-02-20" },
//     { installation_id: 3, city: "Miami", capacity_kw: 700, type: "Industrial", timestamp: "2024-03-10" },
//     { installation_id: 4, city: "Tampa", capacity_kw: 400, type: "Residential", timestamp: "2024-04-05" },
//     { installation_id: 5, city: "Jacksonville", capacity_kw: 600, type: "Commercial", timestamp: "2024-05-25" }
// ];

let installations = [
    { installation_id: 1, city: "Tampa", capacity_kw: 500, type: "Commercial", timestamp: "2024-01-15" },
    { installation_id: 2, city: "Orlando", capacity_kw: 300, type: "Residential", timestamp: "2024-02-20" },
    { installation_id: 3, city: "Miami", capacity_kw: 700, type: "Industrial", timestamp: "2024-03-10" },
    { installation_id: 4, city: "Tampa", capacity_kw: 400, type: "Residential", timestamp: "2024-04-05" },
    { installation_id: 5, city: "Jacksonville", capacity_kw: 600, type: "Commercial", timestamp: "2024-05-25" },
    { installation_id: 6, city: "St. Petersburg", capacity_kw: 450, type: "Industrial", timestamp: "2024-06-18" },
    { installation_id: 7, city: "Miami", capacity_kw: 500, type: "Residential", timestamp: "2024-07-10" },
    { installation_id: 8, city: "Orlando", capacity_kw: 200, type: "Commercial", timestamp: "2024-08-08" },
    { installation_id: 9, city: "Lakeland", capacity_kw: 350, type: "Industrial", timestamp: "2024-09-12" }
];

// Geocoding results for address components
const geocodingResults = [
    { city: "Tampa", types: ["street_number", "route", "locality"] },
    { city: "Orlando", types: ["street_number", "route"] },
    { city: "Fort Myers", types: ["locality", "route"] },
    { city: "Miami", types: ["route", "locality"] },
    { city: "Tallahassee", types: ["street_number", "locality"] },
    { city: "Jacksonville", types: ["route", "locality"] },
    { city: "St. Petersburg", types: ["locality"] },
    { city: "Boca Raton", types: ["street_number", "locality"] },
    { city: "Lakeland", types: ["route", "locality"] }
];

// Coordinates for each city (latitude and longitude for demonstration purposes)
const coordinates = [
    { city: "Tampa", latitude: 27.9506, longitude: -82.4572 },
    { city: "Orlando", latitude: 28.5383, longitude: -81.3792 },
    { city: "Fort Myers", latitude: 26.6406, longitude: -81.8723 },
    { city: "Miami", latitude: 25.7617, longitude: -80.1918 },
    { city: "Tallahassee", latitude: 30.4383, longitude: -84.2807 },
    { city: "Jacksonville", latitude: 30.3322, longitude: -81.6557 },
    { city: "St. Petersburg", latitude: 27.7676, longitude: -82.6403 },
    { city: "Boca Raton", latitude: 26.3683, longitude: -80.1289 },
    { city: "Lakeland", latitude: 28.0395, longitude: -81.9498 }
];
let selectedInstallationId = null; // Track the selected installation for editing

// Chart instances for tracking each chart
let addressComponentsChart, monthlyInstallationTrendChart, capacityByCityChart, installationTypesChart, latitudeLongitudeChart;

// Render all charts
function renderAllCharts() {
    renderAddressComponentsByLocationChart();
    renderMonthlyInstallationTrendChart();
    renderCapacityByLocationChart();
    renderInstallationTypesDistributionChart();
    renderLatitudeLongitudeChart();
}

// Render installation list
function renderInstallationList() {
    const list = document.getElementById('installationList');
    list.innerHTML = ''; // Clear existing list before re-rendering

    installations.forEach(install => {
        const listItem = document.createElement('li');
        listItem.textContent = `${install.city} - ${install.capacity_kw} kW (${install.type})`;

        // Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => loadInstallationForEdit(install.installation_id);
        listItem.appendChild(editButton);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            deleteInstallation(install.installation_id);
        };
        listItem.appendChild(deleteButton);

        list.appendChild(listItem);
    });
}

// Add or update an installation
function addOrUpdateInstallation() {
    const city = document.getElementById('city').value;
    const capacity = parseInt(document.getElementById('capacity').value, 10);
    const type = document.getElementById('type').value;

    if (selectedInstallationId === null) {
        // Add new installation
        const newInstallation = {
            installation_id: installations.length > 0 ? Math.max(...installations.map(inst => inst.installation_id)) + 1 : 1,
            city: city,
            capacity_kw: capacity,
            type: type,
            timestamp: new Date().toISOString().slice(0, 10) // YYYY-MM-DD format
        };
        installations.push(newInstallation);
    } else {
        // Update existing installation
        const installation = installations.find(install => install.installation_id === selectedInstallationId);
        if (installation) {
            installation.city = city;
            installation.capacity_kw = capacity;
            installation.type = type;
            selectedInstallationId = null;
        }
    }

    document.getElementById('installationForm').reset();
    renderInstallationList(); // Refresh the installation list
    renderAllCharts(); // Update all charts
}

// Load installation data into form for editing
function loadInstallationForEdit(id) {
    const installation = installations.find(install => install.installation_id === id);
    if (installation) {
        document.getElementById('city').value = installation.city;
        document.getElementById('capacity').value = installation.capacity_kw;
        document.getElementById('type').value = installation.type;
        selectedInstallationId = id;
    }
}

// Delete an installation and update both list and charts
function deleteInstallation(id) {
    installations = installations.filter(install => install.installation_id !== id);

    renderInstallationList(); // Update installation list in the DOM
    renderAllCharts(); // Update charts to reflect deletion
}

// Helper function to calculate monthly capacity
function calculateMonthlyCapacity() {
    const monthlyCapacity = {};

    installations.forEach(install => {
        const month = install.timestamp.slice(0, 7); // Format: YYYY-MM
        if (!monthlyCapacity[month]) {
            monthlyCapacity[month] = 0;
        }
        monthlyCapacity[month] += install.capacity_kw;
    });

    return Object.entries(monthlyCapacity).sort((a, b) => new Date(a[0]) - new Date(b[0]));
}

// Chart 1: Address Components by City
function renderAddressComponentsByLocationChart() {
    const ctx = document.getElementById('addressComponentsByLocationChart');
    if (ctx) {
        if (addressComponentsChart) addressComponentsChart.destroy();
        addressComponentsChart = new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: installations.map(inst => inst.city),
                datasets: [{
                    label: 'Number of Installations',
                    data: installations.map(inst => installations.filter(i => i.city === inst.city).length),
                    backgroundColor: 'rgba(75, 192, 192, 0.8)',
                    barPercentage: 0.5
                }]
            }
        });
    }
}

// Chart 2: Monthly Installation Capacity Trend
function renderMonthlyInstallationTrendChart() {
    const ctx = document.getElementById('monthlyInstallationTrendChart');
    if (ctx) {
        if (monthlyInstallationTrendChart) monthlyInstallationTrendChart.destroy();

        const monthlyData = calculateMonthlyCapacity();
        const labels = monthlyData.map(entry => entry[0]); // YYYY-MM
        const data = monthlyData.map(entry => entry[1]);   // Capacity in kW

        monthlyInstallationTrendChart = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Installed Capacity (kW)',
                    data: data,
                    borderColor: '#36A2EB',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Month'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Installed Capacity (kW)'
                        }
                    }
                }
            }
        });
    }
}

// Chart 4: Installation Capacity by City
function renderCapacityByLocationChart() {
    const ctx = document.getElementById('capacityByLocationChart');
    if (ctx) {
        if (capacityByCityChart) capacityByCityChart.destroy();
        const cityCapacities = installations.reduce((acc, install) => {
            acc[install.city] = (acc[install.city] || 0) + install.capacity_kw;
            return acc;
        }, {});

        capacityByCityChart = new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: Object.keys(cityCapacities),
                datasets: [{
                    label: 'Total Capacity (kW)',
                    data: Object.values(cityCapacities),
                    backgroundColor: 'rgba(255, 165, 0, 0.7)',
                    barPercentage: 0.5
                }]
            }
        });
    }
}

// Chart 5: Distribution of Installation Types
function renderInstallationTypesDistributionChart() {
    const ctx = document.getElementById('installationTypesDistributionChart');
    if (ctx) {
        if (installationTypesChart) installationTypesChart.destroy();
        const typeCount = installations.reduce((acc, install) => {
            acc[install.type] = (acc[install.type] || 0) + 1;
            return acc;
        }, {});

        installationTypesChart = new Chart(ctx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: Object.keys(typeCount),
                datasets: [{
                    data: Object.values(typeCount),
                    backgroundColor: ['#4BC0C0', '#FF9F40', '#9966FF']
                }]
            }
        });
    }
}

function renderLatitudeLongitudeChart() {
    const ctx = document.getElementById('latitudeLongitudeChart');
    if (ctx) {
        if (latitudeLongitudeChart) latitudeLongitudeChart.destroy();
        latitudeLongitudeChart = new Chart(ctx.getContext('2d'), {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Cities by Latitude and Longitude',
                    data: coordinates.map(coord => ({
                        x: coord.longitude,
                        y: coord.latitude
                    })),
                    backgroundColor: '#FF6384'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'Longitude'
                        }
                    },
                    y: {
                        type: 'linear',
                        title: {
                            display: true,
                            text: 'Latitude'
                        }
                    }
                }
            }
        });
    }
}


// Initialize charts and installation list on page load
document.addEventListener("DOMContentLoaded", () => {
    renderAllCharts();
    renderInstallationList();
});
