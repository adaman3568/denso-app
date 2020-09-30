import React,{FC} from 'react';
import {RouteComponentProps} from 'react-router-dom'

type CarPageProps = {} & RouteComponentProps<{id : string}>

const CarDetail : FC<CarPageProps> = (props : CarPageProps) => {
    return (
        <div>
            <h2>this is id:{props.match.params.id} car detail page.</h2>
        </div>
    );
};

export default CarDetail;