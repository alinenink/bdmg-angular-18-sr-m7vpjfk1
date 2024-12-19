import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [MatExpansionModule],
  template: `
  Você deverá criar um e-commerce, utilizando Angular Material e consumindo dados de APIs públicas.
  <mat-accordion>
    <mat-expansion-panel
      (opened)="panelOpenState = true"
      (closed)="panelOpenState = false"
    >
      <mat-expansion-panel-header>
        <mat-panel-title>  Para começar leia atentamente as instruções a seguir: </mat-panel-title>
      </mat-expansion-panel-header>
        <ol>
          <li>
            Primeiramente, faça um fork deste projeto para sua conta no GitHub.
          </li>
          <li>Veja a estrutura de pastas e utilize os arquivos da pasta app.</li>
          <li>
              Crie um serviço que consuma a <a href="https://fakestoreapi.com/">Fake Store API</a> para obter a lista de produtos e os detalhes de um produto específico.
          </li>
          <li>
              Crie um componente que exiba a lista de produtos utilizando cards. Cada card deve exibir o título, preço, descrição e imagem do produto, além de um botão "Adicionar ao Carrinho".
          </li>
          <li>Crie um serviço para gerenciar os itens no carrinho de compras.</li>
          <li>
              Implemente um serviço de gerenciamento de carrinho de compras para manter o estado do carrinho e permitir que diferentes componentes possam reagir a mudanças no estado do carrinho.
          </li>
          <li>
              Crie um componente que exiba os itens no carrinho utilizando um componente de listas. Cada item deve exibir a imagem, título e preço do produto, além de um botão para limpar o carrinho.
          </li>
          <li>
              Crie um componente para o processo de checkout. O componente deve exibir os itens do carrinho e um formulário para o usuário inserir seu nome completo, email, telefone e endereço. Ao enviar o formulário, os dados do pedido devem ser salvos e o carrinho deve ser limpo.
          </li>
          <li>
              Adicione ao processo de checkout a integração com a API do <a href="https://viacep.com.br">ViaCEP</a> para buscar o endereço com base no CEP inserido pelo usuário.
          </li>
          <li>Crie um serviço para gerenciar os pedidos.</li>
          <li>
              Crie um componente que exiba a lista de pedidos. Cada pedido deve exibir o nome do cliente, endereço e os itens do pedido.
          </li>
          <li>Persista os itens de pedidos.</li>
          <li>
            Implemente testes unitários para pelo menos um serviço e um componente criado.
          </li>
        </ol>
    </mat-expansion-panel>
  </mat-accordion>`,
  styles: [],
})
export class HelloComponent {
  public panelOpenState: boolean = false;
}
