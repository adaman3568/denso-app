import React, {FC} from 'react';
import noImage from '../../img/noimage.png';
import {makeStyles} from "@material-ui/core/styles";

type ProfileImageProps = {
    imageSource : string
}

const useStyle = makeStyles((theme) => ({
    img :{
        height : '150px',
        width : '150px',
        borderRadius : '50%',
        backgroundColor : 'gray',
        boxShadow : '0 5px 5px 0px rgba(100, 100, 100, 0.5)'
    },
}))

const ProfileImage : FC<ProfileImageProps> = ({imageSource}) => {
    const classes = useStyle();
    return (
        <>
            {(imageSource === "" ? <img className={classes.img} src={noImage} alt={"プロフィール画像"}/> : <div className={classes.img}>画像はあります！</div>)}
        </>
    );
};

export default ProfileImage;