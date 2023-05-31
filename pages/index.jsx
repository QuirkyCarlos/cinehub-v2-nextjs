import React from 'react'

// Import Components
import Header from '../components/Header'
import Trending from '../components/Trending'
import LatestMovies from '../components/LatestMovies'
import LatestTV from '../components/LatestTV'

export async function getServerSideProps(context) {
  const [trending, latestMovies, latestTV] = await Promise.all([
    (await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=4c1c4651b470f738873f80310325d848')).json(),
    (await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=4c1c4651b470f738873f80310325d848&language=en-US&page=1')).json(),
    (await fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=4c1c4651b470f738873f80310325d848')).json()
  ])
  return {
    props: { trendingData: trending.results, latestMoviesData: latestMovies.results, latestTVData: latestTV.results }, // will be passed to the page component as props
  }
}

function Home({ trendingData, latestMoviesData, latestTVData }) {
  return (
    <div className='min-h-screen bg-[#282C37]'>
      <Header />
      <Trending data={trendingData}/>
      <LatestMovies data={latestMoviesData}/>
      <LatestTV data={latestTVData}/>
    </div>
  )
}

export default Home