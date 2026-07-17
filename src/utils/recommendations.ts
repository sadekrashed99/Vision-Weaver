import { VisionWeaverData, StyleDirection, RecommendationMap } from '../types/visionWeaver';

export function buildRecommendations(data: Partial<VisionWeaverData>): RecommendationMap {
  const { styleDirection } = data;
  if (!styleDirection) return {};

  const messages: Record<StyleDirection, { message: string }> = {
    'modern-minimal':    { message: 'Since you chose Modern Minimal, I\'d highlight the options below as ideal matches.' },
    'japandi-zen':       { message: 'Since you chose Japandi/Zen style, I\'d highlight the options below as ideal matches.' },
    'hamptons-coastal':  { message: 'Since you chose Hamptons/Coastal, I\'d highlight the options below as ideal matches.' },
    'industrial-edge':   { message: 'Since you chose Industrial Edge, I\'d highlight the options below as ideal matches.' },
    'classic-elegance':  { message: 'Since you chose Classic Elegance, I\'d highlight the options below as ideal matches.' },
    'bold-statement':    { message: 'Since you chose Bold Statement, I\'d highlight the options below as ideal matches.' },
  };

  const tapware: Record<StyleDirection, string[]> = {
    'modern-minimal':   ['chrome', 'matte-black'],
    'japandi-zen':      ['brushed-brass', 'matte-black'],
    'hamptons-coastal': ['brushed-nickel', 'chrome'],
    'industrial-edge':  ['gunmetal', 'matte-black'],
    'classic-elegance': ['chrome', 'brushed-gold'],
    'bold-statement':   ['brushed-brass', 'matte-black'],
  };

  const tiles: Record<StyleDirection, string[]> = {
    'modern-minimal':   ['large-format-square', 'large-format-rect'],
    'japandi-zen':      ['large-format-rect', 'textured-stone'],
    'hamptons-coastal': ['subway', 'kit-kat'],
    'industrial-edge':  ['large-format-square', 'textured-stone'],
    'classic-elegance': ['subway', 'terrazzo'],
    'bold-statement':   ['zellige', 'terrazzo'],
  };

  const mirrors: Record<StyleDirection, string[]> = {
    'modern-minimal':   ['rectangular-frameless'],
    'japandi-zen':      ['arched', 'oval-frameless'],
    'hamptons-coastal': ['arched', 'oval-frameless'],
    'industrial-edge':  ['rectangular-framed', 'round-backlit'],
    'classic-elegance': ['rectangular-framed', 'oval-frameless'],
    'bold-statement':   ['round-backlit', 'arched'],
  };

  const { message } = messages[styleDirection];

  return {
    'step7a-tapware': { message, subtext: 'Tapware finish sets the tone for every detail in your space.', optionIds: tapware[styleDirection] },
    'step7a-tile':    { message, subtext: 'Tile selection reinforces the visual language of your style direction.', optionIds: tiles[styleDirection] },
    'step7b-mirror':  { message, subtext: 'Mirror shape dramatically impacts perceived space and proportion.', optionIds: mirrors[styleDirection] },
  };
}
