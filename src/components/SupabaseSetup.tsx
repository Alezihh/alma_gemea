import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';

export default function SupabaseSetup() {
  const [copied, setCopied] = useState(false);

  const sqlCode = `CREATE TABLE users (
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

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read" ON users FOR SELECT USING (true);`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sqlCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gray-900 border-primary/50">
        <CardHeader>
          <CardTitle className="text-white text-center">
            ⚠️ Configuração do Supabase Necessária
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-white/80 space-y-2">
            <p><strong>1.</strong> Acesse seu painel do Supabase</p>
            <p><strong>2.</strong> Vá em <strong>SQL Editor</strong></p>
            <p><strong>3.</strong> Execute o código SQL abaixo:</p>
          </div>
          
          <div className="bg-black/50 p-4 rounded-lg border border-gray-600">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">SQL para criar a tabela:</span>
              <Button
                onClick={copyToClipboard}
                size="sm"
                variant="outline"
                className="text-xs"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copiado!' : 'Copiar'}
              </Button>
            </div>
            <pre className="text-xs text-green-400 overflow-x-auto">
              {sqlCode}
            </pre>
          </div>
          
          <div className="text-white/80 space-y-2">
            <p><strong>4.</strong> Após executar o SQL, teste novamente</p>
            <p><strong>5.</strong> Os dados serão salvos automaticamente</p>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={() => window.location.reload()} 
              className="flex-1 bg-primary hover:bg-primary/80"
            >
              Testar Novamente
            </Button>
            <Button 
              onClick={() => window.open('https://supabase.com/dashboard', '_blank')} 
              variant="outline"
              className="flex-1"
            >
              Abrir Supabase
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

