// import { all } from "ramda";

// import setupFund from "../../../../lib/version/transactions/setupFund";
// import melonTracker from "../../../../lib/version/events/melonTracker";

// const randomString = (length = 4) =>
//   Math.random().toString(36).substr(2, length);

// const fundName = `test-${randomString()}`;

// const eventsSeen = {
//   FundAdded: false,
//   DataUpdated: false,
// };

// const eventExpectations = {
//   FundAdded: args => {
//     expect(args.name).toEqual(fundName);
//   },
// };
// xit(
//   "watchVaultAssociated",
//   async () =>
//     new Promise(async resolve => {
//       melonTracker.on("FundAdded", "DataUpdated")((name, args) => {
//         eventsSeen[name] = args;
//         if (eventExpectations[name]) eventExpectations[name](args);
//         if (all(i => i)(Object.values(eventsSeen))) resolve();
//       });

//       await setupFund(fundName);
//     }),
//   2 * 60 * 1000,
// );
