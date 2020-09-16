import React, {ChangeEvent, useEffect, useState} from 'react';
import firebase from './Firebase'

const ImageUploader : React.FC = () => {

    const [imgSrc, setImgSrc] = useState<string>('');
    const [uploadFile , setUploadFile] = useState<any>()

    useEffect(() => {
        const ref = firebase.storage().ref();
        const downloadRef = ref.child("a.jpg");
        downloadRef.getDownloadURL().then((url) => {
                setImgSrc(url)
                console.log(url)}
            )
    })

    const handleChangeFile = (e : ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        const target = e.target as HTMLInputElement;
        const files : FileList = (target.files as FileList);
        var file : File = files[0];
        const reader : FileReader = new FileReader();

        const item = URL.createObjectURL(file);
        setImgSrc(item);
        setUploadFile(file);
    };

    const sendItem = () => {
        const ref = firebase.storage().ref();
        const uploadRef = ref.child("a.jpg");
        uploadRef.put(uploadFile).then((snapshot) => {
            uploadRef.getDownloadURL()
                .then((url) => console.log(url))
                .catch((err)=>{console.log(err)})
        })
    };

    return (
        <div>
            <input type={'file'} accept={'image/*'} onChange={(e) => handleChangeFile(e)}/>
            <img src={imgSrc}/>
            <button type="button" onClick={() => sendItem()}>投稿する</button>
        </div>
    );
};

export default ImageUploader;