import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Card from './components/Card'
import Movie from './components/Movie'

function App() {

  //  ----------------STATES------------------

  // string which holds value of search input
  const [string, setString] = useState('')
  //  movies it holds the fetched data from the API
  const [movies, setMovies] = useState([])
  //  its a boolean value which helps in conditionaly rendering the card or clickedComponent
  const [change, setChange] = useState(false)
  // it helps passing the value of clicked movie into the Movie component which further renders the page of clicked movie
  const [selectedMovie, setSelectedMovie] = useState({})

  // JUTS FETCHING THE DATA FROM API & string (search input) is inside the dependencies Array
  useEffect(() => {

    // using a ternary operator to change url whether we are seraching for a string(A movie) or just render the trending ones 
    const URL = string.length !== 0 ? `https://api.themoviedb.org/3/search/movie?query=${string}&include_adult=false&language=en-US&page=1` : 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'
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


  // FUNCTIONS TO PERFORM CERTAIN TASKS
  
  // this function on changing the input(search bar) in navbar component changes the string state accordingly
  function handleChange(event) {
    let x = event.target.value
    setString(x)
    setChange(false)
  }

  function changeComponent(id) {
    setChange(true)
    
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].id === id) {
        setSelectedMovie(movies[i])
      }
    }
  }

  function Home(){
    setString("")
    setChange(false)
  }

  //  MAPPING OVER THE movies state which has the data fetched from API to render the Card Components
  const cardElements = movies.map((movie) => {
    if(movie.poster_path)
    return <Card change={changeComponent} key={movie.id} id={movie.id} date={movie.release_date} rating={movie.vote_average} title={movie.title} poster={movie.poster_path} />
  })


  return (
    <>
      <Navbar handleChange={handleChange} home={Home} />
      {string.length === 0 && !change && <h1 className='head-trend'>Trending Movies</h1>}
      <main>
        {change ? <Movie data={selectedMovie} /> : cardElements}
      </main>
    </>
  )
}

export default App
