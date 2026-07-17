import { VisionWeaverData, LeadTemperature } from '../types/visionWeaver';

export function calculateLeadScore(data: VisionWeaverData): { score: number; temperature: LeadTemperature } {
  let score = 0;

  const budgetScores: Record<string, number> = {
    'under-15k': 0, '15k-25k': 15, '25k-45k': 25, '45k-80k': 35, 'over-80k': 40, 'not-sure': 5,
  };
  score += budgetScores[data.budget ?? ''] ?? 0;

  const timelineScores: Record<string, number> = {
    'within-3mo': 30, '3-6mo': 20, '6-12mo': 10, 'exploring': 0,
  };
  score += timelineScores[data.timeline ?? ''] ?? 0;

  const ownershipScores: Record<string, number> = {
    'own-my-decision': 20, 'own-need-signoff': 15, 'renting-agreed': 5, 'renting-exploring': 0,
  };
  score += ownershipScores[data.ownership ?? ''] ?? 0;

  const featureCount = data.features?.length ?? 0;
  if (featureCount >= 8) score += 10;
  else if (featureCount >= 4) score += 5;

  // Penalty: not-sure budget AND exploring timeline → cap at 45
  if (data.budget === 'not-sure' && data.timeline === 'exploring') score = Math.min(score, 45);

  const temperature: LeadTemperature = score >= 80 ? 'HOT' : score >= 50 ? 'WARM' : 'COLD';
  return { score, temperature };
}
