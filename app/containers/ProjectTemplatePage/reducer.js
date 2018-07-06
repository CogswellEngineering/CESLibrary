import { fromJS} from 'immutable';

import {

    TEMPLATE_LOADED,
    NEW_PAGE,
} from './constants';

const initialState = fromJS({

    title:"",
    instructions:[],
    benefits:[],
    downloadURL:"",
    currentPage:1,

    //Pages array, basically containing content for page.
    pages:[],
    //Need to think more about what example will have, this should be fine though.
    example:{
        exampleTitle:"",
        exampleDescription:"",
        examplePictures:[]
    },
    //As they go through it, use example?
});

function projectTemplateReducer( state = initialState, action){

    switch (action.type){

        case TEMPLATE_LOADED:

            console.log("template", action.templateInfo);
            const {title, instructions, benefits, downloadURL, example } = action.templateInfo;
            return state
                .set("title", title)
                .set("instructions", instructions)
                .set("benefits", benefits)
                .set("downloadURL", downloadURL)
                .set("example", example);

        //Maybe instead of page just scrolling?
        case NEW_PAGE:

            return state
                .set("currentPage", action.page);

        default:

            return state;
    }

}

export default projectTemplateReducer;