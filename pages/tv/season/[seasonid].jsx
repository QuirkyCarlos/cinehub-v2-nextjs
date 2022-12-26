import React, { useState } from "react";
import { Icon } from "@chakra-ui/icons";
import Header from "../../../components/Header";
import { FaPlay } from "react-icons/fa";
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
  let { id } = context.query;
  let { seasonid } = context.params;
  const req = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${seasonid}?api_key=4c1c4651b470f738873f80310325d848&language=en-US`
  );
  const res = await req.json();
  return {
    props: { id, seasonid, data: res }, // will be passed to the page component as props
  };
}

function SeasonID(props) {
  let { id, seasonid, data } = props;
  const [epid, setepid] = useState(1);
  const handleClick = (value) => {
    setepid(value);
  };

  const handleRoutePushClick = (value) => {
    router.push(value)
    setepid(1)
  }

  const router = useRouter()
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#181B22] pb-16">
        <div className="mx-8 pt-8">
        <iframe
          className="w-full aspect-video"
          src={`https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${seasonid}&e=${epid}`}
          allowFullScreen={true}
        ></iframe>
        </div>
        <div className="flex flex-wrap mx-16 justify-center space-x-4">
          {data.episodes.map((item, index) => {
            return (
              <div key={index}>
                <h1
                  role={"button"}
                  onClick={() => handleClick(item.episode_number)}
                  className="p-4 bg-[#282C37] inline-block mt-6 rounded-md font-bold text-white hover:bg-lime-500 hover:text-black"
                >
                  <Icon className="mr-3" as={FaPlay} />
                  {item.season_number} x {item.episode_number} : {item.name}
                </h1>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-8 space-x-4">
        <h1 role={'button'} onClick={() => handleRoutePushClick(`/tv/${id}`)} className="p-4 bg-lime-500 inline-block mt-6 rounded-md font-bold text-black  hover:opacity-75">
                Show Info Page
            </h1>
            <h1 role={'button'} onClick={() => handleRoutePushClick(`/tv/season/${Number(seasonid) + 1}?id=${id}`)} className="p-4 bg-lime-500 inline-block mt-6 rounded-md font-bold text-black  hover:opacity-75">
                Next Season
            </h1>
        </div>
      </div>
    </>
  );
}

export default SeasonID;
