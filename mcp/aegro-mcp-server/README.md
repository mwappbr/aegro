# Aegro MCP Server

Um servidor Model Context Protocol (MCP) que fornece acesso à API de Gerenciamento Agrícola da Aegro. Este servidor permite que assistentes de IA interajam com dados de gestão agrícola, incluindo safras, talhões, patrimônios, registros financeiros e muito mais.

## Funcionalidades

Este servidor MCP fornece mais de 60 ferramentas cobrindo todos os endpoints da API Aegro:

### Gestão da Propriedade
- **Propriedade**: Obter informações da propriedade (fazenda) associada à chave de API
- **Áreas (Talhões)**: Listar e filtrar áreas produtivas da fazenda
- **Safras**: Gerenciar safras
- **Áreas de Safra**: Acompanhar áreas dentro das safras (intersecção entre talhão e safra)

### Operações Agrícolas
- **Atividades**: Acompanhar e filtrar atividades agrícolas, seus planejamentos e realizações
- **Registros de Colheita**: Registrar e consultar dados de colheita
- **Descontos do Registro de Colheita**: Consultar descontos aplicáveis aos registros de colheita
- **Registros Climáticos**: Acompanhar condições meteorológicas

### Patrimônios e Equipamentos
- **Patrimônios**: Gerenciar máquinas, implementos, veículos, pivôs, silos, benfeitorias
- **Manutenções**: Acompanhar registros de manutenção dos patrimônios
- **Abastecimentos**: Registrar consumo de combustível

### Estoque
- **Locais de Estoque**: Depósitos, armazéns, silos, tanques
- **Itens de Estoque**: Níveis atuais de inventário
- **Movimentações de Estoque**: Acompanhar entradas, saídas e transferências

### Gestão Financeira
- **Contas Bancárias**: Gerenciar contas bancárias e fluxo de caixa
- **Parcelas**: Gerenciar parcelas (installments) de contas financeiras
- **Categorias Financeiras**: Classificar e organizar transações financeiras
- **Ordens de Compra**: Acompanhar pedidos de compra (Purchase Orders)
- **Rateio**: Operações de rateio de custos

### Dados Mestres
- **Elementos**: Sementes, fertilizantes, defensivos, serviços, itens, pragas
- **Empresas**: Fornecedores e clientes cadastrados na fazenda
- **Tags**: Marcadores para categorizar recursos diversos
- **Catálogos**: Catálogos públicos de elementos e seus componentes

## Instalação

```bash
# Clone ou baixe o servidor
cd aegro-mcp-server

# Instale as dependências
npm install

# Compile o projeto
npm run build
```

## Configuração

O servidor requer uma chave de API da Aegro para autenticar as requisições. A chave de API deve ser definida como variável de ambiente:

```bash
export AEGRO_API_KEY=sua-chave-de-api-aqui
```

### Obtendo uma Chave de API

As chaves de API podem ser solicitadas pelo proprietário da fazenda enviando um e-mail para `token@aegro.com.br` com:
- Nome do produtor
- Nome da fazenda
- Nome do sistema/parceiro que usará o token
- Permissões necessárias
- Data de expiração

Nota: Apenas solicitações do e-mail do proprietário da conta Aegro são aceitas.

## Uso com Claude Desktop

Adicione o servidor ao seu arquivo de configuração do Claude Desktop (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "aegro": {
      "command": "node",
      "args": ["/caminho/para/aegro-mcp-server/dist/index.js"],
      "env": {
        "AEGRO_API_KEY": "sua-chave-de-api-aqui"
      }
    }
  }
}
```

## Uso com Claude Code

Adicione às configurações MCP do Claude Code:

```json
{
  "mcpServers": {
    "aegro": {
      "command": "node",
      "args": ["/caminho/para/aegro-mcp-server/dist/index.js"],
      "env": {
        "AEGRO_API_KEY": "sua-chave-de-api-aqui"
      }
    }
  }
}
```

## Ferramentas Disponíveis

### Propriedade
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_farm` | Obter informações da propriedade (fazenda) |

### Elementos
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_element` | Obter um elemento pela chave |
| `aegro_filter_elements` | Filtrar elementos |

### Empresas
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_company` | Buscar empresa/fornecedor por ID |
| `aegro_filter_companies` | Filtrar empresas/fornecedores |
| `aegro_create_company` | Cadastrar empresa/fornecedor |

### Áreas (Talhões)
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_glebe` | Obter uma área pela chave |
| `aegro_filter_glebes` | Filtrar áreas da fazenda |

### Safras
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_crop` | Buscar uma safra |
| `aegro_filter_crops` | Filtrar safras |

### Áreas de Safra
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_crop_glebe` | Obter uma área de safra pela chave única |
| `aegro_filter_crop_glebes` | Filtrar áreas de uma safra específica |

### Patrimônios
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_asset` | Buscar patrimônio por chave |
| `aegro_filter_assets` | Buscar patrimônios por filtro |
| `aegro_create_machine` | Criar uma nova máquina |
| `aegro_create_garner` | Criar um novo silo |
| `aegro_create_pivot` | Criar um novo pivô |
| `aegro_create_immobilized` | Criar uma nova benfeitoria |

### Manutenções e Abastecimentos (Patrimônios)
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_asset_maintenance` | Recuperar uma manutenção de um patrimônio |
| `aegro_filter_asset_maintenances` | Buscar manutenções por filtro |
| `aegro_create_asset_maintenance` | Criar evento de manutenção |
| `aegro_get_asset_fuel_supply` | Recuperar um abastecimento de um patrimônio |
| `aegro_filter_asset_fuel_supplies` | Buscar abastecimentos por filtro |
| `aegro_create_asset_fuel_supply` | Criar evento de abastecimento |

### Atividades
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_activity` | Obter uma atividade pela chave |
| `aegro_filter_activities` | Obter as atividades da fazenda |
| `aegro_get_activity_plan` | Obter o planejamento de uma atividade pela chave da atividade |
| `aegro_get_activity_plan_by_key` | Obter o planejamento de uma atividade pela chave do planejamento |
| `aegro_get_activity_realization` | Obter a realização de uma atividade pela chave |
| `aegro_filter_activity_realizations` | Obter as realizações de atividades da fazenda |

### Registros de Colheita
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_harvest_log` | Obter um registro de colheita |
| `aegro_filter_harvest_logs` | Filtrar registros de colheita |
| `aegro_create_harvest_log` | Criar um novo registro de colheita |

### Descontos do Registro de Colheita
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_harvest_discounts` | Listar descontos por safra |

### Locais de Estoque
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_stock_location` | Obter um local de estoque pela chave |
| `aegro_filter_stock_locations` | Filtrar locais de estoque da fazenda |

### Itens de Estoque
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_stock_item` | Obter um item de estoque pela chave |
| `aegro_filter_stock_items` | Filtrar itens de estoque da fazenda |

### Movimentações de Estoque
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_stock_log` | Obter uma movimentação de estoque pela chave |
| `aegro_filter_stock_logs` | Obter as movimentações de estoque da fazenda |

### Registros Climáticos
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_weather_log` | Obter um registro climático pela chave |
| `aegro_filter_weather_logs` | Filtrar registros climáticos |
| `aegro_create_weather_log` | Criar um novo registro climático |

### Contas Bancárias
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_bank_account` | Buscar conta bancária por chave |
| `aegro_filter_bank_accounts` | Filtrar contas bancárias |

### Parcelas
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_installment` | Buscar parcela por ID |
| `aegro_filter_installments` | Buscar parcelas por filtros |
| `aegro_save_installment` | Criar ou atualizar parcela |
| `aegro_delete_installments` | Excluir parcelas |

### Ordens de Compra
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_purchase_order` | Buscar ordem de compra por chave |
| `aegro_filter_purchase_orders` | Filtrar ordens de compra |

### Catálogos
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_filter_catalog_elements` | Buscar elementos do catálogo por filtro |

### Rateio
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_apportionment` | Recuperar rateio pela chave |
| `aegro_filter_apportionments` | Buscar grupos de rateio por filtro |

### Categorias Financeiras
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_financial_category` | Buscar categoria financeira por chave |
| `aegro_filter_financial_categories` | Filtrar categorias financeiras |
| `aegro_create_financial_category` | Criar categoria financeira |
| `aegro_get_element_financial_categories` | Filtrar elementos vinculados a uma categoria financeira |

### Tags
| Ferramenta | Descrição |
|------------|-----------|
| `aegro_get_tag` | Buscar tag por chave |
| `aegro_filter_tags` | Filtrar tags |
| `aegro_create_tag` | Criar uma nova tag |

## Exemplos de Uso

Uma vez conectado, você pode fazer perguntas ao assistente de IA como:

- "Mostre todas as safras ativas na minha propriedade"
- "Liste todas as máquinas que precisam de manutenção"
- "Quais são as parcelas pendentes para este mês?"
- "Mostre os registros de colheita de soja desta safra"
- "Crie um novo registro de abastecimento para o trator X"
- "Qual é o estoque atual de fertilizantes?"

## Referência da API

Este servidor implementa a [API Pública Aegro v1](https://app.aegro.com.br/documentations/aegro-public-api/index.html).

URL Base: `https://app.aegro.com.br/pub/v1`

Autenticação: Chave de API via header `Aegro-Public-API-Key`

## Desenvolvimento

```bash
# Executar em modo de desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Iniciar servidor de produção
npm start
```

## Licença

MIT

## Suporte

Para suporte da API, entre em contato:
- Tokens de API: token@aegro.com.br
- Integrações: integracoes@aegro.com.br
- Suporte geral: [Suporte Aegro](https://suporte.aegro.com.br)
