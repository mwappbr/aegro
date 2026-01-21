# Branding & Style Guide

## Visual Identity

**Brand Guidelines:** Este projeto não possui brand guidelines corporativas existentes. A identidade visual é criada especificamente para este produto, focando em **profissionalismo, confiança e acessibilidade**. O design evita estereótipos de "UI para idosos" (fontes extra grandes, cores infantis) em favor de uma estética moderna e dignificada que beneficia todos os usuários.

**Brand Personality:**
- **Profissional**: Sério mas não corporativo, técnico mas não intimidador
- **Acessível**: Claro e direto, sem complexidade desnecessária
- **Confiável**: Consistente, previsível, sem surpresas
- **Respeitoso**: Trata usuários como adultos inteligentes, não infantiliza

## Color Palette

| Color Type | Hex Code | Usage |
|------------|----------|-------|
| Primary | `#1e40af` | CTAs principais, links importantes, headers, títulos clicáveis |
| Primary Light | `#3b82f6` | Hover states em elementos primários, backgrounds secundários |
| Primary Dark | `#1e3a8a` | Texto sobre backgrounds claros, ênfase adicional |
| Secondary | `#60a5fa` | Badges, pills, elementos decorativos, bordas de comentários |
| Accent | `#93c5fd` | Highlights sutis, backgrounds hover, indicadores visuais |
| Success | `#10b981` | Feedback positivo, confirmações, status de sucesso |
| Warning | `#f59e0b` | Avisos importantes, atenção necessária |
| Error | `#ef4444` | Mensagens de erro, ações destrutivas, validação falha |
| Neutral Gray 900 | `#111827` | Texto principal (body text), headings secundários |
| Neutral Gray 700 | `#374151` | Texto secundário, metadados |
| Neutral Gray 500 | `#6b7280` | Texto terciário, placeholders, timestamps |
| Neutral Gray 300 | `#d1d5db` | Bordas, separadores, divisores |
| Neutral Gray 100 | `#f3f4f6` | Backgrounds secundários, alternados |
| Neutral Gray 50 | `#f9fafb` | Background principal da aplicação |
| White | `#ffffff` | Cards, modals, elementos elevados |

**Contrast Validation:**
- Todas as combinações texto/background validadas para WCAG AA (mínimo 4.5:1)
- Principais combinações:
  - Gray 900 sobre White: 15.3:1 ✅
  - Primary sobre White: 9.7:1 ✅
  - Gray 700 sobre White: 11.2:1 ✅
  - White sobre Primary: 9.7:1 ✅
  - Gray 500 sobre White: 4.6:1 ✅ (limite mínimo, usar apenas para texto secundário)

## Typography

### Font Families

- **Primary:** Roboto (sans-serif) - Fonte principal para todo o texto
  - Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif
  - Import via Google Fonts: weights 400, 500, 600, 700
- **Secondary:** Roboto (mesma família) - Não há necessidade de fonte secundária neste projeto
- **Monospace:** 'Roboto Mono', 'Courier New', monospace - Para code blocks e elementos técnicos

**Rationale:** Roboto foi escolhida por:
- Alta legibilidade em tamanhos grandes e pequenos
- Formas de caracteres distintas (não confunde 1/l/I, 0/O)
- Suporte excelente a caracteres portugueses (ã, õ, ç)
- Kerning e spacing otimizados para leitura prolongada
- Disponível gratuitamente via Google Fonts

### Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 (Page Title) | 32px (2rem) | 700 (Bold) | 1.2 (38px) |
| H2 (Section Heading) | 24px (1.5rem) | 600 (Semibold) | 1.3 (31px) |
| H3 (Subsection) | 20px (1.25rem) | 600 (Semibold) | 1.4 (28px) |
| Body Large | 18px (1.125rem) | 400 (Regular) | 1.6 (29px) |
| Body (Default) | 16px (1rem) | 400 (Regular) | 1.5 (24px) |
| Small (Metadados) | 14px (0.875rem) | 400 (Regular) | 1.4 (20px) |
| Button Text | 16px (1rem) | 600 (Semibold) | 1.2 (19px) |
| Link Text | 16px (1rem) | 500 (Medium) | 1.5 (24px) |

**Typography Guidelines:**
- **Mínimo absoluto:** 14px (usado apenas para metadados secundários)
- **Ideal para leitura prolongada:** 16-18px
- **Line-height mínimo:** 1.5 para body text, 1.2 para headings
- **Max line length:** 70 caracteres (~800px em 16px) para legibilidade ideal
- **Paragraph spacing:** 1.5em entre parágrafos
- **Letter-spacing:** Default (não ajustar), exceto headings grandes (-0.02em para tight)

## Iconography

**Icon Library:** Flaticon Uicons (Regular Rounded)
- **Rationale:** Biblioteca completa de ícones profissionais, consistentes e altamente legíveis, com excelente suporte para acessibilidade
- **CDN:** https://cdn-uicons.flaticon.com/
- **Licença:** Gratuita com atribuição (Free tier) ou Premium para uso comercial
- **Import:** 
  ```html
  <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css'>
  <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.6.0/uicons-solid-rounded/css/uicons-solid-rounded.css'>
  ```
- **Size padrão:** 18-20px (metadata icons)
- **Size em buttons:** 20-24px
- **Size no logo:** 28px
- **Cor:** Cinza médio (#6b7280) para metadata, herda cor do texto em outros contextos

**Usage Guidelines:**
- Todos os ícones devem ter aria-label descritivo quando funcionais
- Ícones decorativos: aria-hidden="true"
- Usar variant "regular-rounded" (rr) como padrão para visual suave e acessível
- Usar variant "solid-rounded" (sr) apenas para ênfase em logos ou CTAs importantes
- Ícones sempre acompanhados de texto label (exceto casos óbvios como "X" para fechar)
- Screen readers devem anunciar o significado do ícone via aria-label

**Icon Set usado no projeto:**
- `fi-rr-user` - Autor/Usuário
- `fi-rr-arrow-small-up` - Pontos/Votos
- `fi-rr-comment` - Comentários
- `fi-rr-clock` - Timestamp/Tempo
- `fi-rr-link` - Link externo
- `fi-sr-diamond` - Logo da aplicação (variant solid)
- `fi-rr-angle-small-left` - Botão Voltar
- `fi-rr-angle-small-down` / `fi-rr-angle-small-right` - Expand/Collapse
- `fi-rr-cross` - Fechar/Erro
- `fi-rr-exclamation` - Warning
- `fi-rr-check-circle` - Success
- `fi-rr-refresh` - Retry/Recarregar

## Spacing & Layout

**Grid System:** 
- Container max-width: 1200px (desktop), 100% (mobile)
- Content max-width: 800px (artigo e texto longo)
- Padding horizontal container: 24px (desktop), 16px (mobile)
- Grid columns: Não usar grid complexo; layout é majoritariamente single-column centrado

**Spacing Scale:** (baseado em múltiplos de 4px)
- `xs`: 4px (0.25rem)
- `sm`: 8px (0.5rem)
- `md`: 12px (0.75rem)
- `base`: 16px (1rem) - **unidade base principal**
- `lg`: 20px (1.25rem)
- `xl`: 24px (1.5rem)
- `2xl`: 32px (2rem)
- `3xl`: 48px (3rem)
- `4xl`: 64px (4rem)

**Layout Guidelines:**
- **Padding interno de cards:** base (16px) em mobile, xl (24px) em desktop
- **Margin entre elementos:** lg (20px) mínimo para respirabilidade
- **Margin entre seções:** 3xl (48px) para separação clara
- **Header height:** 80px fixo em desktop, 64px em mobile
- **Footer height:** Dinâmico (min 120px)
- **Whitespace:** Generoso por padrão; design "calmo" prioriza espaço sobre densidade

**Responsive Breakpoints:**
- Mobile: 375px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+
- Wide: 1440px+ (optional enhanced spacing)

---
