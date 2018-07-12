import React, { Component } from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { Link} from 'react-router-dom';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';

import { createStructuredSelector } from 'reselect';
import { compose} from 'redux';
import { connect} from 'react-redux';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

import isEmpty from 'utils/isEmptyObject';

import {

    PathPageWrapper,
    StyledTabLink,
    TabLinkWrapper,
    FilterWrapper,
    FilterItem,

} from 'components/StyledComponents/PathsPage/';

import {

    loadedTabs,
    updateFilter,
    newTab,
    loadedEntries,
    newPage,
} from './actions';

import{
    makeSelectPage,
    makeSelectTab,
    makeSelectTabs,
    makeSelectEntries,
    makeSelectNewTabPressed,
} from './selectors';

import {
    makeSelectFirebase
} from 'containers/App/selectors';
import { PATHS_PATH, PROJECT_TEMPLATE_PATH} from 'components/Header/pages';

import PathsUnique from 'containers/PathsUnique';

class PathsPage extends Component{


    constructor(props){

        super(props);
        this.unsubscribe = null;
        console.log("props from pathspage",props);

    }

    componentDidMount(){

        //Pull all the tabs.

        const firebaseRef = this.props.firebase;
        const docRef = firebaseRef.firestore().collection("Library").doc("Paths");
        console.log("doc ref", docRef);
        docRef.get()
            .then (snapshot => {


            if (snapshot.exists){
                
                this.props.onTabsLoaded(snapshot.get("tabs"));
            }

        })
        .catch(err => {
            console.log(err);
        })
        
    }

    componentDidUpdate(){

        const firebaseRef = this.props.firebase;

        //If new tab was pressed then unsubscribe and set up new listener based on new tab.
        if (this.props.newTabPressed && this.props.currentTab != null){

            //If had listener, stop listening.
            if (this.unsubscribe){
                this.unsubscribe();
            }
            console.log("current tab is", this.props.currentTab);

            const collection = this.props.currentTab.replace(" ","");
            const entriesRef = firebaseRef.firestore().collection("Library").doc("Paths").collection(collection);
            const options = {
                includeMetadataChanges: true,
            };

            
            //This needs to change to contain query, of filter. Will first work on just making sure selection is correct
            //then will implement into this.
            //Wrote down process in reducer.
            this.unsubscribe = entriesRef.onSnapshot( options, docsSnapshot => {

                    const docs = docsSnapshot.docs;

                    //Honestly, with way I'm doing it, not fully utilizing tab content feature
                    //though guess could say using it creatively.
                    var entries = { [this.props.currentTab] : []};

                    for (const index in docs){

                        const doc = docs[index];

                        if (doc.exists){



                            if (!isEmpty(doc.data())){         
                                console.log("doc", doc);                  
                                //Just storing id, for link, and prob name and poster for it.     
                                entries[this.props.currentTab].push({id:doc.id, title: doc.data().metaData.title});
                            }
                        }
                    }

                    //So this basically makes it so it's a dictionary, with only a single key just so I can make it work lol.
                    this.props.onLoadEntries(entries);

            })
        }

    }


    render(){


        const {entries, currentPage, currentTab, tabs,
            onNewTab, onNewPage, onUpdateFilter} = this.props;

        console.log("Paths props", this.props);

       

        if (entries == null){
            return null;
        }

        //Initializes the tab links, because it throws displayname errors if map and create within the map
        var tabLinks = [];
        
        //This way worked before, yet now doesn't?
        for (const index in tabs){
            console.log("tab", tabs[index]);
            //Okay, styledTablinks no work, so just need to encase it isntead.
            tabLinks.push(<StyledTabLink key={tabs[index]}><TabLink to={tabs[index]}  > {tabs[index]} </TabLink></StyledTabLink>);
        }

        return (<PathPageWrapper>


           
            <Tabs  name="tabs1" selectedTab = {currentTab}
                handleSelect = { (selectedTab, namespace) => {

                    console.log("selected tab is", selectedTab);
                    onNewTab(selectedTab);
                }}
            >
             
             <TabLinkWrapper>
             {tabLinks.map( tabLink => {
                   return  tabLink;
               })}
                
            </TabLinkWrapper>

                <FilterWrapper>
                    {/* I could hardcode the filters, or could also pull them, no listener just single get on mount though*/}
                    {/* whats rendered here depends on the tab, in the dispatch on update filter, might pass in current tab too
                    though not needed, cause just get from passed in state actually.*/}

                    {/* Honestly makes pulling tabs feel pretty pointless lol. Cause other special cases like these will have to add an or
                    I could add something to object so it has the id, aka what will be shown on tab. But could also have unique flag meaning
                    unique per concentration, can think of better name later*/}
                    {currentTab.unique? 
                    //If unique then render the buttons to show need to knows for pressed button
                        <PathsUnique/>
                        :
                            //Otherwise render the dropdown of checkboxes
                            //Is this container doing too much? Can I break this into two parts?
                            //Instead of styled components, I could just mke Paths have sub container
                            //that renders depending on kind of tab, so will still have this property
                            //but then there's that kind of container for unique, which has buttons and rest of page
                            // is for content
                            //otherwise shows the browse results that match filter.
                            null
                    }
                </FilterWrapper>
                

                {/* Tab content will be replaced with PathsDistinct and PathsPage, and each will have own entries variable
                    Code have here will be placed in PathsGeneral, the same tabcontent logic actually good for unique paths.*/}
                <TabContent for = {currentTab}>
                    
                    {  entries != null && entries[currentTab] != null && entries[currentTab].length > 0? entries[currentTab].map( entry => {

                        //So all this is download url to image and then spreads it.
                        //Basically just swapping this element. Will also have link with url to actual content
                        const url = PROJECT_TEMPLATE_PATH.replace(":templateID",entry.id);
                        return <div key={entry}> <Link to={url}> {entry.title} </Link> </div>
                }) : <p> No content </p> 
            }
                </TabContent>
            </Tabs>

            </PathPageWrapper>
        )
    }


}

const mapStateToProps = createStructuredSelector({


    firebase : makeSelectFirebase(),
    currentPage : makeSelectPage(),
    currentTab : makeSelectTab(),
    entries :  makeSelectEntries(),
    tabs : makeSelectTabs(),
    newTabPressed : makeSelectNewTabPressed(),
})

function mapDispatchToProps(dispatch){


    return {

        onNewPage : (page) => {

            return dispatch(newPage(page));
        },

        onNewTab : (tab) => {
            
            return dispatch(newTab(tab));
        },

        onTabsLoaded : (tabs) => {

            return dispatch(loadedTabs(tabs));
        },

        onUpdateFilter : (filter) => {

            return dispatch(updateFilter(filter));
        },

        onLoadEntries : (entries) => {

            return dispatch(loadedEntries(entries));
        },
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key : PATHS_PATH, reducer});

export default compose(

    withConnect,
    withReducer,
)(PathsPage);