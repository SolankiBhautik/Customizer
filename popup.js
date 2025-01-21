document.getElementById('activate').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: activateCustomization
        });
    });
});

document.getElementById('save').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: saveCustomizations
        });
    });
});

document.getElementById('reset').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: resetCustomizations
        });
    });
});
function activateCustomization() {
    // Create more sophisticated HTML structure with computed styles display
    const hoverModel = `
        <div id="CustomizerHoverModel" class="customizer-panel">
            <div class="customizer-header">
                <span class="element-tag">Selected Element</span>
                <button class="close-btn">×</button>
            </div>
            <div class="customizer-content">
                <div class="styles-section">
                    <div class="section-title">Computed Style</div>
                    <div class="style-group">
                        <div class="style-row">
                            <span class="property">color</span>
                            <div class="value-container">
                                <span class="color-preview"></span>
                                <input type="text" class="style-value" data-property="color">
                                <input type="color" class="color-picker">
                            </div>
                        </div>
                        <div class="style-row">
                            <span class="property">background-color</span>
                            <div class="value-container">
                                <span class="bgcolor-preview"></span>
                                <input type="text" class="style-value" data-property="backgroundColor">
                                <input type="color" class="color-picker">
                            </div>
                        </div>
                        <div class="style-row">
                            <span class="property">font-size</span>
                            <div class="value-container">
                                <input type="text" class="style-value" data-property="fontSize">
                                <input type="range" min="8" max="72" value="16" class="size-slider">
                            </div>
                        </div>
                        <div class="style-row">
                            <span class="property">font-family</span>
                            <select class="font-select" data-property="fontFamily">
                                <option value="Arial">Arial</option>
                                <option value="Helvetica">Helvetica</option>
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Sans-serif">Sans-serif</option>
                                <option value="Serif">Serif</option>
                                <option value="Monospace">Monospace</option>
                            </select>
                        </div>
                        <div class="style-row">
                            <span class="property">font-weight</span>
                            <select class="weight-select" data-property="fontWeight">
                                <option value="normal">Normal</option>
                                <option value="bold">Bold</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="400">400</option>
                                <option value="500">500</option>
                                <option value="600">600</option>
                                <option value="700">700</option>
                                <option value="800">800</option>
                                <option value="900">900</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="actions-section">
                    <button class="action-btn" id="hideElement">Hide Element</button>
                    <button class="action-btn warning" id="deleteElement">Delete Element</button>
                </div>
            </div>
        </div>
    `;


    // Append hover model to the body
    document.body.insertAdjacentHTML('beforeend', hoverModel);

    const hoverModelElement = document.getElementById('CustomizerHoverModel');
    let modelPinned = false;
    let activeElement = null;

    // Update the display of computed styles
    function updateComputedStyles(element) {
        const computedStyle = window.getComputedStyle(element);

        // Update color preview and value
        const colorPreview = hoverModelElement.querySelector('.color-preview');
        const colorValue = hoverModelElement.querySelector('[data-property="color"]');
        colorPreview.style.backgroundColor = computedStyle.color;
        colorValue.value = computedStyle.color;

        // Update background color preview and value
        const bgColorPreview = hoverModelElement.querySelector('.bgcolor-preview');
        const bgColorValue = hoverModelElement.querySelector('[data-property="backgroundColor"]');
        bgColorPreview.style.backgroundColor = computedStyle.backgroundColor;
        bgColorValue.value = computedStyle.backgroundColor;

        // Update font size
        const fontSizeValue = hoverModelElement.querySelector('[data-property="fontSize"]');
        fontSizeValue.value = computedStyle.fontSize;

        // Update font family
        const fontFamilySelect = hoverModelElement.querySelector('[data-property="fontFamily"]');
        fontFamilySelect.value = computedStyle.fontFamily.split(',')[0].replace(/['"]/g, '');

        // Update font weight
        const fontWeightSelect = hoverModelElement.querySelector('[data-property="fontWeight"]');
        fontWeightSelect.value = computedStyle.fontWeight;
    }

    // Handle input changes
    hoverModelElement.addEventListener('input', (e) => {
        const target = e.target;
        if (!activeElement) return;

        if (target.classList.contains('style-value') ||
            target.classList.contains('font-select') ||
            target.classList.contains('weight-select') ||
            target.classList.contains('color-picker') ||
            target.classList.contains('size-slider')) {

            const property = target.dataset.property;
            if (property) {
                activeElement.style[property] = target.value;
                updateComputedStyles(activeElement);
            }
        }
    });

    // Close button functionality
    hoverModelElement.querySelector('.close-btn').addEventListener('click', () => {
        hoverModelElement.style.display = 'none';
        modelPinned = false;
        if (activeElement) {
            activeElement.classList.remove('Customizer-active');
            activeElement = null;
        }
    });

    // Mouse over functionality
    document.addEventListener('mouseover', (e) => {
        if (!modelPinned) {
            const target = e.target;
            if (target !== hoverModelElement && !hoverModelElement.contains(target)) {
                target.classList.add('Customizer-active');
                effect(e);
                updateComputedStyles(target);
            }
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (!modelPinned) {
            e.target.classList.remove('Customizer-active');
        }
    });

    // Click functionality
    document.addEventListener('click', (e) => {
        const target = e.target;

        if (target === hoverModelElement || hoverModelElement.contains(target)) {
            return;
        }

        if (target.id === 'hideElement') {
            if (activeElement) activeElement.style.display = 'none';
            return;
        }

        if (target.id === 'deleteElement') {
            if (activeElement) {
                activeElement.remove();
                hoverModelElement.style.display = 'none';
                modelPinned = false;
            }
            return;
        }

        modelPinned = !modelPinned;

        if (modelPinned) {
            activeElement = target;
            target.classList.add('Customizer-active');
            effect(e);
            updateComputedStyles(target);
        } else {
            if (activeElement) {
                activeElement.classList.remove('Customizer-active');
                activeElement = null;
            }
            hoverModelElement.style.display = 'none';
        }
    });

    // Position the hover model
    function effect(e) {
        const target = e.target;
        if (target === hoverModelElement || hoverModelElement.contains(target)) return;

        const rect = target.getBoundingClientRect();
        const modelRect = hoverModelElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        let left = rect.right + window.scrollX + 8;
        let top = rect.top + window.scrollY;

        // Check right boundary
        if (left + modelRect.width > viewportWidth + window.scrollX) {
            left = rect.left + window.scrollX - modelRect.width - 8;
        }

        // Check left boundary
        if (left < window.scrollX) {
            left = rect.right + window.scrollX + 8;
        }

        // Check bottom boundary
        if (top + modelRect.height > viewportHeight + window.scrollY) {
            top = viewportHeight + window.scrollY - modelRect.height - 8;
        }

        // Check top boundary
        if (top < window.scrollY) {
            top = window.scrollY + 8;
        }

        hoverModelElement.style.left = `${left}px`;
        hoverModelElement.style.top = `${top}px`;
        hoverModelElement.style.display = 'block';
    }
}


function saveCustomizations() {
    // Save customizations (e.g., CSS styles, removed elements)
    localStorage.setItem('customStyles', JSON.stringify({ "background-color": "lightblue" })); // Example saved change
}

function resetCustomizations() {
    // Reset to original page
    localStorage.removeItem('customStyles');
    location.reload();
}
