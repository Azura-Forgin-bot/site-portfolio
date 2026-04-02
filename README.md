# 💼 Portfólio de Júlia Pinheiro

Portfólio profissional interativo com painel de administração e sincronização com GitHub.

## 🚀 Características

- ✨ **Design moderno** com gradiente purple/green elegante
- 📱 **Responsivo** - funciona perfeitamente em desktop, tablet e mobile
- ⚙️ **Painel de Admin** - edite seu conteúdo sem código
- 🔄 **Sincronização GitHub** - backup automático dos dados
- 💾 **Persistência local** - dados salvos no navegador
- 📧 **Feedback integrado** - recolha mensagens de visitantes
- 🎨 **Animações** - transições suaves e profissionais
- 🔐 **Seguro** - password protegido, sem backend necessário

## 📖 Como Usar

### 1. Acessar o Painel Admin

Clique no botão **⚙️ Admin** no rodapé do site.

**Password:** `julia2026`

### 2. Editar Seu Portfólio

Na admin, tem acesso a 5 abas:

1. **Perfil** - Foto, email, telefone, localização
2. **Experiência** - Adicione, edite ou delete suas experiências profissionais
3. **Formação** - Educação e certificações
4. **Habilidades** - Tecnologias e skills
5. **Projetos** - Showcase com imagens e descrições
6. **GitHub 🔗** - Sincronize com GitHub

### 3. Sincronizar com GitHub

No painel admin, aceda à aba **GitHub 🔗**:

1. Configure seu **Username GitHub**
2. Cole seu **Personal Access Token** (gere em https://github.com/settings/tokens)
3. Indique o **Repositório**
4. Clique **"Guardar Credenciais"**
5. Clique **"🔄 Sincronizar Agora"**

Seus dados serão salvos num ficheiro `portfolio_data.json` no repositório.

## 🌐 Hospedar em GitHub Pages

Para hospedar seu portfólio online gratuitamente:

1. Crie um repositório no GitHub chamado `SitePortifolio`
2. Configure esse repositório (Settings → Pages → Branch main)
3. Seu site estará em: `https://[seu-username].github.io/SitePortifolio/`
4. Use a sincronização, e o site atualiza automaticamente!

## 📂 Estrutura

```
MeuPrimeiroSite/
├── index.html           # Página principal
├── style.css            # Estilos (purple/green theme)
├── script.js            # Lógica e sincronização
├── thank-you.html       # Página de agradecimento (feedback)
├── portfolio_data.json  # Dados (gerado ao sincronizar)
├── GITHUB_SETUP.md      # Guia de configuração GitHub
└── .gitignore          # Configuração Git
```

## 🔐 Segurança

- **Dados locais:** Guardados em localStorage (apenas seu dispositivo)
- **Token GitHub:** Nunca enviado para servidor externo, apenas para GitHub API
- **Password:** Recomenda-se mudar para senha mais segura
- **Limpeza:** Se limpar cache, terá de guardar o token novamente

## 📸 Requisitos de Imagens

- **Perfil:** JPG, PNG, GIF (máx 5MB)
- **Projetos:** JPG, PNG, GIF (máx 5MB)
- **Formato:** Base64 guardado em localStorage

## 🎨 Cores

- **Primária:** Purple `#7C3AED`
- **Secundária:** Esmeralda `#059669`
- **Destaque:** Green `#10B981`

## 📞 Feedback

Visitantes podem deixar mensagens através do botão **💬 Feedback**. As mensagens são enviadas por email via Formspree.

## 📝 Tecnologias

- HTML5
- CSS3 com animations
- Vanilla JavaScript (sem dependencies)
- GitHub API
- LocalStorage
- Formspree (feedback)
- GitHub Pages (hosting)

## 🎯 Próximas Melhorias

- [ ] Dark mode toggle
- [ ] Auto-sync a cada 12h com GitHub Actions
- [ ] Export/Import dados
- [ ] Múltiplos idiomas
- [ ] Dashboard com analytics

## 📄 Licença

Todos os direitos reservados © 2026 Júlia Pinheiro

---

**Feito com ❤️ para showcase seu talento profissional**
