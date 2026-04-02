# 📚 Configuração GitHub & GitHub Pages

## 1️⃣ Primeiros Passos

Sua sincronização GitHub está **pronta para usar!** Apenas siga estes passos:

### 1.1 - Ativar GitHub Pages

1. No repositório **SitePortifolio**, aceda a **Settings** (Definições)
2. Esquerda → **Pages**
3. Em **Source**, selecione:
   - Branch: `main` (ou `master` se o seu repo tiver)
   - Folder: `/ (root)`
4. Clique **Save**

✅ Seu site estará disponível em: `https://Azura-Forgin-bot.github.io/SitePortifolio/`

### 1.2 - Ativar a Sincronização no Portfolio

1. Abra seu portfolio **localmente**
2. Clique no botão **⚙️ Admin**
3. Insira a password: `julia2026`
4. Clique na aba **🔗 GitHub**
5. Preencha:
   - **Username GitHub**: `seu-username` (ex: `Azura-Forgin-bot`)
   - **GitHub Token**: Cole seu token pessoal (gere em https://github.com/settings/tokens)
   - **Repositório**: `site-portfolio` (nome do repositório)
6. Clique **"Guardar Credenciais"**
7. Clique **"🔄 Sincronizar Agora"**

✅ Seus dados serão enviados para GitHub num ficheiro `portfolio_data.json`

---

## 2️⃣ Como Funciona a Sincronização

**Fluxo de dados:**
```
Dados no seu browser (localStorage)
         ↓ (clique Sincronizar)
Credenciais GitHub (guardadas localmente)
         ↓ (API GitHub)
Novo ficheiro portfolio_data.json
         ↓
Repositório GitHub → GitHub Pages → Seu site online
```

### ⚠️ Aviso de Segurança

- O **token é guardado apenas no localStorage do seu dispositivo**
- **Nunca** é enviado para servidor externo (apenas para GitHub API official)
- Se limpar cache/cookies, terá de guardar o token novamente
- Para múltiplos dispositivos, repita o processo em cada um

---

## 3️⃣ Fluxo Completo

1. **Editar portfolio** → Adicione projects, atualize experiência, etc.
2. **Guardar no browser** → Dados salvos em localStorage
3. **Clique "Sincronizar Agora"** → Dados enviados para GitHub
4. **GitHub Pages atualiza** → Seu site online atualizado em ~1 minuto

---

## 4️⃣ Verificar se Funcionou

1. Aceda a: `https://github.com/Azura-Forgin-bot/SitePortifolio`
2. Procure o ficheiro `portfolio_data.json`
3. Se existir, a sincronização funcionou! ✅
4. Aceda ao seu site em: `https://Azura-Forgin-bot.github.io/SitePortifolio/`

---

## 5️⃣ Problemas Comuns

### ❌ "Repositório não encontrado"
- Verifique se o repositório `SitePortifolio` existe
- Confirme que o username está correto

### ❌ "Acesso negado"
- O token pode estar expirado
- Gere um novo token em: https://github.com/settings/tokens
- Guarde e repita o processo

### ❌ "GitHub Pages não atualiza"
- Espere 1-2 minutos
- Apague cache do browser (Ctrl+Shift+Del)
- Verifique se GitHub Pages está ativado

---

## 6️⃣ Dicas Avançadas

### 🔐 Revogar Token Antigo
Se o token for comprometido:
1. GitHub → Settings → Developer settings → Personal access tokens
2. Clique o token → **Delete**
3. Gere um novo token

### 📊 Ver Histórico de Commits
Seu repositório guardará cada sincronização como um commit:
1. GitHub → Seu repo → **Commits**
2. Verá commits tipo: "📝 Portfolio sync - 02/04/2026 14:30:45"

### 🔄 Sincronizar Automaticamente
(Futuro): Podemos configurar Auto-Sync a cada 12 horas com um GitHub Action!

---

## 7️⃣ Pronto! 🎉

Sua sincronização GitHub está **100% funcional**. Agora:

✅ Todos os dados estão salvos no GitHub
✅ Seu portfolio é um repositório real
✅ GitHub Pages hospeda seu site
✅ Pode sincronizar facilmente a qualquer momento

**Dúvidas?** Atualizar credenciais é simples - repita os passos 1.2!
