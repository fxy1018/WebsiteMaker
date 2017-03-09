(function (){
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir() {
        function linkFunc(scope, element, attribute) {
            var startIndex = -1;
            var endIndex = -1;
            element.sortable({
                axis: 'y',
                start: function(event, ui){
                    startIndex = ui.item.index();
                    console.log(ui.item.index());
                },
                stop: function (event, ui) {
                    endIndex = ui.item.index();
                    console.log(ui.item.index());
                },

            });
        }
        return{
            // template: 'Hello'
            // templateURL : 'test.html'
            // template: function() {return '<h1>hello</h1>'}
            link: linkFunc
        };
    }

})();