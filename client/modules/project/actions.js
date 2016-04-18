export const ADD = 'PROJECT:ADD';
export const UPDATE = 'PROJECT:UPDATE';

function _add(project) {
  return {type: ADD, project};
}

function _update(projects) {
  return {type: UPDATE, projects};
}

function get(id) {
  return dispatch => {
    const r = new XMLHttpRequest();
    r.open('GET', `/api/project/${id}`, true);
    r.setRequestHeader('Content-Type', 'application/json');
    r.onreadystatechange = ()=> {
      if (r.readyState === 4) {
        if (r.status === 200) {
          const project = JSON.parse(r.responseText);
          dispatch(_add(project))
        } else {
          console.error(r);
        }
      }
    };
    r.send();
  };
}

export function initialise() {
  return dispatch => {
    const r = new XMLHttpRequest();
    r.open('GET', `/api/project`, true);
    r.setRequestHeader('Content-Type', 'application/json');
    r.onreadystatechange = ()=> {
      if (r.readyState === 4) {
        if (r.status === 200) {
          const projects = JSON.parse(r.responseText);
          dispatch(_update(projects));
        } else {
          console.error(r);
        }
      }
    };
    r.send();
  };
}

export function create(project) {
  return dispatch => {
    return new Promise(function (resolve, reject) {
      const r = new XMLHttpRequest();

      r.open('POST', '/api/project', true);
      r.setRequestHeader('Content-Type', 'application/json');
      r.onreadystatechange = ()=> {
        if (r.readyState === 4) {
          if (r.status === 201) {
            const id = r.responseText;
            dispatch(get(id));
            console.log(id);
            resolve(id)
          } else {
            console.error(r);
            reject(r)
          }
        }
      };
      r.send(JSON.stringify(project));
    });
  }

}