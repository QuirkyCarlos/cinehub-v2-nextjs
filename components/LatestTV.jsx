import React from "react";
import Link from "next/link";

// Import Components
import TVCards from "./TVCards";

function LatestTV({data}) {
  return (
    <div className="px-40 py-8 bg-[#181B22]">
      {data && data ? (
        <div className="flex justify-between">
          <h1 className="text-white font-semibold text-4xl pl-8">
            Latest TV Series
          </h1>
          <a className="text-white text-sm pr-12" href="">
            View all
          </a>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-8 px-6">
        {data && data
          ? data
              .filter((item, idx) => idx < 10)
              .map((data, index) => {
                return (
                  <Link href={`/tv/${data.id}`} key={index}>
                    <TVCards data={data} index={data.id} />
                  </Link>
                );
              })
          : null}
      </div>
    </div>
  );
}

export default LatestTV;
