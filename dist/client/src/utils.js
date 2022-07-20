"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noop = exports.onSubmit = exports.setImageValue = void 0;
const setImageValue = (event, setFieldValue, name) => {
    if (event.target.files) {
        setFieldValue(name, URL.createObjectURL(event.target.files[0]));
        setFieldValue("file", event.target.files[0]);
    }
};
exports.setImageValue = setImageValue;
const onSubmit = (values, submitRecord, handleClose) => __awaiter(void 0, void 0, void 0, function* () {
    if (values.file) {
        yield submitRecord(Object.assign(Object.assign({}, values), { imageData: values.file }));
    }
    else {
        yield submitRecord(values);
    }
    handleClose();
});
exports.onSubmit = onSubmit;
const noop = () => { };
exports.noop = noop;
