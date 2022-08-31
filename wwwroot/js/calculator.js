// This is the source code of taxes calculator for company-management-panel project by MTSM-ZSEM
// CONSTANTS
const typesOfPITTaxation = {
    standard: 'standard',
    line: 'line',
    lumpSum: 'lumpSum',
    taxationCard: 'taxationCard',
};

// FUNCTIONS
function calculatePITBasedOnIncome(
    income,
    typeOfTaxation,
    polskiLadVersion,
    middleClassReduction = false
) {
    if (isNaN(income)) {
        return NaN;
    }
    const firstStandardPercentage = polskiLadVersion === 1 ? 0.17 : 0.12;
    const secondStandardPercentage = 0.32;
    const taxFreeIncome = 30000;
    const taxReducingAmount = polskiLadVersion === 1 ? 5100 : 3600;
    const secondThresholdConstAmount = polskiLadVersion === 1 ? 15300 : 10800;
    const firstTaxThreshold = 120000;
    const shouldReduceByHealthcare = $('#healthcare-reduction-input').prop(
        'checked'
    );

    if (income <= taxFreeIncome) {
        return 0;
    }
    if (polskiLadVersion === 1 && middleClassReduction) {
        income -= calculateMiddleClassReduction(income);
    }
    if (
        polskiLadVersion === 2 &&
        isNonStandardType(typeOfTaxation) &&
        shouldReduceByHealthcare
    ) {
        income -= Math.min(calculateHealthcareTax(income, typeOfTaxation), 8700);
    }
    switch (typeOfTaxation) {
        case 'standard':
            return income <= firstTaxThreshold
                ? firstStandardPercentage * income - taxReducingAmount
                : secondThresholdConstAmount +
                secondStandardPercentage * (income - firstTaxThreshold);
        case 'line':
            return 0.19 * income;
    }
}

function calculatePITUsingLumpSum(income) {
    const percentage = parseInt($('#company-types').val()) / 100;
    const polskiLad = $('#polski-lad-modes').val() === 'polski-lad' ? 1 : 2;
    const shouldReduceByHealthcare = $('#healthcare-reduction-input').prop(
        'checked'
    );

    if (shouldReduceByHealthcare && polskiLad === 2) {
        income -= 0.5 * calculateHealthcareTax(income, typesOfPITTaxation.lumpSum);
    }
    return percentage * income;
}

function calculatePITTaxCard(income, percentage) {
    const polskiLad = $('#polski-lad-modes').val() === 'polski-lad' ? 1 : 2;
    const shouldReduceByHealthcare = $('#healthcare-reduction-input').prop(
        'checked'
    );
    let tax = income * percentage;
    if (shouldReduceByHealthcare && polskiLad === 2) {
        tax -= 0.19 * calculateHealthcareTax(income, typesOfPITTaxation.line);
    }
    return tax;
}

function calculateMiddleClassReduction(income) {
    const firstThreshold = 68412;
    const secondThreshold = 102588;
    const thirdThreshold = 133692;

    if (income >= firstThreshold && income <= secondThreshold) {
        return (income * 0.0668 - 4566) / 0.17;
    }
    if (income >= secondThreshold + 0.01 && income <= thirdThreshold) {
        return (income * -0.0735 + 9829) / 0.17;
    }
    return 0;
}

function disableMiddleClassReductionCheckbox() {
    $('.md-reduction-container').hide();
}

function enableMiddleClassReductionCheckbox() {
    $('.md-reduction-container').show();
}

function clearTwoMillionOverflow() {
    $('#pit-input').removeClass('is-invalid');
    $('#pit-input + div').text('Proszę uzupełnić to pole');
    $('.confirmation-button').prop('disabled', false).removeClass('btn-danger');
}

function hideCompanyType() {
    $('label[for="company-types"]').hide();
    $('#company-types').hide();
}

function showCompanyTypes() {
    $('label[for="company-types"]').show();
    $('#company-types').show();
}

function hideHealthcareReduction() {
    $('.healthcare-container').hide();
}

function showHealthcareReduction() {
    $('.healthcare-container').show();
}

function enterErrorState() {
    $('form').addClass('was-validated');
    $('.confirmation-button').prop('disabled', true).addClass('btn-danger');
}

function changeToLumpSumMode() {
    $('.tax-card-percent').hide();
    changeToNormalMode();
    $('label[for="pit-input"]').text('Przychód w roku podatkowym:');
    showCompanyTypes();
    disableMiddleClassReductionCheckbox();
}

function changeToTaxationCard() {
    changeToNormalMode();
    $('label[for="pit-input"]').text('Dochód w roku podatkowym:');
    $('label[for="healthcare-reduction-input"]').text(
        'Odliczenie składki zdrowotnej od podatku'
    );
    disableMiddleClassReductionCheckbox();
    hideCompanyType();
    $('.tax-card-percent').show();
}

function changeToNormalMode() {
    $('label[for="pit-input"]').text('Dochód w roku podatkowym:');
    $('label[for="healthcare-reduction-input"]').text(
        'Odliczenie składki zdrowotnej od przychodu/dochodu'
    );
    if ($('#taxation-types').val() === typesOfPITTaxation.standard) {
        enableMiddleClassReductionCheckbox();
        hideHealthcareReduction();
    } else {
        disableMiddleClassReductionCheckbox();
        if ($('#polski-lad-modes').val() === 'polski-lad-2') {
            showHealthcareReduction();
        }
    }

    hideCompanyType();
    $('.tax-card-percent').hide();
}

function calculateHealthcareTax(income, typeOfTaxation) {
    const standardPercentage = 0.09;
    const linePercentage = 0.049;
    const baseValue = 3250.8;

    const firstThreshold = 60000;
    const secondThreshold = 300000;
    if (isNaN(income)) {
        return NaN;
    }

    switch (typeOfTaxation) {
        case typesOfPITTaxation.standard:
            return Math.max(standardPercentage * income, baseValue);
        case typesOfPITTaxation.line:
            return Math.max(linePercentage * income, baseValue);
        case typesOfPITTaxation.lumpSum:
            if (income < firstThreshold) {
                return 4031.28;
            } else if (income >= firstThreshold && income <= secondThreshold) {
                return 6718.68;
            } else {
                return 12093.72;
            }
        case typesOfPITTaxation.taxationCard:
            return baseValue;
        default:
            return null;
    }
}

function calculateVAT(income, percentage) {
    if (isNaN(income))
        return 0;
    return income * percentage;
}

function validateInputFields(inputFields) {
    let returnValue = true;
    inputFields.each(function () {
        if ($(this).val() === '' && $(this).is(':visible')) {
            returnValue = false;
            enterErrorState();
        }
    })
    return returnValue;
}

function isNonStandardType(taxationType) {
    return (
        [
            typesOfPITTaxation.line,
            typesOfPITTaxation.lumpSum,
            typesOfPITTaxation.taxationCard,
        ].indexOf(taxationType) !== -1
    );
}

function formatInputNumbers(inputElements) {
    inputElements.each(function () {
        let value = $(this).val();
        value = value.replace(/,/g, '.');
        if (value === '.') {
            $(this).val('');
            return;
        }
        if (value.indexOf('.') !== -1 && value.match(/\./g).length > 1)
            value = value.slice(0, -1);
        if (value.endsWith('.') || value === '') {
            $(this).val(value.replace('.', ','));
            return;
        }

        let number = Number(value.replace(/\s|[^\d\.]/g, ''));
        $(this).val(number.toLocaleString('pl-PL'));
    });
}

function removeInputWhitespace(inputElementsCollection) {
    inputElementsCollection.each(function () {
        const pureNumber = $(this).val().replace(/\s/g, '');
        $(this).val(pureNumber);
    });
}

function twoMillionEurosOverflow() {
    $('#pit-input').addClass('is-invalid');
    $('#pit-input + div').html('Podczas płacenia podatku w formie ryczałtu przychód nie może przekraczać 2 milionów &euro;');
    $('.confirmation-button').prop('disabled', true).addClass('btn-danger');
}

$('#taxation-types').on('change', function () {
    switch ($(this).val()) {
        case typesOfPITTaxation.lumpSum:
            changeToLumpSumMode();
            break;
        case typesOfPITTaxation.taxationCard:
            changeToTaxationCard();
            break;
        default:
            changeToNormalMode();
    }
    $('.confirmation-button').trigger('click');
});

$('#polski-lad-modes').on('change', function () {
    const taxType = $('#taxation-types').val();
    if ($(this).val() === 'polski-lad-2') {
        disableMiddleClassReductionCheckbox();
        if (isNonStandardType(taxType)) {
            showHealthcareReduction();
        }
        return;
    }
    if (!isNonStandardType(taxType)) {
        enableMiddleClassReductionCheckbox();
    }
    hideHealthcareReduction();
});

$('#company-types').on('change', () => {
    $('.confirmation-button').trigger('click');
});

$('.container').on('input', 'input[type="text"]', function () {
    removeInputWhitespace($(this));
    const income = parseFloat($(this).val());
    const twoMillionEuros = 9188200;
    const taxType = $('#taxation-types').val();

    if (
        (income > twoMillionEuros && taxType === typesOfPITTaxation.lumpSum)
    ) {
        twoMillionEurosOverflow();
    } else {
        clearTwoMillionOverflow($('input[type="text"]'));
    }

    if (
        !calculateMiddleClassReduction(income) ||
        taxType !== typesOfPITTaxation.standard
    ) {
        disableMiddleClassReductionCheckbox();
        formatInputNumbers($(this));
        return;
    }
    enableMiddleClassReductionCheckbox();
    formatInputNumbers($(this));
});

$('.confirmation-button').on('click', () => {
    if (!validateInputFields($('input[type="text"]:required'))) {
        return;
    }

    removeInputWhitespace($('input[type="text"]'));
    const version = $('#polski-lad-modes').val() === 'polski-lad' ? 1 : 2;
    const value = parseFloat($('#pit-input').val());
    const typeOfTaxation = $('#taxation-types').val();
    const reduction = $('#middle-class-reduction-checkbox').prop('checked');
    const healthcareTax = calculateHealthcareTax(value, typeOfTaxation).toFixed(
        2
    );
    const vat = calculateVAT(
        parseFloat($('#sales-income').val()),
        parseInt($('#vat-percentages').val()) / 100
    ).toFixed(2);
    const propertyTax = $('#property-tax-cost').val() === '' ? 0 : parseFloat($('#property-tax-cost').val()).toFixed(2);
    const civilLegalTax = $('#civil-legal-tax-cost').val() === '' ? 0 : parseFloat($('#civil-legal-tax-cost').val()).toFixed(2);
    let pit = 0;
    let percentage;

    switch (typeOfTaxation) {
        case typesOfPITTaxation.standard:
            pit = calculatePITBasedOnIncome(
                value,
                typesOfPITTaxation.standard,
                version,
                reduction
            ).toFixed(2);
            break;
        case typesOfPITTaxation.line:
            pit = calculatePITBasedOnIncome(
                value,
                typesOfPITTaxation.line,
                version,
                reduction
            ).toFixed(2);
            break;
        case typesOfPITTaxation.lumpSum:
            pit = calculatePITUsingLumpSum(value).toFixed(2);
            break;
        case typesOfPITTaxation.taxationCard:
            percentage = parseFloat($('#percentage-input').val()) / 100;
            pit = calculatePITTaxCard(value, percentage).toFixed(2);
            break;
        default:
            console.error(`Unsupported type of taxation: ${typeOfTaxation}!`);
    }

    const localeOptions = {
        style: 'currency',
        currency: 'PLN',
    };
    $('.pit-value-cell + td').html(
        Number(pit).toLocaleString('pl-PL', localeOptions)
    );
    $('.healthcare-value-cell + td').text(
        Number(healthcareTax).toLocaleString('pl-PL', localeOptions)
    );
    $('.vat-value-cell + td').html(
        Number(vat).toLocaleString('pl-PL', localeOptions)
    );
    $('.property-value-cell + td').text(
        Number(propertyTax).toLocaleString('pl-PL', localeOptions)
    );
    $('.civil-legal-value-cell + td').text(
        Number(civilLegalTax).toLocaleString('pl-PL', localeOptions)
    );

    const sumOfTaxes = $('.result-cell');
    const numericalSum =
        parseFloat(pit) +
        parseFloat(healthcareTax) +
        parseFloat(vat) +
        parseFloat(propertyTax) +
        parseFloat(civilLegalTax);
    sumOfTaxes.text(
        numericalSum.toLocaleString('pl-PL', localeOptions)
    );
    $('table').fadeIn();
    formatInputNumbers($('input[type="text"]'));
});
$('form').on('submit', event => {
    event.preventDefault();
})

jQuery(() => {
    const selectedTaxType = Number($('#taxation-types').attr('data-selected')) - 1;
    $('input').val('');
    $('table').fadeOut();
    $('select').prop('selectedIndex', 0);
    $('#polski-lad-modes').prop('selectedIndex', 1)
    $('#taxation-types').prop('selectedIndex', selectedTaxType);
    switch(selectedTaxType) {
    case 1:
      changeToNormalMode();
      break;
    case 2:
      changeToLumpSumMode();
      break;
    case 3:
      changeToTaxationCard();
      break;
    default:
      changeToNormalMode();
    }
});
