import React from "react";
import { SectionList, View, } from "react-native";
import { SectionHeader, } from "./SectionHeaderDeliveroo";
const SectionListDeliveroo = (props) => {
    const sectionListRef = React.useRef(null);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const hasBeenSetOnScroll = React.useRef(false);
    const onCheckViewableItems = ({ viewableItems, }) => {
        const { section: { key }, } = viewableItems[0];
        const actvI = props.sections.findIndex((item) => item.key === key) - 1;
        if (hasBeenSetOnScroll.current === true && activeIndex !== actvI) {
            setActiveIndex(actvI < 0 ? 0 : actvI);
        }
    };
    const setHadBeenSetOnScroll = React.useCallback((v) => {
        hasBeenSetOnScroll.current = v;
    }, []);
    return (<View style={props.containerStyle}>
      <SectionHeader sectionTitles={props.sections.map(({ title }) => title)} sectionListRef={sectionListRef} activeIndex={activeIndex} setActiveIndex={setActiveIndex} setHasBeenSetOnScroll={setHadBeenSetOnScroll} {...props}/>
      <SectionList ref={sectionListRef} {...props} onViewableItemsChanged={onCheckViewableItems} onScrollEndDrag={(e) => {
            hasBeenSetOnScroll.current = true;
            props.onScrollEndDrag?.(e);
        }} viewabilityConfig={{
            viewAreaCoveragePercentThreshold: 100,
        }}/>
    </View>);
};
export default SectionListDeliveroo;
