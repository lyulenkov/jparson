const localStorageKey = 'app-state';

type AppState = {
    darkTheme: boolean,
    zebraStriping: boolean,
    editorValue: string
};

const defaultState = {
    darkTheme: false,
    zebraStriping: true,
    editorValue: ''
};

const state: AppState = JSON.parse(window.localStorage.getItem(localStorageKey)) || defaultState;

const stateHandler = {
    set(state, prop, value) {
        if (!defaultState.hasOwnProperty(prop) || value instanceof Object) {
            throw new Error(`Undefined application state property '${prop}'.`);
        }
        if (value instanceof Object) {
            throw new Error(`Non-primitive application state property value.`);
        }
        Reflect.set(state, prop, value);
        window.localStorage.setItem(localStorageKey, JSON.stringify(state));
        return true;
    }
};

export const appState = new Proxy<AppState>(state, stateHandler);
