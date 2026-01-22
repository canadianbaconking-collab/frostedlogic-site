// EnvCheck JavaScript Application

// Function to handle file uploads
function handleFileUpload(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            parseEnvVariables(event.target.result);
        };
        reader.readAsText(file);
    }
}

// Function to parse environment variables from text
function parseEnvVariables(data) {
    const lines = data.split('\n');
    const envVariables = {};
    lines.forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            envVariables[key.trim()] = value.trim();
        }
    });
    console.log(envVariables);
    // Call function to compare and filter if necessary
    compareAndFilterEnv(envVariables);
}

// Function to compare and filter environment variables
function compareAndFilterEnv(envVariables) {
    // Implement filtering logic as required
    const filteredVars = Object.keys(envVariables).filter(key => {
        // For example, filtering out sensitive variables
        return !key.startsWith('SECRET_');
    });
    console.log('Filtered Variables:', filteredVars);
    // Optionally, call function to export filtered variables
    exportEnvVariables(filteredVars);
}

// Function to export environment variables
function exportEnvVariables(filteredVars) {
    const content = JSON.stringify(filteredVars, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'filtered_env_variables.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Example usage: Bind the upload function to an input element
document.getElementById('file-input').addEventListener('change', function() {
    handleFileUpload(this);
});