document.getElementById('calculate-btn').addEventListener('click', function () {
    const projectName = document.getElementById('project-name').value;
    const bridgeType = document.getElementById('bridge-type').value;
    const carbonFootprint = parseFloat(document.getElementById('carbon-footprint').value);
    const functionalArea = parseFloat(document.getElementById('functional-area').value);
    const calculationLink = document.getElementById('calculation-link').value;

    document.getElementById('project-title').textContent = projectName || 'Project name';
    document.getElementById('bridge-type-display').textContent = bridgeType ? bridgeType : 'Bridge type';

    if (calculationLink) {
        document.getElementById('calculation-link-display').textContent = calculationLink;
        document.getElementById('calculation-link-display').href = calculationLink;
    } else {
        document.getElementById('calculation-link-display').textContent = 'https://daveforni.github.io/scorbs/';
        document.getElementById('calculation-link-display').href = '#';
    }

    if (!isNaN(carbonFootprint) && !isNaN(functionalArea) && functionalArea > 0) {
        const carbonImpact = Math.round(carbonFootprint / functionalArea);

        let carbonClass = '';
        let shapeTopPosition = 0;
        if (carbonImpact < 250) {
            carbonClass = 'A++';
            shapeTopPosition = 2.5;
        } else if (carbonImpact >= 250 && carbonImpact < 500) {
            carbonClass = 'A+';
            shapeTopPosition = 2.5;
        } else if (carbonImpact >= 500 && carbonImpact < 1000) {
            carbonClass = 'A';
            shapeTopPosition = 37.5;
        } else if (carbonImpact >= 1000 && carbonImpact < 1500) {
            carbonClass = 'B';
            shapeTopPosition = 72.5;
        } else if (carbonImpact >= 1500 && carbonImpact < 2000) {
            carbonClass = 'C';
            shapeTopPosition = 107.5;
        } else if (carbonImpact >= 2000 && carbonImpact < 2500) {
            carbonClass = 'D';
            shapeTopPosition = 142.5;
        } else if (carbonImpact >= 2500 && carbonImpact < 3000) {
            carbonClass = 'E';
            shapeTopPosition = 177.5;
        } else if (carbonImpact >= 3000 && carbonImpact < 3500) {
            carbonClass = 'F';
            shapeTopPosition = 212.5;
        } else {
            carbonClass = 'G';
            shapeTopPosition = 247.5;
        }

        const existingShape = document.getElementById('carbon-class-shape');
        const existingResult = document.getElementById('calculation-result-text');
        if (existingShape) {
            existingShape.remove();
        }
        if (existingResult) {
            existingResult.remove();
        }

        const newShape = document.createElement('div');
        newShape.id = 'carbon-class-shape';
        newShape.className = 'bar black-shape';
        newShape.style.top = `${shapeTopPosition}px`;
        newShape.textContent = carbonClass;

        const resultText = document.createElement('div');
        resultText.id = 'calculation-result-text';
        resultText.className = 'calculation-result';
        resultText.textContent = `${carbonImpact} kgCO₂e/m²`;

        const blackShapeHeight = 30;
        const gap = 5;
        resultText.style.top = `${shapeTopPosition + blackShapeHeight + gap}px`;

        const carbonRatingContainer = document.querySelector('.carbon-rating');
        carbonRatingContainer.appendChild(newShape);
        carbonRatingContainer.appendChild(resultText);

    }
});

document.getElementById('download-btn').addEventListener('click', function () {
    html2canvas(document.querySelector('.container')).then(canvas => {

        const img = canvas.toDataURL("image/png");

        const link = document.createElement('a');
        link.href = img;
        link.download = 'scorecard.png';
        link.click();
    });
});

document.getElementById('print-btn').addEventListener('click', function () {
    html2canvas(document.querySelector('.container')).then(canvas => {

        const imgData = canvas.toDataURL('image/png');

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = canvas.height * imgWidth / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 10, imgWidth, imgHeight);

        const linkUrl = document.getElementById('calculation-link-display').href;

        const linkX = 15;
        const linkY = imgHeight - 22.5;
        const linkWidth = 180;
        const linkHeight = 5;

        pdf.link(linkX, linkY, linkWidth, linkHeight, { url: linkUrl });

        pdf.save('scorecard.pdf');
    });
});
