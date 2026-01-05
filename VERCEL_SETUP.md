# Configuração do Vercel

## Variáveis de Ambiente Necessárias

No painel do Vercel, adicione as seguintes variáveis de ambiente:

1. Acesse: **Settings** → **Environment Variables**

2. Adicione:
   - `VITE_SUPABASE_URL` = `https://kndcvwchztgxxmjmthkl.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuZGN2d2NoenRneHhtam10aGtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NjU5MDEsImV4cCI6MjA4MjM0MTkwMX0.fd_ytT1ty1QMS8M5HKkl3i0ivAFFA3Yt4XsQ75L_sv4`

3. Aplique para: **Production**, **Preview** e **Development**

4. Faça um novo deploy após adicionar as variáveis

## Build Settings

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Troubleshooting

Se o site aparecer em branco:

1. Verifique o console do navegador (F12) para erros
2. Verifique se as variáveis de ambiente foram adicionadas corretamente
3. Verifique os logs do build no Vercel
4. Certifique-se de que o `vercel.json` está no repositório

