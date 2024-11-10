document.addEventListener("DOMContentLoaded", () => {
    function calculateSolarPower() {
        const area = parseFloat(document.getElementById('solarArea').value);
        const efficiency = parseFloat(document.getElementById('solarEfficiency').value) / 100;
        const sunHours = parseFloat(document.getElementById('sunHours').value);

        if (isNaN(area) || isNaN(efficiency) || isNaN(sunHours)) {
            alert("Please enter valid numbers for Solar Power Calculation.");
            return;
        }

        const powerOutput = area * efficiency * sunHours;
        document.getElementById('solarPowerResult').textContent = `Estimated Solar Power Output: ${powerOutput.toFixed(2)} Watts`;
    }

    function calculateOffGridPower() {
        const dailyConsumption = parseFloat(document.getElementById('dailyConsumption').value);
        const daysOfAutonomy = parseFloat(document.getElementById('daysOfAutonomy').value);
        const inverterEfficiency = parseFloat(document.getElementById('inverterEfficiency').value) / 100;

        if (isNaN(dailyConsumption) || isNaN(daysOfAutonomy) || isNaN(inverterEfficiency)) {
            alert("Please enter valid numbers for Off-Grid Power Calculation.");
            return;
        }

        const batteryCapacity = (dailyConsumption * daysOfAutonomy) / inverterEfficiency;
        document.getElementById('offGridPowerResult').textContent = `Required Battery Capacity: ${batteryCapacity.toFixed(2)} kWh`;
    }

    document.getElementById('calculateSolar').addEventListener('click', calculateSolarPower);
    document.getElementById('calculateOffGrid').addEventListener('click', calculateOffGridPower);
});
