import React, { Component} from 'react';
import { createStructuredSelector} from 'reselect';
import { connect} from 'react-redux';
import { compose} from 'redux';

import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import {
    makeSelectFirebase
} from 'containers/App/selectors';
//So this could be component, cause really just passing in values into it
//In my case passing query parameters though, or url parameters rather.
//Then those parameters are used to pull correct information data base, not listener
//just a get. Regardless if picture  or not like need to knows, will still be pulling so is container.

class ProjectTemplatePage extends Component{


    componentDidMount(){


    }




}


const mapStateToProps = createStructuredSelector({

    firebase: makeSelectFirebase(),

})
