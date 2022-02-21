import React from 'react';
import { SectionList, SectionListProps, StyleProp, View, ViewStyle, ViewToken } from 'react-native';
import { SectionHeader, SectionHeaderStylingProps } from './SectionHeaderDeliveroo';

interface SectionListDeliverooProps extends SectionHeaderStylingProps, SectionListProps<any, any> {
  containerStyle?: StyleProp<ViewStyle>;
}

const SectionListDeliveroo: React.FC<SectionListDeliverooProps> = (props) => {
  const sectionListRef = React.useRef<SectionList<any, any>>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const hasBeenSetOnScroll = React.useRef(false);

  const onCheckViewableItems = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (!!viewableItems[0]) {
      const {
        section: { key },
      } = viewableItems[0];
      const actvI = props.sections.findIndex((item) => item.key === key) - 1;
      if (hasBeenSetOnScroll.current === true && activeIndex !== actvI) {
        setActiveIndex(actvI < 0 ? 0 : actvI);
      }
    }
  };

  const setHadBeenSetOnScroll = React.useCallback((v: boolean) => {
    hasBeenSetOnScroll.current = v;
  }, []);

  return (
    <View style={props.containerStyle}>
      <SectionHeader
        sectionTitles={props.sections.map(({ title }) => title)}
        sectionListRef={sectionListRef}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        setHasBeenSetOnScroll={setHadBeenSetOnScroll}
        {...props}
      />
      <SectionList
        ref={sectionListRef}
        {...props}
        onViewableItemsChanged={onCheckViewableItems}
        onScrollEndDrag={(e) => {
          hasBeenSetOnScroll.current = true;
          props.onScrollEndDrag?.(e);
        }}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 100,
        }}
      />
    </View>
  );
};

export default SectionListDeliveroo;
