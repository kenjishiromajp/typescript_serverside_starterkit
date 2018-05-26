# Typescript Starter Kit

> Projeto com configurações iniciais para um projeto back-end com typescript

# Como rodar a aplicação?
- primeiro certifique que você possui o node.js instalado na sua máquina na versão acima ou igual a `7.0`
- após ter certeza que possui o node instalado, instale os pacotes de dependências com os seguintes comandos:

    ```sh
    npm install
    // ou
    yarn
    ```
- depois de instalar os pacotes use o seguinte comando para executar o arquivo `src/index.ts`
    ```sh
    yarn start
    // ou 
    npm start
    ```

# Qual a importância de cada arquivo neste projeto?

```
├── README.md               // É o arquivo responsável por gerar esta documentação!
├── build                   // É a pasta onde será gerada os arquivos compilados do typescript!
├── package.json            // É o arquivo que descreve o nosso projeto e com configurações sobre o mesmo
├── src                     // Pasta onde vamos colocar todos os nossos scripts.ts!
│   └── index.ts            // Arquivo de inicialização do projeto! (entry point)
└── tsconfig.json           // Arquivo de configuração de como typescript será compilado!
```

# Mas o que significa todas essas coisas no package.json?
`package.json` é um arquivo no formato  [JSON](https://www.devmedia.com.br/o-que-e-json/23166) que descreve algumas informações do projeto, além de ser um sumário do seu projeto, é possível instalar todas as dependências descritas no `dependencies` e `devDependencies` apenas utilizando o comando no terminal `npm install` ou `yarn`.

E as dependências instaladas ficam na pasta `node_modules`, que será criada automaticamente ao instalar as dependências.

```javascript
{
  "name": "Typescript Starter Kit",     // Nome do seu projeto
  "version": "1.0.0",                   // A versão do seu projeto
  "description": "Aqui você coloca a descrição do seu projeto",
  "main": "src/index.ts",               // Onde está o arquivo principal do projeto
  "scripts": {                          // Propriedade onde é colocado shortcut para comandos no terminal
    "start": "ts-node src/index.ts",    // comando executado ao inserir `npm start` ou `yarn start`
    "build": "tsc"                      // comando executado ao inserir `npm run build` ou `yarn build`
  },
  "author": "Kenji",                    // Autor deste código
  "license": "ISC",                     // O Tipo de licença deste código
  "dependencies": {                     // Dependências do nosso projeto serão listados aqui!
    "ts-node": "^6.0.5",                // é sempre "nome_do_pacote":"numero da versão"
    "typescript": "^2.8.3"
  }
}
```

Também possui esquemas de alias para scripts de terminais que tem acesso aos pacotes instalados na pasta `node_modules` que são descritos na propriedade `scripts`

Por exemplo neste arquivo possui um alias chamado `start` que executa o comando `ts-node src/index.ts`, que pode ser invocado digitando apenas `npm start` ou `yarn start` na pasta onde se encontra o arquivo do `package.json`, deste jeito não precisamos "decorar" os comandos do terminal uma vez já descritos no alias.

# E o que significa todas essas coisas no tsconfig.json?
`tsconfig.json` é um arquivo no formato  [JSON](https://www.devmedia.com.br/o-que-e-json/23166) que mostra algumas opções de como você deseja que o seu typescript seja compilado.
```javascript
{
    "compilerOptions": {        // Aqui serão colocados as opções de compilação
        "module": "commonjs",   // Define como serão feitos os módulos (partição dos imports) do seu código
        "target": "es6",        // Define para qual "versão" do javascript você deseja compilar
        "outDir": "build"       // Define o caminho que os arquivos compilados serão gerados
    },
    "exclude": [                // Array de pastas que devem ser ignorados na hora de compilar
        "node_modules"
    ]
}
```