import React from "react";
import { useState,useRef,useEffect } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import shortid from "https://cdn.skypack.dev/shortid@2.2.16";
export default function FileUpload(props) 
{

    const [Files, SetFiles] = useState(props.files? props.files : []);

    /*
    if(props.files)
    {
        props.files.map((file)=>{
            let reader = new FileReader();
            reader.onloadend = () => {
                SetFiles((preValue) => {
                    return [
                        ...preValue,
                        {
                            id: shortid.generate(),
                            filename: file.name,
                            filetype:file.type,
                            fileimage: reader.result,
                            datetime: file.lastModifiedDate.toLocaleString('en-IN'),
                            filesize: filesizes(file.size)
                        }
                    ]
                });
            }

            if(file) {
                reader.readAsDataURL(file);
            }
        })
           
            
    }
    */
    const filesizes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const InputChange = (e) => {
        // --For Multiple File Input
        let images = [];
        for (let i = 0; i < e.target.files.length; i++) {
            images.push((e.target.files[i]));
            let reader = new FileReader();
            let file = e.target.files[i];
            console.log(e.target.files[i])
            reader.onloadend = () => {
              
                if(props.fileHandler)
                {
                    props.fileHandler((preValue) => {
                        return [
                            ...preValue,
                            {
                                id: shortid.generate(),
                                filename: e.target.files[i].name,
                                filetype: e.target.files[i].type,
                                fileimage: reader.result,
                                datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
                                filesize: filesizes(e.target.files[i].size),
                                status: "pending"
                            }
                        ]
                    });
                }
                SetFiles((preValue) => {
                    return [
                        ...preValue,
                        {
                            id: shortid.generate(),
                            filename: e.target.files[i].name,
                            filetype: e.target.files[i].type,
                            fileimage: reader.result,
                            datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
                            filesize: filesizes(e.target.files[i].size)
                        }
                    ]
                });
            }
            if (e.target.files[i]) {
                reader.readAsDataURL(file);
            }
        }
    }
    const DeleteFile = (id) => {
        if(window.confirm("Are you sure you want to delete this Image?")){
            const result = Files.filter((data)=>data.id !== id);
            SetFiles((prev) => result);
            if(props.fileHandler)
            {
                props.fileHandler((prev) => result)
            }
        }else{
           
        }
    }
   
    return(
        <div style={{ marginTop: "20px" }}>                        
                                        <div className="kb-file-upload">
                                            <div className="file-upload-box">
                                                <input type="file" id="fileupload" className="file-upload-input" onChange={InputChange} multiple />
                                                <span>Drag and drop or <span className="file-link">Choose your files</span></span>
                                            </div>
                                        </div>
                                                                            
                                    {Files.length > 0 ?
                                        <div className="kb-attach-box">
                                            <hr />
                                            {
                                                Files.map((data, index) => {
                                                    const { id, filename, filetype, fileimage, datetime, filesize } = data;
                                                    return (
                                                        <div className="file-atc-box" key={index}>
                                                            {
                                                                filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ?
                                                                    <div className="file-image"> <img src={fileimage} alt="" /></div> :
                                                                    <div className="file-image"><i className="far fa-file-alt"></i></div>
                                                            }
                                                            <div className="file-detail">
                                                                <h6>{filename}</h6>
                                                                <p><span>Size : {filesize}</span><span className="ml-3">Modified Time : {datetime}</span></p>
                                                                <div className="file-actions">
                                                                    <div className="file-action-btn" onClick={() => DeleteFile(id)}>Delete</div>
                                                                    <a href={fileimage}  className="file-action-btn" download={filename}>Download</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        : ''}
         </div>
       
    );
}