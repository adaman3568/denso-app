interface IPathList {
    home : string,
    employee : string,
    employeeDetail : string,
    profile : string,
    customers : string,
    customerDetail : string,
    cars : string,
    carDetail : string,
    tweetsDetail : string,
    loginPage : string
}

const PathList : IPathList = {
    home : '/',
    employee : '/employees',
    employeeDetail : '/employees/detail',
    profile : '/profile',
    customers : '/customers',
    customerDetail : '/customers/detail',
    cars : '/cars',
    carDetail : '/cars/detail',
    tweetsDetail : '/tweets',
    loginPage : '/login'
};

export {PathList}