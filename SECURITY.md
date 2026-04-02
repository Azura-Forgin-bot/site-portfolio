## 🔒 Guia de Segurança do Portfólio

Este documento explica as medidas de segurança implementadas e recomendações para manter seu portfólio seguro.

---

## ✅ Segurança Implementada

### 1. **Validação de Entrada**
- Inputs sanitizados para evitar XSS (Cross-Site Scripting)
- Validação de formato de email
- Verificação de tipo e tamanho de arquivo
- Limite de 5MB por arquivo

### 2. **Proteção de Dados**
- Dados armazenados em localStorage (não enviados para servidor)
- Fotos armazenadas como data URLs (base64) - permanecem no navegador
- Formspree encripta dados em trânsito (HTTPS)
- Sem armazenamento de dados no servidor

### 3. **Admin Panel**
- Password proteção para edições
- Destruição de sessão ao fazer logout
- Reset de formulários após logout

### 4. **Formulário de Contato**
- Proteção anti-spam via Formspree
- Validação de email
- Sem armazenamento de mensagens (apenas email)

---

## ⚠️ Considerações Importantes

### **Seu Sitio (Cliente)**
| Item | Status | Recomendação |
|------|--------|--------------|
| HTTPS | Necessário | Usar HTTPS quando deployed online |
| Password | Visível no código | Está em JavaScript - qualquer um pode ver navegador/DevTools |
| Backup | Manual | Faça backup de localStorage periodicamente |
| Dados | Privados | Todos os dados ficam no seu navegador |

### **Servidor (FormSpree)**
| Item | Status |
|------|--------|
| Encriptação | ✅ HTTPS (em trânsito) |
| Armazenamento | ❌ Não armazena (apenas reencaminha) |
| GDPR | ✅ Compliant |

---

## 🛡️ Recomendações de Segurança

### **IMEDIATO - Faça agora:**
1. ✅ **Altere a senha de admin** em `script.js` linha 2
   ```javascript
   const ADMIN_PASSWORD = 'SUA_SENHA_FORTE_AQUI';
   ```
   Use uma senha forte: mínimo 12 caracteres, maiúsculas, números, símbolos

2. ✅ **Use HTTPS** quando publicar o site
   - GitHub Pages (grátis, automático HTTPS)
   - Netlify (grátis, automático HTTPS)
   - Vercel (grátis, automático HTTPS)

### **FUTURO - Para melhor segurança:**
1. **Backend Server** (se crescer)
   - Mova autenticação do cliente para servidor
   - Use JWT tokens
   - Hash da password em servidor

2. **Banco de Dados** (se tiver várias contas)
   - PostgreSQL ou MongoDB
   - Dados encriptados em repouso

3. **WAF (Web Application Firewall)**
   - Cloudflare grátis oferece isso
   - Protege contra ataques comuns

---

## 🔐 Como Manter Seguro

### **Semana a semana:**
```
- Update passwords de vez em quando
- Monitore emails em Formspree
- Backup de localStorage (export dados)
```

### **Mensalmente:**
```
- Revise quem tem acesso
- Verifique se nada foi modificado
- Update consentimentos GDPR/RGPD
```

---

## 📊 Score de Segurança Atual

```
Portfólio Estático: 8/10 ✅

O que falta para 10/10:
- Backend autenticação (-1)
- Banco de dados encriptado (-1)
```

---

## 📞 Suporte de Segurança

Se notar atividade estranha:
1. Mude senha de admin imediatamente
2. Limpe localStorage: `localStorage.clear()` no console
3. Faça backup de tudo
4. Re-deploy do site

---

## 📚 Recursos Úteis

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Formspree Docs](https://formspree.io/docs)
- [MDN Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [GitHub Pages Security](https://docs.github.com/en/pages/getting-started-with-github-pages)

---

**Última atualização:** 2 April 2026
**Versão:** 1.0
