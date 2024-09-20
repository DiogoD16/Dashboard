==========DASHBOARD==========
-O projeto da Dashboard que se encontra dentro da pasta proj contém os seguintes files: index.js, test.html,dbconfig.json. Dentro da pasta public existem outros files como config.json,pingscript.js e styles.css. Adicionei comentários no código  que ajudam a perceber melhor as funcionalidades de cada parte de código.  

==========INDEX.JS==========
-Vamos começar pelo index.js que é o file principal. Este file é responsável pela ligação ao servidor, base de dados e por importar o ficheiro html.
-Logo no inicio temos esta parte do código que se encontra abaixo que é responsável pelo import do file dbconfig.json onde serão introduzidos os dados como user, password, database,etc para se fazer a ligação à base de dados e a porta utilizada para a ligação ao servidor.

const dbconfig = require('./dbconfig.json');
const sqlConfig = dbconfig.sqlConfig;
const port = dbconfig.port;
 
-Neste file também encontramos o processo para fazer pings aos IPs e o return do resultado como "Ping Ok" e "Ping NOK" que depois será usado num script separado e o processo
de obter a data de acordo com os parâmetros que desejarmos que neste caso foram 'SELECT TOP 50 * FROM ErplnReports ORDER BY ErplnReportID DESC'.

==========DBCONFIG.JSON==========

-Como foi mencionado em cima este file json é onde os dados vão ser introduzidos para fazer a ligação à base de dados e a escolha da porta do servidor.

==========CONFIG.JSON==========
-O objetivo deste file é poderem fazer se algumas alterações simples como cor do texto, tamanho, tipo de font, espaçamentos,entre outros sem ter que ir ao próprio file .css
para se fazerem essas aletrações. Tentei escolher nomes simples e que estejam de acordo com os campos que vão ser alterados neste file de forma a facilitar alterações dos campos desejados.

==========PINGSCRIPT.JS==========
-Neste file é onde os pings são feitos aos IPs desejados.
-Primeiro temos este array que se encontra em baixo que é onde vamos adicionar ou remover os IPs do processo de Ping.Se desejarmos adicionar IPs é só colocar dentro desse array com o mesmo formato dos outros o IP desejado e para remover basta apagar.

const ipAddresses = ['127.0.0.1', '127.0.0.2', '196.81.1.2', '127.0.0.4', '127.0.0.4'];

-Dentro deste file temos a função ping que é responsável por fazer ping ao IPs, retornar o resultado e que vai ser usada noutra função que é a função pingAll que é responsável por percorrer o array dos IPs e fazer o ping de cada um, criar uma div no ficheiro html com um h2 onde vai ser mostrado o IP pingado e por baixo outro h2 com o resultado do Ping(Ping OK ou Ping NOK) e de acordo com o resultado troca a cor do background da div para verde se for Ping OK e vermelho se for Ping NOK. O passo de pingar um IP e passar para outro so acontecesse se tivermos obtido um resultado de ping do IP anterior. Quando todos os IPs do array forem pingados, no final as div são limpas e volta se a repetir o ping de todos os IPs de novo, depois de um Timeout de 5 segundos.

==========STYLES.CSS==========

-Este é o ficheiro onde está todo o css usado no projeto. Neste ficheiro os valores de cada campo são importados do ficheiro config.json, ou seja quaisquer alterações que sejam feitas devem ser feitas no file config.json.

==========TEST.HTML==========

-Neste ficheiro é onde está todo o HTML usado no projeto. O primeiro script que temos neste file é o import do file config.json onde estão os valores do css.
-Depois começamos com a primeira div com a class bar que é a div onde está barra do topo azul com o logo, titulo Dashboard e a data e hora.
-A próxima div com a class "container" é a div que contém outras duas divs dentro que são a "left-div" composta pela datatable e a "right-div" composta pelo ping dos IPs.
-De seguida temos uma função que esconde a div "container" durante 9 segundos que é mais ou menos o tempo que a tabela demora a ser carregada e eu fiz isto para que as duas divs "left-div" e "right-div" apareçam ao mesmo tempo em vez de aparecer primeiro a "right-div" e so depois aparecer a tabela.
-A próxima função que temos é a updateDateTime, que é a função responsável por apresentar a data e hora atual, atualizando a cada segundo.
-Mais abaixo temos uma função que é a loadData onde colocamos o url onde definimos no file index.js para recebermos os dados da datatable, importamos essa data e colocamos dentro de uma tabela criada na página com as colunas desejadas e a informação apresentada da maneira que desejamos. Neste caso so necessitávamos das colunas:CreatedAt, Action, HandlingUnit e Result.Ainda dentro desta função fiz uma alteração da apresentação dos dados da coluna CreatedAt e temos também outra funcionalidade que é para a informação da tabela ser atualizada a cada segundos, tendo pelo meio uma condição que se a linha tiver as palavras 'success' ou 'ok' é chamada uma class que muda a background color para verde, se não tiver nenhuma das anteriores e a linha ter a palavra 'message' muda para vermelho e se não tiver nenhuma das condições de cima muda para laranja.



