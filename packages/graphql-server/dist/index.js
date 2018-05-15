require('/home/benzumbrunn/melon/reporting-thesis/node_modules/backpack-core/node_modules/source-map-support/register.js')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 91);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/interopRequireDefault");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/asyncToGenerator");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _addressBook = _interopRequireDefault(__webpack_require__(41));

var _exchangeInfo = _interopRequireDefault(__webpack_require__(99));

var _getNativeAssetSymbol = _interopRequireDefault(__webpack_require__(52));

var _getNetwork = _interopRequireDefault(__webpack_require__(33));

var _getQuoteAssetSymbol = _interopRequireDefault(__webpack_require__(56));

var _getWhiteListedAssets = _interopRequireDefault(__webpack_require__(57));

var config;
/**
 * Get config from deployed version contract
 */

var getConfig =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var network;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!config) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", config);

          case 2:
            _context.next = 4;
            return (0, _getNetwork.default)(environment);

          case 4:
            network = _context.sent;
            config = {
              complianceAddress: _addressBook.default[network].OnlyManager,
              exchangeAdapterAddress: _addressBook.default[network].SimpleAdapter,
              exchangeAddress: network === 'kovan' ? _addressBook.default[network].MatchingMarket : _exchangeInfo.default[network][0].address,
              matchingMarketAddress: _addressBook.default[network].MatchingMarket,
              matchingMarketAdapter: _addressBook.default[network].matchingMarketAdapter,
              zeroExV1Address: _addressBook.default[network].ZeroExExchange,
              zeroExV1AdapterAddress: _addressBook.default[network].ZeroExV1Adapter,
              canonicalPriceFeedAddress: _addressBook.default[network].CanonicalPriceFeed,
              stakingPriceFeedAddress: _addressBook.default[network].StakingPriceFeed,
              rankingAddress: _addressBook.default[network].FundRanking,
              riskManagementAddress: _addressBook.default[network].RMMakeOrders,
              versionAddress: _addressBook.default[network].Version,
              governanceAddress: _addressBook.default[network].Governance
            }; // HACK: Define config first so that inside these next async functions,
            // getConfig() already returns the addresses to avoid an infinite loop

            _context.next = 8;
            return (0, _getWhiteListedAssets.default)(environment, network);

          case 8:
            config.assets = _context.sent;
            _context.next = 11;
            return (0, _getNativeAssetSymbol.default)(environment);

          case 11:
            config.nativeAssetSymbol = _context.sent;
            _context.next = 14;
            return (0, _getQuoteAssetSymbol.default)(environment);

          case 14:
            config.quoteAssetSymbol = _context.sent;
            return _context.abrupt("return", config);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getConfig(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getConfig;
exports.default = _default;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("bignumber.js");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _create = _interopRequireDefault(__webpack_require__(106));

function EnsureError(message, data) {
  this.name = 'EnsureError';
  this.message = message || 'Ensure failed';
  this.data = data;
  this.stack = new Error().stack;
}

EnsureError.prototype = (0, _create.default)(Error.prototype);
EnsureError.prototype.constructor = EnsureError;
/**
 * Similar to asset but throws on runtime if `condition` isn't met.
 * Possibility to add a `message` and some `data` to trace.
 * @throws {EnsureError}
 */

var ensure = function ensure(condition, message, data) {
  if (condition !== true) {
    throw new EnsureError(message, {
      condition: condition,
      data: data
    });
  }
};

var _default = ensure;
exports.default = _default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _gasBoost = _interopRequireDefault(__webpack_require__(58));

var _constructTransactionObject = _interopRequireDefault(__webpack_require__(60));

var sendTransaction =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(contract, method, parameters, environment) {
    var opt,
        nonce,
        options,
        gasKeyName,
        rawTransaction,
        transactionHash,
        signedTransaction,
        rawReceipt,
        decodedLogs,
        transactionReceipt,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            opt = _args.length > 4 && _args[4] !== undefined ? _args[4] : {};

            if (!environment.account.sign) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return environment.api.eth.getTransactionCount(environment.account.address);

          case 4:
            _context.t0 = _context.sent.toNumber();
            _context.next = 8;
            break;

          case 7:
            _context.t0 = undefined;

          case 8:
            nonce = _context.t0;
            // Prepare raw transaction
            options = (0, _objectSpread2.default)({
              from: environment.account.address,
              to: contract.address,
              gasPrice: 60000000000
            }, opt); // HACK: If external parity signer, no need to set the nonce, Parity does it. If in-browser wallet, we need to explicitly set the nonce.

            if (nonce) options.nonce = nonce; // Estimate and adjust gas with gasBoost

            gasKeyName = environment.account.sign ? 'gasLimit' : 'gas';

            if (!['cancelOrder', 'offer', 'depositStake', 'withdrawStake', 'collectAndUpdate', 'callOnExchange'].includes(method)) {
              _context.next = 16;
              break;
            }

            options[gasKeyName] = 6700000;
            _context.next = 19;
            break;

          case 16:
            _context.next = 18;
            return (0, _gasBoost.default)(contract.instance[method], parameters, options, environment);

          case 18:
            options[gasKeyName] = _context.sent;

          case 19:
            // Construct raw transaction object
            rawTransaction = (0, _constructTransactionObject.default)(contract, method, parameters, options);

            if (!environment.account.sign) {
              _context.next = 27;
              break;
            }

            // Sign transaction object with Wallet instance
            signedTransaction = environment.account.sign(rawTransaction); // Send raw signed transaction and wait for receipt

            _context.next = 24;
            return environment.api.eth.sendRawTransaction(signedTransaction);

          case 24:
            transactionHash = _context.sent;
            _context.next = 30;
            break;

          case 27:
            _context.next = 29;
            return environment.api.eth.sendTransaction(rawTransaction);

          case 29:
            transactionHash = _context.sent;

          case 30:
            _context.next = 32;
            return contract._pollTransactionReceipt(transactionHash);

          case 32:
            _context.next = 34;
            return environment.api.eth.getTransactionReceipt(transactionHash);

          case 34:
            rawReceipt = _context.sent;
            decodedLogs = contract.parseEventLogs(rawReceipt.logs);
            transactionReceipt = (0, _objectSpread2.default)({}, rawReceipt, {
              logs: decodedLogs
            });
            return _context.abrupt("return", transactionReceipt);

          case 38:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function sendTransaction(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var _default = sendTransaction;
exports.default = _default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FundAbi = _interopRequireDefault(__webpack_require__(129));

/**
 * Get the contract instance of fund at `fundAddress`
 */
var getFundContract = function getFundContract(environment, fundAddress) {
  return environment.api.newContract(_FundAbi.default, fundAddress);
};

var _default = getFundContract;
exports.default = _default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _CanonicalPriceFeedAbi = _interopRequireDefault(__webpack_require__(101));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

/**
 * Gets contract instance of deployed canonical Pricefeed
 */
var getCanonicalPriceFeedContract =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var config;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getConfig.default)(environment);

          case 2:
            config = _context.sent;
            return _context.abrupt("return", environment.api.newContract(_CanonicalPriceFeedAbi.default, config.canonicalPriceFeedAddress));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getCanonicalPriceFeedContract(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getCanonicalPriceFeedContract;
exports.default = _default;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _getDecimals = _interopRequireDefault(__webpack_require__(29));

/**
 * Takes a `quantity` from the EVM and makes it human readable
 * according to the decimals specified by `tokenSymbol`.
 *
 * _Note_ that the EVM always consumes and returns BigNumbers.
 *
 * @example toReadable(config, new BigNumber(100000000000000000, 'ETH-T')) // (17 zeros)
 * // --> // BigNumber(0.1)
 */
var toReadable = function toReadable(config, quantity, tokenSymbol) {
  var decimals = (0, _getDecimals.default)(config, tokenSymbol);
  return new _bignumber.default(quantity).div(Math.pow(10, decimals));
};

var _default = toReadable;
exports.default = _default;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _getDecimals = _interopRequireDefault(__webpack_require__(29));

/**
 * Takes a human readable `quantity` and makes it processable by EVM according
 * to the decimals specified by `tokenSymbol`.
 *
 * _Note_ that the EVM always consumes and returns BigNumbers.
 *
 * @example
 *  toProcessable(config, 0.1, 'ETH-T'));
 *  // --> BigNumber(100000000000000000) // (17 zeros)
 */
var toProcessable = function toProcessable(config, quantity, tokenSymbol) {
  var shouldRound = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var precision = (0, _getDecimals.default)(config, tokenSymbol);

  if (shouldRound) {
    var roundedQuantity = new _bignumber.default(quantity).round(precision);
    return new _bignumber.default(roundedQuantity).times(Math.pow(10, precision));
  }

  return new _bignumber.default(quantity).times(Math.pow(10, precision)); // this is a hack to handle 0x orders with more than 15 significant digits
};

var _default = toProcessable;
exports.default = _default;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ensure = _interopRequireDefault(__webpack_require__(5));

/**
 * Searches the log of the `receipt` for a given event `nameOrIndex`
 * Possibility to add custom error `message` if event not found
 * @throws {EnsureError}
 * @returns found event
 */
var findEventInLog = function findEventInLog(nameOrIndex, receipt) {
  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'No transaction logs found in receipt';
  (0, _ensure.default)(!!(receipt && receipt.logs && receipt.logs.length), 'Transaction has no logs at all.', {
    nameOrIndex: nameOrIndex,
    receipt: receipt
  });
  var log = typeof nameOrIndex === 'string' ? receipt.logs.find(function (l) {
    return l.event === nameOrIndex;
  }) : receipt.logs[nameOrIndex];
  (0, _ensure.default)(!!log, message, {
    nameOrIndex: nameOrIndex,
    receipt: receipt
  });
  return log;
};

var _default = findEventInLog;
exports.default = _default;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/slicedToArray");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getTokenInfo = _interopRequireDefault(__webpack_require__(44));

/**
 * Gets address of given `tokenSymbol`
 */
var getAddress = function getAddress(config, tokenSymbol) {
  return (0, _getTokenInfo.default)(config, tokenSymbol).address.toLowerCase();
};

var _default = getAddress;
exports.default = _default;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/promise");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _VersionAbi = _interopRequireDefault(__webpack_require__(100));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

/**
 * Get deployed version contract instance
 */
var getVersionContract =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var config;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getConfig.default)(environment);

          case 2:
            config = _context.sent;
            return _context.abrupt("return", environment.api.newContract(_VersionAbi.default, config.versionAddress));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getVersionContract(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getVersionContract;
exports.default = _default;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var toDate = function toDate(value) {
  return new Date(value.times(1000).toNumber());
};

var _default = toDate;
exports.default = _default;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var getTokenInfoByAddress = function getTokenInfoByAddress(config, address) {
  return config.assets.find(function (t) {
    return t.address.toLowerCase() === address.toLowerCase();
  }) || function () {
    throw new Error("No token found with address ".concat(address));
  }();
};
/**
 * Gets the token symbol by its ERC20 `address`
 */


var getSymbol = function getSymbol(config, address) {
  return getTokenInfoByAddress(config, address).symbol;
};

var _default = getSymbol;
exports.default = _default;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectSpread");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _MatchingMarketAbi = _interopRequireDefault(__webpack_require__(112));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

/**
 * Get deployed SimpleMarket contract instance
 */
var getMatchingMarketContract =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var config;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getConfig.default)(environment);

          case 2:
            config = _context.sent;
            return _context.abrupt("return", environment.api.newContract(_MatchingMarketAbi.default, config.matchingMarketAddress));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getMatchingMarketContract(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getMatchingMarketContract;
exports.default = _default;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _PreminedAssetAbi = _interopRequireDefault(__webpack_require__(102));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getAddress = _interopRequireDefault(__webpack_require__(13));

/**
 * @returns the contract instance of a token by symbol
 */
var getTokenContract =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, symbol) {
    var config, tokenAddress;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getConfig.default)(environment);

          case 2:
            config = _context.sent;
            tokenAddress = (0, _getAddress.default)(config, symbol);
            return _context.abrupt("return", environment.api.newContract(_PreminedAssetAbi.default, tokenAddress));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getTokenContract(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getTokenContract;
exports.default = _default;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getTokenContract = _interopRequireDefault(__webpack_require__(21));

var _toReadable = _interopRequireDefault(__webpack_require__(9));

/**
 * @returns the balance of a token for an address
 */
var getBalance =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var tokenSymbol, ofAddress, config, tokenContract, result;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tokenSymbol = _ref.tokenSymbol, ofAddress = _ref.ofAddress;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            _context.next = 6;
            return (0, _getTokenContract.default)(environment, tokenSymbol);

          case 6:
            tokenContract = _context.sent;
            _context.next = 9;
            return tokenContract.instance.balanceOf.call({}, [ofAddress]);

          case 9:
            result = _context.sent;
            return _context.abrupt("return", (0, _toReadable.default)(config, result, tokenSymbol));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getBalance(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getBalance;
exports.default = _default;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("ethers-wallet");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("ethers-utils");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _findEventInLog = _interopRequireDefault(__webpack_require__(11));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getTokenContract = _interopRequireDefault(__webpack_require__(21));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

var _toProcessable = _interopRequireDefault(__webpack_require__(10));

/**
 * Approves `spender` to spend `quantity` of token with `symbol`
 * `from` given address
 *
 * @returns {true} if approval was succesfull
 */
var approve =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var symbol, spender, quantity, config, tokenContract, args, receipt, approvalLogEntry;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            symbol = _ref.symbol, spender = _ref.spender, quantity = _ref.quantity;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            _context.next = 6;
            return (0, _getTokenContract.default)(environment, symbol);

          case 6:
            tokenContract = _context.sent;
            args = [spender, (0, _toProcessable.default)(config, quantity, symbol)];
            _context.next = 10;
            return (0, _sendTransaction.default)(tokenContract, 'approve', args, environment);

          case 10:
            receipt = _context.sent;
            approvalLogEntry = (0, _findEventInLog.default)('Approval', receipt);
            return _context.abrupt("return", !!approvalLogEntry);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function approve(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = approve;
exports.default = _default;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Given a method name, this function returns the method signature of that function (from adapter contract), which then gets passed into callOnExchange function
 */
var getMethodNameSignature = function getMethodNameSignature(environment, methodName) {
  var signature;

  switch (methodName) {
    case 'makeOrder':
      signature = environment.api.util.abiSignature('makeOrder', ['address', 'address[5]', 'uint256[8]', 'bytes32', 'uint8', 'bytes32', 'bytes32']).slice(0, 10);
      break;

    case 'takeOrder':
      signature = environment.api.util.abiSignature('takeOrder', ['address', 'address[5]', 'uint256[8]', 'bytes32', 'uint8', 'bytes32', 'bytes32']).slice(0, 10);
      break;

    case 'cancelOrder':
      signature = environment.api.util.abiSignature('cancelOrder', ['address', 'address[5]', 'uint256[8]', 'bytes32', 'uint8', 'bytes32', 'bytes32']).slice(0, 10);
      break;

    default:
      throw new Error("No match found for method name ".concat(methodName));
  }

  return signature;
};

var _default = getMethodNameSignature;
exports.default = _default;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _StakingPriceFeedAbi = _interopRequireDefault(__webpack_require__(163));

/**
 * Gets contract instance of deployed canonical Pricefeed
 */
var getStakingPriceFeedContract =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, address) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", environment.api.newContract(_StakingPriceFeedAbi.default, address));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getStakingPriceFeedContract(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getStakingPriceFeedContract;
exports.default = _default;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getTokenInfo = _interopRequireDefault(__webpack_require__(44));

/**
 * Gets decimals of given `tokenSymbol`
 */
var getDecimals = function getDecimals(config, tokenSymbol) {
  return (0, _getTokenInfo.default)(config, tokenSymbol).decimals;
};

var _default = getDecimals;
exports.default = _default;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(12));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _toReadable = _interopRequireDefault(__webpack_require__(9));

var _getSymbol = _interopRequireDefault(__webpack_require__(17));

var _getExchangeAdapterContract = _interopRequireDefault(__webpack_require__(34));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

/**
 * Gets the normalised order from the exchange specified by `id`.
 * Only if the order is active, it has the fields `buy` and `sell`
 */
var getOrder =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var id, config, exchangeAdapterContract, isActive, owner, order, _order, sellWhichToken, buyWhichToken, sellHowMuch, buyHowMuch, enhancedOrder, sellSymbol, buySymbol;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = _ref.id;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            _context.next = 6;
            return (0, _getExchangeAdapterContract.default)(environment);

          case 6:
            exchangeAdapterContract = _context.sent;
            _context.next = 9;
            return exchangeAdapterContract.instance.isActive.call({}, [config.exchangeAddress, id]);

          case 9:
            isActive = _context.sent;
            _context.next = 12;
            return exchangeAdapterContract.instance.getOwner.call({}, [config.exchangeAddress, id]);

          case 12:
            owner = _context.sent;
            _context.next = 15;
            return exchangeAdapterContract.instance.getOrder.call({}, [config.exchangeAddress, id]);

          case 15:
            order = _context.sent;
            // if (isActive) console.log(isActive, order);
            _order = (0, _slicedToArray2.default)(order, 4), sellWhichToken = _order[0], buyWhichToken = _order[1], sellHowMuch = _order[2], buyHowMuch = _order[3];
            enhancedOrder = {
              id: id,
              owner: owner,
              isActive: isActive && sellWhichToken !== '0x0000000000000000000000000000000000000000' && buyWhichToken !== '0x0000000000000000000000000000000000000000'
            }; // inactive orders have token set to 0x0000... so only enhance active orders

            if (isActive) {
              sellSymbol = (0, _getSymbol.default)(config, sellWhichToken);
              buySymbol = (0, _getSymbol.default)(config, buyWhichToken);
              enhancedOrder.sell = {
                symbol: sellSymbol,
                howMuch: (0, _toReadable.default)(config, sellHowMuch, sellSymbol)
              };
              enhancedOrder.buy = {
                symbol: buySymbol,
                howMuch: (0, _toReadable.default)(config, buyHowMuch, buySymbol)
              };
            }

            return _context.abrupt("return", enhancedOrder);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getOrder(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getOrder;
exports.default = _default;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _addressBook = _interopRequireDefault(__webpack_require__(41));

var _getNetwork = _interopRequireDefault(__webpack_require__(33));

var getExchangeName =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, exchangeAddress) {
    var network;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getNetwork.default)(environment);

          case 2:
            network = _context.sent;
            _context.t0 = exchangeAddress;
            _context.next = _context.t0 === _addressBook.default[network].MatchingMarket ? 6 : _context.t0 === _addressBook.default[network].ZeroExExchange ? 7 : 8;
            break;

          case 6:
            return _context.abrupt("return", 'MatchingMarket');

          case 7:
            return _context.abrupt("return", 'ZeroEx');

          case 8:
            throw new Error("Exchange name not found for exchange with address ".concat(exchangeAddress));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getExchangeName(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getExchangeName;
exports.default = _default;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _CompetitionAbi = _interopRequireDefault(__webpack_require__(146));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

/**
 * Gets contract instance of deployed canonical Pricefeed
 */
var getOlympiadContract =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var config;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getConfig.default)(environment);

          case 2:
            config = _context.sent;
            return _context.abrupt("return", environment.api.newContract(_CompetitionAbi.default, config.olympiadAddress));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getOlympiadContract(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getOlympiadContract;
exports.default = _default;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getNetworkName = _interopRequireDefault(__webpack_require__(53));

var network;

var getNetwork =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (network) {
              _context.next = 4;
              break;
            }

            _context.next = 3;
            return environment.api.net.version();

          case 3:
            network = _context.sent;

          case 4:
            return _context.abrupt("return", (0, _getNetworkName.default)(network));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getNetwork(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getNetwork;
exports.default = _default;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _SimpleAdapterAbi = _interopRequireDefault(__webpack_require__(110));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

/**
 * Get deployed ExchangeAdapter contract instance
 */
var getExchangeAdapterContract =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var config;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getConfig.default)(environment);

          case 2:
            config = _context.sent;
            return _context.abrupt("return", environment.api.newContract(_SimpleAdapterAbi.default, config.exchangeAdapterAddress));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getExchangeAdapterContract(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getExchangeAdapterContract;
exports.default = _default;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("@parity/api");

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(12));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _findEventInLog = _interopRequireDefault(__webpack_require__(11));

var _getAddress = _interopRequireDefault(__webpack_require__(13));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

var _toProcessable = _interopRequireDefault(__webpack_require__(10));

var _getExchangeIndex = _interopRequireDefault(__webpack_require__(63));

var callOnExchange =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundContract, exchangeAddress, method, _ref$orderAddresses, maker, taker, makerAsset, takerAsset, feeRecipient, _ref$orderValues, makerQuantity, takerQuantity, makerFee, takerFee, timestamp, salt, fillTakerTokenAmount, _ref$orderValues$, dexySignatureMode, _ref$identifier, identifier, signature, config, exchangeIndex, v, r, s, args, receipt, updateLog;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundContract = _ref.fundContract, exchangeAddress = _ref.exchangeAddress, method = _ref.method, _ref$orderAddresses = (0, _slicedToArray2.default)(_ref.orderAddresses, 5), maker = _ref$orderAddresses[0], taker = _ref$orderAddresses[1], makerAsset = _ref$orderAddresses[2], takerAsset = _ref$orderAddresses[3], feeRecipient = _ref$orderAddresses[4], _ref$orderValues = (0, _slicedToArray2.default)(_ref.orderValues, 8), makerQuantity = _ref$orderValues[0], takerQuantity = _ref$orderValues[1], makerFee = _ref$orderValues[2], takerFee = _ref$orderValues[3], timestamp = _ref$orderValues[4], salt = _ref$orderValues[5], fillTakerTokenAmount = _ref$orderValues[6], _ref$orderValues$ = _ref$orderValues[7], dexySignatureMode = _ref$orderValues$ === void 0 ? 0 : _ref$orderValues$, _ref$identifier = _ref.identifier, identifier = _ref$identifier === void 0 ? 0 : _ref$identifier, signature = _ref.signature;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            _context.next = 6;
            return (0, _getExchangeIndex.default)(environment, exchangeAddress, fundContract.address);

          case 6:
            exchangeIndex = _context.sent;
            v = signature.v ? signature.v : 0;
            r = signature.r ? signature.r : '0x0';
            s = signature.s ? signature.s : '0x0';
            args = [exchangeIndex, method, [maker, taker, (0, _getAddress.default)(config, makerAsset), (0, _getAddress.default)(config, takerAsset), feeRecipient], [(0, _toProcessable.default)(config, makerQuantity, makerAsset, false), (0, _toProcessable.default)(config, takerQuantity, takerAsset, false), makerFee, takerFee, timestamp, salt, (0, _toProcessable.default)(config, fillTakerTokenAmount, takerAsset, false), dexySignatureMode], "0x".concat(Number(identifier).toString(16).padStart(64, '0')), v, r, s];
            _context.next = 13;
            return (0, _sendTransaction.default)(fundContract, 'callOnExchange', args, environment, {});

          case 13:
            receipt = _context.sent;
            updateLog = (0, _findEventInLog.default)('OrderUpdated', receipt);
            return _context.abrupt("return", updateLog);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function callOnExchange(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = callOnExchange;
exports.default = _default;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var providers = {
  INJECTED: 'Injected parity node',
  LOCAL: 'Local parity node',
  HOSTED: 'Hosted by us',
  NONE: 'No provider found'
};
var _default = providers;
exports.default = _default;

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/object/assign");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getAllowance", {
  enumerable: true,
  get: function get() {
    return _getAllowance.default;
  }
});
Object.defineProperty(exports, "getBalance", {
  enumerable: true,
  get: function get() {
    return _getBalance.default;
  }
});
Object.defineProperty(exports, "getTotalSupply", {
  enumerable: true,
  get: function get() {
    return _getTotalSupply.default;
  }
});
Object.defineProperty(exports, "getTokenContract", {
  enumerable: true,
  get: function get() {
    return _getTokenContract.default;
  }
});
Object.defineProperty(exports, "Address", {
  enumerable: true,
  get: function get() {
    return _Address.default;
  }
});
Object.defineProperty(exports, "TokenSymbol", {
  enumerable: true,
  get: function get() {
    return _TokenSymbol.default;
  }
});
Object.defineProperty(exports, "approve", {
  enumerable: true,
  get: function get() {
    return _approve.default;
  }
});
Object.defineProperty(exports, "ensureAllowance", {
  enumerable: true,
  get: function get() {
    return _ensureAllowance.default;
  }
});
Object.defineProperty(exports, "transferFrom", {
  enumerable: true,
  get: function get() {
    return _transferFrom.default;
  }
});
Object.defineProperty(exports, "transferTo", {
  enumerable: true,
  get: function get() {
    return _transferTo.default;
  }
});
Object.defineProperty(exports, "getAddress", {
  enumerable: true,
  get: function get() {
    return _getAddress.default;
  }
});
Object.defineProperty(exports, "getDecimals", {
  enumerable: true,
  get: function get() {
    return _getDecimals.default;
  }
});
Object.defineProperty(exports, "getSymbol", {
  enumerable: true,
  get: function get() {
    return _getSymbol.default;
  }
});
Object.defineProperty(exports, "getTokenInfo", {
  enumerable: true,
  get: function get() {
    return _getTokenInfo.default;
  }
});
Object.defineProperty(exports, "getWhiteListedAssets", {
  enumerable: true,
  get: function get() {
    return _getWhiteListedAssets.default;
  }
});
Object.defineProperty(exports, "toProcessable", {
  enumerable: true,
  get: function get() {
    return _toProcessable.default;
  }
});
Object.defineProperty(exports, "toReadable", {
  enumerable: true,
  get: function get() {
    return _toReadable.default;
  }
});
Object.defineProperty(exports, "getActiveOrders", {
  enumerable: true,
  get: function get() {
    return _getActiveOrders.default;
  }
});
Object.defineProperty(exports, "getFundRecentTrades", {
  enumerable: true,
  get: function get() {
    return _getFundRecentTrades.default;
  }
});
Object.defineProperty(exports, "getLastOrderId", {
  enumerable: true,
  get: function get() {
    return _getLastOrderId.default;
  }
});
Object.defineProperty(exports, "getOrder", {
  enumerable: true,
  get: function get() {
    return _getOrder.default;
  }
});
Object.defineProperty(exports, "getOrderbook", {
  enumerable: true,
  get: function get() {
    return _getOrderbook.default;
  }
});
Object.defineProperty(exports, "getRecentTrades", {
  enumerable: true,
  get: function get() {
    return _getRecentTrades.default;
  }
});
Object.defineProperty(exports, "getExchangeAdapterContract", {
  enumerable: true,
  get: function get() {
    return _getExchangeAdapterContract.default;
  }
});
Object.defineProperty(exports, "getMatchingMarketContract", {
  enumerable: true,
  get: function get() {
    return _getMatchingMarketContract.default;
  }
});
Object.defineProperty(exports, "onOrderUpdate", {
  enumerable: true,
  get: function get() {
    return _onOrderUpdate.default;
  }
});
Object.defineProperty(exports, "BuyOrSell", {
  enumerable: true,
  get: function get() {
    return _BuyOrSell.default;
  }
});
Object.defineProperty(exports, "Order", {
  enumerable: true,
  get: function get() {
    return _Order.default;
  }
});
Object.defineProperty(exports, "Trade", {
  enumerable: true,
  get: function get() {
    return _Trade.default;
  }
});
Object.defineProperty(exports, "cancelOrderFromAccount", {
  enumerable: true,
  get: function get() {
    return _cancelOrderFromAccount.default;
  }
});
Object.defineProperty(exports, "make0xOffChainOrder", {
  enumerable: true,
  get: function get() {
    return _make0xOffChainOrder.default;
  }
});
Object.defineProperty(exports, "makeOrderFromAccount", {
  enumerable: true,
  get: function get() {
    return _makeOrderFromAccount.default;
  }
});
Object.defineProperty(exports, "takeOrderFromAccount", {
  enumerable: true,
  get: function get() {
    return _takeOrderFromAccount.default;
  }
});
Object.defineProperty(exports, "averagePrice", {
  enumerable: true,
  get: function get() {
    return _averagePrice.default;
  }
});
Object.defineProperty(exports, "deserializeOrder", {
  enumerable: true,
  get: function get() {
    return _deserializeOrder.default;
  }
});
Object.defineProperty(exports, "getExchangeList", {
  enumerable: true,
  get: function get() {
    return _getExchangeList.default;
  }
});
Object.defineProperty(exports, "getExchangeName", {
  enumerable: true,
  get: function get() {
    return _getExchangeName.default;
  }
});
Object.defineProperty(exports, "getMethodNameSignature", {
  enumerable: true,
  get: function get() {
    return _getMethodNameSignature.default;
  }
});
Object.defineProperty(exports, "getPrices", {
  enumerable: true,
  get: function get() {
    return _getPrices.default;
  }
});
Object.defineProperty(exports, "matchOrders", {
  enumerable: true,
  get: function get() {
    return _matchOrders.default;
  }
});
Object.defineProperty(exports, "serializeOrder", {
  enumerable: true,
  get: function get() {
    return _serializeOrder.default;
  }
});
Object.defineProperty(exports, "getExchangeIndex", {
  enumerable: true,
  get: function get() {
    return _getExchangeIndex.default;
  }
});
Object.defineProperty(exports, "getFundInformations", {
  enumerable: true,
  get: function get() {
    return _getFundInformations.default;
  }
});
Object.defineProperty(exports, "getHoldingsAndPrices", {
  enumerable: true,
  get: function get() {
    return _getHoldingsAndPrices.default;
  }
});
Object.defineProperty(exports, "getModules", {
  enumerable: true,
  get: function get() {
    return _getModules.default;
  }
});
Object.defineProperty(exports, "getOpenOrders", {
  enumerable: true,
  get: function get() {
    return _getOpenOrders.default;
  }
});
Object.defineProperty(exports, "getOrdersHistory", {
  enumerable: true,
  get: function get() {
    return _getOrdersHistory.default;
  }
});
Object.defineProperty(exports, "getParticipationAuthorizations", {
  enumerable: true,
  get: function get() {
    return _getParticipationAuthorizations.default;
  }
});
Object.defineProperty(exports, "getRequestsHistory", {
  enumerable: true,
  get: function get() {
    return _getRequestsHistory.default;
  }
});
Object.defineProperty(exports, "getStake", {
  enumerable: true,
  get: function get() {
    return _getStake.default;
  }
});
Object.defineProperty(exports, "isShutDown", {
  enumerable: true,
  get: function get() {
    return _isShutDown.default;
  }
});
Object.defineProperty(exports, "performCalculations", {
  enumerable: true,
  get: function get() {
    return _performCalculations.default;
  }
});
Object.defineProperty(exports, "getFundContract", {
  enumerable: true,
  get: function get() {
    return _getFundContract.default;
  }
});
Object.defineProperty(exports, "preflightMakeOrder", {
  enumerable: true,
  get: function get() {
    return _preflightMakeOrder.default;
  }
});
Object.defineProperty(exports, "preflightTakeOrder", {
  enumerable: true,
  get: function get() {
    return _preflightTakeOrder.default;
  }
});
Object.defineProperty(exports, "calcSharePriceAndConvertFees", {
  enumerable: true,
  get: function get() {
    return _calcSharePriceAndConvertFees.default;
  }
});
Object.defineProperty(exports, "callOnExchange", {
  enumerable: true,
  get: function get() {
    return _callOnExchange.default;
  }
});
Object.defineProperty(exports, "cancelOrder", {
  enumerable: true,
  get: function get() {
    return _cancelOrder.default;
  }
});
Object.defineProperty(exports, "makeOrder", {
  enumerable: true,
  get: function get() {
    return _makeOrder.default;
  }
});
Object.defineProperty(exports, "shutDownFund", {
  enumerable: true,
  get: function get() {
    return _shutDownFund.default;
  }
});
Object.defineProperty(exports, "takeMultipleOrders", {
  enumerable: true,
  get: function get() {
    return _takeMultipleOrders.default;
  }
});
Object.defineProperty(exports, "takeOrder", {
  enumerable: true,
  get: function get() {
    return _takeOrder.default;
  }
});
Object.defineProperty(exports, "toggleInvestment", {
  enumerable: true,
  get: function get() {
    return _toggleInvestment.default;
  }
});
Object.defineProperty(exports, "toggleRedemption", {
  enumerable: true,
  get: function get() {
    return _toggleRedemption.default;
  }
});
Object.defineProperty(exports, "getRegistrantFund", {
  enumerable: true,
  get: function get() {
    return _getRegistrantFund.default;
  }
});
Object.defineProperty(exports, "getOlympiadContract", {
  enumerable: true,
  get: function get() {
    return _getOlympiadContract.default;
  }
});
Object.defineProperty(exports, "claimReward", {
  enumerable: true,
  get: function get() {
    return _claimReward.default;
  }
});
Object.defineProperty(exports, "registerForCompetition", {
  enumerable: true,
  get: function get() {
    return _registerForCompetition.default;
  }
});
Object.defineProperty(exports, "signOlympiadTermsAndConditions", {
  enumerable: true,
  get: function get() {
    return _signOlympiadTermsAndConditions.default;
  }
});
Object.defineProperty(exports, "getLastRequest", {
  enumerable: true,
  get: function get() {
    return _getLastRequest.default;
  }
});
Object.defineProperty(exports, "getParticipation", {
  enumerable: true,
  get: function get() {
    return _getParticipation.default;
  }
});
Object.defineProperty(exports, "isInvestmentRequestPermittedAndAllowed", {
  enumerable: true,
  get: function get() {
    return _isInvestmentRequestPermittedAndAllowed.default;
  }
});
Object.defineProperty(exports, "requestStatus", {
  enumerable: true,
  get: function get() {
    return _requestStatus.default;
  }
});
Object.defineProperty(exports, "requestTypes", {
  enumerable: true,
  get: function get() {
    return _requestTypes.default;
  }
});
Object.defineProperty(exports, "getComplianceContract", {
  enumerable: true,
  get: function get() {
    return _getComplianceContract.default;
  }
});
Object.defineProperty(exports, "executeRequest", {
  enumerable: true,
  get: function get() {
    return _executeRequest.default;
  }
});
Object.defineProperty(exports, "invest", {
  enumerable: true,
  get: function get() {
    return _invest.default;
  }
});
Object.defineProperty(exports, "list", {
  enumerable: true,
  get: function get() {
    return _list.default;
  }
});
Object.defineProperty(exports, "redeem", {
  enumerable: true,
  get: function get() {
    return _redeem.default;
  }
});
Object.defineProperty(exports, "redeemAllOwnedAssets", {
  enumerable: true,
  get: function get() {
    return _redeemAllOwnedAssets.default;
  }
});
Object.defineProperty(exports, "getNextEpochTime", {
  enumerable: true,
  get: function get() {
    return _getNextEpochTime.default;
  }
});
Object.defineProperty(exports, "getOperators", {
  enumerable: true,
  get: function get() {
    return _getOperators.default;
  }
});
Object.defineProperty(exports, "getPrice", {
  enumerable: true,
  get: function get() {
    return _getPrice.default;
  }
});
Object.defineProperty(exports, "getPriceByPriceFeed", {
  enumerable: true,
  get: function get() {
    return _getPriceByPriceFeed.default;
  }
});
Object.defineProperty(exports, "getPriceFeedsByOwner", {
  enumerable: true,
  get: function get() {
    return _getPriceFeedsByOwner.default;
  }
});
Object.defineProperty(exports, "getQuoteAssetSymbol", {
  enumerable: true,
  get: function get() {
    return _getQuoteAssetSymbol.default;
  }
});
Object.defineProperty(exports, "getRegisteredAssets", {
  enumerable: true,
  get: function get() {
    return _getRegisteredAssets.default;
  }
});
Object.defineProperty(exports, "getStakersAndAmounts", {
  enumerable: true,
  get: function get() {
    return _getStakersAndAmounts.default;
  }
});
Object.defineProperty(exports, "getStakingPriceFeedOwner", {
  enumerable: true,
  get: function get() {
    return _getStakingPriceFeedOwner.default;
  }
});
Object.defineProperty(exports, "getStakingToken", {
  enumerable: true,
  get: function get() {
    return _getStakingToken.default;
  }
});
Object.defineProperty(exports, "getTotalStaked", {
  enumerable: true,
  get: function get() {
    return _getTotalStaked.default;
  }
});
Object.defineProperty(exports, "getTotalStakedByAddr", {
  enumerable: true,
  get: function get() {
    return _getTotalStakedByAddr.default;
  }
});
Object.defineProperty(exports, "getUpdateInterval", {
  enumerable: true,
  get: function get() {
    return _getUpdateInterval.default;
  }
});
Object.defineProperty(exports, "hasRecentPrice", {
  enumerable: true,
  get: function get() {
    return _hasRecentPrice.default;
  }
});
Object.defineProperty(exports, "getCanonicalPriceFeedContract", {
  enumerable: true,
  get: function get() {
    return _getCanonicalPriceFeedContract.default;
  }
});
Object.defineProperty(exports, "getPriceFeedContract", {
  enumerable: true,
  get: function get() {
    return _getPriceFeedContract.default;
  }
});
Object.defineProperty(exports, "getStakingPriceFeedContract", {
  enumerable: true,
  get: function get() {
    return _getStakingPriceFeedContract.default;
  }
});
Object.defineProperty(exports, "awaitDataFeedUpdates", {
  enumerable: true,
  get: function get() {
    return _awaitDataFeedUpdates.default;
  }
});
Object.defineProperty(exports, "collectAndUpdate", {
  enumerable: true,
  get: function get() {
    return _collectAndUpdate.default;
  }
});
Object.defineProperty(exports, "depositStake", {
  enumerable: true,
  get: function get() {
    return _depositStake.default;
  }
});
Object.defineProperty(exports, "setupPriceFeed", {
  enumerable: true,
  get: function get() {
    return _setupPriceFeed.default;
  }
});
Object.defineProperty(exports, "updatePriceFeed", {
  enumerable: true,
  get: function get() {
    return _updatePriceFeed.default;
  }
});
Object.defineProperty(exports, "withdrawStake", {
  enumerable: true,
  get: function get() {
    return _withdrawStake.default;
  }
});
Object.defineProperty(exports, "isMakePermitted", {
  enumerable: true,
  get: function get() {
    return _isMakePermitted.default;
  }
});
Object.defineProperty(exports, "isTakePermitted", {
  enumerable: true,
  get: function get() {
    return _isTakePermitted.default;
  }
});
Object.defineProperty(exports, "getRiskManagementContract", {
  enumerable: true,
  get: function get() {
    return _getRiskManagementContract.default;
  }
});
Object.defineProperty(exports, "networks", {
  enumerable: true,
  get: function get() {
    return _networks.default;
  }
});
Object.defineProperty(exports, "providers", {
  enumerable: true,
  get: function get() {
    return _providers.default;
  }
});
Object.defineProperty(exports, "Environment", {
  enumerable: true,
  get: function get() {
    return _Environment.default;
  }
});
Object.defineProperty(exports, "getAccountAddress", {
  enumerable: true,
  get: function get() {
    return _getAccountAddress.default;
  }
});
Object.defineProperty(exports, "getEnvironment", {
  enumerable: true,
  get: function get() {
    return _getEnvironment.default;
  }
});
Object.defineProperty(exports, "getNetwork", {
  enumerable: true,
  get: function get() {
    return _getNetwork.default;
  }
});
Object.defineProperty(exports, "isExternalSigner", {
  enumerable: true,
  get: function get() {
    return _isExternalSigner.default;
  }
});
Object.defineProperty(exports, "isValidEnvironment", {
  enumerable: true,
  get: function get() {
    return _isValidEnvironment.default;
  }
});
Object.defineProperty(exports, "setEnvironment", {
  enumerable: true,
  get: function get() {
    return _setEnvironment.default;
  }
});
Object.defineProperty(exports, "extractEventDefinitions", {
  enumerable: true,
  get: function get() {
    return _extractEventDefinitions.default;
  }
});
Object.defineProperty(exports, "findEventInLog", {
  enumerable: true,
  get: function get() {
    return _findEventInLog.default;
  }
});
Object.defineProperty(exports, "gasBoost", {
  enumerable: true,
  get: function get() {
    return _gasBoost.default;
  }
});
Object.defineProperty(exports, "getNetworkName", {
  enumerable: true,
  get: function get() {
    return _getNetworkName.default;
  }
});
Object.defineProperty(exports, "onBlock", {
  enumerable: true,
  get: function get() {
    return _onBlock.default;
  }
});
Object.defineProperty(exports, "parseEvent", {
  enumerable: true,
  get: function get() {
    return _parseEvent.default;
  }
});
Object.defineProperty(exports, "sendEther", {
  enumerable: true,
  get: function get() {
    return _sendEther.default;
  }
});
Object.defineProperty(exports, "ensure", {
  enumerable: true,
  get: function get() {
    return _ensure.default;
  }
});
Object.defineProperty(exports, "getKeyByValue", {
  enumerable: true,
  get: function get() {
    return _getKeyByValue.default;
  }
});
Object.defineProperty(exports, "isPromise", {
  enumerable: true,
  get: function get() {
    return _isPromise.default;
  }
});
Object.defineProperty(exports, "isValidId", {
  enumerable: true,
  get: function get() {
    return _isValidId.default;
  }
});
Object.defineProperty(exports, "resolvePromiseObject", {
  enumerable: true,
  get: function get() {
    return _resolvePromiseObject.default;
  }
});
Object.defineProperty(exports, "rush", {
  enumerable: true,
  get: function get() {
    return _rush.default;
  }
});
Object.defineProperty(exports, "toDate", {
  enumerable: true,
  get: function get() {
    return _toDate.default;
  }
});
Object.defineProperty(exports, "trace", {
  enumerable: true,
  get: function get() {
    return _trace.default;
  }
});
Object.defineProperty(exports, "getPastEvents", {
  enumerable: true,
  get: function get() {
    return _getPastEvents.default;
  }
});
Object.defineProperty(exports, "constructTransactionObject", {
  enumerable: true,
  get: function get() {
    return _constructTransactionObject.default;
  }
});
Object.defineProperty(exports, "getParityProvider", {
  enumerable: true,
  get: function get() {
    return _getParityProvider.default;
  }
});
Object.defineProperty(exports, "sendTransaction", {
  enumerable: true,
  get: function get() {
    return _sendTransaction.default;
  }
});
Object.defineProperty(exports, "createWallet", {
  enumerable: true,
  get: function get() {
    return _createWallet.default;
  }
});
Object.defineProperty(exports, "decryptWallet", {
  enumerable: true,
  get: function get() {
    return _decryptWallet.default;
  }
});
Object.defineProperty(exports, "encryptWallet", {
  enumerable: true,
  get: function get() {
    return _encryptWallet.default;
  }
});
Object.defineProperty(exports, "importWalletFromMnemonic", {
  enumerable: true,
  get: function get() {
    return _importWalletFromMnemonic.default;
  }
});
Object.defineProperty(exports, "getConfig", {
  enumerable: true,
  get: function get() {
    return _getConfig.default;
  }
});
Object.defineProperty(exports, "getFundForManager", {
  enumerable: true,
  get: function get() {
    return _getFundForManager.default;
  }
});
Object.defineProperty(exports, "getFundMapping", {
  enumerable: true,
  get: function get() {
    return _getFundMapping.default;
  }
});
Object.defineProperty(exports, "getFunds", {
  enumerable: true,
  get: function get() {
    return _getFunds.default;
  }
});
Object.defineProperty(exports, "getManagersMapping", {
  enumerable: true,
  get: function get() {
    return _getManagersMapping.default;
  }
});
Object.defineProperty(exports, "getNativeAssetSymbol", {
  enumerable: true,
  get: function get() {
    return _getNativeAssetSymbol.default;
  }
});
Object.defineProperty(exports, "getRanking", {
  enumerable: true,
  get: function get() {
    return _getRanking.default;
  }
});
Object.defineProperty(exports, "getSubscriptionHistory", {
  enumerable: true,
  get: function get() {
    return _getSubscriptionHistory.default;
  }
});
Object.defineProperty(exports, "getRankingContract", {
  enumerable: true,
  get: function get() {
    return _getRankingContract.default;
  }
});
Object.defineProperty(exports, "getVersionContract", {
  enumerable: true,
  get: function get() {
    return _getVersionContract.default;
  }
});
Object.defineProperty(exports, "melonTracker", {
  enumerable: true,
  get: function get() {
    return _melonTracker.default;
  }
});
Object.defineProperty(exports, "setupFund", {
  enumerable: true,
  get: function get() {
    return _setupFund.default;
  }
});
Object.defineProperty(exports, "signCompetitionTermsAndConditions", {
  enumerable: true,
  get: function get() {
    return _signCompetitionTermsAndConditions.default;
  }
});
Object.defineProperty(exports, "signTermsAndConditions", {
  enumerable: true,
  get: function get() {
    return _signTermsAndConditions.default;
  }
});

var _getAllowance = _interopRequireDefault(__webpack_require__(51));

var _getBalance = _interopRequireDefault(__webpack_require__(22));

var _getTotalSupply = _interopRequireDefault(__webpack_require__(103));

var _getTokenContract = _interopRequireDefault(__webpack_require__(21));

var _Address = _interopRequireDefault(__webpack_require__(104));

var _TokenSymbol = _interopRequireDefault(__webpack_require__(105));

var _approve = _interopRequireDefault(__webpack_require__(25));

var _ensureAllowance = _interopRequireDefault(__webpack_require__(107));

var _transferFrom = _interopRequireDefault(__webpack_require__(108));

var _transferTo = _interopRequireDefault(__webpack_require__(109));

var _getAddress = _interopRequireDefault(__webpack_require__(13));

var _getDecimals = _interopRequireDefault(__webpack_require__(29));

var _getSymbol = _interopRequireDefault(__webpack_require__(17));

var _getTokenInfo = _interopRequireDefault(__webpack_require__(44));

var _getWhiteListedAssets = _interopRequireDefault(__webpack_require__(57));

var _toProcessable = _interopRequireDefault(__webpack_require__(10));

var _toReadable = _interopRequireDefault(__webpack_require__(9));

var _getActiveOrders = _interopRequireDefault(__webpack_require__(61));

var _getFundRecentTrades = _interopRequireDefault(__webpack_require__(111));

var _getLastOrderId = _interopRequireDefault(__webpack_require__(113));

var _getOrder = _interopRequireDefault(__webpack_require__(30));

var _getOrderbook = _interopRequireDefault(__webpack_require__(114));

var _getRecentTrades = _interopRequireDefault(__webpack_require__(62));

var _getExchangeAdapterContract = _interopRequireDefault(__webpack_require__(34));

var _getMatchingMarketContract = _interopRequireDefault(__webpack_require__(20));

var _onOrderUpdate = _interopRequireDefault(__webpack_require__(115));

var _BuyOrSell = _interopRequireDefault(__webpack_require__(116));

var _Order = _interopRequireDefault(__webpack_require__(117));

var _Trade = _interopRequireDefault(__webpack_require__(118));

var _cancelOrderFromAccount = _interopRequireDefault(__webpack_require__(119));

var _make0xOffChainOrder = _interopRequireDefault(__webpack_require__(120));

var _makeOrderFromAccount = _interopRequireDefault(__webpack_require__(122));

var _takeOrderFromAccount = _interopRequireDefault(__webpack_require__(123));

var _averagePrice = _interopRequireDefault(__webpack_require__(124));

var _deserializeOrder = _interopRequireDefault(__webpack_require__(125));

var _getExchangeList = _interopRequireDefault(__webpack_require__(126));

var _getExchangeName = _interopRequireDefault(__webpack_require__(31));

var _getMethodNameSignature = _interopRequireDefault(__webpack_require__(26));

var _getPrices = _interopRequireDefault(__webpack_require__(45));

var _matchOrders = _interopRequireDefault(__webpack_require__(127));

var _serializeOrder = _interopRequireDefault(__webpack_require__(128));

var _getExchangeIndex = _interopRequireDefault(__webpack_require__(63));

var _getFundInformations = _interopRequireDefault(__webpack_require__(64));

var _getHoldingsAndPrices = _interopRequireDefault(__webpack_require__(130));

var _getModules = _interopRequireDefault(__webpack_require__(131));

var _getOpenOrders = _interopRequireDefault(__webpack_require__(132));

var _getOrdersHistory = _interopRequireDefault(__webpack_require__(66));

var _getParticipationAuthorizations = _interopRequireDefault(__webpack_require__(133));

var _getRequestsHistory = _interopRequireDefault(__webpack_require__(134));

var _getStake = _interopRequireDefault(__webpack_require__(135));

var _isShutDown = _interopRequireDefault(__webpack_require__(136));

var _performCalculations = _interopRequireDefault(__webpack_require__(137));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

var _preflightMakeOrder = _interopRequireDefault(__webpack_require__(68));

var _preflightTakeOrder = _interopRequireDefault(__webpack_require__(70));

var _calcSharePriceAndConvertFees = _interopRequireDefault(__webpack_require__(139));

var _callOnExchange = _interopRequireDefault(__webpack_require__(36));

var _cancelOrder = _interopRequireDefault(__webpack_require__(140));

var _makeOrder = _interopRequireDefault(__webpack_require__(141));

var _shutDownFund = _interopRequireDefault(__webpack_require__(142));

var _takeMultipleOrders = _interopRequireDefault(__webpack_require__(143));

var _takeOrder = _interopRequireDefault(__webpack_require__(72));

var _toggleInvestment = _interopRequireDefault(__webpack_require__(144));

var _toggleRedemption = _interopRequireDefault(__webpack_require__(145));

var _getRegistrantFund = _interopRequireDefault(__webpack_require__(73));

var _getOlympiadContract = _interopRequireDefault(__webpack_require__(32));

var _claimReward = _interopRequireDefault(__webpack_require__(147));

var _registerForCompetition = _interopRequireDefault(__webpack_require__(148));

var _signOlympiadTermsAndConditions = _interopRequireDefault(__webpack_require__(149));

var _getLastRequest = _interopRequireDefault(__webpack_require__(150));

var _getParticipation = _interopRequireDefault(__webpack_require__(49));

var _isInvestmentRequestPermittedAndAllowed = _interopRequireDefault(__webpack_require__(75));

var _requestStatus = _interopRequireDefault(__webpack_require__(152));

var _requestTypes = _interopRequireDefault(__webpack_require__(153));

var _getComplianceContract = _interopRequireDefault(__webpack_require__(76));

var _executeRequest = _interopRequireDefault(__webpack_require__(155));

var _invest = _interopRequireDefault(__webpack_require__(156));

var _list = _interopRequireDefault(__webpack_require__(157));

var _redeem = _interopRequireDefault(__webpack_require__(158));

var _redeemAllOwnedAssets = _interopRequireDefault(__webpack_require__(159));

var _getNextEpochTime = _interopRequireDefault(__webpack_require__(160));

var _getOperators = _interopRequireDefault(__webpack_require__(161));

var _getPrice = _interopRequireDefault(__webpack_require__(65));

var _getPriceByPriceFeed = _interopRequireDefault(__webpack_require__(162));

var _getPriceFeedsByOwner = _interopRequireDefault(__webpack_require__(164));

var _getQuoteAssetSymbol = _interopRequireDefault(__webpack_require__(56));

var _getRegisteredAssets = _interopRequireDefault(__webpack_require__(165));

var _getStakersAndAmounts = _interopRequireDefault(__webpack_require__(166));

var _getStakingPriceFeedOwner = _interopRequireDefault(__webpack_require__(167));

var _getStakingToken = _interopRequireDefault(__webpack_require__(168));

var _getTotalStaked = _interopRequireDefault(__webpack_require__(169));

var _getTotalStakedByAddr = _interopRequireDefault(__webpack_require__(170));

var _getUpdateInterval = _interopRequireDefault(__webpack_require__(171));

var _hasRecentPrice = _interopRequireDefault(__webpack_require__(77));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var _getPriceFeedContract = _interopRequireDefault(__webpack_require__(74));

var _getStakingPriceFeedContract = _interopRequireDefault(__webpack_require__(27));

var _awaitDataFeedUpdates = _interopRequireDefault(__webpack_require__(172));

var _collectAndUpdate = _interopRequireDefault(__webpack_require__(173));

var _depositStake = _interopRequireDefault(__webpack_require__(174));

var _setupPriceFeed = _interopRequireDefault(__webpack_require__(175));

var _updatePriceFeed = _interopRequireDefault(__webpack_require__(176));

var _withdrawStake = _interopRequireDefault(__webpack_require__(177));

var _isMakePermitted = _interopRequireDefault(__webpack_require__(69));

var _isTakePermitted = _interopRequireDefault(__webpack_require__(71));

var _getRiskManagementContract = _interopRequireDefault(__webpack_require__(48));

var _networks = _interopRequireDefault(__webpack_require__(55));

var _providers = _interopRequireDefault(__webpack_require__(37));

var _Environment = _interopRequireDefault(__webpack_require__(178));

var _getAccountAddress = _interopRequireDefault(__webpack_require__(78));

var _getEnvironment = _interopRequireDefault(__webpack_require__(79));

var _getNetwork = _interopRequireDefault(__webpack_require__(33));

var _isExternalSigner = _interopRequireDefault(__webpack_require__(179));

var _isValidEnvironment = _interopRequireDefault(__webpack_require__(80));

var _setEnvironment = _interopRequireDefault(__webpack_require__(182));

var _extractEventDefinitions = _interopRequireDefault(__webpack_require__(183));

var _findEventInLog = _interopRequireDefault(__webpack_require__(11));

var _gasBoost = _interopRequireDefault(__webpack_require__(58));

var _getNetworkName = _interopRequireDefault(__webpack_require__(53));

var _onBlock = _interopRequireDefault(__webpack_require__(184));

var _parseEvent = _interopRequireDefault(__webpack_require__(185));

var _sendEther = _interopRequireDefault(__webpack_require__(186));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var _getKeyByValue = _interopRequireDefault(__webpack_require__(187));

var _isPromise = _interopRequireDefault(__webpack_require__(84));

var _isValidId = _interopRequireDefault(__webpack_require__(67));

var _resolvePromiseObject = _interopRequireDefault(__webpack_require__(82));

var _rush = _interopRequireDefault(__webpack_require__(47));

var _toDate = _interopRequireDefault(__webpack_require__(16));

var _trace = _interopRequireDefault(__webpack_require__(59));

var _getPastEvents = _interopRequireDefault(__webpack_require__(188));

var _constructTransactionObject = _interopRequireDefault(__webpack_require__(60));

var _getParityProvider = _interopRequireDefault(__webpack_require__(189));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

var _createWallet = _interopRequireDefault(__webpack_require__(192));

var _decryptWallet = _interopRequireDefault(__webpack_require__(194));

var _encryptWallet = _interopRequireDefault(__webpack_require__(195));

var _importWalletFromMnemonic = _interopRequireDefault(__webpack_require__(196));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getFundForManager = _interopRequireDefault(__webpack_require__(197));

var _getFundMapping = _interopRequireDefault(__webpack_require__(198));

var _getFunds = _interopRequireDefault(__webpack_require__(199));

var _getManagersMapping = _interopRequireDefault(__webpack_require__(200));

var _getNativeAssetSymbol = _interopRequireDefault(__webpack_require__(52));

var _getRanking = _interopRequireDefault(__webpack_require__(201));

var _getSubscriptionHistory = _interopRequireDefault(__webpack_require__(203));

var _getRankingContract = _interopRequireDefault(__webpack_require__(85));

var _getVersionContract = _interopRequireDefault(__webpack_require__(15));

var _melonTracker = _interopRequireDefault(__webpack_require__(204));

var _setupFund = _interopRequireDefault(__webpack_require__(205));

var _signCompetitionTermsAndConditions = _interopRequireDefault(__webpack_require__(206));

var _signTermsAndConditions = _interopRequireDefault(__webpack_require__(207));

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = {"melon":{"PriceFeed":"0x77Ca8B28C204517C6b8AB0B1E6B96866a9D727f6","SimpleMarket":"0x063b0b868e99c9217323bb501d7762090889Ed9E","NoCompliance":"0xB582Fe03521E6e26C22B86106851e2B07FEB2ddC","RMMakeOrders":"0xc5c0B82D87e89c227B646B5A57aD02948D7526cC","Governance":"0x8628183a70aB9C77dd47b4128501d502d559f0c0","simpleAdapter":"0x7F310A41815de176feDFF8c3E108b609e376DB26","Version":"0x1a1255c55aF2b03044c9b0DAD2113c577fC0F29e","MlnToken":"0x3745Cea1Ea3a84a8d1F6a7E2194b6C1f6EE4c94B","EurToken":"0x7D2B40C55846fC13d65981B063Ad9E50D48fab32","EthToken":"0xB66F2Eda5C484f1a31E60B30161948107A4E982B","Fund":"0x5EabB60c0A989B822beEe553D7e0b562BB5bAb2B"},"development":{"Governance":"0x22e53CccFF701644B1a979856422923a8180a29c","EthToken":"0x1B62B8006009c4Bec5770e2E4C152b7b87c43997","MlnToken":"0xcbFeBC35a180ebB7558A0fb245fB7dBB588fb171","EurToken":"0x50b629a5365DB16768d49895C9184e8Be06B9da9","CanonicalPriceFeed":"0x470F9788a6b294f51C2E144523E6741b1b7addBE","SimplePriceFeed":"0xB8968aA47C5dC3637008f9900E451386825F7425","SimpleMarket":"0x2bda9c8D7AE1375A39Bd731d2AF42920e44E437f","NoCompliance":"0x2D564CA7811135ba738D612c0D7fdEb5da675754","RMMakeOrders":"0x3c32BFC04Eb6C023FDf57c2C001737B0671d7CC6","SimpleAdapter":"0x7a2C77a2802a9F3ea7CAC15545c69151fc0dAF7E","CentralizedAdapter":"0xa74A36CDE25Adc0aE816cC322947BF6729aB8C52","Version":"0x0C89493d901162695519813E1ce9a379F2951cC9","FundRanking":"0xfb20D9E8A48928F50E846Ee9B9f6B2eB190d0576"},"kovan":{"Governance":"0x03286b52843541360E84084c1A8e8E6E00c8E95e","CanonicalPriceFeed":"0xb0C791fa9797B31B8aEF784FE2068fDB685bA685","MatchingMarket":"0xEDf27edCB96886F87df95c865De7Fa48f1A76dc8","MatchingMarketAdapter":"0xAebFF6A26FAc6C06dF9e264f0bf96e9614617C88","ZeroExTokenTransferProxy":"0x2A3A66955699f9481E1cE649CeBE335d9B3C1488","ZeroExExchange":"0x55287a08B9f1bE2a1F9A6E8E88377A0f70C4f445","ZeroExV1Adapter":"0x02a6486d0bef92C49552cf90be3F3e92BfFdEbb5","NoCompliance":"0x14fb60c4b832DF80F2C8E5EDC87B2525d3f5f085","OnlyManager":"0x871df91EDad29e23c15C173845B31d60303448D1","RMMakeOrders":"0x68c5613E827a3f8882b92F557CC27Ca0b3c49b52","CentralizedAdapter":"0xCe2a5A17eeBF08Abe606090b517A4cdE2eD18D3a","OnlyManagerCompetition":"0x5f44118CE55bf8b6E6ED75a8beB1d318c6439971","Version":"0x25B0Be6B8Cd2A72A8A1991c4af26E796243cc6fF","FundRanking":"0x0e0EF6257569b428c058317722494f21Df38E1C2","Competition":"0xc3269F7b9FC42492C9A7297d6f86068e510c7093"},"live":{"FundRanking":"0x1013D5F34d934b052768799efa18cf1aC7423778","PriceFeed":"0x79A8Ddb299Bb4Af1f9ee206AF9689dD687d8EdE4","NoCompliance":"0xdD99ea2d4BD06451b119f07673979c5A4842C656","OnlyManager":"0xFb5978C7ca78074B2044034CbdbC3f2E03Dfe2bA","RMMakeOrders":"0x562fc9fc8c7284ea01645dd0629020bcc7220fd5","SimpleAdapter":"0x703805ae406016d5fb716f805F07821018A38922","Governance":"0x73185bc2a1aa75ec49ba9239b28ea22fda5940fa","Version":"0x931Dddf00c66C132FC6452F546e8a0e831685F70"}}

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/object/keys");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

// this file tracks addresses of tokens relevant to the Melon protocol
module.exports = {
  kovan: {
    'CHF-T': {
      address: '0x0000000000000000000000000000000000000000',
      name: 'Swiss Franc token (dummy)',
      decimals: 18,
      url: '',
      ipfsHash: ''
    },
    'ANT-T': {
      address: '0x560848C7a470b9aA87F7283FDb31bD6773771660',
      name: 'Aragon Network Token',
      decimals: 18,
      url: 'https://aragon.one/',
      ipfsHash: '',
    },
    'AVT-T': {
      address: '0x3f9cf17C8cC1883B75AE9a532597340564601538',
      name: 'AventCoin',
      decimals: 18,
      url: 'https://aventus.io/',
      ipfsHash: '',
    },
    'BNT-T': {
      address: '0x79Fe4882428F457C086Be4584e3E164C13F2017e',
      name: 'Bancor Network Token',
      decimals: 18,
      url: 'https://www.bancor.network/',
      ipfsHash: '',
    },
    'BAT-T': {
      address: '0x47eB525440e976387b80b41cB22CF4dc0A7E9Db0',
      name: 'Basic Attention Token',
      decimals: 18,
      url: 'https://www.basicattentiontoken.org/',
      ipfsHash: '',
    },
    'BTC-T': {
      address: '0x3824e72d60Ec60f3f02ae172de7c37C59876cC14',
      name: 'Bitcoin Token',
      decimals: 8,
      url: 'https://bitcoin.org/en/',
      ipfsHash: '',
    },
    'DGD-T': {
      address: '0xe67E7cE765b67AA1Dcd731458eD50C04BfC78d74',
      name: 'Digix Dao Token',
      decimals: 9,
      url: 'https://dgx.io/',
      ipfsHash: '',
    },
    'DGX-T': {
      address: '0xc6194A293784FC652488c0570759E2eBb8456104',
      name: 'Digix Gold Token',
      decimals: 9,
      url: 'https://dgx.io/',
      ipfsHash: '',
    },
    'DOGE-T': {
      address: '0x1cbe9e3FeD97A51BA6bef63C00124aAea8411a78',
      name: 'Dogecoin Token',
      decimals: 8,
      url: 'http://dogecoin.com/',
      ipfsHash: '',
    },
    'ETC-T': {
      address: '0x8D57263632EFDC077b5417Baa434f8Fa9365A1d7',
      name: 'Ether Classic Token',
      decimals: 18,
      url: 'https://ethereumclassic.github.io/',
      ipfsHash: '',
    },
    'ETH-T': {
      address: '0x26bB6da136a71Aa8D62D488BD3C91cC2151F029b',
      name: 'Ether Token',
      decimals: 18,
      url: 'https://ethereum.org/',
      ipfsHash: '',
    },
    'EUR-T': {
      address: '0x6d49eB0E3bDef4F907d3952AC4Cab06c3ea9fE6b',
      name: 'Euro Token',
      decimals: 8,
      url: 'https://www.decentralizedcapital.com/#!/',
      ipfsHash: '',
    },
    'GNO-T': {
      address: '0x89C6dd6A72E2e5838B1CfDc1059Dad22CE4b6A4b',
      name: 'Gnosis Token',
      decimals: 18,
      url: 'https://gnosis.pm/',
      ipfsHash: '',
    },
    'GNT-T': {
      address: '0x3A3c7f4eF0589F18eFEc7EBA767EdAe3e73B95cD',
      name: 'Golem Network Token',
      decimals: 18,
      url: 'https://golem.network/',
      ipfsHash: '',
    },
    'ICN-T': {
      address: '0xAAe7a8C55e31b94A67B411be035573F5dEF419fB',
      name: 'Iconomi Token',
      decimals: 18,
      url: 'https://www.iconomi.net/',
      ipfsHash: '',
    },
    'LTC-T': {
      address: '0x38a31aD4F640280d973687C76433276F2817F5C1',
      name: 'Litecoin Token',
      decimals: 8,
      url: 'https://litecoin.com/',
      ipfsHash: '',
    },
    'REP-T': {
      address: '0x19044fF4C8f00b16AB660407ABfFFac8FD1cE833',
      name: 'Rep Token',
      decimals: 18,
      url: 'https://augur.net/',
      ipfsHash: '',
    },
    'XRP-T': {
      address: '0x664a756CBb64A207cD69BacCb1d153F010Bc02ED',
      name: 'Ripple Token',
      decimals: 6,
      url: 'https://ripple.com/',
      ipfsHash: '',
    },
    'SNGLS-T': {
      address: '0xd466408b253beA8DC07b484c43B5d9690396D0c6',
      name: 'SingularDTV Token',
      decimals: 0,
      url: 'https://singulardtv.com/',
      ipfsHash: '',
    },
    'SNT-T': {
      address: '0xc5Ab5219a293426eb60ab0A0091D40FF676816c2',
      name: 'Status Network Token',
      decimals: 18,
      url: 'https://status.im/',
      ipfsHash: '',
    },
    'ZRX-T': {
      address: '0x8925daf23aD19c68fF317038C6c6018cfBB70704',
      name: '0x Protocol Token',
      decimals: 18,
      url: 'https://0xproject.com/',
      ipfsHash: '',
    },
    'REQ-T': {
      address: '0x30C64c8D3e985D91F9c1eFAf4CCDe66b2925ea7C',
      name: 'Request Network',
      decimals: 18,
      url: 'https://request.network',
      ipfsHash: '',
    },
    'FUN-T': {
      address: '0x28d1FC38670499E0C439FefC886A91B203139a1f',
      name: 'FunFair',
      decimals: 8,
      url: 'funfair.io',
      ipfsHash: '',
    },
    'SAN-T': {
      address: '0x76B614b11afB1474836e5762984fC0445F5F9d70',
      name: 'Santiment Network Token',
      decimals: 18,
      url: 'santiment.net',
      ipfsHash: '',
    },
    'MANA-T': {
      address: '0x2d29f5cA0e8d10822552Bf73553E263eE68278d0',
      name: 'Decentraland',
      decimals: 18,
      url: 'decentraland.org',
      ipfsHash: '',
    },
    'USDT-T': {
      address: '0x57030466f1C62cDF9201EcCa416c68cEB89378da',
      name: 'Tether',
      decimals: 6,
      url: 'tether.to',
      ipfsHash: '',
    },
    'ZEC-T': {
      address: '0x3D9Ac387cf69F6F65Aa32EE78A46bEd0C147F6A9',
      name: 'ZCash',
      decimals: 8,
      url: 'z.cash',
      ipfsHash: '',
    },
    'WETH-T': {
      address: '0xa27Af8713623fCc239d49108B1A7b187c133e88B',
      name: 'Ether Token',
      decimals: 18,
      url: 'ethereum.org',
      ipfsHash: '',
    },
    'MLN-T': {
      address: '0xDC5fC5DaB642f688Bc5BB58bEF6E0d452D7ae123',
      name: 'Melon Token',
      decimals: 18,
      url: 'melonport.com',
      ipfsHash: '',
    },
    'MKR-T': {
      address: '0x71BE1386EC4d6d780b208529ABc349Ee69c241Cd',
      name: 'MakerDao',
      decimals: 18,
      url: 'makerdao.com',
      ipfsHash: '',
    },
    'DAI-T': {
      address: '0x82789d9a0951974E58EbB91DF13b84424e51Acc4',
      name: 'Dai',
      decimals: 18,
      url: '',
      ipfsHash: '',
    },
    'KNC-T': {
      address: '0x46c4B65F40f686c3F3738395c36AceA70C06F3C2',
      name: 'Kyber Network',
      decimals: 18,
      url: 'kyber.network',
      ipfsHash: '',
    },
    'JNT-T': {
      address: '0xB04985BFaB8550C43C00528D9d06492916cB9df6',
      name: 'Jibrel Network',
      decimals: 18,
      url: 'jibrel.network',
      ipfsHash: '',
    },
    'OMG-T': {
      address: '0xfdBe0D69a110D1f0dc6aEc8588804da88173B8F0',
      name: 'Omise-Go',
      decimals: 18,
      url: 'omise.co',
      ipfsHash: '',
    },
  },
  live: {
    'CHF': {
      address: '0x0000000000000000000000000000000000000000',
      name: 'Swiss Franc token (dummy)',
      decimals: 18,
      url: '',
      ipfsHash: ''
    },
    'WETH': {
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      name: 'Wrapped ETH contract - Ether in ERC20 format',
      decimals: 18,
      url: 'https://makerdao.com/',
      ipfsHash: '',
      zeroBeforeApproval: false,
      isERC223: false
    },
    'DAI': {
      address: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
      name: 'Dai',
      decimals: 18,
      url: 'https://makerdao.com/',
      ipfsHash: '',
      zeroBeforeApproval: false,
      isERC223: false
    },
    'SAI': {
      address: '0x59adcf176ed2f6788a41b8ea4c4904518e62b6a4',
      name: '',
      decimals: 18,
      url: 'https://makerdao.com/',
      ipfsHash: '',
    },
    'MKR': {
      address: '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2',
      name: 'Maker Dao',
      decimals: 18,
      url: 'https://makerdao.com/',
      ipfsHash: '',
      zeroBeforeApproval: false,
      isERC223: false
    },
    'DGD': {
      address: '0xe0b7927c4af23765cb51314a0e0521a9645f0e2a',
      name: 'Digix Dao',
      decimals: 9,
      url: 'https://dgx.io/',
      ipfsHash: '',
    },
    'GNT': {
      address: '0xa74476443119A942dE498590Fe1f2454d7D4aC0d',
      name: 'Golem Network Token',
      decimals: 18,
      url: 'https://golem.network/',
      ipfsHash: '',
    },
    'REP': {
      address: '0xe94327d07fc17907b4db788e5adf2ed424addff6',
      name: 'Reputation',
      decimals: 18,
      url: 'https://augur.net/',
      ipfsHash: '',
    },
    'ICN': {
      address: '0x888666ca69e0f178ded6d75b5726cee99a87d698',
      name: 'Iconomi',
      decimals: 18,
      url: 'https://www.iconomi.net/',
      ipfsHash: '',
    },
    'SNGLS': {
      address: '0xaec2e87e0a235266d9c5adc9deb4b2e29b54d009',
      name: 'SingularDTV',
      decimals: 0,
      url: 'https://singulardtv.com/',
      ipfsHash: '',
    },
    'MLN': {
      address: '0xbeb9ef514a379b997e0798fdcc901ee474b6d9a1',
      name: 'Melon',
      decimals: 18,
      url: 'http://melon.fund/',
      ipfsHash: '',
      zeroBeforeApproval: false,
      isERC223: false
    },
    'BAT': {
      address: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
      name: 'Basic Attention Token',
      decimals: 18,
      url: 'https://www.basicattentiontoken.org/',
      ipfsHash: '',
    },
    'ZRX': {
      address: '0xe41d2489571d322189246dafa5ebde1f4699f498',
      name: '0x Token',
      decimals: 18,
      url: '0xproject.com',
      ipfsHash: '',
    },
    'KNC': {
      address: '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
      name: 'Kyber Network',
      decimals: 18,
      url: 'kyber.network',
      ipfsHash: '',
    },
    'JNT': {
      address: '0xa5fd1a791c4dfcaacc963d4f73c6ae5824149ea7',
      name: 'Jibrel Network',
      decimals: 18,
      url: 'jibrel.network',
      ipfsHash: '',
    },
    'OMG': {
      address: '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07',
      name: 'Omise-Go',
      decimals: 18,
      url: 'omise.co',
      ipfsHash: '',
    },
    'ANT': {
      address: '0x960b236A07cf122663c4303350609A66A7B288C0',
      name: 'Aragon Network Token',
      decimals: 18,
      url: 'https://aragon.one/',
      ipfsHash: '',
    },
    'GNO': {
      address: '0x6810e776880c02933d47db1b9fc05908e5386b96',
      name: 'Gnosis Token',
      decimals: 18,
      url: 'https://gnosis.pm/',
      ipfsHash: '',
    },
    'REQ': {
      address: '0x8f8221afbb33998d8584a2b05749ba73c37a938a',
      name: 'Request Network',
      decimals: 18,
      url: 'https://request.network',
      ipfsHash: '',
    },
    // "NMR": "0x1776e1f26f98b1a5df9cd347953a26dd3cb46671"
    // 'W-GNT': {
    //   address: '0xe0b7927c4af23765cb51314a0e0521a9645f0e2a',
    //   name: 'Wrapped Golem Network Token',
    //   decimals: 9,
    //   url: 'https://golem.network/',
    //   ipfsHash: '',
    // },
    // "RHOC": "0x168296bb09e24a88805cb9c33356536b980d3fc5",
    // "TIME": "0x6531f133e6deebe7f2dce5a0441aa7ef330b4e53",
    // "GUP": "0xf7b098298f7c69fc14610bf71d5e02c60792894c",
    // "VSL": "0x5c543e7ae0a1104f78406c340e9c64fd9fce5170",
    // "PLU": "0xd8912c10681d8b21fd3742244f44658dba12264e",
    // "1ST": "0xaf30d2a7e90d7dc361c8c4585e9bb7d2f6f15bc7",
  }
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Gets the token info by `tokenSymbol`
 * @throws If no token with given symbol is registered
 */
var getTokenInfo = function getTokenInfo(config, tokenSymbol) {
  return config.assets.find(function (t) {
    return t.symbol === tokenSymbol.toUpperCase();
  }) || function () {
    throw new Error("No token found with symbol ".concat(tokenSymbol));
  }();
};

var _default = getTokenInfo;
exports.default = _default;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bignumber = _interopRequireDefault(__webpack_require__(4));

/**
 * Get buy and sell prices for a given `order`
 */
var getPrices = function getPrices(order) {
  return {
    buy: new _bignumber.default(order.sell.howMuch).div(order.buy.howMuch),
    sell: new _bignumber.default(order.buy.howMuch).div(order.sell.howMuch)
  };
};

var _default = getPrices;
exports.default = _default;

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/json/stringify");

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _promise = _interopRequireDefault(__webpack_require__(14));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

/**
 * Rush: If `promise` didn't resolve before `wait` miliseconds: recect with
 * `errMsg`
 * @throws rejects the promise
 */
var rush =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(promise, errMsg) {
    var wait,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wait = _args.length > 2 && _args[2] !== undefined ? _args[2] : 30000;
            return _context.abrupt("return", wait ? _promise.default.race([promise, new _promise.default(function (resolve, reject) {
              return global.setTimeout(function () {
                return reject(new Error("".concat(promise, " took longer than ").concat(wait / 1000, " seconds to fulfill/reject: ").concat(errMsg)));
              }, wait);
            })]) : promise);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function rush(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = rush;
exports.default = _default;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(12));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _RMMakeOrdersAbi = _interopRequireDefault(__webpack_require__(138));

/**
 * Get deployed risk management contract instance
 */
var getRiskManagementContract =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, fundContract) {
    var _ref2, _ref3, RiskMgmtContractAddress;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fundContract.instance.getModules.call();

          case 2:
            _ref2 = _context.sent;
            _ref3 = (0, _slicedToArray2.default)(_ref2, 3);
            RiskMgmtContractAddress = _ref3[2];
            return _context.abrupt("return", environment.api.newContract(_RMMakeOrdersAbi.default, RiskMgmtContractAddress));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getRiskManagementContract(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getRiskManagementContract;
exports.default = _default;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

var _toReadable = _interopRequireDefault(__webpack_require__(9));

/**
 * Get the personalStake and totalSupply of an `investorAddress` in a fund at
 * fundAddress
 */
var getParticipation =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundAddress, investorAddress, config, fundContract, personalStake, totalSupply;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundAddress = _ref.fundAddress, investorAddress = _ref.investorAddress;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            _context.next = 6;
            return (0, _getFundContract.default)(environment, fundAddress);

          case 6:
            fundContract = _context.sent;
            _context.next = 9;
            return fundContract.instance.balanceOf.call({}, [investorAddress]);

          case 9:
            personalStake = _context.sent;
            _context.next = 12;
            return fundContract.instance.totalSupply.call();

          case 12:
            totalSupply = _context.sent;
            return _context.abrupt("return", {
              personalStake: (0, _toReadable.default)(config, personalStake, config.quoteAssetSymbol),
              totalSupply: (0, _toReadable.default)(config, totalSupply, config.quoteAssetSymbol)
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getParticipation(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getParticipation;
exports.default = _default;

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getTokenContract = _interopRequireDefault(__webpack_require__(21));

var _toReadable = _interopRequireDefault(__webpack_require__(9));

/**
 * @returns the amount which spender is still allowed to withdraw from owner
 * @param tokenSymbol the symbol of the token. Example: "MLN-T"
 * @param ownerAddress holds the funds currently
 * @param spenderAddress is eligible to spend the funds
 */
var getAllowance =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var tokenSymbol, ownerAddress, spenderAddress, config, tokenContract, approvedAmount;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tokenSymbol = _ref.tokenSymbol, ownerAddress = _ref.ownerAddress, spenderAddress = _ref.spenderAddress;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            _context.next = 6;
            return (0, _getTokenContract.default)(environment, tokenSymbol);

          case 6:
            tokenContract = _context.sent;
            _context.next = 9;
            return tokenContract.instance.allowance.call({}, [ownerAddress, spenderAddress]);

          case 9:
            approvedAmount = _context.sent;
            return _context.abrupt("return", (0, _toReadable.default)(config, approvedAmount, tokenSymbol));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getAllowance(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getAllowance;
exports.default = _default;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getVersionContract = _interopRequireDefault(__webpack_require__(15));

var _getSymbol = _interopRequireDefault(__webpack_require__(17));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

/**
 * Gets the native asset of the version
 */
var getNativeAssetSymbol =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var config, versionContract, address;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getConfig.default)(environment);

          case 2:
            config = _context.sent;
            _context.next = 5;
            return (0, _getVersionContract.default)(environment);

          case 5:
            versionContract = _context.sent;
            _context.next = 8;
            return versionContract.instance.getNativeAsset.call();

          case 8:
            address = _context.sent;
            return _context.abrupt("return", (0, _getSymbol.default)(config, address));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getNativeAssetSymbol(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getNativeAssetSymbol;
exports.default = _default;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(12));

var _entries = _interopRequireDefault(__webpack_require__(54));

var _networks = _interopRequireDefault(__webpack_require__(55));

/**
 * `id` to name mapping helper
 */
var getNetworkName = function getNetworkName(id) {
  var networkEntry = (0, _entries.default)(_networks.default).find(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        value = _ref2[1];

    return id.toString() === value;
  });
  return networkEntry ? networkEntry[0].toLowerCase() : null;
};

var _default = getNetworkName;
exports.default = _default;

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/object/entries");

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var networks = {
  LIVE: '1',
  ROBSTEN: '3',
  RINKEBY: '4',
  KOVAN: '42'
};
var _default = networks;
exports.default = _default;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var _getSymbol = _interopRequireDefault(__webpack_require__(17));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

/**
 * Gets the quote asset of the current PriceFeed
 */
var getQuoteAssetSymbol =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var config, canonicalPriceFeedContract, address;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getConfig.default)(environment);

          case 2:
            config = _context.sent;
            _context.next = 5;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 5:
            canonicalPriceFeedContract = _context.sent;
            _context.next = 8;
            return canonicalPriceFeedContract.instance.getQuoteAsset.call();

          case 8:
            address = _context.sent;
            return _context.abrupt("return", (0, _getSymbol.default)(config, address));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getQuoteAssetSymbol(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getQuoteAssetSymbol;
exports.default = _default;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _promise = _interopRequireDefault(__webpack_require__(14));

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _keys = _interopRequireDefault(__webpack_require__(42));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _ethersUtils = _interopRequireDefault(__webpack_require__(24));

var _tokenInfo = _interopRequireDefault(__webpack_require__(43));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

/**
 * Gets list of white listed asset pairs on production exchange
 */
var getWhiteListedAssets =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(environment, network) {
    var canonicalPriceFeedContract, promiseForInfo, allAssetsInfos;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 2:
            canonicalPriceFeedContract = _context2.sent;
            promiseForInfo = (0, _keys.default)(_tokenInfo.default[network]).map(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(symbol) {
                var asset, info;
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        asset = _tokenInfo.default[network][symbol];
                        _context.next = 3;
                        return canonicalPriceFeedContract.instance.assetInformation.call({}, [asset.address]);

                      case 3:
                        info = _context.sent;
                        return _context.abrupt("return", {
                          address: asset.address,
                          name: _ethersUtils.default.toUtf8String(_ethersUtils.default.stripZeros(info[1].reverse()).reverse()),
                          symbol: _ethersUtils.default.toUtf8String(_ethersUtils.default.stripZeros(info[2].reverse()).reverse()),
                          decimals: parseInt(info[3], 10),
                          url: info[4],
                          ipfsHash: info[5],
                          isWhiteListed: info[0]
                        });

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());
            _context2.next = 6;
            return _promise.default.all(promiseForInfo);

          case 6:
            allAssetsInfos = _context2.sent;
            return _context2.abrupt("return", allAssetsInfos.filter(function (asset) {
              return asset.isWhiteListed;
            }));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getWhiteListedAssets(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getWhiteListedAssets;
exports.default = _default;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _trace = _interopRequireDefault(__webpack_require__(59));

var _ensure = _interopRequireDefault(__webpack_require__(5));

/**
 * Takes a truffle `method` (eg. myContract.myMethod) and estimates the gas
 * consumption according to `params` and `options` and boosts this estimation
 * by the `multiplier`.
 */
var gasBoost =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(method, params, options, environment) {
    var multiplier,
        gasEstimation,
        latestBlock,
        gasLimit,
        multipliedGasEstimation,
        fallback,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            multiplier = _args.length > 4 && _args[4] !== undefined ? _args[4] : 1.2;
            _context.next = 3;
            return method.estimateGas(options, params);

          case 3:
            gasEstimation = _context.sent;
            _context.next = 6;
            return environment.api.eth.getBlockByNumber();

          case 6:
            latestBlock = _context.sent;
            gasLimit = Math.floor(latestBlock.gasLimit * 0.998);
            (0, _ensure.default)(gasEstimation < latestBlock.gasLimit * 0.998, "Gas estimation ".concat(gasEstimation, " is above gas limit: ").concat(gasLimit));
            multipliedGasEstimation = Math.ceil(gasEstimation * multiplier);

            if (multipliedGasEstimation > latestBlock.gasLimit) {
              fallback = Math.ceil(gasLimit);

              _trace.default.warn("Boosted gas estimation (".concat(multipliedGasEstimation + 0, ") would be over latestBlocks gasLimit (").concat(gasLimit + 0, "). Falling back to ").concat(fallback));

              (0, _ensure.default)(fallback >= gasEstimation, "Fallback (".concat(fallback, ") lower than gas estimation (").concat(gasEstimation, ")"));
              multipliedGasEstimation = fallback;
            }

            return _context.abrupt("return", multipliedGasEstimation);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function gasBoost(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var _default = gasBoost;
exports.default = _default;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Helper function to unveil internals of melon.js for logging
 */
var trace = function trace(_ref) {
  var message = _ref.message,
      _ref$category = _ref.category,
      category = _ref$category === void 0 ? 'trace' : _ref$category,
      data = _ref.data;
  var newTrace = {
    timestamp: new Date(),
    message: message,
    category: category,
    data: data
  }; // setup.tracer(newTrace);

  console.log(newTrace.timestamp, newTrace.category, newTrace.message);
};

var overloading = function overloading() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (typeof args[0] === 'string') {
    var _message = args[0],
        _data = args[1],
        _category = args[2];
    trace({
      message: _message,
      data: _data,
      category: _category
    });
  } else {
    trace(args[0]);
  }
};

overloading.log = function (message, data) {
  return trace({
    message: message,
    data: data,
    category: 'log'
  });
};

overloading.warn = function (message, data) {
  return trace({
    message: message,
    data: data,
    category: 'warn'
  });
};

var _default = overloading;
exports.default = _default;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-underscore-dangle */
var constructTransactionObject = function constructTransactionObject(contract, method, parameters, options) {
  var functionABI = contract.abi._interface.find(function (e) {
    return e._name === method;
  });

  var encodeOptions = contract._encodeOptions(functionABI, options, parameters);

  return encodeOptions;
};

var _default = constructTransactionObject;
exports.default = _default;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _promise = _interopRequireDefault(__webpack_require__(14));

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _ramda = __webpack_require__(18);

var _getOrder = _interopRequireDefault(__webpack_require__(30));

var _getPrices = _interopRequireDefault(__webpack_require__(45));

var _getExchangeAdapterContract = _interopRequireDefault(__webpack_require__(34));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

/**
 * Get `numberOfOrders` active orders for the `baseTokenSymbol`/
 * `quoteTokenSymbol` asset pair
 */
var getActiveOrders =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(environment, _ref) {
    var baseTokenSymbol, quoteTokenSymbol, _ref$numberOfOrders, numberOfOrders, exchangeAdapterContract, config, lastId, endIndex, getOrdersPromises, rawOrderbook, activeOrders;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            baseTokenSymbol = _ref.baseTokenSymbol, quoteTokenSymbol = _ref.quoteTokenSymbol, _ref$numberOfOrders = _ref.numberOfOrders, numberOfOrders = _ref$numberOfOrders === void 0 ? 105 : _ref$numberOfOrders;
            _context2.next = 3;
            return (0, _getExchangeAdapterContract.default)(environment);

          case 3:
            exchangeAdapterContract = _context2.sent;
            _context2.next = 6;
            return (0, _getConfig.default)(environment);

          case 6:
            config = _context2.sent;
            _context2.next = 9;
            return exchangeAdapterContract.instance.getLastOrderId.call({}, [config.exchangeAddress]);

          case 9:
            lastId = _context2.sent;
            endIndex = lastId.minus(numberOfOrders).toNumber() < 0 ? 1 : lastId.minus(numberOfOrders).toNumber();
            getOrdersPromises = (0, _ramda.range)(endIndex, lastId.toNumber() + 1).map(
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(id) {
                var order, assetPairArray;
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _getOrder.default)(environment, {
                          id: id
                        });

                      case 2:
                        order = _context.sent;
                        assetPairArray = [baseTokenSymbol, quoteTokenSymbol];

                        if (!(order.isActive && assetPairArray.includes(order.buy.symbol) && assetPairArray.includes(order.sell.symbol))) {
                          _context.next = 7;
                          break;
                        }

                        if (order.buy.symbol === baseTokenSymbol) {
                          order.price = (0, _getPrices.default)(order).buy;
                          order.type = 'buy';
                        } else {
                          order.price = (0, _getPrices.default)(order).sell;
                          order.type = 'sell';
                        }

                        return _context.abrupt("return", order);

                      case 7:
                        return _context.abrupt("return", null);

                      case 8:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }());
            _context2.next = 14;
            return _promise.default.all(getOrdersPromises);

          case 14:
            rawOrderbook = _context2.sent;
            activeOrders = rawOrderbook.filter(function (o) {
              return !!o;
            }).sort(function (a, b) {
              if (a.type === b.type) return b.price.minus(a.price).toNumber();
              return a.type === 'buy' ? 1 : -1;
            });
            return _context2.abrupt("return", activeOrders);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getActiveOrders(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getActiveOrders;
exports.default = _default;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _api = _interopRequireDefault(__webpack_require__(35));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _getAddress = _interopRequireDefault(__webpack_require__(13));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getDecimals = _interopRequireDefault(__webpack_require__(29));

var _getMatchingMarketContract = _interopRequireDefault(__webpack_require__(20));

var _toReadable = _interopRequireDefault(__webpack_require__(9));

var _toDate = _interopRequireDefault(__webpack_require__(16));

/**
 * get all recent trades for a given asset pair `baseTokenSymbol`/
 * `quoteTokenSymbol` in the `inlastXdays`
 */
var getRecentTrades =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var baseTokenSymbol, quoteTokenSymbol, _ref$inlastXdays, inlastXdays, config, simpleMarketContract, blocksPerDay, numberOfDays, blockNumber, hashed, filter, pastEvents, decodedLogs, baseTokenAddress, quoteTokenAddress, decimalDifference;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            baseTokenSymbol = _ref.baseTokenSymbol, quoteTokenSymbol = _ref.quoteTokenSymbol, _ref$inlastXdays = _ref.inlastXdays, inlastXdays = _ref$inlastXdays === void 0 ? 1 : _ref$inlastXdays;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            _context.next = 6;
            return (0, _getMatchingMarketContract.default)(environment);

          case 6:
            simpleMarketContract = _context.sent;
            blocksPerDay = 21600;
            numberOfDays = inlastXdays;
            _context.next = 11;
            return environment.api.eth.blockNumber();

          case 11:
            blockNumber = _context.sent;
            hashed = _api.default.util.sha3('LogTake(bytes32,bytes32,address,address,address,address,uint128,uint128,uint64)');
            filter = {
              fromBlock: blockNumber.toNumber() - blocksPerDay * numberOfDays,
              toBlock: 'latest',
              address: simpleMarketContract.address,
              topics: [hashed]
            };
            _context.next = 16;
            return environment.api.eth.getLogs(filter);

          case 16:
            pastEvents = _context.sent;
            decodedLogs = simpleMarketContract.parseEventLogs(pastEvents);

            if (!(baseTokenSymbol && quoteTokenSymbol)) {
              _context.next = 23;
              break;
            }

            baseTokenAddress = (0, _getAddress.default)(config, baseTokenSymbol);
            quoteTokenAddress = (0, _getAddress.default)(config, quoteTokenSymbol);
            decimalDifference = (0, _getDecimals.default)(config, quoteTokenSymbol) - (0, _getDecimals.default)(config, baseTokenSymbol);
            return _context.abrupt("return", decodedLogs.map(function (event) {
              var trade = {
                maker: event.params.maker.value,
                taker: event.params.taker.value,
                timestamp: (0, _toDate.default)(event.params.timestamp.value),
                transactionHash: event.transactionHash
              };

              if (event.params.buy_gem.value.toLowerCase() === quoteTokenAddress && event.params.pay_gem.value.toLowerCase() === baseTokenAddress) {
                if ((0, _getDecimals.default)(config, baseTokenSymbol) !== 18) {
                  trade.price = new _bignumber.default(event.params.give_amt.value).div(event.params.take_amt.value).div(Math.pow(10, decimalDifference));
                } else {
                  trade.price = new _bignumber.default(event.params.give_amt.value).div(event.params.take_amt.value);
                }

                trade.type = 'buy';
                trade.quantity = (0, _toReadable.default)(config, event.params.take_amt.value, baseTokenSymbol);
              } else if (event.params.buy_gem.value.toLowerCase() === baseTokenAddress && event.params.pay_gem.value.toLowerCase() === quoteTokenAddress) {
                if ((0, _getDecimals.default)(config, baseTokenSymbol) !== 18) {
                  trade.price = new _bignumber.default(event.params.take_amt.value).div(event.params.give_amt.value).div(Math.pow(10, decimalDifference));
                } else {
                  trade.price = new _bignumber.default(event.params.take_amt.value).div(event.params.give_amt.value);
                }

                trade.type = 'sell';
                trade.quantity = (0, _toReadable.default)(config, event.params.give_amt.value, baseTokenSymbol);
              } else {
                return null;
              }

              return trade;
            }).filter(function (o) {
              return !!o;
            }));

          case 23:
            return _context.abrupt("return", decodedLogs);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getRecentTrades(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getRecentTrades;
exports.default = _default;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

var _ensure = _interopRequireDefault(__webpack_require__(5));

/**
 * Gets the index of an exchange on a specific fund
 * @throws If this exchange address is unknown to the fund
 */
var getExchangeIndex =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, exchangeAddress, fundAddress) {
    var fundContract, fundExchanges, index;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getFundContract.default)(environment, fundAddress);

          case 2:
            fundContract = _context.sent;
            _context.next = 5;
            return fundContract.instance.getExchangeInfo.call({}, []);

          case 5:
            fundExchanges = _context.sent;
            // eslint-disable-next-line no-underscore-dangle
            index = fundExchanges[0].findIndex(function (e) {
              return e._value === exchangeAddress;
            });
            (0, _ensure.default)(index !== -1, "Fund with address ".concat(fundAddress, " does not authorize exchange with address ").concat(exchangeAddress));
            return _context.abrupt("return", index);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getExchangeIndex(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getExchangeIndex;
exports.default = _default;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _ethersUtils = _interopRequireDefault(__webpack_require__(24));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

var _toDate = _interopRequireDefault(__webpack_require__(16));

/**
 * Get general fund informations for fund at `fundAddress`
 */
var getFundInformations =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundAddress, fundContract, nameInBytes, name, decimals, inception, owner, modules;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundAddress = _ref.fundAddress;
            fundContract = (0, _getFundContract.default)(environment, fundAddress);
            _context.next = 4;
            return fundContract.instance.getName.call();

          case 4:
            nameInBytes = _context.sent;
            name = _ethersUtils.default.toUtf8String(_ethersUtils.default.stripZeros(nameInBytes.reverse()).reverse());
            _context.next = 8;
            return fundContract.instance.getDecimals.call();

          case 8:
            decimals = _context.sent.toNumber();
            _context.next = 11;
            return fundContract.instance.getCreationTime.call();

          case 11:
            inception = _context.sent;
            _context.next = 14;
            return fundContract.instance.owner.call();

          case 14:
            owner = _context.sent;
            _context.next = 17;
            return fundContract.instance.getModules.call();

          case 17:
            modules = _context.sent;
            return _context.abrupt("return", {
              fundAddress: fundAddress,
              name: name,
              owner: owner,
              decimals: decimals,
              inception: (0, _toDate.default)(inception),
              modules: modules
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getFundInformations(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getFundInformations;
exports.default = _default;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(12));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _getAddress = _interopRequireDefault(__webpack_require__(13));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var _toReadable = _interopRequireDefault(__webpack_require__(9));

/**
 * Gets price of `tokenSymbol` against MLN-T
 */
var getPrice =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, tokenSymbol) {
    var config, canonicalPriceFeedContract, assetAddress, _ref2, _ref3, price;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getConfig.default)(environment);

          case 2:
            config = _context.sent;
            _context.next = 5;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 5:
            canonicalPriceFeedContract = _context.sent;
            assetAddress = (0, _getAddress.default)(config, tokenSymbol);
            _context.next = 9;
            return canonicalPriceFeedContract.instance.getPrice.call({}, [assetAddress]);

          case 9:
            _ref2 = _context.sent;
            _ref3 = (0, _slicedToArray2.default)(_ref2, 2);
            price = _ref3[0];
            return _context.abrupt("return", (0, _toReadable.default)(config, price, config.quoteAssetSymbol));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getPrice(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getPrice;
exports.default = _default;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _promise = _interopRequireDefault(__webpack_require__(14));

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getMatchingMarketContract = _interopRequireDefault(__webpack_require__(20));

var _getSymbol = _interopRequireDefault(__webpack_require__(17));

var _toReadable = _interopRequireDefault(__webpack_require__(9));

var _toDate = _interopRequireDefault(__webpack_require__(16));

var _getExchangeName = _interopRequireDefault(__webpack_require__(31));

var _isValidId = _interopRequireDefault(__webpack_require__(67));

/**
 * Get all the orders the fund has made so far, regardless of their status (active, canceled etc.)
 */
var getOrdersHistory =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(environment, _ref) {
    var fundAddress, config, exchangeContract, fundContract, lastOrderIndex, getOrdersPromises, orders, formattedOrders;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            fundAddress = _ref.fundAddress;
            _context3.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context3.sent;
            _context3.next = 6;
            return (0, _getMatchingMarketContract.default)(environment);

          case 6:
            exchangeContract = _context3.sent;
            fundContract = (0, _getFundContract.default)(environment, fundAddress);
            _context3.next = 10;
            return fundContract.instance.getLastOrderIndex.call({}, []);

          case 10:
            lastOrderIndex = _context3.sent;

            if ((0, _isValidId.default)(lastOrderIndex)) {
              _context3.next = 13;
              break;
            }

            return _context3.abrupt("return", []);

          case 13:
            getOrdersPromises = new Array(lastOrderIndex.toNumber() + 1).fill(undefined).map(
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(val, index) {
                var order;
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return fundContract.instance.orders.call({}, [index]);

                      case 2:
                        order = _context.sent;
                        order.push(index);
                        return _context.abrupt("return", order);

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x3, _x4) {
                return _ref3.apply(this, arguments);
              };
            }());
            _context3.next = 16;
            return _promise.default.all(getOrdersPromises);

          case 16:
            orders = _context3.sent;
            formattedOrders = orders.map(
            /*#__PURE__*/
            function () {
              var _ref4 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee2(order) {
                return _regenerator.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.t0 = parseInt(environment.api.util.bytesToHex(order[1]), 16);
                        _context2.next = 3;
                        return (0, _getExchangeName.default)(environment, order[0]);

                      case 3:
                        _context2.t1 = _context2.sent;
                        _context2.next = 6;
                        return (0, _getExchangeName.default)(environment, order[0]);

                      case 6:
                        _context2.t2 = _context2.sent;

                        if (!(_context2.t2 === 'MatchingMarket')) {
                          _context2.next = 13;
                          break;
                        }

                        _context2.next = 10;
                        return exchangeContract.instance.isActive.call({}, [parseInt(environment.api.util.bytesToHex(order[1]), 16)]);

                      case 10:
                        _context2.t3 = _context2.sent;
                        _context2.next = 14;
                        break;

                      case 13:
                        _context2.t3 = 'N/A';

                      case 14:
                        _context2.t4 = _context2.t3;
                        _context2.t5 = order[2].toNumber() === 0 ? 'make' : 'take';
                        _context2.t6 = order[2] === 0 ? (0, _getSymbol.default)(config, order[3]) : (0, _getSymbol.default)(config, order[4]);
                        _context2.t7 = order[2] === 0 ? (0, _getSymbol.default)(config, order[4]) : (0, _getSymbol.default)(config, order[3]);
                        _context2.t8 = order[2] === 0 ? (0, _toReadable.default)(config, order[5], (0, _getSymbol.default)(config, order[3])) : (0, _toReadable.default)(config, order[6], (0, _getSymbol.default)(config, order[4]));
                        _context2.t9 = order[2] === 0 ? (0, _toReadable.default)(config, order[6], (0, _getSymbol.default)(config, order[4])) : (0, _toReadable.default)(config, order[5], (0, _getSymbol.default)(config, order[3]));
                        _context2.t10 = (0, _toDate.default)(order[7]);
                        _context2.t11 = (0, _getSymbol.default)(config, order[3]) === config.quoteAssetSymbol ? 'buy' : 'sell';
                        _context2.t12 = (0, _getSymbol.default)(config, order[3]) === config.quoteAssetSymbol ? (0, _toReadable.default)(config, order[5], (0, _getSymbol.default)(config, order[3])).div((0, _toReadable.default)(config, order[6], (0, _getSymbol.default)(config, order[4]))) : (0, _toReadable.default)(config, order[6], (0, _getSymbol.default)(config, order[4])).div((0, _toReadable.default)(config, order[5], (0, _getSymbol.default)(config, order[3])));
                        return _context2.abrupt("return", {
                          exchangeOrderId: _context2.t0,
                          exchangeName: _context2.t1,
                          isActive: _context2.t4,
                          orderType: _context2.t5,
                          sellSymbol: _context2.t6,
                          buySymbol: _context2.t7,
                          sellHowMuch: _context2.t8,
                          buyHowMuch: _context2.t9,
                          timestamp: _context2.t10,
                          type: _context2.t11,
                          price: _context2.t12
                        });

                      case 24:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              }));

              return function (_x5) {
                return _ref4.apply(this, arguments);
              };
            }());
            return _context3.abrupt("return", _promise.default.all(formattedOrders));

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getOrdersHistory(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getOrdersHistory;
exports.default = _default;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var isValidId = function isValidId(id) {
  return id.toString(16) !== 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' && id.gte(0);
};

var _default = isValidId;
exports.default = _default;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(12));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getMethodNameSignature = _interopRequireDefault(__webpack_require__(26));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var _getAddress = _interopRequireDefault(__webpack_require__(13));

var _getBalance = _interopRequireDefault(__webpack_require__(22));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var _getMatchingMarketContract = _interopRequireDefault(__webpack_require__(20));

var _isMakePermitted = _interopRequireDefault(__webpack_require__(69));

var _toProcessable = _interopRequireDefault(__webpack_require__(10));

var preflightMakeOrder =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundContract, exchangeAddress, makerAssetSymbol, takerAssetSymbol, makerQuantity, takerQuantity, config, makerTokenBalance, owner, isShutDown, method, canonicalPriceFeedContract, isExchangeMethodAllowed, ExistsPriceOnAssetPair, _ref3, _ref4, isRecent, referencePrice, isAllowed, exchangeContract, dust;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundContract = _ref.fundContract, exchangeAddress = _ref.exchangeAddress, makerAssetSymbol = _ref.makerAssetSymbol, takerAssetSymbol = _ref.takerAssetSymbol, makerQuantity = _ref.makerQuantity, takerQuantity = _ref.takerQuantity;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            _context.next = 6;
            return (0, _getBalance.default)(environment, {
              tokenSymbol: makerAssetSymbol,
              ofAddress: fundContract.address
            });

          case 6:
            makerTokenBalance = _context.sent;
            (0, _ensure.default)(makerTokenBalance.gte(makerQuantity), "Insufficient balance of ".concat(makerAssetSymbol));
            _context.next = 10;
            return fundContract.instance.owner.call();

          case 10:
            owner = _context.sent;
            (0, _ensure.default)(owner.toLowerCase() === environment.account.address.toLowerCase(), 'Not owner of fund');
            _context.next = 14;
            return fundContract.instance.isShutDown.call();

          case 14:
            isShutDown = _context.sent;
            (0, _ensure.default)(isShutDown === false, 'Fund is shut down');
            _context.next = 18;
            return (0, _getMethodNameSignature.default)(environment, 'makeOrder');

          case 18:
            method = _context.sent;
            _context.next = 21;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 21:
            canonicalPriceFeedContract = _context.sent;
            _context.next = 24;
            return canonicalPriceFeedContract.instance.exchangeMethodIsAllowed.call({}, [exchangeAddress, method]);

          case 24:
            isExchangeMethodAllowed = _context.sent;
            (0, _ensure.default)(isExchangeMethodAllowed, 'This exchange method is not allowed');
            (0, _ensure.default)((0, _getAddress.default)(config, makerAssetSymbol) !== fundContract.address && (0, _getAddress.default)(config, takerAssetSymbol) !== fundContract.address, 'Fund buying/selling its own fund token is forbidden.');
            _context.next = 29;
            return canonicalPriceFeedContract.instance.existsPriceOnAssetPair.call({}, [(0, _getAddress.default)(config, makerAssetSymbol), (0, _getAddress.default)(config, takerAssetSymbol)]);

          case 29:
            ExistsPriceOnAssetPair = _context.sent;
            (0, _ensure.default)(ExistsPriceOnAssetPair, 'Price not provided on this asset pair by your datafeed.');
            _context.next = 33;
            return canonicalPriceFeedContract.instance.getReferencePriceInfo.call({}, [(0, _getAddress.default)(config, makerAssetSymbol), (0, _getAddress.default)(config, takerAssetSymbol)]);

          case 33:
            _ref3 = _context.sent;
            _ref4 = (0, _slicedToArray2.default)(_ref3, 2);
            isRecent = _ref4[0];
            referencePrice = _ref4[1];
            (0, _ensure.default)(isRecent, 'Pricefeed data is outdated :( Please try again.');
            _context.next = 40;
            return (0, _isMakePermitted.default)(environment, {
              referencePrice: referencePrice,
              makerAssetSymbol: makerAssetSymbol,
              takerAssetSymbol: takerAssetSymbol,
              makerQuantity: makerQuantity,
              takerQuantity: takerQuantity,
              fundContract: fundContract
            });

          case 40:
            isAllowed = _context.sent;
            (0, _ensure.default)(isAllowed, "Risk Management module doesn't allow this trade");

            if (!(exchangeAddress === config.matchingMarketAddress)) {
              _context.next = 52;
              break;
            }

            _context.next = 45;
            return (0, _getMatchingMarketContract.default)(environment);

          case 45:
            exchangeContract = _context.sent;
            _context.next = 48;
            return exchangeContract.instance._dust.call({}, [(0, _getAddress.default)(config, takerAssetSymbol)]);

          case 48:
            dust = _context.sent;

            /* eslint-enable */
            (0, _ensure.default)((0, _toProcessable.default)(config, takerQuantity, takerAssetSymbol).gte(dust), 'Selling quantity too low.');
            _context.next = 53;
            break;

          case 52:
            if (exchangeAddress === config.zeroExV1Address) {// pre conditions if ZeroExV1
              // TODO: implement when ZeroExv2 is live
            }

          case 53:
            return _context.abrupt("return", true);

          case 54:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function preflightMakeOrder(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = preflightMakeOrder;
exports.default = _default;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getAddress = _interopRequireDefault(__webpack_require__(13));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var _getRiskManagementContract = _interopRequireDefault(__webpack_require__(48));

var _toProcessable = _interopRequireDefault(__webpack_require__(10));

/**
 * Test if make order request is permitted
 */
var isMakePermitted =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var referencePrice, makerAssetSymbol, takerAssetSymbol, makerQuantity, takerQuantity, fundContract, config, canonicalPriceFeedContract, orderPrice, riskManagementContract, result;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            referencePrice = _ref.referencePrice, makerAssetSymbol = _ref.makerAssetSymbol, takerAssetSymbol = _ref.takerAssetSymbol, makerQuantity = _ref.makerQuantity, takerQuantity = _ref.takerQuantity, fundContract = _ref.fundContract;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            _context.next = 6;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 6:
            canonicalPriceFeedContract = _context.sent;
            _context.next = 9;
            return canonicalPriceFeedContract.instance.getOrderPriceInfo.call({}, [(0, _getAddress.default)(config, makerAssetSymbol), (0, _getAddress.default)(config, takerAssetSymbol), (0, _toProcessable.default)(config, makerQuantity, makerAssetSymbol), (0, _toProcessable.default)(config, takerQuantity, takerAssetSymbol)]);

          case 9:
            orderPrice = _context.sent;
            _context.next = 12;
            return (0, _getRiskManagementContract.default)(environment, fundContract);

          case 12:
            riskManagementContract = _context.sent;
            _context.next = 15;
            return riskManagementContract.instance.isMakePermitted.call({}, [orderPrice, referencePrice, (0, _getAddress.default)(config, makerAssetSymbol), (0, _getAddress.default)(config, takerAssetSymbol), (0, _toProcessable.default)(config, makerQuantity, makerAssetSymbol), (0, _toProcessable.default)(config, takerQuantity, takerAssetSymbol)]);

          case 15:
            result = _context.sent;
            return _context.abrupt("return", result);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function isMakePermitted(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = isMakePermitted;
exports.default = _default;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(12));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getMethodNameSignature = _interopRequireDefault(__webpack_require__(26));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var _getAddress = _interopRequireDefault(__webpack_require__(13));

var _getBalance = _interopRequireDefault(__webpack_require__(22));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var _getMatchingMarketContract = _interopRequireDefault(__webpack_require__(20));

var _isTakePermitted = _interopRequireDefault(__webpack_require__(71));

var _toProcessable = _interopRequireDefault(__webpack_require__(10));

var preflightTakeOrder =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundContract, exchangeAddress, makerAssetSymbol, takerAssetSymbol, fillMakerQuantity, fillTakerQuantity, config, sellTokenBalance, owner, isShutDown, method, canonicalPriceFeedContract, isExchangeMethodAllowed, ExistsPriceOnAssetPair, _ref3, _ref4, isRecent, referencePrice, isAllowed, exchangeContract, dust;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundContract = _ref.fundContract, exchangeAddress = _ref.exchangeAddress, makerAssetSymbol = _ref.makerAssetSymbol, takerAssetSymbol = _ref.takerAssetSymbol, fillMakerQuantity = _ref.fillMakerQuantity, fillTakerQuantity = _ref.fillTakerQuantity;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            _context.next = 6;
            return (0, _getBalance.default)(environment, {
              tokenSymbol: takerAssetSymbol,
              ofAddress: fundContract.address
            });

          case 6:
            sellTokenBalance = _context.sent;
            (0, _ensure.default)(sellTokenBalance.gte(fillTakerQuantity), "Insufficient balance of ".concat(takerAssetSymbol));
            _context.next = 10;
            return fundContract.instance.owner.call();

          case 10:
            owner = _context.sent;
            (0, _ensure.default)(owner.toLowerCase() === environment.account.address.toLowerCase(), 'Not owner of fund');
            _context.next = 14;
            return fundContract.instance.isShutDown.call();

          case 14:
            isShutDown = _context.sent;
            (0, _ensure.default)(isShutDown === false, 'Fund is shut down');
            _context.next = 18;
            return (0, _getMethodNameSignature.default)(environment, 'takeOrder');

          case 18:
            method = _context.sent;
            _context.next = 21;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 21:
            canonicalPriceFeedContract = _context.sent;
            _context.next = 24;
            return canonicalPriceFeedContract.instance.exchangeMethodIsAllowed.call({}, [exchangeAddress, method]);

          case 24:
            isExchangeMethodAllowed = _context.sent;
            (0, _ensure.default)(isExchangeMethodAllowed, 'This exchange method is not allowed');
            (0, _ensure.default)((0, _getAddress.default)(config, makerAssetSymbol) !== fundContract.address && (0, _getAddress.default)(config, takerAssetSymbol) !== fundContract.address, 'Fund buying/selling its own fund token is forbidden.');
            _context.next = 29;
            return canonicalPriceFeedContract.instance.existsPriceOnAssetPair.call({}, [(0, _getAddress.default)(config, takerAssetSymbol), (0, _getAddress.default)(config, makerAssetSymbol)]);

          case 29:
            ExistsPriceOnAssetPair = _context.sent;
            (0, _ensure.default)(ExistsPriceOnAssetPair, 'Price not provided on this asset pair by your datafeed.');
            _context.next = 33;
            return canonicalPriceFeedContract.instance.getReferencePriceInfo.call({}, [(0, _getAddress.default)(config, takerAssetSymbol), (0, _getAddress.default)(config, makerAssetSymbol)]);

          case 33:
            _ref3 = _context.sent;
            _ref4 = (0, _slicedToArray2.default)(_ref3, 2);
            isRecent = _ref4[0];
            referencePrice = _ref4[1];
            _context.next = 39;
            return (0, _isTakePermitted.default)(environment, {
              fundContract: fundContract,
              referencePrice: referencePrice,
              takerAssetSymbol: takerAssetSymbol,
              makerAssetSymbol: makerAssetSymbol,
              fillTakerQuantity: fillTakerQuantity,
              fillMakerQuantity: fillMakerQuantity
            });

          case 39:
            isAllowed = _context.sent;
            (0, _ensure.default)(isAllowed, 'Risk Management module does not allow this trade.');
            (0, _ensure.default)(isRecent, 'Pricefeed data is outdated :( Please try again.');

            if (!(exchangeAddress === config.matchingMarketAddress)) {
              _context.next = 52;
              break;
            }

            _context.next = 45;
            return (0, _getMatchingMarketContract.default)(environment);

          case 45:
            exchangeContract = _context.sent;
            _context.next = 48;
            return exchangeContract.instance._dust.call({}, [(0, _getAddress.default)(config, takerAssetSymbol)]);

          case 48:
            dust = _context.sent;

            /* eslint-enable */
            (0, _ensure.default)((0, _toProcessable.default)(config, fillTakerQuantity, takerAssetSymbol).gte(dust), 'Selling quantity too low.');
            _context.next = 53;
            break;

          case 52:
            if (exchangeAddress === config.zeroExV1Address) {// pre conditions if ZeroExV1
              // TODO: implement when ZeroExv2 is live
            }

          case 53:
            return _context.abrupt("return", true);

          case 54:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function preflightTakeOrder(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = preflightTakeOrder;
exports.default = _default;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getAddress = _interopRequireDefault(__webpack_require__(13));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var _getRiskManagementContract = _interopRequireDefault(__webpack_require__(48));

var _toProcessable = _interopRequireDefault(__webpack_require__(10));

/**
 * Test if make order request is permitted
 */
var isTakePermitted =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundContract, referencePrice, takerAssetSymbol, makerAssetSymbol, fillTakerQuantity, fillMakerQuantity, config, canonicalPriceFeedContract, orderPrice, riskManagementContract, result;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundContract = _ref.fundContract, referencePrice = _ref.referencePrice, takerAssetSymbol = _ref.takerAssetSymbol, makerAssetSymbol = _ref.makerAssetSymbol, fillTakerQuantity = _ref.fillTakerQuantity, fillMakerQuantity = _ref.fillMakerQuantity;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            _context.next = 6;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 6:
            canonicalPriceFeedContract = _context.sent;
            _context.next = 9;
            return canonicalPriceFeedContract.instance.getOrderPriceInfo.call({}, [(0, _getAddress.default)(config, takerAssetSymbol), (0, _getAddress.default)(config, makerAssetSymbol), (0, _toProcessable.default)(config, fillTakerQuantity, takerAssetSymbol), (0, _toProcessable.default)(config, fillMakerQuantity, makerAssetSymbol)]);

          case 9:
            orderPrice = _context.sent;
            _context.next = 12;
            return (0, _getRiskManagementContract.default)(environment, fundContract);

          case 12:
            riskManagementContract = _context.sent;
            _context.next = 15;
            return riskManagementContract.instance.isTakePermitted.call({}, [orderPrice, referencePrice, (0, _getAddress.default)(config, takerAssetSymbol), (0, _getAddress.default)(config, makerAssetSymbol), (0, _toProcessable.default)(config, fillTakerQuantity, takerAssetSymbol), (0, _toProcessable.default)(config, fillMakerQuantity, makerAssetSymbol)]);

          case 15:
            result = _context.sent;
            return _context.abrupt("return", result);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function isTakePermitted(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = isTakePermitted;
exports.default = _default;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _ethersUtils = _interopRequireDefault(__webpack_require__(24));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var _callOnExchange = _interopRequireDefault(__webpack_require__(36));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

var _getMethodNameSignature = _interopRequireDefault(__webpack_require__(26));

var _preflightTakeOrder = _interopRequireDefault(__webpack_require__(70));

var _getExchangeName = _interopRequireDefault(__webpack_require__(31));

var takeOrder =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundAddress, exchangeAddress, maker, taker, makerAssetSymbol, takerAssetSymbol, feeRecipient, makerQuantity, takerQuantity, makerFee, takerFee, timestamp, salt, fillTakerTokenAmount, _ref$dexySignatureMod, dexySignatureMode, _ref$identifier, identifier, _ref$signature, signature, fillTakerQuantity, fillMakerQuantity, fundContract, preflightCheck, method, updateLog;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundAddress = _ref.fundAddress, exchangeAddress = _ref.exchangeAddress, maker = _ref.maker, taker = _ref.taker, makerAssetSymbol = _ref.makerAssetSymbol, takerAssetSymbol = _ref.takerAssetSymbol, feeRecipient = _ref.feeRecipient, makerQuantity = _ref.makerQuantity, takerQuantity = _ref.takerQuantity, makerFee = _ref.makerFee, takerFee = _ref.takerFee, timestamp = _ref.timestamp, salt = _ref.salt, fillTakerTokenAmount = _ref.fillTakerTokenAmount, _ref$dexySignatureMod = _ref.dexySignatureMode, dexySignatureMode = _ref$dexySignatureMod === void 0 ? 0 : _ref$dexySignatureMod, _ref$identifier = _ref.identifier, identifier = _ref$identifier === void 0 ? '0x0' : _ref$identifier, _ref$signature = _ref.signature, signature = _ref$signature === void 0 ? {} : _ref$signature;
            fillTakerQuantity = !fillTakerTokenAmount || new _bignumber.default(fillTakerTokenAmount).gte(takerQuantity) ? new _bignumber.default(takerQuantity) : new _bignumber.default(fillTakerTokenAmount);
            fillMakerQuantity = fillTakerQuantity.times(new _bignumber.default(makerQuantity)).div(new _bignumber.default(takerQuantity));
            (0, _ensure.default)(fillMakerQuantity.lte(makerQuantity), 'Quantity asked too high compared to quantity for sale on the order.'); //TODO: add ensure ZeroEx.isOrderValid

            _context.next = 6;
            return (0, _getFundContract.default)(environment, fundAddress);

          case 6:
            fundContract = _context.sent;
            _context.next = 9;
            return (0, _preflightTakeOrder.default)(environment, {
              fundContract: fundContract,
              exchangeAddress: exchangeAddress,
              makerAssetSymbol: makerAssetSymbol,
              takerAssetSymbol: takerAssetSymbol,
              fillMakerQuantity: fillMakerQuantity,
              fillTakerQuantity: fillTakerQuantity
            });

          case 9:
            preflightCheck = _context.sent;
            (0, _ensure.default)(preflightCheck, 'One of the pre-conditions of the function takeOrder failed on pre-flight.');
            _context.next = 13;
            return (0, _getMethodNameSignature.default)(environment, 'takeOrder');

          case 13:
            method = _context.sent;
            _context.next = 16;
            return (0, _callOnExchange.default)(environment, {
              fundContract: fundContract,
              exchangeAddress: exchangeAddress,
              method: method,
              orderAddresses: [maker, taker, makerAssetSymbol, takerAssetSymbol, feeRecipient],
              orderValues: [makerQuantity, takerQuantity, makerFee, takerFee, timestamp, salt, fillTakerQuantity, dexySignatureMode],
              identifier: identifier,
              signature: signature
            });

          case 16:
            updateLog = _context.sent;
            console.log(updateLog);
            return _context.abrupt("return", {
              id: _ethersUtils.default.toUtf8String(_ethersUtils.default.stripZeros(updateLog.params.orderId.value.reverse()).reverse()),
              exchange: (0, _getExchangeName.default)(environment, updateLog.params.exchange.value),
              updateType: updateLog.params.updateType.value === 0 ? 'make' : 'take'
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function takeOrder(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = takeOrder;
exports.default = _default;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getOlympiadContract = _interopRequireDefault(__webpack_require__(32));

/**
 * @return Address of the fund registered by the registrant address
 */
var getRegistrantFund =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var olympiadContract, registrantFund;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getOlympiadContract.default)(environment);

          case 2:
            olympiadContract = _context.sent;
            _context.next = 5;
            return olympiadContract.instance.getRegistrantFund.call({}, [environment.account.address]);

          case 5:
            registrantFund = _context.sent;
            return _context.abrupt("return", registrantFund);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getRegistrantFund(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getRegistrantFund;
exports.default = _default;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _PriceFeedAbi = _interopRequireDefault(__webpack_require__(151));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

/**
 * Gets contract instance of deployed DataFeed
 */
var getPriceFeedContract =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var config;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getConfig.default)(environment);

          case 2:
            config = _context.sent;
            return _context.abrupt("return", environment.api.newContract(_PriceFeedAbi.default, config.priceFeedAddress));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getPriceFeedContract(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getPriceFeedContract;
exports.default = _default;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _ensure = _interopRequireDefault(__webpack_require__(5));

/**
 * Test if subscribe request is permitted
 */
var isInvestmentPermittedAndAllowed =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundContract, asset;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundContract = _ref.fundContract, asset = _ref.asset;
            _context.t0 = _ensure.default;
            _context.next = 4;
            return fundContract.instance.isInvestAllowed.call({}, [asset]);

          case 4:
            _context.t1 = _context.sent;
            (0, _context.t0)(_context.t1, 'Subscriptions in MLN to fund are disabled by the fund manager');

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function isInvestmentPermittedAndAllowed(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = isInvestmentPermittedAndAllowed;
exports.default = _default;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(12));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _ComplianceInterfaceAbi = _interopRequireDefault(__webpack_require__(154));

/**
 * Get deployed participation contract instance
 */
var getComplianceContract =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, fundContract) {
    var _ref2, _ref3, participationContractAddress;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fundContract.instance.getModules.call();

          case 2:
            _ref2 = _context.sent;
            _ref3 = (0, _slicedToArray2.default)(_ref2, 3);
            participationContractAddress = _ref3[2];
            return _context.abrupt("return", environment.api.newContract(_ComplianceInterfaceAbi.default, participationContractAddress));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getComplianceContract(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getComplianceContract;
exports.default = _default;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var _getAddress = _interopRequireDefault(__webpack_require__(13));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var hasRecentPrice =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, tokenSymbol) {
    var config, symbol, tokenAddress, dataFeedContract;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getConfig.default)(environment);

          case 2:
            config = _context.sent;
            symbol = tokenSymbol || config.quoteAssetSymbol;
            tokenAddress = (0, _getAddress.default)(config, symbol);
            _context.next = 7;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 7:
            dataFeedContract = _context.sent;
            return _context.abrupt("return", dataFeedContract.instance.hasRecentPrice.call({}, [tokenAddress]));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function hasRecentPrice(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = hasRecentPrice;
exports.default = _default;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var getAccountAddress = function getAccountAddress(environment) {
  return environment.account ? environment.account.address : null;
};

var _default = getAccountAddress;
exports.default = _default;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.environment = void 0;

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var environment = {};
exports.environment = environment;

var getEnvironment = function getEnvironment() {
  return (0, _objectSpread2.default)({}, environment);
};

var _default = getEnvironment;
exports.default = _default;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _values = _interopRequireDefault(__webpack_require__(180));

var _typeof2 = _interopRequireDefault(__webpack_require__(181));

var _providers = _interopRequireDefault(__webpack_require__(37));

var isValidEnvironment = function isValidEnvironment(environment) {
  return (0, _typeof2.default)(environment.api) === 'object' && (0, _values.default)(_providers.default).includes(environment.providerType);
};

var _default = isValidEnvironment;
exports.default = _default;

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = require("web3/lib/web3/event");

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _promise = _interopRequireDefault(__webpack_require__(14));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(83));

var _keys = _interopRequireDefault(__webpack_require__(42));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _ramda = __webpack_require__(18);

var _isPromise = _interopRequireDefault(__webpack_require__(84));

var resolvePromiseObject =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(obj) {
    var promises, resolved;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            promises = (0, _keys.default)(obj).map(function (key) {
              return (0, _isPromise.default)(obj[key]) ? obj[key].then(function (resolved) {
                return (0, _defineProperty2.default)({}, key, resolved);
              }) : new _promise.default(function (resolve) {
                return resolve((0, _defineProperty2.default)({}, key, obj[key]));
              });
            });
            _context.next = 3;
            return _promise.default.all(promises);

          case 3:
            resolved = _context.sent;
            return _context.abrupt("return", (0, _ramda.mergeAll)(resolved));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function resolvePromiseObject(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = resolvePromiseObject;
exports.default = _default;

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var isPromise = function isPromise(obj) {
  return obj && typeof obj.then === 'function';
};

var _default = isPromise;
exports.default = _default;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _FundRankingAbi = _interopRequireDefault(__webpack_require__(202));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

/**
 * Get deployed version contract instance
 */
var getRankingContract =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var config;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getConfig.default)(environment);

          case 2:
            config = _context.sent;
            return _context.abrupt("return", environment.api.newContract(_FundRankingAbi.default, config.rankingAddress));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getRankingContract(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getRankingContract;
exports.default = _default;

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/toConsumableArray");

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

var _assign = _interopRequireDefault(__webpack_require__(38));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(86));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(12));

var _entries = _interopRequireDefault(__webpack_require__(54));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tokenInfo = __webpack_require__(43);

var bignumber_js_1 = __webpack_require__(4);

var getTokenInfo = function getTokenInfo(tokenSymbol) {
  return tokenInfo.live[tokenSymbol];
};

var getSymbol = function getSymbol(address) {
  return (0, _entries.default)(tokenInfo.live).find(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        symbol = _ref2[0],
        info = _ref2[1];

    return info.address.toLowerCase() === address.toLowerCase();
  })[0];
};

var getDecimals = function getDecimals(tokenSymbol) {
  return getTokenInfo(tokenSymbol).decimals;
};

var toReadable = function toReadable(quantity, tokenSymbol) {
  var decimals = getDecimals(tokenSymbol);
  return new bignumber_js_1.default(quantity).div(Math.pow(10, decimals));
};

var getPrices = function getPrices(order) {
  return {
    buy: new bignumber_js_1.default(order.sell.howMuch).div(order.buy.howMuch),
    sell: new bignumber_js_1.default(order.buy.howMuch).div(order.sell.howMuch)
  };
};

var formatRelayerOrderbook = function formatRelayerOrderbook(exchange) {
  return function (bids, asks) {
    var formattedBids = bids.map(function (order) {
      return {
        id: order.salt,
        owner: order.maker,
        isActive: true,
        sell: {
          symbol: getSymbol(order.makerTokenAddress),
          howMuch: toReadable(order.makerTokenAmount, getSymbol(order.makerTokenAddress))
        },
        buy: {
          symbol: getSymbol(order.takerTokenAddress),
          howMuch: toReadable(order.takerTokenAmount, getSymbol(order.takerTokenAddress))
        },
        type: 'buy',
        makerFee: order.makerFee,
        takerFee: order.takerFee,
        signature: order.ecSignature,
        expiration: order.expirationUnixTimestampSec,
        feeRecipient: order.feeRecipient,
        exchangeContractAddress: order.exchangeContractAddress,
        exchange: exchange
      };
    });
    var formattedAsks = asks.map(function (order) {
      return {
        id: order.salt,
        owner: order.maker,
        isActive: true,
        sell: {
          symbol: getSymbol(order.makerTokenAddress),
          howMuch: toReadable(order.makerTokenAmount, getSymbol(order.makerTokenAddress))
        },
        buy: {
          symbol: getSymbol(order.takerTokenAddress),
          howMuch: toReadable(order.takerTokenAmount, getSymbol(order.takerTokenAddress))
        },
        type: 'sell',
        makerFee: order.makerFee,
        takerFee: order.takerFee,
        signature: order.ecSignature,
        expiration: order.expirationUnixTimestampSec,
        feeRecipient: order.feeRecipient,
        exchangeContractAddress: order.exchangeContractAddress,
        exchange: exchange
      };
    });
    var orderbook = (0, _toConsumableArray2.default)(formattedBids).concat((0, _toConsumableArray2.default)(formattedAsks)).map(function (order) {
      return (0, _assign.default)({}, order, {
        price: order.type === 'buy' ? getPrices(order).buy : getPrices(order).sell
      });
    });
    return orderbook;
  };
};

exports.default = formatRelayerOrderbook;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var R = __webpack_require__(18); // MLN-T-M => MLN


var getStemmedSymbol = R.compose(R.cond([[R.equals('ETH'), R.always('WETH')], [R.T, R.identity]]), R.nth(0), R.split('-'));
exports.default = getStemmedSymbol;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var tokenInfo = __webpack_require__(43);

var R = __webpack_require__(18);

var getTokenAddress = function getTokenAddress(symbol) {
  return R.path(['live', symbol, 'address'], tokenInfo);
};

exports.default = getTokenAddress;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(212);

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _promise = _interopRequireDefault(__webpack_require__(14));

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = _promise.default))(function (resolve, reject) {
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
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var graphql_schema_1 = __webpack_require__(92);

var graphql_subscriptions_1 = __webpack_require__(230);

var graphql_yoga_1 = __webpack_require__(231);

function start(port) {
  return __awaiter(this, void 0, void 0,
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var pubsub, server;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pubsub = new graphql_subscriptions_1.PubSub();
            server = new graphql_yoga_1.GraphQLServer({
              schema: graphql_schema_1.makeSchema(),
              context: function context() {
                return graphql_schema_1.makeContext(pubsub);
              }
            });
            _context.next = 4;
            return server.start({
              port: port
            });

          case 4:
            // tslint:disable-next-line:no-console
            console.log("Server is running on http://localhost:".concat(port));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
}

start(parseInt(process.env.PORT, 10));

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var graphql_tools_1 = __webpack_require__(93);

var resolvers_1 = __webpack_require__(94);

var schema = __webpack_require__(219);

exports.makeContext = function (pubsub) {
  return {
    pubsub: pubsub
  };
};

exports.makeSchema = function () {
  return graphql_tools_1.makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolvers_1.default
  });
};

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Orderbook_1 = __webpack_require__(95);

var OrderbookEntry_1 = __webpack_require__(96);

var Quantity_1 = __webpack_require__(97);

var Query_1 = __webpack_require__(98);

var Subscription_1 = __webpack_require__(208);

var Symbol_1 = __webpack_require__(218);

exports.default = {
  Query: Query_1.default,
  Subscription: Subscription_1.default,
  Symbol: Symbol_1.default,
  Quantity: Quantity_1.default,
  Orderbook: Orderbook_1.default,
  OrderbookEntry: OrderbookEntry_1.default
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var allOrders = function allOrders(parent) {
  return parent.allOrders;
};

var buyEntries = function buyEntries(parent) {
  return parent.buyEntries;
};

var sellEntries = function sellEntries(parent) {
  return parent.sellEntries;
};

var totalBuyVolume = function totalBuyVolume(parent) {
  return parent.totalBuyVolume;
};

var totalSellVolume = function totalSellVolume(parent) {
  return parent.totalSellVolume;
};

exports.default = {
  allOrders: allOrders,
  buyEntries: buyEntries,
  sellEntries: sellEntries,
  totalBuyVolume: totalBuyVolume,
  totalSellVolume: totalSellVolume
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var order = function order(parent) {
  return parent.order;
};

var volume = function volume(parent) {
  return parent.volume;
};

exports.default = {
  order: order,
  volume: volume
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var graphql_1 = __webpack_require__(50);

exports.default = new graphql_1.GraphQLScalarType({
  name: 'Quantity',
  parseValue: function parseValue(value) {
    return value;
  },
  serialize: function serialize(value) {
    return value.toString();
  },
  parseLiteral: function parseLiteral(ast) {
    if (ast.kind === graphql_1.Kind.STRING) {
      return ast.value.toString();
    }

    return null;
  }
});

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _promise = _interopRequireDefault(__webpack_require__(14));

var _this = void 0;

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = _promise.default))(function (resolve, reject) {
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
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var melon_js_1 = __webpack_require__(40);

var price = function price(parent, args, context) {
  return __awaiter(_this, void 0, void 0,
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var environment;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return melon_js_1.getParityProvider();

          case 2:
            environment = _context.sent;
            return _context.abrupt("return", melon_js_1.getPrice(environment, args.symbol));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
};

exports.default = {
  price: price
};

/***/ }),
/* 99 */
/***/ (function(module, exports) {

// this file tracks exchanges external to the Melon protocol
module.exports = {
  live: {
    'OasisDex' : {
      address: '0x14FBCA95be7e99C15Cc2996c6C9d841e54B79425',
      data: '',
      url: 'https://oasisdex.com',
      githubHint: '',
    }
  }
};


/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = [{"constant":true,"inputs":[],"name":"TERMS_AND_CONDITIONS","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"shutDown","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"GOVERNANCE","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"withId","type":"uint256"}],"name":"getFundById","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLastFundId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofManager","type":"address"}],"name":"getFundByManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofFund","type":"address"}],"name":"shutDownFund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"COMPLIANCE","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"CANONICAL_PRICEFEED","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VERSION_NUMBER","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MELON_ASSET","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofNewOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"NATIVE_ASSET","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"listOfFunds","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNativeAsset","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofFundName","type":"bytes32"},{"name":"ofQuoteAsset","type":"address"},{"name":"ofManagementFee","type":"uint256"},{"name":"ofPerformanceFee","type":"uint256"},{"name":"ofCompliance","type":"address"},{"name":"ofRiskMgmt","type":"address"},{"name":"ofExchanges","type":"address[]"},{"name":"ofDefaultAssets","type":"address[]"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"setupFund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"termsAndConditionsAreSigned","outputs":[{"name":"signed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"managerToFunds","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isShutDown","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"versionNumber","type":"string"},{"name":"ofGovernance","type":"address"},{"name":"ofMelonAsset","type":"address"},{"name":"ofNativeAsset","type":"address"},{"name":"ofCanonicalPriceFeed","type":"address"},{"name":"ofCompetitionCompliance","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ofFund","type":"address"}],"name":"FundUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"}],"name":"FundUpdated","type":"event"}]

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = [{"constant":false,"inputs":[{"name":"ofExchange","type":"address"},{"name":"querySignature","type":"bytes4"}],"name":"exchangeMethodIsAllowed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"stakeRanking","outputs":[{"name":"amount","type":"uint256"},{"name":"staker","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"data","type":"bytes"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"},{"name":"amount","type":"uint256"},{"name":"data","type":"bytes"}],"name":"stakeFor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"ofAssets","type":"address[]"}],"name":"hasRecentPrices","outputs":[{"name":"areRecent","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofAsset","type":"address"},{"name":"inputName","type":"bytes32"},{"name":"inputSymbol","type":"bytes8"},{"name":"inputDecimals","type":"uint256"},{"name":"inputUrl","type":"string"},{"name":"inputIpfsHash","type":"string"},{"name":"ofBreakInBreakOut","type":"address[2]"},{"name":"inputStandards","type":"uint256[]"},{"name":"inputFunctionSignatures","type":"bytes4[]"}],"name":"updateAsset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getLastUpdateId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofAsset","type":"address"}],"name":"assetIsRegistered","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofAsset","type":"address"},{"name":"assetIndex","type":"uint256"}],"name":"removeAsset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"lastStakedFor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isStakingFeed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOperators","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"},{"name":"amount","type":"uint256"},{"name":"data","type":"bytes"}],"name":"burnStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"registrar","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofAssets","type":"address[]"},{"name":"newPrices","type":"uint256[]"}],"name":"update","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"updatesThisEpoch","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"disableUpdates","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getValidity","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VALIDITY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofAsset","type":"address"}],"name":"getPrice","outputs":[{"name":"price","type":"uint256"},{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newCount","type":"uint256"}],"name":"setMinimumPriceCount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"totalStakedFor","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"superFeed","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNextEpochTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"stakeHistory","outputs":[{"name":"at","type":"uint256"},{"name":"amount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofAsset","type":"address"}],"name":"getName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofAsset","type":"address"},{"name":"inputName","type":"bytes32"},{"name":"inputSymbol","type":"bytes8"},{"name":"inputDecimals","type":"uint256"},{"name":"inputUrl","type":"string"},{"name":"inputIpfsHash","type":"string"},{"name":"breakInBreakOut","type":"address[2]"},{"name":"inputStandards","type":"uint256[]"},{"name":"inputFunctionSignatures","type":"bytes4[]"}],"name":"registerAsset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ofAsset","type":"address"},{"name":"querySignature","type":"bytes4"}],"name":"assetMethodIsAllowed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"isOperator","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofExchange","type":"address"}],"name":"getExchangeFunctionSignatures","outputs":[{"name":"","type":"bytes4[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"supportsHistory","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"stakingToken","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"enableUpdates","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalStaked","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getStakersAndAmounts","outputs":[{"name":"","type":"address[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"updatesAreAllowed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofExchange","type":"address"},{"name":"ofExchangeAdapter","type":"address"},{"name":"inputTakesCustody","type":"bool"},{"name":"inputFunctionSignatures","type":"bytes4[]"}],"name":"registerExchange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INTERVAL","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"setupStakingPriceFeed","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofAsset","type":"address"}],"name":"getPriceInfo","outputs":[{"name":"isRecent","type":"bool"},{"name":"price","type":"uint256"},{"name":"assetDecimals","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"operatorsUpdatingThisEpoch","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_UPDATES_PER_EPOCH","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofAssets","type":"address[]"}],"name":"getPrices","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getInterval","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"getPriceFeedsByOwner","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofAsset","type":"address"}],"name":"getInvertedPriceInfo","outputs":[{"name":"isRecent","type":"bool"},{"name":"invertedPrice","type":"uint256"},{"name":"assetDecimals","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PRE_EPOCH_UPDATE_PERIOD","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"sellAsset","type":"address"},{"name":"buyAsset","type":"address"},{"name":"sellQuantity","type":"uint256"},{"name":"buyQuantity","type":"uint256"}],"name":"getOrderPriceInfo","outputs":[{"name":"orderPrice","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofExchange","type":"address"},{"name":"ofExchangeAdapter","type":"address"},{"name":"inputTakesCustody","type":"bool"},{"name":"inputFunctionSignatures","type":"bytes4[]"}],"name":"updateExchange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"registeredAssets","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofBase","type":"address"},{"name":"ofQuote","type":"address"}],"name":"getReferencePriceInfo","outputs":[{"name":"isRecent","type":"bool"},{"name":"referencePrice","type":"uint256"},{"name":"decimal","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"update","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"exchangeInformation","outputs":[{"name":"exists","type":"bool"},{"name":"adapter","type":"address"},{"name":"takesCustody","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofNewOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getRegisteredExchanges","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"subFeedPostUpdateHook","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ofExchange","type":"address"},{"name":"exchangeIndex","type":"uint256"}],"name":"removeExchange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"assetsToPrices","outputs":[{"name":"price","type":"uint256"},{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLastEpochTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numOperators","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofAsset","type":"address"}],"name":"hasRecentPrice","outputs":[{"name":"isRecent","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"unsorted","type":"uint256[]"}],"name":"medianize","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"updateId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"INCEPTION","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"registeredExchanges","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastUpdateTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"data","type":"bytes"}],"name":"unstake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"ofAsset","type":"address"}],"name":"getSymbol","outputs":[{"name":"","type":"bytes8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"blockNumber","type":"uint256"}],"name":"totalStakedAt","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofOperator","type":"address"}],"name":"hasUpdatedThisEpoch","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofAsset","type":"address"}],"name":"getDecimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRegisteredAssets","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getQuoteAsset","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isRanked","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"stakesFor","outputs":[{"name":"at","type":"uint256"},{"name":"amount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"sellAsset","type":"address"},{"name":"buyAsset","type":"address"}],"name":"existsPriceOnAssetPair","outputs":[{"name":"isExistent","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumPriceCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"assetInformation","outputs":[{"name":"exists","type":"bool"},{"name":"name","type":"bytes32"},{"name":"symbol","type":"bytes8"},{"name":"decimals","type":"uint256"},{"name":"url","type":"string"},{"name":"ipfsHash","type":"string"},{"name":"breakIn","type":"address"},{"name":"breakOut","type":"address"},{"name":"price","type":"uint256"},{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minimumStake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"blockNumber","type":"uint256"}],"name":"totalStakedForAt","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"QUOTE_ASSET","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofExchange","type":"address"}],"name":"exchangeIsRegistered","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofExchange","type":"address"}],"name":"getExchangeInformation","outputs":[{"name":"","type":"address"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"ofStakingAsset","type":"address"},{"name":"ofQuoteAsset","type":"address"},{"name":"quoteAssetName","type":"bytes32"},{"name":"quoteAssetSymbol","type":"bytes8"},{"name":"quoteAssetDecimals","type":"uint256"},{"name":"quoteAssetUrl","type":"string"},{"name":"quoteAssetIpfsHash","type":"string"},{"name":"quoteAssetBreakInBreakOut","type":"address[2]"},{"name":"quoteAssetStandards","type":"uint256[]"},{"name":"quoteAssetFunctionSignatures","type":"bytes4[]"},{"name":"updateInfo","type":"uint256[4]"},{"name":"stakingInfo","type":"uint256[2]"},{"name":"ofGovernance","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ofPriceFeed","type":"address"}],"name":"SetupPriceFeed","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"hash","type":"bytes32"}],"name":"PriceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"total","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"total","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"Unstaked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"StakeBurned","type":"event"}]

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = [{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getTokenContract = _interopRequireDefault(__webpack_require__(21));

var _toReadable = _interopRequireDefault(__webpack_require__(9));

/**
 * @returns total supply of a token by its symbol
 */
var getTotalSupply =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var symbol, config, tokenContract, totalSupply;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            symbol = _ref.symbol;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            _context.next = 6;
            return (0, _getTokenContract.default)(environment, symbol);

          case 6:
            tokenContract = _context.sent;
            _context.next = 9;
            return tokenContract.instance.totalSupply.call({}, []);

          case 9:
            totalSupply = _context.sent;
            return _context.abrupt("return", (0, _toReadable.default)(config, totalSupply, symbol));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getTotalSupply(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getTotalSupply;
exports.default = _default;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/object/create");

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _getAllowance = _interopRequireDefault(__webpack_require__(51));

var _approve = _interopRequireDefault(__webpack_require__(25));

/**
 * Ensures that `spender` still has the allowance to spend `quantity` of tokens
 * with `sympol` of `owner`. If current allowance is below requested allowance,
 * only the difference is approved again.
 *
 * @returns the actual approved quantity
 */
var ensureAllowance =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var symbol, owner, spender, quantity, current, missing, approved;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            symbol = _ref.symbol, owner = _ref.owner, spender = _ref.spender, quantity = _ref.quantity;
            _context.next = 3;
            return (0, _getAllowance.default)(environment, {
              symbol: symbol,
              owner: owner,
              spender: spender
            });

          case 3:
            current = _context.sent;
            missing = quantity.minus(current);
            _context.next = 7;
            return (0, _approve.default)(symbol, spender, missing, environment, {});

          case 7:
            approved = _context.sent;
            return _context.abrupt("return", approved ? missing : new _bignumber.default(0));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function ensureAllowance(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = ensureAllowance;
exports.default = _default;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _findEventInLog = _interopRequireDefault(__webpack_require__(11));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getTokenContract = _interopRequireDefault(__webpack_require__(21));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

var _toProcessable = _interopRequireDefault(__webpack_require__(10));

/**
 * Transfers `quantity` amount of token with `symbol` from `fromAddress` to
 * `toAddress`
 *
 * @throws {EnsureError}
 * @returns `true` if successful, otherwise it throws
 */
var transferFrom =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var symbol, toAddress, quantity, config, tokenContract, fromAddress, args, receipt, transferLogEntry;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            symbol = _ref.symbol, toAddress = _ref.toAddress, quantity = _ref.quantity;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            _context.next = 6;
            return (0, _getTokenContract.default)(environment, symbol);

          case 6:
            tokenContract = _context.sent;
            fromAddress = environment.account.address;
            args = [fromAddress, toAddress, (0, _toProcessable.default)(config, quantity, symbol)];
            _context.next = 11;
            return (0, _sendTransaction.default)(tokenContract, 'transferFrom', args, environment);

          case 11:
            receipt = _context.sent;
            transferLogEntry = (0, _findEventInLog.default)('Transfer', receipt);
            return _context.abrupt("return", !!transferLogEntry);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function transferFrom(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = transferFrom;
exports.default = _default;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _findEventInLog = _interopRequireDefault(__webpack_require__(11));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getTokenContract = _interopRequireDefault(__webpack_require__(21));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

var _toProcessable = _interopRequireDefault(__webpack_require__(10));

/**
 * Transfer `quantity` amount of tokens with symbol `symbol` from `from`
 * account to `toAddress`. In contrast to _transferFrom_, this function can
 * be called without approving the quantity/tokens first, if `from` can sign
 * the transaction (i.e. unlocked node or the account of logged in user)
 *
 * @throws {EnsureError}
 * @returns `true` if transfer is successful
 */
var transferTo =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var symbol, toAddress, quantity, config, tokenContract, args, receipt, transferLogEntry;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            symbol = _ref.symbol, toAddress = _ref.toAddress, quantity = _ref.quantity;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            _context.next = 6;
            return (0, _getTokenContract.default)(environment, symbol);

          case 6:
            tokenContract = _context.sent;
            args = [toAddress, (0, _toProcessable.default)(config, quantity, symbol), ''];
            _context.next = 10;
            return (0, _sendTransaction.default)(tokenContract, 'transfer', args, environment, {});

          case 10:
            receipt = _context.sent;
            transferLogEntry = (0, _findEventInLog.default)('Transfer', receipt);
            return _context.abrupt("return", !!transferLogEntry);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function transferTo(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = transferTo;
exports.default = _default;

/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = [{"constant":true,"inputs":[{"name":"onExchange","type":"address"},{"name":"id","type":"uint256"}],"name":"getTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"onExchange","type":"address"},{"name":"id","type":"uint256"}],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"approveOnly","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"onExchange","type":"address"},{"name":"sellAsset","type":"address"},{"name":"buyAsset","type":"address"},{"name":"sellQuantity","type":"uint256"},{"name":"buyQuantity","type":"uint256"}],"name":"makeOrder","outputs":[{"name":"id","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"onExchange","type":"address"},{"name":"id","type":"uint256"}],"name":"cancelOrder","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"onExchange","type":"address"},{"name":"id","type":"uint256"},{"name":"quantity","type":"uint256"}],"name":"takeOrder","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"onExchange","type":"address"}],"name":"getLastOrderId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"onExchange","type":"address"},{"name":"id","type":"uint256"}],"name":"isActive","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isApproveOnly","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"onExchange","type":"address"},{"name":"id","type":"uint256"}],"name":"getOrder","outputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"}],"name":"OrderUpdated","type":"event"}]

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _toReadable = _interopRequireDefault(__webpack_require__(9));

var _getDecimals = _interopRequireDefault(__webpack_require__(29));

var _getSymbol = _interopRequireDefault(__webpack_require__(17));

var _getRecentTrades = _interopRequireDefault(__webpack_require__(62));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _toDate = _interopRequireDefault(__webpack_require__(16));

/**
 * Get recent trades for `fundAddress` `inlastXdays`.
 */
var getFundRecentTrades =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundAddress, _ref$inlastXdays, inlastXdays, recentTrades, config, trade, arrayOfHashes;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundAddress = _ref.fundAddress, _ref$inlastXdays = _ref.inlastXdays, inlastXdays = _ref$inlastXdays === void 0 ? 1 : _ref$inlastXdays;
            _context.next = 3;
            return (0, _getRecentTrades.default)(environment, {
              baseTokenSymbol: undefined,
              quoteTokenSymbol: undefined,
              inlastXdays: inlastXdays
            });

          case 3:
            recentTrades = _context.sent;
            _context.next = 6;
            return (0, _getConfig.default)(environment);

          case 6:
            config = _context.sent;
            arrayOfHashes = [];
            return _context.abrupt("return", recentTrades.map(function (event) {
              var maker = event.params.maker.value;
              var taker = event.params.taker.value;
              var giveAmount = event.params.give_amt.value;
              var takeAmount = event.params.take_amt.value;

              if ((maker === fundAddress || taker === fundAddress) && arrayOfHashes.indexOf(event.transactionHash) === -1) {
                arrayOfHashes.push(event.transactionHash);
                var buySymbol = (0, _getSymbol.default)(config, event.params.pay_gem.value.toLowerCase());
                var sellSymbol = (0, _getSymbol.default)(config, event.params.buy_gem.value.toLowerCase());
                trade = {
                  maker: maker,
                  taker: taker,
                  timestamp: (0, _toDate.default)(event.params.timestamp.value),
                  sellQuantity: giveAmount,
                  buyQuantity: takeAmount,
                  sellToken: sellSymbol,
                  buyToken: buySymbol,
                  transactionHash: event.transactionHash
                }; // case BUY ORDER

                if (sellSymbol === config.quoteAssetSymbol) {
                  var decimalDifference = (0, _getDecimals.default)(config, sellSymbol) - (0, _getDecimals.default)(config, buySymbol);

                  if ((0, _getDecimals.default)(config, buySymbol) !== 18) {
                    trade.price = new _bignumber.default(giveAmount).div(takeAmount).div(Math.pow(10, decimalDifference));
                  } else {
                    trade.price = new _bignumber.default(giveAmount).div(takeAmount);
                  }

                  trade.type = 'buy';
                  trade.quantity = (0, _toReadable.default)(config, takeAmount, buySymbol);
                } else if (buySymbol === config.quoteAssetSymbol) {
                  var _decimalDifference = (0, _getDecimals.default)(config, buySymbol) - (0, _getDecimals.default)(config, sellSymbol);

                  if ((0, _getDecimals.default)(config, sellSymbol) !== 18) {
                    trade.price = new _bignumber.default(takeAmount).div(giveAmount).div(Math.pow(10, _decimalDifference));
                  } else {
                    trade.price = new _bignumber.default(takeAmount).div(giveAmount);
                  }

                  trade.type = 'sell';
                  trade.quantity = (0, _toReadable.default)(config, giveAmount, sellSymbol);
                } else {
                  return null;
                }

                return trade;
              }

              return null;
            }).filter(function (o) {
              return !!o;
            }));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getFundRecentTrades(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getFundRecentTrades;
exports.default = _default;

/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = [{"constant":true,"inputs":[],"name":"matchingEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"sell_gem","type":"address"},{"name":"buy_gem","type":"address"}],"name":"getBestOffer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"pay_gem","type":"address"},{"name":"pay_amt","type":"uint256"},{"name":"buy_gem","type":"address"},{"name":"min_fill_amount","type":"uint256"}],"name":"sellAllAmount","outputs":[{"name":"fill_amt","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pay_gem","type":"address"},{"name":"buy_gem","type":"address"},{"name":"pay_amt","type":"uint128"},{"name":"buy_amt","type":"uint128"}],"name":"make","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"buy_gem","type":"address"},{"name":"pay_gem","type":"address"},{"name":"pay_amt","type":"uint256"}],"name":"getBuyAmount","outputs":[{"name":"fill_amt","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"baseToken","type":"address"},{"name":"quoteToken","type":"address"}],"name":"addTokenPairWhitelist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"baseToken","type":"address"},{"name":"quoteToken","type":"address"}],"name":"remTokenPairWhitelist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pay_amt","type":"uint256"},{"name":"pay_gem","type":"address"},{"name":"buy_amt","type":"uint256"},{"name":"buy_gem","type":"address"},{"name":"pos","type":"uint256"}],"name":"offer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"pos","type":"uint256"}],"name":"insert","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"last_offer_id","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"matchingEnabled_","type":"bool"}],"name":"setMatchingEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"cancel","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getOffer","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"del_rank","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"bytes32"},{"name":"maxTakeAmount","type":"uint128"}],"name":"take","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"pay_gem","type":"address"}],"name":"getMinSell","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTime","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getNextUnsortedOffer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"close_time","outputs":[{"name":"","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"_span","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"_best","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id_","type":"bytes32"}],"name":"bump","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"sell_gem","type":"address"},{"name":"buy_gem","type":"address"}],"name":"getOfferCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"buy_gem","type":"address"},{"name":"buy_amt","type":"uint256"},{"name":"pay_gem","type":"address"},{"name":"max_fill_amount","type":"uint256"}],"name":"buyAllAmount","outputs":[{"name":"fill_amt","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"isActive","outputs":[{"name":"active","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"offers","outputs":[{"name":"pay_amt","type":"uint256"},{"name":"pay_gem","type":"address"},{"name":"buy_amt","type":"uint256"},{"name":"buy_gem","type":"address"},{"name":"owner","type":"address"},{"name":"timestamp","type":"uint64"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getFirstUnsortedOffer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"baseToken","type":"address"},{"name":"quoteToken","type":"address"}],"name":"isTokenPairWhitelisted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getBetterOffer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"_dust","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getWorseOffer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"_menu","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"_near","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"bytes32"}],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pay_gem","type":"address"},{"name":"dust","type":"uint256"}],"name":"setMinSell","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isClosed","outputs":[{"name":"closed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"_rank","outputs":[{"name":"next","type":"uint256"},{"name":"prev","type":"uint256"},{"name":"delb","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getOwner","outputs":[{"name":"owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"isOfferSorted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"buyEnabled_","type":"bool"}],"name":"setBuyEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"},{"name":"amount","type":"uint256"}],"name":"buy","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pay_amt","type":"uint256"},{"name":"pay_gem","type":"address"},{"name":"buy_amt","type":"uint256"},{"name":"buy_gem","type":"address"},{"name":"pos","type":"uint256"},{"name":"rounding","type":"bool"}],"name":"offer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"pay_amt","type":"uint256"},{"name":"pay_gem","type":"address"},{"name":"buy_amt","type":"uint256"},{"name":"buy_gem","type":"address"}],"name":"offer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"buyEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"pay_gem","type":"address"},{"name":"buy_gem","type":"address"},{"name":"buy_amt","type":"uint256"}],"name":"getPayAmount","outputs":[{"name":"fill_amt","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"close_time","type":"uint64"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"}],"name":"LogItemUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pay_amt","type":"uint256"},{"indexed":true,"name":"pay_gem","type":"address"},{"indexed":false,"name":"buy_amt","type":"uint256"},{"indexed":true,"name":"buy_gem","type":"address"}],"name":"LogTrade","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"bytes32"},{"indexed":true,"name":"pair","type":"bytes32"},{"indexed":true,"name":"maker","type":"address"},{"indexed":false,"name":"pay_gem","type":"address"},{"indexed":false,"name":"buy_gem","type":"address"},{"indexed":false,"name":"pay_amt","type":"uint128"},{"indexed":false,"name":"buy_amt","type":"uint128"},{"indexed":false,"name":"timestamp","type":"uint64"}],"name":"LogMake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"bytes32"},{"indexed":true,"name":"pair","type":"bytes32"},{"indexed":true,"name":"maker","type":"address"},{"indexed":false,"name":"pay_gem","type":"address"},{"indexed":false,"name":"buy_gem","type":"address"},{"indexed":false,"name":"pay_amt","type":"uint128"},{"indexed":false,"name":"buy_amt","type":"uint128"},{"indexed":false,"name":"timestamp","type":"uint64"}],"name":"LogBump","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"bytes32"},{"indexed":true,"name":"pair","type":"bytes32"},{"indexed":true,"name":"maker","type":"address"},{"indexed":false,"name":"pay_gem","type":"address"},{"indexed":false,"name":"buy_gem","type":"address"},{"indexed":true,"name":"taker","type":"address"},{"indexed":false,"name":"take_amt","type":"uint128"},{"indexed":false,"name":"give_amt","type":"uint128"},{"indexed":false,"name":"timestamp","type":"uint64"}],"name":"LogTake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"bytes32"},{"indexed":true,"name":"pair","type":"bytes32"},{"indexed":true,"name":"maker","type":"address"},{"indexed":false,"name":"pay_gem","type":"address"},{"indexed":false,"name":"buy_gem","type":"address"},{"indexed":false,"name":"pay_amt","type":"uint128"},{"indexed":false,"name":"buy_amt","type":"uint128"},{"indexed":false,"name":"timestamp","type":"uint64"}],"name":"LogKill","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"isEnabled","type":"bool"}],"name":"LogBuyEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pay_gem","type":"address"},{"indexed":false,"name":"min_amount","type":"uint256"}],"name":"LogMinSell","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"isEnabled","type":"bool"}],"name":"LogMatchingEnabled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"}],"name":"LogUnsortedOffer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"}],"name":"LogSortedOffer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"baseToken","type":"address"},{"indexed":false,"name":"quoteToken","type":"address"}],"name":"LogAddTokenPairWhitelist","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"baseToken","type":"address"},{"indexed":false,"name":"quoteToken","type":"address"}],"name":"LogRemTokenPairWhitelist","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"keeper","type":"address"},{"indexed":false,"name":"id","type":"uint256"}],"name":"LogInsert","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"keeper","type":"address"},{"indexed":false,"name":"id","type":"uint256"}],"name":"LogDelete","type":"event"}]

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _getExchangeAdapterContract = _interopRequireDefault(__webpack_require__(34));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

/**
 * gets last order id
 */
var getLastOrderId =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var config, exchangeAdapterContract, lastOrderIdBigNumber;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getConfig.default)(environment);

          case 2:
            config = _context.sent;
            _context.next = 5;
            return (0, _getExchangeAdapterContract.default)(environment);

          case 5:
            exchangeAdapterContract = _context.sent;
            _context.next = 8;
            return exchangeAdapterContract.instance.getLastOrderId.call({}, [config.exchangeAddress]);

          case 8:
            lastOrderIdBigNumber = _context.sent;
            return _context.abrupt("return", lastOrderIdBigNumber.toNumber());

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getLastOrderId(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getLastOrderId;
exports.default = _default;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _stringify = _interopRequireDefault(__webpack_require__(46));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _ramda = __webpack_require__(18);

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _getActiveOrders = _interopRequireDefault(__webpack_require__(61));

/**
 * Gets orderbook with cumulative Volume for `baseTokenSymbol`/
 * `quoteTokenSymbol` asset pair, ordered by price.
 */
var getOrderbook =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var baseTokenSymbol, quoteTokenSymbol, cleanedOrderbook, totalSellCumulativeVolume, orderbook;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            baseTokenSymbol = _ref.baseTokenSymbol, quoteTokenSymbol = _ref.quoteTokenSymbol;
            _context.next = 3;
            return (0, _getActiveOrders.default)(environment, {
              baseTokenSymbol: baseTokenSymbol,
              quoteTokenSymbol: quoteTokenSymbol
            });

          case 3:
            cleanedOrderbook = _context.sent;
            totalSellCumulativeVolume = cleanedOrderbook.reduce(function (previousVolume, currentOrder) {
              return currentOrder.type === 'sell' ? previousVolume.add(currentOrder.sell.howMuch) : previousVolume;
            }, new _bignumber.default(0));
            orderbook = (0, _ramda.mapAccum)(function (accumulator, currentOrder) {
              var enhancedOrder = (0, _objectSpread2.default)({}, currentOrder);

              if (enhancedOrder.type === 'sell') {
                enhancedOrder.cumulativeVolume = accumulator;
                return [accumulator.minus(enhancedOrder.sell.howMuch), enhancedOrder];
              } else if (enhancedOrder.type === 'buy') {
                enhancedOrder.cumulativeVolume = accumulator.add(enhancedOrder.buy.howMuch);
                return [enhancedOrder.cumulativeVolume, enhancedOrder];
              }

              throw new Error("Order type must be specified ".concat((0, _stringify.default)(enhancedOrder)));
            }, totalSellCumulativeVolume, cleanedOrderbook)[1];
            return _context.abrupt("return", orderbook);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getOrderbook(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getOrderbook;
exports.default = _default;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getOrder = _interopRequireDefault(__webpack_require__(30));

/**
 * Helper function used in melonTracker to enhance order:
 * OrderUpdate event is triggered with `id` param only.
 * @param {Object} params
 * @param {BigNumber} params.id the id of the order
 */
var onOrderUpdate =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(_ref) {
    var id;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = _ref.id;
            return _context.abrupt("return", (0, _getOrder.default)(id.toNumber()));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function onOrderUpdate(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = onOrderUpdate;
exports.default = _default;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

var _bignumber = _interopRequireDefault(__webpack_require__(4));

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

var _bignumber = _interopRequireDefault(__webpack_require__(4));

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getMatchingMarketContract = _interopRequireDefault(__webpack_require__(20));

var _findEventInLog = _interopRequireDefault(__webpack_require__(11));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

/**
 * Cancel an order by `id`
 */
var cancelOrderFromAccount =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var id, simpleMarketContract, receipt, canceled;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = _ref.id;
            _context.next = 3;
            return (0, _getMatchingMarketContract.default)(environment);

          case 3:
            simpleMarketContract = _context.sent;
            _context.next = 6;
            return (0, _sendTransaction.default)(simpleMarketContract, 'cancel', [id], environment, {});

          case 6:
            receipt = _context.sent;
            canceled = (0, _findEventInLog.default)('LogKill', receipt, 'Error during order cancelation');
            return _context.abrupt("return", !!canceled);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function cancelOrderFromAccount(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = cancelOrderFromAccount;
exports.default = _default;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _ethersWallet = _interopRequireDefault(__webpack_require__(23));

var _x9 = __webpack_require__(121);

var _getAddress = _interopRequireDefault(__webpack_require__(13));

var _approve = _interopRequireDefault(__webpack_require__(25));

var _getBalance = _interopRequireDefault(__webpack_require__(22));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var _rush = _interopRequireDefault(__webpack_require__(47));

var _toProcessable = _interopRequireDefault(__webpack_require__(10));

/*
 * Creates an off-chain order according to the 0x specification
 * User must specify the relayer he's targetting and the network he wants to place the order in (testnet/mainnet)
 */
var networkToExchangeContract = {
  KOVAN: '0x12459c951127e0c374ff9105dda097662a027093',
  LIVE: '0x90fe2af704b34e0224bf2299c838e04d4dcf1364'
};
var networkToTokenTransferProxy = {
  KOVAN: '0x087eed4bc1ee3de49befbd66c662b434b15d49d4',
  LIVE: '0x8da0d80f5007ef1e431dd2127178d224e32c2ef4'
};

var make0xOffChainOrder =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, config, relayer, network, sellSymbol, buySymbol, sellHowMuch, buyHowMuch) {
    var sellTokenBalance, approvePromise, salt, order, orderHash, isValidOrderHash, rawSignature, verified, ecSignature, isValidSignature, signedOrder;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getBalance.default)(environment, {
              tokenSymbol: sellSymbol,
              ofAddress: environment.account.address
            });

          case 2:
            sellTokenBalance = _context.sent;
            (0, _ensure.default)(sellTokenBalance.gte(sellHowMuch), "Insufficient balance of ".concat(sellSymbol));
            approvePromise = (0, _approve.default)(environment, {
              symbol: sellSymbol,
              spender: networkToTokenTransferProxy[network],
              quantity: sellHowMuch
            });
            _context.next = 7;
            return (0, _rush.default)(approvePromise, "Approve took longer that 30 seconds. ".concat(sellHowMuch.toString(), " ").concat(sellSymbol, " ").concat(networkToTokenTransferProxy[network]), 50 * 1000);

          case 7:
            salt = _x9.ZeroEx.generatePseudoRandomSalt();
            order = {
              maker: environment.account.address.toLowerCase(),
              taker: '0x0000000000000000000000000000000000000000',
              feeRecipient: '0x0000000000000000000000000000000000000000',
              makerTokenAddress: (0, _getAddress.default)(config, sellSymbol),
              takerTokenAddress: (0, _getAddress.default)(config, buySymbol),
              exchangeContractAddress: networkToExchangeContract[network],
              salt: salt,
              makerFee: '0',
              takerFee: '0',
              makerTokenAmount: (0, _toProcessable.default)(config, sellHowMuch, sellSymbol),
              takerTokenAmount: (0, _toProcessable.default)(config, buyHowMuch, buySymbol),
              expirationUnixTimestampSec: (Date.now() + 3600000).toString()
            };
            orderHash = _x9.ZeroEx.getOrderHashHex(order);
            isValidOrderHash = _x9.ZeroEx.isValidOrderHash(orderHash);
            (0, _ensure.default)(isValidOrderHash, 'Invalid order hash');

            if (!environment.account.signMessage) {
              _context.next = 18;
              break;
            }

            rawSignature = environment.account.signMessage(orderHash);
            verified = _ethersWallet.default.Wallet.verifyMessage(orderHash, rawSignature);
            (0, _ensure.default)(verified.toLowerCase() === environment.account.address.toLowerCase(), 'Invalid signature', {
              expected: environment.account.address,
              received: verified
            });
            _context.next = 21;
            break;

          case 18:
            _context.next = 20;
            return environment.api.eth.sign(environment.account.address, orderHash);

          case 20:
            rawSignature = _context.sent;

          case 21:
            ecSignature = {
              r: rawSignature.substring(0, 66),
              s: "0x".concat(rawSignature.substring(66, 66 + 64)),
              v: parseInt("0x".concat(rawSignature.substring(66 + 64)), 16)
            };
            _context.next = 24;
            return _x9.ZeroEx.isValidSignature(orderHash, ecSignature, environment.account.address);

          case 24:
            isValidSignature = _context.sent;
            (0, _ensure.default)(isValidSignature, 'Invalid signature');
            signedOrder = (0, _objectSpread2.default)({}, order, {
              ecSignature: ecSignature
            });
            return _context.abrupt("return", signedOrder);

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function make0xOffChainOrder(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref.apply(this, arguments);
  };
}();

var _default = make0xOffChainOrder;
exports.default = _default;

/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = require("0x.js");

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _stringify = _interopRequireDefault(__webpack_require__(46));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _approve = _interopRequireDefault(__webpack_require__(25));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var _findEventInLog = _interopRequireDefault(__webpack_require__(11));

var _getAddress = _interopRequireDefault(__webpack_require__(13));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getOrder = _interopRequireDefault(__webpack_require__(30));

var _getMatchingMarketContract = _interopRequireDefault(__webpack_require__(20));

var _rush = _interopRequireDefault(__webpack_require__(47));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

var _toProcessable = _interopRequireDefault(__webpack_require__(10));

/**
 * Make an order directly on the deployed SimpleMarket
 * @param {Order} argument order and more
 * @param argument.timeout wait time for the transaction
 */
var makeOrderFromAccount =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var _ref$sell, sellHowMuch, sellSymbol, _ref$buy, buyHowMuch, buySymbol, _ref$timeout, timeout, config, matchingMarketContract, dust, approvePromise, args, receipt, updateLog, orderId, createdOrder;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref$sell = _ref.sell, sellHowMuch = _ref$sell.howMuch, sellSymbol = _ref$sell.symbol, _ref$buy = _ref.buy, buyHowMuch = _ref$buy.howMuch, buySymbol = _ref$buy.symbol, _ref$timeout = _ref.timeout, timeout = _ref$timeout === void 0 ? 50 * 1000 : _ref$timeout;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            _context.next = 6;
            return (0, _getMatchingMarketContract.default)(environment);

          case 6:
            matchingMarketContract = _context.sent;
            _context.next = 9;
            return matchingMarketContract.instance._dust.call({}, [(0, _getAddress.default)(config, sellSymbol)]);

          case 9:
            dust = _context.sent;

            /* eslint-enable */
            (0, _ensure.default)((0, _toProcessable.default)(config, sellHowMuch, sellSymbol).gte(dust), 'Selling quantity too low.');
            approvePromise = (0, _approve.default)(environment, {
              symbol: sellSymbol,
              spender: matchingMarketContract.address,
              quantity: sellHowMuch
            });
            _context.next = 14;
            return (0, _rush.default)(approvePromise, "Approve took longer that 30 seconds. ".concat(sellHowMuch.toString(), " ").concat(sellSymbol, " ").concat(matchingMarketContract.address), timeout);

          case 14:
            args = [(0, _toProcessable.default)(config, sellHowMuch, sellSymbol), (0, _getAddress.default)(config, sellSymbol), (0, _toProcessable.default)(config, buyHowMuch, buySymbol), (0, _getAddress.default)(config, buySymbol), 0];
            _context.next = 17;
            return (0, _sendTransaction.default)(matchingMarketContract, 'offer', args, environment, {});

          case 17:
            receipt = _context.sent;
            updateLog = (0, _findEventInLog.default)('LogItemUpdate', receipt);
            orderId = updateLog.params.id.value;

            if (!(!receipt || !orderId)) {
              _context.next = 22;
              break;
            }

            throw new Error("Error with make on Simple Market: \n ".concat((0, _stringify.default)(receipt, null, 4)));

          case 22:
            _context.next = 24;
            return (0, _getOrder.default)(environment, {
              id: orderId
            });

          case 24:
            createdOrder = _context.sent;
            return _context.abrupt("return", createdOrder);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function makeOrderFromAccount(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = makeOrderFromAccount;
exports.default = _default;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _findEventInLog = _interopRequireDefault(__webpack_require__(11));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getOrder = _interopRequireDefault(__webpack_require__(30));

var _getMatchingMarketContract = _interopRequireDefault(__webpack_require__(20));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

var _toProcessable = _interopRequireDefault(__webpack_require__(10));

/**
 * Cancel an order by `id`
 */
var takeOrderFromAccount = function takeOrderFromAccount(environment, _ref) {
  var id = _ref.id,
      maxTakeAmount = _ref.maxTakeAmount;
  return (0, _getOrder.default)(environment, {
    id: id
  }).then(
  /*#__PURE__*/
  function () {
    var _ref2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(order) {
      var config, simpleMarketContract, args, transaction, takeLog, takeOrder;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _getConfig.default)(environment);

            case 2:
              config = _context.sent;
              _context.next = 5;
              return (0, _getMatchingMarketContract.default)(environment);

            case 5:
              simpleMarketContract = _context.sent;
              args = [order.id, (0, _toProcessable.default)(config, maxTakeAmount, order.sell.symbol)];
              _context.next = 9;
              return (0, _sendTransaction.default)(simpleMarketContract, 'take', args, environment);

            case 9:
              transaction = _context.sent;
              takeLog = (0, _findEventInLog.default)('LogTake', transaction);
              _context.next = 13;
              return (0, _getOrder.default)(environment, {
                id: takeLog.params.id.value
              });

            case 13:
              takeOrder = _context.sent;
              return _context.abrupt("return", transaction ? {
                order: takeOrder
              } : null);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());
};

var _default = takeOrderFromAccount;
exports.default = _default;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bignumber = _interopRequireDefault(__webpack_require__(4));

/**
 * Calculates the average price over a set of `orders`
 * @param orders need to be sorted and filtered with `matchOrders`
 */
var averagePrice = function averagePrice(orderType, orders) {
  var cumulatedVolumes = orders.reduce(function (accumulator, current) {
    return {
      buy: accumulator.buy.add(current.buy.howMuch),
      sell: accumulator.sell.add(current.sell.howMuch)
    };
  }, {
    buy: new _bignumber.default(0),
    sell: new _bignumber.default(0)
  });

  if (orderType === 'buy') {
    return cumulatedVolumes.sell.div(cumulatedVolumes.buy);
  } else if (orderType === 'sell') {
    return cumulatedVolumes.buy.div(cumulatedVolumes.sell);
  }

  throw new Error('You need to specify offerType to be either "sell" or "buy"');
};

var _default = averagePrice;
exports.default = _default;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bignumber = _interopRequireDefault(__webpack_require__(4));

/**
 * Deserializes an `order`, where serialisation means: Prepare data to be
 * stored in a database like MongoDB, redux store, JSON, ... --> Replace all
 * special objects like BigNumber or Date with a storeable string
 * representation.
 *
 * Deserialisation means: Create these special objects again from their string
 * representation.
 */
var deserializeOrder = function deserializeOrder(order) {
  var result = order;
  result.buy.howMuch = new _bignumber.default(order.buy.howMuch);
  result.sell.howMuch = new _bignumber.default(order.sell.howMuch);
  return result;
};

var _default = deserializeOrder;
exports.default = _default;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var getExchangeList = function getExchangeList() {
  return ['MatchingMarket', 'ZeroExExchange'];
};

var _default = getExchangeList;
exports.default = _default;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _getPrices = _interopRequireDefault(__webpack_require__(45));

/**
 * Filter and sort `orders` that match `orderType` and `priceThreshold`.
 * @param orders orders from the same asset pair
 */
var matchOrders = function matchOrders(orderType, priceThreshold, orders) {
  if (orderType === 'sell') {
    return orders.filter(function (order) {
      return (0, _getPrices.default)(order).sell.lte(priceThreshold);
    }).sort(function (a, b) {
      return (0, _getPrices.default)(a).sell.gt((0, _getPrices.default)(b).sell) ? -1 : 1;
    });
  } else if (orderType === 'buy') {
    return orders.filter(function (order) {
      return (0, _getPrices.default)(order).buy.gte(priceThreshold);
    }).sort(function (a, b) {
      return (0, _getPrices.default)(a).buy.gt((0, _getPrices.default)(b).buy) ? -1 : 1;
    });
  }

  throw new Error('You need to specify orderType to be either "sell" or "buy"');
};

var _default = matchOrders;
exports.default = _default;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Serialize an `order`. Serialisation means: Prepare data to be
 * stored in a database like MongoDB, redux store, JSON, ... --> Replace all
 * special objects like BigNumber or Date with a storeable string
 * representation.
 */
var serializeOrder = function serializeOrder(order) {
  var result = order;
  result.buy.howMuch = order.buy.howMuch.toString();
  result.sell.howMuch = order.sell.howMuch.toString();
  return result;
};

var _default = serializeOrder;
exports.default = _default;

/***/ }),
/* 129 */
/***/ (function(module, exports) {

module.exports = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofAsset","type":"address"}],"name":"addAssetToOwnedAssets","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"gav","type":"uint256"},{"name":"unclaimedFees","type":"uint256"}],"name":"calcNav","outputs":[{"name":"nav","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isInAssetList","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"shutDown","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"shareQuantity","type":"uint256"}],"name":"redeemAllOwnedAssets","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getSymbol","outputs":[{"name":"","type":"bytes8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofExchange","type":"address"},{"name":"orderId","type":"bytes32"},{"name":"updateType","type":"uint8"},{"name":"orderAddresses","type":"address[2]"},{"name":"orderValues","type":"uint256[3]"}],"name":"orderUpdateHook","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getLastRequestId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofAssets","type":"address[]"}],"name":"enableInvestment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"exchanges","outputs":[{"name":"exchange","type":"address"},{"name":"exchangeAdapter","type":"address"},{"name":"takesCustody","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofExchange","type":"address"},{"name":"ofAsset","type":"address"}],"name":"getOpenOrderInfo","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"cancelRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isInvestAllowed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"calcSharePriceAndAllocateFees","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ofAsset","type":"address"}],"name":"quantityHeldInCustodyOfExchange","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"calcGav","outputs":[{"name":"gav","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ORDER_EXPIRATION_TIME","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"giveQuantity","type":"uint256"},{"name":"shareQuantity","type":"uint256"},{"name":"investmentAsset","type":"address"}],"name":"requestInvestment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getLastOrderIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofAssets","type":"address[]"}],"name":"enableRedemption","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"quantity","type":"uint256"}],"name":"toWholeShareUnit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"executeRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimal","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isInOpenMakeOrder","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofExchange","type":"address"},{"name":"ofSellAsset","type":"address"},{"name":"orderId","type":"uint256"}],"name":"addOpenMakeOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"requests","outputs":[{"name":"participant","type":"address"},{"name":"status","type":"uint8"},{"name":"requestType","type":"uint8"},{"name":"requestAsset","type":"address"},{"name":"shareQuantity","type":"uint256"},{"name":"giveQuantity","type":"uint256"},{"name":"receiveQuantity","type":"uint256"},{"name":"timestamp","type":"uint256"},{"name":"atUpdateId","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"exchangeIndex","type":"uint256"},{"name":"method","type":"bytes4"},{"name":"orderAddresses","type":"address[5]"},{"name":"orderValues","type":"uint256[8]"},{"name":"identifier","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"callOnExchange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"shareQuantity","type":"uint256"},{"name":"receiveQuantity","type":"uint256"},{"name":"redemptionAsset","type":"address"}],"name":"requestRedemption","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isRedeemAllowed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofExchange","type":"address"},{"name":"ofAsset","type":"address"}],"name":"orderExpired","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"shareQuantity","type":"uint256"},{"name":"requestedAssets","type":"address[]"}],"name":"emergencyRedeem","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getExchangeInfo","outputs":[{"name":"","type":"address[]"},{"name":"","type":"address[]"},{"name":"","type":"bool[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofAssets","type":"address[]"}],"name":"disableRedemption","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"gav","type":"uint256"}],"name":"calcUnclaimedFees","outputs":[{"name":"managementFee","type":"uint256"},{"name":"performanceFee","type":"uint256"},{"name":"unclaimedFees","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"calcSharePrice","outputs":[{"name":"sharePrice","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"exchangesToOpenMakeOrders","outputs":[{"name":"id","type":"uint256"},{"name":"expiresAt","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofNewOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"performCalculations","outputs":[{"name":"gav","type":"uint256"},{"name":"managementFee","type":"uint256"},{"name":"performanceFee","type":"uint256"},{"name":"unclaimedFees","type":"uint256"},{"name":"feesShareQuantity","type":"uint256"},{"name":"nav","type":"uint256"},{"name":"sharePrice","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"orders","outputs":[{"name":"exchangeAddress","type":"address"},{"name":"orderId","type":"bytes32"},{"name":"updateType","type":"uint8"},{"name":"makerAsset","type":"address"},{"name":"takerAsset","type":"address"},{"name":"makerQuantity","type":"uint256"},{"name":"takerQuantity","type":"uint256"},{"name":"timestamp","type":"uint256"},{"name":"fillTakerQuantity","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getModules","outputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"atLastUnclaimedFeeAllocation","outputs":[{"name":"gav","type":"uint256"},{"name":"managementFee","type":"uint256"},{"name":"performanceFee","type":"uint256"},{"name":"unclaimedFees","type":"uint256"},{"name":"nav","type":"uint256"},{"name":"highWaterMark","type":"uint256"},{"name":"totalSupply","type":"uint256"},{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"quantity","type":"uint256"}],"name":"toSmallestShareUnit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofSender","type":"address"},{"name":"tokenAmount","type":"uint256"},{"name":"metadata","type":"bytes"}],"name":"tokenFallback","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"totalValue","type":"uint256"},{"name":"numShares","type":"uint256"}],"name":"calcValuePerShare","outputs":[{"name":"valuePerShare","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERFORMANCE_FEE_RATE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"ownedAssets","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getManager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MANAGEMENT_FEE_RATE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"creationTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCreationTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofAssets","type":"address[]"}],"name":"disableInvestment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_FUND_ASSETS","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getDecimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"QUOTE_ASSET","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"modules","outputs":[{"name":"pricefeed","type":"address"},{"name":"compliance","type":"address"},{"name":"riskmgmt","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofExchange","type":"address"},{"name":"ofSellAsset","type":"address"}],"name":"removeOpenMakeOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwnedAssetsLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isShutDown","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VERSION","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"ofManager","type":"address"},{"name":"withName","type":"bytes32"},{"name":"ofQuoteAsset","type":"address"},{"name":"ofManagementFee","type":"uint256"},{"name":"ofPerformanceFee","type":"uint256"},{"name":"ofCompliance","type":"address"},{"name":"ofRiskMgmt","type":"address"},{"name":"ofPriceFeed","type":"address"},{"name":"ofExchanges","type":"address[]"},{"name":"ofDefaultAssets","type":"address[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"exchange","type":"address"},{"indexed":false,"name":"orderId","type":"bytes32"},{"indexed":false,"name":"updateType","type":"uint8"}],"name":"OrderUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"assets","type":"address[]"},{"indexed":false,"name":"holdings","type":"uint256[]"},{"indexed":false,"name":"prices","type":"uint256[]"}],"name":"PortfolioContent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"}],"name":"RequestUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"ofParticipant","type":"address"},{"indexed":false,"name":"atTimestamp","type":"uint256"},{"indexed":false,"name":"shareQuantity","type":"uint256"}],"name":"Redeemed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"atTimestamp","type":"uint256"},{"indexed":false,"name":"shareQuantityConverted","type":"uint256"},{"indexed":false,"name":"unclaimed","type":"uint256"}],"name":"FeesConverted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"atTimestamp","type":"uint256"},{"indexed":false,"name":"managementFee","type":"uint256"},{"indexed":false,"name":"performanceFee","type":"uint256"},{"indexed":false,"name":"nav","type":"uint256"},{"indexed":false,"name":"sharePrice","type":"uint256"},{"indexed":false,"name":"totalSupply","type":"uint256"}],"name":"CalculationUpdate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"errorMessage","type":"string"}],"name":"ErrorMessage","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"ofParticipant","type":"address"},{"indexed":false,"name":"atTimestamp","type":"uint256"},{"indexed":false,"name":"shareQuantity","type":"uint256"}],"name":"Created","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"ofParticipant","type":"address"},{"indexed":false,"name":"atTimestamp","type":"uint256"},{"indexed":false,"name":"shareQuantity","type":"uint256"}],"name":"Annihilated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _promise = _interopRequireDefault(__webpack_require__(14));

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getBalance = _interopRequireDefault(__webpack_require__(22));

var _getPrice = _interopRequireDefault(__webpack_require__(65));

var getHoldingsAndPrices =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(environment, _ref) {
    var fundAddress, config, promiseForHoldingsAndPrices, holdingsAndPrices;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fundAddress = _ref.fundAddress;
            _context2.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context2.sent;
            promiseForHoldingsAndPrices = config.assets.map(
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(asset) {
                var balance, price;
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _getBalance.default)(environment, {
                          tokenSymbol: asset.symbol,
                          ofAddress: fundAddress
                        });

                      case 2:
                        balance = _context.sent;
                        _context.next = 5;
                        return (0, _getPrice.default)(environment, asset.symbol);

                      case 5:
                        price = _context.sent;
                        return _context.abrupt("return", {
                          name: asset.symbol,
                          balance: balance,
                          price: price
                        });

                      case 7:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }());
            _context2.next = 7;
            return _promise.default.all(promiseForHoldingsAndPrices);

          case 7:
            holdingsAndPrices = _context2.sent;
            return _context2.abrupt("return", holdingsAndPrices);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getHoldingsAndPrices(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getHoldingsAndPrices;
exports.default = _default;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

/**
 * Returns the addresses of all modules linked to the fund at `fundAddress`
 */
var getModules =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(fundAddress) {
    var fundContract, modules;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundContract = (0, _getFundContract.default)(fundAddress);
            _context.next = 3;
            return fundContract.instance.getModules.call();

          case 3:
            modules = _context.sent;
            return _context.abrupt("return", modules);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getModules(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getModules;
exports.default = _default;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getOrdersHistory = _interopRequireDefault(__webpack_require__(66));

/**
 * Returns all the order the fund has made and whose status is active (this will only work for OasisDex order)
 */
var getOpenOrders =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundAddress, orders;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundAddress = _ref.fundAddress;
            _context.next = 3;
            return (0, _getOrdersHistory.default)(environment, {
              fundAddress: fundAddress
            });

          case 3:
            orders = _context.sent;
            return _context.abrupt("return", orders.filter(function (o) {
              return o.isActive && o.orderType === 'make';
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getOpenOrders(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getOpenOrders;
exports.default = _default;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

/**
 * Get participation authorizations of fund at `fundAddress`
 */
var getParticipationAuthorizations =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundAddress, fundContract, subscriptionAllowed, redemptionAllowed;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundAddress = _ref.fundAddress;
            _context.next = 3;
            return (0, _getFundContract.default)(environment, fundAddress);

          case 3:
            fundContract = _context.sent;
            _context.next = 6;
            return fundContract.instance.isInvestAllowed.call();

          case 6:
            subscriptionAllowed = _context.sent;
            _context.next = 9;
            return fundContract.instance.isRedeemAllowed.call();

          case 9:
            redemptionAllowed = _context.sent;
            return _context.abrupt("return", {
              subscriptionAllowed: subscriptionAllowed,
              redemptionAllowed: redemptionAllowed
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getParticipationAuthorizations(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getParticipationAuthorizations;
exports.default = _default;

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

/**
 * Get all the subscribe/redeem requests this fund at `fundAddress` received so far
 */
var getRequestsHistory =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(fundAddress) {
    var fundContract, requests;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundContract = (0, _getFundContract.default)(fundAddress);
            _context.next = 3;
            return fundContract.instance.requests.call();

          case 3:
            requests = _context.sent;
            return _context.abrupt("return", requests);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getRequestsHistory(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getRequestsHistory;
exports.default = _default;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

var getStake =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(fundAddress) {
    var fundContract, stake;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundContract = (0, _getFundContract.default)(fundAddress);
            _context.next = 3;
            return fundContract.instance.getStake.call();

          case 3:
            stake = _context.sent;
            return _context.abrupt("return", stake);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getStake(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getStake;
exports.default = _default;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

/**
 * Checks if fund at `fundAddress` is shutdown
 */
var isShutDown =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundAddress, fundContract, bool;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundAddress = _ref.fundAddress;
            fundContract = (0, _getFundContract.default)(environment, fundAddress);
            _context.next = 4;
            return fundContract.instance.isShutDown.call();

          case 4:
            bool = _context.sent;
            return _context.abrupt("return", bool);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function isShutDown(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = isShutDown;
exports.default = _default;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

var performCalculations =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundAddress, _ref$precision, precision, fundContract, calculations, totalSupply;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundAddress = _ref.fundAddress, _ref$precision = _ref.precision, precision = _ref$precision === void 0 ? 18 : _ref$precision;
            fundContract = (0, _getFundContract.default)(environment, fundAddress);
            _context.next = 4;
            return fundContract.instance.performCalculations.call();

          case 4:
            calculations = _context.sent;
            _context.next = 7;
            return fundContract.instance.totalSupply.call();

          case 7:
            totalSupply = _context.sent;
            return _context.abrupt("return", {
              gav: calculations[0].div(Math.pow(10, precision)),
              managementReward: calculations[1].div(Math.pow(10, precision)),
              performanceReward: calculations[2].div(Math.pow(10, precision)),
              unclaimedRewards: calculations[3].div(Math.pow(10, precision)),
              rewardsShareQuantity: calculations[4].div(Math.pow(10, precision)),
              nav: calculations[5].div(Math.pow(10, precision)),
              sharePrice: calculations[6].div(Math.pow(10, precision)),
              totalSupply: totalSupply.div(Math.pow(10, precision))
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function performCalculations(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = performCalculations;
exports.default = _default;

/***/ }),
/* 138 */
/***/ (function(module, exports) {

module.exports = [{"constant":true,"inputs":[],"name":"RISK_LEVEL","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"orderPrice","type":"uint256"},{"name":"referencePrice","type":"uint256"},{"name":"sellAsset","type":"address"},{"name":"buyAsset","type":"address"},{"name":"sellQuantity","type":"uint256"},{"name":"buyQuantity","type":"uint256"}],"name":"isMakePermitted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"orderPrice","type":"uint256"},{"name":"referencePrice","type":"uint256"},{"name":"sellAsset","type":"address"},{"name":"buyAsset","type":"address"},{"name":"sellQuantity","type":"uint256"},{"name":"buyQuantity","type":"uint256"}],"name":"isTakePermitted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var _findEventInLog = _interopRequireDefault(__webpack_require__(11));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

var _toDate = _interopRequireDefault(__webpack_require__(16));

/**
 * Convert unclaimed fees of `fundAddress`
 */
var calcSharePriceAndConvertFees =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundAddress, fundContract, isShutDown, owner, receipt, updateLog, feesConvertedArgs;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundAddress = _ref.fundAddress;
            _context.next = 3;
            return (0, _getFundContract.default)(environment, fundAddress);

          case 3:
            fundContract = _context.sent;
            _context.next = 6;
            return fundContract.instance.isShutDown.call();

          case 6:
            isShutDown = _context.sent;
            (0, _ensure.default)(isShutDown === false, 'Fund is shut down');
            _context.next = 10;
            return fundContract.owner();

          case 10:
            owner = _context.sent;
            (0, _ensure.default)(owner.toLowerCase() === environment.account.address.toLowerCase(), 'Not owner of fund');
            _context.next = 14;
            return (0, _sendTransaction.default)(fundContract, 'calcSharePriceAndConvertFees', [], environment);

          case 14:
            receipt = _context.sent;
            updateLog = (0, _findEventInLog.default)('FeesConverted', receipt);
            feesConvertedArgs = updateLog.params;
            return _context.abrupt("return", {
              date: (0, _toDate.default)(feesConvertedArgs.timestamp.value),
              shareQuantity: feesConvertedArgs.shareQuantity.value,
              unclaimedFees: feesConvertedArgs.unclaimedFees.value
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function calcSharePriceAndConvertFees(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = calcSharePriceAndConvertFees;
exports.default = _default;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var _callOnExchange = _interopRequireDefault(__webpack_require__(36));

var _getExchangeName = _interopRequireDefault(__webpack_require__(31));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

var _getMethodNameSignature = _interopRequireDefault(__webpack_require__(26));

var cancelOrder =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundAddress, exchangeAddress, makerAssetSymbol, takerAssetSymbol, identifier, fundContract, isShutDown, owner, orderExpired, method, cancelLog;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundAddress = _ref.fundAddress, exchangeAddress = _ref.exchangeAddress, makerAssetSymbol = _ref.makerAssetSymbol, takerAssetSymbol = _ref.takerAssetSymbol, identifier = _ref.identifier;
            _context.next = 3;
            return (0, _getFundContract.default)(environment, fundAddress);

          case 3:
            fundContract = _context.sent;
            _context.next = 6;
            return fundContract.instance.isShutDown.call();

          case 6:
            isShutDown = _context.sent;
            _context.next = 9;
            return fundContract.instance.owner.call();

          case 9:
            owner = _context.sent;
            _context.next = 12;
            return fundContract.instance.orderExpired.call({}, [exchangeAddress, makerAssetSymbol]);

          case 12:
            orderExpired = _context.sent;
            (0, _ensure.default)(owner.toLowerCase() === environment.account.address.toLowerCase() || isShutDown || orderExpired, 'Order can only be canceled by the owner of the fund, unless the order has expired or the fund has been shut down.');
            _context.next = 16;
            return (0, _getMethodNameSignature.default)(environment, 'cancelOrder');

          case 16:
            method = _context.sent;
            _context.next = 19;
            return (0, _callOnExchange.default)(environment, {
              fundContract: fundContract,
              exchangeAddress: exchangeAddress,
              method: method,
              orderAddresses: ['0x0', '0x0', makerAssetSymbol, takerAssetSymbol, '0x0'],
              orderValues: [0, 0, 0, 0, 0, 0, 0],
              identifier: identifier,
              signature: {}
            });

          case 19:
            cancelLog = _context.sent;
            _context.t0 = parseInt(environment.api.util.bytesToHex(cancelLog.params.orderId.value), 16);
            _context.next = 23;
            return (0, _getExchangeName.default)(environment, cancelLog.params.exchange.value);

          case 23:
            _context.t1 = _context.sent;
            return _context.abrupt("return", {
              id: _context.t0,
              exchange: _context.t1,
              updateType: 'cancel'
            });

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function cancelOrder(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = cancelOrder;
exports.default = _default;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var _callOnExchange = _interopRequireDefault(__webpack_require__(36));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

var _getMethodNameSignature = _interopRequireDefault(__webpack_require__(26));

var _preflightMakeOrder = _interopRequireDefault(__webpack_require__(68));

var _getExchangeName = _interopRequireDefault(__webpack_require__(31));

var makeOrder =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundAddress, exchangeAddress, maker, _ref$taker, taker, makerAssetSymbol, takerAssetSymbol, _ref$feeRecipient, feeRecipient, makerQuantity, takerQuantity, _ref$makerFee, makerFee, _ref$takerFee, takerFee, _ref$timestamp, timestamp, _ref$salt, salt, _ref$fillTakerTokenAm, fillTakerTokenAmount, _ref$dexySignatureMod, dexySignatureMode, _ref$identifier, identifier, _ref$signature, signature, fundContract, preflightCheck, method, updateLog;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundAddress = _ref.fundAddress, exchangeAddress = _ref.exchangeAddress, maker = _ref.maker, _ref$taker = _ref.taker, taker = _ref$taker === void 0 ? '0x0' : _ref$taker, makerAssetSymbol = _ref.makerAssetSymbol, takerAssetSymbol = _ref.takerAssetSymbol, _ref$feeRecipient = _ref.feeRecipient, feeRecipient = _ref$feeRecipient === void 0 ? '0x0' : _ref$feeRecipient, makerQuantity = _ref.makerQuantity, takerQuantity = _ref.takerQuantity, _ref$makerFee = _ref.makerFee, makerFee = _ref$makerFee === void 0 ? 0 : _ref$makerFee, _ref$takerFee = _ref.takerFee, takerFee = _ref$takerFee === void 0 ? 0 : _ref$takerFee, _ref$timestamp = _ref.timestamp, timestamp = _ref$timestamp === void 0 ? 0 : _ref$timestamp, _ref$salt = _ref.salt, salt = _ref$salt === void 0 ? '0x0' : _ref$salt, _ref$fillTakerTokenAm = _ref.fillTakerTokenAmount, fillTakerTokenAmount = _ref$fillTakerTokenAm === void 0 ? 0 : _ref$fillTakerTokenAm, _ref$dexySignatureMod = _ref.dexySignatureMode, dexySignatureMode = _ref$dexySignatureMod === void 0 ? 0 : _ref$dexySignatureMod, _ref$identifier = _ref.identifier, identifier = _ref$identifier === void 0 ? '0x0' : _ref$identifier, _ref$signature = _ref.signature, signature = _ref$signature === void 0 ? {} : _ref$signature;
            _context.next = 3;
            return (0, _getFundContract.default)(environment, fundAddress);

          case 3:
            fundContract = _context.sent;
            _context.next = 6;
            return (0, _preflightMakeOrder.default)(environment, {
              fundContract: fundContract,
              exchangeAddress: exchangeAddress,
              makerAssetSymbol: makerAssetSymbol,
              takerAssetSymbol: takerAssetSymbol,
              makerQuantity: makerQuantity,
              takerQuantity: takerQuantity
            });

          case 6:
            preflightCheck = _context.sent;
            (0, _ensure.default)(preflightCheck, 'One of the pre-conditions of the function makeOrder failed on pre-flight.');
            _context.next = 10;
            return (0, _getMethodNameSignature.default)(environment, 'makeOrder');

          case 10:
            method = _context.sent;
            _context.next = 13;
            return (0, _callOnExchange.default)(environment, {
              fundContract: fundContract,
              exchangeAddress: exchangeAddress,
              method: method,
              orderAddresses: [maker, taker, makerAssetSymbol, takerAssetSymbol, feeRecipient],
              orderValues: [makerQuantity, takerQuantity, makerFee, takerFee, timestamp, salt, fillTakerTokenAmount, dexySignatureMode],
              identifier: identifier,
              signature: signature
            });

          case 13:
            updateLog = _context.sent;
            _context.t0 = parseInt(environment.api.util.bytesToHex(updateLog.params.orderId.value), 16);
            _context.next = 17;
            return (0, _getExchangeName.default)(environment, updateLog.params.exchange.value);

          case 17:
            _context.t1 = _context.sent;
            _context.t2 = updateLog.params.updateType.value === 0 ? 'make' : 'take';
            return _context.abrupt("return", {
              id: _context.t0,
              exchange: _context.t1,
              updateType: _context.t2
            });

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function makeOrder(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = makeOrder;
exports.default = _default;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getVersionContract = _interopRequireDefault(__webpack_require__(15));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

/**
 * Shut down fund at `fundAddress`
 */
var shutDownFund =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundAddress, versionContract, shutDownAllowed, receipt;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundAddress = _ref.fundAddress;
            _context.next = 3;
            return (0, _getVersionContract.default)(environment);

          case 3:
            versionContract = _context.sent;
            _context.next = 6;
            return versionContract.instance.managerToFunds.call({}, [environment.account.address]);

          case 6:
            shutDownAllowed = _context.sent;
            (0, _ensure.default)(shutDownAllowed.toLowerCase() === fundAddress.toLowerCase(), 'Not owner of fund');
            _context.next = 10;
            return (0, _sendTransaction.default)(versionContract, 'shutDownFund', [fundAddress], environment);

          case 10:
            receipt = _context.sent;
            return _context.abrupt("return", receipt);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function shutDownFund(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = shutDownFund;
exports.default = _default;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _promise = _interopRequireDefault(__webpack_require__(14));

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _takeOrder = _interopRequireDefault(__webpack_require__(72));

/**
 * Takes multiple orders from fund at `fundAddress` upon to `totalQuantityAsked`
 * @param orders sorted and filtered orders by matchOrders
 */
var takeMultipleOrders =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(environment, _ref) {
    var orders, fundAddress, totalQuantityAsked, _ref$exchangeNumber, exchangeNumber;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            orders = _ref.orders, fundAddress = _ref.fundAddress, totalQuantityAsked = _ref.totalQuantityAsked, _ref$exchangeNumber = _ref.exchangeNumber, exchangeNumber = _ref$exchangeNumber === void 0 ? 0 : _ref$exchangeNumber;
            return _context2.abrupt("return", orders.reduce(
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(accumulatorPromise, currentOrder) {
                var remainingQuantity, result;
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return accumulatorPromise;

                      case 2:
                        remainingQuantity = _context.sent;

                        if (!remainingQuantity.gt(0)) {
                          _context.next = 8;
                          break;
                        }

                        _context.next = 6;
                        return (0, _takeOrder.default)(environment, {
                          id: currentOrder.id,
                          fundAddress: fundAddress,
                          quantityAsked: remainingQuantity,
                          exchangeNumber: exchangeNumber
                        });

                      case 6:
                        result = _context.sent;
                        remainingQuantity = remainingQuantity.minus(result.executedQuantity);

                      case 8:
                        return _context.abrupt("return", remainingQuantity);

                      case 9:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x3, _x4) {
                return _ref3.apply(this, arguments);
              };
            }(), _promise.default.resolve(new _bignumber.default(totalQuantityAsked))));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function takeMultipleOrders(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = takeMultipleOrders;
exports.default = _default;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var toggleInvestment =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundAddress, fundContract, owner, preInvestmentAllowed, postInvestmentAllowed;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundAddress = _ref.fundAddress;
            _context.next = 3;
            return (0, _getFundContract.default)(environment, fundAddress);

          case 3:
            fundContract = _context.sent;
            _context.next = 6;
            return fundContract.instance.owner.call();

          case 6:
            owner = _context.sent;
            (0, _ensure.default)(owner.toLowerCase() === environment.account.address.toLowerCase(), 'Not owner of fund');
            _context.next = 10;
            return fundContract.instance.isInvestAllowed.call();

          case 10:
            preInvestmentAllowed = _context.sent;

            if (!(preInvestmentAllowed === true)) {
              _context.next = 16;
              break;
            }

            _context.next = 14;
            return (0, _sendTransaction.default)(fundContract, 'disableInvestment', [], environment);

          case 14:
            _context.next = 19;
            break;

          case 16:
            if (!(preInvestmentAllowed === false)) {
              _context.next = 19;
              break;
            }

            _context.next = 19;
            return (0, _sendTransaction.default)(fundContract, 'enableInvestment', [], environment);

          case 19:
            _context.next = 21;
            return fundContract.instance.isInvestAllowed.call();

          case 21:
            postInvestmentAllowed = _context.sent;
            (0, _ensure.default)(preInvestmentAllowed !== postInvestmentAllowed, 'Toggle investment was not successful');
            return _context.abrupt("return", postInvestmentAllowed);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function toggleInvestment(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = toggleInvestment;
exports.default = _default;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

var _ensure = _interopRequireDefault(__webpack_require__(5));

/**
 * Toggles redemption of fund at `fundAddress`
 */
var toggleRedemption =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundAddress, fundContract, owner, preRedemptionAllowed, postRedemptionAllowed;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundAddress = _ref.fundAddress;
            _context.next = 3;
            return (0, _getFundContract.default)(environment, fundAddress);

          case 3:
            fundContract = _context.sent;
            _context.next = 6;
            return fundContract.instance.owner.call();

          case 6:
            owner = _context.sent;
            (0, _ensure.default)(owner.toLowerCase() === environment.account.address.toLowerCase(), 'Not owner of fund');
            _context.next = 10;
            return fundContract.instance.isRedeemAllowed.call();

          case 10:
            preRedemptionAllowed = _context.sent;

            if (!(preRedemptionAllowed === true)) {
              _context.next = 16;
              break;
            }

            _context.next = 14;
            return (0, _sendTransaction.default)(fundContract, 'disableRedemption', [], environment);

          case 14:
            _context.next = 19;
            break;

          case 16:
            if (!(preRedemptionAllowed === false)) {
              _context.next = 19;
              break;
            }

            _context.next = 19;
            return (0, _sendTransaction.default)(fundContract, 'enableRedemption', [], environment);

          case 19:
            _context.next = 21;
            return fundContract.instance.isRedeemAllowed.call();

          case 21:
            postRedemptionAllowed = _context.sent;
            (0, _ensure.default)(preRedemptionAllowed !== postRedemptionAllowed, 'Toggle redemption was not successful');
            return _context.abrupt("return", postRedemptionAllowed);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function toggleRedemption(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = toggleRedemption;
exports.default = _default;

/***/ }),
/* 146 */
/***/ (function(module, exports) {

module.exports = [{"constant":true,"inputs":[],"name":"TERMS_AND_CONDITIONS","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"registeredFundToRegistrants","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"x","type":"address"}],"name":"getRegistrantId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxRegistrants","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"x","type":"address"}],"name":"getRegistrantFund","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"maxBuyinQuantity","type":"uint256"},{"name":"whitelistants","type":"address[]"}],"name":"batchAddToWhitelist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTimeTillEnd","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"endTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"custodian","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"prizeMoneyAsset","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"x","type":"address"}],"name":"isWhitelisted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"payin","type":"uint256"}],"name":"calculatePayout","outputs":[{"name":"payoutQuantity","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMelonAsset","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isCompetitionActive","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"payin","type":"uint256"}],"name":"getCHFValue","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"COMPETITION_VERSION","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"CHF_ASSET","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"bonusRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"whitelistantToMaxBuyin","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"registrants","outputs":[{"name":"fund","type":"address"},{"name":"registrant","type":"address"},{"name":"hasSigned","type":"bool"},{"name":"buyinQuantity","type":"uint256"},{"name":"payoutQuantity","type":"uint256"},{"name":"isRewarded","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalMaxBuyin","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"prizeMoneyQuantity","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MELON_ASSET","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MELON_BASE_UNIT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentTotalBuyin","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofNewOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCompetitionStatusOfRegistrants","outputs":[{"name":"","type":"address[]"},{"name":"","type":"address[]"},{"name":"","type":"bool[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MELON_CONTRACT","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"byManager","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"termsAndConditionsAreSigned","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"fund","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"registerForCompetition","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"registrantToRegistrantIds","outputs":[{"name":"id","type":"uint256"},{"name":"exists","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"ofMelonAsset","type":"address"},{"name":"ofCHFAsset","type":"address"},{"name":"ofCompetitionVersion","type":"address"},{"name":"ofCustodian","type":"address"},{"name":"ofStartTime","type":"uint256"},{"name":"ofEndTime","type":"uint256"},{"name":"ofBonusRate","type":"uint256"},{"name":"ofTotalMaxBuyin","type":"uint256"},{"name":"ofMaxRegistrants","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"withId","type":"uint256"},{"indexed":false,"name":"fund","type":"address"},{"indexed":false,"name":"manager","type":"address"}],"name":"Register","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"registrant","type":"address"},{"indexed":false,"name":"fund","type":"address"},{"indexed":false,"name":"shares","type":"uint256"}],"name":"ClaimReward","type":"event"}]

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getOlympiadContract = _interopRequireDefault(__webpack_require__(32));

var _getRegistrantFund = _interopRequireDefault(__webpack_require__(73));

var _getVersionContract = _interopRequireDefault(__webpack_require__(15));

var _findEventInLog = _interopRequireDefault(__webpack_require__(11));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

var _toReadable = _interopRequireDefault(__webpack_require__(9));

/**
 * Calling this function will register the sender on the competition contract and will allocate to his fund an amount of MLN in proportion of his buyInValue in ETH.
 */
var claimReward =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var registrantFund, olympiadContract, receipt;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getRegistrantFund.default)(environment);

          case 2:
            registrantFund = _context.sent;
            ensure(registrantFund.toLowerCase() !== '0x0000000000000000000000000000000000000000', 'Sender not registered.');
            _context.next = 6;
            return (0, _getOlympiadContract.default)(environment);

          case 6:
            olympiadContract = _context.sent;
            _context.next = 9;
            return (0, _sendTransaction.default)(olympiadContract, 'claimReward', [], environment);

          case 9:
            receipt = _context.sent;
            return _context.abrupt("return", receipt);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function claimReward(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = claimReward;
exports.default = _default;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getOlympiadContract = _interopRequireDefault(__webpack_require__(32));

var _getVersionContract = _interopRequireDefault(__webpack_require__(15));

var _findEventInLog = _interopRequireDefault(__webpack_require__(11));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

var _toReadable = _interopRequireDefault(__webpack_require__(9));

/**
 * Calling this function will register the sender on the competition contract and will allocate to his fund an amount of MLN in proportion of his buyInValue in ETH.
 */
var registerForCompetition =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundAddress, signature, buyInValue, olympiadContract, isCompetitionActive, termsAndConditionsAreSigned, isWhiteListed, currentTotalBuyin, totalMaxBuyIn, CHFValue, whitelistantToMaxBuyin, versionContract, managerToFund, config, etherBalance, registeredFundToRegistrant, registrantToRegistrantId, receipt, registerLog;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundAddress = _ref.fundAddress, signature = _ref.signature, buyInValue = _ref.buyInValue;
            _context.next = 3;
            return (0, _getOlympiadContract.default)(environment);

          case 3:
            olympiadContract = _context.sent;
            _context.next = 6;
            return olympiadContract.instance.isCompetitionActive.call();

          case 6:
            isCompetitionActive = _context.sent;
            ensure(isCompetitionActive, 'Olympiad is inactive.');
            _context.next = 10;
            return olympiadContract.instance.termsAndConditionsAreSigned.call({}, [environment.account.address, signature.v, signature.r, signature.s]);

          case 10:
            termsAndConditionsAreSigned = _context.sent;
            ensure(termsAndConditionsAreSigned, 'Invalid signature of T&Cs');
            _context.next = 14;
            return olympiadContract.instance.isWhitelisted.call({}, [environment.account.address]);

          case 14:
            isWhiteListed = _context.sent;
            ensure(isWhiteListed, 'Sender is not whitelisted. Please perform KYC/AML checks with Bitcoin Suisse');
            _context.next = 18;
            return olympiadContract.instance.currentTotalBuyin.call();

          case 18:
            currentTotalBuyin = _context.sent;
            _context.next = 21;
            return olympiadContract.instance.totalMaxBuyIn.call();

          case 21:
            totalMaxBuyIn = _context.sent;
            ensure(currentTotalBuyin.add(buyInValue).lte(totalMaxBuyIn), 'Max total buy in has been reached.');
            _context.next = 25;
            return olympiadContract.instance.getCHFValue.call({}, [buyInValue]);

          case 25:
            CHFValue = _context.sent;
            _context.next = 28;
            return olympiadContract.instance.whitelistantToMaxBuyin.call({}, [environment.account.address]);

          case 28:
            whitelistantToMaxBuyin = _context.sent;
            ensure(CHFValue.lte(whitelistantToMaxBuyin), 'The buy in amount exceed your max buy in amount (determined by Bitcoin Suisse).');
            _context.next = 32;
            return (0, _getVersionContract.default)(environment);

          case 32:
            versionContract = _context.sent;
            _context.next = 35;
            return versionContract.instance.getFundByManager.call({}, [environment.account.address]);

          case 35:
            managerToFund = _context.sent;
            ensure(fundAddress.toLowerCase() === managerToFund.toLowerCase, 'Sender must register with a fund he owns.');
            _context.next = 39;
            return (0, _getConfig.default)(environment);

          case 39:
            config = _context.sent;
            _context.next = 42;
            return environment.api.eth.getBalance(environment.account.address).then(function (balance) {
              return (0, _toReadable.default)(config, balance, config.nativeAssetSymbol);
            });

          case 42:
            etherBalance = _context.sent;
            ensure(etherBalance.gt(buyInValue), 'Insufficient balance of ether');
            _context.next = 46;
            return olympiadContract.instance.registeredFundToRegistrants.call({}, [fundAddress]);

          case 46:
            registeredFundToRegistrant = _context.sent;
            _context.next = 49;
            return olympiadContract.instance.registrantToRegistrantIds.call({}, [environment.account.address]);

          case 49:
            registrantToRegistrantId = _context.sent;
            ensure(registeredFundToRegistrant === '0x0000000000000000000000000000000000000000' && registrantToRegistrantId[1] === false, 'Sender already registered.');
            _context.next = 53;
            return (0, _sendTransaction.default)(olympiadContract, 'registerForCompetition', [fundAddress, signature.v, signature.r, signature.s], environment, {
              value: buyInValue
            });

          case 53:
            receipt = _context.sent;
            registerLog = (0, _findEventInLog.default)('Register', receipt);
            return _context.abrupt("return", registerLog);

          case 56:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function registerForCompetition(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = registerForCompetition;
exports.default = _default;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _ethersUtils = _interopRequireDefault(__webpack_require__(24));

var _ethersWallet = _interopRequireDefault(__webpack_require__(23));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var _getOlympiadContract = _interopRequireDefault(__webpack_require__(32));

/**
 * Signs terms and conditions of competition with instantiated wallet
 * and returns a signature object with r, s and v require parameters in setupFund function
 */
var signOlympiadTermsAndConditions =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var olympiadContract, competitionHash, rawSignature, verified, hash, v;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getOlympiadContract.default)(environment);

          case 2:
            olympiadContract = _context.sent;
            _context.next = 5;
            return olympiadContract.instance.TERMS_AND_CONDITIONS.call();

          case 5:
            competitionHash = _context.sent;

            if (!environment.account.signMessage) {
              _context.next = 12;
              break;
            }

            rawSignature = environment.account.signMessage(arrayifiedHash);
            verified = _ethersWallet.default.Wallet.verifyMessage(arrayifiedHash, rawSignature);
            (0, _ensure.default)(verified.toLowerCase() === environment.account.address.toLowerCase(), 'Invalid signature of terms and conditions', {
              expected: environment.account.address,
              received: verified
            });
            _context.next = 16;
            break;

          case 12:
            hash = _ethersUtils.default.hexlify(arrayifiedHash);
            _context.next = 15;
            return environment.api.eth.sign(environment.account.address, hash);

          case 15:
            rawSignature = _context.sent;

          case 16:
            v = parseInt(rawSignature.substring(66 + 64), 16);
            return _context.abrupt("return", {
              r: rawSignature.substring(0, 66),
              s: "0x".concat(rawSignature.substring(66, 66 + 64)),
              v: v
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function signOlympiadTermsAndConditions(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = signOlympiadTermsAndConditions;
exports.default = _default;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(12));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

var _getPriceFeedContract = _interopRequireDefault(__webpack_require__(74));

var _toDate = _interopRequireDefault(__webpack_require__(16));

/**
 * Get's the last request and its estimated remaining wait time
 */
var getLastRequest =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundAddress, fundContract, priceFeedContract, interval, totalSupply, lastRequestId, _ref3, _ref4, participant, status, type, timestamp, atUpdateId, maxRemainingWaitSeconds, canBeExecutedInMs, request;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundAddress = _ref.fundAddress;
            _context.next = 3;
            return (0, _getFundContract.default)(environment, fundAddress);

          case 3:
            fundContract = _context.sent;
            _context.next = 6;
            return (0, _getPriceFeedContract.default)(environment);

          case 6:
            priceFeedContract = _context.sent;
            _context.next = 9;
            return priceFeedContract.instance.getInterval.call();

          case 9:
            interval = _context.sent.toNumber();
            _context.next = 12;
            return fundContract.instance.totalSupply.call();

          case 12:
            totalSupply = _context.sent;
            _context.next = 15;
            return fundContract.instance.getLastRequestId.call();

          case 15:
            lastRequestId = _context.sent;
            _context.next = 18;
            return fundContract.instance.requests.call({}, [lastRequestId]);

          case 18:
            _ref3 = _context.sent;
            _ref4 = (0, _slicedToArray2.default)(_ref3, 9);
            participant = _ref4[0];
            status = _ref4[1];
            type = _ref4[2];
            timestamp = _ref4[7];
            atUpdateId = _ref4[8];

            /*
              // Corresponding code on protocol
              now >= add(requests[id].timestamp, module.pricefeed.getInterval()) &&
              module.pricefeed.getLastUpdateId() >= add(requests[id].atUpdateId, 2);
            */
            maxRemainingWaitSeconds = totalSupply.eq(0) ? 0 : 2 * interval;
            canBeExecutedInMs = Math.max(maxRemainingWaitSeconds * 1000 - (new Date() - (0, _toDate.default)(timestamp)), 0);
            request = {
              id: lastRequestId.toNumber(),
              participant: participant,
              status: status.toNumber(),
              type: type.toNumber(),
              timestamp: (0, _toDate.default)(timestamp),
              atUpdateId: atUpdateId.toNumber(),
              canBeExecutedInMs: canBeExecutedInMs
            };
            return _context.abrupt("return", request);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getLastRequest(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getLastRequest;
exports.default = _default;

/***/ }),
/* 151 */
/***/ (function(module, exports) {

module.exports = [{"constant":true,"inputs":[{"name":"sellAsset","type":"address"},{"name":"buyAsset","type":"address"},{"name":"sellQuantity","type":"uint256"},{"name":"buyQuantity","type":"uint256"}],"name":"getOrderPrice","outputs":[{"name":"orderPrice","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofAssets","type":"address[]"}],"name":"hasRecentPrices","outputs":[{"name":"areRecent","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofAsset","type":"address"}],"name":"getInvertedPrice","outputs":[{"name":"isRecent","type":"bool"},{"name":"invertedPrice","type":"uint256"},{"name":"decimal","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLastUpdateId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofAsset","type":"address"}],"name":"remove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ofAssets","type":"address[]"},{"name":"newPrices","type":"uint256[]"}],"name":"update","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ofAsset","type":"address"},{"name":"name","type":"bytes32"},{"name":"symbol","type":"bytes8"},{"name":"decimal","type":"uint256"},{"name":"url","type":"string"},{"name":"ipfsHash","type":"string"},{"name":"chainId","type":"bytes32"},{"name":"breakIn","type":"address"},{"name":"breakOut","type":"address"}],"name":"register","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getValidity","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VALIDITY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofAsset","type":"address"}],"name":"getPrice","outputs":[{"name":"isRecent","type":"bool"},{"name":"price","type":"uint256"},{"name":"decimal","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofAsset","type":"address"}],"name":"getName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"INTERVAL","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofAssets","type":"address[]"}],"name":"getPrices","outputs":[{"name":"areRecent","type":"bool"},{"name":"prices","type":"uint256[]"},{"name":"decimals","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getInterval","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofAsset","type":"address"},{"name":"name","type":"bytes32"},{"name":"symbol","type":"bytes8"},{"name":"url","type":"string"},{"name":"ipfsHash","type":"string"}],"name":"updateDescriptiveInformation","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"information","outputs":[{"name":"breakIn","type":"address"},{"name":"breakOut","type":"address"},{"name":"chainId","type":"bytes32"},{"name":"decimal","type":"uint256"},{"name":"exists","type":"bool"},{"name":"ipfsHash","type":"string"},{"name":"name","type":"bytes32"},{"name":"price","type":"uint256"},{"name":"symbol","type":"bytes8"},{"name":"timestamp","type":"uint256"},{"name":"url","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofNewOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"ofBase","type":"address"},{"name":"ofQuote","type":"address"}],"name":"getReferencePrice","outputs":[{"name":"isRecent","type":"bool"},{"name":"referencePrice","type":"uint256"},{"name":"decimal","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofAsset","type":"address"}],"name":"hasRecentPrice","outputs":[{"name":"isRecent","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofAsset","type":"address"}],"name":"getSymbol","outputs":[{"name":"","type":"bytes8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofAsset","type":"address"}],"name":"getDecimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getQuoteAsset","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"sellAsset","type":"address"},{"name":"buyAsset","type":"address"}],"name":"existsPriceOnAssetPair","outputs":[{"name":"isExistent","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"QUOTE_ASSET","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"ofQuoteAsset","type":"address"},{"name":"quoteAssetName","type":"bytes32"},{"name":"quoteAssetSymbol","type":"bytes8"},{"name":"quoteAssetDecimals","type":"uint256"},{"name":"quoteAssetUrl","type":"string"},{"name":"quoteAssetIpfsHash","type":"string"},{"name":"quoteAssetChainId","type":"bytes32"},{"name":"quoteAssetBreakIn","type":"address"},{"name":"quoteAssetBreakOut","type":"address"},{"name":"interval","type":"uint256"},{"name":"validity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"hash","type":"bytes32"}],"name":"PriceUpdated","type":"event"}]

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var requestStatus = {
  ACTIVE: 0,
  CANCELLED: 1,
  EXECUTED: 2
};
var _default = requestStatus;
exports.default = _default;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var requestTypes = {
  INVEST: 0,
  REDEEM: 1,
  FALLBACK_REDEEM: 2
};
var _default = requestTypes;
exports.default = _default;

/***/ }),
/* 154 */
/***/ (function(module, exports) {

module.exports = [{"constant":true,"inputs":[{"name":"ofParticipant","type":"address"},{"name":"giveQuantity","type":"uint256"},{"name":"shareQuantity","type":"uint256"}],"name":"isInvestmentPermitted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofParticipant","type":"address"},{"name":"shareQuantity","type":"uint256"},{"name":"receiveQuantity","type":"uint256"}],"name":"isRedemptionPermitted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(12));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var _findEventInLog = _interopRequireDefault(__webpack_require__(11));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

var _getParticipation = _interopRequireDefault(__webpack_require__(49));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

var _toProcessable = _interopRequireDefault(__webpack_require__(10));

var _toReadable = _interopRequireDefault(__webpack_require__(9));

/**
 * Execute subscription/redemption request by `id` on fund at `fundAddress`
 * @returns number of allocated shares
 */
var executeRequest =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var id, fundAddress, config, fundContract, _ref3, _ref4, participant, requestType, shareQuantity, executeRequestLogEntry, receipt, isShutDown, participation, participantStake;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = _ref.id, fundAddress = _ref.fundAddress;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            _context.next = 6;
            return (0, _getFundContract.default)(environment, fundAddress);

          case 6:
            fundContract = _context.sent;
            _context.next = 9;
            return fundContract.instance.requests.call({}, [id]);

          case 9:
            _ref3 = _context.sent;
            _ref4 = (0, _slicedToArray2.default)(_ref3, 5);
            participant = _ref4[0];
            requestType = _ref4[2];
            shareQuantity = _ref4[4];
            _context.next = 16;
            return fundContract.instance.isShutDown.call();

          case 16:
            isShutDown = _context.sent;
            (0, _ensure.default)(isShutDown === false, 'Fund is shut down');

            if (!requestType.eq(new _bignumber.default(0))) {
              _context.next = 25;
              break;
            }

            _context.next = 21;
            return (0, _sendTransaction.default)(fundContract, 'executeRequest', [id], environment);

          case 21:
            receipt = _context.sent;
            executeRequestLogEntry = (0, _findEventInLog.default)('Created', receipt);
            _context.next = 35;
            break;

          case 25:
            if (!requestType.eq(new _bignumber.default(1))) {
              _context.next = 35;
              break;
            }

            _context.next = 28;
            return (0, _getParticipation.default)(environment, {
              fundAddress: fundAddress,
              investorAddress: participant
            });

          case 28:
            participation = _context.sent;
            participantStake = participation.personalStake;
            (0, _ensure.default)(shareQuantity.lte((0, _toProcessable.default)(config, participantStake, config.quoteAssetSymbol)), 'Number of shares requested exceed actual balance');
            _context.next = 33;
            return (0, _sendTransaction.default)(fundContract, 'executeRequest', [id], environment, {});

          case 33:
            receipt = _context.sent;
            executeRequestLogEntry = (0, _findEventInLog.default)('Annihilated', receipt);

          case 35:
            return _context.abrupt("return", (0, _toReadable.default)(config, executeRequestLogEntry.params.shareQuantity.value, config.quoteAssetSymbol));

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function executeRequest(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = executeRequest;
exports.default = _default;

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(12));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _approve = _interopRequireDefault(__webpack_require__(25));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var _findEventInLog = _interopRequireDefault(__webpack_require__(11));

var _getAddress = _interopRequireDefault(__webpack_require__(13));

var _getBalance = _interopRequireDefault(__webpack_require__(22));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var _isInvestmentRequestPermittedAndAllowed = _interopRequireDefault(__webpack_require__(75));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

var _toProcessable = _interopRequireDefault(__webpack_require__(10));

var _toReadable = _interopRequireDefault(__webpack_require__(9));

var _toDate = _interopRequireDefault(__webpack_require__(16));

/**
 * Subscribe to fund at `fundAddress` by offering `offeredValue` and requesting
 * `numShares` and incentivice execution with `incentiveValue`
 */
var invest =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundAddress, numShares, offeredValue, _ref$isNativeAsset, isNativeAsset, config, who, fundContract, symbol, canonicalPriceFeedContract, balance, isShutDown, hasRecentPrice, args, receipt, investRequestLogEntry, request, _request, numSharesCreated, timestamp;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundAddress = _ref.fundAddress, numShares = _ref.numShares, offeredValue = _ref.offeredValue, _ref$isNativeAsset = _ref.isNativeAsset, isNativeAsset = _ref$isNativeAsset === void 0 ? false : _ref$isNativeAsset;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            who = environment.account.address;
            _context.next = 7;
            return (0, _getFundContract.default)(environment, fundAddress);

          case 7:
            fundContract = _context.sent;
            symbol = isNativeAsset ? config.nativeAssetSymbol : 'MLN-T';
            _context.next = 11;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 11:
            canonicalPriceFeedContract = _context.sent;
            _context.next = 14;
            return (0, _getBalance.default)(environment, {
              tokenSymbol: symbol,
              ofAddress: who
            });

          case 14:
            balance = _context.sent;
            _context.next = 17;
            return fundContract.instance.isShutDown.call();

          case 17:
            isShutDown = _context.sent;
            (0, _ensure.default)(isShutDown === false, 'Fund is shut down');
            _context.next = 21;
            return (0, _isInvestmentRequestPermittedAndAllowed.default)(environment, {
              fundContract: fundContract,
              asset: (0, _getAddress.default)(config, symbol)
            });

          case 21:
            (0, _ensure.default)(balance.gte(offeredValue), "Insufficent ".concat(symbol, ". Need ").concat(offeredValue.toString(), " have: ").concat(balance.toString()));
            _context.next = 24;
            return canonicalPriceFeedContract.instance.hasRecentPrice.call({}, [(0, _getAddress.default)(config, symbol)]);

          case 24:
            hasRecentPrice = _context.sent;
            (0, _ensure.default)(hasRecentPrice, 'Pricefeed data is not valid at the moment. Please try again later.');
            _context.next = 28;
            return (0, _approve.default)(environment, {
              symbol: symbol,
              spender: fundAddress,
              quantity: offeredValue
            });

          case 28:
            args = [(0, _toProcessable.default)(config, offeredValue, symbol), (0, _toProcessable.default)(config, numShares, symbol), (0, _getAddress.default)(config, symbol)];
            _context.next = 31;
            return (0, _sendTransaction.default)(fundContract, 'requestInvestment', args, environment);

          case 31:
            receipt = _context.sent;
            investRequestLogEntry = (0, _findEventInLog.default)('RequestUpdated', receipt);
            _context.next = 35;
            return fundContract.instance.requests.call({}, [investRequestLogEntry.params.id.value]);

          case 35:
            request = _context.sent;
            _request = (0, _slicedToArray2.default)(request, 8), numSharesCreated = _request[4], timestamp = _request[7];
            return _context.abrupt("return", {
              id: investRequestLogEntry.params.id.value,
              numShares: (0, _toReadable.default)(config, numSharesCreated, symbol),
              timestamp: (0, _toDate.default)(timestamp)
            });

          case 38:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function invest(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = invest;
exports.default = _default;

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var _getComplianceContract = _interopRequireDefault(__webpack_require__(76));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

/**
 * List an investor as eligible
 */
var list =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(wallet, subscriber) {
    var participationContract, isListedBefore, listReceipt, isListed;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getComplianceContract.default)();

          case 2:
            participationContract = _context.sent;
            _context.next = 5;
            return participationContract.avatar(subscriber);

          case 5:
            isListedBefore = _context.sent;

            if (isListedBefore) {
              _context.next = 14;
              break;
            }

            _context.next = 9;
            return (0, _sendTransaction.default)(participationContract, 'list', [subscriber], wallet);

          case 9:
            listReceipt = _context.sent;
            _context.next = 12;
            return participationContract.instance.avatar.call({}, [subscriber]);

          case 12:
            isListed = _context.sent;
            (0, _ensure.default)(isListed, 'Listing failed', listReceipt);

          case 14:
            return _context.abrupt("return", true);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function list(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = list;
exports.default = _default;

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(12));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var _findEventInLog = _interopRequireDefault(__webpack_require__(11));

var _getAddress = _interopRequireDefault(__webpack_require__(13));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

var _toProcessable = _interopRequireDefault(__webpack_require__(10));

var _toReadable = _interopRequireDefault(__webpack_require__(9));

var _toDate = _interopRequireDefault(__webpack_require__(16));

/**
 * Redeem `numShares` of fund at `fundAddress` by requesting `requestedValue`
 * and incentivice execution with `incentiveValue`
 */
var redeem =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundAddress, numShares, requestedValue, _ref$isNativeAsset, isNativeAsset, config, fundContract, symbol, isShutDown, args, receipt, redeemRequestLogEntry, request, _request, shareQuantity, timestamp;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundAddress = _ref.fundAddress, numShares = _ref.numShares, requestedValue = _ref.requestedValue, _ref$isNativeAsset = _ref.isNativeAsset, isNativeAsset = _ref$isNativeAsset === void 0 ? false : _ref$isNativeAsset;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            _context.next = 6;
            return (0, _getFundContract.default)(environment, fundAddress);

          case 6:
            fundContract = _context.sent;
            symbol = isNativeAsset ? config.nativeAssetSymbol : 'MLN-T';
            _context.next = 10;
            return fundContract.instance.isShutDown.call();

          case 10:
            isShutDown = _context.sent;
            (0, _ensure.default)(isShutDown === false, 'Fund is shut down');
            args = [(0, _toProcessable.default)(config, numShares, symbol), (0, _toProcessable.default)(config, requestedValue, symbol), (0, _getAddress.default)(config, symbol)];
            _context.next = 15;
            return (0, _sendTransaction.default)(fundContract, 'requestRedemption', args, environment, {});

          case 15:
            receipt = _context.sent;
            redeemRequestLogEntry = (0, _findEventInLog.default)('RequestUpdated', receipt);
            _context.next = 19;
            return fundContract.instance.requests.call({}, [redeemRequestLogEntry.params.id.value]);

          case 19:
            request = _context.sent;
            _request = (0, _slicedToArray2.default)(request, 8), shareQuantity = _request[4], timestamp = _request[7];
            (0, _ensure.default)(shareQuantity.eq((0, _toProcessable.default)(config, numShares, symbol)), 'requested numShares is not equal to retrieved quantity', redeemRequestLogEntry);
            return _context.abrupt("return", {
              id: redeemRequestLogEntry.params.id.value,
              numShares: (0, _toReadable.default)(config, shareQuantity, symbol),
              timestamp: (0, _toDate.default)(timestamp)
            });

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function redeem(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = redeem;
exports.default = _default;

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var _findEventInLog = _interopRequireDefault(__webpack_require__(11));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

var _toProcessable = _interopRequireDefault(__webpack_require__(10));

var _toReadable = _interopRequireDefault(__webpack_require__(9));

var _getParticipation = _interopRequireDefault(__webpack_require__(49));

var _toDate = _interopRequireDefault(__webpack_require__(16));

/**
 * Redeem `numShares` of fund at `fundAddress` by requesting `redeemAllOwnedAssets`
 */
var redeemAllOwnedAssets =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var fundAddress, numShares, config, fundContract, participation, args, receipt, redeemAllOwnedAssetsLogEntry, shareQuantity;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fundAddress = _ref.fundAddress, numShares = _ref.numShares;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            _context.next = 6;
            return (0, _getFundContract.default)(environment, fundAddress);

          case 6:
            fundContract = _context.sent;
            _context.next = 9;
            return (0, _getParticipation.default)(environment, {
              fundAddress: fundAddress,
              investorAddress: environment.account.address
            });

          case 9:
            participation = _context.sent;
            (0, _ensure.default)(participation.personalStake.gte(numShares), "You cannot redeem more shares than you have. You own ".concat(participation.personalStake));
            args = [(0, _toProcessable.default)(config, numShares, config.quoteAssetSymbol)];
            _context.next = 14;
            return (0, _sendTransaction.default)(fundContract, 'redeemAllOwnedAssets', args, environment, {});

          case 14:
            receipt = _context.sent;
            redeemAllOwnedAssetsLogEntry = (0, _findEventInLog.default)('Redeemed', receipt);
            shareQuantity = redeemAllOwnedAssetsLogEntry.params.shareQuantity.value;
            (0, _ensure.default)(shareQuantity.eq((0, _toProcessable.default)(config, numShares, config.quoteAssetSymbol)), 'requested numShares is not equal to retrieved quantity', redeemAllOwnedAssetsLogEntry);
            return _context.abrupt("return", {
              numShares: (0, _toReadable.default)(config, shareQuantity, config.quoteAssetSymbol),
              timestamp: (0, _toDate.default)(redeemAllOwnedAssetsLogEntry.params.atTimestamp.value)
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function redeemAllOwnedAssets(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = redeemAllOwnedAssets;
exports.default = _default;

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var getNextEpochTime =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var canonicalPriceFeedContract;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 2:
            canonicalPriceFeedContract = _context.sent;
            return _context.abrupt("return", canonicalPriceFeedContract.instance.getNextEpochTime.call({}, []));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getNextEpochTime(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getNextEpochTime;
exports.default = _default;

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var getOperators =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var canonicalPriceFeedContract;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 2:
            canonicalPriceFeedContract = _context.sent;
            return _context.abrupt("return", canonicalPriceFeedContract.instance.getOperators.call({}, []));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getOperators(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getOperators;
exports.default = _default;

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(12));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getStakingPriceFeedContract = _interopRequireDefault(__webpack_require__(27));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getSymbol = _interopRequireDefault(__webpack_require__(17));

var _toReadable = _interopRequireDefault(__webpack_require__(9));

var getPriceByPriceFeed =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var priceFeed, tokenAddr, config, stakingPricefeedContract, _ref3, _ref4, price, symbol;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            priceFeed = _ref.priceFeed, tokenAddr = _ref.tokenAddr;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            _context.next = 6;
            return (0, _getStakingPriceFeedContract.default)(environment, priceFeed);

          case 6:
            stakingPricefeedContract = _context.sent;
            _context.next = 9;
            return stakingPricefeedContract.instance.getPrice.call({}, [tokenAddr]);

          case 9:
            _ref3 = _context.sent;
            _ref4 = (0, _slicedToArray2.default)(_ref3, 2);
            price = _ref4[0];
            _context.next = 14;
            return (0, _getSymbol.default)(config, tokenAddr);

          case 14:
            symbol = _context.sent;
            return _context.abrupt("return", (0, _toReadable.default)(config, price, symbol));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getPriceByPriceFeed(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getPriceByPriceFeed;
exports.default = _default;

/***/ }),
/* 163 */
/***/ (function(module, exports) {

module.exports = [{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getLastUpdateId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"registrar","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ofAssets","type":"address[]"},{"name":"newPrices","type":"uint256[]"}],"name":"update","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"ofAsset","type":"address"}],"name":"getPrice","outputs":[{"name":"price","type":"uint256"},{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"superFeed","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stakingToken","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ofAssets","type":"address[]"}],"name":"getPrices","outputs":[{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"assetsToPrices","outputs":[{"name":"price","type":"uint256"},{"name":"timestamp","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"updateId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getQuoteAsset","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"data","type":"bytes"}],"name":"depositStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"data","type":"bytes"}],"name":"withdrawStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stakingContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"QUOTE_ASSET","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"ofRegistrar","type":"address"},{"name":"ofQuoteAsset","type":"address"},{"name":"ofSuperFeed","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"hash","type":"bytes32"}],"name":"PriceUpdated","type":"event"}]

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var getPriceFeedsByOwner =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, address) {
    var canonicalPriceFeedContract;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 2:
            canonicalPriceFeedContract = _context.sent;
            return _context.abrupt("return", canonicalPriceFeedContract.instance.getPriceFeedsByOwner.call({}, [address]));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getPriceFeedsByOwner(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getPriceFeedsByOwner;
exports.default = _default;

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var getRegisteredAssets =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var canonicalPriceFeedContract;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 2:
            canonicalPriceFeedContract = _context.sent;
            return _context.abrupt("return", canonicalPriceFeedContract.instance.getRegisteredAssets.call({}, []));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getRegisteredAssets(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getRegisteredAssets;
exports.default = _default;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var getStakersAndAmounts =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var canonicalPriceFeedContract;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 2:
            canonicalPriceFeedContract = _context.sent;
            return _context.abrupt("return", canonicalPriceFeedContract.instance.getStakersAndAmounts.call({}, []));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getStakersAndAmounts(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getStakersAndAmounts;
exports.default = _default;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getStakingPriceFeedContract = _interopRequireDefault(__webpack_require__(27));

/**
 * Stake `quantity` on staking pricefeed contract
 */
var getStakingPriceFeedOwner =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, address) {
    var stakingPricefeedContract;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getStakingPriceFeedContract.default)(environment, address);

          case 2:
            stakingPricefeedContract = _context.sent;
            return _context.abrupt("return", stakingPricefeedContract.instance.owner.call({}, []));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getStakingPriceFeedOwner(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getStakingPriceFeedOwner;
exports.default = _default;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var getStakingToken =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var canonicalPriceFeedContract;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 2:
            canonicalPriceFeedContract = _context.sent;
            return _context.abrupt("return", canonicalPriceFeedContract.instance.stakingToken.call({}, []));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getStakingToken(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getStakingToken;
exports.default = _default;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var getTotalStaked =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var canonicalPriceFeedContract;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 2:
            canonicalPriceFeedContract = _context.sent;
            return _context.abrupt("return", canonicalPriceFeedContract.instance.totalStaked.call({}, []));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getTotalStaked(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getTotalStaked;
exports.default = _default;

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var getTotalStakedByAddr =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var addr, canonicalPriceFeedContract;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            addr = _ref.addr;
            _context.next = 3;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 3:
            canonicalPriceFeedContract = _context.sent;
            return _context.abrupt("return", canonicalPriceFeedContract.instance.totalStakedFor.call({}, [addr]));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getTotalStakedByAddr(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getTotalStakedByAddr;
exports.default = _default;

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var getUpdateInterval =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var canonicalPriceFeedContract;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 2:
            canonicalPriceFeedContract = _context.sent;
            return _context.abrupt("return", canonicalPriceFeedContract.instance.INTERVAL.call({}, []));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getUpdateInterval(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getUpdateInterval;
exports.default = _default;

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _promise = _interopRequireDefault(__webpack_require__(14));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

/**
 * @deprecated
 */
var awaitDataFeedUpdates =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var howMany,
        priceFeedContract,
        entryTime,
        n,
        blockDifference,
        lastBlockTime,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            howMany = _args.length > 1 && _args[1] !== undefined ? _args[1] : 1;
            _context.next = 3;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 3:
            priceFeedContract = _context.sent;
            entryTime = new Date();
            n = 0;
            return _context.abrupt("return", new _promise.default(function (resolve, reject) {
              priceFeedContract.instance.PriceUpdated.subscribe({}, function (error, result) {
                n += 1;
                environment.api.eth.getBlockByNumber(result[0].blockNumber).then(function (lastBlock) {
                  lastBlockTime = lastBlock.timestamp;
                  blockDifference = (lastBlockTime.getTime() - entryTime.getTime()) / 1000;

                  if (n >= howMany && blockDifference > 120) {
                    if (error) reject(error);
                    resolve(true);
                  }
                });
              });
            }));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function awaitDataFeedUpdates(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = awaitDataFeedUpdates;
exports.default = _default;

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

/**
 * Update canonical pricefeed by collecting median values of all pricefeed operators for each price.
 * This function can only be called by the technical council multisig
 */
var collectAndUpdate =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var assets, canonicalPriceFeedContract, receipt;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            assets = _ref.assets;
            _context.next = 3;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 3:
            canonicalPriceFeedContract = _context.sent;
            _context.next = 6;
            return (0, _sendTransaction.default)(canonicalPriceFeedContract, 'collectAndUpdate', [assets], environment);

          case 6:
            receipt = _context.sent;
            return _context.abrupt("return", receipt);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function collectAndUpdate(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = collectAndUpdate;
exports.default = _default;

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getStakingPriceFeedContract = _interopRequireDefault(__webpack_require__(27));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

var _getSymbol = _interopRequireDefault(__webpack_require__(17));

var _approve = _interopRequireDefault(__webpack_require__(25));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _toProcessable = _interopRequireDefault(__webpack_require__(10));

/**
 * Stake `quantity` on staking pricefeed contract
 */
var depositStake =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var address, quantity, stakingPricefeedContract, config, stakingTokenAddress, stakingTokenSymbol, opts, receipt;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            address = _ref.address, quantity = _ref.quantity;
            _context.next = 3;
            return (0, _getStakingPriceFeedContract.default)(environment, address);

          case 3:
            stakingPricefeedContract = _context.sent;
            _context.next = 6;
            return (0, _getConfig.default)(environment);

          case 6:
            config = _context.sent;
            _context.next = 9;
            return stakingPricefeedContract.instance.stakingToken.call();

          case 9:
            stakingTokenAddress = _context.sent;
            stakingTokenSymbol = (0, _getSymbol.default)(config, stakingTokenAddress);
            opts = {
              symbol: stakingTokenSymbol,
              spender: address,
              quantity: (0, _toProcessable.default)(config, quantity, stakingTokenSymbol)
            };
            _context.next = 14;
            return (0, _approve.default)(environment, opts);

          case 14:
            _context.next = 16;
            return (0, _sendTransaction.default)(stakingPricefeedContract, 'depositStake', [(0, _toProcessable.default)(config, quantity, stakingTokenSymbol), ''], environment);

          case 16:
            receipt = _context.sent;
            return _context.abrupt("return", receipt);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function depositStake(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = depositStake;
exports.default = _default;

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getCanonicalPriceFeedContract = _interopRequireDefault(__webpack_require__(8));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

var setupPriceFeed =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var canonicalPriceFeedContract, receipt, setupLog, stakingFeedAddress;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getCanonicalPriceFeedContract.default)(environment);

          case 2:
            canonicalPriceFeedContract = _context.sent;
            _context.next = 5;
            return (0, _sendTransaction.default)(canonicalPriceFeedContract, 'setupStakingPriceFeed', [], environment);

          case 5:
            receipt = _context.sent;
            setupLog = receipt.logs.find(function (e) {
              return e.topics[0] === environment.api.util.sha3('SetupPriceFeed(address)');
            });
            stakingFeedAddress = environment.api.util.toChecksumAddress("0x".concat(setupLog.data.slice(-40)));
            return _context.abrupt("return", stakingFeedAddress);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function setupPriceFeed(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = setupPriceFeed;
exports.default = _default;

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getStakingPriceFeedContract = _interopRequireDefault(__webpack_require__(27));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

/**
 * Update prices with `newPrices` array for the `assets` array.
 * This function can be called by the owner of the pricefeed.
 */
var updatePriceFeed =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var address, assets, newPrices, stakingPriceFeedContract, receipt;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            address = _ref.address, assets = _ref.assets, newPrices = _ref.newPrices;
            _context.next = 3;
            return (0, _getStakingPriceFeedContract.default)(environment, address);

          case 3:
            stakingPriceFeedContract = _context.sent;
            _context.next = 6;
            return (0, _sendTransaction.default)(stakingPriceFeedContract, 'update', [assets, newPrices], environment);

          case 6:
            receipt = _context.sent;
            return _context.abrupt("return", receipt);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function updatePriceFeed(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = updatePriceFeed;
exports.default = _default;

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getStakingPriceFeedContract = _interopRequireDefault(__webpack_require__(27));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

var _toProcessable = _interopRequireDefault(__webpack_require__(10));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getSymbol = _interopRequireDefault(__webpack_require__(17));

/**
 * Unstake `amount` on staking pricefeed contract
 */
var withdrawStake =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var address, quantity, stakingPriceFeedContract, config, stakingTokenAddress, stakingTokenSymbol, receipt;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            address = _ref.address, quantity = _ref.quantity;
            _context.next = 3;
            return (0, _getStakingPriceFeedContract.default)(environment, address);

          case 3:
            stakingPriceFeedContract = _context.sent;
            _context.next = 6;
            return (0, _getConfig.default)(environment);

          case 6:
            config = _context.sent;
            _context.next = 9;
            return stakingPriceFeedContract.instance.stakingToken.call();

          case 9:
            stakingTokenAddress = _context.sent;
            stakingTokenSymbol = (0, _getSymbol.default)(config, stakingTokenAddress);
            _context.next = 13;
            return (0, _sendTransaction.default)(stakingPriceFeedContract, 'withdrawStake', [(0, _toProcessable.default)(config, quantity, stakingTokenSymbol), ''], environment);

          case 13:
            receipt = _context.sent;
            return _context.abrupt("return", receipt);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function withdrawStake(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = withdrawStake;
exports.default = _default;

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _providers = _interopRequireDefault(__webpack_require__(37));

var isExternalSigner = function isExternalSigner(environment) {
  return environment.providerType === _providers.default.INJECTED;
};

var _default = isExternalSigner;
exports.default = _default;

/***/ }),
/* 180 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/object/values");

/***/ }),
/* 181 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/typeof");

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _assign = _interopRequireDefault(__webpack_require__(38));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var _getEnvironment = __webpack_require__(79);

var _isValidEnvironment = _interopRequireDefault(__webpack_require__(80));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var setEnvironment = function setEnvironment(newEnvironment) {
  var environmentCandidate = (0, _objectSpread2.default)({}, _getEnvironment.environment, newEnvironment);
  (0, _ensure.default)((0, _isValidEnvironment.default)(environmentCandidate), 'Invalid environment');
  (0, _assign.default)(_getEnvironment.environment, environmentCandidate);
};

var _default = setEnvironment;
exports.default = _default;

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _event = _interopRequireDefault(__webpack_require__(81));

// import { path } from 'ramda';

/**
 * Extract event definitions from truffle `json` and mixin `onEventMap`:
 * @example onEventMap = { 'OrderUpdate': doSomething };
 * // will add doSomething to the generated event definition
 */
var extractEventDefinitions = function extractEventDefinitions(_ref) {
  var json = _ref.json,
      _ref$onEventMap = _ref.onEventMap,
      onEventMap = _ref$onEventMap === void 0 ? {} : _ref$onEventMap;
  return json.abi.filter(function (i) {
    return i.type === 'event';
  }).map(function (i) {
    return {
      abi: i,
      decoder: new _event.default(null, i, null)
    };
  }).map(function (_ref2) {
    var abi = _ref2.abi,
        decoder = _ref2.decoder;
    return {
      name: abi.name,
      // TODO: Reactivate this
      // address,
      hash: "0x".concat(decoder.signature()),
      onEvent: onEventMap[abi.name],
      abi: abi
    };
  });
};

var _default = extractEventDefinitions;
exports.default = _default;

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getAccountAddress = _interopRequireDefault(__webpack_require__(78));

var _getBalance = _interopRequireDefault(__webpack_require__(22));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _hasRecentPrice = _interopRequireDefault(__webpack_require__(77));

var _resolvePromiseObject = _interopRequireDefault(__webpack_require__(82));

var _toReadable = _interopRequireDefault(__webpack_require__(9));

var onBlock =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var config, isDataValid, accountAddress, info, accountInfo;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getConfig.default)(environment);

          case 2:
            config = _context.sent;
            _context.next = 5;
            return (0, _hasRecentPrice.default)(environment);

          case 5:
            isDataValid = _context.sent;
            accountAddress = (0, _getAccountAddress.default)(environment);
            _context.next = 9;
            return (0, _resolvePromiseObject.default)({
              syncing: environment.api.eth.syncing().then(function (syncing) {
                return syncing ? !!syncing.result : syncing;
              }),
              isDataValid: isDataValid
            });

          case 9:
            info = _context.sent;

            if (!accountAddress) {
              _context.next = 16;
              break;
            }

            _context.next = 13;
            return (0, _resolvePromiseObject.default)({
              nativeBalance: environment.api.eth.getBalance(accountAddress).then(function (balance) {
                return (0, _toReadable.default)(config, balance, config.nativeAssetSymbol);
              }),
              quoteBalance: (0, _getBalance.default)(environment, {
                tokenSymbol: config.quoteAssetSymbol,
                ofAddress: accountAddress
              })
            });

          case 13:
            _context.t0 = _context.sent;
            _context.next = 17;
            break;

          case 16:
            _context.t0 = {};

          case 17:
            accountInfo = _context.t0;
            return _context.abrupt("return", (0, _objectSpread2.default)({}, info, accountInfo));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function onBlock(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = onBlock;
exports.default = _default;

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _event = _interopRequireDefault(__webpack_require__(81));

/**
 * Parse a raw `event` from the blockchain with the given `abi`
 */
var parseEvent = function parseEvent(event, abi) {
  var decoder = new _event.default(null, abi, null);
  return decoder.decode(event).args;
};

var _default = parseEvent;
exports.default = _default;

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _api = _interopRequireDefault(__webpack_require__(35));

var _bignumber = _interopRequireDefault(__webpack_require__(4));

// This function is taken from parity/js-api. It is included inside the contract object so that it does not work with user transactions
var waitForTransaction =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(api, txhash) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", api.pollMethod('eth_getTransactionReceipt', txhash, function (receipt) {
              if (!receipt || !receipt.blockNumber || receipt.blockNumber.eq(0)) {
                return false;
              }

              return true;
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function waitForTransaction(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var sendEther =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(environment, _ref2) {
    var to, amount, opt, nonce, rawTransaction, gasKeyName, gasEstimation, transactionHash, signedTransaction, res;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            to = _ref2.to, amount = _ref2.amount, opt = _ref2.opt;

            if (!environment.account.sign) {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return environment.api.eth.getTransactionCount(environment.account.address);

          case 4:
            _context2.t0 = _context2.sent.toNumber();
            _context2.next = 8;
            break;

          case 7:
            _context2.t0 = undefined;

          case 8:
            nonce = _context2.t0;

            if (!(amount == undefined)) {
              _context2.next = 11;
              break;
            }

            throw Error('Amount not found');

          case 11:
            if (!(to == undefined)) {
              _context2.next = 13;
              break;
            }

            throw Error('To address not found');

          case 13:
            // Prepare raw transaction
            rawTransaction = (0, _objectSpread2.default)({
              from: environment.account.address,
              to: to,
              gasPrice: 60000000000,
              value: '0x' + new _bignumber.default(amount).toString(16)
            }, opt); // HACK: If external parity signer, no need to set the nonce, Parity does it. If in-browser wallet, we need to explicitly set the nonce.

            if (nonce) rawTransaction.nonce = nonce; // Estimate and adjust gas with gasBoost

            gasKeyName = environment.account.sign ? 'gasLimit' : 'gas';
            _context2.next = 18;
            return environment.api.eth.estimateGas(rawTransaction);

          case 18:
            gasEstimation = _context2.sent;
            rawTransaction[gasKeyName] = '0x' + gasEstimation.toString(16);

            if (!environment.account.sign) {
              _context2.next = 27;
              break;
            }

            // Sign transaction object with Wallet instance
            signedTransaction = environment.account.sign(rawTransaction); // Send raw signed transaction and wait for receipt

            _context2.next = 24;
            return environment.api.eth.sendRawTransaction(signedTransaction);

          case 24:
            transactionHash = _context2.sent;
            _context2.next = 30;
            break;

          case 27:
            _context2.next = 29;
            return environment.api.eth.sendTransaction(rawTransaction);

          case 29:
            transactionHash = _context2.sent;

          case 30:
            _context2.next = 32;
            return waitForTransaction(environment.api, transactionHash);

          case 32:
            res = _context2.sent;

            if (!(res == false)) {
              _context2.next = 35;
              break;
            }

            throw Error("It could not get transaction receipt");

          case 35:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function sendEther(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = sendEther;
exports.default = _default;

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _keys = _interopRequireDefault(__webpack_require__(42));

var getKeyByValue = function getKeyByValue(obj, value) {
  return (0, _keys.default)(obj).find(function (key) {
    return obj[key] === value;
  });
};

var _default = getKeyByValue;
exports.default = _default;

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _promise = _interopRequireDefault(__webpack_require__(14));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _api = _interopRequireDefault(__webpack_require__(35));

var getPastEvents =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(environment, _ref) {
    var contract, address, eventSignature, fromBlock, toBlock, paramName, hashed, filter, pastEvents, allReceipts;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            contract = _ref.contract, address = _ref.address, eventSignature = _ref.eventSignature, fromBlock = _ref.fromBlock, toBlock = _ref.toBlock, paramName = _ref.paramName;
            hashed = _api.default.util.sha3(eventSignature);
            filter = {
              fromBlock: fromBlock,
              toBlock: toBlock,
              address: address,
              topics: [hashed]
            };
            _context2.next = 5;
            return environment.api.eth.getLogs(filter);

          case 5:
            pastEvents = _context2.sent;
            _context2.next = 8;
            return _promise.default.all(pastEvents.map(
            /*#__PURE__*/
            function () {
              var _ref3 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(event) {
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        return _context.abrupt("return", environment.api.eth.getTransactionReceipt(event.transactionHash));

                      case 1:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 8:
            allReceipts = _context2.sent;
            return _context2.abrupt("return", allReceipts.map(function (receipt) {
              var decodedLogs = contract.parseEventLogs(receipt.logs);
              return "".concat(decodedLogs[0].event, " ; ").concat(decodedLogs[0].params[paramName].value);
            }));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getPastEvents(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getPastEvents; // just decode data

exports.default = _default;

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _promise = _interopRequireDefault(__webpack_require__(14));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(19));

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _api = _interopRequireDefault(__webpack_require__(35));

var _package = _interopRequireDefault(__webpack_require__(190));

var _package2 = _interopRequireDefault(__webpack_require__(191));

var _providers = _interopRequireDefault(__webpack_require__(37));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var checkHttpProvider =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(url, connectionTimeout) {
    var provider, api;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            provider = new _api.default.Provider.Http(url, connectionTimeout);
            api = new _api.default(provider); // HACK: Parity does not properly return api.isConnected. This is always true.
            // So we need to explicitly make a call that fails for a unreachable node. :(

            _context.next = 5;
            return api.net.version();

          case 5:
            return _context.abrupt("return", {
              api: api,
              provider: provider
            });

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.warn('Error with provider at', url, _context.t0);
            return _context.abrupt("return", false);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 8]]);
  }));

  return function checkHttpProvider(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var findHttpProvider = function findHttpProvider(rpcEndpointList, connectionTimeout) {
  return rpcEndpointList.reduce(
  /*#__PURE__*/
  function () {
    var _ref3 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(lastPromise, _ref2) {
      var type, url, lastType, candidate;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              type = _ref2.type, url = _ref2.url;
              _context2.next = 3;
              return lastPromise;

            case 3:
              lastType = _context2.sent;

              if (!lastType) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", lastType);

            case 6:
              _context2.next = 8;
              return checkHttpProvider(url, connectionTimeout);

            case 8:
              candidate = _context2.sent;
              return _context2.abrupt("return", candidate ? (0, _objectSpread2.default)({}, candidate, {
                providerType: type
              }) : false);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }(), new _promise.default(function (resolve) {
    return resolve(false);
  }));
};
/**
 * Finds a parity provider according to the detected environment:
 * - Browser with Parity Dapp / Parity Signer Extension: Secure
 * - Browser without: Unsecure with in-browser signer (ethers) --> Shall not
 *   connect to local node which chould be connected to main net.
 * - Node.js environment: Can connect to localhost or kovan as fallback.
 *   (Maybe also mainnode in the future)
 *
 * @returns Object {
 *  api: [Parity API instance],
 *  provider: [Parity Provider Instance],
 *  providerType: [f.e. providers.Parity],
 * }
 */


var getParityProvider =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(connectionTimeout) {
    var injectedProvider, rpcEndpointList, provider;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            (0, _ensure.default)(_package.default.version === _package2.default.dependencies['@melonproject/smart-contracts'], 'Fatal: Inconsistency: Protocol version mismatch');
            injectedProvider = global.ethereum && global.ethereum.isParity ? global.ethereum : global.ethereumProvider;
            rpcEndpointList = [{
              type: _providers.default.HOSTED,
              url: 'https://kovan.melonport.com'
            }];

            if (process && process.title.includes('node')) {
              rpcEndpointList.unshift({
                type: _providers.default.LOCAL,
                url: 'http://localhost:8545'
              });
            }

            provider = injectedProvider ? {
              provider: injectedProvider,
              api: new _api.default(injectedProvider),
              providerType: _providers.default.INJECTED
            } : findHttpProvider(rpcEndpointList, connectionTimeout);
            return _context3.abrupt("return", provider || {
              providerType: _providers.default.NONE
            });

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getParityProvider(_x5) {
    return _ref4.apply(this, arguments);
  };
}();

var _default = getParityProvider;
exports.default = _default;

/***/ }),
/* 190 */
/***/ (function(module, exports) {

module.exports = {"name":"@melonproject/smart-contracts","version":"0.8.0-alpha.17","description":"Technology Regulated Investment Funds","directories":{"test":"tests"},"scripts":{"start":"babel-node utils/main.js","lint":"npm run lint:eslint && npm run lint:solium","lint:solium":"solium --dir .","lint:eslint":"eslint .","oyente":"oyente -s src/Fund.sol","devchain":"bash utils/chain/devchain.sh","test":"npm run test:ds-test && npm run test:ava","test:ava":"CHAIN_ENV=development ava --serial --verbose","test:unit":"CHAIN_ENV=development ava --files tests/unit/**","test:ds-test":"export DAPP_SKIP_BUILD=1 DAPP_NO_ETHRUN=1 && dapp test","compile":"export SOLC_FLAGS='--optimize --optimize-runs=0' && make all","deploy":"CHAIN_ENV=development babel-node utils/deploy/contracts.js","deploy:kovan":"CHAIN_ENV=kovan babel-node utils/deploy/contracts.js","deploy:live":"CHAIN_ENV=live babel-node utils/deploy/contracts.js","docs:server":"cd scripts/doxity && ./node_modules/.bin/gatsby develop","docs:build":"doxity build","babel-build":"babel utils/lib/ --out-dir utils/build","append-json":"find out/ -name '*.abi' | xargs -t -I{} cp {} {}.json","prepublishOnly":"npm run babel-build && npm run append-json","concatenate-contracts":"bash ./utils/etherscan/concatenateContracts.sh"},"files":["out","utils/info","utils/config","utils/build","addressBook.json"],"publishConfig":{"access":"public"},"repository":{"type":"git","url":"git+https://github.com/melonproject/protocol.git"},"keywords":["Ethereum","Protocol","Melon"],"author":"“Melonport AG <“team@melonport.com”>","license":"GPL-3.0","bugs":{"url":"https://github.com/melonproject/protocol/issues"},"homepage":"https://github.com/melonproject/protocol#readme","devDependencies":{"@digix/doxity":"^0.5.2","ava":"^0.24.0","babel-cli":"^6.26.0","babel-core":"^6.26.0","babel-eslint":"^7.2.3","babel-plugin-transform-runtime":"^6.23.0","babel-preset-es2015":"^6.24.1","babel-preset-flow":"^6.23.0","babel-preset-stage-0":"^6.24.1","babel-runtime":"^6.26.0","eslint":"^4.15.0","eslint-config-airbnb":"^16.1.0","eslint-config-prettier":"^2.7.0","eslint-plugin-ava":"^4.4.0","eslint-plugin-flowtype":"^2.39.1","eslint-plugin-import":"^2.8.0","eslint-plugin-jsx-a11y":"^6.0.3","eslint-plugin-react":"^7.5.1","flow-bin":"^0.63.1","prettier-eslint":"^8.2.2","solium":"^1.1.0"},"dependencies":{"0x.js":"^0.35.0","@parity/api":"^2.1.20","bignumber.js":"^4.1.0","ethereumjs-testrpc":"^4.1.3","request-promise":"^4.2.2"},"ava":{"files":["tests/integration/fundShares.js","tests/integration/fundTrading.js","tests/integration/competitionRegistration.js","tests/integration/competitionPayout.js","tests/integration/centralizedExchange.js","tests/integration/simpleMarketWithApprove.js","tests/integration/redeemMaliciousAsset.js","tests/integration/0xTrading.js","tests/integration/tradingAlternativeToken.js","tests/unit/pricefeed/priceFeed.js","tests/unit/pricefeed/canonicalPriceFeed.js","tests/unit/competitions/registration.js","tests/unit/competitions/redeem.js","tests/unit/competitions/version.js","tests/unit/competitions/whitelist.js","tests/unit/compliance/noCompliance.js","tests/unit/compliance/onlyManager.js","tests/unit/compliance/picopsCompliance.js","tests/unit/governance/governance.js","tests/unit/modules/moduleRegistrar.js","tests/unit/riskmgmt/rmMakeOrders.js","tests/unit/version/version.js","tests/unit/fundRanking.js"],"tap":true,"babel":"inherit","require":["babel-register"]}}

/***/ }),
/* 191 */
/***/ (function(module, exports) {

module.exports = {"name":"@melonproject/melon.js","version":"0.8.1","description":"Reusable JS API to query/interact with the Melon protocol","main":"build/index.js","esnext":"lib/index.js","directories":{"lib":"./lib","doc":"./docs","test":"./tests"},"sign-git-tag":true,"publishConfig":{"access":"public"},"engines":{"node":"^8.0.0","npm":"^5.0.0"},"scripts":{"babel:watch":"babel lib -w -d build","babel":"babel lib -d build","build":"yarn walklib && yarn babel","deploy:alpha":"yarn build && npm version prerelease --git-tag-version false && npm publish --tag alpha ","deploy":"yarn build && npm version patch && npm publish","docs":"documentation build lib/** -f html -o docs --sort-order alpha","flow":"flow","format":"prettier --write \"lib/**/*.js\" && prettier --write \"tests/**/*.js\"","postversion":"git push && git push --tags","precommit":"lint-staged","pretest":"yarn build","test:scratchpad":"babel-node tests/scratchpad/run","test:integration":"babel-node tests/integration/run","test":"yarn test:integration && yarn test:scratchpad","walklib":"babel-node ./scripts/walkLib.js"},"lint-staged":{"*.js":["yarn format","git add"]},"repository":{"type":"git","url":"git+https://github.com/melonproject/melon.js.git"},"keywords":["melon","melonproject","javascript","ethereum","api"],"author":"Simon Emanuel Schmid <simon@melonport.com>","license":"GPL-3.0","bugs":{"url":"https://github.com/melonproject/melon.js/issues"},"homepage":"https://github.com/melonproject/melon.js#readme","devDependencies":{"@babel/cli":"7.0.0-beta.42","@babel/core":"7.0.0-beta.42","@babel/node":"7.0.0-beta.42","@babel/plugin-proposal-class-properties":"7.0.0-beta.42","@babel/plugin-proposal-object-rest-spread":"7.0.0-beta.42","@babel/preset-env":"7.0.0-beta.42","@babel/preset-flow":"7.0.0-beta.42","@babel/runtime":"7.0.0-beta.42","documentation":"^5.3.3","flow-bin":"^0.66.0","husky":"^0.14.3","jasmine":"^2.7.0","jest":"^22.4.3","lint-staged":"^6.0.0","prettier":"^1.11.1","walk":"^2.3.9"},"dependencies":{"0x.js":"^0.35.0","@babel/runtime":"7.0.0-beta.42","@melonproject/smart-contracts":"0.8.0-alpha.17","@parity/api":"^2.1.5","bignumber.js":"4.1.0","bip39":"^2.4.0","debug":"2.6.9","ethers-utils":"^2.1.11","ethers-wallet":"^2.1.8","ramda":"^0.25.0","web3":"^0.20.4"}}

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ethersWallet = _interopRequireDefault(__webpack_require__(23));

var _bip = _interopRequireDefault(__webpack_require__(193));

var createWallet = function createWallet() {
  var mnemonic = _bip.default.generateMnemonic();

  return new _ethersWallet.default.Wallet.fromMnemonic(mnemonic); // eslint-disable-line new-cap
};

var _default = createWallet;
exports.default = _default;

/***/ }),
/* 193 */
/***/ (function(module, exports) {

module.exports = require("bip39");

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _ethersWallet = _interopRequireDefault(__webpack_require__(23));

var decryptWallet =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(encryptedWallet, password) {
    var decryptedWallet;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _ethersWallet.default.Wallet.fromEncryptedWallet(encryptedWallet, password);

          case 2:
            decryptedWallet = _context.sent;
            return _context.abrupt("return", decryptedWallet);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function decryptWallet(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = decryptWallet;
exports.default = _default;

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var encryptWallet =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(unencryptedWallet, password) {
    var encryptedWallet;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return unencryptedWallet.encrypt(password);

          case 2:
            encryptedWallet = _context.sent;
            return _context.abrupt("return", encryptedWallet);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function encryptWallet(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = encryptWallet;
exports.default = _default;

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ethersWallet = _interopRequireDefault(__webpack_require__(23));

var importWallet = function importWallet(mnemonic) {
  return _ethersWallet.default.Wallet.fromMnemonic(mnemonic);
};

var _default = importWallet;
exports.default = _default;

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getVersionContract = _interopRequireDefault(__webpack_require__(15));

/**
 * Get fund address for a given `managerAddress`
 * _Hint_: If multiple funds existing for one manager, the latest fund is returned
 */
var getFundForManager =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var managerAddress, versionContract, fundAddress;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            managerAddress = _ref.managerAddress;
            _context.next = 3;
            return (0, _getVersionContract.default)(environment);

          case 3:
            versionContract = _context.sent;
            _context.next = 6;
            return versionContract.instance.managerToFunds.call({}, [managerAddress]);

          case 6:
            fundAddress = _context.sent;

            if (!(fundAddress === '0x0000000000000000000000000000000000000000')) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", false);

          case 9:
            return _context.abrupt("return", fundAddress);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getFundForManager(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = getFundForManager;
exports.default = _default;

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getVersionContract = _interopRequireDefault(__webpack_require__(15));

/**
 * Returns a mapping of manager addresses linked to a fundId list.
 */
var getFundsMapping =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var versionContract, fundsMapping;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getVersionContract.default)(environment);

          case 2:
            versionContract = _context.sent;
            _context.next = 5;
            return versionContract.instance.funds.call();

          case 5:
            fundsMapping = _context.sent;
            return _context.abrupt("return", fundsMapping);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getFundsMapping(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getFundsMapping;
exports.default = _default;

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getVersionContract = _interopRequireDefault(__webpack_require__(15));

/**
 * Get addresses of funds starting from `startId`
 */
var getFunds =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var startId,
        versionContract,
        allFunds,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            startId = _args.length > 1 && _args[1] !== undefined ? _args[1] : 0;
            _context.next = 3;
            return (0, _getVersionContract.default)(environment);

          case 3:
            versionContract = _context.sent;
            _context.next = 6;
            return versionContract.instance.getFunds.call({}, [startId]);

          case 6:
            allFunds = _context.sent;
            return _context.abrupt("return", allFunds);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getFunds(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getFunds;
exports.default = _default;

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getVersionContract = _interopRequireDefault(__webpack_require__(15));

/**
 * Returns a mapping of manager addresses linked to a fundId list.
 */
var getManagersMapping =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var versionContract, managersMapping;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getVersionContract.default)(environment);

          case 2:
            versionContract = _context.sent;
            _context.next = 5;
            return versionContract.instance.managers.call();

          case 5:
            managersMapping = _context.sent;
            return _context.abrupt("return", managersMapping);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getManagersMapping(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getManagersMapping;
exports.default = _default;

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _promise = _interopRequireDefault(__webpack_require__(14));

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getFundContract = _interopRequireDefault(__webpack_require__(7));

var _getRankingContract = _interopRequireDefault(__webpack_require__(85));

var _toReadable = _interopRequireDefault(__webpack_require__(9));

var _toDate = _interopRequireDefault(__webpack_require__(16));

/**
 * Returns an array of all existing funds on current Version, sorted by share price in descending order, with informations such as address, name, share price, and inception date.
 */
var getRanking =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(environment) {
    var config, rankingContract, versionAddress, output, fundAddresses, fundSharePrices, fundInceptions, getRankingPromises, unsortedFunds;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _getConfig.default)(environment);

          case 2:
            config = _context2.sent;
            _context2.next = 5;
            return (0, _getRankingContract.default)(environment);

          case 5:
            rankingContract = _context2.sent;
            versionAddress = config.versionAddress;
            _context2.next = 9;
            return rankingContract.instance.getAddressAndSharePriceOfFunds.call({}, [versionAddress]);

          case 9:
            output = _context2.sent;

            /* eslint-disable no-underscore-dangle */
            fundAddresses = output[0].map(function (fund) {
              return fund._value;
            });
            fundSharePrices = output[1].map(function (fund) {
              return (0, _toReadable.default)(config, fund._value, config.quoteAssetSymbol).toNumber();
            });
            fundInceptions = output[2].map(function (fund) {
              return fund._value;
            });
            /* eslint-enable */

            getRankingPromises = new Array(fundAddresses.length).fill(undefined).map(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(val, index) {
                var fundContract, name;
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        fundContract = (0, _getFundContract.default)(environment, fundAddresses[index]);
                        _context.next = 3;
                        return fundContract.instance.getName.call();

                      case 3:
                        name = _context.sent;
                        return _context.abrupt("return", {
                          address: fundAddresses[index],
                          name: name,
                          sharePrice: fundSharePrices[index],
                          inception: (0, _toDate.default)(fundInceptions[index])
                        });

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x2, _x3) {
                return _ref2.apply(this, arguments);
              };
            }());
            _context2.next = 16;
            return _promise.default.all(getRankingPromises);

          case 16:
            unsortedFunds = _context2.sent;
            return _context2.abrupt("return", unsortedFunds.sort(function (a, b) {
              return a.sharePrice > b.sharePrice ? -1 : 1;
            }));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getRanking(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getRanking;
exports.default = _default;

/***/ }),
/* 202 */
/***/ (function(module, exports) {

module.exports = [{"constant":true,"inputs":[{"name":"ofVersion","type":"address"}],"name":"getFundDetails","outputs":[{"name":"","type":"address[]"},{"name":"","type":"uint256[]"},{"name":"","type":"uint256[]"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"}]

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _getVersionContract = _interopRequireDefault(__webpack_require__(15));

/**
 * Get subscription history of a manager by `managerAddress`
 */
var getSubscriptionHistory =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, managerAddress) {
    var startId,
        versionContract,
        subscriptionHistory,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            startId = _args.length > 2 && _args[2] !== undefined ? _args[2] : 0;
            _context.next = 3;
            return (0, _getVersionContract.default)(environment);

          case 3:
            versionContract = _context.sent;
            _context.next = 6;
            return versionContract.instance.getSubscriptionHistory.call({}, [managerAddress, startId]);

          case 6:
            subscriptionHistory = _context.sent;
            return _context.abrupt("return", subscriptionHistory);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getSubscriptionHistory(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = getSubscriptionHistory;
exports.default = _default;

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// // 
// import { allPass, flatten, propEq } from "ramda";
// // import ExchangeInterfaceJson from "@melonproject/smart-contracts/build/contracts/ExchangeInterface.json";
// import SimpleMarketJson from "@melonproject/smart-contracts/build/contracts/SimpleMarket.json";
// import DataFeedInterfaceJson from "@melonproject/smart-contracts/build/contracts/DataFeedInterface.json";
// import VersionJson from "@melonproject/smart-contracts/build/contracts/Version.json";
// import getConfig from "../calls/getConfig";
// import setup from "../../utils/setup";
// import trace from "../../utils/generic/trace";
// import parseEvent from "../../utils/ethereum/parseEvent";
// import extractEventDefinitions from "../../utils/ethereum/extractEventDefinitions";
// import onOrderUpdate from "../../exchange/events/onOrderUpdate";
// const subscriptions = new Set();
// const hashes = new Set();
// const addresses = new Set();
// let web3Filter;
// const onEventMap = {
//   OrderUpdate: onOrderUpdate,
// };
// const getEventDefinitions = async () => {
//   const config = await getConfig();
//   const interfaceAddressMap = new Map([
//     [DataFeedInterfaceJson, config.dataFeedAddress],
//     // TODO: Mask SimpleEvent behind simpleAdapter to fit into ExchangeInterface
//     // [ExchangeInterfaceJson, config.exchangeAddress],
//     [SimpleMarketJson], // same address as exchange
//     [VersionJson],
//   ]);
//   return flatten(
//     [...interfaceAddressMap].map(([json, address]) =>
//       extractEventDefinitions({ json, address, onEventMap }),
//     ),
//   );
// };
// const findEventDefinition = async criteria => {
//   const eventDefinitions = await getEventDefinitions();
//   return eventDefinitions.find(def => {
//     const criterias = Object.entries(criteria);
//     const predicates = criterias.map(([key, value]) => propEq(key, value));
//     const match = allPass(predicates)(def);
//     return match;
//   });
// };
// const isBigNumber = candidate => candidate instanceof setup.web3.BigNumber;
// const commonEventCleaner = args => {
//   const cleaned = { ...args };
//   if (isBigNumber(args.id)) cleaned.id = args.id.toNumber();
//   if (isBigNumber(args.atTime))
//     cleaned.atTime = new Date(args.atTime.times(1000).toNumber());
//   return cleaned;
// };
// const distribute = (name, args) => {
//   subscriptions.forEach(sub => {
//     const { filters, callback } = sub;
//     if (filters.includes(name)) {
//       if (filters.length > 1) {
//         callback(name, args);
//       } else {
//         callback(args);
//       }
//     }
//   });
// };
// const onError = (error, data) => {
//   trace({
//     message: "Error in MelonTracker",
//     category: "error",
//     data: { data, error },
//   });
//   const errorSubscriptions = subscriptions
//     ? [...subscriptions.values()].filter(sub => sub.filters.includes("error"))
//     : [];
//   if (errorSubscriptions.length > 0) {
//     errorSubscriptions.forEach(sub => {
//       const { filters, callback } = sub;
//       if (filters.length > 1) {
//         callback("error", error, data);
//       } else {
//         callback(error, data);
//       }
//     });
//   } else {
//     throw error;
//   }
// };
// const updateFilter = () => {
//   if (web3Filter) web3Filter.stopWatching();
//   if (addresses.size || hashes.size) {
//     /*
//     const filter = {
//       address: [...addresses.values()],
//       // only filter for topics if there is only one topic. Otherwise, topics are
//       // ANDed together and nothing is catched
//       // topics:
//       //   hashes.size === 1 ? [...hashes.values()].map(h => [h]) : undefined,
//     };
//     console.log("Filters ", filter, web3Filter);
//     */
//     web3Filter = setup.web3.eth.filter([...addresses.values()]);
//     web3Filter.watch(async (err, event) => {
//       if (err) onError(err);
//       if (hashes.has(event.topics[0])) {
//         const config = await findEventDefinition({ hash: event.topics[0] });
//         if (!config)
//           onError(new Error(`No event config for ${event.topics[0]}`));
//         const args = parseEvent(event, config.abi);
//         const cleaned = commonEventCleaner(args);
//         const enhanced = config.onEvent
//           ? await config.onEvent(cleaned)
//           : cleaned;
//         distribute(config.name, enhanced);
//       }
//     });
//   }
// };
// const implementFilters = async (filters, preventUpdate) => {
//   let needsUpdate = false;
//   const promises = filters.map(async filter => {
//     const definition = await findEventDefinition({ name: filter });
//     if (!definition) throw new Error(`No event definition found for ${filter}`);
//     if (!hashes.has(definition.hash)) {
//       needsUpdate = true;
//       hashes.add(definition.hash);
//     }
//     if (!addresses.has(definition.address)) {
//       needsUpdate = true;
//       addresses.add(definition.address);
//     }
//   });
//   await Promise.all(promises);
//   if (needsUpdate && !preventUpdate) updateFilter();
// };
// const refreshFilters = preventUpdate => {
//   hashes.clear();
//   addresses.clear();
//   if (subscriptions.size) {
//     subscriptions.forEach(sub => {
//       implementFilters(sub.filters, preventUpdate);
//     });
//   } else if (!preventUpdate && web3Filter) {
//     web3Filter.stopWatching();
//   }
// };
// const registerSubscription = subscription => {
//   implementFilters(subscription.filters);
//   subscriptions.add(subscription);
// };
// const removeSubscription = (subscription, preventUpdate) => {
//   subscriptions.delete(subscription);
//   refreshFilters(preventUpdate);
// };
// const clearSubscriptions = () => {
//   subscriptions.clear();
//   hashes.clear();
//   addresses.clear();
//   if (web3Filter) web3Filter.stopWatching();
// };
// /**
//  * setup a new tracker.
//  * @example
//  * const tracker = melonTracker.on('OrderUpdate');
//  * tracker(data => console.log(data));
//  * tracker.off();
//  *
//  * // or multi events:
//  * const multiTracker = melonTracker.on('OrderUpdate', 'FundCreated');
//  * multiTracker((name, data) => console.log(name, data)); // whereas name = OrderUpdate | FundCreated
//  */
// const melonTracker = {
//   on(...filters) {
//     let hoistedSubscription;
//     const tracker = callback => {
//       hoistedSubscription = { filters, callback };
//       registerSubscription(hoistedSubscription);
//     };
//     tracker.stop = () => {
//       removeSubscription(hoistedSubscription);
//     };
//     tracker.times = n =>
//       new Promise(resolve => {
//         let i = 0;
//         const waiting = {
//           filters,
//           callback: (name, args) => {
//             i += 1;
//             if (i >= n) {
//               removeSubscription(waiting);
//               resolve(name, args);
//             }
//           },
//         };
//         registerSubscription(waiting);
//       });
//     tracker.next = () => tracker.times(1);
//     return tracker;
//   },
//   off(...filters) {
//     if (filters.length > 0) {
//       let needsUpdate = false;
//       filters.forEach(filter => {
//         subscriptions
//           .find(sub => sub.filters.includes(filter))
//           .forEach(staleSub => {
//             needsUpdate = true;
//             removeSubscription(staleSub, true);
//           });
//       });
//       if (needsUpdate) updateFilter();
//     } else {
//       clearSubscriptions();
//     }
//   },
// };
// export default melonTracker;


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _addressBook = _interopRequireDefault(__webpack_require__(41));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var _findEventInLog = _interopRequireDefault(__webpack_require__(11));

var _getAddress = _interopRequireDefault(__webpack_require__(13));

var _getConfig = _interopRequireDefault(__webpack_require__(3));

var _getFundInformations = _interopRequireDefault(__webpack_require__(64));

var _getNetwork = _interopRequireDefault(__webpack_require__(33));

var _getVersionContract = _interopRequireDefault(__webpack_require__(15));

var _sendTransaction = _interopRequireDefault(__webpack_require__(6));

/**
 * Setup a new fund with `name` and an array of `exchangeNames`  */
var setupFund =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment, _ref) {
    var name, signature, _ref$exchangeNames, exchangeNames, config, quoteAssetSymbol, complianceAddress, riskManagementAddress, quoteAsset, managementReward, performanceReward, versionContract, isVersionShutDown, termsAndConditionsAreSigned, managerToFunds, network, exchanges, params, receipt, fundAddedMessage, logArgs, fundAddress, fundInformations;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = _ref.name, signature = _ref.signature, _ref$exchangeNames = _ref.exchangeNames, exchangeNames = _ref$exchangeNames === void 0 ? ['MatchingMarket', 'ZeroExExchange'] : _ref$exchangeNames;
            _context.next = 3;
            return (0, _getConfig.default)(environment);

          case 3:
            config = _context.sent;
            quoteAssetSymbol = config.quoteAssetSymbol, complianceAddress = config.complianceAddress, riskManagementAddress = config.riskManagementAddress;
            quoteAsset = (0, _getAddress.default)(config, quoteAssetSymbol);
            managementReward = 0;
            performanceReward = 0;
            _context.next = 10;
            return (0, _getVersionContract.default)(environment, config);

          case 10:
            versionContract = _context.sent;
            _context.next = 13;
            return versionContract.instance.isShutDown.call();

          case 13:
            isVersionShutDown = _context.sent;
            (0, _ensure.default)(!isVersionShutDown, 'Version is shut down.');
            _context.next = 17;
            return versionContract.instance.termsAndConditionsAreSigned.call({
              from: environment.account.address
            }, [signature.v, signature.r, signature.s]);

          case 17:
            termsAndConditionsAreSigned = _context.sent;
            (0, _ensure.default)(termsAndConditionsAreSigned, 'Invalid signature of terms and conditions on contract level');
            _context.next = 21;
            return versionContract.instance.managerToFunds.call({}, [environment.account.address]);

          case 21:
            managerToFunds = _context.sent;
            (0, _ensure.default)(managerToFunds === '0x0000000000000000000000000000000000000000', 'Already have a fund');
            _context.next = 25;
            return (0, _getNetwork.default)(environment);

          case 25:
            network = _context.sent;
            exchanges = exchangeNames.map(function (exchange) {
              return _addressBook.default[network][exchange];
            });
            params = [name, quoteAsset, managementReward, performanceReward, complianceAddress, riskManagementAddress, exchanges, [(0, _getAddress.default)(config, 'MLN-T')], signature.v, signature.r, signature.s];
            _context.next = 30;
            return (0, _sendTransaction.default)(versionContract, 'setupFund', params, environment);

          case 30:
            receipt = _context.sent;
            fundAddedMessage = (0, _findEventInLog.default)('FundUpdated', receipt, 'Error during fund creation');
            logArgs = fundAddedMessage.params;
            fundAddress = logArgs.ofFund.value;
            _context.next = 36;
            return (0, _getFundInformations.default)(environment, {
              fundAddress: fundAddress
            });

          case 36:
            fundInformations = _context.sent;
            return _context.abrupt("return", {
              address: fundAddress,
              name: fundInformations.name,
              inception: fundInformations.inception,
              modules: fundInformations.modules,
              owner: fundInformations.owner
            });

          case 38:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function setupFund(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = setupFund;
exports.default = _default;

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _ethersUtils = _interopRequireDefault(__webpack_require__(24));

var _ethersWallet = _interopRequireDefault(__webpack_require__(23));

var _ensure = _interopRequireDefault(__webpack_require__(5));

/**
 * Signs terms and conditions of competition with instantiated wallet
 * and returns a signature object with r, s and v require parameters in setupFund function
 */
var signCompetitionTermsAndConditions =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var arrayifiedHash, rawSignature, verified, hash, v;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // const competitionHash =
            //   '0x1A46B45CC849E26BB3159298C3C218EF300D015ED3E23495E77F0E529CE9F69E';
            // const api = new Api(setup.provider);
            // const CompetitionContract = await api.newContract(
            //   CompetitionAbi,
            //   '0x5652AC06E148b8c8d86c2C040fdBbbF98860ef47',
            // );
            // const competitionHash = await CompetitionContract.instance.TERMS_AND_CONDITIONS.call();
            arrayifiedHash = [26, 70, 180, 92, 200, 73, 226, 107, 179, 21, 146, 152, 195, 194, 24, 239, 48, 13, 1, 94, 211, 226, 52, 149, 231, 127, 14, 82, 156, 233, 246, 158];

            if (!environment.account.signMessage) {
              _context.next = 7;
              break;
            }

            rawSignature = environment.account.signMessage(arrayifiedHash);
            verified = _ethersWallet.default.Wallet.verifyMessage(arrayifiedHash, rawSignature);
            (0, _ensure.default)(verified.toLowerCase() === environment.account.address.toLowerCase(), 'Invalid signature of terms and conditions', {
              expected: environment.account.address,
              received: verified
            });
            _context.next = 11;
            break;

          case 7:
            hash = _ethersUtils.default.hexlify(arrayifiedHash);
            _context.next = 10;
            return environment.api.eth.sign(environment.account.address, hash);

          case 10:
            rawSignature = _context.sent;

          case 11:
            v = parseInt(rawSignature.substring(66 + 64), 16);
            return _context.abrupt("return", {
              r: rawSignature.substring(0, 66),
              s: "0x".concat(rawSignature.substring(66, 66 + 64)),
              v: v
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function signCompetitionTermsAndConditions(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = signCompetitionTermsAndConditions;
exports.default = _default;

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(2));

var _ethersWallet = _interopRequireDefault(__webpack_require__(23));

var _ethersUtils = _interopRequireDefault(__webpack_require__(24));

var _ensure = _interopRequireDefault(__webpack_require__(5));

var _getVersionContract = _interopRequireDefault(__webpack_require__(15));

/**
 * Signs terms and conditions of competition with instantiated wallet
 * and returns a signature object with r, s and v require parameters in setupFund function
 */
var signTermsAndConditions =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(environment) {
    var versionContract, arrayifiedHash, rawSignature, verified, hash;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _getVersionContract.default)(environment);

          case 2:
            versionContract = _context.sent;
            _context.next = 5;
            return versionContract.instance.TERMS_AND_CONDITIONS.call();

          case 5:
            arrayifiedHash = _context.sent;

            if (!environment.account.signMessage) {
              _context.next = 12;
              break;
            }

            rawSignature = environment.account.signMessage(arrayifiedHash);
            verified = _ethersWallet.default.Wallet.verifyMessage(arrayifiedHash, rawSignature);
            (0, _ensure.default)(verified.toLowerCase() === environment.account.address.toLowerCase(), 'Invalid signature of terms and conditions', {
              expected: environment.account.address,
              received: verified
            });
            _context.next = 16;
            break;

          case 12:
            hash = _ethersUtils.default.hexlify(arrayifiedHash);
            _context.next = 15;
            return environment.api.eth.sign(environment.account.address, hash);

          case 15:
            rawSignature = _context.sent;

          case 16:
            return _context.abrupt("return", {
              r: rawSignature.substring(0, 66),
              s: "0x".concat(rawSignature.substring(66, 66 + 64)),
              v: "0x".concat(rawSignature.substring(66 + 64))
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function signTermsAndConditions(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = signTermsAndConditions;
exports.default = _default;

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(12));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(86));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var exchange_aggregator_1 = __webpack_require__(209);

exports.Order = exchange_aggregator_1.Order;

var melon_js_1 = __webpack_require__(40);

var bignumber_js_1 = __webpack_require__(4);

var R = __webpack_require__(18);

var Rx = __webpack_require__(28);

var withUnsubscribe_1 = __webpack_require__(216);

var getPricePromises = function getPricePromises(environment, symbols) {
  return symbols.map(function (symbol) {
    return melon_js_1.getPrice(environment, symbol).then(function (price) {
      return {
        symbol: symbol,
        price: price
      };
    });
  });
};

exports.price = {
  resolve: function resolve(value) {
    return value;
  },
  subscribe: function subscribe(parent, args, context) {
    var pubsub = context.pubsub;
    var symbols = args.symbols;

    var fetchPrices = function fetchPrices(environment) {
      var _Rx$Observable;

      return (_Rx$Observable = Rx.Observable).forkJoin.apply(_Rx$Observable, (0, _toConsumableArray2.default)(getPricePromises(environment, symbols)));
    };

    var environment$ = Rx.Observable.fromPromise(melon_js_1.getParityProvider());
    var price$ = environment$.switchMap(fetchPrices).repeatWhen(Rx.operators.delay(10000));
    var channel = "price:".concat(symbols);
    var iterator = pubsub.asyncIterator(channel);

    var publish = function publish(value) {
      return pubsub.publish(channel, value);
    };

    return withUnsubscribe_1.default(price$, iterator, publish);
  }
};
var filterBuyOrders = R.filter(R.propEq('type', 'buy'));
var filterSellOrders = R.filter(R.propEq('type', 'sell'));

var accumulateSells = function accumulateSells(accumulator, order) {
  var volume = accumulator.plus(order.sell.howMuch);
  return [volume, {
    order: order,
    volume: volume
  }];
};

var accumulateBuys = function accumulateBuys(accumulator, order) {
  var volume = accumulator.plus(order.buy.howMuch);
  return [volume, {
    order: order,
    volume: volume
  }];
};

exports.orderbook = {
  resolve: function resolve(orders) {
    var _R$compose = R.compose(R.mapAccum(accumulateBuys, new bignumber_js_1.default(0)), filterBuyOrders)(orders),
        _R$compose2 = (0, _slicedToArray2.default)(_R$compose, 2),
        totalBuyVolume = _R$compose2[0],
        buyEntries = _R$compose2[1];

    var _R$compose3 = R.compose(R.mapAccum(accumulateSells, new bignumber_js_1.default(0)), filterSellOrders)(orders),
        _R$compose4 = (0, _slicedToArray2.default)(_R$compose3, 2),
        totalSellVolume = _R$compose4[0],
        sellEntries = _R$compose4[1];

    return {
      allOrders: orders,
      buyEntries: buyEntries,
      sellEntries: sellEntries,
      totalSellVolume: totalSellVolume,
      totalBuyVolume: totalBuyVolume
    };
  },
  subscribe: function subscribe(parent, args, context) {
    var pubsub = context.pubsub;
    var baseTokenSymbol = args.baseTokenSymbol,
        quoteTokenSymbol = args.quoteTokenSymbol,
        exchanges = args.exchanges;
    var orderbook$ = exchange_aggregator_1.getAggregatedObservable(baseTokenSymbol, quoteTokenSymbol, exchanges);
    var channel = "orderbook:".concat(baseTokenSymbol, "/").concat(quoteTokenSymbol);
    var iterator = pubsub.asyncIterator(channel);

    var publish = function publish(value) {
      return pubsub.publish(channel, value);
    };

    return withUnsubscribe_1.default(orderbook$, iterator, publish);
  }
};
exports.default = {
  price: exports.price,
  orderbook: exports.orderbook
};

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var getAggregatedObservable_1 = __webpack_require__(210);

exports.getAggregatedObservable = getAggregatedObservable_1.default;

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var R = __webpack_require__(18);

var Rx = __webpack_require__(28);

var getObservableRelayer_1 = __webpack_require__(211);

var getObservableErcDex_1 = __webpack_require__(213);

var getObservableOasisDex_1 = __webpack_require__(215);

var debug = __webpack_require__(39)('exchange-aggregator');

var exchangeToCreatorFunction = {
  RADAR_RELAY: function RADAR_RELAY(baseTokenSymbol, quoteTokenSymbol) {
    return getObservableRelayer_1.default(baseTokenSymbol, quoteTokenSymbol);
  },
  OASIS_DEX: function OASIS_DEX(baseTokenSymbol, quoteTokenSymbol) {
    return getObservableOasisDex_1.default(baseTokenSymbol, quoteTokenSymbol);
  },
  ERC_DEX: function ERC_DEX(baseTokenSymbol, quoteTokenSymbol) {
    return getObservableErcDex_1.default(baseTokenSymbol, quoteTokenSymbol);
  }
};
var concatOrderbooks = R.reduce(R.concat, []);
var sortOrderBooks = R.sort(function (a, b) {
  if (a.type === b.type) {
    if (a.type === 'buy') {
      return b.price.minus(a.price).toNumber();
    }

    if (a.type === 'sell') {
      return a.price.minus(b.price).toNumber();
    }
  }

  return a.type === 'buy' ? 1 : -1;
});

var getAggregatedObservable = function getAggregatedObservable(baseTokenSymbol, quoteTokenSymbol) {
  var exchanges = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['RADAR_RELAY', 'OASIS_DEX', 'ERC_DEX'];
  var exchanges$ = Rx.Observable.from(exchanges);
  var orderbooks$ = exchanges$.map(function (name) {
    return exchangeToCreatorFunction[name];
  }).map(function (create) {
    return create(baseTokenSymbol, quoteTokenSymbol);
  }).combineAll().do(function (value) {
    return debug('Emitting combined order book.', value);
  }).distinctUntilChanged(); // Concat and sort orders across all order books.

  return orderbooks$.map(R.compose(sortOrderBooks, concatOrderbooks));
};

exports.default = getAggregatedObservable;

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

var _stringify = _interopRequireDefault(__webpack_require__(46));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var R = __webpack_require__(18);

var Rx = __webpack_require__(28);

var formatRelayerOrderbook_1 = __webpack_require__(87);

var getStemmedSymbol_1 = __webpack_require__(88);

var getTokenAddress_1 = __webpack_require__(89); // Isomorphic websocket implementation. Falls back to the standard browser
// protocol on the client.


var WebSocket = __webpack_require__(90);

var debug = __webpack_require__(39)('exchange-aggregator:0x');

var subscribeMessage = function subscribeMessage(baseTokenAddress, quoteTokenAddress) {
  return (0, _stringify.default)({
    type: 'subscribe',
    channel: 'orderbook',
    requestId: 1,
    payload: {
      baseTokenAddress: baseTokenAddress,
      quoteTokenAddress: quoteTokenAddress,
      snapshot: true,
      limit: 1000
    }
  });
};

var isSnapshotMessage = R.propEq('type', 'snapshot');
var isUpdateMessage = R.propEq('type', 'update');
var scanMessages = R.cond([[function (carry, current) {
  return isSnapshotMessage(current);
}, function (carry, current) {
  return current.payload;
}], [function (carry, current) {
  return isUpdateMessage(current);
}, function (carry, current) {
  return updateAsksAndBids(carry, current.payload);
}], [R.T, R.identity]]);

var updateAsksAndBids = function updateAsksAndBids(state, order) {
  // @TODO: Implement update logic.
  return state;
};

var getObservableRadarRelay = function getObservableRadarRelay(baseTokenSymbol, quoteTokenSymbol) {
  var stemmedBaseTokenSymbol = getStemmedSymbol_1.default(baseTokenSymbol);
  var stemmedQuoteTokenSymbol = getStemmedSymbol_1.default(quoteTokenSymbol);
  var baseTokenAddress = getTokenAddress_1.default(stemmedBaseTokenSymbol);
  var quoteTokenAddress = getTokenAddress_1.default(stemmedQuoteTokenSymbol);
  debug('Connecting.', {
    baseTokenSymbol: baseTokenSymbol,
    quoteTokenSymbol: quoteTokenSymbol,
    stemmedBaseTokenSymbol: stemmedBaseTokenSymbol,
    stemmedQuoteTokenSymbol: stemmedQuoteTokenSymbol,
    baseTokenAddress: baseTokenAddress,
    quoteTokenAddress: quoteTokenAddress
  });
  var open$ = new Rx.Subject();
  var socket$ = Rx.Observable.webSocket({
    url: 'wss://api.radarrelay.com/0x/v0/ws',
    WebSocketCtor: WebSocket,
    openObserver: open$
  });
  open$.subscribe(function (event) {
    var message = subscribeMessage(baseTokenAddress, quoteTokenAddress);
    socket$.next(message);
  });
  var format = formatRelayerOrderbook_1.default('RADAR_RELAY');
  var messages$ = socket$ // @TODO: In addition to restarting the connection when it's closed, also
  // send a ping signal if there is no activity to prevent closing the websocket
  // connection in the first place.
  .retry().do(function (value) {
    return debug('Received message.', value);
  }).filter(R.propEq('channel', 'orderbook')).filter(R.anyPass([isSnapshotMessage, isUpdateMessage])).do(function (value) {
    return debug('Processing snapshot or update message.', value);
  }).scan(scanMessages, {
    bids: [],
    asks: []
  }).distinctUntilChanged().do(function (value) {
    return debug('Extracting bids and asks.', value);
  }).map(function (value) {
    return format(value.bids, value.asks);
  }).do(function (value) {
    return debug('Emitting order book.', value);
  }).catch(function (error) {
    debug('Failed to fetch orderbook.', {
      baseTokenAddress: baseTokenAddress,
      quoteTokenAddress: quoteTokenAddress,
      error: error
    });
    return Rx.Observable.of([]);
  });
  return messages$;
};

exports.default = getObservableRadarRelay;

/***/ }),
/* 212 */
/***/ (function(module, exports) {

module.exports = require("ws");

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

var _regenerator = _interopRequireDefault(__webpack_require__(1));

var _promise = _interopRequireDefault(__webpack_require__(14));

var _this = void 0;

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = _promise.default))(function (resolve, reject) {
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
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var axios_1 = __webpack_require__(214);

var R = __webpack_require__(18);

var Rx = __webpack_require__(28);

var formatRelayerOrderbook_1 = __webpack_require__(87);

var getStemmedSymbol_1 = __webpack_require__(88);

var getTokenAddress_1 = __webpack_require__(89); // Isomorphic websocket implementation. Falls back to the standard browser
// protocol on the client.


var WebSocket = __webpack_require__(90);

var debug = __webpack_require__(39)('exchange-aggregator:erc-dex');

var fetchOrderbook = function fetchOrderbook(baseTokenAddress, quoteTokenAddress) {
  return __awaiter(_this, void 0, void 0,
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var endpoint, params, data;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            endpoint = 'https://api.ercdex.com/api/standard/1/v0/orderbook';
            params = {
              baseTokenAddress: baseTokenAddress,
              quoteTokenAddress: quoteTokenAddress
            };
            debug('Fetching orderbook', params);
            _context.next = 5;
            return axios_1.default.get(endpoint, {
              params: params
            });

          case 5:
            data = _context.sent;
            debug('Fetched orderbook', data.data);
            return _context.abrupt("return", data.data);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
};

var getObservableErcDexNotifications = function getObservableErcDexNotifications(baseTokenAddress, quoteTokenAddress) {
  var channel = "aggregated-order-feed/".concat(baseTokenAddress, "/").concat(quoteTokenAddress);
  debug('Connecting to websocket.', channel);
  var open$ = new Rx.Subject();
  var socket$ = Rx.Observable.webSocket({
    url: 'wss://api.ercdex.com',
    WebSocketCtor: WebSocket,
    openObserver: open$
  });
  open$.subscribe(function (event) {
    socket$.next("sub:".concat(channel));
  });
  var messages$ = socket$ // @TODO: In addition to restarting the connection when it's closed, also
  // send a ping signal if there is no activity to prevent closing the websocket
  // connection in the first place.
  .retry().do(function (value) {
    return debug('Received message.', value);
  }).filter(R.propEq('channel', channel)).do(function (value) {
    return debug("Received update notification.", value);
  });
  return messages$;
};

var getObservableErcDex = function getObservableErcDex(baseTokenSymbol, quoteTokenSymbol) {
  var stemmedBaseTokenSymbol = getStemmedSymbol_1.default(baseTokenSymbol);
  var stemmedQuoteTokenSymbol = getStemmedSymbol_1.default(quoteTokenSymbol);
  var baseTokenAddress = getTokenAddress_1.default(stemmedBaseTokenSymbol);
  var quoteTokenAddress = getTokenAddress_1.default(stemmedQuoteTokenSymbol);
  debug('Processed symbols.', {
    baseTokenSymbol: baseTokenSymbol,
    quoteTokenSymbol: quoteTokenSymbol,
    stemmedBaseTokenSymbol: stemmedBaseTokenSymbol,
    stemmedQuoteTokenSymbol: stemmedQuoteTokenSymbol,
    baseTokenAddress: baseTokenAddress,
    quoteTokenAddress: quoteTokenAddress
  });
  var format = formatRelayerOrderbook_1.default('ERC_DEX');
  var fetch$ = Rx.Observable.defer(function () {
    return fetchOrderbook(baseTokenAddress, quoteTokenAddress);
  });
  var orderbook$ = fetch$.distinctUntilChanged().do(function (value) {
    return debug('Extracting bids and asks.', value);
  }).map(function (value) {
    return format(value.bids, value.asks);
  }).catch(function (error) {
    debug('Failed to fetch orderbook.', {
      baseTokenAddress: baseTokenAddress,
      quoteTokenAddress: quoteTokenAddress,
      error: error
    });
    return Rx.Observable.of([]);
  });
  return orderbook$.repeatWhen(function () {
    return getObservableErcDexNotifications(baseTokenAddress, quoteTokenAddress);
  });
};

exports.default = getObservableErcDex;

/***/ }),
/* 214 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

var _assign = _interopRequireDefault(__webpack_require__(38));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var melon_js_1 = __webpack_require__(40);

var Rx = __webpack_require__(28);

var debug = __webpack_require__(39)('exchange-aggregator:oasis-dex');

var labelOrder = function labelOrder(order) {
  return (0, _assign.default)({}, order, {
    exchange: 'OASIS_DEX'
  });
};

var labelOrders = function labelOrders(orders) {
  return orders.map(labelOrder);
};

var fetchOrderbook = function fetchOrderbook(options) {
  return function (environment) {
    return Rx.Observable.fromPromise(melon_js_1.getOrderbook(environment, options));
  };
};

var getObservableOasisDex = function getObservableOasisDex(baseTokenSymbol, quoteTokenSymbol) {
  var environment$ = Rx.Observable.fromPromise(melon_js_1.getParityProvider());
  var orderbook$ = environment$.do(function (value) {
    return debug('Fetching.', value);
  }).switchMap(fetchOrderbook({
    baseTokenSymbol: baseTokenSymbol,
    quoteTokenSymbol: quoteTokenSymbol
  })).do(function (value) {
    return debug('Receiving values.', value);
  }).distinctUntilChanged().map(labelOrders).do(function (value) {
    return debug('Emitting order book.', value);
  });
  return orderbook$.repeatWhen(Rx.operators.delay(10000));
};

exports.default = getObservableOasisDex;

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(0);

var _defineProperty2 = _interopRequireDefault(__webpack_require__(83));

var _assign = _interopRequireDefault(__webpack_require__(38));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var iterall_1 = __webpack_require__(217);

var Rx = __webpack_require__(28); // @TODO: https://github.com/apollographql/graphql-subscriptions/pull/147


function withUnsubscribe(observable$, iterator, publish) {
  var end$ = new Rx.Subject();
  observable$.takeUntil(end$).subscribe(publish); // @ts-ignore: $$asyncIterator is considered the same as Symbol.asyncIterator by TypeScript.

  return (0, _assign.default)({}, iterator, (0, _defineProperty2.default)({
    return: function _return(value) {
      end$.next(true);
      return iterator.return ? iterator.return(value) : {
        done: true,
        value: value
      };
    },
    throw: function _throw(error) {
      end$.error(error);
      return iterator.throw ? iterator.throw(error) : {
        done: true,
        value: undefined
      };
    }
  }, iterall_1.$$asyncIterator, function () {
    return this;
  }));
}

exports.default = withUnsubscribe;

/***/ }),
/* 217 */
/***/ (function(module, exports) {

module.exports = require("iterall");

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var graphql_1 = __webpack_require__(50);

exports.default = new graphql_1.GraphQLScalarType({
  name: 'Symbol',
  parseValue: function parseValue(value) {
    return value;
  },
  serialize: function serialize(value) {
    return value.toString();
  },
  parseLiteral: function parseLiteral(ast) {
    if (ast.kind === graphql_1.Kind.STRING) {
      if (ast.value.length > 10) {
        throw new TypeError('Symbols have to be shorter than 6 characters.');
      } else {
        return ast.value.toString();
      }
    }

    return null;
  }
});

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {


    var doc = {"kind":"Document","definitions":[{"kind":"SchemaDefinition","directives":[],"operationTypes":[{"kind":"OperationTypeDefinition","operation":"query","type":{"kind":"NamedType","name":{"kind":"Name","value":"Query"}}},{"kind":"OperationTypeDefinition","operation":"subscription","type":{"kind":"NamedType","name":{"kind":"Name","value":"Subscription"}}}]}],"loc":{"start":0,"end":386}};
    doc.loc.source = {"body":"#import \"./schema/Symbol.gql\"\n#import \"./schema/Order.gql\"\n#import \"./schema/ExchangeEnum.gql\"\n#import \"./schema/HowMuchOfAsset.gql\"\n#import \"./schema/Quantity.gql\"\n#import \"./schema/Orderbook.gql\"\n#import \"./schema/OrderbookEntry.gql\"\n#import \"./schema/Query.gql\"\n#import \"./schema/Price.gql\"\n#import \"./schema/Subscription.gql\"\n\nschema {\n  query: Query\n  subscription: Subscription\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  doc.definitions = doc.definitions.concat(unique(__webpack_require__(220).definitions));
doc.definitions = doc.definitions.concat(unique(__webpack_require__(221).definitions));
doc.definitions = doc.definitions.concat(unique(__webpack_require__(222).definitions));
doc.definitions = doc.definitions.concat(unique(__webpack_require__(223).definitions));
doc.definitions = doc.definitions.concat(unique(__webpack_require__(224).definitions));
doc.definitions = doc.definitions.concat(unique(__webpack_require__(225).definitions));
doc.definitions = doc.definitions.concat(unique(__webpack_require__(226).definitions));
doc.definitions = doc.definitions.concat(unique(__webpack_require__(227).definitions));
doc.definitions = doc.definitions.concat(unique(__webpack_require__(228).definitions));
doc.definitions = doc.definitions.concat(unique(__webpack_require__(229).definitions));


      module.exports = doc;
    


/***/ }),
/* 220 */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ScalarTypeDefinition","name":{"kind":"Name","value":"Symbol"},"directives":[]}],"loc":{"start":0,"end":14}};
    doc.loc.source = {"body":"scalar Symbol\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),
/* 221 */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Order"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"owner"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"isActive"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"type"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"buy"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HowMuchOfAsset"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"sell"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"HowMuchOfAsset"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"price"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"exchangeContractAddress"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"exchange"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]}],"loc":{"start":0,"end":200}};
    doc.loc.source = {"body":"type Order {\n  id: String!\n  owner: String!\n  isActive: Boolean!\n  type: String!\n  buy: HowMuchOfAsset!\n  sell: HowMuchOfAsset!\n  price: String!\n  exchangeContractAddress: String\n  exchange: String\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),
/* 222 */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"EnumTypeDefinition","name":{"kind":"Name","value":"ExchangeEnum"},"directives":[],"values":[{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"RADAR_RELAY"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"OASIS_DEX"},"directives":[]},{"kind":"EnumValueDefinition","name":{"kind":"Name","value":"ERC_DEX"},"directives":[]}]}],"loc":{"start":0,"end":58}};
    doc.loc.source = {"body":"enum ExchangeEnum {\n  RADAR_RELAY\n  OASIS_DEX\n  ERC_DEX\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),
/* 223 */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"HowMuchOfAsset"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"symbol"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Symbol"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"howMuch"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]}],"loc":{"start":0,"end":61}};
    doc.loc.source = {"body":"type HowMuchOfAsset {\n  symbol: Symbol!\n  howMuch: String!\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),
/* 224 */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ScalarTypeDefinition","name":{"kind":"Name","value":"Quantity"},"directives":[]}],"loc":{"start":0,"end":16}};
    doc.loc.source = {"body":"scalar Quantity\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),
/* 225 */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Orderbook"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"allOrders"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"sellEntries"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderbookEntry"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"buyEntries"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderbookEntry"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"totalBuyVolume"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Quantity"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"totalSellVolume"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Quantity"}},"directives":[]}]}],"loc":{"start":0,"end":158}};
    doc.loc.source = {"body":"type Orderbook {\n  allOrders: [Order]\n  sellEntries: [OrderbookEntry]\n  buyEntries: [OrderbookEntry]\n  totalBuyVolume: Quantity\n  totalSellVolume: Quantity\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),
/* 226 */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"OrderbookEntry"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"volume"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Quantity"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"order"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"directives":[]}]}],"loc":{"start":0,"end":58}};
    doc.loc.source = {"body":"type OrderbookEntry {\n  volume: Quantity\n  order: Order\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),
/* 227 */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"price"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"symbol"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Symbol"}}},"directives":[]}],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]}],"loc":{"start":0,"end":49}};
    doc.loc.source = {"body":"type Query {\n  price(symbol: Symbol!): String!\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),
/* 228 */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Price"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"symbol"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"price"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Quantity"}},"directives":[]}]}],"loc":{"start":0,"end":51}};
    doc.loc.source = {"body":"type Price {\n  symbol: String!\n  price: Quantity\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),
/* 229 */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Subscription"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"price"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"symbols"},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Symbol"}}},"directives":[]}],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"orderbook"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"baseTokenSymbol"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Symbol"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"quoteTokenSymbol"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Symbol"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"exchanges"},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExchangeEnum"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Orderbook"}},"directives":[]}]}],"loc":{"start":0,"end":175}};
    doc.loc.source = {"body":"type Subscription {\n  price(symbols: [Symbol]): [Price]\n  orderbook(\n    baseTokenSymbol: Symbol!\n    quoteTokenSymbol: Symbol!\n    exchanges: [ExchangeEnum]\n  ): Orderbook\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),
/* 230 */
/***/ (function(module, exports) {

module.exports = require("graphql-subscriptions");

/***/ }),
/* 231 */
/***/ (function(module, exports) {

module.exports = require("graphql-yoga");

/***/ })
/******/ ]);
//# sourceMappingURL=index.map