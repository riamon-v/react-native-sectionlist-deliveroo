import React from 'react';
import { Text } from 'react-native';

import SectionListDeliveroo from 'test-react-native-sectionlist-deliveroo';

const data = [
  {
    title: 'Section 1',
    key: 'Section1',
    data: [...Array(20)],
  },
  {
    title: 'Sec 2',
    key: 'Section2',
    data: [...Array(20)],
  },
  {
    title: 'Sectiooooooooooooooooooooooon 3',
    key: 'Section3',
    data: [...Array(20)],
  },
  {
    title: 'Section 4',
    key: 'Section4',
    data: [...Array(20)],
  },
  {
    title: 'Sec 5',
    key: 'Section5',
    data: [...Array(20)],
  },
  {
    title: 'Sectioooooooooooon 6',
    key: 'Section6',
    data: [...Array(20)],
  },
];

const App: React.FC<any> = () => {
  return (
    <SectionListDeliveroo
      sections={data}
      renderItem={({ index }) => <Text>{index}</Text>}
      stickySectionHeadersEnabled={false}
      showsVerticalScrollIndicator={false}
      renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
      keyExtractor={(_item, index) => `${index}`}
    />
  );
};

export default App;
