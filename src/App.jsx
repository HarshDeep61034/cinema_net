import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Card from './components/Card'
import Movie from './components/Movie'

function App() {
  

  const [string, setString] = useState('')
  useEffect(() => {
    const URL = string.length !== 0  ?   `https://api.themoviedb.org/3/search/movie?query=${string}&include_adult=false&language=en-US&page=1` : 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWQzNzgyODM3M2QxOThkNGRmMDY4MGQ3MzY0Njg3NSIsInN1YiI6IjY0N2RlNDc3MTc0OTczMDBhODFhN2NiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H-9fB5z6ag2m5iEsxAZWRi1AgyJhlvhfGOBS-rjkZFw'
      }
    };
    fetch(URL, options)
      .then(res => res.json())
      .then(data => setMovies(data.results))
      .catch(err => console.error('error:' + err));
      
      
  }, [string]);
  
  const [movies, setMovies] = useState([])
  
  const cardElements = movies.map((movie)=>{
    return <Card change={changeComponent} key={movie.popularity} id={movie.id} date={movie.release_date} rating={movie.vote_average} title={movie.title} poster={movie.poster_path} />
  }) 
  
  
  const[change, setChange] = useState(false)
const[selectedMovie, setSelectedMovie] = useState({})
  function handleChange(event){
    let x = event.target.value
   setString(x)
  }

function changeComponent(id)
{
  setChange(prevState=> !prevState)
  setString("")
for(let i =0; i < movies.length; i++){
  if(movies[i].id === id){
    setSelectedMovie(movies[i])
  }
  

}


}  return (
    <>
    <Navbar handleChange={handleChange} change={changeComponent}/>
    {string.length === 0 && !change && <h1 className='head-trend'>Trending Movies</h1>}
    <main>
    
    {change ? <Movie data={selectedMovie}/> : cardElements}
       </main>
    </>
  )
  }

export default App
