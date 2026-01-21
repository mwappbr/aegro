# Arquitetura de Informação (IA)

## Site Map / Screen Inventory

```mermaid
graph TD
    A[Homepage - Lista de Top Stories] --> B[Visualização de Artigo]
    B --> B1[Seção de Comentários]
    B1 --> B2[Thread de Comentários Aninhada]
    B --> B3[Link para Artigo Original Externo]
    A --> E[Página de Erro 404]
    B --> E
    
    style A fill:#1e40af,stroke:#1e3a8a,stroke-width:2px,color:#fff
    style B fill:#3b82f6,stroke:#2563eb,stroke-width:2px,color:#fff
    style B1 fill:#60a5fa,stroke:#3b82f6,stroke-width:2px,color:#000
    style E fill:#ef4444,stroke:#dc2626,stroke-width:2px,color:#fff
```

## Navigation Structure

**Primary Navigation:** 
- Header fixo com logo/título "HackerNews Acessível" à esquerda
- Link "Home" sempre visível para retorno à lista principal
- Estrutura minimalista sem menu hamburger (apenas 2 páginas principais: Home e Article)

**Secondary Navigation:**
- Breadcrumbs na página de artigo: `Home > Título do Artigo`
- Botão "← Voltar" explícito no topo da página de artigo
- Links internos dentro de comentários (quando aplicável)

**Breadcrumb Strategy:**
- Breadcrumbs aparecem apenas na visualização de artigo
- Sempre mostram caminho completo: Home > Título abreviado (max 50 chars)
- Todos os elementos clicáveis e navegáveis via teclado
- Estruturados semanticamente com `<nav>` e `<ol>`

---
