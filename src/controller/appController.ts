import { Request, Response } from "express";
import { Artist } from "../types/types";
import { db } from "../db/db";
import { allArtistQuery } from "../query/query";

class AppController {
  public static async getAllArtists(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    try {
      const result: Artist[] = await db.any(allArtistQuery);

      return res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  }
}

export default AppController;
