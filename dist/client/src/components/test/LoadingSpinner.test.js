"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const LoadingSpinner_1 = __importDefault(require("../LoadingSpinner"));
test("render component with base structure", () => {
    (0, react_1.render)(<LoadingSpinner_1.default />);
    const text = react_1.screen.getByText(/Processing/i);
    expect(text).toBeInTheDocument();
});
