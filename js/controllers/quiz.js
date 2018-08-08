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
        vm.error = false;
        vm.finalize = false;

        var numQuestionsAnswered = 0;

        vm.setActiveQuestion = setActiveQuestion;

        function setActiveQuestion(index) {
            
            if (index === undefined) {
            
                var breakOut = false;
                var quizLength = DataService.quizQuestions.length - 1;
            
                while (!breakOut) {
                    
                    vm.activeQuestion = vm.activeQuestion < quizLength?++vm.activeQuestion:0;

                    if (vm.activeQuestion === 0) {
                        vm.error = true;
                    }

                    if (DataService.quizQuestions[vm.activeQuestion].selected === null) {
                        breakOut = true;
                    }
                }
            } else {
                vm.activeQuestion = index;
            }
        }
 
        vm.questionAnswered = questionAnswered;

        function questionAnswered() {
 
            // set quizLength variable to keep code clean

            var quizLength = DataService.quizQuestions.length;

            numQuestionsAnswered = 0;

                //For loop added to loop through all questions and recount questions
                //that have been answered. This avoids infinite loops.
            for (var x = 0; x < quizLength; x++) {
                if (DataService.quizQuestions[vm.activeQuestion].selected !== null) {
                    
					numQuestionsAnswered++;
	                
					if (numQuestionsAnswered >= quizLength) {
	                    
	                        // final check to ensure all questions are actuall answered
	                    for (var i = 0; i < quizLength; i++) {
	 
	                        /*
	                        * if find a question that is not answered, set it to 
	                        * active question then return from this function 
	                             * to ensure finalize flag is not set
	                        */
	                        if (DataService.quizQuestions[i].selected === null) {
	                            setActiveQuestion(i);
	                            return;
	                        }
	                    }
	                 
	                    // Quiz done
	                    vm.error = false;
	                    vm.finalize = true;
	                    return;
	                }
            	}
			}

            /*
             * There are still questions to answer so increment to next 
             * unanswered question using the setActiveQuestion method
             */
            vm.setActiveQuestion(); 
        }

        vm.selectAnswer = selectAnswer;

        function selectAnswer(index) {
            DataService.quizQuestions[vm.activeQuestion].selected = index;
        }

        vm.finalizeAnswers = finalizeAnswers;

        function finalizeAnswers() {
            
            debugger;

            vm.finalize = false;
            numQuestionsAnswered = 0;
            vm.activeQuestion = 0;
            quizMetrics.markQuiz();
            quizMetrics.changeState("quiz", false);
            quizMetrics.changeState("results", true);            
        }
    }
 
})();