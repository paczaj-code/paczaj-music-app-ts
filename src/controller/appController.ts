import { Request, Response } from "express";
import { Artist, SingleArtist, Youtube, Albums } from "../types/types";
import { db } from "../db/db";
import { allArtistQuery, sigleArtistQuery, youtubeQuery } from "../query/query";

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

  public static async getSingleArtist(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    const artistId: string = req.params.artistId;
    try {
      const artistData: SingleArtist = await db.one(sigleArtistQuery, artistId);
      const youtubeMovies: Youtube[] = await db.any(youtubeQuery, artistId);
      const releases: Albums = <any>{};
      releases.studio_albums = await db.any(
        `SELECT * FROM select_release_by_type_and_artist_id($1,$2)`,
        [1, artistId]
      );
      releases.singles = await db.any(
        `SELECT * FROM select_release_by_type_and_artist_id($1,$2)`,
        [2, artistId]
      );
      releases.extended_plays = await db.any(
        `SELECT * FROM select_release_by_type_and_artist_id($1,$2)`,
        [3, artistId]
      );
      releases.compilations = await db.any(
        `SELECT * FROM select_release_by_type_and_artist_id($1,$2)`,
        [4, artistId]
      );
      releases.soundtrack = await db.any(
        `SELECT * FROM select_release_by_type_and_artist_id($1,$2)`,
        [5, artistId]
      );
      releases.live = await db.any(
        `SELECT * FROM select_release_by_type_and_artist_id($1,$2)`,
        [6, artistId]
      );
      releases.demo = await db.any(
        `SELECT * FROM select_release_by_type_and_artist_id($1,$2)`,
        [7, artistId]
      );

      const result = {
        artist_data: artistData,
        youtube_movies: youtubeMovies,
        releases,
      };

      return res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  }
}

export default AppController;
