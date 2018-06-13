const t = require('tcomb');

const MinMaxValueType = t.struct({
    minValue: t.Number,
    maxValue: t.Number
}, 'MinMaxValueType');

const SingleNumberValueType = t.struct({
    value: t.Number
}, 'SingleNumberValueType');

const NumberOrTupleNumber = t.union([
    t.Number,
    t.tuple([t.Number, t.Number])
], 'NumberOrTupleNumber');

NumberOrTupleNumber.dispatch = (value) => !t.Array.is(value) ? t.Number : t.tuple([t.Number, t.Number]);

const StringOrNumberType = t.union([t.String, t.Number], 'StringOrNumberType');
const StringOrNumberTypeList = t.list(StringOrNumberType);
const TwoElementStringOrNumberTypeList = t.refinement(StringOrNumberTypeList, (v) => v.length === 2);
const ThreeElementStringOrNumberTypeList = t.refinement(StringOrNumberTypeList, (v) => v.length === 3);

module.exports = {
    MinMaxValueType: MinMaxValueType,
    SingleNumberValueType: SingleNumberValueType,
    NumberOrTupleNumber: NumberOrTupleNumber,
    TwoElementStringOrNumberTypeList: TwoElementStringOrNumberTypeList,
    ThreeElementStringOrNumberTypeList: ThreeElementStringOrNumberTypeList
};
