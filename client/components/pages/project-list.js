import React from 'react';
import connect from 'react-redux/lib/components/connect';
import Paper from 'material-ui/lib/paper';
import Spinner from '../widgets/spinner';

const mapStateToProps = function (state) {
  return {
    projects: state.projects
  };
};

class ProjectBlock extends React.Component {
  render() {
    return (
      <Paper style={{margin:'.5em',padding:'.25em',width:'12em',height:'12em'}}>
        <div style={{textAlign:'center'}}>
          <h3>{this.props.project.name}</h3>
        </div>
      </Paper>
    );
  }
}

class ProjectListPage extends React.Component {
  render() {
    const list = this.props.projects.map(p => <ProjectBlock key={p.id} project={p}/>);

    return (
      <div>
        <div style={{textAlign:'center'}}><h2>Projects List</h2></div>
        <Spinner/>
        <div id="project-list-container">
          {list}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(ProjectListPage);