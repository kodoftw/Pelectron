export enum PadPosition {
  Left,
  Center,
  Right,
}

export interface PadData {
  Position: PadPosition;
  Width: number;
  Top: number;
  Padding: number;
}
