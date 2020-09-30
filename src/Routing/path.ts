interface IPathList {
    home : string,
    employee : string,
    profile : string,
    customers : string,
    cars : string,
    carDetail : string,
    tweetsDetail : string
}

const PathList : IPathList = {
    home : '/',
    employee : '/employees',
    profile : '/profile',
    customers : '/customers',
    cars : '/cars',
    carDetail : '/cars/detail/',
    tweetsDetail : '/tweets'
};

export {PathList}