export const allArtistQuery: string = `
with SELECT_NAMES AS
(SELECT artist.id,
        artist.name,
        country.name as country,
        CASE
            WHEN strpos(artist.name, 'The ')=1 THEN substring(artist.name,5)
            ELSE artist.name
        END AS sort_names,
        array_agg(tag.name) as tags
FROM artist
INNER JOIN country ON country.id = artist.fk_country
LEFT JOIN artist_tag ON artist_tag.fk_artist = artist.id
LEFT JOIN tag ON tag.id = artist_tag.fk_tag
GROUP BY artist.id,
          artist.name,
          country.name )
SELECt id,
  name,
  country,
  tags
FROM SELECT_NAMES
ORDER BY LOWER(sort_names)
`;
