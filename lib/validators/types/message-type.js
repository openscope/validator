const t = require('tcomb');

const MessageLevelEnum = t.enums.of(['ERROR', 'WARNING', 'MessageLevelEnum']);

const MessageType = t.struct({
    message: t.String,
    level: MessageLevelEnum
}, 'MessageType');

const MessageListType = t.list(MessageType, 'MessageListType');

module.exports = {
    MessageLevelEnum: MessageLevelEnum,
    MessageType: MessageType,
    MessageListType: MessageListType
};
