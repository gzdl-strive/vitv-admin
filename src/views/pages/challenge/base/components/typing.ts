export type Speech = 'speak' | 'stop';

export type DrumItem = Record<'name' | 'key' | 'kbd', string>;
export type DrumAudioItem = Record<'key' | 'path', string>;

export type FlexPanelItem = Record<'describe1' | 'describe2' | 'describe3' | 'bg', string>;

export type CountDownTimerItem = Record<'name' | 'value', string>;

export type StrengthMode = 'redEffect' | 'rgbSplit' | 'grayEffect' | '';

export type HoleObj = {
  id: number;
  up: boolean;
};

export type WhackHoleScoreItem = {
  id: string;
  score: number;
  isLastScore?: boolean;
}