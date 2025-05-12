import { users, type User, type InsertUser } from "@shared/schema";
import { games, type Game, type InsertGame } from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Game history operations
  getAllGames(): Promise<Game[]>;
  getGame(id: number): Promise<Game | undefined>;
  createGame(game: InsertGame): Promise<Game>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private games: Map<number, Game>;
  private userIdCounter: number;
  private gameIdCounter: number;

  constructor() {
    this.users = new Map();
    this.games = new Map();
    this.userIdCounter = 1;
    this.gameIdCounter = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Game history methods
  async getAllGames(): Promise<Game[]> {
    return Array.from(this.games.values()).sort((a, b) => b.id - a.id);
  }
  
  async getGame(id: number): Promise<Game | undefined> {
    return this.games.get(id);
  }
  
  async createGame(insertGame: InsertGame): Promise<Game> {
    const id = this.gameIdCounter++;
    const game: Game = { ...insertGame, id };
    this.games.set(id, game);
    
    // Keep only the most recent 20 games
    const allGames = await this.getAllGames();
    if (allGames.length > 20) {
      const oldestGame = allGames[allGames.length - 1];
      this.games.delete(oldestGame.id);
    }
    
    return game;
  }
}

// Use MemStorage em vez de DatabaseStorage
export const storage = new MemStorage();