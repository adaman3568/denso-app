interface IPathList {
    home : string,
    employee : string,
    employeeDetail : string,
    profile : string,
    customers : string,
    customerDetail : string,
    customerCreate : string,
    cars : string,
    carDetail : string,
    carCreate : string,
    carEdit : string,
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
    customerCreate : '/customers/create',
    cars : '/cars',
    carDetail : '/cars/detail',
    carCreate : '/cars/create',
    carEdit : '/cars/edit',
    tweetsDetail : '/tweets',
    loginPage : '/login'
};

export {PathList}