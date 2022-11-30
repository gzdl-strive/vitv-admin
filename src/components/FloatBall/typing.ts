export interface FloatBallItemProps {
  id: string;
  label: string;
  disabled: boolean;
  onClick: (...args: unknown[]) => unknown
}

export interface FloatBallStyle  {
  width: string;
  height: string;
  transform: string;
}

export interface FloatBallProps {
  num: number;
  style: FloatBallStyle,
  list: FloatBallItemProps[];
}