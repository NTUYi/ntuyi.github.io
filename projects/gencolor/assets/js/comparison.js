// Comparison logic adapted from MonetGPT

// Configuration
const comparisonSamples = [
    { id: "sample201", title: "Sample 201" },
    { id: "sample258", title: "Sample 258" },
    { id: "sample480", title: "Sample 480" }
];

const methods = [
    { id: "expertc", label: "Expert C" },
    { id: "3dlut", label: "3D-LUT" },
    { id: "exposure", label: "Exposure" },
    { id: "rsfnet", label: "RSFNet" },
    { id: "icelut", label: "ICELUT" },
    { id: "dr", label: "Distort & Recover" }
];

function createComparisonRow(sample) {
    const rowWrapper = document.createElement("div");
    rowWrapper.className = "comparison-row";

    const toggleContainer = document.createElement("div");
    toggleContainer.className = "method-toggle";

    // Images Container (3 columns: Source | Method | GenColor)
    const imagesContainer = document.createElement("div");
    imagesContainer.className = "comparison-images-three";

    // 1. Source
    const sourceContainer = document.createElement("div");
    sourceContainer.className = "image-container";
    const sourceLabel = document.createElement("div");
    sourceLabel.className = "image-label";
    sourceLabel.textContent = "Input";
    const sourceImg = document.createElement("img");
    sourceImg.src = `./assets/images/comparison/${sample.id}/source.png`;
    sourceImg.className = "comparison-img";
    sourceContainer.appendChild(sourceLabel);
    sourceContainer.appendChild(sourceImg);

    // 2. Method (Middle)
    const methodContainer = document.createElement("div");
    methodContainer.className = "image-container";
    const methodLabel = document.createElement("div");
    methodLabel.className = "image-label";
    methodLabel.textContent = methods[0].label; // Default
    const methodImg = document.createElement("img");
    methodImg.src = `./assets/images/comparison/${sample.id}/${methods[0].id}.png`;
    methodImg.className = "comparison-img fade-in";
    methodContainer.appendChild(methodLabel);
    methodContainer.appendChild(methodImg);

    // 3. GenColor (Ours)
    const oursContainer = document.createElement("div");
    oursContainer.className = "image-container";
    const oursLabel = document.createElement("div");
    oursLabel.className = "image-label";
    oursLabel.textContent = "GenColor (Ours)";
    const oursImg = document.createElement("img");
    oursImg.src = `./assets/images/comparison/${sample.id}/gencolor.png`;
    oursImg.className = "comparison-img";
    oursContainer.appendChild(oursLabel);
    oursContainer.appendChild(oursImg);

    // Create Toggle Buttons
    methods.forEach((method, i) => {
        const btn = document.createElement("button");
        btn.textContent = method.label;
        
        btn.addEventListener("click", () => {
            // Update buttons
            toggleContainer.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");

            // Update Image with Fade
            methodImg.classList.remove("fade-in");
            methodImg.classList.add("fade-out");
            
            setTimeout(() => {
                methodImg.src = `./assets/images/comparison/${sample.id}/${method.id}.png`;
                methodImg.classList.remove("fade-out");
                methodImg.classList.add("fade-in");
                methodLabel.textContent = method.label;
            }, 200);
        });

        if (i === 0) btn.classList.add("selected");
        toggleContainer.appendChild(btn);
    });

    // Assemble
    imagesContainer.appendChild(sourceContainer);
    imagesContainer.appendChild(methodContainer);
    imagesContainer.appendChild(oursContainer);

    rowWrapper.appendChild(toggleContainer);
    rowWrapper.appendChild(imagesContainer);

    return rowWrapper;
}

function initComparisons() {
    const container = document.getElementById("comparison-section-new");
    if (!container) return;

    comparisonSamples.forEach(sample => {
        container.appendChild(createComparisonRow(sample));
    });
}

// Commercial Models Comparison
const commercialMethods = [
    { id: "gpt5_1", label: "GPT Image 1" },
    { id: "nanobanana", label: "NanoBanana" },
    { id: "nanobananna_pro", label: "NanoBanana Pro" }
];

function createCommercialComparisonRow() {
    const rowWrapper = document.createElement("div");
    rowWrapper.className = "comparison-row";

    const toggleContainer = document.createElement("div");
    toggleContainer.className = "method-toggle";

    // Images Container (3 columns: Input | Commercial | Commercial + Fusion)
    const imagesContainer = document.createElement("div");
    imagesContainer.className = "comparison-images-three";

    // 1. Input
    const inputContainer = document.createElement("div");
    inputContainer.className = "image-container";
    const inputLabel = document.createElement("div");
    inputLabel.className = "image-label";
    inputLabel.textContent = "Input";
    const inputImg = document.createElement("img");
    inputImg.src = `./assets/images/commercial/input_combined.png`;
    inputImg.className = "comparison-img";
    inputContainer.appendChild(inputLabel);
    inputContainer.appendChild(inputImg);

    // 2. Commercial Model (Middle)
    const commercialContainer = document.createElement("div");
    commercialContainer.className = "image-container";
    const commercialLabel = document.createElement("div");
    commercialLabel.className = "image-label";
    commercialLabel.textContent = commercialMethods[0].label;
    const commercialImg = document.createElement("img");
    commercialImg.src = `./assets/images/commercial/color_combined_${commercialMethods[0].id}.png`;
    commercialImg.className = "comparison-img fade-in";
    commercialContainer.appendChild(commercialLabel);
    commercialContainer.appendChild(commercialImg);

    // 3. Commercial + Stage 2 Fusion (Ours)
    const fusionContainer = document.createElement("div");
    fusionContainer.className = "image-container";
    const fusionLabel = document.createElement("div");
    fusionLabel.className = "image-label";
    fusionLabel.textContent = commercialMethods[0].label + " + GenColor";
    const fusionImg = document.createElement("img");
    fusionImg.src = `./assets/images/commercial/fusion_combined_${commercialMethods[0].id}.png`;
    fusionImg.className = "comparison-img fade-in";
    fusionContainer.appendChild(fusionLabel);
    fusionContainer.appendChild(fusionImg);

    // Create Toggle Buttons
    commercialMethods.forEach((method, i) => {
        const btn = document.createElement("button");
        btn.textContent = method.label;
        
        btn.addEventListener("click", () => {
            // Update buttons
            toggleContainer.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");

            // Update Commercial Image with Fade
            commercialImg.classList.remove("fade-in");
            commercialImg.classList.add("fade-out");
            fusionImg.classList.remove("fade-in");
            fusionImg.classList.add("fade-out");
            
            setTimeout(() => {
                commercialImg.src = `./assets/images/commercial/color_combined_${method.id}.png`;
                commercialImg.classList.remove("fade-out");
                commercialImg.classList.add("fade-in");
                commercialLabel.textContent = method.label;

                fusionImg.src = `./assets/images/commercial/fusion_combined_${method.id}.png`;
                fusionImg.classList.remove("fade-out");
                fusionImg.classList.add("fade-in");
                fusionLabel.textContent = method.label + " + GenColor";
            }, 200);
        });

        if (i === 0) btn.classList.add("selected");
        toggleContainer.appendChild(btn);
    });

    // Assemble
    imagesContainer.appendChild(inputContainer);
    imagesContainer.appendChild(commercialContainer);
    imagesContainer.appendChild(fusionContainer);

    rowWrapper.appendChild(toggleContainer);
    rowWrapper.appendChild(imagesContainer);

    return rowWrapper;
}

function initCommercialComparisons() {
    const container = document.getElementById("commercial-comparison-section");
    if (!container) return;

    container.appendChild(createCommercialComparisonRow());
}

document.addEventListener("DOMContentLoaded", () => {
    initComparisons();
    initCommercialComparisons();
});
