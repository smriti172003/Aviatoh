import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { showPage } from "../App";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../db";
import { useParams } from "react-router-dom";
import { SearchLoader } from "./Loaders";

function TextEditor(props) {
  const { initialContent, onSave, onChange, setDataToBeSaved, disabled, email, isCollection } = props;
  const editorRef = useRef(null);

  const { pathTitle } = useParams();

  const [ editorLoading, setEditorLoading ] = useState(true);

  const log = (e) => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      onSave(editorRef.current.getContent());
    }
  };

  useEffect(() => {
    setTimeout(() => {
      showPage();
    }, 0);
  });

  return ( 
    <div align="right" style={{ marginTop: "0px", position: 'relative' }}>
      <input style={{position: 'absolute', display: 'none'}}
      onChange={(e)=>{
        document.querySelector('[type="url"]').value = 'loading...';
        const imgIdInStorage = `topicinline/${email}/${new Date().toString().replaceAll(' ', '')}.jpg`
        const mountainImagesRef = ref(storage, imgIdInStorage);
        uploadBytes(mountainImagesRef, e.target.files[0]).then((snapshot) => {
          console.log(snapshot);
          console.log('Uploaded a blob or file!');
          getDownloadURL(ref(storage, imgIdInStorage))
          .then((url) => {
            // `url` is the download URL for 'images/stars.jpg'
            console.log(url);

            document.querySelector('[type="url"]').value = url;
            e.target.value = null;
            document.querySelector('#form-field_2162870596771679733597765').value = '120';
            document.querySelector('#form-field_3972544796781679733597765').value = '120';
            e.target.value = null;
             
          })
          .catch((error) => {
            // toaster(0, error);
          });
        });
        console.log(e.target.files[0])
      }}
      id="imgUpload" type="file"/>
      {!disabled &&  

<grammarly-editor-plugin>
      <Editor
        disabled={disabled}
        apiKey="your-api-key"
        onInit={(evt, editor) => {
          editor.on('paste cut', function() {
            this.setDirty(true); // this updates the editor.undoManager
         });
         
          setEditorLoading(false);
          setTimeout(() => {
            const uploadImageElement = document.querySelector('[aria-label="Insert/edit image"]');
            uploadImageElement.addEventListener('click', () => {
            document.querySelector('#imgUpload').click();
          }); 
          }, 300);

          return editorRef.current = editor}}
        initialValue={initialContent !== "" ? initialContent : '<p><i style="color: silver;">type here ...</i></p>'}
        onKeyUp={() => {
          onChange();
          setDataToBeSaved(editorRef?.current?.getContent());
        }}
        onChange={()=>{
          onChange();
          setDataToBeSaved(editorRef?.current?.getContent());
        }}
        onPaste={(e)=>{
          onChange();
          setDataToBeSaved(editorRef?.current?.getContent());
        }}
        init={{
          height: '88vh',
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help", 
          ],
          toolbar:
            "blocks | " +
            "bold italic forecolor backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist | " +
            "table | image | link ",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; borderRadius: 0px;}",
        }}
      />
       </grammarly-editor-plugin>}

      {disabled && isCollection && <div style={{height:'60vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <h1 style={{border: '0px', color: 'grey'}}>Add a document to this collection</h1>
        </div>}
      {!isCollection && disabled && <SearchLoader />}
    </div> 
  );
}

export default TextEditor;
