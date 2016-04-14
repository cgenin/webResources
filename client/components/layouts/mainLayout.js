import React from 'react';
import Header from '../widgets/header';

class MainLayout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div id="page-container">
          <div id="page-inner-container">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default MainLayout;
