import React, { Component } from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';

import { createStructuredSelector } from 'reselect';
import { compose} from 'redux';
import { connect} from 'react-redux';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

import {

    PathPageWrapper
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
    }

    componentDidMount(){

        //Pull all the tabs.

        const firebaseRef = this.props.firebase;

        firebaseRef.firestore().collection("Library").doc("Paths").get( snapshot => {

            if (snapshot.exists){

                console.log("snapshot data", snapshot.data());
                this.props.onTabsLoaded(snapshot.get("tabs"));
            }

        });
        
    }

    componentDidUpdate(){

        const firebaseRef = this.props.firebase;

        //If new tab was pressed then unsubscribe and set up new listener based on new tab.
        if (this.props.newTabPressed && this.props.currentTab != null){

            this.unsubscribe();
            const entriesRef = firebaseRef.firestore().collection("Library").doc("Paths").collection(this.props.currentTab);
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
                            console.log("entry data", doc.data());
                            entries[this.props.currentTab].push(doc.data());
                        }
                    }

                    //So this basically makes it so it's a dictionary, with only a single key just so I can make it work lol.
                    this.props.onLoadEntries(entries);

            })
        }

    }


    render(){

        const {entries, currentPage, currentTab, tabs} = this.props;

        if (entries == null){
            return null;
        }

        return (<PathPageWrapper>

            <Tabs>




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

            return dispatch(loadedEntries());
        },
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key : PATHS_PATH, reducer});

export default compose(

    withConnect,
    withReducer,
)(PathsPage);