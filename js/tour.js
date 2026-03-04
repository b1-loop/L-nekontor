// ================================================================
// GUIDED TOUR
// ================================================================

const TOUR_EMPLOYEE = [
    {
        sel: '#worker-action-buttons',
        title: '▶ Stämpla in och ut',
        text: 'Klocka in när du börjar jobba och klocka ut när du slutar. Härifrån markerar du dig också som sjuk eller tar ut semester.'
    },
    {
        sel: '#worker-stats-grid',
        title: '📊 Din statistik',
        text: 'Se dina jobbade timmar, OB-tid, övertid, bruttolön, kvarvarande semesterdagar och nedräkning till nästa lönedag.'
    },
    {
        sel: '#schedule-view-btn',
        title: '📅 Ditt schema',
        text: 'Dina inlagda arbetspass visas här. Klicka "Kalender" för månadsöversikt eller lägg till nya pass med formuläret nedan.'
    },
    {
        sel: '#worker-info-card',
        title: '🎓 Anställningsinformation',
        text: 'Dina certifikat, kompetenser och anställningsdatum visas här. Admin registrerar och uppdaterar dessa.'
    },
    {
        sel: '#vacation-request-card',
        title: '📝 Semesteransökan',
        text: 'Fyll i datum och skicka en ansökan till admin. Statusen (Väntar / Godkänd / Nekad) visas direkt i listan nedan formuläret.'
    },
    {
        sel: '#profile-personnummer',
        title: '👤 Din profil',
        text: 'Håll din kontaktinformation uppdaterad — den är synlig för admin. Längre ned i kortet kan du byta PIN-kod.'
    }
];

const TOUR_ADMIN = [
    {
        sel: '#admin-stats-grid',
        title: '📊 Dashboard',
        text: 'Snabb översikt: total lönekostnad, antal inloggade just nu, snittlön per timme och totala timmar — allt för vald period.'
    },
    {
        sel: '#period-filter',
        title: '📅 Löneperiod',
        text: 'Filtrera all data på Allt, Denna vecka eller Denna månad. Lönetabell, diagram och rapport uppdateras direkt.'
    },
    {
        sel: '#search-employee',
        title: '💰 Lönetabell',
        text: 'Komplett löneöversikt för alla anställda. Sök, sortera på valfri kolumn, klicka "Historik" för att se och redigera enskilda arbetspass.'
    },
    {
        sel: '#overtime-card',
        title: '⏰ Övertidsrapport',
        text: 'Stapeldiagram som visar vem som jobbat mest övertid. Grön = lite, orange = måttlig, röd = hög övertid.'
    },
    {
        sel: '#plan-calendar-card',
        title: '🗓️ Semesterplanering',
        text: 'Månadskalender med alla anställdas scheman och beviljade semestrar. Navigera månader för att planera beläggning.'
    },
    {
        sel: '#pending-requests-heading',
        title: '📋 Semesteransökningar',
        text: 'Ansökningar från anställda samlas här. Skriv en valfri kommentar och godkänn eller neka — dagarna dras automatiskt.'
    },
    {
        sel: '#cert-warnings-heading',
        title: '🎓 Certifikat-varningar',
        text: 'Certifikat som löper ut inom 60 dagar visas som påminnelser. Grön = ok, orange = snart, röd = utgånget.'
    },
    {
        sel: '#settings-btn',
        title: '⚙️ Inställningar',
        text: 'Konfigurera företagsnamn, lönedatum, OB-tider, övertidsgräns och ett meddelande som visas för alla anställda vid inloggning.'
    }
];

let _tourSteps = [];
let _tourIdx   = 0;

function startTour() {
    _tourSteps = (currentUser && currentUser.role === 'admin') ? TOUR_ADMIN : TOUR_EMPLOYEE;
    _tourIdx   = 0;
    _showTourStep();
}

function _showTourStep() {
    // Remove previous highlight
    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));

    const step   = _tourSteps[_tourIdx];
    const target = document.querySelector(step.sel);

    if (!target) {
        // Element not found — hide overlay and skip
        _hideShades();
        if (_tourIdx < _tourSteps.length - 1) { _tourIdx++; _showTourStep(); }
        else endTour();
        return;
    }

    // Instant scroll so getBoundingClientRect is accurate right away
    target.scrollIntoView({ behavior: 'instant', block: 'center' });
    target.classList.add('tour-highlight');

    // Position the 4 overlay panes around the target
    const pad  = 6;
    const rect = target.getBoundingClientRect();
    _positionShades(rect, pad);

    // Fill tooltip content
    const tooltip = document.getElementById('tour-tooltip');
    tooltip.classList.remove('hidden');
    document.getElementById('tour-progress').textContent = `Steg ${_tourIdx + 1} av ${_tourSteps.length}`;
    document.getElementById('tour-title').textContent    = step.title;
    document.getElementById('tour-text').textContent     = step.text;
    document.getElementById('tour-prev-btn').style.visibility = _tourIdx === 0 ? 'hidden' : 'visible';
    document.getElementById('tour-next-btn').textContent = _tourIdx === _tourSteps.length - 1 ? 'Avsluta ✓' : 'Nästa →';

    _positionTooltip(rect);
}

// Position 4 semi-transparent panes that leave a "cutout" around the target
function _positionShades(rect, pad) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const x1 = Math.max(0, rect.left  - pad);
    const y1 = Math.max(0, rect.top   - pad);
    const x2 = Math.min(vw, rect.right  + pad);
    const y2 = Math.min(vh, rect.bottom + pad);

    const set = (id, s) => {
        const el = document.getElementById(id);
        el.style.cssText = `top:${s.t};left:${s.l};right:${s.r};bottom:${s.b};width:${s.w};height:${s.h};`;
        el.classList.remove('hidden');
    };

    set('tour-shade-top',    { t:'0',       l:'0',      r:'0',  b:'',   w:'',          h: y1 + 'px' });
    set('tour-shade-bottom', { t: y2+'px',  l:'0',      r:'0',  b:'0',  w:'',          h:'' });
    set('tour-shade-left',   { t: y1+'px',  l:'0',      r:'',   b:'',   w: x1 + 'px', h: (y2-y1) + 'px' });
    set('tour-shade-right',  { t: y1+'px',  l: x2+'px', r:'0',  b:'',   w:'',          h: (y2-y1) + 'px' });
}

function _hideShades() {
    ['tour-shade-top','tour-shade-bottom','tour-shade-left','tour-shade-right']
        .forEach(id => document.getElementById(id).classList.add('hidden'));
}

function _positionTooltip(rect) {
    const tooltip = document.getElementById('tour-tooltip');
    const tw      = tooltip.offsetWidth  || 300;
    const th      = tooltip.offsetHeight || 180;
    const vw      = window.innerWidth;
    const vh      = window.innerHeight;

    let top;
    // Prefer below; fall back to above; clamp if neither fits
    if (rect.bottom + th + 16 < vh) {
        top = rect.bottom + 12;
    } else if (rect.top - th - 16 > 0) {
        top = rect.top - th - 12;
    } else {
        top = Math.max(8, vh / 2 - th / 2);
    }

    let left = rect.left + rect.width / 2 - tw / 2;
    left = Math.max(8, Math.min(left, vw - tw - 8));

    tooltip.style.top  = top  + 'px';
    tooltip.style.left = left + 'px';
}

function tourNext() {
    if (_tourIdx >= _tourSteps.length - 1) { endTour(); return; }
    _tourIdx++;
    _showTourStep();
}

function tourPrev() {
    if (_tourIdx > 0) { _tourIdx--; _showTourStep(); }
}

function endTour() {
    document.querySelectorAll('.tour-highlight').forEach(el => el.classList.remove('tour-highlight'));
    _hideShades();
    document.getElementById('tour-tooltip').classList.add('hidden');
}

// Auto-start on first login per user
function autoStartTour() {
    if (!currentUser) return;
    const key = 'tt_tour_' + currentUser.pin;
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, '1');
        setTimeout(startTour, 700);
    }
}
