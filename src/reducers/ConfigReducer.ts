interface Config {
  x: number,
  y: number,
  speed: number,
  running: boolean
};

const defaultState: Config = {
  x: 60,
  y: 40,
  speed: 150,
  running: false
};

export const configReducer = (state: Config = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'update':
      let value = action.data.value;
      if (typeof value === 'boolean') {
        newState[action.data.prop] = value;
      }
      else if (value !== '') {
        newState[action.data.prop] = parseInt(action.data.value);
      }
      return newState;
    case 'event':
      newState.event = action.value;
      return newState;
    default:
      return state;
  }
}
