document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('productForm');
    const resetBtn = document.getElementById('resetBtn');
    const fileUploadInput = document.getElementById('productImages');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const descriptionTextarea = document.getElementById('productDescription');
    const descriptionCount = document.getElementById('descriptionCount');

    // Character count for description
    descriptionTextarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        descriptionCount.textContent = currentLength;
        
        if (currentLength > 500) {
            this.classList.add('error');
            descriptionCount.style.color = 'var(--error-color)';
        } else {
            this.classList.remove('error');
            descriptionCount.style.color = '#777';
        }
    });

    // File upload display
    fileUploadInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            fileNameDisplay.style.display = 'block';
            fileNameDisplay.textContent = `${this.files.length} file(s) selected`;
        } else {
            fileNameDisplay.style.display = 'none';
        }
    });

    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate required fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            const errorMessage = field.closest('.form-group').querySelector('.error-message');
            
            if (field.type === 'checkbox' || field.type === 'radio') {
                const name = field.name;
                const checked = form.querySelectorAll(`input[name="${name}"]:checked`).length > 0;
                
                if (!checked) {
                    isValid = false;
                    errorMessage.style.display = 'block';
                } else {
                    errorMessage.style.display = 'none';
                }
            } else if (field.type === 'file') {
                if (field.files.length === 0) {
                    isValid = false;
                    errorMessage.style.display = 'block';
                } else {
                    errorMessage.style.display = 'none';
                }
            } else {
                if (!