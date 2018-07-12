import { fromJS} from 'immutable';
import { LOADED_TABS, NEW_TAB, NEW_PAGE, UPDATE_FILTER, LOADED_ENTRIES } from './constants';


const initialState = fromJS({


    currentTab:null,
    //Default true,
    newTabPressed: true,
    //This will also be pulled before page is even rendered
    //this is getting all kinds of paths from storage.
    //Don't need to be event listener for this, just require refresh is fine.
    tabs:[],    

    //Filter, for what it should pull from it, ie: only project templates of this concentration.
    //how I actually do this might change, because depending on tab they're in the filter on listener
    //to firestore changes. NeedToKnow actually easy, literally listen to specific document chosen.
    //then okay, so can't have array, but can query properties of object
    //so for example they'll have property of gde:true, and if it's not there will be null so the == query won't go through.
    filter:{
     
        concentrations: [],

    },

    //How I render what's in entries will depend on the tab.
    //For now assume firebase set up, cause it's going to be same set up as printing service.

    //Content of entries is populated by event listener listening to database.
    //Entries is an object cached with tabs loaded in.
    entries: null,
    //I could keep cache of all previously pulled entries, because odds are if they were on the tab before
    //they might go back to it? Regardless it's just extending it, keep like this for now and see how it goes.
    currentPage:1,
    //This will change depending on tab.
    totalPages: 1,
    entryPerPage: 5,
})

function pathsReducer( state = initialState, action){


    switch (action.type){


        case UPDATE_FILTER:

            return state
                .set("filter", action.filter);

        case LOADED_ENTRIES:

            //Will assign by key in index as argument passed into reducer.
            //const entries = action.entries;

            console.log("new entries", action.entries);
            return state
                .set("entries", action.entries)
                .set("newTabPressed", false);

        case LOADED_TABS:

            console.log("loaded tabs", action.tabs);
            return state
                .set("tabs", action.tabs)
                .set("currentTab", action.tabs[0]);

        case NEW_TAB:

            
            return state   
                .set("currentTab", action.tab)
                .set("newTabPressed", true);

        case NEW_PAGE:

            return state
                .set("currentPage", action.page);

        default:

            return state;


    }
}

export default pathsReducer;