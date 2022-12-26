import React from "react";
import { Icon } from "@chakra-ui/icons";
import { AiFillStar } from "react-icons/ai";
import { Image, Shimmer } from "react-shimmer";

function SeasonCards(props) {
  let { data, index } = props;
  return (
    <div key={index} className="pt-8 flex max-w-[200px]">
      <div className="bg-[#1f232c] pb-2 rounded-md hover:border-1 hover:border-[#84cc16]">
        {/* <img
          className="hover:brightness-75"
          src={data.movie_poster}
          width={200}
          height={233}
          alt={data.movie_name}
        ></img> */}
        <Image
          NativeImgProps={{ className: "hover:brightness-75" }}
          src={`https://image.tmdb.org/t/p/w300${data.poster_path}`}
          alt={data.name}
          fallback={<Shimmer width={200} height={233} />}
          fadeIn={true}
        />
        <div className="text-white text-sm p-2">
          <p className="font-semibold text-center">{data.name}</p>
        </div>
      </div>
    </div>
  );
}

export default SeasonCards;
