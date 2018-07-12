
import {

    CONCENTRATION_SELECTED,
    LOADED_CONTENT,
    CONCENTRATIONS_LOADED,
} from './constants';


function concentrationsLoaded(concentrations){

    return {

        type: CONCENTRATIONS_LOADED,
        concentrations,
    }
}

function concentrationSelected(concentration){

    return {

        type: CONCENTRATION_SELECTED,
        concentration,
    };

}
//This is to update listener
//Could pass in filter here but passed in as prop already so not neccessarry
function loadedContent(content){


    return {
        type: LOADED_CONTENT,
        content,
    };
}

export {

    concentrationSelected,
    loadedContent,
    concentrationsLoaded,
};