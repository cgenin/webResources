import React from 'react';

class Spinner extends React.Component {
  render(){
    return (
      <div className="spinner-load-1">
        <p>Loading 1</p>
        <div className="spinner-line"></div>
        <div className="spinner-line"></div>
        <div className="spinner-line"></div>
      </div>
    );
  }
}

export default Spinner;
