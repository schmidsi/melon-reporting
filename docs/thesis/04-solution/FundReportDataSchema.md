# Fund Report Data Schema

## Description
We need a way to define the data from which a report can be produced for viewing and auditing.
The [JSON Schema](http://json-schema.org/) is a good fit, because we can specify types, involved data structures, constraints and describe the data directly.

# Schema
```json
{
  "$schema": "http://json-schema.org/draft-06/schema#",
  "title": "Product",
  "description": "A product from Acme's catalog",
  "type": "object"
}
```

# Example Data

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
      "address": "0xdd134E8F257d848261D8dDaA452B549E92f4A3Dc"
    },
    "manager": {
      "name": "Jeanne Golden", // optional
      "address": "0x54bb6bcbE88e3EcD2788380a686064984de78531"
    },
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
      "Liechtenstein",
    ],
    "strategy": "Melon Crypto Capital focuses on the most promising ...",
    "policy": {
      "portfolio": {
        "maxPositions": 100,
        "bestPriceTolerance": 5,
        "maxTrades": 50, // or string "50 per month"?
        "maxVolume": "10000.0000", // or int?
        "volatilityThreshold": 25, // or double as string......
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
            "address": "0xdd134E8F257d848261D8dDaA452B549E92f4A3Dc"
          }
        ],
        "liquidityInDays": 10,
        "marketCapRange": {
          "min": 10000000,
          "max": -1 // how to specify infinity? maybe marketCapRange has two strings...
        },
        "volatilityThershold": 35
      },
      "complianceModule": "0x9Ca935A5be2f7eD83e453647dBa2179D2cfDa1D8"
    }
  },
  "holdings": [
    {
      "symbol": "MLN",
      "address": "0x153F602ad18BBD1546b674cFDBe05a8ba72A1d57",
      "quantity": "5.491" // signed int?
    },
    {
      "symbol": "ETH",
      "address": "0xAA5D4CE8F95682e34d7A3c7d42df922998102485",
      "quantity": "0.253"
    },
    {
      "symbol": "DAI",
      "address": "0xdd134E8F257d848261D8dDaA452B549E92f4A3Dc",
      "quantity": "106.349"
    }
  ],
  "trades": [
    {
      "symbol": "MLN",
      "buyAmount": "3.000",
      "sellAmount": "2.800",
      "exchangeId": "Radar Relay",
      "timestamp": 1524739030740,
      "transaction": "0x76856aF5b24b29C8cDA09D8d27f527211747819c"
    },
  ],
  "participation": [ 
    {
      "investorAddress": "0xcDcCB1259CF7388D9018009349C945Cc35d5AFbE",
      "symbol": "...", // what symbol here?
      "amount": -23421,
      "shares": -1232,
      "timestamp": 1524737164199
    },
    {
      "investorAddress": "0x248bbE18d37C221eC397265742B02B89c7A4BB1a",
      "symbol": "...", // what symbol here?
      "amount": -23421,
      "shares": -1232,
      "timestamp": 1524739020140
    }
  ],
  "audits": [
    {
      "auditor": {
        "name": "Finn Lando", // optional
        "address": "0x9b8C165672b41725817a606c18C117C5a171D96b"
      },
      "dataHash": "1Nf2mjaHRhZK3qf9LrSveKimqVx3vUau5q",
      "timespanStart": 1524729021140,
      "timespanEnd": 1524739020045,
    },
    {
      "auditor": {
        "name": "Rey Skywalker",
        "address": "0x9b8C165672b41725817a606c18C117C5a171D96b"
      },
      "dataHash": "1MNDVGk51Wyty9YqjaZb99PDAPj4R2wEgx",
      "timespanStart": 1524729086440,
      "timespanEnd": 1524739020999,
    }
  ]
}
```

## old...

```json
{
  "name": "Example Fund",
  "inception": "yyyy-mm-dd hh:mm:ss",
  "description": "This fund is high risk",
  "manager": "0xbad...a55",
  "nav": 1000,
  "quoteSymbol": "MLN",
  "gav": 1100,
  "timestamp": "yyyy-mm-dd hh:mm:ss",
  "holdings": [
    {
      "symbol": "ETH",
      "amount": 1000
    }
  ],
  "trades": [
    {
      "buySymbol": "ETH",
      "sellSymbol": "MLN",
      "buyAmount": 100,
      "sellAmount": 50,
      "timestamp": "yyyy-mm-dd hh:mm:ss",
      "exchange": "0xdead...beef",
      "transaction": "0xdead...beef"
    }
  ],
  "audits": [
    {
      "timestamp": "yyyy-mm-dd hh:mm:ss",
      "auditor": "0xdead...beef1",
      "dataHash": "QmXZcdco6wZEA2paGeUnoshSB4HJiSTDxagqXerDGop6or",
      "signature": "0x23rasdfasdlfjhasldkfhas"
    }
  ]
}
```
