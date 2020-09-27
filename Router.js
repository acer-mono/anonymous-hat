class Router {
    constructor() {
        this.routes = [];
        this.regex = [
            {regex: /(.*)\.js/, contentType: "application/javascript"},
            {regex: /(.*)\.css/, contentType: "text/css"},
            {regex: /(.*)\.svg/, contentType: "image/svg+xml"},
            {regex: /(.*)\.jpg/, contentType: "image/jpeg"}
        ];
        this.addRoute = this.addRoute.bind(this);
        this.findCallback = this.findCallback.bind(this);
        this.matchRegex = this.matchRegex.bind(this);
    }

    addRoute(path, method, callback) {
        const exists = this.findCallback(path, method);

        if (exists) {
            return;
        }

        this.routes.push({ path, method, callback });
    }

    findCallback(path, method) {
        const route = this.routes.find(route => {
            return route.path === path && route.method === method;
        });
        return route ? route.callback : null;
    }

    matchRegex(path) {
        let contentType = null;

        this.regex.forEach(regex => {
            if (regex.regex.test(path)) {
                contentType = regex.contentType;
            }
        });

        return contentType;
    }
}

module.exports = Router;
