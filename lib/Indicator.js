import React from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, withTiming, } from "react-native-reanimated";
const Indicator = ({ indicatorPos, indicatorContainerStyle, }) => {
    const style = useAnimatedStyle(() => {
        const { x, width } = indicatorPos.value;
        return {
            width: withTiming(width),
            transform: [{ translateX: withTiming(x) }],
        };
    });
    return (<Animated.View style={[
            styles.indicatorStyle,
            indicatorContainerStyle
                ? indicatorContainerStyle
                : styles.defaultIndicatorStyle,
            style,
        ]}/>);
};
const styles = StyleSheet.create({
    defaultIndicatorStyle: {
        backgroundColor: "red",
        borderRadius: 50,
    },
    indicatorStyle: {
        position: "absolute",
        top: 0,
        bottom: 0,
    },
    defaultItemStyle: {
        marginHorizontal: 12,
        fontWeight: "bold",
        fontSize: 15,
    },
});
export default Indicator;
