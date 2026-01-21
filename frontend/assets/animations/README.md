# Mewnie Animations

This directory contains the Lottie animation files for the Mewnie pet.

## Current Files

- `mewnie-tired.json` - Placeholder animation for tired/sad state (< 2,000 steps)
- `mewnie-neutral.json` - Placeholder animation for neutral state (2,000-4,999 steps)
- `mewnie-happy.json` - Placeholder animation for happy/energized state (5,000+ steps)

## Replacing with Custom Animations

To replace these placeholder animations with your custom Mewnie designs:

1. **Create your animations** in:
   - Adobe After Effects + Bodymovin plugin
   - Rive (export as Lottie)
   - LottieFiles Creator
   - Or hire a designer

2. **Export as Lottie JSON** files with these exact names:
   - `mewnie-tired.json`
   - `mewnie-neutral.json`
   - `mewnie-happy.json`

3. **Replace the files** in this directory

4. **No code changes needed!** The app will automatically use your new animations.

## Animation Guidelines

- **Size**: Animations should be designed for 200x200px (or scalable)
- **Loop**: All animations should loop seamlessly
- **Duration**: 2-4 seconds per loop is ideal
- **File size**: Keep under 100KB per file for best performance

## Testing Your Animations

After replacing the files:
1. Reload the app (shake device → Reload, or press `r` in terminal)
2. Walk around to change step counts and see different moods:
   - < 2,000 steps → Tired animation
   - 2,000-4,999 steps → Neutral animation
   - 5,000+ steps → Happy animation

## Need Help?

The placeholder animations are simple geometric shapes. Your custom Mewnie can be as detailed as you want - just make sure they're exported as Lottie JSON format!
