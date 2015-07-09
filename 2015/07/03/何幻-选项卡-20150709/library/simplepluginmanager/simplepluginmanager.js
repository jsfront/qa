//version 1.2.0
//base on condtion.js library.

(function ($, global) {
    $.extend({
        pluginManager: {
            extend: extend,
            filter: filter,

            remove: remove
        }
    });

    //-- public interface

    function extend(pluginName, operationSet) {
        addFunctionSetToCondition(pluginName, operationSet, 'operation');
        createPlugin(pluginName);

        return this;
    }

    function filter(pluginName, filterSet) {
        addFunctionSetToCondition(pluginName, filterSet, 'filter');

        return this;
    }

    function remove(pluginName) {
        condition.remove(pluginName);
        $.prototype[pluginName] = null;

        return this;
    }

    //-- private tools

    var condition = new global.Condition();

    function addFunctionSetToCondition(pluginName, functionSet, functionType) {
        for (var functionName in functionSet) {
            if (!functionSet.hasOwnProperty(functionName)) {
                continue;
            }

            condition.add(pluginName, functionName, functionType, functionSet[functionName]);
        }
    }

    function createPlugin(pluginName) {
        var plugin = {};

        plugin[pluginName] = function (functionName) {
            var $selector = this,
                operation = condition.find(pluginName, functionName, 'operation'),
                filter = condition.find(pluginName, functionName, 'filter'),
                currentArguments = [].slice.call(arguments, 1);

            if (filter == null) {
                return operation.apply($selector, currentArguments);
            }

            var filteredArguments = filter.apply($selector, currentArguments);
            return operation.apply($selector, filteredArguments);
        }

        $.prototype.extend(plugin);
    }

}(jQuery, window));