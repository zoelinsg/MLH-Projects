// Get DOM elements
const generateBtn = document.getElementById('generate-btn');
const clearBtn = document.getElementById('clear-btn');
const resultSection = document.getElementById('result');
const summaryTrip = document.getElementById('summary-trip');
const summaryDuration = document.getElementById('summary-duration');
const summaryWeather = document.getElementById('summary-weather');
const summaryExtras = document.getElementById('summary-extras');
const essentialsList = document.querySelector('#essentials ul');
const clothingList = document.querySelector('#clothing ul');
const electronicsList = document.querySelector('#electronics ul');
const personalCareList = document.querySelector('#personal-care ul');

// Packing list data
const packingLists = {
    essentials: {
        base: ['Passport/ID', 'Tickets', 'Wallet/Cash', 'Phone Charger', 'Toothbrush', 'Toothpaste'],
        beach: ['Sunscreen', 'Hat', 'Flip-flops'],
        mountain: ['Hiking Boots', 'Water Bottle', 'Map/Compass'],
        city: ['Umbrella', 'Comfortable Shoes', 'City Map'],
        business: ['Business Cards', 'Notebook', 'Pen']
    },
    clothing: {
        '1-3': ['Underwear (3 pairs)', 'Socks (3 pairs)', 'T-shirts (3)', 'Pants/Shorts (2)', 'Jacket'],
        '4-7': ['Underwear (5 pairs)', 'Socks (5 pairs)', 'T-shirts (5)', 'Pants/Shorts (3)', 'Jacket', 'Sweater'],
        '8+': ['Underwear (7 pairs)', 'Socks (7 pairs)', 'T-shirts (7)', 'Pants/Shorts (4)', 'Jacket', 'Sweater', 'Extra Pants'],
        hot: ['Light Clothing', 'Shorts', 'Sunglasses'],
        cold: ['Warm Coat', 'Gloves', 'Scarf', 'Thermal Underwear'],
        rainy: ['Rain Jacket', 'Waterproof Shoes', 'Poncho']
    },
    electronics: {
        base: ['Phone', 'Phone Charger'],
        laptop: ['Laptop', 'Laptop Charger', 'Mouse'],
        camera: ['Camera', 'Camera Charger', 'Memory Card', 'Tripod']
    },
    personalCare: {
        base: ['Shampoo', 'Body Wash', 'Deodorant', 'Razor', 'Shaving Cream'],
        medicine: ['Pain Relievers', 'Band-Aids', 'Prescription Medicine', 'First Aid Kit']
    }
};

// Function to generate packing list
function generatePackingList() {
    const tripType = document.getElementById('trip-type').value;
    const duration = document.getElementById('duration').value;
    const weather = document.getElementById('weather').value;
    const extras = Array.from(document.querySelectorAll('input[name="extras"]:checked')).map(cb => cb.value);

    if (!tripType || !duration || !weather) {
        alert('Please select trip type, duration, and weather.');
        return;
    }

    // Clear previous lists
    clearLists();

    // Generate Essentials
    const essentials = [...packingLists.essentials.base];
    if (packingLists.essentials[tripType]) {
        essentials.push(...packingLists.essentials[tripType]);
    }
    addItemsToList(essentialsList, essentials);

    // Generate Clothing
    const clothing = [...packingLists.clothing[duration]];
    if (packingLists.clothing[weather]) {
        clothing.push(...packingLists.clothing[weather]);
    }
    addItemsToList(clothingList, clothing);

    // Generate Electronics
    const electronics = [...packingLists.electronics.base];
    extras.forEach(extra => {
        if (packingLists.electronics[extra]) {
            electronics.push(...packingLists.electronics[extra]);
        }
    });
    addItemsToList(electronicsList, electronics);

    // Generate Personal Care
    const personalCare = [...packingLists.personalCare.base];
    if (extras.includes('medicine')) {
        personalCare.push(...packingLists.personalCare.medicine);
    }
    addItemsToList(personalCareList, personalCare);

    // Update trip summary
    setTripSummary(tripType, duration, weather, extras);

    // Show result
    resultSection.classList.remove('hidden');
}

// Function to add items to a list
function addItemsToList(listElement, items) {
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        listElement.appendChild(li);
    });
}

// Function to clear lists
function clearLists() {
    essentialsList.innerHTML = '';
    clothingList.innerHTML = '';
    electronicsList.innerHTML = '';
    personalCareList.innerHTML = '';
}

// Function to update the trip summary
function setTripSummary(tripType, duration, weather, extras) {
    summaryTrip.textContent = capitalize(tripType);
    summaryDuration.textContent = duration;
    summaryWeather.textContent = capitalize(weather);
    summaryExtras.textContent = extras.length ? extras.map(capitalize).join(', ') : 'None';
}

// Function to capitalize a word
function capitalize(text) {
    if (!text) {
        return '';
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// Function to clear form and result
function clearAll() {
    document.getElementById('packing-form').reset();
    clearLists();
    resultSection.classList.add('hidden');
}

// Event listeners
generateBtn.addEventListener('click', generatePackingList);
clearBtn.addEventListener('click', clearAll);