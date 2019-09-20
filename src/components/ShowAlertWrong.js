import React from 'react'
import Alert from 'react-bootstrap/Alert'
import { faBullseye, faArrowAltCircleRight, faAngleDoubleRight, faFire, faStar, faAward, faFireAlt, faFlushed, faTired } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ShowModalWrong() {
    return (
        <Alert variant="danger">
            Oops, You lose your chance!  <FontAwesomeIcon icon={faTired} />
        </Alert>
    );
  }