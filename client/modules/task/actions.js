export const ADD = 'TASK:ADD';
export const UPDATE = 'TASK:UPDATE';


function _update(tasks) {
  return {type: UPDATE, tasks};
}


export function initialise(idProject) {
  return dispatch => {
    const r = new XMLHttpRequest();
    r.open('GET', `/api/project/${idProject}/task`, true);
    r.setRequestHeader('Content-Type', 'application/json');
    r.onreadystatechange = ()=> {
      if (r.readyState === 4) {
        if (r.status === 200) {
          const tasks = JSON.parse(r.responseText);
          dispatch(_update(tasks));
        } else {
          console.error(r);
        }
      }
    };
    r.send();
  };
}

export function create(idProject, task) {
  return dispatch => {
    return new Promise(function (resolve, reject) {
      const r = new XMLHttpRequest();
      r.open('POST', `/api/project/${idProject}/task`, true);
      r.setRequestHeader('Content-Type', 'application/json');
      r.onreadystatechange = ()=> {
        if (r.readyState === 4) {
          if (r.status === 201) {
            const id = r.responseText;
            resolve(id)
          } else {
            console.error(r);
            reject(r)
          }
        }
      };
      r.send(JSON.stringify(task));
    });
  }

}