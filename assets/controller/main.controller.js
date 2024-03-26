(function () {
  'use strict';

  angularjs.controller('angularjs', ['$scope', 'vtexService', function ($scope, vtexService) {

    //Seleciona o formulário do CPF
    document.getElementById('createObj').addEventListener('submit', function (event) {
      event.preventDefault()

      //Captura o valor do Campo CPF digitado pelo usuário
      var cpfVtex = document.getElementById('cpfVtex').value;

      function validarCPF(cpf) {
        // Verifica se o CPF tem 11 dígitos
        if (cpf.length !== 11) {
          return false;
        }

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cpf)) {
          return false;
        }

        // Calcula os dígitos verificadores
        var soma = 0;
        for (let i = 0; i < 9; i++) {
          soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        var digitoVerificador1 = 11 - (soma % 11);
        if (digitoVerificador1 > 9) {
          digitoVerificador1 = 0;
        }

        soma = 0;
        for (var i = 0; i < 10; i++) {
          soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        var digitoVerificador2 = 11 - (soma % 11);
        if (digitoVerificador2 > 9) {
          digitoVerificador2 = 0;
        }

        // Verifica se os dígitos verificadores estão corretos
        if (parseInt(cpf.charAt(9)) !== digitoVerificador1 || parseInt(cpf.charAt(10)) !== digitoVerificador2) {
          return false;
        }

        return true; // CPF válido
      }

      if (validarCPF(cpfVtex) == true) {
        //Faz a chamada da API externa Vtex de CPF
        vtexService.consultCPF(cpfVtex).then(function (data) {
          //Retorno success
          $scope.values_vtex = JSON.parse(data, true);

          document.getElementById('tablecpf').hidden = false; //Exibe a tabela
          document.getElementById('alertcpferror').classList.replace("d-flex", "d-none"); //Oculta o alerta caso já estivesse renderizado
          $('#cpfModal').modal('show'); //Exibe o Modal
        }).catch(function (error) {
          //Retorno error
          $scope.error = error.responseText; //Captura o valor que contém o texto do erro
          document.getElementById('alertcpferror').classList.replace("d-none", "d-flex"); //Mostra o alerta que vai exibir o erro no modal
          document.getElementById('tablecpf').hidden = true; //Oculta a tabela caso já estivesse renderizada
          $('#cpfModal').modal('show'); //Exibe o Modal
        })

      } else {
        document.getElementById('alertcpferror').textContent = "CPF Inválido";
        document.getElementById('alertcpferror').classList.replace("d-none", "d-flex");
        document.getElementById('tablecpf').hidden = true;
        $('#cpfModal').modal('show');
      }

    });

    //Função para abrir o modal do pedido
    $scope.openPedido = function (data) {
      vtexService.consultPedido(data).then(function (data) { //consulta o pedido através da API
        //Retorno Success
        $scope.pedido = data; //Captura o retorno da API de pedidos
        document.getElementById('alertpedidoerror').classList.replace("d-flex", "d-none"); //Oculta o alerta caso já estivesse renderizado
        document.getElementById('tablepedido').hidden = false; //Exibe a tabela
        $('#pedidoModal').modal('show'); //Exibe o Modal
      }).catch(function (error) {
        //Retorno error
        $scope.pedidoerror = error.responseText; //Captura o retorno da API de pedidos
        document.getElementById('alertpedidoerror').classList.replace("d-none", "d-flex"); //Mostra o alerta que vai exibir o erro no modal
        document.getElementById('tablepedido').hidden = true; //Oculta a tabela caso já estivesse renderizada
        $('#pedidoModal').modal('show'); //Exibe o Modal
      })
    }

  }]);

})();