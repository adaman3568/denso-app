interface IPathList {
    home : string,
    employee : string,
    profile : string,
    customers : string,
    customerDetail : string,
    cars : string,
    carDetail : string,
    tweetsDetail : string
}

const PathList : IPathList = {
    home : '/',
    employee : '/employees',
    profile : '/profile',
    customers : '/customers',
    customerDetail : '/customers/detail',
    cars : '/cars',
    carDetail : '/cars/detail',
    tweetsDetail : '/tweets'
};

export {PathList}