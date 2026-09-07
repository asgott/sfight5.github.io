// ── State ──
const state = {
  hp:   22,
  temp: 0,
  ac:   13,
  tech: 11,
  acEffects: {
    infused:   { bonus: 1, active: false },
    armshield: { bonus: 2, active: false },
    barrier:   { bonus: 2, active: false }
  },
  weapons: {
    needle:  { baseAtk: 4, baseDmg: 2, infused: false },
    holdout: { baseAtk: 4, baseDmg: 2, infused: false },
    blaster: { baseAtk: 5, baseDmg: 2, infused: false }
  },
  arkanian: { current: 1, max: 1 },
  shared:   { current: 2, max: 2 }
};

// ── Helpers ──
function el(id) { return document.getElementById(id); }

function clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }

// ── Stat changes ──
function changeStat(stat, delta) {
  if (stat === 'hp')   { state.hp   = clamp(state.hp   + delta, 0, 999); el('hp-display').textContent   = state.hp; }
  if (stat === 'temp') { state.temp = clamp(state.temp + delta, 0, 100); el('temp-display').textContent = state.temp; }
  if (stat === 'tech') { state.tech = clamp(state.tech + delta, 0, 999); el('tech-display').textContent = state.tech; }
}

// ── AC effects ──
function updateAC() {
  let total = 13;
  for (const key in state.acEffects) {
    if (state.acEffects[key].active) total += state.acEffects[key].bonus;
  }
  el('ac-display').textContent = total;
}

function toggleEffect(key) {
  state.acEffects[key].active = !state.acEffects[key].active;
  const btnMap = { infused: 'ac-infused', armshield: 'ac-armshield', barrier: 'ac-barrier' };
  el(btnMap[key]).classList.toggle('active', state.acEffects[key].active);
  updateAC();
}

// ── Weapon infuse ──
function updateWeapon(name) {
  const w = state.weapons[name];
  const bonus = w.infused ? 1 : 0;
  const atk = w.baseAtk + bonus;
  const dmg = w.baseDmg + bonus;
  el(name + '-atk').textContent = '+' + atk;
  el(name + '-dmg').textContent = '+' + dmg;
  el(name + '-infused').classList.toggle('active', w.infused);
}

function toggleInfuse(name) {
  state.weapons[name].infused = !state.weapons[name].infused;
  updateWeapon(name);
}

// ── Ammo ──
function toggleAmmo(box) {
  box.classList.toggle('spent');
}

// ── Counters ──
function spendCounter(name) {
  if (state.arkanian.current > 0) {
    state.arkanian.current--;
    el('arkanian-val').textContent = state.arkanian.current + '/' + state.arkanian.max;
  }
}

function restoreCounter(name) {
  if (state.arkanian.current < state.arkanian.max) {
    state.arkanian.current++;
    el('arkanian-val').textContent = state.arkanian.current + '/' + state.arkanian.max;
  }
}

function spendShared() {
  if (state.shared.current > 0) {
    state.shared.current--;
    el('potent-val').textContent = state.shared.current + '/' + state.shared.max;
    el('biochem-val').textContent = state.shared.current + '/' + state.shared.max;
  }
}

function restoreShared() {
  if (state.shared.current < state.shared.max) {
    state.shared.current++;
    el('potent-val').textContent = state.shared.current + '/' + state.shared.max;
    el('biochem-val').textContent = state.shared.current + '/' + state.shared.max;
  }
}
// ── Scale sheet to fit browser window width ──
function scaleSheet() {
  const sheet = document.getElementById('sheet');
  const scale = window.innerWidth / 1488;
  sheet.style.transform = `scale(${scale})`;
  document.body.style.height = (2266 * scale) + 'px';
}

window.addEventListener('resize', scaleSheet);
scaleSheet();
