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
exports.deleteRequest = exports.putRequest = exports.getRequest = exports.postRequest = void 0;
const postRequest = (url, body, headers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        });
        switch (response.status) {
            case 401: {
                // Login require
                break;
            }
            case 403: {
                // Permission denied
                break;
            }
            case 404: {
                // Invalid request
                break;
            }
            case 500: {
                // Server error
                break;
            }
            default: {
                // Unknown error occured
                break;
            }
        }
        return response;
    }
    catch (error) {
        throw error;
    }
});
exports.postRequest = postRequest;
const getRequest = (url, headers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url, {
            method: "GET",
            headers: headers,
        });
        switch (response.status) {
            case 401: {
                // Login require
                break;
            }
            case 403: {
                // Permission denied
                break;
            }
            case 404: {
                // Invalid request
                break;
            }
            case 500: {
                // Server error
                break;
            }
            default: {
                // Unknown error occured
                break;
            }
        }
        return response;
    }
    catch (error) {
        throw error;
    }
});
exports.getRequest = getRequest;
const putRequest = (url, body, headers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(body),
        });
        switch (response.status) {
            case 401: {
                // Login require
                break;
            }
            case 403: {
                // Permission denied
                break;
            }
            case 404: {
                // Invalid request
                break;
            }
            case 500: {
                // Server error
                break;
            }
            default: {
                // Unknown error occured
                break;
            }
        }
        return response;
    }
    catch (error) {
        throw error;
    }
});
exports.putRequest = putRequest;
const deleteRequest = (url, headers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url, {
            method: "DELETE",
            headers: headers,
        });
        switch (response.status) {
            case 401: {
                // Login require
                break;
            }
            case 403: {
                // Permission denied
                break;
            }
            case 404: {
                // Invalid request
                break;
            }
            case 500: {
                // Server error
                break;
            }
            default: {
                // Unknown error occured
                break;
            }
        }
        return response;
    }
    catch (error) {
        throw error;
    }
});
exports.deleteRequest = deleteRequest;
