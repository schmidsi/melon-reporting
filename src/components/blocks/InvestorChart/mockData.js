const mockData = {
  data: {
    participations: {
      investors: [
        {
          address: '0x1',
          name: 'Hans',
        },
        {
          address: '0x2',
          name: 'Fritz',
        },
        {
          address: '0x3',
          name: 'Trudi',
        },
      ],
    },
  },
  calculationsHistory: [
    {
      aum: '100',
      investors: [
        {
          address: '0x1',
          name: 'Hans',
          percentage: '0.5',
        },
        {
          address: '0x2',
          name: 'Fritz',
          percentage: '0.25',
        },
        {
          address: '0x3',
          name: 'Trudi',
          percentage: '0.25',
        },
      ],
    },
    {
      aum: '100',
      investors: [
        {
          address: '0x1',
          name: 'Hans',
          percentage: '0.4',
        },
        {
          address: '0x2',
          name: 'Fritz',
          percentage: '0.35',
        },
        {
          address: '0x3',
          name: 'Trudi',
          percentage: '0.25',
        },
      ],
    },
    {
      aum: '150',
      investors: [
        {
          address: '0x1',
          name: 'Hans',
          percentage: '0.4',
        },
        {
          address: '0x2',
          name: 'Fritz',
          percentage: '0.35',
        },
        {
          address: '0x3',
          name: 'Trudi',
          percentage: '0.25',
        },
      ],
    },
    {
      aum: '150',
      investors: [
        {
          address: '0x1',
          name: 'Hans',
          percentage: '0.4',
        },
        {
          address: '0x2',
          name: 'Fritz',
          percentage: '0.4',
        },
        {
          address: '0x3',
          name: 'Trudi',
          percentage: '0.2',
        },
      ],
    },
  ],
};

export default mockData;
