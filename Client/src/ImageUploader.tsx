import React, {ChangeEvent, useEffect, useState} from 'react';
import firebase from './Firebase'
import {createStyles, FormControl, InputLabel, MenuItem, Select, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

const ImageUploader : React.FC = () => {

    const [imgSrc, setImgSrc] = useState<string>(''); // firebaseの写真のソース
    const [uploadFile , setUploadFile] = useState<any>(); // firebaseクラウドに入れるデータ
    const [itemList ,setItemList] = useState<string[]>([]); // DropDownのItemList
    const [currentImg,setCurrentImg] = useState<string>('');

    useEffect(() => {
        updateStorageFileList();
    },[]);

    useEffect(() => {
        showImage()
    },[currentImg]);

    const updateStorageFileList = () => {
        const ref = firebase.storage().ref();
        ref.listAll()
            .then(
                (res) => {
                    let newItem : string[] = [];
                    res.items.forEach(
                        item =>{
                            newItem.push(item.name);
                        }
                    );
                    setItemList(newItem);
                });
    };

    const showImage = () => {
        if(currentImg === null || currentImg === '') return;

        const ref = firebase.storage().ref();
        const downloadRef = ref.child(currentImg);
        downloadRef.getDownloadURL().then((url) => {
            console.log(url);
            setImgSrc(url)}
        );
    };

    const handleChangeFile = (e : ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const file : File = (target.files as FileList)[0];
        const item = URL.createObjectURL(file); // 画像の一時的なパス
        setImgSrc(item); // 画像の一時的なパスを指定して、imgタグで表示する。
        setUploadFile(file); // uploadするファイルに入れる
    };

    const sendItem = () => {
        const ref = firebase.storage().ref();
        const fileName = GetFileName();
        const uploadRef = ref.child(fileName);
        uploadRef.put(uploadFile).then((snapshot) => {
            snapshot.ref.getDownloadURL()
                .then((url) => {
                setItemList(([...itemList,fileName]))
                console.log(url)
            })
                .catch((err)=>{console.log(err)})
        })
    };

    const GetFileName = () => {
        const date = new Date();
        let fileName : string = date.getFullYear().toString();
            fileName += (date.getMonth() + 1).toString();
            fileName += date.getDate().toString();
            fileName += date.getHours().toString();
            fileName += date.getMinutes().toString();
            fileName += date.getSeconds().toString();
            fileName += date.getMilliseconds().toString();
        return `${fileName}.jpg`
    }

    const handleChange = (e : ChangeEvent<{value : unknown}>) => {
        const itemName = e.target.value as string;
        console.log(itemName);
        setCurrentImg(itemName);
    };

    const imgRender = () => {
        if(imgSrc != null && imgSrc != '') return (<img src={imgSrc}/>)
        return (<h1>写真が選択されていません。</h1>)
    }

    return (
        <div>
            <div>
                <DropDownList handleChange={handleChange} items={itemList}/>
            </div>
            <input type={'file'} accept={'image/*'} onChange={(e) => handleChangeFile(e)}/>
            {imgRender()}
            <button type="button" onClick={() => sendItem()}>投稿する</button>
        </div>
    );
};

type props = {
    items : string[],
    handleChange : (e : ChangeEvent<{value : unknown}>) => void
}

const DropDownList : React.FC<props> = (props : props) => {
    const classes = useStyles();
    return (
        <FormControl className={classes.formControl}>
            <InputLabel id={'img-list-label'}>画像選択</InputLabel>
            <Select
                labelId={'img-list-label'}
                id={'img-list-select'}
                onChange={(e) => props.handleChange(e)}
            >
                {props.items.map((item,index) => (<MenuItem key={index} value={item}>{item}</MenuItem>))}
            </Select>
        </FormControl>
    )
};

export default ImageUploader;