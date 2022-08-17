"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploy_service = exports.image_resize = exports.add_module = exports.remove_service = exports.add_blueprint = exports.registerStringOp = void 0;
var v3_1 = require("@fluencelabs/fluence/dist/internal/compilerSupport/v3");
function registerStringOp() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    (0, v3_1.registerService)(args, {
        "defaultServiceId": "op",
        "functions": {
            "tag": "labeledProduct",
            "fields": {
                "array": {
                    "tag": "arrow",
                    "domain": {
                        "tag": "labeledProduct",
                        "fields": {
                            "s": {
                                "tag": "scalar",
                                "name": "string"
                            }
                        }
                    },
                    "codomain": {
                        "tag": "unlabeledProduct",
                        "items": [
                            {
                                "tag": "array",
                                "type": {
                                    "tag": "scalar",
                                    "name": "string"
                                }
                            }
                        ]
                    }
                }
            }
        }
    });
}
exports.registerStringOp = registerStringOp;
function add_blueprint() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var script = "\n                    (xor\n                     (seq\n                      (seq\n                       (seq\n                        (seq\n                         (seq\n                          (seq\n                           (call %init_peer_id% (\"getDataSrv\" \"-relay-\") [] -relay-)\n                           (call %init_peer_id% (\"getDataSrv\" \"module_hash\") [] module_hash)\n                          )\n                          (call %init_peer_id% (\"op\" \"concat_strings\") [\"hash:\" module_hash] prefixed_hash)\n                         )\n                         (call %init_peer_id% (\"op\" \"array\") [prefixed_hash] dependencies)\n                        )\n                        (call %init_peer_id% (\"dist\" \"make_blueprint\") [\"process_files\" dependencies] blueprint)\n                       )\n                       (call %init_peer_id% (\"dist\" \"add_blueprint\") [blueprint] blueprint_id)\n                      )\n                      (xor\n                       (call %init_peer_id% (\"callbackSrv\" \"response\") [blueprint_id])\n                       (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 1])\n                      )\n                     )\n                     (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 2])\n                    )\n    ";
    return (0, v3_1.callFunction)(args, {
        "functionName": "add_blueprint",
        "arrow": {
            "tag": "arrow",
            "domain": {
                "tag": "labeledProduct",
                "fields": {
                    "module_hash": {
                        "tag": "scalar",
                        "name": "string"
                    }
                }
            },
            "codomain": {
                "tag": "unlabeledProduct",
                "items": [
                    {
                        "tag": "scalar",
                        "name": "string"
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
exports.add_blueprint = add_blueprint;
function remove_service() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var script = "\n                    (xor\n                     (seq\n                      (seq\n                       (seq\n                        (seq\n                         (seq\n                          (call %init_peer_id% (\"getDataSrv\" \"-relay-\") [] -relay-)\n                          (call %init_peer_id% (\"getDataSrv\" \"relay\") [] relay)\n                         )\n                         (call %init_peer_id% (\"getDataSrv\" \"service_id\") [] service_id)\n                        )\n                        (call -relay- (\"op\" \"noop\") [])\n                       )\n                       (xor\n                        (seq\n                         (call relay (\"srv\" \"remove\") [service_id])\n                         (call -relay- (\"op\" \"noop\") [])\n                        )\n                        (seq\n                         (call -relay- (\"op\" \"noop\") [])\n                         (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 1])\n                        )\n                       )\n                      )\n                      (xor\n                       (call %init_peer_id% (\"callbackSrv\" \"response\") [true])\n                       (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 2])\n                      )\n                     )\n                     (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 3])\n                    )\n    ";
    return (0, v3_1.callFunction)(args, {
        "functionName": "remove_service",
        "arrow": {
            "tag": "arrow",
            "domain": {
                "tag": "labeledProduct",
                "fields": {
                    "relay": {
                        "tag": "scalar",
                        "name": "string"
                    },
                    "service_id": {
                        "tag": "scalar",
                        "name": "string"
                    }
                }
            },
            "codomain": {
                "tag": "unlabeledProduct",
                "items": [
                    {
                        "tag": "scalar",
                        "name": "bool"
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
exports.remove_service = remove_service;
function add_module() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var script = "\n                    (xor\n                     (seq\n                      (seq\n                       (seq\n                        (seq\n                         (seq\n                          (call %init_peer_id% (\"getDataSrv\" \"-relay-\") [] -relay-)\n                          (call %init_peer_id% (\"getDataSrv\" \"name\") [] name)\n                         )\n                         (call %init_peer_id% (\"getDataSrv\" \"path\") [] path)\n                        )\n                        (call %init_peer_id% (\"dist\" \"default_module_config\") [name] config)\n                       )\n                       (call %init_peer_id% (\"dist\" \"add_module_from_vault\") [path config] module_hash)\n                      )\n                      (xor\n                       (call %init_peer_id% (\"callbackSrv\" \"response\") [module_hash])\n                       (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 1])\n                      )\n                     )\n                     (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 2])\n                    )\n    ";
    return (0, v3_1.callFunction)(args, {
        "functionName": "add_module",
        "arrow": {
            "tag": "arrow",
            "domain": {
                "tag": "labeledProduct",
                "fields": {
                    "name": {
                        "tag": "scalar",
                        "name": "string"
                    },
                    "path": {
                        "tag": "scalar",
                        "name": "string"
                    }
                }
            },
            "codomain": {
                "tag": "unlabeledProduct",
                "items": [
                    {
                        "tag": "scalar",
                        "name": "string"
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
exports.add_module = add_module;
function image_resize() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var script = "\n                    (xor\n                     (seq\n                      (seq\n                       (seq\n                        (seq\n                         (seq\n                          (seq\n                           (seq\n                            (seq\n                             (seq\n                              (seq\n                               (call %init_peer_id% (\"getDataSrv\" \"-relay-\") [] -relay-)\n                               (call %init_peer_id% (\"getDataSrv\" \"cid\") [] cid)\n                              )\n                              (call %init_peer_id% (\"getDataSrv\" \"height\") [] height)\n                             )\n                             (call %init_peer_id% (\"getDataSrv\" \"width\") [] width)\n                            )\n                            (call %init_peer_id% (\"getDataSrv\" \"ipfs\") [] ipfs)\n                           )\n                           (call %init_peer_id% (\"getDataSrv\" \"node\") [] node)\n                          )\n                          (call %init_peer_id% (\"getDataSrv\" \"service_id\") [] service_id)\n                         )\n                         (call -relay- (\"op\" \"noop\") [])\n                        )\n                        (xor\n                         (seq\n                          (call node (\"aqua-ipfs\" \"get_from\") [cid ipfs] get)\n                          (xor\n                           (seq\n                            (match get.$.success! true\n                             (null)\n                            )\n                            (call -relay- (\"op\" \"noop\") [])\n                           )\n                           (seq\n                            (par\n                             (seq\n                              (call -relay- (\"op\" \"noop\") [])\n                              (xor\n                               (call %init_peer_id% (\"callbackSrv\" \"error\") [\"Ipfs.get_from failed\" get.$.error!])\n                               (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 1])\n                              )\n                             )\n                             (null)\n                            )\n                            (call -relay- (\"op\" \"noop\") [])\n                           )\n                          )\n                         )\n                         (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 2])\n                        )\n                       )\n                       (call %init_peer_id% (service_id \"imageresize\") [get.$.path! height width] imageresize)\n                      )\n                      (xor\n                       (call %init_peer_id% (\"callbackSrv\" \"response\") [imageresize])\n                       (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 3])\n                      )\n                     )\n                     (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 4])\n                    )\n    ";
    return (0, v3_1.callFunction)(args, {
        "functionName": "image_resize",
        "arrow": {
            "tag": "arrow",
            "domain": {
                "tag": "labeledProduct",
                "fields": {
                    "cid": {
                        "tag": "scalar",
                        "name": "string"
                    },
                    "height": {
                        "tag": "scalar",
                        "name": "u32"
                    },
                    "width": {
                        "tag": "scalar",
                        "name": "u32"
                    },
                    "ipfs": {
                        "tag": "scalar",
                        "name": "string"
                    },
                    "node": {
                        "tag": "scalar",
                        "name": "string"
                    },
                    "service_id": {
                        "tag": "scalar",
                        "name": "string"
                    },
                    "error": {
                        "tag": "arrow",
                        "domain": {
                            "tag": "unlabeledProduct",
                            "items": [
                                {
                                    "tag": "scalar",
                                    "name": "string"
                                },
                                {
                                    "tag": "scalar",
                                    "name": "string"
                                }
                            ]
                        },
                        "codomain": {
                            "tag": "nil"
                        }
                    }
                }
            },
            "codomain": {
                "tag": "unlabeledProduct",
                "items": [
                    {
                        "tag": "array",
                        "type": {
                            "tag": "scalar",
                            "name": "u8"
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
exports.image_resize = image_resize;
function deploy_service() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var script = "\n                    (xor\n                     (seq\n                      (seq\n                       (seq\n                        (seq\n                         (seq\n                          (call %init_peer_id% (\"getDataSrv\" \"-relay-\") [] -relay-)\n                          (call %init_peer_id% (\"getDataSrv\" \"relay\") [] relay)\n                         )\n                         (call %init_peer_id% (\"getDataSrv\" \"cid\") [] cid)\n                        )\n                        (call %init_peer_id% (\"getDataSrv\" \"ipfs\") [] ipfs)\n                       )\n                       (new $service_id\n                        (seq\n                         (seq\n                          (call -relay- (\"op\" \"noop\") [])\n                          (xor\n                           (seq\n                            (call relay (\"aqua-ipfs\" \"get_from\") [cid ipfs] get_result)\n                            (xor\n                             (match get_result.$.success! true\n                              (xor\n                               (seq\n                                (seq\n                                 (seq\n                                  (seq\n                                   (seq\n                                    (seq\n                                     (seq\n                                      (call relay (\"dist\" \"default_module_config\") [\"process_files\"] config)\n                                      (call relay (\"dist\" \"add_module_from_vault\") [get_result.$.path! config] module_hash)\n                                     )\n                                     (call relay (\"op\" \"concat_strings\") [\"hash:\" module_hash] prefixed_hash)\n                                    )\n                                    (call relay (\"op\" \"array\") [prefixed_hash] dependencies)\n                                   )\n                                   (call relay (\"dist\" \"make_blueprint\") [\"process_files\" dependencies] blueprint)\n                                  )\n                                  (call relay (\"dist\" \"add_blueprint\") [blueprint] blueprint_id)\n                                 )\n                                 (call relay (\"srv\" \"create\") [blueprint_id] $service_id)\n                                )\n                                (call -relay- (\"op\" \"noop\") [])\n                               )\n                               (seq\n                                (call -relay- (\"op\" \"noop\") [])\n                                (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 1])\n                               )\n                              )\n                             )\n                             (seq\n                              (seq\n                               (call -relay- (\"op\" \"noop\") [])\n                               (par\n                                (seq\n                                 (call -relay- (\"op\" \"noop\") [])\n                                 (xor\n                                  (call %init_peer_id% (\"callbackSrv\" \"error\") [\"Ipfs.get_from failed\" get_result.$.error!])\n                                  (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 2])\n                                 )\n                                )\n                                (null)\n                               )\n                              )\n                              (call -relay- (\"op\" \"noop\") [])\n                             )\n                            )\n                           )\n                           (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 3])\n                          )\n                         )\n                         (call %init_peer_id% (\"op\" \"identity\") [$service_id] service_id-fix)\n                        )\n                       )\n                      )\n                      (xor\n                       (call %init_peer_id% (\"callbackSrv\" \"response\") [service_id-fix])\n                       (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 4])\n                      )\n                     )\n                     (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [%last_error% 5])\n                    )\n    ";
    return (0, v3_1.callFunction)(args, {
        "functionName": "deploy_service",
        "arrow": {
            "tag": "arrow",
            "domain": {
                "tag": "labeledProduct",
                "fields": {
                    "relay": {
                        "tag": "scalar",
                        "name": "string"
                    },
                    "cid": {
                        "tag": "scalar",
                        "name": "string"
                    },
                    "ipfs": {
                        "tag": "scalar",
                        "name": "string"
                    },
                    "error": {
                        "tag": "arrow",
                        "domain": {
                            "tag": "unlabeledProduct",
                            "items": [
                                {
                                    "tag": "scalar",
                                    "name": "string"
                                },
                                {
                                    "tag": "scalar",
                                    "name": "string"
                                }
                            ]
                        },
                        "codomain": {
                            "tag": "nil"
                        }
                    }
                }
            },
            "codomain": {
                "tag": "unlabeledProduct",
                "items": [
                    {
                        "tag": "option",
                        "type": {
                            "tag": "scalar",
                            "name": "string"
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
exports.deploy_service = deploy_service;
