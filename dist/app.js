"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_js_1 = __importDefault(require("./router/post.js"));
const app = (0, express_1.default)();
const port = 3000;
app.use(post_js_1.default);
app.get("/", (req, res) => {
    res.send("hellsing");
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map