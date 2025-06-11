/**
 * @file Main application script for the Holistic Cosmetics Selector.
 * @description This script handles all page interactivity, including the dynamic wizard,
 * the AI creator simulation, and mobile navigation. It uses a pre-compiled database
 * from database.js.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- Sprawdzenie kluczowej zależności ---
    if (typeof productsData === 'undefined') {
        console.error("Baza danych (database.js) nie została załadowana! Upewnij się, że plik database.js jest dołączony w index.html PRZED main.js.");
        const wizardContainer = document.getElementById('wizard-content-container');
        if(wizardContainer) {
            wizardContainer.innerHTML = `<p class="text-center text-red-500">Błąd krytyczny: Brak bazy danych.</p>`;
        }
        return; // Zatrzymujemy działanie skryptu, jeśli nie ma danych
    }

    // --- Stan Aplikacji i Elementy DOM ---
    const AppState = {
        products: productsData,
        wizardConfig: [],
        currentStep: 0,
        userChoices: {},
    };

    const DOMElements = {
        // Nawigacja
        mobileMenuButton: document.getElementById('mobile-menu-button'),
        mobileMenu: document.getElementById('mobile-menu'),

        // Interaktywne Demo (Wizard)
        wizard: document.getElementById('wizard'),
        wizardContentContainer: document.getElementById('wizard-content-container'),
        resultsContainer: document.getElementById('results-container'),
        wizardNavigation: document.getElementById('wizard-navigation'),
        
        // Modal
        modal: document.getElementById('modal'),
        modalTitle: document.getElementById('modal-title'),
        modalBody: document.getElementById('modal-body'),
        closeModalBtn: document.getElementById('close-modal'),
        modalBackdrop: document.querySelector('.modal-backdrop'),

        // Kreator AI
        generateFormulaBtn: document.getElementById('generate-formula'),
        baseSelect: document.getElementById('base'),
        activeSelect: document.getElementById('active'),
        formulaOutput: document.getElementById('formula-output'),
        formulaText: document.getElementById('formula-text'),
    };

    // --- Logika Kreatora (Wizard) ---

    function createWizardConfig(products) {
        const getUniqueOptions = (key) => Array.from(new Set(products.map(p => p.criteria[key]))).filter(Boolean);

        return [
            { question: "Dla jakiej grupy wiekowej?", propertyKey: "grupaWiekowa", options: getUniqueOptions("grupaWiekowa") },
            { question: "Dla jakiej płci?", propertyKey: "plec", options: getUniqueOptions("plec") },
            { question: "Jaki jest Twój rodzaj cery?", propertyKey: "rodzajSkory", options: getUniqueOptions("rodzajSkory") },
            { question: "Jaki jest Twój główny problem skórny?", propertyKey: "problemSkory", options: getUniqueOptions("problemSkory") },
        ].filter(step => step.options.length > 0);
    }

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
    
    function renderNavigation() {
        const backButton = AppState.currentStep > 0 ? `<button id="back-btn" class="text-[#A0522D] hover:underline">Wróć</button>` : '';
        DOMElements.wizardNavigation.innerHTML = backButton;
    }

    function displayResults() {
        DOMElements.wizardContentContainer.classList.add('hidden');
        DOMElements.resultsContainer.classList.remove('hidden');

        const filteredProducts = AppState.products.filter(p => 
            Object.entries(AppState.userChoices).every(([key, value]) => p.criteria[key] === value)
        );
        
        const uniqueProducts = Array.from(new Map(filteredProducts.map(p => [p.name, p])).values());

        DOMElements.resultsContainer.innerHTML = uniqueProducts.length > 0
            ? `<h4 class="text-2xl font-semibold text-center mb-6">Oto Twoje spersonalizowane rekomendacje:</h4>
               <div class="space-y-4">${uniqueProducts.map(createProductCard).join('')}</div>`
            : '<p class="text-center text-gray-600">Przepraszamy, nie znaleziono rekomendacji dla tego połączenia. Spróbuj ponownie.</p>';
        
        DOMElements.wizardNavigation.innerHTML = `<button id="restart-btn" class="w-full bg-[#A0522D] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#8B4513] transition">Zacznij od nowa</button>`;
    }

    function createProductCard(product) {
        const linkButton = product.link ? `<a href="${product.link}" target="_blank" rel="noopener noreferrer" class="text-sm bg-[#6B5B4B] text-white py-1 px-3 rounded hover:bg-[#3D3A37] transition">Zobacz produkt</a>` : '';
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

    // --- Logika dla pozostałych sekcji ---

    function toggleMobileMenu() {
        DOMElements.mobileMenu.classList.toggle('hidden');
    }

    function generateAiFormula() {
        const base = DOMElements.baseSelect.value;
        const active = DOMElements.activeSelect.value;
        
        DOMElements.formulaText.value = `GENEROWANIE RECEPTURY...\nBaza: ${base}\nSkładnik Aktywny: ${active}\nProporcje: SI analizuje...`;
        DOMElements.formulaOutput.classList.remove('hidden');

        setTimeout(() => {
            DOMElements.formulaText.value = `Wygenerowana Receptura (Przykład):\n- ${base}: 85%\n- ${active}: 10%\n- Gliceryna (humektant): 4%\n- Konserwant naturalny: 1%`;
        }, 1500);
    }

    // --- Modal ---
    function openModal(title, content) {
        DOMElements.modalTitle.innerText = title;
        DOMElements.modalBody.innerText = content;
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
    
    // --- Główna funkcja inicjalizująca ---

    function init() {
        // Inicjalizacja Kreatora
        AppState.wizardConfig = createWizardConfig(AppState.products);
        renderCurrentStep();

        // Ustawienie wszystkich event listenerów
        DOMElements.wizard.addEventListener('click', (e) => {
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
                const lastChoiceKey = AppState.wizardConfig[AppState.currentStep].propertyKey;
                delete AppState.userChoices[lastChoiceKey];
                renderCurrentStep();
            } else if (restartButton) {
                resetWizard();
            } else if (actionButton) {
                const { action, id } = actionButton.dataset;
                const product = AppState.products.find(p => p.id == id);
                if (product && action === 'ingredients') {
                    openModal(`Skład INCI: ${product.name}`, product.ingredients.replace(/, /g, ',\n'));
                }
            }
        });

        // Listenery dla Modala
        DOMElements.closeModalBtn.addEventListener('click', closeModal);
        DOMElements.modalBackdrop.addEventListener('click', closeModal);
        
        // Listenery dla Mobilnego Menu
        DOMElements.mobileMenuButton.addEventListener('click', toggleMobileMenu);
        DOMElements.mobileMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                toggleMobileMenu();
            }
        });

        // Listener dla Kreatora AI
        DOMElements.generateFormulaBtn.addEventListener('click', generateAiFormula);
    }

    init();
});
