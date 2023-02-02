export type ChallengeLevel = 'warm-up' | 'easy' | 'medium' | 'hard' | 'extreme';

export type TypeCardItem = {
  order: number;
  label: string;
  describe?: string;
}

export type ResolveItem = {
  title: string;
  code: string;
  example: string;
}