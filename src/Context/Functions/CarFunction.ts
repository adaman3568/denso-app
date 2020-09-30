import {CarInfo} from "../DataTypeList";

const CarMockItems : CarInfo[] = [
    {id : 1,CarName : '11-22',Detail : 'etc装着済み',CommentCount : 12 , LastCommentDate : '2020/12/11 12:34:23'},
    {id : 1,CarName : '12-45',Detail : 'etc装着済み＆デジタコ',CommentCount : 10 , LastCommentDate : '2020/12/10 10:45:11'}
];

export const GetAllCarData = () : CarInfo[] => {
    return CarMockItems;
};

export const GetCarData = (id : number) => {
    return CarMockItems.find(item => item.id === id);
};