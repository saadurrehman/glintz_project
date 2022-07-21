"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const connection_1 = __importDefault(require("./connection"));
dotenv_1.default.config();
connection_1.default.authenticate()
    .then(() => {
    console.log("Connection has been established successfully.");
})
    .catch((error) => {
    console.error("Unable to connect to the database:", error);
});
const app = (0, express_1.default)();
app.use(express_1.default.static("public"));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({
    extended: false,
}));
app.use((0, cors_1.default)());
app.use("/v1/user", require("./routes/user"));
app.use("/v1/experience", require("./routes/experience"));
app.use("/v1/fileUpload", require("./routes/fileUpload"));
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join("client", "build")));
    app.get("*", (req, resp) => {
        resp.sendFile(path_1.default.join("client", "build", "index.html"));
    });
}
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
