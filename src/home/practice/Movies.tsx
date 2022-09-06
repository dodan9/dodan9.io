import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface movieDataType {
  id: number;
  url: "https://yts.mx/movies/rocketry-the-nambi-effect-2022";
  imdb_code: string;
  title: string;
  title_english: string;
  title_long: string;
  slug: string;
  year: number;
  rating: number;
  runtime: number;
  genres?: string[];
  summary: string;
  description_full: string;
  synopsis: string;
  yt_trailer_code: string;
  language: string;
  background_image: "https://yts.mx/assets/images/movies/rocketry_the_nambi_effect_2022/background.jpg";
  background_image_original: "https://yts.mx/assets/images/movies/rocketry_the_nambi_effect_2022/background.jpg";
  small_cover_image: "https://yts.mx/assets/images/movies/rocketry_the_nambi_effect_2022/small-cover.jpg";
  medium_cover_image: "https://yts.mx/assets/images/movies/rocketry_the_nambi_effect_2022/medium-cover.jpg";
  large_cover_image: "https://yts.mx/assets/images/movies/rocketry_the_nambi_effect_2022/large-cover.jpg";
}

const Movies = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [movieData, setMovieData] = useState<movieDataType[]>([]);
  const getApi = axios({
    url: "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year",
    method: "get",
  });
  const callApi = async () => {
    try {
      const response = await getApi;
      setMovieData(response.data.data.movies);
      setLoading(false);
      console.log("get api");
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  useEffect(() => {
    callApi();
  }, []);
  return (
    <Container>
      <h3>Movies</h3>
      {loading ? <h4>Loading...</h4> : null}
      {movieData.map((movie) => (
        <MovieBox key={movie.id}>
          <div>
            <img src={movie.large_cover_image} />
          </div>
          <div>
            <h4>
              {movie.title} ({movie.language})
            </h4>
            <h5>
              {movie.genres
                ? movie.genres.map((genre, index) => (
                    <span key={index}>
                      {genre}
                      {movie.genres
                        ? movie.genres.length - 1 === index
                          ? null
                          : " /"
                        : null}{" "}
                    </span>
                  ))
                : "no genre"}
              | {movie.runtime}분
            </h5>
            <p>{movie.summary}</p>
          </div>
        </MovieBox>
      ))}
    </Container>
  );
};

export default Movies;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;
const MovieBox = styled.div`
  width: 800px;
  align-self: center;
  display: flex;
  margin-bottom: 40px;
  & div:nth-child(1) {
    margin-right: 40px;
  }
  & div img {
    width: 200px;
  }
`;
