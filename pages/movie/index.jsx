import React from "react";
import useSWR from "swr";
import Link from "next/link";

// Import Components
import MovieCards from "../../components/MovieCards";
import Header from "../../components/Header";

export async function getServerSideProps(context) {
  const req = await fetch(`
  https://api.themoviedb.org/3/movie/popular?api_key=4c1c4651b470f738873f80310325d848&language=en-US&page=1`);
  const res = await req.json();
  return {
    props: { data: res.results }, // will be passed to the page component as props
  };
}

function Movies({ data }) {
  return (
    <div className="min-h-screen bg-[#282C37]">
      <Header />
      <div className="px-40 py-8 bg-[#181B22]">
        <div className="flex flex-wrap gap-8 px-6">
          {data && data
            ? data
                // .filter((item, idx) => idx < 30)
                .map((data, index) => {
                  return (
                    <Link href={`/movie/${data.id}`} key={index}>
                      <MovieCards data={data} index={data.id} />
                    </Link>
                  );
                })
            : null}
        </div>
      </div>
    </div>
  );
}

export default Movies;
