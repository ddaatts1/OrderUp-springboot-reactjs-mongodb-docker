import './Navbar.css'
import Map from '../GoogleMap/Map'

const Navbar = () => {

    return (
        <div className="Navbar">
            <div className='Name'>
                <span>OrderUp!</span>
            </div>

            <div className='Searchbox'>
                <div className='locationBox'><Map/></div>
                <div><input className='search' type="text"></input></div>
            </div>
        </div>
    )

}

export default Navbar; 