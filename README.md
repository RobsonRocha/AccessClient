## AccessClient (M�dulo de solicita��o)

## Motiva��o

Projeto criado para trabalhar em conjunto com o projeto [AuthorizationServer] (https://github.com/RobsonRocha/AuthorizationServer) com o intuito de mostrar a intera��o de AngularJS com REST.

O sistema chama-se M�dulo de solicita��o, pois ele visa solicitar aos administradores perfis de acesso.

A ideia � que existe um sistema hipot�tico que tem arquivos e somente quem tem os perfis adequados pode acess�-los. E para se ter esses perfis, o usu�rio dever� solicit�-los.
Assim, o adminstrador receber� na sua tela principal as solicita��es, tanto de ades�o quanto de desligamento do usu�rio ao perfil e agir� conforme lhe convier.
	
O usu�rio comum somente tem acesso aos seus pr�prios perfis e aos pedidos de ades�o ou desligamento.

Como a ideia foi s� mostrar o funcionamento das tecnologias, n�o foi criado nenhum banco de dados, ficando tudo em mem�ria.
 
## Linguagem

A linguagem utilizada � JavaScript atrav�s framework [AngularJS](https://angularjs.org/) e tamb�m � usado [Bootstrap](http://getbootstrap.com/) para cria��o das telas.

## Execu��o

O container utilizado para execu��o do projeto foi o [Tomcat 8.0](http://tomcat.apache.org/download-80.cgi) com a configura��o padr�o.

