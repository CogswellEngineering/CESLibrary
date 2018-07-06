import {

    LOADED_TABS,
    NEW_TAB,
    NEW_PAGE,
    LOAD_ENTRIES,
    LOADED_ENTRIES,
    UPDATE_FILTER,
} from './constants';



function updateFilter(filter) {

    return {
        type: UPDATE_FILTER,
        filter,
    };

}

function loadedTabs(tabs){

    return {
        type: LOADED_TABS,
        tabs,
    };
}

function loadedEntries(entries){

   return {    
       type: LOADED_ENTRIES,
       entries,
   }
}

//After new tab is set to current tab
function loadEntries(tab){

    
    return {
        //This flow feels more like a saga.
        //Can I have a saga have the listener?
        //Well no, cause it won't have ability to yield put due to closure.
        type: LOAD_ENTRIES,
        tab,

    }
}

//New tab pressed -> current tab overwritten so it's highlighted now -> dispatch load entries with new tab as argument 
//-> show loading spinner ->  entries loaded show entries for that tab.
function newTab(tab){

    return {
        type: NEW_TAB,
        tab,
    }
}

function newPage(page){

    return {
        type: NEW_PAGE,
        page,
    }
}

export{

    loadedTabs,
    updateFilter,
    newTab,
    loadedEntries,
    newPage,
}