export type BathroomType = 'main' | 'ensuite' | 'guest' | 'powder';
export type BathroomSize = 'small' | 'medium' | 'large';
export type LayoutOrientation = 'narrow' | 'rectangular' | 'square' | 'alcove' | 'irregular' | 'unsure';
export type StyleDirection = 'modern-minimal' | 'hamptons-coastal' | 'japandi-zen' | 'industrial-edge' | 'classic-elegance' | 'bold-statement';
export type ColourDirection = 'warm-whites' | 'cool-greys' | 'earthy-naturals' | 'japandi-warmth' | 'coastal-blues' | 'bold-contrasts';
export type NaturalLight = 'excellent' | 'moderate' | 'minimal';
export type TapwareFinish = 'brushed-brass' | 'brushed-bronze' | 'chrome' | 'brushed-nickel' | 'matte-black' | 'gunmetal' | 'brushed-gold' | 'polished-nickel' | 'matte-white';
export type VanityFront = 'shaker' | 'flat-panel' | 'fluted' | 'handleless' | 'open-shelf';
export type VanitySurface = 'sintered-stone' | 'porcelain-slab' | 'natural-stone' | 'timber' | 'laminate';
export type TileStyle = 'large-format-rect' | 'large-format-square' | 'subway' | 'kit-kat' | 'terrazzo' | 'textured-stone' | 'zellige';
export type ShowerScreen = 'frameless-clear' | 'semi-frameless' | 'framed' | 'pivot-door' | 'open-shower';
export type GroutColour = 'white' | 'light-grey' | 'mid-grey' | 'charcoal' | 'black' | 'match-tile';
export type MirrorStyle = 'arched' | 'oval-frameless' | 'rectangular-frameless' | 'rectangular-framed' | 'round-backlit' | 'shaving-cabinet';
export type StylingLevel = 'clean-minimal' | 'warm-styled' | 'fully-styled';
export type Budget = 'under-15k' | '15k-25k' | '25k-45k' | '45k-80k' | 'over-80k' | 'not-sure';
export type Timeline = 'within-3mo' | '3-6mo' | '6-12mo' | 'exploring';
export type Ownership = 'own-my-decision' | 'own-need-signoff' | 'renting-agreed' | 'renting-exploring';
export type LeadTemperature = 'HOT' | 'WARM' | 'COLD';

export interface NicheDetails {
  count: 1 | 2 | 3;
  orientation: 'horizontal' | 'vertical';
  finish: 'match-tile' | 'contrast-tile' | 'open';
}

export interface WallPaintDetails {
  colourDirection: string;
  finish: 'flat' | 'low-sheen' | 'semi-gloss';
}

export interface VisionWeaverData {
  bathroomType?: BathroomType;
  bathroomSize?: BathroomSize;
  layoutOrientation?: LayoutOrientation;
  painPoints?: string[];
  bathroomAge?: string;
  styleDirection?: StyleDirection;
  colourDirection?: ColourDirection;
  naturalLight?: NaturalLight;
  hasPlasterWalls?: boolean;
  wallPaint?: WallPaintDetails;
  features?: string[];
  tapwareFinish?: TapwareFinish;
  vanityFront?: VanityFront;
  vanitySurface?: VanitySurface;
  tileStyle?: TileStyle;
  showerScreen?: ShowerScreen;
  groutColour?: GroutColour;
  hasNiche?: boolean;
  nicheDetails?: NicheDetails;
  mirrorStyle?: MirrorStyle;
  lighting?: string[];
  stylingLevel?: StylingLevel;
  budget?: Budget;
  timeline?: Timeline;
  ownership?: Ownership;
  suburb?: string;
  firstName?: string;
  email?: string;
  mobile?: string;
  optIn?: boolean;
  photoUrls?: string[];
  photoStepSkipped?: boolean;
  sessionId?: string;
  leadScore?: number;
  leadTemperature?: LeadTemperature;
  aiBrief?: string;
}

export interface StepRecommendation {
  message: string;
  subtext: string;
  optionIds: string[];
}

export type RecommendationMap = Partial<Record<string, StepRecommendation>>;

export interface PhotoItem {
  id: string;
  file: File;
  preview: string;
  cloudinaryUrl: string | null;
  uploadStatus: 'pending' | 'uploading' | 'success' | 'error';
  uploadProgress: number;
}
