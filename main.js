/**
 * @file Main application script for the Holistic Cosmetics Selector.
 * @description This script dynamically builds a wizard from CSV data,
 * fetches and merges product information including ingredients,
 * and provides personalized recommendations.
 */
document.addEventListener('DOMContentLoaded', () => {

    const AppState = {
        products: [],
        wizardConfig: [],
        currentStep: 0,
        userChoices: {},
    };

    const DOMElements = {
        wizard: document.getElementById('wizard'),
        wizardContentContainer: document.getElementById('wizard-content-container'),
        resultsContainer: document.getElementById('results-container'),
        wizardNavigation: document.getElementById('wizard-navigation'),
        modal: document.getElementById('modal'),
        modalTitle: document.getElementById('modal-title'),
        modalBody: document.getElementById('modal-body'),
        closeModalBtn: document.getElementById('close-modal'),
        modalBackdrop: document.querySelector('.modal-backdrop'),
    };

    /**
     * Parses CSV text data into an array of objects.
     * @param {string} text - The raw CSV text.
     * @param {string} delimiter - The character separating columns.
     * @returns {Array<Object>}
     */
    const parseCSV = (text, delimiter = ',') => {
        const lines = text.trim().replace(/\r/g, '').split('\n');
        if (lines.length < 2) return [];
        const header = lines[0].split(delimiter).map(h => h.trim());
        return lines.slice(1).map(line => {
            const values = line.split(delimiter);
            return header.reduce((obj, nextKey, index) => {
                obj[nextKey] = (values[index] || '').trim();
                return obj;
            }, {});
        });
    };

    /**
     * Fetches all required CSV files and merges them into a single product list.
     * @returns {Promise<Array<Object>>} A promise that resolves to the merged product list.
     */
    async function loadAndMergeData() {
        const [cechyText, jozkaBeautyText, ziolowyOgrodText] = await Promise.all([
            fetch('cechy.csv').then(res => res.text()),
            fetch('Kopia Jozka Beauty - informacje na opakowania - Arkusz1.csv').then(res => res.text()),
            fetch('Ziołowy Ogród- informacje na opakowania.xlsx - Arkusz1.csv').then(res => res.text()),
        ]);

        const cechyData = parseCSV(cechyText, ';');
        const jozkaBeautyData = parseCSV(jozkaBeautyText);
        const ziolowyOgrodData = parseCSV(ziolowyOgrodText);

        const ingredientsMap = new Map();
        [...jozkaBeautyData, ...ziolowyOgrodData].forEach(p => {
            if (p['Nazwa produktu'] && p['Skład (INCI)']) {
                ingredientsMap.set(p['Nazwa produktu'], p['Skład (INCI)']);
            }
        });

        return cechyData.map((product, index) => ({
            id: index,
            name: product['Produkt'],
            link: product['Link do produktu'],
            criteria: {
                grupaWiekowa: product['grupa wiekowa'],
                plec: product['Płeć'],
                rodzajSkory: product['Rodzaj skóry'],
                problemSkory: product['Problem skóry'],
            },
            ingredients: ingredientsMap.get(product['Produkt']) || 'Brak danych o składzie.',
        }));
    }

    /**
     * Creates the wizard configuration (steps, questions, options) from the product data.
     * @param {Array<Object>} products - The merged list of products.
     * @returns {Array<Object>} The configuration for the wizard.
     */
    function createWizardConfig(products) {
        const getUniqueOptions = (key) => Array.from(new Set(products.map(p => p.criteria[key]))).filter(Boolean);

        return [
            { question: "Dla jakiej grupy wiekowej?", propertyKey: "grupaWiekowa", options: getUniqueOptions("grupaWiekowa") },
            { question: "Dla jakiej płci?", propertyKey: "plec", options: getUniqueOptions("plec") },
            { question: "Jaki jest Twój rodzaj cery?", propertyKey: "rodzajSkory", options: getUniqueOptions("rodzajSkory") },
            { question: "Jaki jest Twój główny problem skórny?", propertyKey: "problemSkory", options: getUniqueOptions("problemSkory") },
        ];
    }

    /**
     * Renders the current step of the wizard.
     */
    function renderCurrentStep() {
        DOMElements.resultsContainer.classList.add('hidden');
        DOMElements.wizardContentContainer.classList.remove('hidden');

        const stepConfig = AppState.wizardConfig[AppState.currentStep];
        if (!stepConfig) {
            displayResults();
            return;
        }

        const optionsHtml = stepConfig.options.map(option =>
            `<button data-choice="${stepConfig.propertyKey}" data-value="${option}" class="wizard-button p-4 border rounded-lg hover:bg-[#F8F4EF] hover:border-[#A0522D] transition">${option}</button>`
        ).join('');

        DOMElements.wizardContentContainer.innerHTML = `
            <h4 class="text-2xl font-semibold text-center mb-6">${stepConfig.question}</h4>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">${optionsHtml}</div>
        `;
        renderNavigation();
    }
    
    /** Renders wizard navigation buttons (Back, Restart) */
    function renderNavigation() {
        let backButton = '';
        if (AppState.currentStep > 0) {
            backButton = `<button id="back-btn" class="text-[#A0522D] hover:underline">Wróć</button>`;
        }
        DOMElements.wizardNavigation.innerHTML = backButton;
    }

    /**
     * Filters products and displays the results.
     */
    function displayResults() {
        DOMElements.wizardContentContainer.classList.add('hidden');
        DOMElements.resultsContainer.classList.remove('hidden');

        const filteredProducts = AppState.products.filter(p => {
            return Object.entries(AppState.userChoices).every(([key, value]) => p.criteria[key] === value);
        });

        if (filteredProducts.length > 0) {
            DOMElements.resultsContainer.innerHTML = `
                <h4 class="text-2xl font-semibold text-center mb-6">Oto Twoje spersonalizowane rekomendacje:</h4>
                <div class="space-y-4">${filteredProducts.map(createProductCard).join('')}</div>`;
        } else {
            DOMElements.resultsContainer.innerHTML = '<p class="text-center text-gray-600">Przepraszamy, nie znaleziono rekomendacji dla tego połączenia. Spróbuj ponownie.</p>';
        }
        
        DOMElements.wizardNavigation.innerHTML = `<button id="restart-btn" class="w-full bg-[#A0522D] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#8B4513] transition">Zacznij od nowa</button>`;
    }

    /**
     * Generates the HTML for a single product card.
     * @param {Object} product - The product object.
     * @returns {string} HTML string for the product card.
     */
    function createProductCard(product) {
        const linkButton = product.link
            ? `<a href="${product.link}" target="_blank" rel="noopener noreferrer" class="text-sm bg-[#6B5B4B] text-white py-1 px-3 rounded hover:bg-[#3D3A37] transition">Zobacz produkt</a>`
            : '';
        return `
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 text-left">
                <h5 class="font-bold text-lg">${product.name}</h5>
                <div class="flex flex-wrap gap-2 mt-3">
                    <button data-action="ingredients" data-id="${product.id}" class="text-sm bg-[#A0522D] text-white py-1 px-3 rounded hover:bg-[#8B4513] transition">Zobacz skład</button>
                    ${linkButton}
                </div>
            </div>`;
    }
    
    function resetWizard() {
        AppState.currentStep = 0;
        AppState.userChoices = {};
        renderCurrentStep();
    }

    // --- Event Handlers ---
    
    function handleWizardInteraction(e) {
        const choiceButton = e.target.closest('[data-choice]');
        const backButton = e.target.closest('#back-btn');
        const restartButton = e.target.closest('#restart-btn');
        const actionButton = e.target.closest('[data-action]');

        if (choiceButton) {
            const { choice, value } = choiceButton.dataset;
            AppState.userChoices[choice] = value;
            AppState.currentStep++;
            renderCurrentStep();
        } else if (backButton) {
            AppState.currentStep--;
            // Remove the last choice
            const lastChoiceKey = AppState.wizardConfig[AppState.currentStep].propertyKey;
            delete AppState.userChoices[lastChoiceKey];
            renderCurrentStep();
        } else if (restartButton) {
            resetWizard();
        } else if (actionButton) {
            const { action, id } = actionButton.dataset;
            const product = AppState.products.find(p => p.id == id);
            if (!product) return;

            if (action === 'ingredients') {
                openModal(`Skład INCI: ${product.name}`, product.ingredients.replace(/, /g, '\n'));
            }
        }
    }

    // --- Modal Functions ---
    function openModal(title, content) {
        DOMElements.modalTitle.innerText = title;
        DOMElements.modalBody.innerHTML = content;
        DOMElements.modal.classList.remove('hidden');
        DOMElements.modal.classList.add('flex');
        setTimeout(() => {
            DOMElements.modalBackdrop.style.opacity = '1';
            DOMElements.modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);
    }

    function closeModal() {
        DOMElements.modalBackdrop.style.opacity = '0';
        DOMElements.modal.querySelector('.modal-content').style.transform = 'scale(0.95)';
        setTimeout(() => {
            DOMElements.modal.classList.add('hidden');
            DOMElements.modal.classList.remove('flex');
        }, 300);
    }
    
    /**
     * Initializes the application.
     */
    async function init() {
        DOMElements.wizardContentContainer.innerHTML = `<p class="text-center">Ładowanie kreatora...</p>`;
        try {
            const mergedData = await loadAndMergeData();
            AppState.products = mergedData;
            AppState.wizardConfig = createWizardConfig(mergedData);
            
            DOMElements.wizard.addEventListener('click', handleWizardInteraction);
            DOMElements.closeModalBtn.addEventListener('click', closeModal);
            DOMElements.modalBackdrop.addEventListener('click', closeModal);
            
            renderCurrentStep();
        } catch (error) {
            console.error("Initialization failed:", error);
            DOMElements.wizardContentContainer.innerHTML = `<p class="text-center text-red-500">Wystąpił błąd podczas ładowania danych. Spróbuj odświeżyć stronę.</p>`;
        }
    }

    init();
});
