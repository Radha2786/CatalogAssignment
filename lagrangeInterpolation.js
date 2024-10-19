const fs = require('fs');

// Step 1: Parse JSON input from the provided JSON file
function parseInput(filePath) {
    const inputData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Extract n and k values from the input
    const n = inputData.keys.n;
    const k = inputData.keys.k;

    // Decode Y values using their respective base
    function decodeValue(base, value) {
        return parseInt(value, base);
    }

    // Convert all points to (x, y) form
    const points = [];
    for (const key in inputData) {
        if (key !== "keys") {
            const x = parseInt(key);  // x is the key
            const y = decodeValue(parseInt(inputData[key].base), inputData[key].value);  // y is the decoded value
            points.push({ x, y });
        }
    }
    return { points, k };
}

// Step 2: Lagrange Interpolation to find constant term (c)
function lagrangeInterpolation(points, k) {
    // Function to calculate the Lagrange basis polynomial
    function basis(j, x) {
        let result = 1;
        for (let m = 0; m < k; m++) {
            if (m !== j) {
                result *= (x - points[m].x) / (points[j].x - points[m].x);
            }
        }
        return result;
    }

    let interpolation = 0;
    for (let j = 0; j < k; j++) {
        interpolation += points[j].y * basis(j, 0);  // We calculate f(0) to get the constant term
    }

    return interpolation;
}

// Step 3: Run Lagrange Interpolation for both test cases
function runTestCases() {
    // Test Case 1
    const testCase1 = parseInput('testCase1.json');
    const secret1 = lagrangeInterpolation(testCase1.points, testCase1.k);
    console.log("Test Case 1 - The constant term (secret) is:", Math.round(secret1));

    // Test Case 2
    const testCase2 = parseInput('testCase2.json');
    const secret2 = lagrangeInterpolation(testCase2.points, testCase2.k);
    console.log("Test Case 2 - The constant term (secret) is:", Math.round(secret2));
}

// Run both test cases
runTestCases();
