import NodeCache from "node-cache"

const catchErrors = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            next(err.message);
        });
    };
};

const myCache = new NodeCache();


export {
    catchErrors,
    myCache
}