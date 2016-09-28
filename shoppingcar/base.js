  
var fruits=[
{
     id:'fruit1',
     name:"苹果",
     price:"10",
     num:1,
     buy:false
},
{
     id:'fruit2',
     name:"香蕉",
     price:"1",
     num:1,
     buy:false
},
{
     id:'fruit3',
     name:"橘子",
     price:"20",
     num:1,
     buy:false
}
];

angular.module('cartApp',[])
.controller('cartCtrl', function($scope){
  //取出水果
  $scope.fruits = fruits;

  //点击-事件
    
    
    $scope.overdue = function(id){
    angular.forEach($scope.fruits, function(value, key){
      if(value.id==id&&value.num>1){
        $scope.fruits[key].num--;
      }
    });
  }

  $scope.add = function(id){
    angular.forEach($scope.fruits, function(value, key){
      if(value.id==id&&value.num<10){
        $scope.fruits[key].num++;
      }
    });
    // $scope.value.num = $scope.value.num+1;
  }

  // $scope.isBuy = function(buy, $event){
  //  console.log(buy, $event)
  // }

  $scope.totalPrice = function(){
    $scope.total = 0;
    angular.forEach($scope.fruits, function(value, key){
      if(value.buy){
        $scope.total = $scope.total + value.price*value.num;
      }
    });
    // console.log($scope.total)
    return $scope.total;
  }
});
var objs =[{a:1},{a:2}];
angular.forEach(objs, function(data,index,array){
//data等价于array[index]
console.log(data.a+'='+array[index].a);
});
// objs：需要遍历的集合
// data:遍历时当前的数据
// index:遍历时当前索引
// array:需要遍历的集合，每次遍历时都会把objs原样的传一次

