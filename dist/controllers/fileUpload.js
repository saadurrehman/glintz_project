"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFile = void 0;
const firebase_1 = require("../firebase");
const storage_1 = require("firebase/storage");
const addFile = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
      const storageRef = (0, storage_1.ref)(
        firebase_1.storage,
        `files/${req.file.originalname}`
      );
      const uploadTask = (0, storage_1.uploadBytesResumable)(
        storageRef,
        req.file.buffer
      );
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          console.error(error);
        },
        () => {
          (0, storage_1.getDownloadURL)(uploadTask.snapshot.ref).then(
            (downloadURL) => {
              return downloadURL;
            }
          );
        }
      );
    }
  });
exports.addFile = addFile;
