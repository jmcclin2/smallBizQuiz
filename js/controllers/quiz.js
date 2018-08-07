(function(){
 
    angular
        .module("smallBizQuiz")
        .controller("quizCtrl", QuizController);

        QuizController.$inject = ['quizMetrics', 'DataService'];
 
    function QuizController(quizMetrics, DataService){
 
        var vm = this;

        vm.quizMetrics = quizMetrics;
        vm.dataService = DataService;
        vm.activeQuestion = 0;

        var numQuestionsAnswered = 0;

        vm.setActiveQuestion = setActiveQuestion;

        function setActiveQuestion() {
            var breakOut = false;
            var quizLength = DataService.quizQuestions.length - 1;
        
            while (!breakOut) {
                vm.activeQuestion = vm.activeQuestion < quizLength?++vm.activeQuestion:0;
                if (DataService.quizQuestions[vm.activeQuestion].selected === null) {
                    breakOut = true;
                }
            }
        }
 
        vm.questionAnswered = questionAnswered;

        function questionAnswered() {
 
            var quizLength = DataService.quizQuestions.length;

            if (DataService.quizQuestions[vm.activeQuestion].selected !== null) {
                numQuestionsAnswered++;

                if (numQuestionsAnswered >= quizLength) {
                    //Finalise the quiz
                }
            }
            vm.setActiveQuestion(); 
        }
    }
 
})();