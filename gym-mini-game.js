(() => {
  const root = document.getElementById('winter-arc-game');
  const drawer = document.getElementById('winter-arc-drawer');
  const launcher = document.querySelector('[data-gym-open]');
  if (!root || !drawer || !launcher) return;

  const foods = [
    { id:'protein', name:'Protein Shake', emoji:'🥤', muscle:2, fat:1, unlockLevel:1, mode:'bulk', effect:'+2 muscle · +1 bulk' },
    { id:'creatine', name:'Creatine', emoji:'⚡', muscle:0, fat:-4, unlockLevel:1, mode:'cut', effect:'-4 fat · muscle kept' },
    { id:'chicken', name:'Chicken', emoji:'🍗', muscle:3, fat:1, unlockLevel:2, mode:'bulk', effect:'+3 muscle · +1 bulk' },
    { id:'eggs', name:'Eggs', emoji:'🥚', muscle:2, fat:1, unlockLevel:3, mode:'bulk', effect:'+2 muscle · +1 bulk' },
    { id:'rice', name:'Rice', emoji:'🍚', muscle:1, fat:3, unlockLevel:4, mode:'bulk', effect:'+1 muscle · +3 bulk' },
    { id:'steak', name:'Steak', emoji:'🥩', muscle:4, fat:2, unlockLevel:5, mode:'bulk', effect:'+4 muscle · +2 bulk' },
    { id:'yogurt', name:'Greek Yogurt', emoji:'🥣', muscle:2, fat:0, unlockLevel:6, mode:'bulk', effect:'+2 muscle · clean bulk' },
    { id:'preworkout', name:'Pre-workout', emoji:'🔥', muscle:2, fat:-1, unlockLevel:7, mode:'bulk', effect:'+2 muscle · -1 fat' }
  ];

  const state = { level:1, feeds:0, muscle:18, bodyFat:4, selectedFood:'protein', mode:'bulk', arc:1, complete:false, lastThrow:0 };
  const el = {
    arena: root.querySelector('[data-gym-arena]'), projectiles: root.querySelector('[data-gym-projectiles]'), character: root.querySelector('[data-gym-character]'),
    mode: drawer.querySelector('[data-gym-mode]'), level: root.querySelectorAll('[data-gym-level]'), arc: root.querySelectorAll('[data-gym-arc]'),
    feedCount: root.querySelectorAll('[data-gym-feed-count]'), feedNeed: root.querySelectorAll('[data-gym-feed-need]'), progress: root.querySelector('[data-gym-progress]'),
    muscle: root.querySelectorAll('[data-gym-muscle]'), muscleBar: root.querySelector('[data-gym-muscle-bar]'), fat: root.querySelectorAll('[data-gym-fat]'), fatBar: root.querySelector('[data-gym-fat-bar]'), fatLabel: root.querySelectorAll('[data-gym-fat-label]'),
    selected: root.querySelector('[data-gym-selected]'), selectedEffect: root.querySelector('[data-gym-selected-effect]'), foods: root.querySelector('[data-gym-foods]'),
    message: root.querySelectorAll('[data-gym-message]'), live: root.querySelector('[data-gym-live]'), reset: root.querySelector('[data-gym-reset]'), prestige: root.querySelector('[data-gym-prestige]'), prestigeButton: root.querySelector('[data-gym-prestige-button]'),
    close: drawer.querySelector('[data-gym-close]'), expand: drawer.querySelector('[data-gym-expand]')
  };

  const setAll = (nodes, value) => nodes.forEach(n => n.textContent = value);
  const clamp = n => Math.max(0, Math.min(100, n));
  const requiredFeeds = () => state.level * 10;
  const currentFood = () => foods.find(f => f.id === state.selectedFood) || foods[0];
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const visualStage = () => Math.max(0, Math.min(9, Math.floor(state.bodyFat / 10)));
  const fatLabel = () => state.bodyFat < 20 ? 'LEAN' : state.bodyFat < 40 ? 'BULKING' : state.bodyFat < 60 ? 'THICC' : state.bodyFat < 80 ? 'HUGE' : 'ABSOLUTE UNIT';
  const modeCopy = () => state.mode === 'cut' ? 'CUT ⚡' : 'BULK 🥩';

  function openGame(full = false) {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden','false');
    launcher.setAttribute('aria-expanded','true');
    if (full) drawer.classList.add('full');
    updateExpandButton();
  }
  function closeGame() {
    drawer.classList.remove('open','full');
    drawer.setAttribute('aria-hidden','true');
    launcher.setAttribute('aria-expanded','false');
    updateExpandButton();
    launcher.focus();
  }
  function toggleFull() { drawer.classList.toggle('full'); updateExpandButton(); }
  function updateExpandButton() {
    const full = drawer.classList.contains('full');
    el.expand.innerHTML = `<i class="fa-solid ${full ? 'fa-compress' : 'fa-expand'}"></i>`;
    el.expand.setAttribute('aria-label', full ? 'Return to compact side game' : 'Open full game view');
    el.expand.title = full ? 'Compact view' : 'Full play view';
  }

  function renderFoods() {
    el.foods.innerHTML = foods.map(food => {
      const locked = state.level < food.unlockLevel;
      return `<button class="gym-food${state.selectedFood===food.id?' selected':''}" data-food="${food.id}" ${locked?'disabled':''} aria-label="${locked?`${food.name}, unlocks at level ${food.unlockLevel}`:`Select ${food.name}`}" title="${locked?`Unlocks at level ${food.unlockLevel}`:food.effect}">
        ${locked?`<span class="gym-food-lock">🔒${food.unlockLevel}</span>`:''}<span class="gym-food-emoji">${food.emoji}</span><span class="gym-food-name">${food.name}</span><span class="gym-food-effect">${locked?`Unlock L${food.unlockLevel}`:food.effect}</span>
      </button>`;
    }).join('');
    el.foods.querySelectorAll('[data-food]').forEach(btn => btn.addEventListener('click', () => selectFood(btn.dataset.food)));
  }

  function render() {
    const need = requiredFeeds(), food = currentFood(), label = fatLabel();
    setAll(el.level, state.level); setAll(el.arc, state.arc); setAll(el.feedCount, state.feeds); setAll(el.feedNeed, need);
    setAll(el.muscle, state.muscle); setAll(el.fat, state.bodyFat); setAll(el.fatLabel, label);
    el.progress.style.width = `${Math.min(100, state.feeds / need * 100)}%`;
    if (el.muscleBar) el.muscleBar.style.width = `${state.muscle}%`;
    if (el.fatBar) el.fatBar.style.width = `${state.bodyFat}%`;
    el.mode.textContent = modeCopy(); el.mode.classList.toggle('cut', state.mode==='cut'); el.mode.classList.toggle('bulk', state.mode==='bulk');
    el.selected.textContent = `${food.emoji} ${food.name}`; el.selectedEffect.textContent = food.effect;
    const src = `public/gym/peter-stage-${visualStage()}.png`; if (!el.character.src.endsWith(src)) el.character.src = src;
    const muscleScale = 1 + state.muscle * 0.00045; el.character.style.transform = `scale(${muscleScale})`;
    renderFoods();
  }

  function say(text){ el.message.forEach(n=>n.textContent=text); el.live.textContent=text; }
  function selectFood(id) {
    const food = foods.find(f=>f.id===id); if (!food || state.level < food.unlockLevel || state.complete) return;
    state.selectedFood=id; state.mode=food.mode; say(food.mode==='cut'?'Time to cut. Face gains incoming.':'Dirty bulk activated. One more bite.'); render();
  }

  function hitReaction(food) {
    el.character.classList.remove('gym-hit'); void el.character.offsetWidth; el.character.classList.add('gym-hit');
    const a=el.arena.getBoundingClientRect(), c=el.character.getBoundingClientRect(); const x=c.left-a.left+c.width*.52, y=c.top-a.top+c.height*.28;
    const pop=document.createElement('div'); pop.className=`gym-pop ${food.mode}`; pop.style.left=`${x}px`; pop.style.top=`${y}px`; pop.textContent=food.mode==='cut'?`${food.fat} FAT`:`+${food.muscle} MUSCLE`;
    const ring=document.createElement('div'); ring.className='gym-impact'; ring.style.left=`${x}px`; ring.style.top=`${y}px`; el.projectiles.append(pop,ring); setTimeout(()=>{pop.remove();ring.remove()},850);
  }

  function levelUp() {
    if (state.level >= 10) { state.complete=true; state.muscle=100; state.bodyFat=8; say('WINTER ARC COMPLETE. Final form unlocked.'); el.prestigeButton.textContent=`Start Gym Arc ${state.arc+1} →`; el.prestige.classList.add('show'); return; }
    state.level++; state.feeds=0; const newly=foods.filter(f=>f.unlockLevel===state.level).map(f=>f.name); say(newly.length?`LEVEL ${state.level}. Unlocked: ${newly.join(', ')}.`:`LEVEL ${state.level}. Physique loading...`); el.character.classList.remove('gym-upgrade'); void el.character.offsetWidth; el.character.classList.add('gym-upgrade');
  }

  function applyFood(food) {
    if (state.complete) return; state.mode=food.mode; state.muscle=clamp(state.muscle+food.muscle); state.bodyFat=clamp(state.bodyFat+food.fat); state.feeds++; hitReaction(food);
    say(food.mode==='cut'?'Muscle retained. Lock in.':['Winter arc.','Absolute unit loading...','One more shake.','Mass acquired.'][Math.floor(Math.random()*4)]);
    if (state.feeds>=requiredFeeds()) levelUp(); render();
  }

  function throwFood(event) {
    if (state.complete) return; const now=performance.now(); if (now-state.lastThrow<140) return; state.lastThrow=now;
    const food=currentFood(), rect=el.arena.getBoundingClientRect(), c=el.character.getBoundingClientRect(); const rawX=Number.isFinite(event.clientX)?event.clientX:rect.left+rect.width/2;
    const startX=Math.max(24,Math.min(rect.width-24,rawX-rect.left)), startY=rect.height+52, targetX=c.left-rect.left+c.width*.53, targetY=c.top-rect.top+c.height*.25, dx=targetX-startX, dy=targetY-startY;
    const p=document.createElement('div'); p.className='flying-food'; p.textContent=food.emoji; p.style.left=`${startX}px`; p.style.top=`${startY}px`; el.projectiles.appendChild(p);
    if(reducedMotion()||!p.animate){p.remove();applyFood(food);return} const curve=Math.max(-70,Math.min(70,(targetX-rect.width/2)*.18));
    const anim=p.animate([{transform:'translate(-50%,0) scale(3.1) rotate(0deg)',opacity:1},{transform:`translate(calc(-50% + ${dx*.25}px), ${dy*.3-20}px) scale(2.05) rotate(70deg)`,opacity:1,offset:.32},{transform:`translate(calc(-50% + ${dx*.62+curve}px), ${dy*.68-24}px) scale(1.05) rotate(145deg)`,opacity:1,offset:.7},{transform:`translate(calc(-50% + ${dx}px), ${dy}px) scale(.25) rotate(220deg)`,opacity:.85}],{duration:450,easing:'cubic-bezier(.18,.76,.28,1)',fill:'forwards'});
    anim.onfinish=()=>{p.remove();applyFood(food)}; anim.oncancel=()=>p.remove();
  }

  function resetGame(){Object.assign(state,{level:1,feeds:0,muscle:18,bodyFat:4,selectedFood:'protein',mode:'bulk',arc:1,complete:false,lastThrow:0});el.prestige.classList.remove('show');say('Pick a food, then click the arena to feed Peter.');render()}
  function prestige(){state.arc++;Object.assign(state,{level:1,feeds:0,muscle:24,bodyFat:4,selectedFood:'protein',mode:'bulk',complete:false,lastThrow:0});el.prestige.classList.remove('show');say(`GYM ARC ${state.arc}. Back to the bulk.`);render()}

  launcher.addEventListener('click',()=>openGame(false)); el.close.addEventListener('click',closeGame); el.expand.addEventListener('click',toggleFull);
  document.querySelectorAll('a[href="#winter-arc"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openGame(false)}));
  el.arena.addEventListener('pointerdown',throwFood); el.arena.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;e.preventDefault();const r=el.arena.getBoundingClientRect();throwFood({clientX:r.left+r.width/2})});
  el.reset.addEventListener('click',resetGame); el.prestigeButton.addEventListener('click',prestige);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&drawer.classList.contains('open'))closeGame()});
  updateExpandButton(); render();
})();
