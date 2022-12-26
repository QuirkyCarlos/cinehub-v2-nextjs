import React from "react";
import { Icon } from "@chakra-ui/icons";
import { AiFillStar } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import dynamic from "next/dynamic";
import MovieCards from "../../components/MovieCards";

import Header from "../../components/Header";
import Link from "next/link";

const Player = dynamic(() => import("../../components/Player"), {
  ssr: false,
});

export async function getServerSideProps(context) {
  let { movieid } = context.params;
  let epid_split = movieid.split("-");
  let epid = epid_split[epid_split.length - 1];
  const [data, streamData] = await Promise.all([
    (
      await fetch(
        `https://api.themoviedb.org/3/movie/${movieid}?api_key=4c1c4651b470f738873f80310325d848&language=en-US&append_to_response=credits,recommendations`
      )
    ).json(),
    (
      await fetch(
        `https://cinehub-v2-backend.vercel.app/api/watch?id=movie/${movieid}&epid=${epid}`
      )
    ).json(),
  ]);
  return {
    props: { data: data, movieid, streamData }, // will be passed to the page component as props
  };
}

function movieidPage({ data, movieid, streamData }) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#181B22]">
        <img
          className="min-w-full h-72 object-cover brightness-50 relative"
          src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
          alt=""
        />
        <div className="flex h-[280px]">
          <img
            className="h-96 rounded-md relative z-20 bottom-32 left-10"
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt=""
          />
          <div className="ml-20 mt-8 flex flex-col">
            <span className="text-4xl font-bold text-white">{data.title}</span>
            <div className="flex space-x-2 mt-4">
              {data.genres.map((item, index) => {
                return (
                  <Link href={"/"}>
                    <div key={index} className="p-2 text-white text-xs bg-[#282C37] hover:bg-lime-500 hover:text-black rounded-md">
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="flex space-x-2 mt-4 text-[#939ba2]">
              <span>
                <Icon className="mr-1" as={AiFillStar}></Icon>
                {Number(data.vote_average).toFixed(1)}
              </span>
              <span>|</span>
              <span>{data.runtime} minutes</span>
              <span>|</span>
              <span>{data.release_date}</span>
            </div>
            <Link className="self-start" href={`/play/movie/${movieid}`}>
              <div className="pt-3 pb-3 pr-8 pl-8 mt-4 text-white text-lg bg-[#282C37] hover:bg-lime-500 hover:text-black rounded-md">
                <Icon className="mr-3" as={FaPlay}></Icon>Play
              </div>
            </Link>
          </div>
        </div>
        <div className="mx-10">
          <h1 className="text-3xl text-white">Overview</h1>
          <h1 className="text-[#939ba2] break-all mt-2">{data.overview}</h1>
        </div>
        <div className="mx-10 mt-8">
          <h1 className="text-3xl text-white">Cast</h1>
          <div className="flex flex-wrap space-x-4 mt-6">
             {data.credits.cast
              .filter((item, idx) => idx < 6)
              .map((item, index) => {
                return (
                  <div key={index} className="bg-[#1f232c] rounded-lg pb-2">
                    <img
                      className="object-cover h-60 rounded-sm hover:brightness-75"
                      // className="object-cover h-64 w-96"
                      src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                      alt=""
                    />
                    <p className="pl-2 pt-2 text-gray-300 text-sm font-bold">
                      {item.name}
                    </p>
                  </div>
                  )
              })}
          </div>
        </div>
        <div className="mx-10 mt-8">
          <h1 className="text-3xl text-white">Recommendations</h1>
          <div className="flex flex-wrap space-x-4">
            {data.recommendations.results
              .filter((item, idx) => idx < 5)
              .map((item, index) => {
                return (
                  <Link href={`/movie/${item.id}`} key={index}>
                    <MovieCards data={item} index={item.id} />
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default movieidPage;
