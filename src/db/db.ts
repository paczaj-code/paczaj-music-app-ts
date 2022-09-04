import pgPromise from 'pg-promise';
const pgp = pgPromise({ noWarnings: true });
export const db = pgp(
  'postgres://paczajmusic:paczajmusic@host.docker.internal:5433/paczajmusic'
);
