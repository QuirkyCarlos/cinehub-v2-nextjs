import Link from "next/link";
import React from "react";
import Header from "../../components/Header";
import MovieSearchCard from "../../components/Search/MovieSearchCard";
import TVSearchCard from "../../components/Search/TVSearchCard";

export const config = {
	runtime: 'experimental-edge',
};

export async function getServerSideProps(context) {
  let { searchid } = context.params;
  const req = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=4c1c4651b470f738873f80310325d848&language=en-US&page=1&query=${searchid}`
  );
  const res = await req.json();
  return {
    props: { data: res.results }, // will be passed to the page component as props
  };
}

function SearchPage(props) {
  let { data } = props;
  return (
    <div className="min-h-screen bg-[#282C37]">
      <Header />
      <div className="px-40 py-8 bg-[#181B22]">
        {/* <div className="flex justify-between">
          <h1 className="text-white font-semibold text-4xl pl-8">Trending</h1>
          <a className="text-white text-sm pr-12" href="">
            View all
          </a>
        </div> */}
        <div className="flex flex-wrap gap-8 px-6">
          {data && data
            ? data.map((item, index) => {
                if (item.media_type == 'movie') {
                    return (
                        <Link href={`/movie/${item.id}`} key={index}>
                        <MovieSearchCard data={item} index={item.id} />
                      </Link>
                    )
                }
                else {
                    return (
                        <Link href={`/tv/${item.id}`} key={index}>
                        <TVSearchCard data={item} index={item.id} />
                      </Link>
                    )
                }
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
