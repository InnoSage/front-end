import { AttributeType } from "@/function/table/type";
import FilterText from "@/component/view/control/filter/filter-text";
import FilterNumber from "@/component/view/control/filter/filter-number";
import FilterDate from "@/component/view/control/filter/filter-date";
import FilterCurrency from "@/component/view/control/filter/filter-currency";
import FilterSelect from "@/component/view/control/filter/filter-select";
import FilterMultiselect from "@/component/view/control/filter/filter-multiselect";
import FilterCheckbox from "@/component/view/control/filter/filter-checkbox";
import FilterUser from "@/component/view/control/filter/filter-user";
import FilterCompany from "@/component/view/control/filter/filter-company";

type FullyAttributeType = AttributeType | "COMPANY";

const index: Record<FullyAttributeType, any> =  {
    TEXT: FilterText,
    NUMBER: FilterNumber,
    DATE: FilterDate,
    CURRENCY: FilterCurrency,
    SELECT: FilterSelect,
    MULTISELECT: FilterMultiselect,
    CHECKBOX: FilterCheckbox,
    USER: FilterUser,
    COMPANY: FilterCompany
};

export default index;
