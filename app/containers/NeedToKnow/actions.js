
import {

    LOADED_NEED_TO_KNOW,
    OPEN_POPOVER,
    CLOSE_POPOVER,

} from './constants';

//The content will be every specific page in an array, that will make paging much easier too.
function loadedNeedToKnow(content){

    return {

        type: LOADED_NEED_TO_KNOW,
        content,
    };
    
}

//page being specific tab they clicked.
function openPopover(page){

    return {
        
        type: OPEN_POPOVER,
        page,
    };
}

function closePopover(){

    return {

        type: CLOSE_POPOVER,
    };

}

export{

    loadedNeedToKnow,
    openPopover,
    closePopover,
}