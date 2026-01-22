# 10. Considerações de Deploy

## 10.1 Checklist de Produção

**Segurança:**
- [ ] `JWT_SECRET` gerado aleatoriamente (mínimo 32 caracteres)
- [ ] `NODE_ENV=production` configurado
- [ ] HTTPS habilitado (certificado SSL válido)
- [ ] CORS configurado apenas para domínio de produção
- [ ] Variáveis de ambiente validadas no startup
- [ ] Headers de segurança HTTP configurados
- [ ] Rate limiting habilitado em endpoints de autenticação

**Banco de Dados:**
- [ ] PostgreSQL configurado (não SQLite)
- [ ] Migrations aplicadas (`prisma migrate deploy`)
- [ ] Backup automático configurado
- [ ] Connection pooling configurado
- [ ] Índices criados e otimizados

**Aplicação:**
- [ ] Build de produção executado (`npm run build`)
- [ ] Testes passando (unit + integration)
- [ ] Cobertura de testes >80%
- [ ] Logging estruturado configurado
- [ ] Monitoramento e alertas configurados
- [ ] Health check endpoint implementado

**Infraestrutura:**
- [ ] Servidor Node.js com PM2 ou similar
- [ ] Reverse proxy (Nginx) configurado
- [ ] SSL/TLS configurado
- [ ] Firewall configurado
- [ ] Domínio e DNS configurados

## 10.2 Caminho de Escalabilidade

```
┌─────────────────────────────────────────────────────────────┐
│ DESENVOLVIMENTO                                              │
│ ─────────────────────────────────────────────────────────── │
│ • SQLite (arquivo local)                                     │
│ • Servidor Node.js local (porta 3000)                       │
│ • Frontend Vite dev server (porta 5173)                      │
│ • Sem load balancing                                         │
│ • Sem cache                                                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ STAGING                                                       │
│ ─────────────────────────────────────────────────────────── │
│ • PostgreSQL (servidor único)                                │
│ • Servidor Node.js único                                     │
│ • Frontend servido via Nginx                                 │
│ • Sem load balancing                                         │
│ • Cache básico (Redis opcional)                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ PRODUÇÃO                                                     │
│ ─────────────────────────────────────────────────────────── │
│ • PostgreSQL (replicação master-slave)                     │
│ • Múltiplos servidores Node.js                               │
│ • Load balancer (Nginx ou cloud LB)                         │
│ • CDN para assets estáticos                                 │
│ • Redis para cache e sessões (se necessário)                │
│ • Monitoramento (APM, logs agregados)                       │
└─────────────────────────────────────────────────────────────┘
```

**Evolução Futura:**

1. **Microserviços**: Separar auth, tasks, projects em serviços independentes
2. **Message Queue**: Adicionar filas (RabbitMQ, Kafka) para processamento assíncrono
3. **Cache Distribuído**: Redis cluster para cache e sessões
4. **Database Sharding**: Sharding horizontal se volume de dados crescer
5. **CDN Global**: CDN para servir assets estáticos globalmente

---
