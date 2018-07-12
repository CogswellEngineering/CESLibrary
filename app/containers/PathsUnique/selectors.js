import { createSelector} from 'react';

const selectUniquePaths = (state) => state.get("UniquePaths");

const makeSelectConcentrations = () => {

    selectUniquePaths,
    (uniquePathState) => {

        if (uniquePathState == null){
            return null;
        }
        
        return  uniquePathState.get("concentrations");
    }
}

const makeSelectConcentration = () => {

    selectUniquePaths,
    (uniquePathState) => {

        if (uniquePathState == null){

            return null;
        }

        return uniquePathState.get("concentration");
    }
};

const makeSelectContent = () => {

    selectUniquePaths,
    (uniquePathState) => {

        if (uniquePathState == null){
            return [];
        }

        return uniquePathState.get("content");
    }
}

export{

    makeSelectConcentration,
    ,
    makeSelectContent,
};