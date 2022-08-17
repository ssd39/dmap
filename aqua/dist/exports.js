"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_external_api_multiaddr = exports.set_timeout = exports.get_external_swarm_multiaddr = void 0;
var v3_1 = require("@fluencelabs/fluence/dist/internal/compilerSupport/v3");
function get_external_swarm_multiaddr() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var script = "\n                    (xor\n                     (seq\n                      (seq\n                       (seq\n                        (seq\n                         (call %init_peer_id% (\"getDataSrv\" \"-relay-\") [] -relay-)\n                         (call %init_peer_id% (\"getDataSrv\" \"node\") [] node)\n                        )\n                        (call -relay- (\"op\" \"noop\") [])\n                       )\n                       (xor\n                        (seq\n                         (call node (\"aqua-ipfs\" \"get_external_swarm_multiaddr\") [] result)\n                         (call -relay- (\"op\" \"noop\") [])\n                        )\n                        (seq\n                         (call -relay- (\"op\" \"noop\") [])\n                         (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 1])\n                        )\n                       )\n                      )\n                      (xor\n                       (call %init_peer_id% (\"callbackSrv\" \"response\") [result])\n                       (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 2])\n                      )\n                     )\n                     (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 3])\n                    )\n    ";
    return (0, v3_1.callFunction)(args, {
        "functionName": "get_external_swarm_multiaddr",
        "arrow": {
            "tag": "arrow",
            "domain": {
                "tag": "labeledProduct",
                "fields": {
                    "node": {
                        "tag": "scalar",
                        "name": "string"
                    }
                }
            },
            "codomain": {
                "tag": "unlabeledProduct",
                "items": [
                    {
                        "tag": "struct",
                        "name": "IpfsMultiaddrResult",
                        "fields": {
                            "error": {
                                "tag": "scalar",
                                "name": "string"
                            },
                            "multiaddr": {
                                "tag": "scalar",
                                "name": "string"
                            },
                            "success": {
                                "tag": "scalar",
                                "name": "bool"
                            }
                        }
                    }
                ]
            }
        },
        "names": {
            "relay": "-relay-",
            "getDataSrv": "getDataSrv",
            "callbackSrv": "callbackSrv",
            "responseSrv": "callbackSrv",
            "responseFnName": "response",
            "errorHandlingSrv": "errorHandlingSrv",
            "errorFnName": "error"
        }
    }, script);
}
exports.get_external_swarm_multiaddr = get_external_swarm_multiaddr;
function set_timeout() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var script = "\n                    (xor\n                     (seq\n                      (seq\n                       (seq\n                        (seq\n                         (call %init_peer_id% (\"getDataSrv\" \"-relay-\") [] -relay-)\n                         (call %init_peer_id% (\"getDataSrv\" \"node\") [] node)\n                        )\n                        (call %init_peer_id% (\"getDataSrv\" \"timeout_sec\") [] timeout_sec)\n                       )\n                       (call -relay- (\"op\" \"noop\") [])\n                      )\n                      (xor\n                       (seq\n                        (call node (\"aqua-ipfs\" \"set_timeout\") [timeout_sec])\n                        (call -relay- (\"op\" \"noop\") [])\n                       )\n                       (seq\n                        (call -relay- (\"op\" \"noop\") [])\n                        (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 1])\n                       )\n                      )\n                     )\n                     (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 2])\n                    )\n    ";
    return (0, v3_1.callFunction)(args, {
        "functionName": "set_timeout",
        "arrow": {
            "tag": "arrow",
            "domain": {
                "tag": "labeledProduct",
                "fields": {
                    "node": {
                        "tag": "scalar",
                        "name": "string"
                    },
                    "timeout_sec": {
                        "tag": "scalar",
                        "name": "u64"
                    }
                }
            },
            "codomain": {
                "tag": "nil"
            }
        },
        "names": {
            "relay": "-relay-",
            "getDataSrv": "getDataSrv",
            "callbackSrv": "callbackSrv",
            "responseSrv": "callbackSrv",
            "responseFnName": "response",
            "errorHandlingSrv": "errorHandlingSrv",
            "errorFnName": "error"
        }
    }, script);
}
exports.set_timeout = set_timeout;
function get_external_api_multiaddr() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var script = "\n                    (xor\n                     (seq\n                      (seq\n                       (seq\n                        (seq\n                         (call %init_peer_id% (\"getDataSrv\" \"-relay-\") [] -relay-)\n                         (call %init_peer_id% (\"getDataSrv\" \"node\") [] node)\n                        )\n                        (call -relay- (\"op\" \"noop\") [])\n                       )\n                       (xor\n                        (seq\n                         (call node (\"aqua-ipfs\" \"get_external_api_multiaddr\") [] result)\n                         (call -relay- (\"op\" \"noop\") [])\n                        )\n                        (seq\n                         (call -relay- (\"op\" \"noop\") [])\n                         (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 1])\n                        )\n                       )\n                      )\n                      (xor\n                       (call %init_peer_id% (\"callbackSrv\" \"response\") [result])\n                       (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 2])\n                      )\n                     )\n                     (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 3])\n                    )\n    ";
    return (0, v3_1.callFunction)(args, {
        "functionName": "get_external_api_multiaddr",
        "arrow": {
            "tag": "arrow",
            "domain": {
                "tag": "labeledProduct",
                "fields": {
                    "node": {
                        "tag": "scalar",
                        "name": "string"
                    }
                }
            },
            "codomain": {
                "tag": "unlabeledProduct",
                "items": [
                    {
                        "tag": "struct",
                        "name": "IpfsMultiaddrResult",
                        "fields": {
                            "error": {
                                "tag": "scalar",
                                "name": "string"
                            },
                            "multiaddr": {
                                "tag": "scalar",
                                "name": "string"
                            },
                            "success": {
                                "tag": "scalar",
                                "name": "bool"
                            }
                        }
                    }
                ]
            }
        },
        "names": {
            "relay": "-relay-",
            "getDataSrv": "getDataSrv",
            "callbackSrv": "callbackSrv",
            "responseSrv": "callbackSrv",
            "responseFnName": "response",
            "errorHandlingSrv": "errorHandlingSrv",
            "errorFnName": "error"
        }
    }, script);
}
exports.get_external_api_multiaddr = get_external_api_multiaddr;
