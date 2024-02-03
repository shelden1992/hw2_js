const DATA_KEY = 'data';
const DRAFT_KET = 'draft';

function LocalStorageManager() {
}

LocalStorageManager.prototype.clearLocalStorage = function () {
    localStorage.clear();
    console.log("LocalStorage clear");
};

LocalStorageManager.prototype.addItem = function (key, value) {
    localStorage.setItem(key, value);
    console.log(`Add value = \"${value}\" for key = \"${key}\"`);
};

LocalStorageManager.prototype.getItem = function (key) {
    let value = localStorage.getItem(key);
    console.log(`Get value = \"${value}\" by key = \"${key}\"`);
    return value;
}

LocalStorageManager.prototype.removeItem = function (key) {
    localStorage.removeItem(key);
    console.log(`Remove value by key = \"${key}\"`);
}

document.addEventListener('DOMContentLoaded', () => {

    const localStorageManager = new LocalStorageManager();

    const addDataButton = document.getElementById('addDataButton');
    const clearAllButton = document.getElementById('clearAllButton');
    const deleteDataButton = document.getElementById('deleteDataButton');

    clearAllButton.addEventListener('click', function () {
        localStorageManager.clearLocalStorage();
    })

    deleteDataButton.addEventListener('click', function () {
        localStorageManager.removeItem(DATA_KEY);
    })

    addDataButton.addEventListener('click', function () {
        const textInputElement = document.getElementById('textInput');
        const value = textInputElement.value;

        if (hasValue(value)) {
            const trimmedValue = value.trim();
            localStorageManager.addItem(DATA_KEY, trimmedValue);
        }
    })

    const valueInLocalStorage = localStorageManager.getItem(DATA_KEY);
    const draftValueInLocalStorage = localStorageManager.getItem(DRAFT_KET);

    let newValue = draftValueInLocalStorage !== null ? draftValueInLocalStorage : valueInLocalStorage;

    const inputValue = document.getElementById('textInput');
    inputValue.value = newValue;
});

document.addEventListener('beforeunload', () => {
    const localStorageManager = new LocalStorageManager();

    const textInputElement = document.getElementById('textInput');
    const draftValue = textInputElement.value;

    if (hasValue(draftValue)) {
        const trimmedDraftValue = draftValue.trim();

        const dataValue = localStorageManager.getItem(DATA_KEY);

        if (dataValue !== trimmedDraftValue) {
            localStorageManager.addItem(DRAFT_KET, trimmedDraftValue);
        }
    }

});

function hasValue(str) {
    return str && str.trim();
}