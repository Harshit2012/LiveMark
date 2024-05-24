document.addEventListener('DOMContentLoaded', () => {
    const markdownInput = document.getElementById('markdown-input');
    const markdownPreview = document.getElementById('markdown-preview');
    const exportHtmlButton = document.getElementById('export-html');
    const exportPdfButton = document.getElementById('export-pdf');

    function updatePreview() {
        const markdownText = markdownInput.value;
        const htmlContent = marked(markdownText, {
            highlight: (code) => hljs.highlightAuto(code).value
        });
        markdownPreview.innerHTML = htmlContent;
    }

    markdownInput.addEventListener('input', updatePreview);

    exportHtmlButton.addEventListener('click', () => {
        const htmlContent = marked(markdownInput.value, {
            highlight: (code) => hljs.highlightAuto(code).value
        });
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.html';
        a.click();
        URL.revokeObjectURL(url);
    });

    exportPdfButton.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text(markdownPreview.innerText, 10, 10);
        doc.save('document.pdf');
    });
    updatePreview();
});