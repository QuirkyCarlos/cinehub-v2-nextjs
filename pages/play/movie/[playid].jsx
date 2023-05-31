import React from "react";
import { useRouter } from "next/router";
import Header from "../../../components/Header";

export const config = {
	runtime: 'edge',
};

export async function getServerSideProps(context) {
  let { playid } = context.params;
  return {
    props: { playid }, // will be passed to the page component as props
  };
}

function PlayMovieID(props) {
  const { playid } = props;
  const router = useRouter()
  const handleRoutePushClick = (value) => {
    router.push(value)
  }
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#181B22] pb-16">
        <div className="mx-8 pt-8">
          <iframe
            className="w-full aspect-video"
            src={`https://www.2embed.to/embed/tmdb/movie?id=${playid}`}
            allowFullScreen={true}
          ></iframe>
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <h1
            role={"button"}
            onClick={() => handleRoutePushClick(`/movie/${playid}`)}
            className="p-4 bg-lime-500 inline-block mt-6 rounded-md font-bold text-black  hover:opacity-75"
          >
            Back
          </h1>
        </div>
      </div>
    </>
  );
}

export default PlayMovieID;
