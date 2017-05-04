class Logger {

    static _buildMessage(message, data) {
        return (data.length === 0) ? message : (message + ':' + JSON.stringify(data));
    }

    static log(message, data = '') {
        console.log(this._buildMessage(message, data));
    }

    static logGroup(name, details, collapsed = true) {

        if (process.env.BUILD_APP_TARGET === 'CLIENT') {
            if (collapsed) {
                console.groupCollapsed(name);
            } else {
                console.group(name);
            }
            console.groupEnd();
        }
    }
}

export default Logger;