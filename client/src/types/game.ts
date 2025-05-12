export interface Team {
  name: string;
  score: number;
  faults: number;
}

export interface TimerState {
  seconds: number;
  minutes: number;
  isRunning: boolean;
}

export interface GameRecord {
  id: number;
  date: string;
  teams: string;
  result: string;
  time: string;
  winner: string;
}

export interface GameState {
  team1: Team;
  team2: Team;
  timer: TimerState;
}
