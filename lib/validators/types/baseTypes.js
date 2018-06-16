const t = require('tcomb');

const EmptyStringType = t.refinement(t.String, (v) => v.length === 0);
const IcaoType = t.refinement(t.String, (v) => v.length === 4 || v.length === 0);

const MinMaxValueType = t.struct({
    minValue: t.Number,
    maxValue: t.Number
}, 'MinMaxValueType');

const SingleNumberValueType = t.struct({
    value: t.Number
}, 'SingleNumberValueType');

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
const StringOrNumberTypeList = t.list(StringOrNumberType);
const TwoElementStringOrNumberTypeList = t.refinement(StringOrNumberTypeList, (v) => v.length === 2);
const ThreeElementStringOrNumberTypeList = t.refinement(StringOrNumberTypeList, (v) => v.length === 3);

module.exports = {
    IcaoType: IcaoType,
    MinMaxValueType: MinMaxValueType,
    SingleNumberValueType: SingleNumberValueType,
    NumberOrTupleNumberType: NumberOrTupleNumberType,
    NumberTupleOrEmptyStringType: NumberTupleOrEmptyStringType,
    TwoElementStringOrNumberTypeList: TwoElementStringOrNumberTypeList,
    ThreeElementStringOrNumberTypeList: ThreeElementStringOrNumberTypeList
};
