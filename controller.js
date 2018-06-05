var app = angular.module("MainApp", []);
app.controller("CRUDController", funcion($scope){
	
	
	$scope.Products = []; //array vacio de productos
	
	$scope.Agregar=function(){ //agrega los productos al array o tabla
		
		var Product = {
			
			Id:$scope.Products.length + 1;
			Categoria:$scope.categoria;
			Tipo:$scope.tipo;
			Marca:$scope.marca;
			Precio:$scope.precio;
			
		};
		
		$scope.Products.push(Product); //pushea el objeto seleccionado al array
		ClearModel();
		
	};
	
	//funcion para borrar
	$scope.Eliminar = function(Product){
		
		var index=$scope.Products.indexOf(Product);
		$scope.Products.splice(index,1);
		
		
	};
	
    //funcion para agregar datos a los campos
   	$scope.Seleccionar = function(Product){
		$scope.Id=Product.Id;
		$scope.Categoria=Product.Categoria;
        $scope.Tipo=Product.Tipo;
		$scope.Marca=Product.Marca;
		$scope.Precio=Product.Precio;
		
	};
	//funcion para actualizar
	 $scope.Actualizar = function(Product){
		 $.grep($scope.Products, function(e){
			 if(e.Id == $scope.Id)
			 {
				e.Categoria=$scope.Categoria;
				e.Tipo=$scope.Tipo;
				e.Marca=$scope.Marca;
				e.Precio=$scope.Precio;
			 }	 
		 });
		 
	 };
		
	function ClearModel(){
		$scope.Id=0;
		$scope.Categoria:$scope.categoria="";
        $scope.Tipo:$scope.tipo="";
		$scope.Marca:$scope.marca="";
		$scope.Precio:$scope.precio=0;
	}

});

