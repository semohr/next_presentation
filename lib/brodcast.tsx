'use strict';
import { useEffect, useReducer, useState } from 'react';

// Strictly type the Broadcast channel to allow
// for type checking of the message

type Action<S> = { type: 'set'; state: S };

// Small hack to get typescript to infer the type of the state
const createReducer =
    <S,>() =>
    (state: S, action: Action<S>): S => {
        console.log('Executing', action.type);
        switch (action.type) {
            case 'set':
                return action.state;
            default:
                throw new Error('Unknown action');
        }
    };

/** Create Broadcast channel to share the
 * state between the two components/windows
 *  (see) https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel/BroadcastChannel
 */
export function useBroadcast<S>(name, initialState: S) {
    const [channel, setChannel] = useState<BroadcastChannel>();
    const reducer = createReducer<S>();
    let [state, dispatch] = useReducer(reducer, initialState);

    // This makes sure we always have only one channel
    useEffect(() => {
        const channel = new BroadcastChannel(name);
        channel.onmessage = (event: MessageEvent) => {
            event.preventDefault();
            dispatch(event.data);
        };
        setChannel(channel);
        return () => {
            channel.close();
        };
    }, [name]);

    // Function for the different actions
    function setState(value: S) {
        if (channel) {
            channel.postMessage({ type: 'set', state: value });
        } else {
            //timeout to make sure the channel is created
            setTimeout(() => {
                setState(value);
            }, 1000);
        }
        dispatch({ type: 'set', state: value });
    }

    return { state, setState };
}
