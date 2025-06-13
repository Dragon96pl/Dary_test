/**
 * @file Main application script for the Holistic Cosmetics Selector.
 * @description This script handles all page interactivity, including the dynamic wizard,
 * the AI creator simulation, and mobile navigation. It uses a pre-compiled database
 * from database.js.
 */
document.addEventListener('DOMContentLoaded', () => {

    if (typeof productsData === 'undefined' || !Array.isArray(productsData)) {
        console.error("Baza danych (productsData w database.js) nie została załadowana lub ma nieprawidłowy format! Upewnij się, że plik database.js jest dołączony w index.html PRZED main.js i zawiera tablicę 'productsData'.");
        const wizardContainer = document.getElementById('wizard-content-container');
        if (wizardContainer) {
            wizardContainer.innerHTML = `<p class="text-center text-red-500">Błąd krytyczny: Brak lub nieprawidłowa baza danych.</p>`;
        }
        return;
    }

    const AppState = {
        products: productsData,
        wizardStepsConfig: [],
        currentWizardStepIndex: 0,
        userChoices: {},
        currentFilteredProducts: [...productsData],
        aiCreatorRecipes: {
            krem_hialuronowa_vitC_retinol: "Wygenerowana Receptura (Krem):\n- Baza hialuronowa: 75%\n- Witamina C (stabilna forma): 10%\n- Retinol (0.5%): 5%\n- Skwalan (emolient): 5%\n- Gliceryna (humektant): 4%\n- Konserwant naturalny: 1%",
            krem_hialuronowa_vitC: "Wygenerowana Receptura (Krem):\n- Baza hialuronowa: 80%\n- Witamina C (stabilna forma): 15%\n- Gliceryna (humektant): 4%\n- Konserwant naturalny: 1%",
            krem_aloesowa_niacynamid: "Wygenerowana Receptura (Krem):\n- Baza aloesowa: 85%\n- Niacynamid: 5%\n- Pantenol (łagodzenie): 5%\n- Konserwant naturalny: 1%\n- Olejek lawendowy (zapach): 0.5%",
            szampon_lipidowa_vitC_retinol: "Wygenerowana Receptura (Szampon):\n- Baza lipidowa (delikatne surfaktanty): 60%\n- Witamina C (dla skóry głowy): 2%\n- Retinol (stymulacja mieszków): 0.2%\n- Ekstrakt z pokrzywy: 5%\n- Pantenol: 3%\n- Woda destylowana: do 100%\n- Konserwant: 1%",
            szampon_hialuronowa_niacynamid: "Wygenerowana Receptura (Szampon):\n- Baza hialuronowa (nawilżające surfaktanty): 50%\n- Niacynamid (dla skóry głowy): 3%\n- Keratyna hydrolizowana: 2%\n- Gliceryna: 5%\n- Woda destylowana: do 100%\n- Konserwant: 1%",
            default_krem: "Wygenerowana Receptura (Krem):\n- Wybrana baza: 80%\n- Wybrane składniki aktywne: 15%\n- Humektanty i emolienty: 4%\n- Konserwant: 1%",
            default_szampon: "Wygenerowana Receptura (Szampon):\n- Wybrana baza (surfaktanty): 60%\n- Wybrane składniki aktywne: 5%\n- Substancje kondycjonujące: 5%\n- Woda: do 100%\n- Konserwant: 1%"
        }
    };

    const DOMElements = {
        mobileMenuButton: document.getElementById('mobile-menu-button'),
        mobileMenu: document.getElementById('mobile-menu'),
        wizard: document.getElementById('wizard'),
        wizardContentContainer: document.getElementById('wizard-content-container'),
        resultsContainer: document.getElementById('results-container'),
        wizardNavigation: document.getElementById('wizard-navigation'),
        modal: document.getElementById('modal'),
        modalTitle: document.getElementById('modal-title'),
        modalBody: document.getElementById('modal-body'),
        closeModalBtn: document.getElementById('close-modal'),
        modalBackdrop: document.querySelector('.modal-backdrop'),
        generateFormulaBtn: document.getElementById('generate-formula'),
        baseSelect: document.getElementById('base'),
        activeIngredientsContainer: document.createElement('div'),
        productTypeSelect: document.getElementById('product-type-ai'),
        formulaOutput: document.getElementById('formula-output'),
        formulaText: document.getElementById('formula-text'),
    };

    // --- Logika Kreatora (Wizard) ---
    function getUniqueOptionsFromCriteriaArray(products, key) {
        const allOptions = products.flatMap(p => p.criteria[key] || []);
        return Array.from(new Set(allOptions)).filter(Boolean).sort();
    }
    
    function getUniqueOptionsFromArray(products, key) {
        const allOptions = products.flatMap(p => p[key] || []);
        return Array.from(new Set(allOptions)).filter(Boolean).sort();
    }


    function initWizardConfig() {
        AppState.wizardStepsConfig = [
            {
                id: 'grupaWiekowa',
                question: "Dla jakiej grupy wiekowej szukasz produktu?",
                getOptions: () => {
                    const hasDorosly = AppState.products.some(p => p.criteria.grupaWiekowa.includes("Dorosły"));
                    const hasDziecko = AppState.products.some(p => p.criteria.grupaWiekowa.includes("Dziecko"));
                    
                    let options = [];
                    if (hasDorosly) options.push("Dorosły");
                    if (hasDziecko) options.push("Dziecko");
                    options.push("Wszystkie"); 
                    return options.sort();
                },
                filterLogic: (product, choice) => {
                    if (choice === "Wszystkie") return true;
                    return product.criteria.grupaWiekowa.includes(choice);
                }
            },
            {
                id: 'obszarCiala',
                question: "Dla jakiego obszaru ciała?",
                getOptions: (filteredProducts) => getUniqueOptionsFromCriteriaArray(filteredProducts, 'obszarCiala'),
                filterLogic: (product, choice) => product.criteria.obszarCiala.includes(choice)
            },
            {
                id: 'dzialanieZastosowanie',
                question: "Jakie działanie lub zastosowanie Cię interesuje?",
                getOptions: (filteredProducts) => {
                    const dzialania = getUniqueOptionsFromCriteriaArray(filteredProducts, 'dzialanie');
                    const zastosowania = getUniqueOptionsFromCriteriaArray(filteredProducts, 'zastosowanie');
                    return Array.from(new Set([...dzialania, ...zastosowania])).sort();
                },
                filterLogic: (product, choice) => 
                    (product.criteria.dzialanie && product.criteria.dzialanie.includes(choice)) || 
                    (product.criteria.zastosowanie && product.criteria.zastosowanie.includes(choice))
            },
            {
                id: 'chceSkladnik',
                question: "Czy chcesz wybrać konkretny składnik aktywny?",
                type: 'boolean',
                options: ["Tak", "Nie"] 
            },
            {
                id: 'mainIngredients',
                question: "Wybierz główny składnik:",
                getOptions: (filteredProducts) => getUniqueOptionsFromArray(filteredProducts, 'mainIngredients'),
                filterLogic: (product, choice) => product.mainIngredients.includes(choice),
                dependsOn: { stepId: 'chceSkladnik', value: 'Tak' }
            }
        ];
    }

    function applyFilters() {
        let products = [...AppState.products];
        for (const key in AppState.userChoices) {
            const choice = AppState.userChoices[key];
            const stepConfig = AppState.wizardStepsConfig.find(s => s.id === key);

            if (stepConfig && stepConfig.filterLogic) {
                if (key === 'chceSkladnik' && choice === 'Nie') {
                    continue;
                }
                products = products.filter(p => stepConfig.filterLogic(p, choice));
            }
        }
        AppState.currentFilteredProducts = products;
        return products;
    }


    function renderCurrentWizardStep() {
        DOMElements.resultsContainer.classList.add('hidden');
        DOMElements.wizardContentContainer.classList.remove('hidden');

        const stepConfig = AppState.wizardStepsConfig[AppState.currentWizardStepIndex];

        if (!stepConfig) {
            displayResults();
            return;
        }

        if (stepConfig.dependsOn) {
            const dependingStepChoice = AppState.userChoices[stepConfig.dependsOn.stepId];
            if (dependingStepChoice !== stepConfig.dependsOn.value) {
                AppState.currentWizardStepIndex++; 
                renderCurrentWizardStep();
                return;
            }
        }
        
        let options;
        if (stepConfig.type === 'boolean') {
            options = stepConfig.options;
        } else {
            let productsForOptions = [...AppState.products];
            for(let i = 0; i < AppState.currentWizardStepIndex; i++) {
                const prevStepConfig = AppState.wizardStepsConfig[i];
                const prevChoice = AppState.userChoices[prevStepConfig.id];
                if (prevChoice && prevStepConfig.filterLogic) {
                    if (prevStepConfig.id === 'chceSkladnik' && prevChoice === 'Nie') continue;
                     productsForOptions = productsForOptions.filter(p => prevStepConfig.filterLogic(p, prevChoice));
                }
            }
            options = stepConfig.getOptions(productsForOptions);
        }


        if (!options || options.length === 0) {
            displayResults();
            return;
        }

        const optionsHtml = options.map(option =>
            `<button data-step-id="${stepConfig.id}" data-value="${option}" class="wizard-button p-4 border rounded-lg hover:bg-[#F8F4EF] hover:border-[#A0522D] transition">${option}</button>`
        ).join('');

        DOMElements.wizardContentContainer.innerHTML = `
            <h4 class="text-2xl font-semibold text-center mb-6">${stepConfig.question}</h4>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">${optionsHtml}</div>
        `;
        renderWizardNavigation();
    }

    function renderWizardNavigation() {
        const backButton = AppState.currentWizardStepIndex > 0 ? `<button id="back-btn" class="text-[#A0522D] hover:underline">Wróć</button>` : '<div class="w-16"></div>'; // Placeholder for alignment
        const restartButtonOnResults = DOMElements.resultsContainer.classList.contains('hidden') ? '' : `<button id="restart-btn" class="bg-[#A0522D] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#8B4513] transition">Zacznij od nowa</button>`;
        
        if (DOMElements.resultsContainer.classList.contains('hidden')) {
             DOMElements.wizardNavigation.innerHTML = `
                ${backButton}
                <div class="text-xs text-gray-500">Krok ${AppState.currentWizardStepIndex + 1} z ${AppState.wizardStepsConfig.filter(s => !s.dependsOn || AppState.userChoices[s.dependsOn.stepId] === s.dependsOn.value).length}</div>
                <div class="w-16"></div> <!-- Placeholder for alignment -->
            `;
        } else {
             DOMElements.wizardNavigation.innerHTML = restartButtonOnResults;
        }
    }

    function displayResults() {
        DOMElements.wizardContentContainer.classList.add('hidden');
        DOMElements.resultsContainer.classList.remove('hidden');

        const finalFilteredProducts = applyFilters();
        
        const uniqueProducts = Array.from(new Map(finalFilteredProducts.map(p => [p.id, p])).values());

        DOMElements.resultsContainer.innerHTML = uniqueProducts.length > 0
            ? `<h4 class="text-2xl font-semibold text-center mb-6">Oto Twoje spersonalizowane rekomendacje:</h4>
               <div class="space-y-4">${uniqueProducts.map(createProductCardHTML).join('')}</div>`
            : '<p class="text-center text-gray-600">Przepraszamy, nie znaleziono rekomendacji dla tego połączenia. Spróbuj ponownie, wybierając mniej kryteriów lub inną kombinację.</p>';
        
        renderWizardNavigation();
    }

    function createProductCardHTML(product) {
        const linkButton = product.link ? `<a href="${product.link}" target="_blank" rel="noopener noreferrer" class="text-sm bg-[#6B5B4B] text-white py-1 px-3 rounded hover:bg-[#3D3A37] transition inline-block">Zobacz produkt</a>` : '';
        const mainIngredientsHTML = product.mainIngredients && product.mainIngredients.length > 0 
            ? `<p class="text-sm mt-2"><strong class="font-medium">Składniki aktywne:</strong> ${product.mainIngredients.join(', ')}</p>` 
            : '';

        return `
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 text-left">
                <h5 class="font-bold text-lg text-[var(--primary-brand)]">${product.name}</h5>
                ${mainIngredientsHTML}
                <div class="flex flex-wrap gap-2 mt-3">
                    <button data-action="ingredients" data-id="${product.id}" class="text-sm bg-[#A0522D] text-white py-1 px-3 rounded hover:bg-[#8B4513] transition">Zobacz pełny skład</button>
                    ${linkButton}
                </div>
            </div>`;
    }
    
    function resetWizard() {
        AppState.currentWizardStepIndex = 0;
        AppState.userChoices = {};
        AppState.currentFilteredProducts = [...AppState.products];
        DOMElements.resultsContainer.classList.add('hidden');
        DOMElements.wizardContentContainer.classList.remove('hidden');
        renderCurrentWizardStep();
    }


    function toggleMobileMenu() {
        DOMElements.mobileMenu.classList.toggle('hidden');
    }

    function setupAiCreator() {
        const activeIngredientsOptions = ["Witamina C", "Retinol", "Niacynamid"];
        const container = DOMElements.activeSelect.parentElement;
        
        DOMElements.activeIngredientsContainer.className = "space-y-1";
        activeIngredientsOptions.forEach(opt => {
            const checkboxId = `ai-active-${opt.toLowerCase().replace(/\s+/g, '-')}`;
            DOMElements.activeIngredientsContainer.innerHTML += `
                <div class="flex items-center">
                    <input type="checkbox" id="${checkboxId}" name="ai_active_ingredient" value="${opt}" class="h-4 w-4 text-[#A0522D] border-gray-300 rounded focus:ring-[#A0522D] mr-2">
                    <label for="${checkboxId}" class="text-sm">${opt}</label>
                </div>
            `;
        });
        if (DOMElements.activeSelect && DOMElements.activeSelect.parentNode) {
            DOMElements.activeSelect.parentNode.replaceChild(DOMElements.activeIngredientsContainer, DOMElements.activeSelect);
        }
        if (!document.getElementById('product-type-ai')) {
            const productTypeLabel = document.createElement('label');
            productTypeLabel.htmlFor = 'product-type-ai';
            productTypeLabel.className = 'block mb-1 font-medium';
            productTypeLabel.textContent = 'Wybierz typ produktu:';

            const productTypeSelectHTML = `
                <select id="product-type-ai" class="w-full p-2 border rounded-lg">
                    <option value="Krem">Krem</option>
                    <option value="Szampon">Szampon do włosów</option>
                </select>
            `;
            const div = document.createElement('div');
            div.appendChild(productTypeLabel);
            div.innerHTML += productTypeSelectHTML;
            
            DOMElements.generateFormulaBtn.parentNode.insertBefore(div, DOMElements.generateFormulaBtn.previousSibling.previousSibling);
        }
         DOMElements.productTypeSelect = document.getElementById('product-type-ai');
    }


    function generateAiFormula() {
        const base = DOMElements.baseSelect.value;
        const selectedActiveCheckboxes = Array.from(DOMElements.activeIngredientsContainer.querySelectorAll('input[name="ai_active_ingredient"]:checked'));
        
        if (selectedActiveCheckboxes.length > 2) {
            alert("Możesz wybrać maksymalnie 2 składniki aktywne.");
            return;
        }
        const activeIngredients = selectedActiveCheckboxes.map(cb => cb.value);
        const productType = DOMElements.productTypeSelect.value;

        DOMElements.formulaText.value = `GENEROWANIE RECEPTURY...\nTyp: ${productType}\nBaza: ${base}\nSkładniki Aktywne: ${activeIngredients.join(', ') || 'brak'}\nProporcje: SI analizuje...`;
        DOMElements.formulaOutput.classList.remove('hidden');

        setTimeout(() => {
            let recipeKey = `${productType.toLowerCase()}_${base.toLowerCase().split(' ')[0]}`;
            if (activeIngredients.length > 0) {
                 recipeKey += `_${activeIngredients.join('_').toLowerCase().replace(/\s+/g, '-')}`;
            }
           
            let recipe = AppState.aiCreatorRecipes[recipeKey];

            if (!recipe) {
                recipe = productType === 'Krem' ? AppState.aiCreatorRecipes.default_krem : AppState.aiCreatorRecipes.default_szampon;
                recipe = recipe.replace('Wybrana baza', base);
                recipe = recipe.replace('Wybrane składniki aktywne', activeIngredients.join(' + ') || 'podstawowe');
            }
            
            DOMElements.formulaText.value = recipe;
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
    function initApp() {
        initWizardConfig();
        renderCurrentWizardStep();
        setupAiCreator();

        // Event Listeners dla Kreatora (Wizard)
        DOMElements.wizard.addEventListener('click', (e) => {
            const choiceButton = e.target.closest('button[data-step-id]');
            const backButton = e.target.closest('#back-btn');
            const restartButton = e.target.closest('#restart-btn');
            const actionButton = e.target.closest('button[data-action]');

            if (choiceButton) {
                const { stepId, value } = choiceButton.dataset;
                AppState.userChoices[stepId] = value;
                

                if (stepId === 'chceSkladnik' && value === 'Nie' && AppState.wizardStepsConfig[AppState.currentWizardStepIndex + 1]?.id === 'mainIngredients') {
                     AppState.currentWizardStepIndex += 2;
                } else {
                    AppState.currentWizardStepIndex++;
                }
                renderCurrentWizardStep();
            } else if (backButton) {
                AppState.currentWizardStepIndex--;
                const stepToClear = AppState.wizardStepsConfig[AppState.currentWizardStepIndex];
                if (stepToClear) {
                    delete AppState.userChoices[stepToClear.id];
                    if (AppState.wizardStepsConfig[AppState.currentWizardStepIndex + 1]?.id === 'mainIngredients') {
                        delete AppState.userChoices['mainIngredients'];
                    }
                }
                renderCurrentWizardStep();
            } else if (restartButton) {
                resetWizard();
            } else if (actionButton) {
                const { action, id } = actionButton.dataset;
                const product = AppState.products.find(p => p.id == id);
                if (product && action === 'ingredients') {
                    const formattedIngredients = product.ingredients.replace(/, /g, ',\n');
                    openModal(`Skład INCI: ${product.name}`, formattedIngredients);
                }
            }
        });

        // Pozostałe listenery
        DOMElements.closeModalBtn.addEventListener('click', closeModal);
        DOMElements.modalBackdrop.addEventListener('click', closeModal);
        DOMElements.mobileMenuButton.addEventListener('click', toggleMobileMenu);
        DOMElements.mobileMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') toggleMobileMenu();
        });
        DOMElements.generateFormulaBtn.addEventListener('click', generateAiFormula);
    }

    initApp();
});
