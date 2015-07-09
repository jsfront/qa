(function (global) {
    global.Condition = Condition;

    function Condition() {
        var instance = this,
            areEqual = arguments[0] && arguments[0].areEqual;

        instance.table = [];
        instance.areEqual = areEqual;
        return this;
    }

    Condition.prototype = {
        constructor: Condition,

        add: addCondition,
        find: findCondition,

        remove: removeCondition,
        clear: clearCondition
    };

    function addCondition() {
        var instance = this,
            table = instance.table,
            items = [].slice.call(arguments, 0),
            conditions = [].slice.call(arguments, 0, -1),
            result = arguments[arguments.length - 1],

            matchIndex = findIndex.call(instance, conditions);

        if (matchIndex === -1) {
            table.push(items);
            return this;
        }

        var row = table[matchIndex];
        row[row.length - 1] = result;
        return this;
    }

    function findCondition() {
        var instance = this,
            table = instance.table,
            conditions = [].slice.call(arguments, 0),

            matchIndex = findIndex.call(instance, conditions);

        if (matchIndex === -1) {
            return null;
        }

        var row = table[matchIndex];
        return row[row.length - 1];
    }

    function removeCondition() {
        var instance = this,
            table = instance.table,
            conditions = [].slice.call(arguments, 0),

            matchIndex = findIndex.call(instance, conditions);

        if (matchIndex === -1) {
            return this;
        }

        var newTable = [];
        for (var i = 0; i < table.length; i++) {
            if (i === matchIndex) {
                continue;
            }

            newTable.push(table[i]);
        }

        instance.table = newTable;
        return this;
    }

    function clearCondition() {
        var instance = this;

        instance.table = [];
        return this;
    }

    //-- private

    function findIndex(conditions) {
        var instance = this,
            table = instance.table,
            areEqual = instance.areEqual || function (u, v) {
                return u === v;
            };

        for (var i = 0; i < table.length; i++) {
            if (table[i].length !== conditions.length + 1) {
                continue;
            }

            var j;
            for (j = 0; j < conditions.length; j++) {
                if (!areEqual(table[i][j], conditions[j])) {
                    break;
                }
            }

            if (j != conditions.length) {
                continue;
            }

            return i;
        }

        return -1;
    }
} (window));