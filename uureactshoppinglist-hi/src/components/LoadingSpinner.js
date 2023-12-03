import React from 'react'
import { Spinner } from 'react-bootstrap';
import "./css/LoadingSpinner.css"

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
        <Spinner animation='border' variant='primary' />
    </div>
  )
}

export default LoadingSpinner