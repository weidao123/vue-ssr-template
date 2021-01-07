export default {
    ssr: {
        output: "web_dist",
        template: process.env.NODE_ENV === "development" ? "index.html" : "web_dist/index.html"
    }
}
