import Popup from 'reactjs-popup';
import './CartPopup.css'


function TestPopup(){

    return(
        <Popup trigger={<button> Trigger</button>} position="right top">
            <div className='cart'>Popup content here !!</div>
        </Popup>
    )
}

export default TestPopup;