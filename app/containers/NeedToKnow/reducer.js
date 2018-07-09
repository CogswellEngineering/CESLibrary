import { fromJS} from 'immutable';
import {

    LOADED_NEED_TO_KNOW,
    OPEN_POPOVER,
    CLOSE_POPOVER,

} from './constants';


const initialState = fromJS({

    content:null,
    //0 for meaning none open.
    pageOpen: -1,


});

export default function needToKnowReducer(state = initialState, action){

    switch (action.type){

        case LOADED_NEED_TO_KNOW:

            return state
                .set("content", action.content);

        case OPEN_POPOVER:

            return state
                .set("pageOpen", action.page);

        case CLOSE_POPOVER:

            return state
                .set("pageOpen",-1);
        
        default:

            return state;

            
    }

}

