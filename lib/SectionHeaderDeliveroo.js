import React from "react";
import { findNodeHandle, FlatList, Pressable, StyleSheet, Text, } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Indicator from "./Indicator";
const ItemHeader = React.forwardRef((props, ref) => {
    return (<Pressable ref={ref} onPress={props.onPress}>
      <Text style={[
            styles.defaultItemStyle,
            {
                color: props.active
                    ? props.colors?.active ?? "white"
                    : props.colors?.inactive ?? "black",
            },
            props.headerItemStyle,
        ]}>
        {props.label}
      </Text>
    </Pressable>);
});
const SectionHeader = (props) => {
    const { sectionTitles, sectionListRef, activeIndex, setActiveIndex, setHasBeenSetOnScroll, } = props;
    const [measures, setMeasures] = React.useState([]);
    const containerRef = React.useRef(null);
    const indicatorPos = useSharedValue({ width: 0, x: 0 });
    const refs = React.useMemo(() => sectionTitles.map(() => React.createRef()), []);
    React.useEffect(() => {
        containerRef?.current?.scrollToIndex({
            index: activeIndex,
            animated: true,
            viewOffset: 0,
            viewPosition: 0.5,
        });
        if (!!measures[activeIndex])
            indicatorPos.value = measures[activeIndex];
    }, [activeIndex]);
    React.useEffect(() => {
        if (!!measures[0] &&
            indicatorPos.value.x === 0 &&
            indicatorPos.value.width === 0) {
            indicatorPos.value = { width: measures[0].width, x: measures[0].x };
        }
    }, [measures]);
    React.useEffect(() => {
        let ms = [];
        refs.forEach((r, index) => {
            r.current?.measureLayout(findNodeHandle(containerRef.current), (x, y, width, height) => {
                ms.push({ x, width });
                if (ms.length === sectionTitles.length) {
                    setMeasures(ms);
                }
            }, () => null);
        });
    }, []);
    return (<FlatList horizontal data={sectionTitles} ref={containerRef} showsHorizontalScrollIndicator={false} contentContainerStyle={[props.headerContainerStyle]} keyExtractor={(item) => item} ListHeaderComponent={<Indicator indicatorPos={indicatorPos} indicatorContainerStyle={props.indicatorContainerStyle}/>} renderItem={({ item, index }) => (<ItemHeader label={item} ref={refs[index]} onPress={() => {
                setHasBeenSetOnScroll(false);
                setActiveIndex(index);
                sectionListRef?.current?.scrollToLocation({
                    animated: true,
                    sectionIndex: index,
                    itemIndex: 0,
                });
            }} active={activeIndex === index} {...props}/>)}/>);
};
const styles = StyleSheet.create({
    defaultItemStyle: {
        marginHorizontal: 12,
        fontWeight: "bold",
        fontSize: 15,
    },
});
export { SectionHeader };
