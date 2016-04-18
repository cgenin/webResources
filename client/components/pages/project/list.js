import React from 'react';
import connect from 'react-redux/lib/components/connect';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import ContentSend from 'material-ui/lib/svg-icons/content/send';

import {toProjectPage} from '../../../routes'

const mapStateToProps = function (state) {
  return {
    projects: state.projects
  };
};

class ProjectBlock extends React.Component {

  constructor(props) {
    super(props);
    this.goto = this.goto.bind(this);
  }

  goto() {
    toProjectPage(this.props.project.id);
  }

  render() {
    const jh = this.props.project.jh || 0;
    return (
      <Paper className="project-list-item">
        <div className="text-center">
          <h3>{this.props.project.name}</h3>
        </div>
        <div className="text-center">
          {jh} d/h
        </div>
        <div className="text-center">
          <FlatButton label="Go !!" icon={<ContentSend />} title="Edit this project" onClick={this.goto}/>
        </div>
      </Paper>
    );
  }
}

class ProjectListPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {filter: ''};
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onFilterChange(e) {
    const filter = e.target.value;
    this.setState({filter});
  }

  render() {
    const filter = this.state.filter;
    const list = this.props.projects
      .filter(p => {
        if (!filter || filter.length === 0) {
          return true;
        }
        return p.name.toUpperCase().indexOf(filter.toUpperCase()) !== -1;
      })
      .map(p => <ProjectBlock key={p.id} project={p}/>);

    return (
      <div>
        <div className="text-center"><h2>Projects List</h2></div>
        <div>
          <TextField hintText="Filter" fullWidth={true} value={this.state.filter} onChange={this.onFilterChange}/>
        </div>
        <div id="project-list-container">
          {list}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ProjectListPage);