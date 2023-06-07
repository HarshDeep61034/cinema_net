import "./Card.css"


 export default function Card(props){
  // ROUNDING OFF RATING
  let rate = props.rating
  let rating = rate.toFixed(1)
  // CONVERTING DATE INTO YEAR
  let dt = props.date
  let date = dt.slice(0,4)
  return (<>
  
  <div className="container" onClick={()=>props.change(props.id)}>
  <img className="poster" src={`https://image.tmdb.org/t/p/original${props.poster}`}/>
  <div className="overlay" >
<div className="box">
<span className="card-info">{date}  •  {rating}<i className="uis uis-favorite"></i> </span>
    <h1 className="title">{props.title}</h1>
</div>
  </div>
    </div>
    
  </>)
}