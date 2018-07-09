import styled from 'styled-components';
import { Link} from 'react-router-dom';

const NeedToKnowWrapper = styled.div`


`;

//Might do span
const ContentWrapper = styled.div`


`;

const ContentTitle = styled.p`


`

const ContentBullets = styled.ol`

`;

const ContentBullet = styled.li`

`;

//Wrapper around links to tutorials and project templates.
const ContentLinksWrapper = styled.div`

`;

const ContentLink = styled(Link)`

    margin-left:1%;

`;

const ContentCloseButton = styled.button`

`


//Might also be span
const PageButtons = styled.div`


`

const PageButton = styled.button`


`


export{

    NeedToKnowWrapper,
    ContentWrapper,
    ContentTitle,
    ContentLinksWrapper,
    ContentLink,
    ContentBullets,
    ContentBullet,
    ContentCloseButton,
    PageButtons,
    PageButton,

};