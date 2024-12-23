// PDF Editor functionality
document.addEventListener('DOMContentLoaded', () => {
  // Handle file input changes
  const fileInput = document.querySelector('input[type="file"]');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file && file.type !== 'application/pdf') {
        alert('Please select a PDF file');
        e.target.value = '';
      }
    });
  }

  // Handle text area auto-resize
  const textarea = document.querySelector('textarea');
  if (textarea) {
    textarea.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });
  }

  // Add loading state to buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      if (!this.disabled) {
        this.disabled = true;
        const originalText = this.textContent;
        this.textContent = 'Processing...';
        
        // Re-enable after processing (simulated)
        setTimeout(() => {
          this.disabled = false;
          this.textContent = originalText;
        }, 2000);
      }
    });
  });
}); 