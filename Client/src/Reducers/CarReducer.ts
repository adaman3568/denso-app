import {CarInfo} from "../Context/DataTypeList";
// import React from "react";
//
export const EmpInitialState : CarInfo[] = [];
//
// const SetAllCarAction = 'SetAllCarAction' as const;
// const CarDeleteAction = 'CarDeleteAction' as const;
// const CarUpdateAction = 'CarUpdateAction' as const;
//
// export const SetDisplayCarActionCreator = (data : CarInfo[]) => ({
//     type : SetAllCarAction,
//     payload : {
//         data
//     },
// });
//
// export const CarDeleteActionCreator = (id : string) => ({
//     type : CarDeleteAction,
//     payload : {
//         id
//     }
// });
//
// export const CarUpdateActionCreator = (id : string ,newData : CarInfo) => ({
//     type : CarUpdateAction,
//     payload : {
//         id,newData
//     }
// });
//
// export type CarActions = ReturnType<typeof SetDisplayCarActionCreator> | ReturnType<typeof CarDeleteActionCreator> | ReturnType<typeof CarUpdateActionCreator>
//
// const CarReducer : React.Reducer<CarInfo[],CarActions> = (status = EmpInitialState , action) : CarInfo[] => {
//     switch (action.type) {
//         case SetAllCarAction:
//             return action.payload.data;
//         case CarDeleteAction:
//             return status.filter(item => item.id !== action.payload.id);
//         case CarUpdateAction:
//             let filterdStatus = status.filter(item => item.id !== action.payload.id);
//             filterdStatus.push(action.payload.newData);
//             return filterdStatus;
//
//         default:
//             return status;
//     }
// };
//
// export default CarReducer;
