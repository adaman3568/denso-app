interface IPathList {
    home : string,
    employee : string,
    profile : string,
    customers : string,
    cars : string
}

const PathList : IPathList = {
    home : '/',
    employee : 'employees',
    profile : 'profile',
    customers : '/customers',
    cars : 'cars'
};

export {PathList}