(function () {
    const textForm = document.getElementById('text-form');
    const textInput = document.getElementById('text_to_analyze');
    const outputDiv = document.getElementById('text_output');
    const errorDiv = document.getElementById('error-message');

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }

    function hideError() {
        errorDiv.classList.add('hidden');
    }

    function analyzeText(text) {
        const originalText = text;
        const lowerText = text.toLowerCase();
        
        // Count letters
        const letters = text.match(/[a-zA-Z]/g) || [];
        const totalLetters = letters.length;
        
        // Count non-letters
        const totalNonLetters = text.length - totalLetters;
        
        // Count vowels (not including y)
        const vowels = lowerText.match(/[aeiou]/g) || [];
        const totalVowels = vowels.length;
        
        // Count consonants (including y)
        const consonants = lowerText.match(/[bcdfghjklmnpqrstvwxyz]/g) || [];
        const totalConsonants = consonants.length;
        
        // Count words - sequence of letters broken by non-letters
        const words = text.match(/[a-zA-Z]+/g) || [];
        const totalWords = words.length;
        
        // Count unique words
        const uniqueWords = [...new Set(words.map(word => word.toLowerCase()))];
        const totalUniqueWords = uniqueWords.length;
        
        // Count long words (6+ letters)
        const longWords = words.filter(word => word.length >= 6);
        const totalLongWords = longWords.length;
        
        // Count short words (3 or fewer letters)
        const shortWords = words.filter(word => word.length <= 3);
        const totalShortWords = shortWords.length;
        
        return {
            originalInput: originalText,
            totalLetters,
            totalNonLetters,
            totalVowels,
            totalConsonants,
            totalWords,
            totalUniqueWords,
            totalLongWords,
            totalShortWords
        };
    }

    function createResultHTML(stats) {
        return `
            <dl>
                <dt>Original Input:</dt>
                <dd>${stats.originalInput}</dd>
                <dt>Total Number of Letters</dt>
                <dd>${stats.totalLetters}</dd>
                <dt>Total Number of Non-Letters</dt>
                <dd>${stats.totalNonLetters}</dd>
                <dt>Total Number of Vowels</dt>
                <dd>${stats.totalVowels}</dd>
                <dt>Total Number of Consonants</dt>
                <dd>${stats.totalConsonants}</dd>
                <dt>Total Number of Words</dt>
                <dd>${stats.totalWords}</dd>
                <dt>Total Number of Unique Words</dt>
                <dd>${stats.totalUniqueWords}</dd>
                <dt>Total Number of Long Words</dt>
                <dd>${stats.totalLongWords}</dd>
                <dt>Total Number of Short Words</dt>
                <dd>${stats.totalShortWords}</dd>
            </dl>
        `;
    }

    if (textForm) {
        textForm.addEventListener('submit', function(event) {
            event.preventDefault();
            hideError();
            
            const textValue = textInput.value;
            
            // Validate input
            if (!textValue || textValue.trim() === '') {
                showError('Please enter some text to analyze.');
                return;
            }
            
            try {
                // Analyze the text
                const stats = analyzeText(textValue);
                
                // Create and append result HTML
                const resultHTML = createResultHTML(stats);
                outputDiv.insertAdjacentHTML('beforeend', resultHTML);
                
                // Reset the form
                textForm.reset();
                
            } catch (error) {
                showError('An error occurred while analyzing the text. Please try again.');
                console.error('Error:', error);
            }
        });
    }
})();