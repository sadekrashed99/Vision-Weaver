import { VisionWeaverData } from '../types/visionWeaver';

export function generateAIBrief(data: VisionWeaverData): string {
  const parts: string[] = [];
  const styleLabels: Record<string, string> = {
    'modern-minimal': 'Modern Minimal', 'japandi-zen': 'Japandi/Zen',
    'hamptons-coastal': 'Hamptons Coastal', 'industrial-edge': 'Industrial Edge',
    'classic-elegance': 'Classic Elegance', 'bold-statement': 'Bold Statement',
  };
  if (data.styleDirection) parts.push(`${styleLabels[data.styleDirection]} style.`);
  if (data.colourDirection) parts.push(`Colour direction: ${data.colourDirection}.`);
  if (data.wallPaint) parts.push(`Wall paint: ${data.wallPaint.colourDirection}, ${data.wallPaint.finish} finish.`);
  if (data.tapwareFinish) parts.push(`Tapware: ${data.tapwareFinish}.`);
  if (data.vanityFront) parts.push(`Vanity front: ${data.vanityFront}.`);
  if (data.vanitySurface) parts.push(`Vanity surface: ${data.vanitySurface}.`);
  if (data.tileStyle) parts.push(`Tiles: ${data.tileStyle}.`);
  if (data.groutColour) parts.push(`Grout: ${data.groutColour}.`);
  if (data.showerScreen) parts.push(`Shower screen: ${data.showerScreen}.`);
  if (data.hasNiche && data.nicheDetails) {
    parts.push(`Wall niche: ${data.nicheDetails.count} niche(s), ${data.nicheDetails.orientation}, ${data.nicheDetails.finish}.`);
  }
  if (data.mirrorStyle) parts.push(`Mirror: ${data.mirrorStyle}.`);
  if (data.lighting?.length) parts.push(`Lighting: ${data.lighting.join(', ')}.`);
  if (data.stylingLevel) parts.push(`Styling: ${data.stylingLevel}.`);
  if (data.naturalLight) parts.push(`Natural light: ${data.naturalLight}.`);
  if (data.features?.length) parts.push(`Key features: ${data.features.join(', ')}.`);
  return parts.join(' ');
}
