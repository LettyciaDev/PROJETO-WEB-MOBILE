import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json()); // Habilita o recebimento de JSON no corpo da requisição
app.use(cors());        // Permite que seu site acesse este servidor

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// O ENDPOINT: POST /gerar-receita
app.post('/gerar-receita', async (req, res) => {
  
  const { ingredientes } = req.body;

  if (!ingredientes || ingredientes.length < 3) {
    return res.status(400).json({ error: "Por favor, forneça uma lista de ingredientes válida." });
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: { responseMimeType: "application/json" } 
    });

    // 3. O prompt que "envelopa" a lista de ingredientes
    const prompt = `
                  Aja como um nutricionista e chef. Crie uma receita saudável usando: ${listaIngredientes}. 
                  Calcule as calorias aproximadas. 
                  Responda em formato markdown com: ingrediente, modo de preparo, tempo de preparo, dicas opcionais e calorias.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // 4. Converte a string da IA para JSON e envia de volta para o seu site
    const receitaFinal = JSON.parse(responseText);

    if (receitaFinal.erro) {
      return res.status(422).json(receitaFinal);
    }

    res.json(receitaFinal);

  } catch (error) {
    console.error("Erro na API Gemini:", error);
    res.status(500).json({ error: "Erro interno ao gerar a receita." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor de receitas rodando na porta ${PORT}`));