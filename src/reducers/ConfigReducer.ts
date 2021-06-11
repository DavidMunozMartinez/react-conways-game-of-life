interface Config {
    x: number,
    y: number,
    speed: number,
    event?: any
};

const defaultState: Config = {
    x: 40,
    y: 40,
    speed: 300,
    event: 'none'
};

export const configReducer = (state: Config = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'update':
            let value = parseInt(action.data.value);
            if (isNaN(value)) {
                value = 0;
            }
            newState[action.data.prop] = value;
            return newState;
        case 'event':
            newState.event = action.value;
            return newState;
        default:
            return state;
    }
}
