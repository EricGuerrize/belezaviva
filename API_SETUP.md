# Configuração de APIs para Análise e Melhoria de Imagem

## 📋 APIs Recomendadas

### 1. **Replicate API** (Melhoria de Imagem) ⭐ RECOMENDADO
- **Uso**: Melhorar qualidade de fotos de rosto
- **Modelos disponíveis**:
  - `tencentarc/gfpgan` - Melhora rosto e remove rugas
  - `xinntao/realesrgan` - Upscaling e melhoria geral
  - `sczhou/codeformer` - Restauração facial
- **Custo**: ~$0.002-0.01 por imagem
- **Setup**: 
  1. Criar conta em https://replicate.com
  2. Obter API token
  3. Adicionar no Supabase: `REPLICATE_API_TOKEN`

### 2. **AWS Rekognition** (Análise Facial)
- **Uso**: Detecção facial, análise de textura, idade aparente
- **Custo**: ~$1.00 por 1000 imagens
- **Setup**: Configurar AWS credentials no Supabase

### 3. **Google Cloud Vision API** (Análise de Imagem)
- **Uso**: Análise geral de imagem, detecção de características
- **Custo**: Primeiros 1000/mês grátis, depois $1.50 por 1000
- **Setup**: Configurar GCP credentials no Supabase

### 4. **Azure Face API** (Análise Facial Detalhada)
- **Uso**: Análise facial completa, detecção de emoções
- **Custo**: ~$1.00 por 1000 transações
- **Setup**: Configurar Azure credentials no Supabase

### 5. **Remini API** (Melhoria Profissional)
- **Uso**: Melhoria profissional de fotos
- **Custo**: Variável
- **Setup**: API comercial

## 🚀 Configuração Rápida com Replicate

### Passo 1: Criar conta no Replicate
1. Acesse https://replicate.com
2. Crie uma conta
3. Vá em Account Settings → API Tokens
4. Copie seu token

### Passo 2: Configurar no Supabase
1. Acesse seu projeto no Supabase
2. Vá em Settings → Edge Functions → Secrets
3. Adicione: `REPLICATE_API_TOKEN` = seu token

### Passo 3: Deploy da Edge Function
```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Link ao projeto
supabase link --project-ref seu-project-ref

# Deploy da função
supabase functions deploy enhance-image
```

## 💡 Alternativa: Usar API Direta (Sem Supabase)

Se preferir não usar Supabase Edge Functions, pode chamar diretamente:

```javascript
// Exemplo: Chamar Replicate diretamente do frontend
const response = await fetch('https://api.replicate.com/v1/predictions', {
  method: 'POST',
  headers: {
    'Authorization': `Token ${REPLICATE_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    version: 'model-version-id',
    input: { img: imageBase64 }
  })
})
```

⚠️ **ATENÇÃO**: Nunca exponha sua API key no frontend! Use sempre Edge Functions.

## 🔧 Configuração Atual

O projeto já está configurado para usar Supabase Edge Functions. Basta:

1. ✅ Adicionar `REPLICATE_API_TOKEN` no Supabase
2. ✅ Fazer deploy da função `enhance-image`
3. ✅ A melhoria automática funcionará!

## 📊 Comparação de Custos

| API | Custo/Imagem | Qualidade | Facilidade |
|-----|--------------|-----------|------------|
| Replicate | $0.002-0.01 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Remini | Variável | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| AWS Rekognition | $0.001 | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Google Vision | $0.0015 | ⭐⭐⭐⭐ | ⭐⭐⭐ |

## 🎯 Recomendação

Para este projeto, recomendo **Replicate** porque:
- ✅ Fácil de configurar
- ✅ Modelos especializados em rosto
- ✅ Custo baixo
- ✅ Boa qualidade
- ✅ API simples

