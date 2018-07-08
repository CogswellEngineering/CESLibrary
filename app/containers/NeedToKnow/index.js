import React, { Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { PAGE_TITLE} from './constants';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

import {

    makeSelectContent,
    makeSelectPageOpened,
} from './selectors';

import { makeSelectFirebase} from 'containers/App/selectors';

import {

    loadedNeedToKnow,
    openPopover,
    closePopover,
} from './actions';

//This isn't going to be a page, but a container on page.
//Will have popover, I'll probably take in functionality for react-strap, unless just get specifically it.
//This will recieve prop for specific need to know to load
class NeedToKnow extends Component{

    componentDidMount(){

        const needToKnowId = this.props.id;

        const needToKnowsRef = this.props.firebase.firestore().collection("Library").doc("Paths").collection("NeedToKnows");

        //Then send get request to specific doc.

        needToKnowsRef.doc(needToKnowId).get()
            .then (snapshot => {

                console.log("snapshot",snapshot);

                if (snapshot.exists){

                }

            })
            .catch (err => {
                
                console.log("error",err);
            })



    }

    render(){

        return null;

    }

}

//Might do the prop types for required, but for now is fine.


const mapStateToProps = createStructuredSelector({

    firebase: makeSelectFirebase(),
    content : makeSelectContent(),
    pageOpen : makeSelectPageOpened();

});

function mapDispatchToProps(dispatch){

    return {

        onContentLoaded : (content) => {

            return dispatch(loadedNeedToKnow(content));
        },

        onPopOverOpen : (page) => {

            return dispatch(openPopover(page));
        },

        onPopOverClose : () => {

            return dispatch(closePopover());
        }


    }

}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key : PAGE_TITLE, reducer});

export default compose(

    withConnect,
    withReducer,

)(NeedToKnow);