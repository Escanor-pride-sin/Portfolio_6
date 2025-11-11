# 3D Interactive Portfolio Enhancements

## Overview
The portfolio features **distinct and unique** 3D CSS and JavaScript effects for different sections:
- **Skills Section**: Smooth, elegant, subtle lift effects
- **Projects Section**: Dramatic, playful, cursor-tracking effects
- **Certificates**: Consistent with skills
- **Other Elements**: Customized per component

---

## 🎯 UNIQUE Project Section Effects (REDUCED TO 50%)

### **CSS Enhancements** (`styles.css`)

#### 1. **Gentle 3D Rotation**
```css
.project .cover:hover {
  transform: translateZ(25px) rotateY(2.5deg) rotateX(-2.5deg) scale(1.04);
}
```
- Subtle 3D rotation (±2.5° pitch/yaw)
- Moderate scale (4% vs 8% before reduction)
- Reduced depth (25px vs 50px before)

#### 2. **Refined Color Shift**
```css
filter: brightness(1.125) saturate(1.15);
```
- Brightness boost to 112.5% (was 125%)
- Saturation increase to 115% (was 130%)
- Creates refined, professional effect

#### 3. **Subtle Cursor-Tracking Glow**
```css
.project::before {
  background: radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), 
    rgba(37, 199, 104, calc(0.3 * var(--glow-intensity, 0))), ...);
  opacity: max(0.05, var(--glow-intensity, 0) * 0.5);
}
```
- **Dynamic**: Glow follows cursor position (softer)
- **Reactive**: Intensity based on distance (reduced)
- **Smooth**: 20px blur for refined effect
- Creates gentle spotlight effect

#### 4. **Gentle Animated Border**
```css
@keyframes gradientBorderShift {
  0% { border-color: rgba(37, 199, 104, 0.05); }
  50% { border-color: rgba(37, 199, 104, 0.2); }
  100% { border-color: rgba(37, 199, 104, 0.05); }
}
```
- Subtle border pulse with 8s cycle
- Creates refined breathing effect
- More professional appearance

#### 5. **Moderate Image Zoom**
```css
.project:hover .cover img {
  transform: scale(1.075) translateZ(15px);
  filter: saturate(1.2) brightness(1.05);
}
```
- Image zooms to 107.5% (was 115%)
- Reduced saturation and brightness
- Gentle parallax depth lift

#### 6. **Gentle Pulsing Glow Animation**
```css
@keyframes projectPulse {
  0%, 100% {
    box-shadow: 0 0 12px rgba(37, 199, 104, 0.1), ...
  }
  50% {
    box-shadow: 0 0 25px rgba(37, 199, 104, 0.2), ...
  }
}
```
- Shadow pulses subtly on hover
- Glow intensity varies gently
- More professional appearance

---

### **JavaScript Enhancements** (`script.js`)

#### 1. **Moderate Tilt Settings (REDUCED 50%)**
```javascript
{ selector: '.project', opts: { 
  max: 10,           // was 20°, now 10°
  scale: 1.04,       // was 1.08, now 1.04
  depth: 30,         // was 60, now 30
  rotationScale: 1.2 // was 1.4, now 1.2
}}
```
- Reduced max rotation (10° vs 20°)
- Moderate scale factor (4% vs 8%)
- Standard Z-depth (30px vs 60px)
- More responsive to cursor movement

#### 2. **Subtle Cursor-Tracking Glow System**
```javascript
function setupProjectGlow() {
  projects.forEach(project => {
    project.addEventListener('pointermove', (e) => {
      const distance = Math.sqrt(...); // Calculate cursor distance
      const intensity = Math.max(0, 1 - (distance / maxDistance));
      
      // Update CSS variables gently
      project.style.setProperty('--glow-x', `${bgX}%`);
      project.style.setProperty('--glow-y', `${bgY}%`);
      project.style.setProperty('--glow-intensity', intensity);
    });
  });
}
```
- **Subtle cursor tracking** inside each project card
- **Distance calculation** for gentle glow falloff
- **CSS variable updates** for smooth animations
- Creates subtle spotlight effect

#### 3. **Enhanced Image Parallax**
```javascript
const imgDepth = opts.depth * 0.7; // 42px depth for projects
img.style.transform = `translateZ(${imgDepth}px) scale(1.05)`;
```
- Larger depth multiplier (70% of tilt depth)
- More pronounced parallax separation

---

## 📊 Comparison Matrix (UPDATED - 50% REDUCTION)

| Feature | Skills | Projects |
|---------|--------|----------|
| **Max Tilt** | 12° | 10° |
| **Hover Scale** | 1.015x (1.5%) | 1.025x (2.5%) |
| **Z-Depth** | 30px | 20px |
| **Box Shadow Glow** | 60px radius | 25px radius |
| **Brightness on Hover** | 115% | 112.5% |
| **Saturation on Hover** | 100% | 115% |
| **Cursor Tracking Glow** | ❌ No | ✅ **YES** (subtle) |
| **Animated Border** | ❌ No | ✅ **YES** (gentle) |
| **Pulsing Shadow** | ❌ No | ✅ **YES** (subtle) |
| **Image Zoom** | None | 7.5% |
| **Animation Feel** | Smooth, subtle | Refined, interactive |

---

## 🎨 Visual Effects in Action

### Skills Cards (Elegant)
1. Smooth lift with subtle scale
2. Soft glow that's always present
3. Quick, responsive hover state
4. Professional, minimal aesthetic

### Project Cards (Dramatic)
1. **Aggressive tilt** with rotation
2. **Cursor-tracking glow** (spotlight effect)
3. **Pulsing shadow** animation
4. **Vibrant color shift** with saturation
5. **Image zoom** with parallax
6. **Animated border** breathing effect
7. **Playful, showcase aesthetic**

---

## 🚀 How to Experience

### Projects Section
1. **Hover over project cards** → Watch aggressive 3D tilt
2. **Move cursor inside card** → Glow follows your mouse (spotlight)
3. **Watch images** → Zoom and shift parallax
4. **Border** → Pulses continuously
5. **Shadow** → Glows and pulses on interaction

### Skills Section (for comparison)
1. **Hover** → Smooth, subtle lift
2. **No cursor tracking** → Static glow
3. **Professional feel** → Minimal animations

---

## ⚙️ Customization Guide

### Adjust Project Tilt Aggressiveness
In `script.js` line 100:
```javascript
// More intense
{ selector: '.project', opts: { max: 30, scale: 1.15, depth: 80 } }

// More subtle
{ selector: '.project', opts: { max: 12, scale: 1.04, depth: 40 } }
```

### Adjust Project Glow Intensity
In `styles.css` `.project::before`:
```css
/* Stronger glow */
rgba(37, 199, 104, calc(1.0 * var(--glow-intensity, 0)))

/* Subtle glow */
rgba(37, 199, 104, calc(0.2 * var(--glow-intensity, 0)))
```

### Adjust Pulse Animation Speed
In `styles.css` `@keyframes projectPulse`:
```css
animation: projectPulse 1s ease-in-out; /* Faster */
animation: projectPulse 3s ease-in-out; /* Slower */
```

---

## 📱 Mobile Support

- ✅ Touch-compatible tilt (responds to touch position)
- ✅ Cursor glow works on desktop only
- ✅ All animations perform well on mobile
- ✅ Reduced animation intensity on small screens (via media queries)

---

## ♿ Accessibility

- ✅ Respects `prefers-reduced-motion` setting
- ✅ All effects are visual enhancements only
- ✅ Content fully accessible without effects
- ✅ Keyboard navigation works normally

---

**Last Updated**: November 11, 2025  
**Files Modified**: `styles.css`, `script.js`  
**Unique to Projects**: Cursor tracking, pulsing glow, animated border, aggressive tilt
