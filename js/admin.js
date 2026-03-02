// ================================================================
// ADMIN-VY & LÖNEPERIODER
// ================================================================
let _sortCol = null;
let _sortDir = 1; // 1 = asc, -1 = desc

function sortTable(col) {
    if (_sortCol === col) _sortDir *= -1;
    else { _sortCol = col; _sortDir = 1; }
    loadAdminData();
}

function loadAdminData() {
    const tbody = document.getElementById('payroll-body'); tbody.innerHTML = '';
    const chartLabels = [], chartRegularPay = [], chartOBPay = [];

    renderLogs();

    // Update sort indicators
    ['name', 'hours', 'ob', 'gross'].forEach(col => {
        const el = document.getElementById(`sort-${col}`);
        if (el) el.innerText = _sortCol === col ? (_sortDir === 1 ? '▲' : '▼') : '';
    });

    let emps = employees.filter(e => e.role !== 'admin');

    if (_sortCol) {
        emps = [...emps].sort((a, b) => {
            if (_sortCol === 'name') return _sortDir * a.name.localeCompare(b.name, 'sv');
            const hA = getFilteredHistory(a), hB = getFilteredHistory(b);
            const sum = (hist, field) => hist.reduce((s, h) => s + (h[field] || 0), 0);
            const gross = (emp, hist) => {
                const t = sum(hist, 'hours'), o = sum(hist, 'obHours'), ot = sum(hist, 'otHours');
                return (t * emp.wage) + (o * emp.wage * 1.5) + (ot * emp.wage * 0.5);
            };
            const valA = _sortCol === 'hours' ? sum(hA, 'hours') : _sortCol === 'ob' ? sum(hA, 'obHours') : gross(a, hA);
            const valB = _sortCol === 'hours' ? sum(hB, 'hours') : _sortCol === 'ob' ? sum(hB, 'obHours') : gross(b, hB);
            return _sortDir * (valA - valB);
        });
    }

    emps.forEach(emp => {
        const hist = getFilteredHistory(emp);
        let totHrs = 0, obHrs = 0, otHrs = 0;
        hist.forEach(s => { totHrs += s.hours; obHrs += s.obHours; otHrs += (s.otHours || 0); });

        const regPay = totHrs * emp.wage;
        const obPay  = obHrs  * (emp.wage * 1.5);
        const otPay  = otHrs  * (emp.wage * 0.5);
        const gross  = regPay + obPay + otPay;

        chartLabels.push(emp.name.split(' ')[0]);
        chartRegularPay.push(regPay);
        chartOBPay.push(obPay);

        tbody.innerHTML += `<tr class="employee-row">
            <td class="emp-name"><strong class="clickable-name" onclick="openEditModal('${emp.id}')">${emp.name}</strong><br><small style="color:var(--text-muted)">${emp.wage} kr/h</small></td>
            <td><span class="badge ${emp.status.toLowerCase()}">${emp.status}</span></td>
            <td>${totHrs.toFixed(2)}h</td>
            <td style="color: #8b5cf6; font-weight:bold;">${obHrs.toFixed(2)}h</td>
            <td><strong>${Math.round(gross).toLocaleString('sv-SE')} kr</strong></td>
            <td>
                <button class="btn-sm btn-edit"   onclick="openEditModal('${emp.id}')">Redigera</button>
                <button class="btn-sm" style="background:#10b981;" onclick="openHistoryModal('${emp.id}')">Historik</button>
                <button class="btn-sm btn-delete" onclick="deleteEmployee('${emp.id}')">✖</button>
            </td>
        </tr>`;
    });

    updateChart(chartLabels, chartRegularPay, chartOBPay);
}

function filterTable() {
    const filter = document.getElementById('search-employee').value.toLowerCase();
    [...document.getElementsByClassName('employee-row')].forEach(row => {
        const name = row.querySelector('.emp-name');
        row.style.display = (name?.textContent || '').toLowerCase().includes(filter) ? '' : 'none';
    });
}

function addEmployee() {
    const name = document.getElementById('new-name').value;
    const pin  = document.getElementById('new-pin').value;
    const wage = parseInt(document.getElementById('new-wage').value);

    if (!name || !pin || isNaN(wage)) return showToast("Fyll i namn, PIN och lön.", "warning");
    if (employees.find(e => e.pin === pin)) return showToast("PIN-koden används redan!", "error");

    employees.push({ id: Date.now().toString(), name, pin, role: "worker", wage, status: "Utloggad", activeSession: null, workedHistory: [], schedule: [], vacationDaysLeft: 25, sickDaysUsed: 0, vacationHistory: [], sickHistory: [], personnummer: '', phone: '', email: '', address: '', postalCode: '', city: '' });
    document.getElementById('new-name').value = '';
    document.getElementById('new-pin').value  = '';
    document.getElementById('new-wage').value = '';
    saveData(); loadAdminData(); showToast("Anställd tillagd!", "success");
}

async function deleteEmployee(id) {
    try {
        await confirmAction("Är du säker på att du vill radera denna anställd och dess historik?", "Radera anställd");
        employees = employees.filter(e => e.id !== id);
        saveData(); loadAdminData(); showToast("Anställd raderad");
    } catch (_) {}
}

// ================================================================
// EXPORT CSV
// ================================================================
function exportCSV() {
    let csv = "data:text/csv;charset=utf-8,Namn;Status;Vanlig Tid(h);OB-Tid(h);Timlon;Bruttolon(kr)\n";
    employees.filter(e => e.role !== 'admin').forEach(emp => {
        let t = 0, o = 0;
        emp.workedHistory.forEach(s => { t += s.hours; o += s.obHours; });
        csv += `${emp.name};${emp.status};${t.toFixed(2)};${o.toFixed(2)};${emp.wage};${Math.round((t * emp.wage) + (o * emp.wage * 1.5))}\n`;
    });
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", "Lonelista_Pro.csv");
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    showToast("CSV nedladdad!", "success");
}

// ================================================================
// BULK-EXPORT ALLA ANSTÄLLDA (Feature 3)
// ================================================================
function exportAllCSV() {
    let csv = "data:text/csv;charset=utf-8,Namn;Datum;Vanlig Tid(h);OB(h);Övertid(h);Rast(min);Bruttolön(kr);Kommentar\n";
    employees.filter(e => e.role !== 'admin').forEach(emp => {
        [...emp.workedHistory].sort((a, b) => b.date.localeCompare(a.date)).forEach(s => {
            const pay = (s.hours * emp.wage) + (s.obHours * emp.wage * 1.5) + ((s.otHours || 0) * emp.wage * 0.5);
            csv += `${emp.name};${s.date};${s.hours.toFixed(2)};${s.obHours.toFixed(2)};${(s.otHours || 0).toFixed(2)};${s.breakMinutes || 0};${Math.round(pay)};"${(s.note || '').replace(/"/g, '""')}"\n`;
        });
    });
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `historik_alla_${new Date().toLocaleDateString('sv-SE')}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    showToast('Alla historiker exporterade!', 'success');
}

// ================================================================
// DIAGRAM
// ================================================================
function updateChart(labels, regularData, obData) {
    const ctx  = document.getElementById('salaryChart').getContext('2d');
    const dark = document.body.classList.contains('dark-mode');
    Chart.defaults.color       = dark ? '#94a3b8' : '#64748b';
    Chart.defaults.font.family = 'Inter';
    if (window.myChart) window.myChart.destroy();
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                { label: 'Vanlig Lön (kr)', data: regularData, backgroundColor: '#3b82f6', borderRadius: 4 },
                { label: 'OB-tillägg (kr)',  data: obData,      backgroundColor: '#8b5cf6', borderRadius: 4 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { stacked: true, grid: { display: false } },
                y: { stacked: true, border: { display: false } }
            },
            plugins: { legend: { position: 'top' } }
        }
    });
}
