function toggleContent(contentId) {
    const envelopeContainers = document.querySelectorAll('.envelope-container');
    envelopeContainers.forEach(container => {
        const envelope = container.querySelector('.envelope');
        const content = container.querySelector('.content');
        if (container.dataset.content === contentId) {
            envelope.classList.toggle('open');
            content.style.display = envelope.classList.contains('open') ? 'block' : 'none';
        } else {
            envelope.classList.remove('open');
            content.style.display = 'none';
        }
    });
}
