'use strict';

let gameState = {
    character: {
        level: 1,
        xp: 0,
        xpToNext: 100,
        totalXp: 0
    },
    habits: {
        combat: [
            { id: 1, name: 'Boxe', icon: '🥊', done: false, streak: 0, timeHistory: [] },
            { id: 2, name: 'Footing', icon: '🏃', done: false, streak: 0, timeHistory: [] },
            { id: 3, name: 'Muscu', icon: '💪', done: false, streak: 0, timeHistory: [] }
        ],
        nutrition: [
            { id: 1, name: 'Petit-déj', icon: '🥣', done: false, streak: 0, timeHistory: [] },
            { id: 2, name: 'Déjeuner', icon: '🍽️', done: false, streak: 0, timeHistory: [] },
            { id: 3, name: 'Diner', icon: '🥗', done: false, streak: 0, timeHistory: [] },
            { id: 4, name: 'Hydratation', icon: '💧', done: false, streak: 0, timeHistory: [] }
        ],
        dev: [
            { id: 1, name: 'Lecture', icon: '📚', done: false, streak: 0, timeHistory: [] },
            { id: 2, name: 'Coder', icon: '💻', done: false, streak: 0, timeHistory: [] }
        ],
        menage: [
            { id: 1, name: 'Lit', icon: '🛏️', done: false, streak: 0, timeHistory: [] },
            { id: 2, name: 'Cuisine', icon: '🧽', done: false, streak: 0, timeHistory: [] },
            { id: 3, name: 'Salle bain', icon: '🚿', done: false, streak: 0, timeHistory: [] }
        ],
        pro: [
            { id: 1, name: 'Portfolio', icon: '📄', done: false, streak: 0, timeHistory: [] },
            { id: 2, name: 'Formation', icon: '🎓', done: false, streak: 0, timeHistory: [] }
        ]
    },
    bosses: [
        { id: 1, tier: 1, name: 'La Procrastination', icon: '😴', hp: 100, maxHp: 100, daysRequired: 7, consecutiveDays: 0, lastAttackDate: null, defeated: false },
        { id: 2, tier: 2, name: 'Le Doute', icon: '😰', hp: 200, maxHp: 200, daysRequired: 14, consecutiveDays: 0, lastAttackDate: null, defeated: false },
        { id: 3, tier: 3, name: 'La Peur', icon: '😨', hp: 300, maxHp: 300, daysRequired: 30, consecutiveDays: 0, lastAttackDate: null, defeated: false },
        { id: 4, tier: 4, name: 'Le Néant', icon: '👹', hp: 400, maxHp: 400, daysRequired: 60, consecutiveDays: 0, lastAttackDate: null, defeated: false }
    ],
    monthlyBosses: [
        { month: 0, name: 'Seigneur Paresse', icon: '😴', hp: 500, maxHp: 500, defeated: false },
        { month: 1, name: 'Roi Malbouffe', icon: '🍔', hp: 500, maxHp: 500, defeated: false },
        { month: 2, name: 'Chaos Incarné', icon: '🌪️', hp: 500, maxHp: 500, defeated: false },
        { month: 3, name: 'Doute Paralysant', icon: '🌑', hp: 500, maxHp: 500, defeated: false }
    ],
    achievements: [
        { id: 1, name: 'Premier Pas', desc: '1 habitude', unlocked: false },
        { id: 2, name: 'Momentum', desc: '7j streak', unlocked: false },
        { id: 3, name: 'Maître 50h', desc: '50h total', unlocked: false },
        { id: 4, name: 'Maître 100h', desc: '100h total', unlocked: false },
        { id: 5, name: 'Tueur Boss I', desc: 'Tier 1', unlocked: false },
        { id: 6, name: 'Tueur Boss II', desc: 'Tier 2', unlocked: false },
        { id: 7, name: 'Tueur Boss III', desc: 'Tier 3', unlocked: false },
        { id: 8, name: 'Tueur Boss IV', desc: 'Tier 4', unlocked: false }
    ],
    lastResetDate: null,
    weeklyStats: {}
};

function saveGame() {
    localStorage.setItem('roublard_save', JSON.stringify(gameState));
}

function loadGame() {
    const save = localStorage.getItem('roublard_save');
    if (save) {
        gameState = JSON.parse(save);
    }
}

function showNotif(msg) {
    const notif = document.getElementById('notification');
    notif.textContent = msg;
    notif.classList.remove('hidden');
    setTimeout(() => notif.classList.add('hidden'), 2000);
}

function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

function getWeekStart() {
    const today = new Date();
    const first = today.getDate() - today.getDay();
    const weekStart = new Date(today.setDate(first));
    return weekStart.toISOString().split('T')[0];
}

function toggleHabit(category, id, minutes) {
    const habit = gameState.habits[category].find(h => h.id === id);
    if (!habit || habit.done) return;

    const today = getTodayDate();
    const xpGained = Math.floor(minutes * 1.5);
    
    habit.done = true;
    habit.streak++;
    habit.timeHistory.push({ date: today, minutes });
    gameState.character.xp += xpGained;
    gameState.character.totalXp += xpGained;

    if (gameState.character.xp >= gameState.character.xpToNext) {
        gameState.character.level++;
        gameState.character.xp -= gameState.character.xpToNext;
        gameState.character.xpToNext += 50;
        showNotif(`🎉 Level ${gameState.character.level}!`);
    }

    if (habit.streak === 1) GameApp.unlockAchievement(1);
    if (habit.streak === 7) GameApp.unlockAchievement(2);

    showNotif(`✅ +${xpGained} XP (${minutes}min)`);
    saveGame();
    GameApp.render();
}

function attackBoss(tierIndex) {
    const boss = gameState.bosses[tierIndex];
    if (boss.defeated) return showNotif('Boss déjà vaincu!');

    const today = getTodayDate();
    if (boss.lastAttackDate === today) return showNotif('⏰ Reviens demain');

    const totalHours = getTotalHours();
    const damage = Math.floor(totalHours * 10) + 20;
    
    boss.hp -= damage;
    boss.lastAttackDate = today;
    boss.consecutiveDays++;

    if (boss.hp <= 0) {
        boss.defeated = true;
        const xpReward = 500 * boss.tier;
        gameState.character.xp += xpReward;
        gameState.character.totalXp += xpReward;
        showNotif(`🏆 Boss vaincu! +${xpReward} XP`);
        GameApp.unlockAchievement(4 + boss.tier);
    } else {
        showNotif(`⚔️ -${damage} HP (${boss.hp}/${boss.maxHp})`);
    }

    saveGame();
    GameApp.render();
}

function getTotalHours() {
    let total = 0;
    const weekStart = getWeekStart();
    
    Object.values(gameState.habits).forEach(cat => {
        cat.forEach(h => {
            h.timeHistory.forEach(entry => {
                if (entry.date >= weekStart) {
                    total += entry.minutes;
                }
            });
        });
    });
    
    return Math.floor(total / 60);
}

function getTodayCount() {
    const today = getTodayDate();
    let count = 0;
    
    Object.values(gameState.habits).forEach(cat => {
        cat.forEach(h => {
            if (h.done) count++;
        });
    });
    
    return count;
}

function checkDailyReset() {
    const today = getTodayDate();
    if (gameState.lastResetDate !== today) {
        gameState.lastResetDate = today;
        Object.values(gameState.habits).forEach(cat => {
            cat.forEach(h => h.done = false);
        });
        saveGame();
    }
}

function unlockAchievement(id) {
    const ach = gameState.achievements.find(a => a.id === id);
    if (ach && !ach.unlocked) {
        ach.unlocked = true;
        showNotif(`🏆 ${ach.name}!`);
        saveGame();
    }
}

function updateUI() {
    document.getElementById('level').textContent = gameState.character.level;
    document.getElementById('xpText').textContent = `${gameState.character.xp}/${gameState.character.xpToNext}`;
    
    const xpPercent = (gameState.character.xp / gameState.character.xpToNext) * 100;
    document.getElementById('xpFill').style.width = xpPercent + '%';
    
    document.getElementById('weekHours').textContent = getTotalHours() + 'h';
    document.getElementById('todayCount').textContent = getTodayCount() + '/12';
}

function renderHabits() {
    const categories = {
        combat: '⚔️ Combat',
        nutrition: '🥗 Nutrition',
        dev: '🧠 Développement',
        menage: '🧹 Ménage',
        pro: '💼 Professionnel'
    };

    let html = '';
    
    Object.entries(categories).forEach(([cat, label]) => {
        html += `<div class="category">
            <h3>${label}</h3>
            <div>`;
        
        gameState.habits[cat].forEach(h => {
            const minutesInput = `<input type="number" id="min-${cat}-${h.id}" placeholder="min" min="1" max="999" value="30">`;
            html += `<div class="habit-item ${h.done ? 'done' : ''}" onclick="GameApp.completeHabit('${cat}', ${h.id})">
                <div class="habit-info">
                    <div class="habit-name">${h.icon} ${h.name}</div>
                    <div class="habit-meta">${minutesInput}</div>
                </div>
                <div class="habit-streak">${h.streak}🔥</div>
            </div>`;
        });
        
        html += '</div></div>';
    });
    
    document.getElementById('tab-habits').innerHTML = html;
}

function renderBoss() {
    let html = '<h3 style="color: #d4af37; margin-bottom: 1.5rem;">⚔️ Boss Quotidiens</h3>';
    
    gameState.bosses.forEach((boss, idx) => {
        const hpPercent = (boss.hp / boss.maxHp) * 100;
        html += `<div class="boss-card">
            <div class="boss-header">
                <span class="boss-title">${boss.icon} ${boss.name}</span>
                <span class="boss-tier">Tier ${boss.tier}</span>
            </div>
            <div class="hp-bar"><div class="hp-fill" style="width: ${hpPercent}%"></div></div>
            <div class="boss-stats">
                <span>${boss.hp}/${boss.maxHp} HP</span>
                <span>${boss.consecutiveDays}/${boss.daysRequired}j</span>
            </div>
            <button class="attack-btn" onclick="GameApp.attackBoss(${idx})" ${boss.defeated ? 'disabled' : ''}>
                ${boss.defeated ? '✓ Vaincu' : '⚔️ Attaquer'}
            </button>
        </div>`;
    });
    
    document.getElementById('tab-boss').innerHTML = html;
}

function renderStats() {
    const weekHours = getTotalHours();
    const totalHours = Math.floor(gameState.character.totalXp / 1.5 / 60);
    
    let html = `<h3 style="color: #d4af37; margin-bottom: 1.5rem;">📊 Statistiques</h3>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-card-label">Heures semaine</div>
                <div class="stat-card-value">${weekHours}h</div>
                <div class="stat-card-change">📈 Bravo!</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label">Heures totales</div>
                <div class="stat-card-value">${totalHours}h</div>
            </div>
            <div class="stat-card">
                <div class="stat-card-label">XP total</div>
                <div class="stat-card-value">${gameState.character.totalXp}</div>
            </div>
        </div>`;
    
    document.getElementById('tab-stats').innerHTML = html;
}

function renderAchievements() {
    let html = '<h3 style="color: #d4af37; margin-bottom: 1.5rem;">🏆 Achievements</h3><div style="display: flex; flex-wrap: wrap;">';
    
    gameState.achievements.forEach(ach => {
        html += `<div class="achievement ${ach.unlocked ? 'unlocked' : ''}">
            <div class="ach-icon">${ach.unlocked ? '⭐' : '🔒'}</div>
            <div class="ach-name">${ach.name}</div>
            <div class="ach-desc">${ach.desc}</div>
        </div>`;
    });
    
    html += '</div>';
    document.getElementById('tab-achievements').innerHTML = html;
}

function render() {
    updateUI();
    const activeTab = document.querySelector('.tab-content.active').id;
    
    if (activeTab === 'tab-habits') renderHabits();
    else if (activeTab === 'tab-boss') renderBoss();
    else if (activeTab === 'tab-stats') renderStats();
    else if (activeTab === 'tab-achievements') renderAchievements();
}

window.GameApp = {
    loadGame,
    saveGame,
    showTab: (tabName) => {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`tab-${tabName}`).classList.add('active');
        document.querySelector(`[onclick="GameApp.showTab('${tabName}')"]`).classList.add('active');
        render();
    },
    render,
    checkDailyReset,
    completeHabit: (category, id) => {
        const minutesInput = document.getElementById(`min-${category}-${id}`);
        const minutes = parseInt(minutesInput?.value) || 30;
        toggleHabit(category, id, minutes);
    },
    attackBoss,
    unlockAchievement
};

console.log('✅ Roublard chargé!');
