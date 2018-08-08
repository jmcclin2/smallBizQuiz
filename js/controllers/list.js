(function(){
 
    angular
        .module("smallBizQuiz")
        .controller("listCtrl", ListController);
 
        ListController.$inject = ['quizMetrics', 'DataService'];

    function ListController(quizMetrics, DataService){

        var vm = this;  // View Model

        vm.quizMetrics = quizMetrics;
        vm.dataService = DataService;
        vm.data = DataService.turtlesData;
        vm.activeTurtle = {};   // Used in the view to hold the data of currently active turtle
        vm.search = "";         // Search property for ng-model
        
        vm.changeActiveTurtle = changeActiveTurtle;
    
        function changeActiveTurtle(index) {
            vm.activeTurtle = index;
        }

        vm.activateQuiz = activateQuiz;
 
        function activateQuiz() {
            quizMetrics.changeState("quiz", true);
        }
    }
        
})();