Example subscription query (BAT/W-ETH):

```graphql
subscription {
  aggregatedOrderbook(
    baseTokenAddress: "0x0d8775f648430679a709e98d2b0cb6250d2887ef"
    quoteTokenAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
  ) {
    id
    isActive
    owner
    type
  }
}
```
