export interface Artist {
  id: number;
  name: string;
  country: string;
  artist_type: string;
}

export interface SingleArtist extends Artist {
  begin_date_year: number | undefined;
  end_date_year: number | undefined;
  wikipedia_suffix: string | undefined;
  tags: string[];
}

export interface Youtube {
  youtube_id: string;
  small_image_url: string;
  title: string;
}

interface Album {
  id: number;
  name: string;
  first_release_date: Date;
  front_small: string;
}

export interface Albums {
  studio_albums: Album[] | [];
  singles: Album[] | [];
  extended_plays: Album[] | [];
  compilations: Album[] | [];
  soundtrack: Album[] | [];
  live: Album[] | [];
  demo: Album[] | [];
}
