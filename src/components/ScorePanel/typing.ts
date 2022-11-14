export interface ScorePanelItemProps {
  id: string;
  score: number;
  isLastScore?: boolean;
}

export interface ScorePanelProps {
  show: boolean,
  style: {
    top: string,
    right: string
  },
  list: ScorePanelItemProps[]
}