import request from "supertest";
import app from "../src/server";
import { db } from "../src/db/db";
import { sigleArtistQuery, youtubeQuery } from "../src/query/query";
import { Albums, SingleArtist, Youtube } from "../src/types/types";

describe("Single artist endpoint", () => {
  it("should be error with wrong API path", async () => {
    const response = await request(app).get("/api/artisted");
    const result = JSON.parse(response.text);
    expect(response.statusCode).toBe(404);
    expect(result.message).toEqual("Such path does not exists");
  });

  it("should be error with wrong artist id", async () => {
    const response = await request(app).get("/api/artist/33333333");
    const result = JSON.parse(response.text);
    expect(response.statusCode).toBe(500);
    expect(result.message).toEqual("No data returned from the query.");
  });

  it("should return a 200 status code", async () => {
    const response = await request(app).get("/api/artist/248667");
    expect(response.statusCode).toBe(200);
  });

  it("should be all required fields", async () => {
    const response = await request(app).get("/api/artist/248667");
    const { artist_data, youtube_movies, releases } = JSON.parse(response.text);
    expect(artist_data.id).toEqual(248667);
    expect(artist_data.artist_name).toBeDefined();
    expect(artist_data.country).toBeDefined();
    expect(artist_data.artist_type).toBeDefined();
    expect(artist_data.begin_date_year).toBeDefined();
    expect(artist_data.end_date_year).toBeDefined();
    expect(artist_data.tags).toBeDefined();
    expect(artist_data.tags).toBeInstanceOf(Array);
    expect(youtube_movies).toBeDefined();
    expect(youtube_movies).toBeInstanceOf(Array);
    expect(releases.studio_albums).toBeInstanceOf(Array);
    expect(releases.singles).toBeInstanceOf(Array);
    expect(releases.extended_plays).toBeInstanceOf(Array);
    expect(releases.compilations).toBeInstanceOf(Array);
    expect(releases.soundtrack).toBeInstanceOf(Array);
    expect(releases.live).toBeInstanceOf(Array);
    expect(releases.demo).toBeInstanceOf(Array);
  });

  it("should be proper data for artist data", async () => {
    const artistData: SingleArtist = await db.one(sigleArtistQuery, 6987);
    const response = await request(app).get("/api/artist/6987");
    const { artist_data } = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
    expect(artist_data.id).toEqual(artistData.id);
    expect(artist_data.name).toEqual(artistData.name);
    expect(artist_data.country).toEqual(artistData.country);
    expect(artist_data.begin_date_year).toEqual(artistData.begin_date_year);
    expect(artist_data.end_date_year).toEqual(artistData.end_date_year);
    expect(artist_data.wikipedia_suffix).toEqual(artistData.wikipedia_suffix);
    expect(artist_data.tags).toEqual(artistData.tags);
  });

  it("should proper data for youtube", async () => {
    const youtubeMovies: Youtube[] = await db.any(youtubeQuery, 6987);
    const response = await request(app).get("/api/artist/6987");
    const { youtube_movies } = JSON.parse(response.text);
    expect(youtubeMovies.length).toEqual(youtube_movies.length);
    expect(youtubeMovies[0].youtube_id).toEqual(youtube_movies[0].youtube_id);
    expect(youtubeMovies[1].title).toEqual(youtube_movies[1].title);
    expect(youtubeMovies[2].small_image_url).toEqual(
      youtube_movies[2].small_image_url
    );
  });

  it("should proper data for studio albums", async () => {
    const studioAlbums = await db.any(
      `SELECT * FROM select_release_by_type_and_artist_id($1,$2)`,
      [1, 6987]
    );

    const response = await request(app).get("/api/artist/6987");
    const { releases } = JSON.parse(response.text);

    expect(releases.studio_albums.length).toEqual(studioAlbums.length);
    expect(releases.studio_albums[0].id).toEqual(studioAlbums[0].id);
    expect(releases.studio_albums[1].name).toEqual(studioAlbums[1].name);
    expect(releases.studio_albums[2].first_release_date).toEqual(
      studioAlbums[2].first_release_date.toISOString()
    );
    expect(releases.studio_albums[3].front_small).toEqual(
      studioAlbums[3].front_small
    );
  });

  it("should proper data for singles", async () => {
    const singles = await db.any(
      `SELECT * FROM select_release_by_type_and_artist_id($1,$2)`,
      [2, 6987]
    );
    const response = await request(app).get("/api/artist/6987");
    const { releases } = JSON.parse(response.text);

    expect(releases.singles.length).toEqual(singles.length);
    expect(releases.singles[0].id).toEqual(singles[0].id);
    expect(releases.singles[1].name).toEqual(singles[1].name);
    expect(releases.singles[2].first_release_date).toEqual(
      singles[2].first_release_date.toISOString()
    );
    expect(releases.singles[3].front_small).toEqual(singles[3].front_small);
  });

  it("should proper data for extended plays", async () => {
    const eps = await db.any(
      `SELECT * FROM select_release_by_type_and_artist_id($1,$2)`,
      [3, 6987]
    );
    const response = await request(app).get("/api/artist/6987");
    const { releases } = JSON.parse(response.text);

    expect(releases.extended_plays.length).toEqual(eps.length);
    expect(releases.extended_plays[0].id).toEqual(eps[0].id);
    expect(releases.extended_plays[1].name).toEqual(eps[1].name);
    expect(releases.extended_plays[2].first_release_date).toEqual(
      eps[2].first_release_date.toISOString()
    );
    expect(releases.extended_plays[3].front_small).toEqual(eps[3].front_small);
  });

  it("should proper data for compilations", async () => {
    const compilations = await db.any(
      `SELECT * FROM select_release_by_type_and_artist_id($1,$2)`,
      [4, 6987]
    );
    const response = await request(app).get("/api/artist/6987");
    const { releases } = JSON.parse(response.text);

    expect(releases.compilations.length).toEqual(compilations.length);
    expect(releases.compilations[0].id).toEqual(compilations[0].id);
    expect(releases.compilations[1].name).toEqual(compilations[1].name);
    expect(releases.compilations[1].first_release_date).toEqual(
      compilations[1].first_release_date.toISOString()
    );
    expect(releases.compilations[0].front_small).toEqual(
      compilations[0].front_small
    );
  });

  it("should proper data for soundtracks", async () => {
    const soundtracks = await db.any(
      `SELECT * FROM select_release_by_type_and_artist_id($1,$2)`,
      [5, 2210]
    );

    const response = await request(app).get("/api/artist/2210");
    const { releases } = JSON.parse(response.text);
    expect(releases.soundtrack.length).toEqual(soundtracks.length);
    expect(releases.soundtrack[0].id).toEqual(soundtracks[0].id);
    expect(releases.soundtrack[1].name).toEqual(soundtracks[1].name);
    expect(releases.soundtrack[0].front_small).toEqual(
      soundtracks[0].front_small
    );
  });

  it("should proper data for live albums", async () => {
    const live_albums = await db.any(
      `SELECT * FROM select_release_by_type_and_artist_id($1,$2)`,
      [6, 6987]
    );

    const response = await request(app).get("/api/artist/6987");
    const { releases } = JSON.parse(response.text);
    expect(releases.live.length).toEqual(live_albums.length);
    expect(releases.live[0].id).toEqual(live_albums[0].id);
    expect(releases.live[1].name).toEqual(live_albums[1].name);
    expect(releases.live[0].front_small).toEqual(live_albums[0].front_small);
  });

  it("should proper data for demos", async () => {
    const demos = await db.any(
      `SELECT * FROM select_release_by_type_and_artist_id($1,$2)`,
      [7, 6987]
    );

    const response = await request(app).get("/api/artist/6987");
    const { releases } = JSON.parse(response.text);
    expect(releases.demo.length).toEqual(demos.length);
    expect(releases.demo[2].id).toEqual(demos[2].id);
    expect(releases.demo[2].name).toEqual(demos[2].name);
    expect(releases.demo[2].first_release_date).toEqual(
      demos[2].first_release_date.toISOString()
    );
    expect(releases.demo[2].front_small).toEqual(demos[2].front_small);
  });
});
