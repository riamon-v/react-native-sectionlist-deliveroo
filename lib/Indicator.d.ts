/// <reference types="react" />
import { StyleProp, ViewStyle } from "react-native";
import { SharedValue } from "react-native-reanimated";
interface IndicatorProps {
    indicatorPos: SharedValue<{
        width: number;
        x: number;
    }>;
    indicatorContainerStyle?: StyleProp<ViewStyle>;
}
declare const Indicator: ({ indicatorPos, indicatorContainerStyle, }: IndicatorProps) => JSX.Element;
export default Indicator;
