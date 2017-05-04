export const COOKIE_NAME_TOKEN = 'token';

export class CookieHelper {

    /**
     * Set a cookie
     * @param name
     * @param value
     * @param daysAvailable
     */
    static setCookie(name, value, daysAvailable = 2) {
        //-- delete the old cookie cookie first
        this.deleteCookie(name);

        let cookieString = name + '=' + value + ';';

        //-- set the expiration date of the cookie
        const date = new Date();
        date.setTime(date.getTime() + (daysAvailable*24*60*60*1000));
        cookieString += 'expires=' + date.toUTCString();

        if (process.env.BUILD_APP_TARGET === 'CLIENT') {
            document.cookie = cookieString;
        }
    }

    /**
     * Invalidates a cookie by it's name
     * @param name
     */
    static deleteCookie(name) {
        const cookieValue = this.getCookie(name);

        if (process.env.BUILD_APP_TARGET === 'CLIENT') {
            document.cookie = name + '=' + cookieValue + ';expires=Thu, 01 Jan 1970 00:00:00 UTC';
        }
    }

    /**
     * Get the cookie content
     * @param name
     * @returns string/null
     */
    static getCookie(name) {
        var nameEQ = name + "=";

        if (process.env.BUILD_APP_TARGET === 'CLIENT') {
            var ca = document.cookie.split(';');
        }

        if (ca) {
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
    }

    /**
     * It's a helper function for returning the token
     * @returns {string|null}
     */
    static getToken()
    {
        return this.getCookie('token');
    }
}