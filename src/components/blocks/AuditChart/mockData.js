const mockData = {
  data: {
    meta: {
      timeSpanStart: 1514764800,
      timeSpanEnd: 1530396000,
    },
    audits: [
      {
        auditor: {
          address: '0x9b8C165672b41725817a606c18C117C5a171D96b',
          name: 'Blockchain Audit AG',
        },
        dataHash:
          '0x1b3edc1db1d421e9c15b84cdae900ac7966cd15b05e20ae7554619377f2fa66a',
        timespanStart: 1514764800,
        timespanEnd: 1519858800,
        timestamp: 1519858900,
        opinion: 'Qualified Opinion',
        comment: 'Something is wrong!',
      },
      {
        auditor: {
          address: '0x9b8C165672b41725817a606c18C117C5a171D96b',
          name: 'Blockchain Audit AG',
        },
        dataHash:
          '0x383480d3df1a424636456dc1f986cbe5459c24616049ceb36ef634115a78a8dd',
        timespanStart: 1519858800,
        timespanEnd: 1524607200,
        timestamp: 1524739120,
        opinion: 'Unqualified Opinion',
        comment: 'Everything is fine!',
      },
      {
        auditor: {
          address: '0x9b8C165672b41725817a606c18C117C5a171D96b',
          name: 'Blockchain Audit AG',
        },
        dataHash:
          '0x283480d3df1a424636456dc1f986cbe5459c24616049ceb36ef634115a78a8dd',
        timespanStart: 1524739020,
        timespanEnd: 1529445600,
        timestamp: 1524739120,
        opinion: 'Unqualified Opinion',
        comment: 'Everything is fine!',
      },
    ],
  },
};

export default mockData;
