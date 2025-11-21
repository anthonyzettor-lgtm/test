// ========================================
// 🗡️ ROUBLARD - APP COMPLÈTE
// ========================================

'use strict';

const AVATAR_CLASSES = {
    assassin: { name: '🕵️ Assassin', avatar: '🕵️', description: '+20% Agilité', color: '#2d4a3d', bonuses: { agilite: 0.20 } },
    rogue: { name: '🤺 Rogue', avatar: '🤺', description: '+15% Intelligence', color: '#4a6a5a', bonuses: { intelligence: 0.15 } },
    shadowblade: { name: '🥷 Shadowblade', avatar: '🥷', description: '+25% Force', color: '#1a3a2a', bonuses: { force: 0.25 } }
};

const EQUIPMENT_CATALOG = {
    helmet_leather: { id: 'helmet_leather', name: 'Casque Cuir', slot: 'helmet', icon: '🪖', price: 200, level: 1, defense: 5, hp: 10, sellPrice: 100 },
    helmet_iron: { id: 'helmet_iron', name: 'Heaume Fer', slot: 'helmet', icon: '⛑️', price: 800, level: 5, defense: 15, hp: 30, sellPrice: 400 },
    cape_novice: { id: 'cape_novice', name: 'Cape Novice', slot: 'cape', icon: '🧥', price: 150, level: 1, agilite: 3, sellPrice: 75 },
    cape_strategist: { id: 'cape_strategist', name: 'Cape Stratège', slot: 'cape', icon: '🧥', price: 600, level: 5, agilite: 8, intelligence: 5, sellPrice: 300 },
    armor_leather: { id: 'armor_leather', name: 'Armure Cuir', slot: 'armor', icon: '🛡️', price: 300, level: 1, defense: 10, hp: 20, sellPrice: 150 },
    armor_iron: { id: 'armor_iron', name: 'Plastron Fer', slot: 'armor', icon: '🛡️', price: 1000, level: 5, defense: 25, hp: 50, sellPrice: 500 },
    boots_leather: { id: 'boots_leather', name: 'Bottes Cuir', slot: 'boots', icon: '👢', price: 150, level: 1, agilite: 2, sellPrice: 75 },
    boots_speed: { id: 'boots_speed', name: 'Bottes Vitesse', slot: 'boots', icon: '👢', price: 600, level: 5, agilite: 8, sellPrice: 300 },
    gloves_leather: { id: 'gloves_leather', name: 'Gants Cuir', slot: 'gloves', icon: '🧤', price: 100, level: 1, force: 2, sellPrice: 50 },
    gloves_warrior: { id: 'gloves_warrior', name: 'Gantelets Guerrier', slot: 'gloves', icon: '🧤', price: 500, level: 5, force: 8, sellPrice: 250 },
    necklace_focus: { id: 'necklace_focus', name: 'Collier Focus', slot: 'necklace', icon: '📿', price: 250, level: 1, intelligence: 5, sellPrice: 125 },
    necklace_wisdom: { id: 'necklace_wisdom', name: 'Amulette Sagesse', slot: 'necklace', icon: '📿', price: 900, level: 5, intelligence: 12, sellPrice: 450 },
    ring_strength: { id: 'ring_strength', name: 'Anneau Force', slot: 'ring', icon: '💍', price: 200, level: 1, force: 3, sellPrice: 100 },
    ring_agility: { id: 'ring_agility', name: 'Anneau Agilité', slot: 'ring', icon: '💍', price: 200, level: 1, agilite: 3, sellPrice: 100 },
    ring_vitality: { id: 'ring_vitality', name: 'Anneau Vitalité', slot: 'ring', icon: '💍', price: 400, level: 3, hp: 30, sellPrice: 200 },
    weapon_wood: { id: 'weapon_wood', name: 'Épée Bois', slot: 'weapon', icon: '🗡️', price: 150, level: 1, force: 5, bossDamage: 10, sellPrice: 75 },
    weapon_steel: { id: 'weapon_steel', name: 'Épée Acier', slot: 'weapon', icon: '⚔️', price: 500, level: 5, force: 10, bossDamage: 25, sellPrice: 250 }
};

let gameState = {
    character: {
        name: 'Anthony Zettor', class: 'assassin', level: 1, xp: 0, xpToNext: 100,
        energie: 200, energieCombat: 0, focus: 0, vitalite: 100, maxVitalite: 100,
        weight: 67, targetWeight: 60, momentum: 1.0,
        force: 8, agilite: 15, intelligence: 10, sagesse: 8,
        equipment: { helmet: null, cape: null, armor: null, boots: null, gloves: null, necklace: null, ring1: null, ring2: null, weapon: null },
        inventory: []
    },
    habits: {
        combat: [
            { id: 1, name: 'Boxe', icon: '🥊', xp: 50, energie: 15, done: false, streak: 0, category: 'combat', timeHistory: [] },
            { id: 2, name: 'Footing', icon: '🏃', xp: 40, energie: 12, done: false, streak: 0, category: 'combat', timeHistory: [] },
            { id: 3, name: 'Muscu', icon: '💪', xp: 60, energie: 18, done: false, streak: 0, category: 'combat', timeHistory: [] }
        ],
        nutrition: [
            { id: 1, name: 'Petit-déj', icon: '🥣', xp: 15, energie: 8, done: false, streak: 0, category: 'nutrition', timeHistory: [] },
            { id: 2, name: 'Déjeuner', icon: '🍽️', xp: 20, energie: 10, done: false, streak: 0, category: 'nutrition', timeHistory: [] },
            { id: 3, name: 'Diner', icon: '🥗', xp: 25, energie: 12, done: false, streak: 0, category: 'nutrition', timeHistory: [] },
            { id: 4, name: 'Hydratation', icon: '💧', xp: 30, energie: 15, done: false, streak: 0, category: 'nutrition', timeHistory: [] }
        ],
        dev: [
            { id: 1, name: 'Lecture', icon: '📚', xp: 40, energie: 15, done: false, streak: 0, category: 'dev', timeHistory: [] },
            { id: 2, name: 'Sortir confort', icon: '🎯', xp: 50, energie: 20, done: false, streak: 0, category: 'dev', timeHistory: [] }
        ],
        menage: [
            { id: 1, name: 'Lit', icon: '🛏️', xp: 15, energie: 8, done: false, streak: 0, category: 'menage', timeHistory: [] },
            { id: 2, name: 'Vaisselle', icon: '🍽️', xp: 20, energie: 10, done: false, streak: 0, category: 'menage', timeHistory: [] },
            { id: 3, name: 'Cuisine', icon: '🧽', xp: 30, energie: 12, done: false, streak: 0, category: 'menage', timeHistory: [] },
            { id: 4, name: 'Salle bain', icon: '🚿', xp: 25, energie: 11, done: false, streak: 0, category: 'menage', timeHistory: [] }
        ],
        pro: [
            { id: 1, name: 'Portfolio', icon: '📄', xp: 40, energie: 15, done: false, streak: 0, category: 'pro', timeHistory: [] },
            { id: 2, name: 'Coder', icon: '💻', xp: 50, energie: 18, done: false, streak: 0, category: 'pro', timeHistory: [] },
            { id: 3, name: 'Formation', icon: '🎓', xp: 35, energie: 12, done: false, streak: 0, category: 'pro', timeHistory: [] }
        ],
        blackhat: [
            { id: 1, name: 'YouTube', icon: '🎬', xp: -50, energie: -20, done: false, streak: 0, category: 'blackhat', timeHistory: [] },
            { id: 2, name: 'Scroll', icon: '📱', xp: -30, energie: -15, done: false, streak: 0, category: 'blackhat', timeHistory: [] },
            { id: 3, name: 'Social', icon: '👥', xp: -40, energie: -18, done: false, streak: 0, category: 'blackhat', timeHistory: [] }
        ]
    },
    bossSystem: { currentBoss: null, history: [] },
    monthlyBoss: null,
    sobrietyStreak: 0,
    weightHistory: [],
    projetPro: { voies: { mentor: { level: 1, xp: 0 }, artisan3d: { level: 1, xp: 0 } } },
    achievements: [
        { id: 1, name: 'Premier Pas', desc: 'Compléter 1 habitude', unlocked: false },
        { id: 2, name: 'Momentum', desc: '7 jours streak', unlocked: false },
        { id: 4, name: 'Ascète', desc: 'Poids cible', unlocked: false },
        { id: 11, name: 'Tueur Boss I', desc: 'Vaincre Tier 1', unlocked: false }
    ],
    journal: [],
    lastResetDate: null
};

function validateNumber(n, min, max) { const num = parseInt(n) || 0; return Math.min(Math.max(num, min), max); }

function saveGame() {
    try { localStorage.setItem('roublard_save', JSON.stringify(gameState)); console.log('✅ Sauvegardé'); }
    catch(e) { console.error('Erreur save:', e); }
}

function loadGame() {
    try {
        const save = localStorage.getItem('roublard_save');
        if (save) { gameState = JSON.parse(save); console.log('✅ Chargé'); initializeBoss(); }
    }
    catch(e) { console.error('Erreur load:', e); }
}

function initializeBoss() {
    if (!gameState.bossSystem.currentBoss) {
        gameState.bossSystem.currentBoss = { id: 1, tier: 1, name: 'Procrastination', icon: '😴', hp: 1000, maxHp: 1000, daysRequired: 7, consecutiveDays: 0, lastAttackDate: null, defeated: false };
    }
}

function showNotif(msg, type = 'success') {
    const notif = document.getElementById('notification');
    if (!notif) return;
    notif.textContent = msg;
    notif.className = type === 'epic' ? 'bg-yellow-500 text-white' : type === 'danger' ? 'bg-red-600 text-white' : 'bg-green-600 text-white';
    notif.classList.remove('hidden');
    setTimeout(() => notif.classList.add('hidden'), 3000);
}

function addJournal(text, type = 'info') {
    gameState.journal.unshift({ text, type, date: new Date().toISOString() });
    if (gameState.journal.length > 100) gameState.journal.pop();
}

function getTotalStats() {
    const char = gameState.character;
    const classBonus = AVATAR_CLASSES[char.class]?.bonuses || {};
    let stats = { force: Math.floor(char.force * (1 + (classBonus.force || 0))), agilite: Math.floor(char.agilite * (1 + (classBonus.agilite || 0))), intelligence: Math.floor(char.intelligence * (1 + (classBonus.intelligence || 0))), defense: 0, hp: 0, bossDamage: 0 };
    Object.values(char.equipment).forEach(itemId => {
        if (!itemId) return;
        const item = EQUIPMENT_CATALOG[itemId];
        if (!item) return;
        stats.force += item.force || 0;
        stats.agilite += item.agilite || 0;
        stats.intelligence += item.intelligence || 0;
        stats.defense += item.defense || 0;
        stats.hp += item.hp || 0;
        stats.bossDamage += item.bossDamage || 0;
    });
    return stats;
}

function toggleHabit(category, id) {
    try {
        const habit = gameState.habits[category]?.find(h => h.id === id);
        if (!habit || habit.done) return;
        const stats = getTotalStats();
        const rewards = { energie: Math.floor(habit.energie * gameState.character.momentum), xp: Math.floor(habit.xp * gameState.character.momentum), energieCombat: category === 'combat' ? 10 : 0 };
        gameState.character.energie += rewards.energie;
        gameState.character.energieCombat += rewards.energieCombat;
        gameState.character.xp += rewards.xp;
        gameState.character.momentum = Math.min(2.0, gameState.character.momentum + 0.05);
        gameState.character.vitalite = Math.min(gameState.character.maxVitalite + stats.hp, gameState.character.vitalite + 2);
        habit.streak++;
        habit.done = true;
        habit.timeHistory.push({ date: new Date().toISOString().split('T')[0], minutes: 30 });
        gameState.sobrietyStreak++;
        if (habit.streak === 1) unlockAchievement(1);
        if (habit.streak === 7) unlockAchievement(2);
        showNotif(`✅ +${rewards.xp} XP +${rewards.energie} ⚡`, 'success');
        addJournal(`✅ ${habit.name} - Streak: ${habit.streak}j`, 'success');
        saveGame();
        render();
    } catch(e) { console.error('Erreur toggle:', e); }
}

function deleteHabit(category, id) {
    if (!confirm('Supprimer?')) return;
    gameState.habits[category] = gameState.habits[category].filter(h => h.id !== id);
    showNotif('Supprimée');
    saveGame();
    render();
}

function attackBossNew() {
    try {
        const boss = gameState.bossSystem?.currentBoss;
        if (!boss) { showNotif('Pas de boss!', 'danger'); return; }
        if (gameState.character.energieCombat < 20) { showNotif('❌ Besoin 20 ⚔️', 'danger'); return; }
        const today = new Date().toISOString().split('T')[0];
        if (boss.lastAttackDate === today) { showNotif('Déjà attaqué!', 'danger'); return; }
        const stats = getTotalStats();
        const damage = Math.max(1, Math.floor(stats.force + stats.agilite * 0.5 + stats.intelligence * 0.3 + stats.bossDamage));
        gameState.character.energieCombat -= 20;
        boss.hp -= damage;
        boss.lastAttackDate = today;
        boss.consecutiveDays++;
        if (boss.hp <= 0) {
            gameState.character.energie += 500;
            gameState.character.xp += 1000;
            showNotif(`🏆 BOSS VAINCU! +500 ⚡`, 'epic');
            addJournal(`🏆 Boss vaincu!`, 'epic');
            unlockAchievement(11);
        } else {
            showNotif(`⚔️ -${damage} HP`, 'success');
        }
        saveGame();
        render();
    } catch(e) { console.error('Erreur attaque:', e); }
}

function buyEquipment(itemId) {
    const item = EQUIPMENT_CATALOG[itemId];
    if (!item) return;
    if (gameState.character.level < item.level) { showNotif(`Niv ${item.level} requis!`, 'danger'); return; }
    if (gameState.character.energie < item.price) { showNotif('Pas assez ⚡!', 'danger'); return; }
    if (gameState.character.inventory.includes(itemId)) { showNotif('Déjà possédé!', 'danger'); return; }
    gameState.character.energie -= item.price;
    gameState.character.inventory.push(itemId);
    showNotif(`${item.icon} ${item.name} acheté!`, 'epic');
    saveGame();
    render();
}

function equipItem(itemId) {
    const item = EQUIPMENT_CATALOG[itemId];
    if (!item || !gameState.character.inventory.includes(itemId)) return;
    const slot = item.slot;
    if (slot === 'ring') {
        if (!gameState.character.equipment.ring1) gameState.character.equipment.ring1 = itemId;
        else if (!gameState.character.equipment.ring2) gameState.character.equipment.ring2 = itemId;
        else { showNotif('Anneaux pleins!', 'danger'); return; }
    } else {
        gameState.character.equipment[slot] = itemId;
    }
    showNotif(`${item.icon} Équipé!`, 'success');
    saveGame();
    render();
}

function unequipItem(slot) {
    gameState.character.equipment[slot] = null;
    showNotif('Retiré!');
    saveGame();
    render();
}

function sellEquipment(itemId) {
    const item = EQUIPMENT_CATALOG[itemId];
    const idx = gameState.character.inventory.indexOf(itemId);
    if (idx === -1) return;
    const isEq = Object.values(gameState.character.equipment).includes(itemId);
    if (isEq) { showNotif('Déséquipez!', 'danger'); return; }
    gameState.character.inventory.splice(idx, 1);
    gameState.character.energie += item.sellPrice;
    showNotif(`Vendu +${item.sellPrice} ⚡`);
    saveGame();
    render();
}

function updateWeight() {
    const inp = document.getElementById('newWeight');
    const w = parseFloat(inp?.value);
    if (!w || w < 20 || w > 300) { showNotif('Invalid!', 'danger'); return; }
    gameState.character.weight = w;
    if (w <= gameState.character.targetWeight) unlockAchievement(4);
    showNotif('✅ Poids enregistré!');
    if (inp) inp.value = '';
    saveGame();
    render();
}

function unlockAchievement(id) {
    const ach = gameState.achievements.find(a => a.id === id);
    if (ach && !ach.unlocked) {
        ach.unlocked = true;
        showNotif(`🏆 ${ach.name}!`, 'epic');
        addJournal(`🏆 ${ach.name}`, 'epic');
    }
}

function checkDailyReset() {
    const today = new Date().toISOString().split('T')[0];
    if (gameState.lastResetDate !== today) {
        gameState.lastResetDate = today;
        Object.values(gameState.habits).forEach(cat => cat.forEach(h => h.done = false));
        gameState.character.energieCombat = 0;
        saveGame();
    }
}

let currentTab = 'main';

function showTab(tabName) {
    currentTab = tabName;
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    const tab = document.getElementById(`tab-${tabName}`);
    if (tab) tab.classList.add('active');
    if (event?.target) {
        document.querySelectorAll('.tab-btn').forEach(b => { b.style.backgroundColor = '#5a7a6a'; b.style.borderBottom = 'none'; });
        event.target.style.backgroundColor = '#2d4a3d';
        event.target.style.borderBottom = '3px solid #FFD700';
    }
    render();
}

function updateUI() {
    const char = gameState.character;
    const stats = getTotalStats();
    document.getElementById('charLevel').textContent = `Niv. ${char.level}`;
    document.getElementById('energieText').textContent = char.energie;
    document.getElementById('momentumText').textContent = `x${char.momentum.toFixed(1)}`;
    document.getElementById('xpText').textContent = `${char.xp}/${char.xpToNext}`;
    document.getElementById('hpText').textContent = `${char.vitalite}/${char.maxVitalite + stats.hp}`;
    const xpP = Math.min(100, (char.xp / char.xpToNext) * 100);
    const hpP = Math.min(100, (char.vitalite / (char.maxVitalite + stats.hp)) * 100);
    const xpB = document.getElementById('xpBar');
    if (xpB) xpB.style.width = `${xpP}%`;
    const hpB = document.getElementById('hpBar');
    if (hpB) hpB.style.width = `${hpP}%`;
}

function renderAvatar() {
    const char = gameState.character;
    const cls = AVATAR_CLASSES[char.class] || AVATAR_CLASSES.assassin;
    const stats = getTotalStats();
    return `<div style="background: linear-gradient(135deg, ${cls.color}33, ${cls.color}55); border: 3px solid ${cls.color}; border-radius: 1rem; padding: 1.5rem; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.2);"><div style="font-size: 4rem;">${cls.avatar}</div><div style="font-weight: bold; font-size: 1.25rem; color: #1a3a2a;">${cls.name}</div><div style="font-size: 0.85rem; color: #2d4a3d; margin: 1rem 0;">⚔️ ${stats.force} | 🎯 ${stats.agilite} | 🧠 ${stats.intelligence} | 🛡️ ${stats.defense}</div></div>`;
}

function renderMain() {
    const cats = { combat: { icon: '⚔️', title: 'Combat', bg: '#f5e8d4', border: '#d4c4a8' }, nutrition: { icon: '🥗', title: 'Nutrition', bg: '#c8dfd8', border: '#5a7a6a' }, dev: { icon: '🧠', title: 'Dev', bg: '#c8dfd8', border: '#5a7a6a' }, menage: { icon: '🧹', title: 'Ménage', bg: '#c8dfd8', border: '#5a7a6a' }, pro: { icon: '💼', title: 'Pro', bg: '#c8dfd8', border: '#5a7a6a' }, blackhat: { icon: '🎬', title: 'Black Hat', bg: '#f5c4c4', border: '#a0522d' } };
    let html = renderAvatar() + '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">';
    Object.entries(cats).forEach(([cat, cfg]) => {
        html += `<div style="background: ${cfg.bg}; border-radius: 1rem; padding: 1.5rem; border: 3px solid ${cfg.border};"><h3 style="display: flex; gap: 0.75rem; font-weight: bold; color: #1a3a2a; margin: 0 0 1rem 0;"><span style="font-size: 1.5rem;">${cfg.icon}</span>${cfg.title}</h3><div style="display: flex; flex-direction: column; gap: 0.75rem;">`;
        (gameState.habits[cat] || []).forEach(h => {
            html += `<div style="background: ${h.done ? '#6b9b7f' : '#fff'}; border-radius: 0.75rem; padding: 1rem; border: 3px solid ${h.done ? '#2d4a3d' : cfg.border}; cursor: pointer;" onclick="GameApp.toggleHabit('${cat}', ${h.id})"><div style="display: flex; justify-content: space-between;"><div style="display: flex; gap: 0.75rem;"><span style="font-size: 1.25rem;">${h.icon}</span><div style="color: ${h.done ? '#fff' : '#1a3a2a'}; font-weight: bold;"><div>${h.name}</div>${h.streak > 0 ? `<div style="font-size: 0.75rem;">🔥 ${h.streak}j</div>` : ''}</div></div><div style="display: flex; gap: 0.5rem;"><span style="background: ${h.done ? '#2d4a3d' : cfg.border}; color: white; padding: 0.5rem 0.75rem; border-radius: 0.25rem; font-size: 0.7rem; font-weight: bold;">+${h.xp}XP</span><button onclick="event.stopPropagation(); GameApp.deleteHabit('${cat}', ${h.id})" style="background: #c44545; color: white; border: none; padding: 0.4rem 0.6rem; border-radius: 0.3rem; cursor: pointer; font-weight: bold;">✕</button></div></div></div>`;
        });
        html += '</div></div>';
    });
    html += '</div>';
    const tab = document.getElementById('tab-main');
    if (tab) tab.innerHTML = html;
}

function renderQuests() {
    const boss = gameState.bossSystem?.currentBoss;
    const hpP = Math.min(100, (boss.hp / boss.maxHp) * 100);
    const stats = getTotalStats();
    const dmg = Math.max(1, Math.floor(stats.force + stats.agilite * 0.5 + stats.intelligence * 0.3 + stats.bossDamage));
    let html = `<div style="background: #f5c4c4; border-radius: 1rem; padding: 1.5rem; border: 3px solid #a0522d;"><h3 style="font-size: 1.25rem; font-weight: bold; color: #1a3a2a; margin: 0 0 1rem 0;">⚔️ Boss - Tier ${boss.tier}</h3><div style="background: #fff; border-radius: 0.75rem; padding: 1rem; border: 3px solid #a0522d;"><div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;"><span style="font-size: 2.5rem;">${boss.icon}</span><div><div style="font-weight: bold; color: #1a3a2a;">${boss.name}</div><div style="font-size: 0.9rem; color: #a0522d;">Dégâts: ${dmg}</div></div></div><div style="margin-bottom: 1rem;"><div style="background: #e8f5f2; border-radius: 0.5rem; height: 1.5rem; border: 2px solid #a0522d; overflow: hidden;"><div style="width: ${hpP}%; height: 100%; background: #a0522d; transition: all 0.3s;"></div></div></div><div style="text-align: center; font-weight: bold; margin-bottom: 1rem;">${boss.hp}/${boss.maxHp} HP</div><button onclick="GameApp.attackBossNew()" style="width: 100%; background: ${gameState.character.energieCombat >= 20 ? '#a0522d' : '#ccc'}; color: white; border: none; padding: 0.75rem; border-radius: 0.5rem; font-weight: bold; cursor: pointer;">⚔️ ATTAQUER ${gameState.character.energieCombat >= 20 ? '(-20 ⚔️)' : '(besoin 20)'}</button></div></div>`;
    const tab = document.getElementById('tab-quests');
    if (tab) tab.innerHTML = html;
}

function renderShop() {
    let html = `<div style="background: #c8dfd8; border-radius: 1rem; padding: 1.5rem; border: 3px solid #5a7a6a;"><h3 style="font-size: 1.25rem; font-weight: bold; margin: 0 0 1.5rem 0;">🛍️ Boutique - ${gameState.character.energie} ⚡</h3><div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1rem;">`;
    Object.values(EQUIPMENT_CATALOG).slice(0, 16).forEach(item => {
        const canBuy = gameState.character.level >= item.level && gameState.character.energie >= item.price;
        html += `<div style="background: ${canBuy ? '#fff' : '#e8e8e8'}; border-radius: 0.75rem; padding: 1rem; text-align: center; border: 2px solid ${canBuy ? '#5a7a6a' : '#aaa'};"><div style="font-size: 2rem; margin-bottom: 0.5rem;">${item.icon}</div><div style="font-weight: bold; font-size: 0.8rem; margin-bottom: 0.75rem;">${item.name}</div><button onclick="GameApp.buyEquipment('${item.id}')" style="width: 100%; background: ${canBuy ? '#5a7a6a' : '#aaa'}; color: white; border: none; padding: 0.75rem; border-radius: 0.4rem; font-weight: bold; cursor: ${canBuy ? 'pointer' : 'not-allowed'};">${item.price}⚡</button></div>`;
    });
    html += `</div></div>`;
    const tab = document.getElementById('tab-shop');
    if (tab) tab.innerHTML = html;
}

function renderEquipment() {
    const slots = [
        { slot: 'helmet', label: '🪖 Casque' }, { slot: 'cape', label: '🧥 Cape' },
        { slot: 'armor', label: '🛡️ Armure' }, { slot: 'boots', label: '👢 Bottes' },
        { slot: 'gloves', label: '🧤 Gants' }, { slot: 'necklace', label: '📿 Collier' },
        { slot: 'ring1', label: '💍 Anneau 1' }, { slot: 'ring2', label: '💍 Anneau 2' },
        { slot: 'weapon', label: '⚔️ Arme' }
    ];
    let html = `<div style="display: grid; gap: 1.5rem;"><div style="background: #c8dfd8; border-radius: 1rem; padding: 1.5rem; border: 3px solid #5a7a6a;"><h3 style="font-weight: bold; margin: 0 0 1.5rem 0;">🛡️ Équipements</h3><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">`;
    slots.forEach(({ slot, label }) => {
        const itemId = gameState.character.equipment[slot];
        const item = itemId ? EQUIPMENT_CATALOG[itemId] : null;
        html += `<div style="background: #fff; border-radius: 0.75rem; padding: 1rem; border: 2px solid ${item ? '#5a7a6a' : '#d4c4a8'};"><div style="font-weight: bold; margin-bottom: 0.75rem;">${label}</div>${item ? `<div style="background: #e8f5f2; border-radius: 0.5rem; padding: 0.75rem;"><div style="font-size: 1.5rem; margin-bottom: 0.5rem;">${item.icon}</div><div style="font-weight: bold; font-size: 0.9rem; margin-bottom: 0.5rem;">${item.name}</div><button onclick="GameApp.unequipItem('${slot}')" style="width: 100%; background: #c44545; color: white; border: none; padding: 0.5rem; border-radius: 0.3rem; font-weight: bold;">Retirer</button></div>` : `<div style="background: #f5f5f5; border-radius: 0.5rem; padding: 0.75rem; text-align: center; color: #aaa;">Vide</div>`}</div>`;
    });
    html += `</div></div><div style="background: #c8dfd8; border-radius: 1rem; padding: 1.5rem; border: 3px solid #5a7a6a;"><h3 style="font-weight: bold; margin: 0 0 1.5rem 0;">📦 Inventaire (${gameState.character.inventory.length})</h3><div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem;">`;
    if (gameState.character.inventory.length === 0) {
        html += `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #2d4a3d;">Inventaire vide</div>`;
    } else {
        gameState.character.inventory.forEach(itemId => {
            const item = EQUIPMENT_CATALOG[itemId];
            if (!item) return;
            html += `<div style="background: #fff; border-radius: 0.75rem; padding: 1rem; text-align: center; border: 2px solid #d4c4a8;"><div style="font-size: 2rem; margin-bottom: 0.5rem;">${item.icon}</div><div style="font-weight: bold; font-size: 0.9rem; margin-bottom: 0.75rem;">${item.name}</div><button onclick="GameApp.equipItem('${itemId}')" style="width: 100%; background: #5a7a6a; color: white; border: none; padding: 0.5rem; border-radius: 0.3rem; margin-bottom: 0.5rem; font-weight: bold;">Équiper</button><button onclick="GameApp.sellEquipment('${itemId}')" style="width: 100%; background: #d4a574; color: white; border: none; padding: 0.5rem; border-radius: 0.3rem; font-weight: bold;">Vendre +${item.sellPrice}</button></div>`;
        });
    }
    html += `</div></div></div>`;
    const tab = document.getElementById('tab-equipment');
    if (tab) tab.innerHTML = html;
}

function renderProjectPro() {
    let html = `<div style="background: #c8dfd8; border-radius: 1rem; padding: 1.5rem; border: 3px solid #5a7a6a;"><h3 style="font-weight: bold; margin: 0 0 1.5rem 0;">🎯 Projet Pro</h3><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">`;
    Object.entries(gameState.projetPro.voies).forEach(([voie, data]) => {
        const titles = { mentor: 'Mentor', artisan3d: 'Artisan 3D', menuisier: 'Menuisier' };
        const prog = Math.min(100, (data.xp / 100) * 100);
        html += `<div style="background: #fff; border-radius: 0.75rem; padding: 1rem; border: 2px solid #5a7a6a; text-align: center;"><h4 style="font-weight: bold; margin: 0 0 0.75rem 0;">${titles[voie]}</h4><div style="font-size: 1.5rem; font-weight: bold;">Niv.${data.level}</div><div style="font-size: 0.8rem; margin: 0.75rem 0;">${data.xp}/100 XP</div><div style="background: #e8f5f2; border-radius: 0.4rem; height: 0.75rem; border: 2px solid #5a7a6a; overflow: hidden;"><div style="height: 100%; background: #5a7a6a; width: ${prog}%; transition: width 0.3s;"></div></div></div>`;
    });
    html += `</div></div>`;
    const tab = document.getElementById('tab-pro');
    if (tab) tab.innerHTML = html;
}

function renderPoids() {
    let html = `<div style="background: #c8dfd8; border-radius: 1rem; padding: 1.5rem; border: 3px solid #5a7a6a;"><h3 style="font-weight: bold; margin: 0 0 1rem 0;">⚖️ Suivi Poids</h3><div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;"><div style="background: #fff; border-radius: 0.75rem; padding: 1.5rem; text-align: center; border: 2px solid #8b6f47;"><div style="font-size: 0.9rem; color: #2d4a3d; font-weight: bold; margin-bottom: 0.5rem;">Actuel</div><div style="font-size: 2.5rem; font-weight: bold;">${gameState.character.weight}</div><input id="newWeight" type="number" step="0.1" placeholder="Nouveau" style="width: 100%; padding: 0.75rem; border: 2px solid #8b6f47; border-radius: 0.4rem; margin-top: 0.75rem;"><button onclick="GameApp.updateWeight()" style="width: 100%; background: #8b6f47; color: white; border: none; padding: 0.75rem; border-radius: 0.4rem; margin-top: 0.75rem; font-weight: bold;">Enregistrer</button></div><div style="background: #fff; border-radius: 0.75rem; padding: 1.5rem; text-align: center; border: 2px solid #5a7a6a;"><div style="font-size: 0.9rem; color: #2d4a3d; font-weight: bold; margin-bottom: 0.5rem;">Objectif</div><div style="font-size: 2.5rem; font-weight: bold;">${gameState.character.targetWeight}</div><div style="font-weight: bold; margin-top: 1rem; color: ${gameState.character.weight > gameState.character.targetWeight ? '#a0522d' : '#5a7a6a'};">${gameState.character.weight > gameState.character.targetWeight ? 'Encore ' + (gameState.character.weight - gameState.character.targetWeight).toFixed(1) + 'kg' : '✅ Objectif!'}</div></div></div></div>`;
    const tab = document.getElementById('tab-poids');
    if (tab) tab.innerHTML = html;
}

function renderAchievements() {
    let html = `<div style="background: #c8dfd8; border-radius: 1rem; padding: 1.5rem; border: 3px solid #d4a574;"><h3 style="font-weight: bold; margin: 0 0 1.5rem 0;">🏆 Achievements</h3><div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem;">`;
    gameState.achievements.forEach(ach => {
        html += `<div style="background: ${ach.unlocked ? '#d4e8dd' : '#fff'}; border-radius: 0.75rem; padding: 1rem; text-align: center; border: 2px solid ${ach.unlocked ? '#5a7a6a' : '#d4c4a8'};"><div style="font-size: 2.5rem;">${ach.unlocked ? '🏆' : '🔒'}</div><div style="font-weight: bold; color: ${ach.unlocked ? '#1a3a2a' : '#5a4a3a'}; margin: 0.5rem 0; font-size: 0.9rem;">${ach.name}</div><div style="font-size: 0.75rem; color: #2d4a3d;">${ach.desc}</div>${ach.unlocked ? `<div style="margin-top: 0.5rem; font-size: 0.7rem; color: #5a7a6a; font-weight: bold;">✅ Débloqué</div>` : ''}</div>`;
    });
    html += `</div></div>`;
    const tab = document.getElementById('tab-achievements');
    if (tab) tab.innerHTML = html;
}

function renderJournal() {
    let html = `<div style="background: #c8dfd8; border-radius: 1rem; padding: 1.5rem; border: 3px solid #5a7a6a;"><h3 style="font-weight: bold; margin: 0 0 1rem 0;">📖 Journal</h3>`;
    if (gameState.journal.length === 0) {
        html += `<div style="text-align: center; padding: 2rem;"><div style="font-size: 3rem; margin-bottom: 1rem;">📜</div><p style="font-weight: bold;">Votre aventure commence...</p></div>`;
    } else {
        html += `<div style="display: flex; flex-direction: column; gap: 0.75rem;">`;
        gameState.journal.slice(0, 20).forEach(entry => {
            const colors = { success: '#d4e8dd', epic: '#f5e8d4', info: '#d4e0f5', danger: '#f5d4d4' };
            html += `<div style="background: ${colors[entry.type] || '#fff'}; border-left: 4px solid ${entry.type === 'success' ? '#5a7a6a' : entry.type === 'epic' ? '#d4a574' : entry.type === 'danger' ? '#c44545' : '#8fa8c8'}; border-radius: 0.5rem; padding: 0.75rem; font-size: 0.9rem;">${entry.text}</div>`;
        });
        html += `</div>`;
    }
    html += `</div>`;
    const tab = document.getElementById('tab-journal');
    if (tab) tab.innerHTML = html;
}

function renderCalendar() {
    let html = `<div style="background: #c8dfd8; border-radius: 1rem; padding: 1.5rem; border: 3px solid #5a7a6a;"><h3 style="font-weight: bold; margin: 0 0 1.5rem 0;">📅 Calendrier</h3><div style="background: white; border-radius: 0.75rem; padding: 1rem; text-align: center; border: 2px solid #5a7a6a;"><div style="font-weight: bold; margin-bottom: 1rem;">📊 Consultez vos habitudes pour voir la progression!</div><div style="color: #2d4a3d; font-size: 0.9rem;">Complétez les habitudes quotidiennement pour construire vos streaks!</div></div></div>`;
    const tab = document.getElementById('tab-calendar');
    if (tab) tab.innerHTML = html;
}

function render() {
    try {
        updateUI();
        switch(currentTab) {
            case 'main': renderMain(); break;
            case 'quests': renderQuests(); break;
            case 'shop': renderShop(); break;
            case 'equipment': renderEquipment(); break;
            case 'pro': renderProjectPro(); break;
            case 'poids': renderPoids(); break;
            case 'achievements': renderAchievements(); break;
            case 'journal': renderJournal(); break;
            case 'calendar': renderCalendar(); break;
            default: renderMain();
        }
    } catch(e) { console.error('Erreur render:', e); }
}

function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choice => {
            if (choice.outcome === 'accepted') console.log('App installée');
            deferredPrompt = null;
        });
    }
}

function hideInstallBanner() {
    document.getElementById('installBanner').classList.add('hidden');
}

// ========================================
// EXPORT
// ========================================

window.GameApp = {
    loadGame, saveGame, checkDailyReset, showTab, render, updateUI,
    toggleHabit, deleteHabit, attackBossNew, buyEquipment, equipItem, unequipItem, sellEquipment,
    updateWeight, unlockAchievement, installApp, hideInstallBanner,
    getTotalStats, renderAvatar, renderMain, renderQuests, renderShop, renderEquipment,
    renderProjectPro, renderPoids, renderAchievements, renderJournal, renderCalendar
};

console.log('✅ App ROUBLARD chargée!');