import React from 'react'
import Alert from 'react-bootstrap/Alert'
import { faSmileWink, faArrowAltCircleRight, faAngleDoubleRight, faFire, faStar, faAward, faFireAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ShowModalRight() {
    return (
      <>
          <Alert variant="success">
            You got that one right! <FontAwesomeIcon icon={faSmileWink} />
          </Alert>
      </>
    );
  }
