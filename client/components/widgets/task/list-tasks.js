import React from 'react';
import connect from 'react-redux/lib/components/connect';
import Paper from 'material-ui/lib/paper';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import ToggleCheckBoxOutlineBlank from 'material-ui/lib/svg-icons/toggle/check-box-outline-blank';
import ToggleCheckBox from 'material-ui/lib/svg-icons/toggle/check-box';

import {toCreateTaskPage} from '../../../routes';
import {initialise} from '../../../modules/task/actions';

const addMonthTo = (dtStr, nb) => {
  const dt = new Date(dtStr);
  const result = [dt];
  Array.from(new Array(nb), (x, i) => i + 1).forEach((v) => {
    result.push(new Date(dt.getFullYear(), dt.getMonth() + v, 1));
  });
  return result;
};

const formatDate = (date) => {
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return m + '/' + y;
};

const mapStateToProps = function (state, props) {
  if (state.projects.length === 0 || !props.project.id) {
    return {month: [], resources: [], tasks: []};
  }

  const month = (props.project.endDate) ? [] : addMonthTo(props.project.beginDate, 6);
  return {month, resources: [], tasks: state.tasks};
};

const mapDispatchToProps = function (dispatch) {
  return {
    onInit(idProject){
      dispatch(initialise(idProject));
    }
  };
};


const style = {
  marginRight: 20
};

const CENTER_STYLE = {textAlign: 'center'};

class MonthCheckColumn extends React.Component {
  render() {
    const planning = this.props.task.planning || {};
    const monthStr = formatDate(this.props.month);
    if (planning[monthStr]) {
      return (
        <TableRowColumn style={{backgroundColor:Colors.green300}}>
          <IconButton touch={true}>
            <ToggleCheckBox color={Colors.green500}/>
          </IconButton>
        </TableRowColumn>);
    }
    return (
      <TableRowColumn style={{backgroundColor:Colors.grey300}}>
        <IconButton touch={true}>
          <ToggleCheckBoxOutlineBlank/>
        </IconButton>
      </TableRowColumn>);

  }
}

class TaskRow extends React.Component {
  render() {
    const task = this.props.task;

    const monthRows = this.props.month.map((m, i) => {
      return (<MonthCheckColumn key={i} task={task} month={m}/>)
    });
    return (
      <TableRow key={this.props.index} selectable={false} selected={false}>
        <TableRowColumn style={{display: 'flex',justifyContent: 'flex-end', padding:'.1em'}}>
          <div style={{margin:'auto'}}>{task.name}</div>
          <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}>
            <MenuItem primaryText="Delete"/>
          </IconMenu>
        </TableRowColumn>
        {monthRows}
        <TableRowColumn>&nbsp;/&nbsp;{task.max}</TableRowColumn>
      </TableRow>
    );
  }
}


class ListResources extends React.Component {

  componentDidMount() {
    if (this.props.project.id)
      this.props.onInit(this.props.project.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.project && (!this.props.project || this.props.project.id !== nextProps.project.id)) {
      this.props.onInit(nextProps.project.id);
    }
  }


  render() {

    var month = this.props.month;
    const MonthHeaders = month.map(d => <TableHeaderColumn  >{formatDate(d)}</TableHeaderColumn>);
    const nbColumns = month.length + 2;
    // tableRows.push(<AddRow index={tableRows.length+1}/>);
    const tableRows = (this.props.tasks.length === 0) ? (
      <TableRow key={0} selectable={false} selected={false}>
        <TableRowColumn colSpan={nbColumns+1} style={CENTER_STYLE}>No Tasks found</TableRowColumn>
      </TableRow>
    ) : this.props.tasks.map((t, i) => <TaskRow task={t} index={i} month={month}/>);
    return (
      <Paper>
        <Table fixedHeader={true} fixedFooter={true} selectable={false} multiSelectable={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn colSpan={nbColumns} tooltip="Super Header" style={CENTER_STYLE}>
                Super Header
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="Manage Tasks">Tasks</TableHeaderColumn>
              {MonthHeaders}
              <TableHeaderColumn tooltip="The Sum">Sum</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableFooter adjustForCheckbox={false}>
            <TableRow colSpan={nbColumns}>
              <TableRowColumn colSpan={nbColumns}>
                <FloatingActionButton mini={true} secondary={true} style={style} title="create a new Tasks"
                                      onClick={() => toCreateTaskPage(this.props.project.id)}>
                  <ContentAdd />
                </FloatingActionButton>
              </TableRowColumn>
            </TableRow>
          </TableFooter>
          <TableBody showRowHover={true} displayRowCheckbox={false} stripedRows={true}>
            {tableRows}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListResources);