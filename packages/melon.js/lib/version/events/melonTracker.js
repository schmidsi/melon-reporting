// // @flow
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
