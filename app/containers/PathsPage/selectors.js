import { createSelector} from 'reselect';
import { PATHS_PATH} from 'components/Header/pages';

const selectPaths = (state) => {state.get(PATHS_PATH);}


const makeSelectPage = createSelector(

    selectPaths,
    (pathsState) => {

        if (pathsState == null){

            return 1;
        }

        return pathsState.get("currentPage");
    }

);

//Actually instead of null, current tab could be number
const makeSelectTab = createSelector(

    selectPaths,
    (pathsState) => {

        if (pathsState == null){

            //Or could make it tab I know for sure will be in and first
            //but then they'll need to chage this.
            return null;
        }

        return pathsState.get("currentTab");
    }

);

//Actually instead of null, current tab could be number
const makeSelectTabs = createSelector(

    selectPaths,
    (pathsState) => {

        //This is always weird.
        //Cause tabs loaded in, but still need to explicility make the content.
        //Actually since importing pictures for this, it don't actually matter.
        //Infact, might actually store entries as an object.
        //Still only one listener at a time, but will cache past stuff listened to.

        if (pathsState == null){

            //Or could make it tab I know for sure will be in and first
            //but then they'll need to chage this.
            return [];
        }

        return pathsState.get("tabs");
    }

);

//Actually instead of null, current tab could be number
const makeSelectEntries = createSelector(

    selectPaths,
    (pathsState) => {

        if (pathsState == null){

            //Or could make it tab I know for sure will be in and first
            //but then they'll need to chage this.
            return null;
        }

        return pathsState.get("entries");
    }

);

//Actually instead of null, current tab could be number
const makeSelectNewTabPressed = createSelector(

    selectPaths,
    (pathsState) => {

        if (pathsState == null){

            //Or could make it tab I know for sure will be in and first
            //but then they'll need to chage this.
            return true;
        }

        return pathsState.get("newTabPressed");
    }

);


export{

    makeSelectPage,
    makeSelectTab,
    makeSelectTabs,
    makeSelectEntries,
    makeSelectNewTabPressed,
}