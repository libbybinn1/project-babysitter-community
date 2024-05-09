import './Error.css';
import { Link } from 'react-router-dom'

function Error() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"))
    return (
        <div id="</hr>">
            <div id="clouds">
                <div className="cloud x1"></div>
                <div className="cloud x1_5"></div>
                <div className="cloud x2"></div>
                <div className="cloud x3"></div>
                <div className="cloud x4"></div>
                <div className="cloud x5"></div>
            </div>
            <div className='c'>
                <div className='_404' style={{color:"#01408f"}}>404</div>
                <div className='_1'>THE PAGE</div>
                <div className='_2'>WAS NOT FOUND</div>
                 {<Link style={{  cursor: "pointer" }} className="btn" exact="true" to={"/"}>BACK TO LOGIN</Link>}
            </div>
        </div>
    );
}

export default Error;
