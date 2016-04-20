import React from 'react';
import connect from 'react-redux/lib/components/connect';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import Divider from 'material-ui/lib/divider';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

import {toProjectPage} from '../../../routes';
import {create} from '../../../modules/task/actions'

const mapStateToProps = function (state, props) {
  return {
    routing: state.routing,
    idProject: props.params.id
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    onSave(idProject, task){
      dispatch(create(idProject, task)).then(() => toProjectPage(idProject)).catch(e => console.error(e));
    }
  };
};

class TaskCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', max: 0};
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeMax = this.onChangeMax.bind(this);
    this.onValidate = this.onValidate.bind(this);
  }

  onChangeText(e) {
    const state = Object.assign({}, this.state);
    state.name = e.target.value;
    state.error = false;
    this.setState(state);
  }

  onChangeMax(e) {
    const state = Object.assign({}, this.state);
    state.max = parseInt(e.target.value) || 0;
    this.setState(state);
  }

  onValidate() {
    const state = Object.assign({}, this.state);
    if (!state.name || state.name.length === 0) {
      state.error = true;
      this.setState(state);
      return;
    }
    this.props.onSave(this.props.idProject, state);
  }

  render() {
    const errorText = (this.state.error) ? 'The name is required' : null;
    const styletf = {marginLeft: '5em', marginRight: '5em'};
    return (
      <div>
        <h1>Create a new Task</h1>
        <Paper>
          <div style={styletf}>
            <TextField ref="name" value={this.state.name} fullWidth={true} errorText={errorText}
                       onChange={this.onChangeText} floatingLabelText="Name of the task"/>
          </div>
          <div style={styletf}>
            <TextField ref="max" value={this.state.max} fullWidth={true}
                       onChange={this.onChangeMax} floatingLabelText="Max D/H"/>
          </div>
          <Divider />
          <div style={{display:'flex',justifyContent: 'flex-end', marginBottom:'2em'}}>
            <FlatButton label="Back" onClick={() => toProjectPage(this.props.idProject)}/>
            <RaisedButton label="Create" onClick={this.onValidate} primary={true} style={{margin: 12}}/>
          </div>
        </Paper>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskCreatePage);