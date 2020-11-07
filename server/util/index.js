
exports.isDev = function () {
    // 是否被编译
    return process.env.NODE_ENV === "development";
};

