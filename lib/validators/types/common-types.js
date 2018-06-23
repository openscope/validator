const t = require('tcomb');

const EmptyStringType = t.refinement(t.String, (v) => v.length === 0);
const IcaoType = t.refinement(t.String, (v) => v.length === 4 || v.length === 0);

const NumberOrTupleNumberType = t.union([
    t.Number,
    t.tuple([t.Number, t.Number])
], 'NumberOrTupleNumberType');

NumberOrTupleNumberType.dispatch = (value) => !t.Array.is(value) ? t.Number : t.tuple([t.Number, t.Number]);

const NumberTupleOrEmptyStringType = t.union([
    EmptyStringType,
    NumberOrTupleNumberType
], 'NumberTupleOrEmptyStringType');

NumberTupleOrEmptyStringType.dispatch = (value) => value.length === 0 ? EmptyStringType : NumberOrTupleNumberType;

const StringOrNumberType = t.union([t.String, t.Number], 'StringOrNumberType');
StringOrNumberType.dispatch = function dispatch(v) {
    if (!t.String.is(v) && !t.Number.is(v)) {
        return false;
    }

    let type = t.String;

    if (t.Number.is(v)) {
        type = t.Number;
    }

    return type;
}

const StringOrNumberTypeList = t.list(StringOrNumberType);
const TwoElementStringOrNumberTypeList = t.refinement(StringOrNumberTypeList, (v) => v.length === 2);
const ThreeElementStringOrNumberTypeList = t.refinement(StringOrNumberTypeList, (v) => v.length === 3);

module.exports = {
    IcaoType: IcaoType,
    NumberOrTupleNumberType: NumberOrTupleNumberType,
    NumberTupleOrEmptyStringType: NumberTupleOrEmptyStringType,
    StringOrNumberType: StringOrNumberType,
    TwoElementStringOrNumberTypeList: TwoElementStringOrNumberTypeList,
    ThreeElementStringOrNumberTypeList: ThreeElementStringOrNumberTypeList
};
