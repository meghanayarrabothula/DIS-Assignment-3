document.addEventListener('DOMContentLoaded', function () {
    const purchaseOptionsCtx = document.getElementById('purchaseOptionsChart').getContext('2d');
    const monthlySavingsCtx = document.getElementById('monthlySavingsChart').getContext('2d');
    const roofAreaCtx = document.getElementById('roofAreaChart').getContext('2d');

    // Bar Chart for Purchase Options
    new Chart(purchaseOptionsCtx, {
        type: 'bar',
        data: {
            labels: ['Leasing', 'Cash Purchase', 'Financed Purchase'],
            datasets: [{
                label: 'Total Savings ($)',
                data: [6000, 18000, 15000], // Example values, adjust as needed
                backgroundColor: 'rgba(75, 192, 192, 0.7)'
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

    // Line Chart for Monthly Savings
    new Chart(monthlySavingsCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Monthly Savings ($)',
                data: [100, 200, 300, 400, 500, 600], // Example values, adjust as needed
                borderColor: 'rgba(54, 162, 235, 0.7)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Savings ($)' } }
            },
            plugins: { legend: { position: 'top' } }
        }
    });

    // Pie Chart for Roof Area Allocation
    new Chart(roofAreaCtx, {
        type: 'pie',
        data: {
            labels: ['Segment 1', 'Segment 2', 'Segment 3'],
            datasets: [{
                label: 'Roof Usable Area',
                data: [50, 40, 30], // Example values, adjust as needed
                backgroundColor: [
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(54, 162, 235, 0.7)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'top' } }
        }
    });
});
