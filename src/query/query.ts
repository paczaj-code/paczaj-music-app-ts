export const allArtistQuery: string = `
with SELECT_NAMES AS
    (SELECT artist.id,
            artist.name,
            country.name as country,
            artist_type.name as artist_type,
            CASE
                WHEN strpos(artist.name, 'The ')=1 THEN substring(artist.name,5)
                ELSE artist.name
            END AS sort_names,
            array_agg(tag.name) as tags
     FROM artist
     INNER JOIN country ON country.id = artist.fk_country
     INNER JOIN artist_type ON artist.fk_artist_type=artist_type.id
     LEFT JOIN artist_tag ON artist_tag.fk_artist = artist.id
     LEFT JOIN tag ON tag.id = artist_tag.fk_tag
     GROUP BY artist.id,
              artist.name,
              country.name,
              artist_type.name 
               )
SELECt id,
       name,
       country,
       artist_type,
       tags
FROM SELECT_NAMES
ORDER BY LOWER(sort_names);
`;

export const sigleArtistQuery: string = `
SELECT artist.id, artist.name AS artist_name,
    country.name AS country,
    artist_type.name AS artist_type,
    artist.begin_date_year,
    artist.end_date_year,
    artist.wikipedia_suffix,
    array_agg(tag.name) as tags
FROM artist
    INNER JOIN country ON artist.fk_country = country.id
    INNER JOIN artist_type ON artist.fk_artist_type=artist_type.id
    LEFT JOIN artist_tag ON artist_tag.fk_artist = artist.id
    LEFT JOIN tag ON tag.id = artist_tag.fk_tag
WHERE artist.id=$1
GROUP BY country.name,
    artist.id,
    artist_type.name,
    artist.begin_date_year,
    artist.end_date_year,
    artist.wikipedia_suffix
`;

export const youtubeQuery = `
SELECT youtube_id, small_image_url, title FROM youtube WHERE fk_artist=$1;
`;
