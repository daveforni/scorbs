document.getElementById('calculate-btn').addEventListener('click', function () {
    // Get values from input fields
    const projectName = document.getElementById('project-name').value;
    const bridgeType = document.getElementById('bridge-type').value;
    const carbonFootprint = parseFloat(document.getElementById('carbon-footprint').value);
    const functionalArea = parseFloat(document.getElementById('functional-area').value);
    const calculationLink = document.getElementById('calculation-link').value;

    // Update the project title and bridge type (keeping "Structural embodied carbon, modules A1-A5")
    document.getElementById('project-title').textContent = projectName || ''; // Default to "Project name" if empty
    document.getElementById('bridge-type-display').textContent = bridgeType ? bridgeType : '';

    // Update the calculation link in the footer
    if (calculationLink) {
        document.getElementById('calculation-link-display').textContent = calculationLink;
        document.getElementById('calculation-link-display').href = calculationLink;
    } else {
        document.getElementById('calculation-link-display').textContent = 'www.projectURL.com';
        document.getElementById('calculation-link-display').href = '#';
    }

    // Calculate the carbon impact
    if (!isNaN(carbonFootprint) && !isNaN(functionalArea) && functionalArea > 0) {
        const carbonImpact = Math.ceil(carbonFootprint / functionalArea); // Round up to the nearest integer

        // Determine the class based on the carbon impact
        let carbonClass = '';
        let shapeTopPosition = 0; // Will store the top position of the shape based on class
        if (carbonImpact < 250) {
            carbonClass = 'A++';
            shapeTopPosition = 2.5; // Position aligned to A++ bar
        } else if (carbonImpact >= 250 && carbonImpact < 500) {
            carbonClass = 'A+';
            shapeTopPosition = 2.5; // Position aligned to A+ bar
        } else if (carbonImpact >= 500 && carbonImpact < 1000) {
            carbonClass = 'A';
            shapeTopPosition = 37.5; // Position aligned to A bar
        } else if (carbonImpact >= 1000 && carbonImpact < 1500) {
            carbonClass = 'B';
            shapeTopPosition = 72.5; // Position aligned to B bar
        } else if (carbonImpact >= 1500 && carbonImpact < 2000) {
            carbonClass = 'C';
            shapeTopPosition = 107.5; // Position aligned to C bar
        } else if (carbonImpact >= 2000 && carbonImpact < 2500) {
            carbonClass = 'D';
            shapeTopPosition = 142.5; // Position aligned to D bar
        } else if (carbonImpact >= 2500 && carbonImpact < 3000) {
            carbonClass = 'E';
            shapeTopPosition = 177.5; // Position aligned to E bar
        } else if (carbonImpact >= 3000 && carbonImpact < 3500) {
            carbonClass = 'F';
            shapeTopPosition = 212.5; // Position aligned to F bar
        } else {
            carbonClass = 'G';
            shapeTopPosition = 247.5; // Position aligned to G bar
        }

        // Display the result with class
        document.getElementById('carbon-impact-display').textContent = `${carbonImpact} kgCO₂e / m², class ${carbonClass}`;

        // Remove existing black shape and result text (if any)
        const existingShape = document.getElementById('carbon-class-shape');
        const existingResult = document.getElementById('calculation-result-text');
        if (existingShape) {
            existingShape.remove();
        }
        if (existingResult) {
            existingResult.remove();
        }

        // Create the black shape
        const newShape = document.createElement('div');
        newShape.id = 'carbon-class-shape';
        newShape.className = 'bar black-shape'; // Adding the black-shape class for styling
        newShape.style.top = `${shapeTopPosition}px`; // Dynamically set top position based on class
        newShape.textContent = carbonClass; // Add the carbon class inside the black shape

        // Create the result text below the shape
        const resultText = document.createElement('div');
        resultText.id = 'calculation-result-text';
        resultText.className = 'calculation-result'; // Class for styling
        resultText.textContent = `${carbonImpact} kgCO₂e/m²`; // Show the calculation result

        // Set the result text position to be at least 10px below the black shape
        const blackShapeHeight = 30; // Black shape height is 30px
        const gap = 5; // Desired gap between black shape and result text
        resultText.style.top = `${shapeTopPosition + blackShapeHeight + gap}px`; // Set the result text 10px below the black shape

        // Append the shape and result text inside the carbon-rating container
        const carbonRatingContainer = document.querySelector('.carbon-rating');
        carbonRatingContainer.appendChild(newShape);
        carbonRatingContainer.appendChild(resultText);

    } else {
        document.getElementById('carbon-impact-display').textContent = 'Please enter valid values for carbon footprint and functional area';
    }
});
