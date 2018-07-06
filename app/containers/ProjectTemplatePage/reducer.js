import { fromJS} from 'immutable';

import {

    TEMPLATE_LOADED,
    NEW_PAGE,
} from './constants';

const initialState = fromJS({

    //Honestly even this could be within pages lol. Or pages could be array within firestore anyway.
    templateInfo: {,
        isEmpty:true,
        title:"",
        instructions:[],
        benefits:[],
        download:"",
    },
    currentPage:1,

    //Pages array, basically containing content for page.
    pages:[],
    //Need to think more about what example will have, this should be fine though.
    //Honestly example could just be within pages
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
            return state
                .set("templateInfo", action.templateInfo.metaData)
                .set("pages", action.templateInfo.pages);

        //Maybe instead of page just scrolling?
        case NEW_PAGE:

            return state
                .set("currentPage", action.page);

        default:

            return state;
    }

}

export default projectTemplateReducer;