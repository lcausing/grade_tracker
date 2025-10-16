async function fetchAnalytics() {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = 'Loading...';
  try {
    const res = await fetch('/api/analytics');
    const data = await res.json();
    if (data.mean !== undefined) {
      resultsDiv.innerHTML = `
        <h2>Statistics</h2>
        <p><strong>Mean:</strong> ${data.mean}</p>
        <p><strong>Median:</strong> ${data.median}</p>
        <p><strong>Mode:</strong> ${data.mode ?? 'None'}</p>
      `;
    } else {
      resultsDiv.innerHTML = `<p>No analytics data found</p>`;
    }
  } catch (err) {
    resultsDiv.innerHTML = `<p class="error">Error loading analytics</p>`;
  }
}
