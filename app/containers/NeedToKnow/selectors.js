import { createSelector} from 'reselect';
import { PAGE_TITLE} from './constants';

const selectNeedToKnow = (state) => state.get(PAGE_TITLE);


const makeSelectContent = () => createSelector(


    selectNeedToKnow,
    (needToKnowState) => {

        if (needToKnowState == null){
            return null;
        }

        return needToKnowState.get("content");
        
    }


);

const makeSelectPageOpened = () => createSelector(

    selectNeedToKnow,
    (needToKnowState) => {

        if (needToKnowState == null){
            return 0;
        }

        return needToKnowState.get("pageOpen");
        
    }
)

export{

    makeSelectContent,
    makeSelectPageOpened,
};