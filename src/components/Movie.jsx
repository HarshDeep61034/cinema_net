import "./Movie.css"
export default function Movie(props){
    console.log(props.data)
    let dt = props.data.release_date
  let date = dt.slice(0,4)

  let rate = props.data.vote_average
  let rating = rate.toFixed(1)

  const styles = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${props.data.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%' 
  };
    return(<>
    <div className="div-backdrop">
    <div className="img-div-backdrop" style={styles}></div>
        <div className="overlay-backdrop">
        <div className="info">
        <h1 className="moviename">{props.data.title}</h1>
        <span className="movie-info">{date} | {rating}<i className="uis uis-favorite"></i> </span>
        <p>{props.data.overview}</p>
        </div>
        
    </div>
    </div>
    </>)
}