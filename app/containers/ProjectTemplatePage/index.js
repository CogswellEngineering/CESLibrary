import React, { Component} from 'react';
import { createStructuredSelector} from 'reselect';
import { connect} from 'react-redux';
import { compose} from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import {

    templateLoaded,
    newPage,
    downloadClicked,
} from './actions';

import {

    makeSelectPage,
    makeSelectPages,
    makeSelectTemplateInfo,

} from './selectors';

import {
    PROJECT_TEMPLATE_PATH
} from 'components/Header/pages';

import {
    makeSelectFirebase
} from 'containers/App/selectors';

import { ProjectTemplateWrapper} from 'components/ProjectTemplatePage';


//So this could be component, cause really just passing in values into it
//In my case passing query parameters though, or url parameters rather.
//Then those parameters are used to pull correct information data base, not listener
//just a get. Regardless if picture  or not like need to knows, will still be pulling so is container.

class ProjectTemplatePage extends Component{


    componentDidMount(){

        const firestoreRef = this.props.firebase.firestore();

        //Loading template information.
        
        //Get url param for template id.
        const templateID = this.props.match.params.templateID;

        console.log("temaplate id", templateID);

        const templateDocRef = firestoreRef.collection("Library").doc("Paths").collection("ProjectTemplates").doc(templateID);


        templateDocRef.get()
            .then(docSnapshot => {

                
                if (docSnapshot.exists){

                    console.log("snapshot data", docSnapshot.data());

                    //Dispatches loading template
                    this.props.onLoadTemplate(docSnapshot.data());

                }

            })

    }


    render(){

       if (this.props.templateInfo.isEmpty){
           
            return null;
       }

       const { templateInfo, pages, currentPage} = this.props;
       const { title, description, instructions, benefits, download } = templateInfo;

       //I forgot flow I had in mind, yay distractions.
       //Don't think need saga, cause don't care bout yielding for download
       //oh wait, updating amount of downloads maybe?

       return ( <ProjectTemplateWrapper>

           

        </ProjectTemplateWrapper>
       )



    }




}


const mapStateToProps = createStructuredSelector({

    firebase: makeSelectFirebase(),
    currentPage: makeSelectPage(),
    pages: makeSelectPages(),
    templateInfo: makeSelectTemplateInfo(),

});

function mapDispatchToProps(dispatch){


    return {

        onLoadTemplate : (templateInfo) => {
            
            return dispatch(templateLoaded(templateInfo));
        },

        onPageTurn : (page) => {

            return dispatch(newPage(page));
        },

        onDownload : (url) => {

            return dispatch(downloadClicked(url));
        },
    };

}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer( {key: PROJECT_TEMPLATE_PATH, reducer});
const withSaga = injectSaga( {key: PROJECT_TEMPLATE_PATH, saga});

export default compose(

    withConnect,
    withReducer,
    withSaga,
)(ProjectTemplatePage);
