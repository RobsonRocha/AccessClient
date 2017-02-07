## AccessClient (Módulo de solicitação)

## Motivação

Projeto criado para trabalhar em conjunto com o projeto [AuthorizationServer] (https://github.com/RobsonRocha/AuthorizationServer) com o intuito de mostrar a interação de AngularJS com REST.

O sistema chama-se Módulo de solicitação, pois ele visa solicitar aos administradores perfis de acesso.

A ideia é que existe um sistema hipotético que tem arquivos e somente quem tem os perfis adequados pode acessá-los. E para se ter esses perfis, o usuário deverá solicitá-los.
Assim, o adminstrador receberá na sua tela principal as solicitações, tanto de adesão quanto de desligamento do usuário ao perfil e agirá conforme lhe convier.
	
O usuário comum somente tem acesso aos seus próprios perfis e aos pedidos de adesão ou desligamento.

Como a ideia foi só mostrar o funcionamento das tecnologias, não foi criado nenhum banco de dados, ficando tudo em memória.
 
## Linguagem

A linguagem utilizada é JavaScript através framework [AngularJS](https://angularjs.org/) e também é usado [Bootstrap](http://getbootstrap.com/) para criação das telas.

## Execução

O container utilizado para execução do projeto foi o [Tomcat 8.0](http://tomcat.apache.org/download-80.cgi) com a configuração padrão.

