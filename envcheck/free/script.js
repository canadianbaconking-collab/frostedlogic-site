const APP_VERSION = 'v1.0.0';

class EnvCheckTool {
    constructor() {
        this.file1Data = null;
        this.file2Data = null;
        this.file3Data = null;
        this.comparisonMode = '2file';
        this.comparison = null;
        this.currentSort = 'status';
        this.keyOnlyMode = false;
        this.filters = {
            matched: true,
            missing: true,
            mismatched: true
        };
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Mode toggle events
        document.getElementById('mode-2file').addEventListener('change', () => {
            this.switchMode('2file');
        });
        document.getElementById('mode-3file').addEventListener('change', () => {
            this.switchMode('3file');
        });

        // 2-file mode events
        const file1Area = document.getElementById('file1-area');
        const file2Area = document.getElementById('file2-area');
        const file1Input = document.getElementById('file1');
        const file2Input = document.getElementById('file2');

        file1Area.addEventListener('click', () => file1Input.click());
        file1Area.addEventListener('dragover', this.handleDragOver.bind(this));
        file1Area.addEventListener('dragleave', this.handleDragLeave.bind(this));
        file1Area.addEventListener('drop', (e) => this.handleDrop(e, 1));
        file1Input.addEventListener('change', (e) => this.handleFileSelect(e, 1));

        file2Area.addEventListener('click', () => file2Input.click());
        file2Area.addEventListener('dragover', this.handleDragOver.bind(this));
        file2Area.addEventListener('dragleave', this.handleDragLeave.bind(this));
        file2Area.addEventListener('drop', (e) => this.handleDrop(e, 2));
        file2Input.addEventListener('change', (e) => this.handleFileSelect(e, 2));

        // 3-file mode events
        const file1Area3 = document.getElementById('file1-area-3');
        const file2Area3 = document.getElementById('file2-area-3');
        const file3Area3 = document.getElementById('file3-area-3');
        const file1Input3 = document.getElementById('file1-3');
        const file2Input3 = document.getElementById('file2-3');
        const file3Input3 = document.getElementById('file3-3');

        file1Area3.addEventListener('click', () => file1Input3.click());
        file1Area3.addEventListener('dragover', this.handleDragOver.bind(this));
        file1Area3.addEventListener('dragleave', this.handleDragLeave.bind(this));
        file1Area3.addEventListener('drop', (e) => this.handleDrop(e, 1));
        file1Input3.addEventListener('change', (e) => this.handleFileSelect(e, 1));

        file2Area3.addEventListener('click', () => file2Input3.click());
        file2Area3.addEventListener('dragover', this.handleDragOver.bind(this));
        file2Area3.addEventListener('dragleave', this.handleDragLeave.bind(this));
        file2Area3.addEventListener('drop', (e) => this.handleDrop(e, 2));
        file2Input3.addEventListener('change', (e) => this.handleFileSelect(e, 2));

        file3Area3.addEventListener('click', () => file3Input3.click());
        file3Area3.addEventListener('dragover', this.handleDragOver.bind(this));
        file3Area3.addEventListener('dragleave', this.handleDragLeave.bind(this));
        file3Area3.addEventListener('drop', (e) => this.handleDrop(e, 3));
        file3Input3.addEventListener('change', (e) => this.handleFileSelect(e, 3));

        // Copy buttons
        document.getElementById('copy-missing').addEventListener('click', () => this.copyVariables('missing'));
        document.getElementById('copy-mismatched').addEventListener('click', () => this.copyVariables('mismatched'));

        // Export button
        document.getElementById('export-example').addEventListener('click', () => this.exportEnvExample());

        // Export fix patch button
        document.getElementById('export-fix-patch').addEventListener('click', () => this.exportFixPatch());

        // Filter toggles
        document.getElementById('toggle-matched').addEventListener('change', (e) => {
            this.filters.matched = e.target.checked;
            this.updateDisplay();
        });
        document.getElementById('toggle-missing').addEventListener('change', (e) => {
            this.filters.missing = e.target.checked;
            this.updateDisplay();
        });
        document.getElementById('toggle-mismatched').addEventListener('change', (e) => {
            this.filters.mismatched = e.target.checked;
            this.updateDisplay();
        });

        // Sort toggles
        document.getElementById('sort-status').addEventListener('change', () => {
            this.currentSort = 'status';
            this.updateDisplay();
        });
        document.getElementById('sort-alpha').addEventListener('change', () => {
            this.currentSort = 'alpha';
            this.updateDisplay();
        });

        // Key-only mode toggle
        document.getElementById('key-only-mode').addEventListener('change', (e) => {
            this.keyOnlyMode = e.target.checked;
            this.checkAndCompare();
        });
    }

    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
    }

    handleDrop(e, fileNumber) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processFile(files[0], fileNumber);
        }
    }

    handleFileSelect(e, fileNumber) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file, fileNumber);
        }
    }

    switchMode(mode) {
        this.comparisonMode = mode;
        this.resetAllFiles();
        
        // Hide all sections first
        document.getElementById('file-2file-section').style.display = 'none';
        document.getElementById('file-3file-section').style.display = 'none';
        document.getElementById('results').style.display = 'none';
        
        // Show relevant section
        if (mode === '2file') {
            document.getElementById('file-2file-section').style.display = 'grid';
        } else {
            document.getElementById('file-3file-section').style.display = 'grid';
        }
    }

    resetAllFiles() {
        this.file1Data = null;
        this.file2Data = null;
        this.file3Data = null;
        this.comparison = null;
        
        // Reset ALL file areas for BOTH modes
        const areaIds = ['file1-area', 'file2-area', 'file1-area-3', 'file2-area-3', 'file3-area-3'];
        areaIds.forEach(id => {
            const area = document.getElementById(id);
            const uploadText = area?.querySelector('.upload-text');
            if (area && uploadText) {
                area.classList.remove('has-file');
                uploadText.textContent = 'Drop .env file here or click to browse';
            }
        });
        
        // Reset ALL file inputs for BOTH modes
        const inputIds = ['file1', 'file2', 'file1-3', 'file2-3', 'file3-3'];
        inputIds.forEach(id => {
            const input = document.getElementById(id);
            if (input) input.value = '';
        });

        // Clear results loaded state
        const resultsSection = document.getElementById('results');
        if (resultsSection && resultsSection.dataset.loaded) {
            delete resultsSection.dataset.loaded;
        }
    }

    processFile(file, fileNumber) {
        // Accept any file - parsing validation will catch invalid format

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            const envData = this.parseEnvFile(content);
            
            if (envData === null) {
                // Parsing error occurred, reset file area
                this.resetFileArea(fileNumber);
                return;
            }
            
            if (fileNumber === 1) {
                this.file1Data = envData;
                this.updateFileArea(1, file.name);
            } else if (fileNumber === 2) {
                this.file2Data = envData;
                this.updateFileArea(2, file.name);
            } else {
                this.file3Data = envData;
                this.updateFileArea(3, file.name);
            }

            this.checkAndCompare();
        };
        reader.readAsText(file);
    }

    checkAndCompare() {
        if (this.comparisonMode === '2file' && this.file1Data && this.file2Data) {
            this.compareFiles();
        } else if (this.comparisonMode === '3file' && this.file1Data && this.file2Data && this.file3Data) {
            this.compareFiles();
        }
    }

    parseEnvFile(content) {
        const envData = {};
        const lines = content.split('\n');
        const errors = [];

        lines.forEach((line, lineNumber) => {
            const originalLine = line;
            line = line.trim();
            
            // Skip empty lines and comments
            if (!line || line.startsWith('#')) {
                return;
            }

            // Must contain at least one = separating key and value
            const equalSignIndex = line.indexOf('=');
            if (equalSignIndex === -1) {
                errors.push(`Line ${lineNumber + 1}: Missing '=' sign`);
                return;
            }

            // Extract key and value
            const key = line.substring(0, equalSignIndex).trim();
            const value = line.substring(equalSignIndex + 1);

            // Key rules: trim whitespace, case-sensitive, must be non-empty
            if (!key) {
                errors.push(`Line ${lineNumber + 1}: Empty key`);
                return;
            }

            // Check for duplicate keys
            if (envData.hasOwnProperty(key)) {
                errors.push(`Line ${lineNumber + 1}: Duplicate key '${key}'`);
                return;
            }

            // Value rules: everything after the first =, trim leading/trailing whitespace
            // Do not unquote, do not expand variables
            const trimmedValue = value.trim();

            envData[key] = trimmedValue;
        });

        if (errors.length > 0) {
            this.showParsingErrors(errors);
            return null;
        }

        return envData;
    }

    updateFileArea(fileNumber, fileName) {
        const areaId = this.comparisonMode === '3file' ? `file${fileNumber}-area-3` : `file${fileNumber}-area`;
        const area = document.getElementById(areaId);
        const uploadText = area.querySelector('.upload-text');
        
        area.classList.add('has-file');
        uploadText.textContent = `✓ ${fileName}`;
    }

    resetFileArea(fileNumber) {
        const areaId = this.comparisonMode === '3file' ? `file${fileNumber}-area-3` : `file${fileNumber}-area`;
        const inputId = this.comparisonMode === '3file' ? `file${fileNumber}-3` : `file${fileNumber}`;
        const area = document.getElementById(areaId);
        const uploadText = area.querySelector('.upload-text');
        const fileInput = document.getElementById(inputId);
        
        area.classList.remove('has-file');
        uploadText.textContent = 'Drop .env file here or click to browse';
        fileInput.value = '';
        
        if (fileNumber === 1) {
            this.file1Data = null;
        } else if (fileNumber === 2) {
            this.file2Data = null;
        } else {
            this.file3Data = null;
        }
        
        // Hide results if not enough files
        this.checkAndCompare();
        if (!this.comparison) {
            document.getElementById('results').style.display = 'none';
        }
    }

    showParsingErrors(errors) {
        const errorMessage = `Parsing errors found:\n\n${errors.join('\n')}\n\nPlease fix these issues and try again.`;
        alert(errorMessage);
    }

    copyVariables(type) {
        if (!this.comparison) return;

        const variables = [];
        
        // Build list from available file arrays based on mode
        const fileArrays = [this.comparison.file1Vars, this.comparison.file2Vars];
        if (this.comparisonMode === '3file' && this.comparison.file3Vars) {
            fileArrays.push(this.comparison.file3Vars);
        }

        fileArrays.forEach(fileVars => {
            fileVars.forEach(variable => {
                if (variable.status === type) {
                    // Skip if key already added
                    if (variables.some(v => v.startsWith(`${variable.key}=`))) {
                        return;
                    }
                    
                    let value = variable.value || '';
                    
                    // For 3-file mismatches, always use Env1 value as deterministic baseline
                    if (type === 'mismatched' && this.comparisonMode === '3file') {
                        const env1Var = this.comparison.file1Vars.find(v => v.key === variable.key);
                        if (env1Var) {
                            value = env1Var.value || '';
                        }
                    }
                    
                    variables.push(`${variable.key}=${value}`);
                }
            });
        });

        if (variables.length === 0) {
            alert(`No ${type} variables to copy.`);
            return;
        }

        const text = variables.join('\n');
        navigator.clipboard.writeText(text).then(() => {
            alert(`Copied ${variables.length} ${type} variables to clipboard.`);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Failed to copy to clipboard.');
        });
    }

    updateDisplay() {
        if (!this.comparison) return;
        this.displayResults(this.comparison);
    }

    exportEnvExample() {
        if (!this.comparison) return;

        // Get all unique keys from available files
        const allKeys = new Set();
        this.comparison.file1Vars.forEach(variable => allKeys.add(variable.key));
        this.comparison.file2Vars.forEach(variable => allKeys.add(variable.key));
        
        // Include file3 keys in 3-file mode
        if (this.comparisonMode === '3file' && this.comparison.file3Vars) {
            this.comparison.file3Vars.forEach(variable => allKeys.add(variable.key));
        }

        // Sort keys alphabetically
        const sortedKeys = Array.from(allKeys).sort();

        // Build the file content
        let content = '# Generated by EnvCheck\n';
        content += '# Values intentionally left blank\n\n';

        sortedKeys.forEach(key => {
            content += `${key}=\n`;
        });

        // Create and trigger download using Blob API
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'envcheck.env.example';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    exportFixPatch() {
        if (!this.comparison) return;

        if (this.comparisonMode === '3file') {
            alert('Fix Patch is currently only supported in 2-file mode.\n\nFor 3-file comparisons, use "Copy Missing/Mismatched" instead.');
            return;
        }

        const patchVariables = [];

        // Process File 1 variables for missing and mismatched (baseline)
        this.comparison.file1Vars.forEach(variable => {
            if ((variable.status === 'missing' || variable.status === 'mismatched') && 
                this.filters[variable.status]) {
                patchVariables.push({
                    key: variable.key,
                    value: variable.status === 'missing' ? '' : variable.value
                });
            }
        });

        // Process File 2 variables for missing (target)
        this.comparison.file2Vars.forEach(variable => {
            if (variable.status === 'missing' && 
                this.filters.missing &&
                !patchVariables.some(v => v.key === variable.key)) {
                patchVariables.push({
                    key: variable.key,
                    value: ''
                });
            }
        });

        if (patchVariables.length === 0) {
            alert('No missing or mismatched variables to export based on current filters.');
            return;
        }

        // Sort alphabetically
        patchVariables.sort((a, b) => a.key.localeCompare(b.key));

        // Build the patch content
        let content = '# Generated by EnvCheck - Fix Patch\n';
        content += '# Baseline: Environment 1 | Target: Environment 2\n';
        content += '# Apply this patch to Environment 2 to resolve differences\n\n';

        patchVariables.forEach(variable => {
            content += `${variable.key}=${variable.value}\n`;
        });

        // Create and trigger download using Blob API
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'envcheck-fix-patch.env';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    compareFiles() {
        this.comparison = this.performComparison();
        this.displayResults(this.comparison);
    }

    performComparison() {
        if (this.comparisonMode === '2file') {
            return this.perform2FileComparison();
        } else {
            return this.perform3FileComparison();
        }
    }

    perform2FileComparison() {
        const allKeys = new Set([...Object.keys(this.file1Data), ...Object.keys(this.file2Data)]);
        
        const comparison = {
            total: allKeys.size,
            missing: 0,
            mismatched: 0,
            file1Vars: [],
            file2Vars: []
        };

        allKeys.forEach(key => {
            const file1Value = this.file1Data[key];
            const file2Value = this.file2Data[key];

            // File 1 variable
            const file1Var = {
                key,
                value: file1Value,
                status: 'matched'
            };

            // File 2 variable
            const file2Var = {
                key,
                value: file2Value,
                status: 'matched'
            };

            if (file1Value === undefined) {
                file1Var.status = 'missing';
                file1Var.value = '';
                comparison.missing++;
            } else if (file2Value === undefined) {
                file2Var.status = 'missing';
                file2Var.value = '';
                comparison.missing++;
            } else if (!this.keyOnlyMode && file1Value !== file2Value) {
                // Only check for value differences if not in key-only mode
                file1Var.status = 'mismatched';
                file2Var.status = 'mismatched';
                comparison.mismatched++;
            }

            comparison.file1Vars.push(file1Var);
            comparison.file2Vars.push(file2Var);
        });

        return comparison;
    }

    perform3FileComparison() {
        const allKeys = new Set([
            ...Object.keys(this.file1Data), 
            ...Object.keys(this.file2Data), 
            ...Object.keys(this.file3Data)
        ]);
        
        const comparison = {
            total: allKeys.size,
            missing: 0,
            mismatched: 0,
            file1Vars: [],
            file2Vars: [],
            file3Vars: []
        };

        allKeys.forEach(key => {
            const file1Value = this.file1Data[key];
            const file2Value = this.file2Data[key];
            const file3Value = this.file3Data[key];

            // Create variables for each file
            const file1Var = { key, value: file1Value, status: 'matched' };
            const file2Var = { key, value: file2Value, status: 'matched' };
            const file3Var = { key, value: file3Value, status: 'matched' };

            // Check for missing keys
            const presentFiles = [file1Value, file2Value, file3Value].filter(v => v !== undefined).length;
            
            if (presentFiles === 1) {
                // Key exists in only one file - others are missing
                // Count missing KEYS (per key), not missing slots
                comparison.missing += 1;
                
                if (file1Value !== undefined) {
                    file2Var.status = 'missing';
                    file3Var.status = 'missing';
                } else if (file2Value !== undefined) {
                    file1Var.status = 'missing';
                    file3Var.status = 'missing';
                } else {
                    file1Var.status = 'missing';
                    file2Var.status = 'missing';
                }
            } else if (presentFiles === 2) {
                // Key exists in two files - one is missing
                // Count missing KEYS (per key), not missing slots
                comparison.missing += 1;
                
                if (file1Value === undefined) {
                    file1Var.status = 'missing';
                } else if (file2Value === undefined) {
                    file2Var.status = 'missing';
                } else {
                    file3Var.status = 'missing';
                }
            } else {
                // Key exists in all files - check for value mismatches
                if (!this.keyOnlyMode) {
                    const values = [file1Value, file2Value, file3Value];
                    const uniqueValues = new Set(values);
                    
                    if (uniqueValues.size > 1) {
                        file1Var.status = 'mismatched';
                        file2Var.status = 'mismatched';
                        file3Var.status = 'mismatched';
                        comparison.mismatched++;
                    }
                }
            }

            // Set empty values for missing keys
            [file1Var, file2Var, file3Var].forEach(variable => {
                if (variable.status === 'missing') {
                    variable.value = '';
                }
            });

            comparison.file1Vars.push(file1Var);
            comparison.file2Vars.push(file2Var);
            comparison.file3Vars.push(file3Var);
        });

        return comparison;
    }

    displayResults(comparison) {
        const resultsSection = document.getElementById('results');
        const totalVars = document.getElementById('total-vars');
        const missingVars = document.getElementById('missing-vars');
        const mismatchedVars = document.getElementById('mismatched-vars');

        // Update stats (always show full totals)
        totalVars.textContent = comparison.total;
        missingVars.textContent = comparison.missing;
        mismatchedVars.textContent = comparison.mismatched;

        // Clear previous results and update container
        this.updateDiffContainer();
        
        const fileColumns = document.querySelectorAll('.diff-list');
        fileColumns.forEach(column => column.innerHTML = '');

        // Get file data arrays
        const fileDataArrays = [
            comparison.file1Vars,
            comparison.file2Vars,
            comparison.file3Vars?.filter(() => this.comparisonMode === '3file') || []
        ].filter(arr => arr.length > 0);

        // Apply filters and sorting to each file
        fileDataArrays.forEach((fileVars, index) => {
            const filteredVars = fileVars.filter(variable => 
                this.filters[variable.status]
            );

            let sortedVars;
            if (this.currentSort === 'alpha') {
                sortedVars = [...filteredVars].sort((a, b) => a.key.localeCompare(b.key));
            } else {
                // Stable status sorting: status group first, then alphabetical within each group
                const sortByStatusAndAlpha = (a, b) => {
                    const statusOrder = { missing: 0, mismatched: 1, matched: 2 };
                    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
                    if (statusDiff !== 0) return statusDiff;
                    // Same status: sort alphabetically
                    return a.key.localeCompare(b.key);
                };
                sortedVars = [...filteredVars].sort(sortByStatusAndAlpha);
            }

            // Display variables in corresponding column
            if (sortedVars.length === 0) {
                // Show empty state message
                const emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                emptyState.textContent = 'No variables match current filters.';
                fileColumns[index].appendChild(emptyState);
            } else {
                sortedVars.forEach(variable => {
                    const item = this.createVariableItem(variable);
                    fileColumns[index].appendChild(item);
                });
            }
        });

        // Show results section
        resultsSection.style.display = 'block';
        
        // Scroll to results smoothly only on first load
        if (!resultsSection.dataset.loaded) {
            setTimeout(() => {
                resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                resultsSection.dataset.loaded = 'true';
            }, 100);
        }
    }

    updateDiffContainer() {
        const diffContainer = document.querySelector('.diff-container');
        const file3Column = document.getElementById('file3-column');
        const is3FileMode = this.comparisonMode === '3file';
        
        // Update grid layout
        diffContainer.style.gridTemplateColumns = is3FileMode ? '1fr 1fr 1fr' : '1fr 1fr';
        
        // Show/hide third column
        file3Column.style.display = is3FileMode ? 'block' : 'none';
        
        // Update column headers
        const headers = diffContainer.querySelectorAll('h3');
        if (is3FileMode) {
            headers[0].textContent = 'Environment 1';
            headers[1].textContent = 'Environment 2';
            headers[2].textContent = 'Environment 3';
        } else {
            headers[0].textContent = 'File 1 Variables';
            headers[1].textContent = 'File 2 Variables';
        }
    }

    createVariableItem(variable) {
        const div = document.createElement('div');
        div.className = `diff-item ${variable.status}`;

        const keySpan = document.createElement('span');
        keySpan.className = 'key';
        keySpan.textContent = variable.key;

        const valueSpan = document.createElement('span');
        valueSpan.className = 'value';
        valueSpan.textContent = variable.value || '(empty)';

        const statusSpan = document.createElement('span');
        statusSpan.className = 'status';
        
        // Human-readable status labels
        const statusLabels = {
            matched: 'OK',
            mismatched: 'DIFF',
            missing: 'MISSING'
        };
        statusSpan.textContent = statusLabels[variable.status] || variable.status;

        div.appendChild(keySpan);
        div.appendChild(valueSpan);
        div.appendChild(statusSpan);

        return div;
    }
}

// Initialize the tool when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set version in UI
    const versionElement = document.getElementById('app-version');
    if (versionElement) {
        versionElement.textContent = APP_VERSION;
    }
    
    new EnvCheckTool();
});