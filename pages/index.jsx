import React from 'react'

// Import Components
import Header from '../components/Header'
import Trending from '../components/Trending'
import LatestMovies from '../components/LatestMovies'
import LatestTV from '../components/LatestTV'

export async function getServerSideProps() {
  // Fetch data from external API
  const apiKey = process.env.API_KEY
  const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  )
  const data = await res.json()
  if (res.ok) {
      return {
          props: { popularMovies: data.results }
      }
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
