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
    makeSelectDownload,

} from './selectors';

import {
    PROJECT_TEMPLATE_PATH
} from 'components/Header/pages';

import {
    makeSelectFirebase
} from 'containers/App/selectors';

import { ProjectTemplateWrapper} from 'components/StyledComponents/ProjectTemplatePage';


//So this could be component, cause really just passing in values into it
//In my case passing query parameters though, or url parameters rather.
//Then those parameters are used to pull correct information data base, not listener
//just a get. Regardless if picture  or not like need to knows, will still be pulling so is container.

class ProjectTemplatePage extends Component{


    componentWillMount(){

        console.log("I am here");
    }


    componentDidMount(){

        console.log("hello")

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
           
        console.log("hello render");
            return null;
       }

       const { templateInfo, download, pages, currentPage,
        onDownload, onPageTurn,} = this.props;
        console.log("props in template page", this.props);
       const { title, description, instructions, benefits } = templateInfo;
       console.log("template info", templateInfo);
       console.log("download",download);

       //I forgot flow I had in mind, yay distractions.
       //Don't think need saga, cause don't care bout yielding for download
       //oh wait, updating amount of downloads maybe?
       //Just need to test download, layou of everything not as important.

       return ( <ProjectTemplateWrapper>

           <h1> {title} </h1>

           <p> {description} </p>

           <button onClick = {() => {onDownload(download);}}> Download </button>

        </ProjectTemplateWrapper>
       )



    }




}


const mapStateToProps = createStructuredSelector({

    firebase: makeSelectFirebase(),
    currentPage: makeSelectPage(),
    pages: makeSelectPages(),
    templateInfo: makeSelectTemplateInfo(),
    download: makeSelectDownload(),

});

function mapDispatchToProps(dispatch){


    return {

        onLoadTemplate : (templateInfo) => {
            
            return dispatch(templateLoaded(templateInfo));
        },

        onPageTurn : (page) => {

            return dispatch(newPage(page));
        },

        onDownload : (file) => {
            console.log("dispatching to download", file);
            return dispatch(downloadClicked(file));
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
