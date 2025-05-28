// Switch between input tabs
const numberTab = document.getElementById('numberTab');
if(numberTab) {
    numberTab.addEventListener('click', function() {
        document.querySelectorAll('.input-section').forEach(el => el.classList.add('hidden'));
        document.getElementById('numberInput').classList.remove('hidden');
        document.querySelectorAll('.input-option').forEach(el => el.classList.remove('active-tab'));
        this.classList.add('active-tab');
    });
}

const dateTab = document.getElementById('dateTab');
if(dateTab) {
    dateTab.addEventListener('click', function() {
        document.querySelectorAll('.input-section').forEach(el => el.classList.add('hidden'));
        document.getElementById('dateInput').classList.remove('hidden');
        document.querySelectorAll('.input-option').forEach(el => el.classList.remove('active-tab'));
        this.classList.add('active-tab');
    });
}

const timeTab = document.getElementById('timeTab');
if(timeTab) {
    timeTab.addEventListener('click', function() {
        document.querySelectorAll('.input-section').forEach(el => el.classList.add('hidden'));
        document.getElementById('timeInput').classList.remove('hidden');
        document.querySelectorAll('.input-option').forEach(el => el.classList.remove('active-tab'));
        this.classList.add('active-tab');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Only run displayMeaning if on result.html and resultContainer exists
    if (document.getElementById('resultContainer')) {
        displayMeaning();
    }
});

// Angel number meanings database
const angelMeanings = {
    "111": {
        meaning: "Your thoughts are manifesting rapidly. Stay positive and focus on what you truly desire.",
        info: "This is a sign of new beginnings and alignment with your soul's purpose.",
        bg: "bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100"
    },
    "222": {
        meaning: "Trust that everything is working out as it should. Have faith in the divine timing of your life.",
        info: "A message to keep the faith and not give up, as your manifestations are coming to fruition.",
        bg: "bg-gradient-to-br from-green-100 via-teal-100 to-blue-100"
    },
    "333": {
        meaning: "The ascended masters are near you, offering love, guidance, and protection.",
        info: "You're being encouraged to express your creativity and connect with your higher self.",
        bg: "bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100"
    },
    "444": {
        meaning: "Your angels are surrounding you with love and support. You're on the right path.",
        info: "This is a sign of stability and foundation. Your hard work is being supported by the universe.",
        bg: "bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100"
    },
    "555": {
        meaning: "Big changes are coming! Embrace them with an open heart and mind.",
        info: "This change is aligned with your soul's purpose and will bring positive growth.",
        bg: "bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100"
    },
    "666": {
        meaning: "Find balance between the material and spiritual aspects of your life.",
        info: "This is a reminder to focus on gratitude and release fears about material needs.",
        bg: "bg-gradient-to-br from-purple-100 via-pink-100 to-red-100"
    },
    "777": {
        meaning: "You're on the right path! The universe is applauding your choices and growth.",
        info: "This highly spiritual number indicates deep wisdom and inner knowing.",
        bg: "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
    },
    "888": {
        meaning: "Abundance is flowing into your life. Financial and material blessings are coming.",
        info: "This signifies the completion of a cycle and the beginning of financial prosperity.",
        bg: "bg-gradient-to-br from-green-100 via-teal-100 to-blue-100"
    },
    "999": {
        meaning: "A chapter in your life is ending. Trust that something better is beginning.",
        info: "This completion is necessary for your spiritual growth and soul mission.",
        bg: "bg-gradient-to-br from-red-100 via-purple-100 to-blue-100"
    },
    "000": {
        meaning: "You are one with the universe. A fresh start and infinite possibilities await.",
        info: "This powerful number represents the beginning of a spiritual journey.",
        bg: "bg-gradient-to-br from-white via-gray-100 to-gray-200"
    },
    "1212": {
        meaning: "Your positive thoughts and actions are creating your desired reality.",
        info: "This is a sign to stay focused on your goals and maintain high vibrations.",
        bg: "bg-gradient-to-br from-yellow-100 via-green-100 to-blue-100"
    },
    "1234": {
        meaning: "You're progressing step by step toward your goals. Stay the course!",
        info: "The angels are guiding you through an important sequence of events.",
        bg: "bg-gradient-to-br from-red-100 via-yellow-100 to-green-100"
    }
};

// Get meaning from direct number input
function getNumberMeaning() {
    const number = document.getElementById('angelNumber').value.trim();
    if (!number) {
        alert("Please enter an angel number");
        return;
    }
    
    sendNumber(number);
}

// Get meaning from date input
function getDateMeaning() {
    const dateStr = document.getElementById('angelDate').value;
    if (!dateStr) {
        alert("Please select a date");
        return;
    }
    
    // Extract numbers from date (format: YYYY-MM-DD)
    const numbers = dateStr.replace(/-/g, '');
    let sum = 0;
    
    // Calculate sum of all digits
    for (let i = 0; i < numbers.length; i++) {
        sum += parseInt(numbers[i]);
    }
    
    // Reduce to single digit or master number
    let angelNumber = sum.toString();
    while (angelNumber.length > 1 && !['11', '22', '33'].includes(angelNumber)) {
        let newSum = 0;
        for (let i = 0; i < angelNumber.length; i++) {
            newSum += parseInt(angelNumber[i]);
        }
        angelNumber = newSum.toString();
    }
    
    sendNumber(angelNumber);
}

// Get meaning from time input
function getTimeMeaning() {
    const timeStr = document.getElementById('angelTime').value;
    if (!timeStr) {
        alert("Please enter a time");
        return;
    }
    
    // Extract numbers from time (format: HH:MM)
    const numbers = timeStr.replace(/:/g, '');
    let angelNumber = numbers;
    
    // If the time is something like 11:11, 12:34, etc., use that directly
    if (numbers in angelMeanings || numbers === '0000') {
        angelNumber = numbers;
    } else {
        // Otherwise reduce to a single digit or master number
        let sum = 0;
        for (let i = 0; i < numbers.length; i++) {
            sum += parseInt(numbers[i]);
        }
        
        angelNumber = sum.toString();
        while (angelNumber.length > 1 && !['11', '22', '33'].includes(angelNumber)) {
            let newSum = 0;
            for (let i = 0; i < angelNumber.length; i++) {
                newSum += parseInt(angelNumber[i]);
            }
            angelNumber = newSum.toString();
        }
    }
    
    sendNumber(angelNumber);
}

function sendNumber(number) {
    window.location.href = `result.html?number=${encodeURIComponent(number)}`;
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Display the meaning with animation and background change
function displayMeaning() {
    const number = getQueryParam('number');
    const resultContainer = document.getElementById('resultContainer');
    const numberDisplay = document.getElementById('numberDisplay');
    const meaningText = document.getElementById('meaningText');
    const additionalInfo = document.getElementById('additionalInfo');
    
    // Hide result container initially for fade-in effect
    resultContainer.classList.remove('fade-in');
    
    // Find the meaning (use exact match if available, otherwise find similar)
    let meaning = angelMeanings[number];
    
    if (!meaning) {
        // Try to find a similar number (like 1111 for 111)
        for (const key in angelMeanings) {
            if (number.includes(key) || key.includes(number)) {
                meaning = angelMeanings[key];
                break;
            }
        }
        
        if (!meaning) {
            meaning = {
                meaning: "The angels are sending you a message of love and support.",
                info: "Even if this specific number isn't documented, trust that you're being guided.",
                bg: "bg-gradient-to-br from-purple-100 via-pink-100 to-red-100"
            };
        }
    }
    
    // Update the display
    numberDisplay.textContent = number;
    meaningText.textContent = meaning.meaning;
    additionalInfo.innerHTML = `<p class="mb-4">${meaning.info}</p>`;
    
    // Change background
    document.body.className = `flex flex-col items-center justify-center p-4 ${meaning.bg}`;
    
    // Show result with fade-in effect
    setTimeout(() => {
        resultContainer.classList.add('fade-in');
    }, 100);
}

// Set current date as default in date picker
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const dateStr = today.toISOString().substr(0, 10);
    const dateInput = document.getElementById('angelDate');
    if (dateInput) {
        dateInput.value = dateStr;
    }
});