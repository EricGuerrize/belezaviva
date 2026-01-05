# Beleza Viva

Aplicação web para análise personalizada de pele e geração de rotina de skincare.

## 🚀 Tecnologias

- **React 19** - Framework JavaScript
- **Vite** - Build tool
- **React Router** - Roteamento
- **Tailwind CSS** - Estilização
- **Supabase** - Backend e Edge Functions
- **Lucide React** - Ícones
- **Sonner** - Notificações

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do Supabase.

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

## 🎯 Funcionalidades

- Upload de foto via câmera ou arquivo
- Análise de pele com métricas (hidratação, elasticidade, textura)
- Geração de imagem melhorada (via edge function)
- Rotina de skincare personalizada
- Plano de produtos recomendados

## 📱 Rotas

- `/` - Página inicial (upload de foto)
- `/objetivo` - Seleção de objetivo
- `/areas` - Seleção de áreas do rosto
- `/analyzing` - Tela de análise em progresso
- `/problemas` - Plano personalizado com métricas
- `/resultados` - Comparação antes/depois
- `/plano` - Plano de skincare personalizado

## 🛠️ Build

Para criar uma build de produção:

```bash
npm run build
```

Para visualizar a build:

```bash
npm run preview
```

## 📝 Notas

- As imagens são processadas localmente e não são armazenadas permanentemente
- A análise de pele é uma simulação baseada em algoritmos
- A edge function `enhance-image` deve estar configurada no Supabase
