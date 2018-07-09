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


import {

    NeedToKnowWrapper,
    ContentWrapper,
    ContentTitle,
    ContentBullets,
    ContentBullet,
    ContentLinksWrapper,
    ContentLink,
    ContentCloseButton,
    PageButtons,
    PageButton,

} from 'components/StyledComponents/NeedToknow';

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


                if (snapshot.exists){

                    //Dispatches content loaded.
                    console.log("snapshot",snapshot.data());

                    this.props.onContentLoaded(snapshot.data());
                }

            })
            .catch (err => {
                
                console.log("error",err);
            })



    }

    render(){

        const { content, pageOpen,
            onPopOverOpen, onPopOverClose} = this.props;
        
        if (content == null){

            console.log("loading content");

            return null;
        }

        const openContent = content.pages[pageOpen];

        //Setting up the page buttons

        var pageButtons = [];
        for (var i = 0; i < content.pages.length; ++i){

            console.log(" i is", i);
            const title = content.pages[i].title;
            pageButtons.push(<PageButton key={index}  onClick = {(evt) => {onPopOverOpen(evt);}}> {title} </PageButton>)
        }

        return  (<NeedToKnowWrapper>

            <PageButtons>

                {pageButtons.map(pageButton => {
                    return pageButton;
                })}

            </PageButtons>

            <ContentWrapper>
                
                <ContentTitle> {openContent.title} </ContentTitle>

                <ContentBullets >
                    {openContent.bullets.map(bullet => {

                        return <ContentBullet> {bullet} </ContentBullet>
                    })}
                 
                </ContentBullets>

                <ContentLinksWrapper> 
                    {openContent.links.map(link => {

                        return <ContentLink to={link.url}> {link.name} </ContentLink>
                            
                        })   
                    }

                </ContentLinksWrapper>

                <ContentCloseButton onClick = {() => {onPopOverClose();}}> Close{/*Image that is an x*/} </ContentCloseButton>

            </ContentWrapper>



        </NeedToKnowWrapper>)

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

        onPopOverOpen : (evt) => {

            const target = evt.target;


            const page = target.key;
            console.log("key of target was", page);

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