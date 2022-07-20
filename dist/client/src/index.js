"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
require("./index.css");
const App_1 = __importDefault(require("./App"));
require("bootstrap/dist/css/bootstrap.min.css");
require("react-datepicker/dist/react-datepicker.css");
require("toastr/build/toastr.css");
const root = client_1.default.createRoot(document.getElementById("root"));
root.render(<App_1.default />);
