export const CREATE = 'PROJECT:CREATE';

export function create(project) {
  return {
    type: CREATE, project
  };
}
