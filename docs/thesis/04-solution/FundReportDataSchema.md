# Fund Report Data Schema

## Description
We need a way to define the data from which a report can be produced for viewing and auditing.
The [JSON Schema](http://json-schema.org/) is a good fit, because we can specify types, involved data structures, constraints and describe the data directly.

The Schema _Fund Report_ is a JSON to define our data JSON files (acutal instances of Fund Report data), basically a meta-JSON.

# Schema "Fund Report"

```json
// TODO:
// add descriptions where useful
// $id when schema place is fixed --> link to schema on github
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Fund Report",
  "$version": "0.1",
  "description": "Fund data to generate a report from and create a hash for auditing.",
  "type": "object",
  "definitions": {
    "nonNegativeInteger": {
      "type": "integer",
      "minimum": 0
    },
    "ethereumAddress": {
      "type": "string",
      "pattern": "^0x(\\d|[A-F]|[a-f]){40}$"
    },
    "erc20TokenSymbol": {
      "type": "string",
      "pattern": "^([A-Z]){1,9}$"
    },
    "bigNumber": {
      "type": "string",
      "pattern": "^\\d*.\\d*$"
    },
    "timePeriod": {
      "type": "string",
      "enum": [
        "day",
        "month",
        "year"
      ]
    },
    "token": {
      "type": "object",
      "properties": {
        "symbol": {
          "$ref": "#/definitions/erc20TokenSymbol"
        },
        "address": {
          "$ref": "#/definitions/ethereumAddress"
        }
      },
      "required": [
        "symbol",
        "address"
      ]
    },
    "exchange": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "address": {
          "$ref": "#/definitions/ethereumAddress"
        }
      },
      "required": [
        "id",
        "address"
      ]
    },
    "orderSide": {
      "type": "object",
      "properties": {
        "token": {
          "$ref": "#/definitions/token"
        },
        "howMuch": {
          "$ref": "#/definitions/bigNumber"
        }
      },
      "required": [
        "token",
        "howMuch"
      ]
    },
    "participationType": {
      "type": "string",
      "enum": [
        "invest",
        "redeem"
      ]
    }
  },
  "properties": {
    "meta": {
      "type": "object",
      "properties": {
        "fundName": {
          "type": "string"
        },
        "timespanStart": {
          "$ref": "#/definitions/nonNegativeInteger"
        },
        "timespanEnd": {
          "$ref": "#/definitions/nonNegativeInteger"
        },
        "fundAddress": {
          "$ref": "#/definitions/ethereumAddress"
        },
        "inception": {
          "$ref": "#/definitions/nonNegativeInteger"
        },
        "quoteToken": {
          "type": "object",
          "properties": {
            "symbol": {
              "$ref": "#/definitions/erc20TokenSymbol"
            },
            "address": {
              "$ref": "#/definitions/ethereumAddress"
            }
          },
          "required": [
            "symbol",
            "address"
          ]
        },
        "manager": {
          "$ref": "#/definitions/ethereumAddress"
        },
        "exchanges": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/exchange"
          }
        },
        "legalEntity": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "strategy": {
          "type": "string"
        },
        "policy": {
          "type": "object",
          "properties": {
            "portfolio": {
              "type": "object",
              "properties": {
                "maxPositions": {
                  "$ref": "#/definitions/nonNegativeInteger"
                },
                "bestPriceTolerance": {
                  "$ref": "#/definitions/bigNumber"
                },
                "maxTrades": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "$ref": "#/definitions/nonNegativeInteger"
                    },
                    "timePeriod": {
                      "$ref": "#/definitions/timePeriod"
                    }
                  },
                  "required": [
                    "threshold",
                    "timePeriod"
                  ]
                },
                "maxVolume": {
                  "type": "object",
                  "properties": {
                    "threshold": {
                      "$ref": "#/definitions/bigNumber"
                    },
                    "timePeriod": {
                      "$ref": "#/definitions/timePeriod"
                    }
                  },
                  "required": [
                    "threshold",
                    "timePeriod"
                  ]
                },
                "volatilityThreshold": {
                  "$ref": "#/definitions/bigNumber"
                }
              },
              "required": [
                "maxPositions",
                "bestPriceTolerance",
                "maxTrades",
                "maxVolume",
                "volatilityThreshold"
              ]
            },
            "tokens": {
              "type": "object",
              "properties": {
                "whitelist": {
                  "type": "array",
                  "items": {
                    "$ref": "#/definitions/token"
                  }
                },
                "liquidityInDays": {
                  "$ref": "#/definitions/nonNegativeInteger"
                },
                "marketCapRange": {
                  "type": "object",
                  "properties": {
                    "min": {
                      "$ref": "#/definitions/nonNegativeInteger"
                    },
                    "max": {
                      "$ref": "#/definitions/nonNegativeInteger"
                    }
                  },
                  "required": [
                    "min"
                  ]
                },
                "volatilityThreshold": {
                  "$ref": "#/definitions/bigNumber"
                }
              },
              "required": [
                "whitelist",
                "liquidityInDays",
                "marketCapRange",
                "volatilityThreshold"
              ]
            },
            "participation": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "address": {
                  "$ref": "#/definitions/ethereumAddress"
                }
              },
              "required": [
                "name",
                "address"
              ]
            }
          },
          "required": [
            "portfolio",
            "tokens",
            "participation"
          ]
        }
      },
      "required": [
        "fundName",
        "timespanStart",
        "timespanEnd",
        "fundAddress",
        "inception",
        "quoteToken",
        "manager",
        "exchanges",
        "policy"
      ]
    },
    "holdings": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "token": {
            "$ref": "#/definitions/token"
          },
          "quantity": {
            "$ref": "#/definitions/bigNumber"
          },
          "priceHistory": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/bigNumber"
            }
          }
        },
        "required": [
          "token",
          "quantity",
          "priceHistory"
        ]
      }
    },
    "trades": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "buy": {
            "$ref": "#/definitions/orderSide"
          },
          "sell": {
            "$ref": "#/definitions/orderSide"
          },
          "exchange": {
            "$ref": "#/definitions/exchange"
          },
          "timestamp": {
            "$ref": "#/definitions/nonNegativeInteger"
          },
          "transaction": {
            "$ref": "#/definitions/ethereumAddress"
          }
        },
        "required": [
          "buy",
          "sell",
          "exchange",
          "timestamp",
          "transaction"
        ]
      }
    },
    "participations": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "investor": {
            "$ref": "#/definitions/ethereumAddress"
          },
          "token": {
            "$ref": "#/definitions/token"
          },
          "type": {
            "$ref": "#/definitions/participationType"
          },
          "amount": {
            "$ref": "#/definitions/bigNumber"
          },
          "shares": {
            "$ref": "#/definitions/bigNumber"
          },
          "timestamp": {
            "$ref": "#/definitions/nonNegativeInteger"
          }
        },
        "required": [
          "investor",
          "token",
          "type",
          "amount",
          "shares",
          "timestamp"
        ]
      }
    },
    "audits": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "auditor": {
            "$ref": "#/definitions/ethereumAddress"
          },
          "dataHash": {
            "type": "string"
          },
          "timespanStart": {
            "$ref": "#/definitions/nonNegativeInteger"
          },
          "timespanEnd": {
            "$ref": "#/definitions/nonNegativeInteger"
          }
        },
        "required": [
          "auditor",
          "dataHash",
          "timespanStart",
          "timespanEnd"
        ]
      }
    }
  },
  "required": [
    "meta",
    "holdings",
    "trades",
    "participations",
    "audits"
  ]
}
```

# Example Data
TO DISCUSS: 
* maybe use schema built-in date-time type for readability?

```json
{
  "meta": {
    "fundName": "Melon Crypto Capital",
    "timespanStart": 1524739040740,
    "timespanEnd": 1524741632780,
    "fundAddress": "0x9395de1F82233A1A19319966672E0cE6B32dF080",
    "inception": 1524710528740,
    "quoteToken": {
      "symbol": "DAI",
      "address": "0x9A0Bd6b8c445D67277A8b4b4cEf2339d4b7C9772"
    },
    "manager": "0x54bb6bcbE88e3EcD2788380a686064984de78531",
    "exchanges": [
      {
        "id": "Radar Relay",
        "address": "0x2A3430a4875D0440F1Dd80Cd1eB406f2E063E61f"
      },
      {
        "id": "ERC Dex",
        "address": "0x5d263eb2C080a48F64179689549AAf6056410dfB"
      }
    ],
    "legalEntity": [
      "Melon Crypto Capital AG",
      "Herrengasse 18",
      "FL-9490 Vaduz",
      "Liechtenstein"
    ],
    "strategy": "Melon Crypto Capital focuses on the most promising ...",
    "policy": {
      "portfolio": {
        "maxPositions": 100,
        "bestPriceTolerance": "0.05",
        "maxTrades": {
          "threshold": 50,
          "timePeriod": "month"
        },
        "maxVolume": {
          "threshold": "10000.0000",
          "timePeriod": "month"
        },
        "volatilityThreshold": "0.25"
      },
      "tokens": {
        "whitelist": [
          {
            "symbol": "MLN",
            "address": "0x153F602ad18BBD1546b674cFDBe05a8ba72A1d57"
          },
          {
            "symbol": "ETH",
            "address": "0xad0E75B07cb4b1004A96Fa9a8D6F5e0B4b4fdA16"
          },
          {
            "symbol": "DAI",
            "address": "0x9A0Bd6b8c445D67277A8b4b4cEf2339d4b7C9772"
          }
        ],
        "liquidityInDays": 10,
        "marketCapRange": {
          "min": 10000000,
          "max": 10000000000
        },
        "volatilityThreshold": "0.35"
      },
      "participation": {
        "name": "Bitcoin Suisse KYC",
        "address": "0x9Ca935A5be2f7eD83e453647dBa2179D2cfDa1D8"
      }
    }
  },
  "holdings": [
    {
      "token": {
        "symbol": "MLN",
        "address": "0x153F602ad18BBD1546b674cFDBe05a8ba72A1d57"
      },
      "quantity": "5.4910000000000",
      "priceHistory": [
        "1.000000",
        "1.506000",
        "1.406860"
      ]
    },
    {
      "token": {
        "symbol": "ETH",
        "address": "0xad0E75B07cb4b1004A96Fa9a8D6F5e0B4b4fdA16"
      },
      "quantity": "0.2530000000000",
      "priceHistory": [
        "2.100123",
        "2.306630",
        "2.206153"
      ]
    },
    {
      "token": {
        "symbol": "DAI",
        "address": "0x9A0Bd6b8c445D67277A8b4b4cEf2339d4b7C9772"
      },
      "quantity": "106.3490000000000",
      "priceHistory": [
        "1.51198",
        "1.69279",
        "1.76345"
      ]
    }
  ],
  "trades": [
    {
      "buy": {
        "token": {
          "symbol": "MLN",
          "address": "0x153F602ad18BBD1546b674cFDBe05a8ba72A1d57"
        },
        "howMuch": "3.982323249"
      },
      "sell": {
        "token": {
          "symbol": "DAI",
          "address": "0x9A0Bd6b8c445D67277A8b4b4cEf2339d4b7C9772"
        },
        "howMuch": "3.982323249"
      },
      "exchange": {
        "id": "Radar Relay",
        "address": "0x2A3430a4875D0440F1Dd80Cd1eB406f2E063E61f"
      },
      "timestamp": 1524739030740,
      "transaction": "0x76856aF5b24b29C8cDA09D8d27f527211747819c"
    },
    {
      "buy": {
        "token": {
          "symbol": "ETH",
          "address": "0x153F602ad18BBD1546b674cFDBe05a8ba72A1d57"
        },
        "howMuch": "3.982323249"
      },
      "sell": {
        "token": {
          "symbol": "DAI",
          "address": "0x9A0Bd6b8c445D67277A8b4b4cEf2339d4b7C9772"
        },
        "howMuch": "2.2939423"
      },
      "exchange": {
        "id": "Radar Relay",
        "address": "0x2A3430a4875D0440F1Dd80Cd1eB406f2E063E61f"
      },
      "timestamp": 1524739030740,
      "transaction": "0x76856aF5b24b29C8cDA09D8d27f527211747819c"
    }
  ],
  "participations": [
    {
      "investor": "0xcDcCB1259CF7388D9018009349C945Cc35d5AFbE",
      "token": {
        "symbol": "DAI",
        "address": "0x9A0Bd6b8c445D67277A8b4b4cEf2339d4b7C9772"
      },
      "type": "invest",
      "amount": "23478.8230000",
      "shares": "2387.923990",
      "timestamp": 1524737164199
    },
    {
      "investor": "0xd1324AEd96fC94e219c3663A665c6e398D8634Db",
      "token": {
        "symbol": "ETH",
        "address": "0x153F602ad18BBD1546b674cFDBe05a8ba72A1d57"
      },
      "type": "redeem",
      "amount": "531.208420",
      "shares": "2028.123080",
      "timestamp": 1524737174690
    }
  ],
  "audits": [
    {
      "auditor": "0x9b8C165672b41725817a606c18C117C5a171D96b",
      "dataHash": "1Nf2mjaHRhZK3qf9LrSveKimqVx3vUau5q",
      "timespanStart": 1524729021140,
      "timespanEnd": 1524739020045
    },
    {
      "auditor": "0x9b8C165672b41725817a606c18C117C5a171D96b",
      "dataHash": "1MNDVGk51Wyty9YqjaZb99PDAPj4R2wEgx",
      "timespanStart": 1524729086440,
      "timespanEnd": 1524739020999
    }
  ]
}
```