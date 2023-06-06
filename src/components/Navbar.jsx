import Profile from "../assets/profile.jpg"
import "./Navbar.css"

export default function Navbar(props){
    return(<>
    <nav>
    <h1 className="logo-head">CINEMA <span className="net">NET</span> </h1>
    <i className="uis uis-house-user" onClick={props.change}></i>
    <input name="movie" type="text" className="input-box" placeholder="Search" onChange={props.handleChange}/>
    <img className="profile" src={Profile}/>
    </nav>
           </>)
}