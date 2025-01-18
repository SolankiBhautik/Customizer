document.getElementById('activate').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: activateCustomization
        });
    });
});

document.getElementById('save').addEventListener('click', () => {
    // Save customizations (e.g., CSS, removed elements)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: saveCustomizations
        });
    });
});

document.getElementById('reset').addEventListener('click', () => {
    // Reset customizations
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: resetCustomizations
        });
    });
});


function activateCustomization() {
    document.getElementById('customizer-toolbar')?.remove();
    // Create the toolbar element
    const toolbar = document.createElement('div');
    toolbar.id = 'customizer-toolbar';

    // Add the toolbar CSS (can be external or inline styles)
    const toolbarStyle = document.createElement('style');
    toolbarStyle.textContent = `
        #customizer-toolbar {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            z-index: 9999;
        }
        #customizer-toolbar button {
            background: none;
            border: 1px solid #fff;
            color: white;
            padding: 5px 15px;
            cursor: pointer;
        }
        #customizer-toolbar button:hover {
            background-color: #444;
        }
    `;
    document.head.appendChild(toolbarStyle);

    // Add the toolbar buttons
    const buttons = [
        { id: 'textColor', label: 'Text Color' },
        { id: 'backgroundColor', label: 'Background Color' },
        { id: 'moveElement', label: 'Move' },
        { id: 'hideElement', label: 'Hide' },
        { id: 'cssEditor', label: 'CSS' }
    ];

    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.id = button.id;
        btn.textContent = button.label;
        btn.addEventListener('click', () => handleToolbarAction(button.id));
        toolbar.appendChild(btn);
    });

    // Append the toolbar to the body
    document.body.appendChild(toolbar);

    function handleToolbarAction(action) {
        switch (action) {
            case 'textColor':
                changeTextColor();
                break;
            case 'backgroundColor':
                changeBackgroundColor();
                break;
            case 'moveElement':
                enableMoveMode();
                break;
            case 'hideElement':
                enableHideMode();
                break;
            case 'cssEditor':
                openCSSEditor();
                break;
            default:
                console.log(`Unknown action: ${action}`);
        }
        function changeTextColor() {
            const color = prompt("Enter text color (e.g., 'red', '#ff0000')");
            document.body.style.color = color;
        }

        function changeBackgroundColor() {
            const color = prompt("Enter background color (e.g., 'blue', '#00f')");
            document.body.style.backgroundColor = color;
        }

        function enableMoveMode() {
            // Enable dragging of elements on the page
            alert('Click and drag elements to move them around!');
        }

        function enableHideMode() {
            // Delay adding the event listener slightly for better UX
            setTimeout(() => document.addEventListener('click', hideElementOnClick), 100);

            // Add hover effect for better element selection
            function addHoverEffect(event) {
                event.target.style.outline = "3px solid blue";
                event.target.style.cursor = "pointer"; // Indicate it's clickable
            }

            function removeHoverEffect(event) {
                event.target.style.outline = ""; // Reset outline
                event.target.style.cursor = ""; // Reset cursor
            }

            // Add a click event listener to the document
            function hideElementOnClick(event) {
                // Prevent the default action and event bubbling
                event.preventDefault();
                event.stopPropagation();

                // Confirm with the user before hiding the element
                const confirmHide = confirm("Do you want to hide this element?");
                if (confirmHide) {
                    event.target.style.display = "none";
                }
            }

            // Add an 'Esc' key listener to disable hide mode
            function disableHideMode(event) {
                if (event.key === "Escape") {
                    // Remove the event listener for hiding elements
                    document.removeEventListener('click', hideElementOnClick);

                    // Remove the hover effect listeners
                    document.removeEventListener('mouseover', addHoverEffect);
                    document.removeEventListener('mouseout', removeHoverEffect);

                    // Remove the keydown event listener
                    document.removeEventListener('keydown', disableHideMode);

                    // Inform the user
                    alert("Hide mode disabled.");
                }
            }

            // Add event listeners for hover effect
            document.addEventListener('mouseover', addHoverEffect);
            document.addEventListener('mouseout', removeHoverEffect);

            // Add a keydown event listener for 'Esc' key
            document.addEventListener('keydown', disableHideMode);
        }

        function openCSSEditor() {
            // Open a simple CSS editor to modify page styles
            const newCSS = prompt("Enter CSS to apply (e.g., 'body { font-size: 20px; }')");
            const styleSheet = document.createElement("style");
            styleSheet.innerText = newCSS;
            document.head.appendChild(styleSheet);
        }
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





