import React from 'react';
import connect from 'react-redux/lib/components/connect';
import {initialise} from '../../modules/project/actions';
import {toProjectListPage, toHomePage, toCreateProjectPage} from '../../routes';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import ActionHome from 'material-ui/lib/svg-icons/action/home';
import ActionList from 'material-ui/lib/svg-icons/action/list';
import {red900} from 'material-ui/lib/styles/colors';

const mapStateToProps = function (state) {
  return {};
};

const mapDispatchToProps = function (dispatch) {
  return {
    onInit() {
      dispatch(initialise());
    },

  };
};
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCreateProject = this.handleCreateProject.bind(this);
    this.handleProjectList = this.handleProjectList.bind(this);
    this.handleHome = this.handleHome.bind(this);
  }

  componentDidMount() {
    this.props.onInit();
  }


  handleToggle() {
    this.setState({open: !this.state.open})
  }

  handleClose() {
    this.setState({open: false})
  }

  handleCreateProject() {
    toCreateProjectPage();
    this.handleClose();
  }

  handleProjectList() {
    toProjectListPage();
    this.handleClose();
  }

  handleHome() {
    toHomePage();
    this.handleClose();
  }

  render() {

    return (
      <AppBar title="Project Manager" onLeftIconButtonTouchTap={this.handleToggle} onTitleTouchTap={this.handleToggle}
              iconClassNameRight="muidocs-icon-navigation-expand-more" style={{  backgroundColor: red900}}>
        <LeftNav docked={false} width={250} open={this.state.open} onRequestChange={open => this.setState({open})}>
          <AppBar iconElementLeft={<IconButton onClick={this.handleClose}><NavigationClose /></IconButton>}
                  title="Menu"/>
          <MenuItem leftIcon={<ActionHome />} onTouchTap={this.handleHome}>Home</MenuItem>
          <MenuItem leftIcon={<ActionList />} onTouchTap={this.handleProjectList}>List of Project</MenuItem>
          <MenuItem leftIcon={<ContentAdd />} onTouchTap={this.handleCreateProject}>Create a new project</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
        </LeftNav>
      </AppBar>
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);


