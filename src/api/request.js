import axiosClient from "./axios";
import { API_KEY } from "./constants";
const request = {
  fetchMovies: (movie_id) => {
    const url_movies = `/movie/${movie_id}?api_key=${API_KEY}&language=vi&append_to_response=release_dates,credits,videos,recommendations,keywords,images&include_image_language=vi`;
    return axiosClient.get(url_movies);
  },
  fetchTv: (tv_id) => {
    const url_tv = `/tv/${tv_id}?api_key=${API_KEY}&append_to_response=content_ratings,credits,videos,recommendations,keywords&language=vi`;
    return axiosClient.get(url_tv);
  },
  fetchPeople: (people_id) => {
    const url_people = `/person/${people_id}?api_key=${API_KEY}&language=vi&append_to_response=movie_credits,external_ids`;
    return axiosClient.get(url_people);
  },
  fetchCompanies: (company_id, page) => {
    const url_companies = `/company/${company_id}?api_key=${API_KEY}&language=vi&page=${page}&append_to_response=movies`;
    return axiosClient.get(url_companies);
  },
  fetchCollections: (collection_id) => {
    const url_collections = `/collection/${collection_id}?api_key=${API_KEY}&&language=vi`;
    return axiosClient.get(url_collections);
  },
  fetchKeywords: (keyword_id, page) => {
    const url_keywords = `/keyword/${keyword_id}?api_key=${API_KEY}&language=vi&page=${page}&append_to_response=movies`;
    return axiosClient.get(url_keywords);
  },
  fetchGenres: (genres_id, page) => {
    const url_genres = `/genre/${genres_id}?api_key=${API_KEY}&page=${page}&language=vi&append_to_response=movies `;
    return axiosClient.get(url_genres);
  },
  fetchPopular: (media_type) => {
    const url_popular = `/${media_type}/popular?api_key=${API_KEY}&&language=vi&page=1`;
    return axiosClient.get(url_popular);
  },
  fecthTrending: (media_type, time_window) => {
    const url_trending = `/trending/${media_type}/${time_window}?api_key=${API_KEY}&&language=vi&page=1`;
    return axiosClient.get(url_trending);
  },

  searchMovies: (query, page) => {
    const url_searchMovies = `/search/movie?api_key=${API_KEY}&language=vi&page=${page}&include_adult=false&query=${query}`;
    return axiosClient.get(url_searchMovies);
  },

  searchTVShows: (query, page) => {
    const url_searchTVShows = `/search/tv?api_key=${API_KEY}&language=vi&page=${page}&include_adult=false&query=${query}`;
    return axiosClient.get(url_searchTVShows);
  },

  searchPeople: (query, page) => {
    const url_searchPeople = `/search/person?api_key=${API_KEY}&language=vi&page=${page}&include_adult=false&query=${query}`;
    return axiosClient.get(url_searchPeople);
  },

  searchCompanies: (query, page) => {
    const url_searchCompanies = `/search/company?api_key=${API_KEY}&language=vi&page=${page}&query=${query}`;
    return axiosClient.get(url_searchCompanies);
  },

  searchCollections: (query, page) => {
    const url_searchCollections = `/search/collection?api_key=${API_KEY}&language=vi&page=${page}&query=${query}`;
    return axiosClient.get(url_searchCollections);
  },

  searchKeywords: (query, page) => {
    const url_searchKeywords = `/search/keyword?api_key=${API_KEY}&language=vi&page=${page}&query=${query}`;
    return axiosClient.get(url_searchKeywords);
  },
};
export default request;
