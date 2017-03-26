var app = angular.module('todoApp',["ngStorage"]);

app.controller('TodoCtrl', function($scope,$localStorage) {
  $scope.title = "To-Do List with AngularJS";

  if($localStorage.tasks) { // check if local storage exist
    $scope.tasks = $localStorage.tasks;
  } else {
    $scope.tasks = [];    
  }

  $scope.todoText = "";

  $scope.addTask = function() {
    if(event.keyCode == 13 && $scope.todoText){
        $scope.tasks.push({text:$scope.todoText, done:false});
        $scope.todoText = '';
        $localStorage.tasks = $scope.tasks;
    }
  }

  $scope.deleteTask = function() {
    $scope.tasks.splice(this.$index, 1);
  }

  $scope.doneTask = function() {
    if($scope.tasks[this.$index].done) {
      $scope.tasks[this.$index].done = false;        
    } else {
      $scope.tasks[this.$index].done = true;
    }
  }

  $scope.clearTask = function() {
    $scope.tasks = [];
    $localStorage.tasks = $scope.tasks;
  }

  $scope.stripText = function() {
    if($scope.tasks[this.$index].done) {
      return {
        'text-decoration': 'line-through'
      }
    } else {
      return {
        'text-decoration': 'none'
      }
    }
  }

  $scope.remainingTask = function() {
    var count = 0;
    angular.forEach($scope.tasks, function(task) {
      count += task.done ? 0 : 1;
    });
    return count;
  };

})

