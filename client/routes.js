import React from 'react';
import {Route, IndexRoute} from 'react-router';
import hashHistory from 'react-router/lib/hashHistory';
import MainLayout from './components/layouts/mainLayout';
import HomePage from './components/pages/home';
import ProjectCreatePage from './components/pages/project/create';
import ProjectPage from './components/pages/project/edit';
import ProjectListPage from './components/pages/project/list';
import TaskCreatePage from './components/pages/task/create';

const history = hashHistory;
const HOME_URL = '/';
const CREATE_PROJECT_URL = 'project-create';
const LIST_PROJECT_URL = 'project-list';

export const toProjectPage = (id)=> {
  const url = `/project/${encodeURIComponent(id)}`;
  history.push(url);
};

export const toHomePage = ()=> {
  history.push(HOME_URL);
};

export const toProjectListPage = ()=> {
  history.push(LIST_PROJECT_URL);
};

export const toCreateProjectPage = ()=> {
  history.push(`/${CREATE_PROJECT_URL}`);
};

export const toCreateTaskPage = (id)=> {
  const url = `/project/${encodeURIComponent(id)}/task/new`;
  history.push(url);
};

export const ALL_ROUTES = (
  <Route>
    <Route path={HOME_URL} component={MainLayout}>
      <IndexRoute component={HomePage}/>
      <Route path={CREATE_PROJECT_URL} component={ProjectCreatePage}/>
      <Route path={LIST_PROJECT_URL } component={ProjectListPage}/>
      <Route path="project/:id" component={ProjectPage}/>
      <Route path="project/:id/task/new" component={TaskCreatePage}/>
    </Route>
  </Route>
);
