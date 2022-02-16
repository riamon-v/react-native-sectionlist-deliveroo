import React, { RefObject } from "react";
import { SectionList, StyleProp, TextStyle, ViewStyle } from "react-native";
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
    sectionTitles: Array<string>;
    sectionListRef: RefObject<SectionList<any, {
        title: string;
        key: string;
        data: any[];
    }>>;
    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    setHasBeenSetOnScroll: (v: boolean) => void;
}
declare const SectionHeader: React.FC<SectionHeaderProps>;
export { SectionHeader, SectionHeaderStylingProps };
