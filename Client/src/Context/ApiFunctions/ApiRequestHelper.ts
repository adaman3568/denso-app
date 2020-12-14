/// Apiでメソッドを投げる際のクラス
import Cookies from "js-cookie";

export class ApiRequestHelper {

    getHeader = () : {} => {
        const token = Cookies.get("denso-app-jwt-token");
        return ({headers :
                {'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                }})
    }
}