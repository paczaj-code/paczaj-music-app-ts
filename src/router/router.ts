import AppController from "../controller/appController";
import { Router } from "express";
const router = Router();

router.get("/artist", AppController.getAllArtists);
router.get("/artist/:artistId", AppController.getSingleArtist);
// router.get('/release/:releaseId', ArtistController.getRelease);

export default router;

// AIzaSyBw1zVOWZxME1h_fmMFmrZKrIuHDizd644
