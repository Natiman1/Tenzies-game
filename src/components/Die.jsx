import PropTypes from 'prop-types';

function Die(props) {
    return (

        <button className='die' style={{backgroundColor: props.isHeld ? '#59E391' : "white"}} onClick={props.hold}>{props.value}</button>

    )
}

Die.propTypes = {
    value: PropTypes.number.isRequired,
    isHeld: PropTypes.bool.isRequired,
    hold: PropTypes.func.isRequired
}

export default Die