import React from 'react';
import connect from 'react-redux/lib/components/connect';
import ListResources from '../../widgets/task/list-tasks';

const mapStateToProps = function (state, props) {
  console.log(props)
  console.log(state.routing)
  if (state.projects.length === 0 || !props.params.id) {
    return {selected: {}};
  }

  const selected = state.projects.find(p => props.params.id === p.id);
  return {selected};
};

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <div><h1>MyPage : {this.props.selected.name}</h1></div>
      <ListResources project={this.props.selected} />
    </div>);
  }
}

export default connect(mapStateToProps)(ProjectPage);