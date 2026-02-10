(function() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear().toString();
    }

    const form = document.getElementById('transfer-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const from = document.getElementById('fromAccount');
            const to = document.getElementById('toAccount');
            const amount = document.getElementById('amount');
            const note = document.getElementById('note');
            const result = document.getElementById('transfer-result');

            const amountValue = parseFloat(amount && amount.value ? amount.value : 'NaN');
            if (!isFinite(amountValue) || amountValue <= 0) {
                showResult(result, 'Enter a valid amount greater than 0.', 'failed');
                return;
            }
            if (to && to.value.trim().length < 6) {
                showResult(result, 'Please enter a valid destination account/IBAN.', 'failed');
                return;
            }

            const maskedTo = maskAccount(to ? to.value : '');
            showResult(result, `Transfer of $${amountValue.toFixed(2)} scheduled to ${maskedTo}.`, 'success');
            form.reset();
        });
    }

    function showResult(el, message, status) {
        if (!el) return;
        el.hidden = false;
        el.textContent = message;
        el.className = `result status ${status}`;
    }

    function maskAccount(account) {
        const trimmed = account.replace(/\s+/g, '');
        if (trimmed.length <= 6) return trimmed;
        return `${trimmed.slice(0, 4)}••••${trimmed.slice(-2)}`;
    }
})();


