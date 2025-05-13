const db = new PouchDB('Finances');
const form = document.getElementById('RecordForm');
const list = document.getElementById('RecordsList');
const TotalDaily = document.getElementById('DailySum');
const Total = document.getElementById('TotalSum');

form.addEventListener('submit', async (e) => {