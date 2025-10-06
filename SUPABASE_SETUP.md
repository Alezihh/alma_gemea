# Configuração do Supabase

## 1. Criar projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma nova conta ou faça login
3. Clique em "New Project"
4. Escolha sua organização
5. Preencha:
   - **Name**: alma-gemea-db
   - **Database Password**: (escolha uma senha forte)
   - **Region**: (escolha a mais próxima do Brasil)
6. Clique em "Create new project"

## 2. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```env
VITE_SUPABASE_URL=https://seu-projeto-id.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

**Como encontrar essas informações:**
1. No painel do Supabase, vá em **Settings** → **API**
2. Copie a **Project URL** para `VITE_SUPABASE_URL`
3. Copie a **anon public** key para `VITE_SUPABASE_ANON_KEY`

## 3. Criar tabela no banco de dados

No painel do Supabase, vá em **SQL Editor** e execute este comando:

```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  birthdate DATE NOT NULL,
  city VARCHAR(255) NOT NULL,
  zodiac_sign VARCHAR(50) NOT NULL,
  height VARCHAR(20) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert data
CREATE POLICY "Allow public insert" ON users FOR INSERT WITH CHECK (true);

-- Create policy to allow anyone to read data
CREATE POLICY "Allow public read" ON users FOR SELECT USING (true);
```

## 4. Testar a integração

1. Execute o projeto: `npm run dev`
2. Preencha o questionário
3. Verifique no painel do Supabase se os dados foram salvos na tabela `users`

## 5. Estrutura dos dados salvos

Os seguintes dados são coletados e salvos:

- **name**: Nome completo do usuário
- **birthdate**: Data de nascimento
- **city**: Cidade onde mora
- **zodiac_sign**: Signo do zodíaco
- **height**: Altura (baixo/médio/alto)
- **email**: Email do usuário (opcional)

## 6. Segurança

- A tabela usa Row Level Security (RLS)
- Qualquer pessoa pode inserir dados (para o formulário funcionar)
- Qualquer pessoa pode ler dados (para futuras funcionalidades)
- Os dados são únicos por email (evita duplicatas)



