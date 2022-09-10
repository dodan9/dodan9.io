import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieDataType } from "./Movies";

const MovieDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [movieDetail, setMovieDetail] = useState<movieDataType>();
  const getApi = axios({
    url: `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`,
    method: "get",
  });
  const callApi = async () => {
    try {
      const response = await getApi;
      setMovieDetail(response.data.data.movie);
      setLoading(false);
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };
  useEffect(() => {
    callApi();
  }, []);
  if (loading) return <h2>Loading...</h2>;
  return (
    <>
      <h2>{movieDetail?.title}</h2>
      <div>
        <img src={movieDetail?.large_cover_image} />
      </div>
      <div>
        <h4>
          {movieDetail?.title} ({movieDetail?.language})
        </h4>
        <h5>
          {movieDetail?.genres
            ? movieDetail?.genres.map((genre, index) => (
                <span key={index}>
                  {genre}
                  {movieDetail?.genres
                    ? movieDetail?.genres.length - 1 === index
                      ? null
                      : " /"
                    : null}{" "}
                </span>
              ))
            : "no genre"}
          | {movieDetail?.runtime}분
        </h5>
        <p>{movieDetail?.summary}</p>
      </div>
    </>
  );
};

export default MovieDetail;
