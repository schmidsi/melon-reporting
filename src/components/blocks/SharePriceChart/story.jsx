import React from 'react';
import { storiesOf } from '@storybook/react';
import SharePriceChart from './';

const mockData = [
  '0.0036628244',
  '0.0036625786',
  '0.0036625786',
  '0.0036625786',
  '0.0036644296',
  '0.0036644296',
  '0.0036568176',
  '0.0036568176',
  '0.0036568176',
  '0.0036582981',
  '0.0036582981',
  '0.003659037',
  '0.003659037',
  '0.003659037',
  '0.0036603461',
  '0.0036603461',
  '0.0036653309',
  '0.0036653309',
  '0.0036653309',
  '0.0036620877',
  '0.0036620877',
  '0.0036648893',
  '0.0036648893',
  '0.0036648893',
  '0.0036642833',
  '0.0036642833',
  '0.0036630669',
  '0.0036630669',
  '0.0036630669',
  '0.0036652676',
  '0.0036652676',
  '0.003662578',
  '0.003662578',
  '0.003662578',
  '0.0036625882',
  '0.0036625882',
  '0.0036625882',
  '0.0036655045',
  '0.0036655045',
  '0.0036623166',
  '0.0036623166',
  '0.0036623166',
  '0.0036873311',
  '0.0036873311',
  '0.00368626',
  '0.00368626',
  '0.00368626',
  '0.0036854924',
  '0.0036854924',
  '0.0036619071',
  '0.0036619071',
  '0.0036619071',
  '0.0036616929',
  '0.0036616929',
  '0.0036577222',
  '0.0036577222',
  '0.0036577222',
  '0.0036587928',
  '0.0036587928',
  '0.0036620959',
  '0.0036620959',
  '0.0036620959',
  '0.0036584437',
  '0.0036584437',
  '0.0036592952',
  '0.0036592952',
  '0.0036592952',
  '0.0036601458',
  '0.0036601458',
  '0.0036613239',
  '0.0036613239',
  '0.0036613239',
  '0.0036619488',
  '0.0036619488',
  '0.0036619488',
  '0.0036604151',
  '0.0036604151',
  '0.0036647385',
  '0.0036647385',
  '0.0036647385',
  '0.0036653148',
  '0.0036653148',
  '0.0036578747',
  '0.0036606418',
  '0.0036606418',
  '0.0036599903',
  '0.0036599903',
  '0.0036599903',
  '0.0036590964',
  '0.0036590964',
  '0.0036562661',
  '0.0036562661',
  '0.0036562661',
  '0.0036516823',
  '0.0036516823',
  '0.0036584144',
  '0.0036584144',
  '0.0036584144',
  '0.0036517258',
  '0.0036517258',
  '0.0036517258',
  '0.0036518746',
  '0.0036528111',
  '0.0036528111',
  '0.0036528111',
  '0.0036528111',
  '0.003653447',
  '0.003653447',
  '0.003653447',
  '0.0036520977',
  '0.0036520977',
  '0.0036533209',
  '0.0036533209',
  '0.0036533209',
  '0.0036546007',
  '0.0036546007',
  '0.003658228',
  '0.003658228',
  '0.003658228',
  '0.003656965',
  '0.003656965',
  '0.0036574962',
  '0.0036574962',
  '0.0036574962',
  '0.0036513671',
  '0.0036513671',
  '0.0036513671',
  '0.0036504808',
  '0.0036504808',
  '0.0036515375',
  '0.0036515375',
  '0.0036515375',
  '0.0036523766',
  '0.0036523766',
  '0.003652873',
  '0.003652873',
  '0.003652873',
  '0.003652838',
  '0.003652838',
  '0.003653053',
  '0.003653053',
  '0.0036577749',
  '0.0036577749',
  '0.0036591267',
  '0.0036591267',
  '0.0036591267',
  '0.0036579848',
  '0.0036579848',
  '0.0036577453',
  '0.0036577453',
  '0.0036577453',
  '0.0036595471',
  '0.0036595471',
  '0.0036567182',
  '0.0036567182',
  '0.0036610019',
  '0.0036610019',
  '0.0036610019',
  '0.0036620108',
  '0.0036620108',
  '0.0036689474',
  '0.0036689474',
  '0.0036689474',
  '0.003669777',
  '0.003669777',
  '0.0036696455',
  '0.0036696455',
  '0.0036696455',
  '0.0036800554',
  '0.0036800554',
  '0.0036775804',
  '0.0036775804',
  '0.0036775804',
  '0.0036814987',
  '0.0036814987',
  '0.0036819956',
  '0.0036819956',
  '0.0036819956',
  '0.0036855901',
  '0.0036855901',
  '0.0036809198',
  '0.0036809198',
  '0.0036809198',
  '0.0036793986',
  '0.0036793986',
  '0.0036823968',
  '0.0036823968',
  '0.0036823968',
  '0.0036866033',
  '0.0036866033',
  '0.0036866033',
  '0.0036854929',
  '0.0036854929',
  '0.0036836831',
  '0.0036836831',
  '0.0036836831',
  '0.0036818453',
  '0.0036818453',
  '0.0036872545',
  '0.0036872545',
];

storiesOf('SharePriceChart', module).add('default', () => (
  <div>
    <SharePriceChart data={mockData} />
  </div>
));
