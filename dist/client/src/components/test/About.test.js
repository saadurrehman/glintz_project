"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const About_1 = __importDefault(require("../About"));
const props = {
    user: {
        description: "Testing description",
        age: 2,
        createdAt: "01/01/2021",
        experience: 3,
        experiences: [],
        id: 5,
        name: "name",
        profilePicture: null,
        updatedAt: "01/01/2021",
    },
    handleShow: () => { },
};
test("render component with base structure", () => {
    (0, react_2.render)(<About_1.default {...props}/>);
    const linkElement = react_2.screen.getByText(/Testing description/i);
    expect(linkElement).toBeInTheDocument();
});
