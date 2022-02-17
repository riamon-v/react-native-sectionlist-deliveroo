import React, { RefObject } from 'react';
import {
  findNodeHandle,
  FlatList,
  Pressable,
  SectionList,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Indicator from './Indicator';

interface SectionHeaderStylingProps {
  colors?: {
    active: string;
    inactive: string;
  };
  headerContainerStyle?: StyleProp<ViewStyle>;
  headerItemStyle?: StyleProp<TextStyle>;
  indicatorContainerStyle?: StyleProp<ViewStyle>;
}

interface SectionHeaderProps extends SectionHeaderStylingProps {
  sectionTitles: string[];
  sectionListRef: RefObject<SectionList<any, { title: string; key: string; data: any[] }>>;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  setHasBeenSetOnScroll: (v: boolean) => void;
}

const ItemHeader = React.forwardRef<
  View,
  {
    label: string;
    onPress: () => void;
    active: boolean;
    colors?: any;
    headerItemStyle?: StyleProp<TextStyle>;
  }
>((props, ref) => {
  return (
    <Pressable ref={ref} onPress={props.onPress}>
      <Text
        style={[
          styles.defaultItemStyle,
          {
            color: props.active ? props.colors?.active ?? 'white' : props.colors?.inactive ?? 'black',
          },
          props.headerItemStyle,
        ]}
      >
        {props.label}
      </Text>
    </Pressable>
  );
});

const SectionHeader: React.FC<SectionHeaderProps> = (props) => {
  const { sectionTitles, sectionListRef, activeIndex, setActiveIndex, setHasBeenSetOnScroll } = props;
  const [measures, setMeasures] = React.useState<{ x: number; width: number }[]>([]);
  const containerRef = React.useRef<FlatList<any>>(null);
  const indicatorPos = useSharedValue({ width: 0, x: 0 });
  const refs = React.useMemo(() => sectionTitles.map(() => React.createRef<View>()), []);

  React.useEffect(() => {
    containerRef?.current?.scrollToIndex({
      index: activeIndex,
      animated: true,
      viewOffset: 0,
      viewPosition: 0.5,
    });
    if (!!measures[activeIndex]) indicatorPos.value = measures[activeIndex];
  }, [activeIndex]);

  React.useEffect(() => {
    if (!!measures[0] && indicatorPos.value.x === 0 && indicatorPos.value.width === 0) {
      indicatorPos.value = { width: measures[0].width, x: measures[0].x };
    }
  }, [measures]);

  React.useEffect(() => {
    const ms: { x: number; width: number }[] = [];

    if (!!containerRef.current) {
      refs.forEach((r: RefObject<View>, index) => {
        r.current?.measureLayout(
          findNodeHandle(containerRef.current),
          (x: number, y: number, width: number, height: number) => {
            ms.push({ x, width });
            if (ms.length === sectionTitles.length) {
              setMeasures(ms);
            }
          },
          () => null,
        );
      });
    }
  }, [containerRef.current]);

  return (
    <FlatList
      horizontal
      data={sectionTitles}
      ref={containerRef}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[props.headerContainerStyle]}
      keyExtractor={(item) => item}
      ListHeaderComponent={
        <Indicator indicatorPos={indicatorPos} indicatorContainerStyle={props.indicatorContainerStyle} />
      }
      renderItem={({ item, index }) => (
        <ItemHeader
          label={item}
          ref={refs[index]}
          onPress={() => {
            setHasBeenSetOnScroll(false);
            setActiveIndex(index);
            sectionListRef?.current?.scrollToLocation({
              animated: true,
              sectionIndex: index,
              itemIndex: 0,
            });
          }}
          active={activeIndex === index}
          {...props}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  defaultItemStyle: {
    marginHorizontal: 12,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export { SectionHeader, SectionHeaderStylingProps };
