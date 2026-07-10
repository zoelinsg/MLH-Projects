# 🎮 MONA MAYHEM ARENA LAB - POWER-UP SYSTEM PLAN

---

## 1. FEATURE OVERVIEW

### **What are Power-Ups?**
Temporary gameplay modifiers that spawn randomly during battle. Players collect them by moving into their collision area and gain temporary gameplay advantages.

### **The 4 Power-Up Types**

| Icon | Type | Effect | Duration | Type | Category |
|------|------|--------|----------|------|----------|
| ❤️ | **Health Boost** | Restore 30 HP immediately | Instant | Instant | Healing |
| ⚡ | **Speed Boost** | Move 2x faster | 8 seconds | Timed | Mobility |
| 🛡️ | **Temporary Shield** | Absorb next hit (1 damage reduced) | 10 seconds | Timed | Defense |
| 💥 | **Double Damage** | All attacks deal 2x damage | 6 seconds | Timed | Offense |

### **Key Mechanics**
- Power-ups spawn every 5-10 seconds (random interval)
- Maximum 3-4 power-ups active in arena at once
- Player can have multiple active effects simultaneously
- Effects apply instantly when collected
- Duration effects expire automatically and safely reset stats
- No conflicting effects (only one of same type at a time)

---

## 2. DATA MODEL FOR POWER-UPS

### **2.1 Power-Up Definition (Static)**
How each power-up is configured:

```javascript
const POWERUP_DEFINITIONS = {
  healthBoost: {
    id: 'healthBoost',
    name: 'Health Boost',
    icon: '❤️',
    description: 'Restore 30 HP',
    rarity: 'common',
    category: 'instant',     // instant OR timed
    duration: 0,             // 0 for instant effects
    effect: {
      type: 'heal',
      amount: 30
    }
  },
  speedBoost: {
    id: 'speedBoost',
    name: 'Speed Boost',
    icon: '⚡',
    description: 'Move 2x faster',
    rarity: 'rare',
    category: 'timed',
    duration: 8000,          // milliseconds
    effect: {
      type: 'statMultiplier',
      stat: 'speed',
      multiplier: 2.0
    }
  },
  shield: {
    id: 'shield',
    name: 'Temporary Shield',
    icon: '🛡️',
    description: 'Absorb next hit',
    rarity: 'rare',
    category: 'timed',
    duration: 10000,
    effect: {
      type: 'shield',
      durability: 1            // absorbs 1 hit
    }
  },
  doubleDamage: {
    id: 'doubleDamage',
    name: 'Double Damage',
    icon: '💥',
    description: 'Deal 2x damage',
    rarity: 'epic',
    category: 'timed',
    duration: 6000,
    effect: {
      type: 'statMultiplier',
      stat: 'damage',
      multiplier: 2.0
    }
  }
};
```

### **2.2 Arena Power-Up Instance (In-Game)**
Each power-up spawned in the arena:

```javascript
// Single power-up currently in the arena
{
  id: 'pu_12345',              // Unique identifier (pu_timestamp)
  type: 'speedBoost',          // References POWERUP_DEFINITIONS key
  x: 345,                      // X position in arena
  y: 210,                      // Y position in arena
  radius: 25,                  // Collision radius
  spawnTime: 1234567890,       // When it spawned (Date.now())
  collected: false,            // Whether player has collected it
  timeToLive: 15000            // Disappears after 15 seconds (optional)
}

// Array to store all arena powerups
const arenaPowerups = [];
```

### **2.3 Player Active Power-Up (Applied to Player)**
After player collects a power-up:

```javascript
// Single active effect on the player
{
  id: 'active_12345',                      // Unique id for tracking
  definitionId: 'speedBoost',              // Reference to POWERUP_DEFINITIONS
  collectedTime: 1234567890,               // When player collected it
  duration: 8000,                          // How long it lasts (ms)
  expiresAt: 1234567890 + 8000,           // Absolute expiration time
  active: true,                            // Whether effect is currently active
  originalStats: {                         // SAFETY: Store original values
    speed: 1.0,
    damage: 1.0
  }
}

// Array to store player's active power-ups
const playerActivePowerups = [];
```

### **2.4 Player Stats (Modified by Power-Ups)**
```javascript
const playerStats = {
  maxHealth: 100,
  currentHealth: 100,
  speed: 1.0,              // 1.0 = normal, 2.0 = 2x, etc
  damage: 1.0,             // 1.0 = normal, 2.0 = 2x, etc
  shieldActive: false,
  shieldDurability: 0,
  
  // Powerup tracking (for stats/UI)
  lastPowerupCollected: null,
  totalPowerupsCollected: 0
};
```

---

## 3. STATE FLOW (THE CRUCIAL PART)

### **3.1 Battle State Diagram**

```
┌─────────────────────────────────────────────────────────────┐
│                    GAME LOOP (Every 16ms)                    │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
   [Spawn Check]        [Collision Check]   [Expiration Check]
   (Every 5-10 sec)     (Every frame)       (Every 100ms)
        │                     │                     │
        │                     │                     │
        ▼                     ▼                     ▼
   Create power-ups    Detect pickup       Remove expired
   in arena            Apply effect        Reset player stats
```

### **3.2 State Transitions - Detailed Flow**

#### **FLOW 1: POWER-UP SPAWNING**
```
Start: Battle begins
       │
       ▼
    Set last spawn time
       │
       ├─► Every 100ms check: (currentTime - lastSpawnTime) > randomInterval?
       │   - Random interval: 5000-10000ms (5-10 seconds)
       │
       ├─ NO → Continue checking
       │
       └─ YES → Can we spawn? (arenaPowerups.length < MAX_POWERUPS)
            │
            ├─ NO → Try again later
            │
            └─ YES → Create new power-up instance
                     Set: id, type, random x/y, spawnTime
                     Add to arenaPowerups array
                     Update last spawn time
                     Re-render arena
```

#### **FLOW 2: COLLISION DETECTION & COLLECTION**
```
Every frame:
  For each power-up in arenaPowerups:
    │
    ├─ Already collected? → Skip
    │
    └─ Calculate distance to player:
         distance = Math.hypot(playerX - puX, playerY - puY)
         
         ├─ distance > (playerRadius + puRadius)? → No collision
         │
         └─ distance ≤ (playerRadius + puRadius)? → COLLISION!
              │
              ▼
         Mark powerup as collected: pu.collected = true
              │
              ▼
         Apply effect based on type:
              │
              ├─ Instant (Health Boost)
              │  └─ playerStats.currentHealth += 30
              │     Cap at maxHealth
              │     Show "+30 HP" popup
              │
              └─ Timed (Speed, Shield, Damage)
                 └─ Call applyTimedPowerup(pu)
                    │
                    ▼
                    Add to playerActivePowerups array with:
                      - definitionId
                      - collectedTime
                      - duration
                      - expiresAt = now + duration
                      - originalStats (BEFORE applying effect)
                    │
                    ▼
                    Apply multiplier immediately:
                      playerStats.speed *= 2.0  (etc)
              │
              ▼
         Update player stats: totalPowerupsCollected++
              │
              ▼
         Remove from arena:
         arenaPowerups.splice(index, 1)
              │
              ▼
         Update UI (show in active powerups list)
```

#### **FLOW 3: EXPIRATION & SAFE RESET (CRITICAL)**
```
Every 100ms check expiration:
  For each powerup in playerActivePowerups:
    │
    ├─ NOT active? → Skip
    │
    └─ active? → Check: isExpired(pu)
         isExpired = (Date.now() > pu.expiresAt)
         │
         ├─ NO → Continue (calculate time remaining for UI)
         │
         └─ YES → EXPIRE SAFELY:
              │
              ▼
         Mark as inactive: pu.active = false
              │
              ▼
         Restore ORIGINAL stats from pu.originalStats:
         ┌────────────────────────────────────────────┐
         │ SAFETY MECHANISM:                          │
         │ Don't subtract/divide, RESTORE originals   │
         │ This prevents floating-point errors        │
         └────────────────────────────────────────────┘
              playerStats.speed = pu.originalStats.speed
              playerStats.damage = pu.originalStats.damage
              │
              ▼
         Check if OTHER active powerups affect same stat:
         (See Section 3.3 below)
              │
              ▼
         Remove from array:
         playerActivePowerups.splice(index, 1)
              │
              ▼
         Log expiration and update UI
         Display "⚡ Speed Boost expired!"
```

### **3.3 Handling Multiple & Conflicting Power-Ups**

#### **SCENARIO: Two Speed Boosts at Once**

```
PROTECTION STRATEGY: "ONE EFFECT TYPE AT A TIME"

Constraint:
  Player can only have ONE ACTIVE powerup of the same definition type
  Player CAN have multiple DIFFERENT types (Shield + Damage = OK)

Implementation:
┌─────────────────────────────────────────────────────────┐
│ When collecting power-up:                               │
│                                                         │
│ if (playerHasActivePowerup(powerupType)) {              │
│   → Skip collection (or consume existing one)           │
│   → Return early                                        │
│ } else {                                                │
│   → Proceed with collection                             │
│ }                                                       │
└─────────────────────────────────────────────────────────┘

Function example:
function playerHasActivePowerup(definitionId) {
  return playerActivePowerups.some(
    pu => pu.definitionId === definitionId && pu.active
  );
}
```

#### **SCENARIO: Speed Boost + Double Damage (Both Active)**

```
ALLOWED: Both effects coexist

Player collected:
  1. Speed Boost (8 sec) → playerStats.speed = 2.0
  2. Double Damage (6 sec) → playerStats.damage = 2.0

Result: Player is FAST and STRONG simultaneously ✓

Active powerups array:
[
  { id: 'active_1', definitionId: 'speedBoost', ... },
  { id: 'active_2', definitionId: 'doubleDamage', ... }
]

After 6 seconds (Double Damage expires):
  1. Restore: playerStats.damage = 1.0
  2. Speed still active → playerStats.speed still = 2.0 ✓
  3. Remove only Double Damage from array
```

### **3.4 Critical Safety Rules**

```
RULE 1: Store Original Stats (Before Modification)
─────────────────────────────────────────────────────
When applying timed powerup:
  originalStats = {
    speed: playerStats.speed,        // Current value (might be 1.0 or 2.0)
    damage: playerStats.damage
  }
  Then apply effect
  
When expiring:
  Restore to original ONLY if no other active powerups affect that stat
  
WHY: Prevents cascading errors from multiple powerups

────────────────────────────────────────────────────────

RULE 2: Use Timestamps, Not Counters
─────────────────────────────────────────────────────
BAD:   count++, then check if count > 80
GOOD:  expiresAt = collectedTime + duration
       isExpired = (Date.now() > expiresAt)

WHY: Frame rate independent, always accurate

────────────────────────────────────────────────────────

RULE 3: Prevent Stat Corruption
─────────────────────────────────────────────────────
If speedBoost (2x) expires, check:
  - Does another active powerup modify speed?
    - YES → Don't reset, keep current value
    - NO  → Reset to original stat

Function example:
function getActiveMultiplierForStat(stat) {
  let multiplier = 1.0;
  playerActivePowerups.forEach(pu => {
    if (pu.active && pu.effect.stat === stat) {
      multiplier *= pu.effect.multiplier;
    }
  });
  return multiplier;
}

────────────────────────────────────────────────────────

RULE 4: One Type Per Active Instance
─────────────────────────────────────────────────────
Can have:
  ✓ One Speed Boost + One Double Damage
  ✓ Shield alone
  ✗ Two Speed Boosts simultaneously

Check before collecting:
  if (playerActivePowerups.some(
    pu => pu.definitionId === newPowerup.definitionId && pu.active
  )) {
    return;  // Already have this type
  }
```

---

## 4. FILE & COMPONENT CHANGES

### **4.1 Files to Create**

#### **New File: `powerup-system.js`**
Centralized power-up logic
```
Responsibilities:
- Define POWERUP_DEFINITIONS
- Create/spawn power-ups (createPowerup, spawnRandomPowerup)
- Track arena power-ups
- Collect/apply power-ups (collectPowerup, applyPowerupEffect)
- Handle expiration (checkExpiredPowerups)
- Utility functions (isColliding, etc)

Size: ~250-300 lines
```

#### **New File: `player-state.js`**
Player stat management
```
Responsibilities:
- Initialize playerStats object
- Initialize playerActivePowerups array
- Methods to get/set stats
- Get active multipliers
- Reset stats safely

Size: ~150-200 lines
```

#### **New File: `game-loop.js`**
Main battle loop
```
Responsibilities:
- requestAnimationFrame loop
- Call spawn check every X frames
- Call collision detection
- Call expiration check
- Call render updates

Size: ~100-150 lines
```

### **4.2 Files to Update**

#### **Update: `index.html`**
```
ADD:
- Power-ups arena section (where power-ups render)
- Active power-ups display panel (shows active effects)
- Power-up info tooltip section

STRUCTURE:
<div class="arena">
  <div class="powerups-container" id="arenaPowerups"></div>
</div>

<div class="active-powerups-panel">
  <h3>[ ACTIVE EFFECTS ]</h3>
  <div id="activePowerupsList"></div>
</div>
```

#### **Update: `style.css`**
```
ADD:
- .powerup-item { position, animation, glow effect }
- .powerup-icon { font-size, animation }
- .active-powerups-list { grid layout }
- .active-effect { animation, progress bar }
- .powerup-timer { countdown display }
- .progress-bar { filled/unfilled state }
- Animations: fadeIn, pulse, shimmer
```

#### **Update: `script.js`**
```
MODIFY:
- Add startBattle() function to initialize game loop
- Keep modal/UI button handlers
- Call initializePowerupSystem()
- Call startGameLoop()

Keep existing:
- Modal functions (openModal, closeModal)
- Button event listeners
- Game Over handlers
```

### **4.3 Component Dependencies**

```
script.js (main controller)
    │
    ├─► powerup-system.js (power-up logic)
    │    └─► Used by game-loop.js
    │
    ├─► player-state.js (player data)
    │    └─► Used by powerup-system.js & game-loop.js
    │
    └─► game-loop.js (animation loop)
         └─► Uses both above
```

---

## 5. STEP-BY-STEP IMPLEMENTATION PLAN

### **PHASE 1: Foundation (Spawn System)**
Goal: Power-ups appear in the arena

**Step 1.1: Create `player-state.js`**
- Define playerStats object
- Define playerActivePowerups array
- Export both for use in other files

**Step 1.2: Create `powerup-system.js` (Part 1)**
- Define POWERUP_DEFINITIONS constant
- Implement createPowerup(type, x, y) function
- Initialize arenaPowerups array
- Implement spawnRandomPowerup() function
  - Random x/y coordinates
  - Check max powerups limit
  - Update spawn timestamp

**Step 1.3: Update `index.html`**
- Add power-ups arena container with id="arenaPowerups"
- Add CSS classes for styling

**Step 1.4: Test Spawning**
- Manually call spawnRandomPowerup() every 3 seconds
- Verify power-ups appear in console logs
- Visual check: See power-ups render on page (placeholder elements)

**Checkpoint:** Power-ups spawn randomly in arena ✓

---

### **PHASE 2: Collision & Collection**
Goal: Player can collect power-ups

**Step 2.1: Update `powerup-system.js` (Part 2)**
- Implement detectCollisions(playerPos) function
  - Loop through arenaPowerups
  - Calculate distance to player
  - Return list of collided power-ups

**Step 2.2: Implement Collection**
- Create collectPowerup(powerupInstance) function
- Implement applyInstantEffect(def, player) for healing
- Implement applyTimedEffect(def, powerupInstance, player) for duration effects
  - Store originalStats
  - Apply multipliers
  - Add to playerActivePowerups

**Step 2.3: Update `player-state.js`**
- Add method: getOriginalStatValue(stat)
- Add method: hasActivePowerupType(definitionId)
- Add method: addActivePowerup(pu)
- Add method: removeActivePowerup(id)

**Step 2.4: Test Collection**
- Manually trigger collisions
- Check playerActivePowerups array in console
- Verify stats were modified
- Check arena power-ups removed after collection

**Checkpoint:** Collecting power-ups applies effects ✓

---

### **PHASE 3: Expiration & Reset**
Goal: Effects expire safely and stats reset

**Step 3.1: Update `powerup-system.js` (Part 3)**
- Implement checkExpiredPowerups(player) function
  - Loop through playerActivePowerups
  - Check if (Date.now() > pu.expiresAt)
  - Call expirePowerup() for each expired

**Step 3.2: Safe Expiration**
- Implement expirePowerup(pu, player) function
  - Mark pu.active = false
  - Restore original stat values
  - Check for other active effects on same stat
  - Only reset if no conflicts

**Step 3.3: Conflict Prevention**
- Implement preventDuplicatePowerups(type) function
  - Check if player already has this type active
  - Return true/false to prevent collection

**Step 3.4: Test Expiration**
- Set short duration (1-2 seconds) for testing
- Collect power-up, verify effect applied
- Wait for expiration, verify stats restored
- Check console logs for expiration messages

**Checkpoint:** Effects expire and stats safely reset ✓

---

### **PHASE 4: Game Loop Integration**
Goal: Spawn, collision, and expiration work together in battle

**Step 4.1: Create `game-loop.js`**
- Implement gameLoopRunning flag
- Implement requestAnimationFrame loop
- Call spawn check every N frames (e.g., every 10 frames)
- Call collision detection every frame
- Call expiration check every N frames (e.g., every 5 frames)
- Track frame counter for efficient checking

**Step 4.2: Update `script.js`**
- Add startBattle() function
  - Call initializePowerupSystem()
  - Call startGameLoop()
- Connect "Start Match" button to startBattle()

**Step 4.3: Test Integration**
- Click "Start Match" button
- Observe power-ups spawning, collecting, expiring
- Check console for no errors
- Verify all three systems work together

**Checkpoint:** Full game loop working ✓

---

### **PHASE 5: UI Display**
Goal: Show active power-ups and timers to player

**Step 5.1: Update `index.html`**
- Add "ACTIVE EFFECTS" panel section
- Add list container: id="activePowerupsList"
- Add icons/display areas

**Step 5.2: Implement UI Update Function**
- Create renderActivePowerups(player) function in powerup-system.js
- For each active power-up:
  - Calculate remaining time: duration - elapsed
  - Calculate progress: elapsed / duration
  - Render: icon + name + progress bar + timer

**Step 5.3: Update `style.css`**
- Style .active-effect container
- Style .powerup-icon
- Style .progress-bar (empty and filled states)
- Style .timer text
- Add animations (fade, pulse)

**Step 5.4: Test UI**
- Collect power-ups
- Verify they appear in active effects list
- Verify progress bar decreases
- Verify timer counts down
- Verify they disappear when expired

**Checkpoint:** UI shows active effects with timers ✓

---

### **PHASE 6: Polish & Testing**
Goal: Refine experience and ensure stability

**Step 6.1: Visual Polish**
- Add collection animations (powerup disappears, effect appears)
- Add expiration animations (effect fades out)
- Add UI feedback (sounds optional, animations required)

**Step 6.2: Edge Case Testing**
- Collect same type twice (should prevent)
- Collect different types simultaneously
- Expire effects while another active
- Expire all effects at once
- Spawn powerups continuously, then expire all

**Step 6.3: Documentation**
- Add JSDoc comments to all functions
- Add inline comments explaining state changes
- Document data structures

**Step 6.4: Code Cleanup**
- Remove console.logs (or keep as toggleable debug mode)
- Ensure consistent naming conventions
- Check for unused variables

**Checkpoint:** Polish complete, all tests passing ✓

---

## Implementation Sequence Summary

```
PHASE 1: Spawn System
  └─ Can see power-ups appear randomly in arena

PHASE 2: Collection
  └─ Can collect power-ups and see stats change

PHASE 3: Expiration
  └─ Effects expire safely, stats reset correctly

PHASE 4: Game Loop
  └─ All systems work together in real battle

PHASE 5: UI
  └─ Player can see active effects with timers

PHASE 6: Polish
  └─ Smooth animations and visual feedback

TOTAL ESTIMATED: 6-8 hours for beginner developer
```

---

## 6. SAFETY MECHANISMS EXPLAINED

### **6.1 Safe Stat Reset on Expiration**

**The Problem:**
```javascript
// WRONG: Corrupts stats on multiply/divide cycles
playerStats.speed = 2.0;          // Apply first powerup
playerStats.speed = playerStats.speed / 2;  // Expire first (= 1.0) ✓
playerStats.speed = 2.0;          // Apply second (= 2.0) ✓
playerStats.speed = playerStats.speed / 2;  // Expire second
// Now speed = 1.0, but only had one speedBoost! ✗ Floating point errors
```

**The Solution:**
```javascript
// CORRECT: Store and restore original values
const pu1 = {
  definitionId: 'speedBoost',
  collectedTime: 100,
  originalStats: { speed: 1.0, damage: 1.0 }  // Store BEFORE modifying
};

// When applying:
playerStats.speed = pu1.originalStats.speed * 2.0;  // = 2.0

// When expiring:
playerStats.speed = pu1.originalStats.speed;  // = 1.0 (always correct)
```

### **6.2 Preventing Conflicting Power-Ups**

**Rule:** Only one effect instance of same type at a time

```javascript
// Check BEFORE collecting
function canCollectPowerup(definitionId) {
  const hasActive = playerActivePowerups.some(
    pu => pu.definitionId === definitionId && pu.active
  );
  return !hasActive;  // Can collect only if NOT already active
}

// Usage
if (canCollectPowerup(powerup.type)) {
  applyPowerupEffect(powerup);
} else {
  // Skip collection (powerup stays in arena for later)
  // Or consume existing one (your design choice)
}
```

### **6.3 Handling Multiple Different Power-Ups**

**Allowed Combinations:**
```
Speed Boost + Double Damage = ✓ OK (different types)
Shield + Speed Boost + Double Damage = ✓ OK (all different)
Speed Boost + Speed Boost = ✗ NOT ALLOWED (same type)
```

**Implementation:**
```javascript
// On expiration, only reset stats if safe
function expirePowerup(pu, player) {
  // Don't reset yet, check other active effects
  const otherEffects = playerActivePowerups.filter(
    other => other.id !== pu.id && 
             other.active && 
             other.effect.stat === pu.effect.stat
  );
  
  if (otherEffects.length === 0) {
    // Safe to reset: no other effects on this stat
    player.speed = pu.originalStats.speed;
  }
  // If other effects exist, don't reset
  
  pu.active = false;
  playerActivePowerups.splice(index, 1);
}
```

---

## 7. KEEPING IT SIMPLE FOR BEGINNERS

### **7.1 Simplification Strategies**

| Feature | Beginner Version | Advanced Version |
|---------|------------------|-----------------|
| Spawn interval | Fixed: every 5 sec | Random: 5-10 sec |
| Max powerups | Fixed: 3 | Dynamic based on level |
| Collision | Distance formula | Pixel-perfect |
| Effects | Multipliers only | Complex calculations |
| UI | Simple list | Animated bars + icons |
| Conflicts | Simple type check | Complex stat tracking |

### **7.2 Start with Minimum Features**

**Week 1 (Beginner):**
1. Create speed boost only
2. Simple distance detection
3. Hardcoded spawn times
4. Console logging for debugging

**Week 2 (Adding Complexity):**
5. Add more power-up types
6. Randomize spawn times
7. Add UI display
8. Add visual polish

### **7.3 Debug Checklist**

```javascript
// Add these console.logs while developing:

// Spawn:
console.log(`Spawned ${type} at (${x}, ${y})`);
console.log(`Arena has ${arenaPowerups.length}/${MAX} powerups`);

// Collection:
console.log(`Collected: ${definitionId}`);
console.log(`Active powerups:`, playerActivePowerups);
console.log(`Speed now: ${playerStats.speed}`);

// Expiration:
console.log(`${definitionId} expires`);
console.log(`Speed reset to: ${playerStats.speed}`);

// Remove these when done!
```

---

## Quick Reference: State Transitions

```
┌──────────────────────────────────────────────────────┐
│                  FULL STATE FLOW                     │
└──────────────────────────────────────────────────────┘

1. SPAWN
   arenaPowerups.push(newPowerup)

2. COLLISION
   arenaPowerups[i].collected = true
   
3. COLLECTION
   applyEffect(powerup)
   
4. ACTIVE (INSTANT EFFECTS)
   playerStats.health += 30
   arenaPowerups.splice(i, 1)
   
5. ACTIVE (TIMED EFFECTS)
   playerActivePowerups.push(pu)
   playerStats[stat] *= multiplier
   arenaPowerups.splice(i, 1)
   
6. TIMED (ACTIVE)
   UI shows effect + countdown
   
7. EXPIRATION CHECK
   isExpired = (Date.now() > pu.expiresAt)
   
8. EXPIRE
   playerStats[stat] = originalValue
   pu.active = false
   playerActivePowerups.splice(i, 1)
   
9. UI UPDATE
   Effect removed from display
```

---

## Next Step: Ready to Implement?

When you're ready, we'll start with **Phase 1: Foundation** by creating `player-state.js` and beginning `powerup-system.js`.

Would you like to proceed with implementation?
