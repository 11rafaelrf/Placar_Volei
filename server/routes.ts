import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGameSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Game history API
  app.get('/api/games', async (req, res) => {
    try {
      const games = await storage.getAllGames();
      res.json(games);
    } catch (error) {
      console.error('Error fetching games:', error);
      res.status(500).json({ message: 'Failed to fetch game history' });
    }
  });
  
  app.get('/api/games/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid game ID' });
      }
      
      const game = await storage.getGame(id);
      
      if (!game) {
        return res.status(404).json({ message: 'Game not found' });
      }
      
      res.json(game);
    } catch (error) {
      console.error('Error fetching game:', error);
      res.status(500).json({ message: 'Failed to fetch game' });
    }
  });
  
  app.post('/api/games', async (req, res) => {
    try {
      const gameData = req.body;
      
      // Validate the game data
      const validatedData = insertGameSchema.parse(gameData);
      
      // Create the game record
      const game = await storage.createGame(validatedData);
      
      res.status(201).json(game);
    } catch (error) {
      console.error('Error creating game:', error);
      res.status(400).json({ message: 'Failed to create game record' });
    }
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
