import request from "supertest";
import app from "../src/server";
import { db } from "../src/db/db";
import { allArtistQuery } from "../src/query/query";

describe("All artist endpoint", () => {
  it("should be error with wrong API path", async () => {
    const response = await request(app).get("/api/artists");
    const result = JSON.parse(response.text);
    expect(response.statusCode).toBe(404);
    expect(result.message).toEqual("Such path does not exists");
  });

  it("should return a 200 status code", async () => {
    const response = await request(app).get("/api/artist");
    expect(response.statusCode).toBe(200);
  });

  it("should be all required fields", async () => {
    const response = await request(app).get("/api/artist");
    const result = JSON.parse(response.text);
    expect(result[0].id).toBeDefined();
    expect(result[0].name).toBeDefined();
    expect(result[0].country).toBeDefined();
    expect(result[0].tags).toBeDefined();
  });

  it("should be proper data", async () => {
    const artists = await db.any(allArtistQuery);
    const response = await request(app).get("/api/artist");
    const result = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
    expect(result[10].id).toEqual(artists[10].id);
    expect(result[30].name).toEqual(artists[30].name);
    expect(result[100].country).toEqual(artists[100].country);
    expect(result[100].tags).toBeInstanceOf(Array);
  });
});
