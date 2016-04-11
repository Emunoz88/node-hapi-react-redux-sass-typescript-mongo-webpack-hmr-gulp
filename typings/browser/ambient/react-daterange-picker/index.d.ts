// Generated by typings
// Source: ../Code/typings/react-daterange-picker/react-daterange-picker.d.ts
declare module __ReactDateRangePicker {

    export interface IDateRangerPickerProps {

        bemBlock?: string;
        bemNamespace?: string;
        dateStates?: any[];// an array of date ranges and their states
        defaultState?: string;
        disableNavigation?: boolean;
        firstOfWeek?: number;
        helpMessage?: string;
        initialDate?: Date;
        initialFromValue?: boolean;
        initialMonth?: number; // Overrides values derived from initialDate/initialRange
        initialRange?: any;
        initialYear?: number; // Overrides values derived from initialDate/initialRange
        maximumDate?: Date;
        minimumDate?: Date;
        numberOfCalendars?: number;
        onHighlightDate?: (() => void);
        onHighlightRange?: (() => void);
        onSelect?: ((range: any, states: any) => void);
        onSelectStart?: (() => void);
        paginationArrowComponent?: (() => void);
        selectedLabel?: string;
        selectionType?: string;
        singleDateRange?: boolean;
        showLegend?: boolean;
        stateDefinitions?: IStateDefinitions;
        value?: any;
    }

    export interface IStateDefinitions {
        color?: string;
        selectable?: boolean;
        label?: string;
    }

    export class DateRangePicker extends React.Component<IDateRangerPickerProps, {}>{ }

}

declare module "react-daterange-picker" {
    export = __ReactDateRangePicker;
}