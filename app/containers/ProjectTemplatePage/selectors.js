import { createSelector} from 'reselect';
import {
    PROJECT_TEMPLATE_PATH
} from 'components/Header/pages';


const selectProjectTemplate = (state) => state.get(PROJECT_TEMPLATE_PATH);

const makeSelectDownload = () => createSelector(


    selectProjectTemplate,
    (projectTemplateState) => {

        if (projectTemplateState == null) {
            
            return null
        };


        console.log("get here");
        return projectTemplateState.get("download");
    }
)
const makeSelectPage = () => createSelector(

    selectProjectTemplate,
    (projectTemplateState) => {

        if (projectTemplateState == null){

            return 1;
        }

        return projectTemplateState.get("currentPage");
    }

);

const makeSelectPages = () => createSelector(


    selectProjectTemplate,
    (projectTemplateState) => {

        if (projectTemplateState == null){
            return [];
        }

        return projectTemplateState.get("pages");

    }

)

const makeSelectTemplateInfo = () => createSelector(


    selectProjectTemplate,
    (projectTemplateState) => {

        if (projectTemplateState == null){

            return {
                isEmpty: true,
            };
        }

        return projectTemplateState.get("templateInfo");
    }

);

export{

    makeSelectPage,
    makeSelectPages,
    makeSelectTemplateInfo,
    makeSelectDownload,
};

