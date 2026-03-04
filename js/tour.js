// ================================================================
// GUIDED TOUR
// ================================================================

function getTourEmployee() {
    return [
        { sel: '#worker-action-buttons', title: t('tour_emp_1_title'), text: t('tour_emp_1_text') },
        { sel: '#worker-stats-grid',     title: t('tour_emp_2_title'), text: t('tour_emp_2_text') },
        { sel: '#schedule-view-btn',     title: t('tour_emp_3_title'), text: t('tour_emp_3_text') },
        { sel: '#worker-info-card',      title: t('tour_emp_4_title'), text: t('tour_emp_4_text') },
        { sel: '#vacation-request-card', title: t('tour_emp_5_title'), text: t('tour_emp_5_text') },
        { sel: '#profile-personnummer',  title: t('tour_emp_6_title'), text: t('tour_emp_6_text') },
    ];
}
function getTourAdmin() {
    return [
        { sel: '#admin-stats-grid',         title: t('tour_adm_1_title'), text: t('tour_adm_1_text') },
        { sel: '#period-filter',            title: t('tour_adm_2_title'), text: t('tour_adm_2_text') },
        { sel: '#search-employee',          title: t('tour_adm_3_title'), text: t('tour_adm_3_text') },
        { sel: '#overtime-card',            title: t('tour_adm_4_title'), text: t('tour_adm_4_text') },
        { sel: '#plan-calendar-card',       title: t('tour_adm_5_title'), text: t('tour_adm_5_text') },
        { sel: '#pending-requests-heading', title: t('tour_adm_6_title'), text: t('tour_adm_6_text') },
        { sel: '#cert-warnings-heading',    title: t('tour_adm_7_title'), text: t('tour_adm_7_text') },
        { sel: '#settings-btn',             title: t('tour_adm_8_title'), text: t('tour_adm_8_text') },
    ];
}

let _tourSteps = [];
let _tourIdx   = 0;

function startTour() {
    _tourSteps = (currentUser && currentUser.role === 'admin') ? getTourAdmin() : getTourEmployee();
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
    const stepWord = currentLang === 'en' ? 'Step' : 'Steg';
    const ofWord   = currentLang === 'en' ? 'of'   : 'av';
    document.getElementById('tour-progress').textContent = `${stepWord} ${_tourIdx + 1} ${ofWord} ${_tourSteps.length}`;
    document.getElementById('tour-title').textContent    = step.title;
    document.getElementById('tour-text').textContent     = step.text;
    document.getElementById('tour-prev-btn').style.visibility = _tourIdx === 0 ? 'hidden' : 'visible';
    const finishLabel = currentLang === 'en' ? 'Finish ✓' : 'Avsluta ✓';
    document.getElementById('tour-next-btn').textContent = _tourIdx === _tourSteps.length - 1 ? finishLabel : t('tour_next');

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
