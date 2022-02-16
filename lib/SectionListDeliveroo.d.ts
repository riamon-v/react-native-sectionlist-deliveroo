import React from "react";
import { SectionListProps, StyleProp, ViewStyle } from "react-native";
import { SectionHeaderStylingProps } from "./SectionHeaderDeliveroo";
interface SectionListDeliverooProps extends SectionHeaderStylingProps, SectionListProps<any, any> {
    containerStyle?: StyleProp<ViewStyle>;
}
declare const SectionListDeliveroo: React.FC<SectionListDeliverooProps>;
export default SectionListDeliveroo;
