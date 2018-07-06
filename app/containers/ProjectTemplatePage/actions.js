import {

    TEMPLATE_LOADED,
    NEW_PAGE,
    DOWNLOAD_CLICKED,
} from './constants';



function templateLoaded(templateInfo){


    return {

        type: TEMPLATE_LOADED,
        templateInfo,
    };
}

function newPage(page){

    return {

        type: NEW_PAGE,
        page,
    };
}

function downloadClicked(file){

    return {
        
        type: DOWNLOAD_CLICKED,
        file,
    };
}

export{

    templateLoaded,
    newPage,
    downloadClicked,
}
