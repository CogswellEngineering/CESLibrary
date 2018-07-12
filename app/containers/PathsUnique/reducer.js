import { fromJS} from 'immutable';

import {

    CONCENTRATION_SELECTED,
    LOADED_CONTENT,
    CONCENTRATIONS_LOADED,
    //This isn't needed, cause would be if had prperty in state just for knowing to load content
    //but that's when concentration is different from what was before, I can get to prev fucking props
    //Got used to this shit, I forgot that was a thing.

} from './constants';


const initialState = fromJS({

    content:null,
    //Key to map to specific content, in need to know case, it would be concentration, just naming that for brevity.
    concentration:null,

    concentrations:[],


});


export default uniquePathReducer( state = initialState, action){


    switch (action.type){

        case CONCENTRATIONS_LOADED:

            return state
                .set("concentrations",action.concentrations);

        case LOADED_CONTENT:

            return state
                .set("content", action.content);

        case CONCENTRATION_SELECTED:

            return state
                .set("concentration", concentration);
                

        default: 
            
            return state;





    }

}