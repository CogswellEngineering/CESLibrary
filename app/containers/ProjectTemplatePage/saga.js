import { takeLatest, put, call} from 'redux-saga/effects';
import { DOWNLOAD_CLICKED} from './constants';
import request from 'utils/request';
var fileDownload = require('js-file-download');



function* downloadTemplateSaga(action){

    const file = action.file;
    console.log("downloading");

    try{
     

        //Okay, this works. Prefer not for it to open and shit, but again could've just called to storage and do that too.
        //but this is fine.
        window.open(file.url);

    //console.log("response",response);

    //Just creates url, so I do need to get it.
    //Hingsight I could have a reference to the file in storage, then reference that and use firebase download
    //but I should know how to do this as well.
  //  fileDownload(file.url,file.template);
    }
    catch(err){
        console.log(err);
    }
  
}

export default function* projectTemplateWatcher(){

    yield takeLatest(DOWNLOAD_CLICKED, downloadTemplateSaga );

}
