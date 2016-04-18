import React from 'react';
import connect from 'react-redux/lib/components/connect';
import {create} from '../../modules/project/actions';
import {toProjectPage} from '../../routes';
import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import Divider from 'material-ui/lib/divider';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';


const mapStateToProps = function (state) {
  return {
    routing: state.routing
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    onSave(project) {
      dispatch(create(project))
        .then((id) => toProjectPage(id))
        .catch(e => console.error(e));
    }
  };
};

const defaultState = {
  name: {value: ''},
  beginDate: {value: new Date()},
  endDate: {}
};

const formatDate = (date) => {
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return m + '/' + y;
};

const dt2Compare = (date) => {
  if (!date) {
    return '0000-00';
  }
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return y + '-' + m;
};


class ProjectCreatePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = defaultState;
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeBeginDate = this.onChangeBeginDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onValidate = this.onValidate.bind(this);
  }

  onChangeText(e) {
    const state = Object.assign({}, this.state);
    state.name.value = e.target.value;
    state.name.error = false;
    this.setState(state);
  }

  onChangeBeginDate(e, dt) {
    const state = Object.assign({}, this.state);
    state.beginDate.value = dt;
    if (dt2Compare(state.endDate.value) < dt2Compare(dt)) {
      state.endDate.value = null;
    }
    this.setState(state);
  }

  onChangeEndDate(e, dt) {
    const state = Object.assign({}, this.state);
    state.endDate.value = dt;
    this.setState(state);
  }

  onReset() {
    this.setState(defaultState);
  }

  onValidate() {
    const state = Object.assign({}, this.state);
    if (!state.name.value || state.name.value.length === 0) {
      state.name.error = true;
      this.setState(state);
      return;
    }
    this.props.onSave({name: state.name.value, beginDate: state.beginDate.value, endDate: state.endDate.value})
  }

  render() {

    const styleDate = {marginLeft: '5em'};
    const styletf = {marginLeft: '5em', marginRight: '5em'};
    const errorText = (this.state.name.error) ? 'The name is required' : null;
    return (
      <div>
        <h1>Create a new Project</h1>
        <Paper>
          <div style={styletf}>
            <TextField ref="name" value={this.state.name.value} fullWidth={true} errorText={errorText}
                       onChange={this.onChangeText} floatingLabelText="Name of the project"/>
          </div>
          <div
            style={{display:'flex',alignItems: 'center',justifyContent: 'center', alignContent: 'stretch', marginBottom:'1em'}}>
            <div style={styleDate}>
              Begin Date : <DatePicker onChange={this.onChangeBeginDate}
                                       value={this.state.beginDate.value}
                                       hintText="Begin Date" formatDate={formatDate}/>
            </div>
            <div style={styleDate}>
              End Date : <DatePicker onChange={this.onChangeEndDate} minDate={this.state.beginDate.value}
                                     value={this.state.endDate.value} hintText="End Date" formatDate={formatDate}/>
            </div>
          </div>
          <Divider />
          <div style={{display:'flex',justifyContent: 'flex-end', marginBottom:'2em'}}>
            <FlatButton label="Reset" onClick={this.onReset}/>
            <RaisedButton label="Create" onClick={this.onValidate} primary={true} style={{margin: 12}}/>
          </div>
        </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreatePage);
