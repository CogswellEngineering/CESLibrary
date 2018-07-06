import React, { Component } from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { Tabs, TabContent } from 'react-tabs-redux';

import { createStructuredSelector } from 'reselect';
import { compose} from 'redux';
import { connect} from 'react-redux';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

import isEmpty from 'utils/isEmptyObject';

import {

  //Why is it tripping on this?
    PathPageWrapper,
    StyledTabLink,

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
import { PATHS_PATH} from 'components/Header/pages';


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

            
            this.unsubscribe = entriesRef.onSnapshot( options, docsSnapshot => {

                    const docs = docsSnapshot.docs;

                    //Honestly, with way I'm doing it, not fully utilizing tab content feature
                    //though guess could say using it creatively.
                    var entries = { [this.props.currentTab] : []};

                    for (const index in docs){

                        const doc = docs[index];

                        if (doc.exists){


                            if (!isEmpty(doc.data())){                                
                                entries[this.props.currentTab].push(doc.data());
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
        
        for (const index in tabs){
            console.log("tab", tabs[index]);
            tabLinks.push(<StyledTabLink to={tabs[index]} key={tabs[index]} > {tabs[index]} </StyledTabLink>);
        }

        return (<PathPageWrapper>

           
            <Tabs  name="tabs1" selectedTab = {currentTab}
                handleSelect = { (selectedTab, namespace) => {

                    console.log("selected tab is", selectedTab);
                    onNewTab(selectedTab);
                }}
            >
             
               {tabLinks.map( tabLink => {
                   return  tabLink;
               })}
                
                <TabContent for = {currentTab}>
                    
                    {  entries != null && entries[currentTab] != null && entries[currentTab].length > 0? entries[currentTab].map( entry => {

                        //So all this is download url to image and then spreads it.
                        //Basically just swapping this element.
                        return <div key={entry} ></div>
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