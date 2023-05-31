import React from "react";
import Link from "next/link";

// Import Components
import TVCards from "../../components/TVCards";
import Header from "../../components/Header";

export const config = {
	runtime: 'experimental-edge',
};

export async function getServerSideProps(context) {
  const req = await fetch(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=4c1c4651b470f738873f80310325d848`
  );
  const res = await req.json();
  return {
    props: { data: res.results }, // will be passed to the page component as props
  };
}

function TV({ data }) {
  return (
    <div className="min-h-screen bg-[#282C37]">
      <Header />
      <div className="px-40 py-8 bg-[#181B22]">
        <div className="flex flex-wrap gap-8 px-6">
          {data && data
            ? data.map((data, index) => {
                return (
                  <Link href={`/tv/${data.id}`} key={index}>
                    <TVCards data={data} index={data.id} />
                  </Link>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default TV;
