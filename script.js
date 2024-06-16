document.addEventListener('DOMContentLoaded', () => {
    const carType = document.getElementById('car-type');
    const carValue = document.getElementById('car-value');
    const carValueRange = document.getElementById('car-value-range');
    const leasePeriod = document.getElementById('lease-period');
    const downPayment = document.getElementById('down-payment');
    const downPaymentValue = document.getElementById('down-payment-value');
    const leasingCost = document.getElementById('leasing-cost');
    const downpayment = document.getElementById('downpayment');
    const downPaymentPercentage = document.getElementById('down-payment-percentage');
    const monthlyInstallment = document.getElementById('monthly-installment');
    const interestRate = document.getElementById('interest-rate');
    const totalLeasingCost = document.getElementById('total-leasing-cost');

    const calculateLeasing = () => {
        const carTypeValue = carType.value;
        let carValueAmount = parseFloat(carValue.value) || 0;
        let leasePeriodMonths = parseInt(leasePeriod.value) || 0;
        let downPaymentPercentageValue = parseInt(downPayment.value) || 0;
    
        // Validate car value
        if (carValueAmount < 10000 || carValueAmount > 200000 || isNaN(carValueAmount)) {
            carValueAmount = 0; // Set default value or handle error
        }
    
        // Validate lease period
        if (leasePeriodMonths < 12 || leasePeriodMonths > 60 || isNaN(leasePeriodMonths)) {
            leasePeriodMonths = 0; // Set default value or handle error
        }
    
        // Validate down payment percentage
        if (downPaymentPercentageValue < 10 || downPaymentPercentageValue > 50 || isNaN(downPaymentPercentageValue)) {
            downPaymentPercentageValue = 0; // Set default value or handle error
        }
    
        const interestRateValue = carTypeValue === 'new' ? 2.99 : 3.7;
        const downPaymentAmount = (carValueAmount * downPaymentPercentageValue) / 100;
        const principal = carValueAmount - downPaymentAmount;
        const monthlyInterestRate = (interestRateValue / 100) / 12;
        const totalLeaseMonths = leasePeriodMonths;
        const monthlyInstallmentAmount = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalLeaseMonths));
        const totalLeaseCost = (monthlyInstallmentAmount * totalLeaseMonths) + downPaymentAmount;
    
        totalLeasingCost.innerText = `${isNaN(totalLeaseCost) ? 0 : totalLeaseCost.toFixed(2)}€`;
        downpayment.innerText = `${downPaymentAmount.toFixed(2)}€`;
        downPaymentPercentage.innerText = downPaymentPercentageValue;
        monthlyInstallment.innerText = `${isNaN(monthlyInstallmentAmount) ? 0 : monthlyInstallmentAmount.toFixed(2)}€`;
        interestRate.innerText = `${interestRateValue.toFixed(2)}%`;
    };
    

    carValue.addEventListener('input', () => {
        let value = parseFloat(carValue.value);
        if (value < 10000 || value > 200000 || isNaN(value)) {
            carValue.value = ''; // Clear invalid input
        } else {
            carValueRange.value = value;
        }
        calculateLeasing();
    });

    carValueRange.addEventListener('input', () => {
        let value = parseFloat(carValueRange.value);
        if (value < 10000 || value > 200000 || isNaN(value)) {
            carValueRange.value = ''; // Clear invalid input
        } else {
            carValue.value = value;
        }
        calculateLeasing();
    });

    leasePeriod.addEventListener('change', () => {
        calculateLeasing();
    });

    downPayment.addEventListener('input', () => {
        let value = parseInt(downPayment.value);
        if (value < 10 || value > 50 || isNaN(value)) {
            downPayment.value = ''; // Clear invalid input
        } else {
            downPaymentValue.value = value;
        }
        calculateLeasing();
    });

    downPaymentValue.addEventListener('input', () => {
        let value = parseInt(downPaymentValue.value);
        if (value < 10 || value > 50 || isNaN(value)) {
            downPaymentValue.value = ''; // Clear invalid input
        } else {
            downPayment.value = value;
        }
        calculateLeasing();
    });

    carType.addEventListener('change', calculateLeasing);

    calculateLeasing();
});
