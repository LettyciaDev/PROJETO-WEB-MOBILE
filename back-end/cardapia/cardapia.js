import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Configuração da API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const CACHE_FILE = './cache_receitas.json';

// --- LÓGICA DE CACHE EM ARQUIVO ---
let cacheData = {};
if (fs.existsSync(CACHE_FILE)) {
    try {
        cacheData = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
        console.log("Cache carregado do arquivo local.");
    } catch (e) {
        console.error("Erro ao ler arquivo de cache.");
    }
}

function salvarNoDisco(chave, valor) {
    cacheData[chave] = valor;
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2));
}

// --- FILA E CONTROLE DE FLUXO ---
const fila = [];
let processando = false;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function processarFila() {
    if (processando || fila.length === 0) return;
    processando = true;

    while (fila.length > 0) {
        const { prompt, resolve, reject, chaveCache } = fila[0];

        try {
            // Modelo 1.5-flash é o mais estável para cotas gratuitas
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });



            const result = await model.generateContent({
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            });

            const responseText = result.response.text();
            const json = JSON.parse(responseText);

            salvarNoDisco(chaveCache, json);
            fila.shift();
            resolve(json);

            // Pausa de 5 segundos para não estourar o limite de 15 requisições por minuto
            await sleep(5000);

        } catch (err) {
            console.error(" Erro Gemini:", err.status, err.message);
            
            if (err.status === 429) {
                console.log("Cota esgotada. Aguardando 30 segundos antes de tentar o próximo da fila...");
                await sleep(30000);
                // Não remove da fila, tenta novamente na próxima iteração do while
            } else {
                fila.shift();
                reject(err);
            }
        }
    }
    processando = false;
}

// --- ENDPOINT ---
app.post('/gerar-receita', async (req, res) => {
    const { ingredientes } = req.body;

    if (!ingredientes || (Array.isArray(ingredientes) && ingredientes.length < 3)) {
        return res.status(400).json({ error: "Envie pelo menos 3 ingredientes." });
    }

    // Normaliza os ingredientes para criar uma chave única no cache
    const listaLimpa = Array.isArray(ingredientes) 
        ? ingredientes.map(i => i.trim().toLowerCase()).sort().join(",")
        : ingredientes.toLowerCase();

    if (cacheData[listaLimpa]) {
        console.log(" Item encontrado no cache! Economizando API...");
        return res.json(cacheData[listaLimpa]);
    }

    const prompt = `Aja como nutricionista. Crie uma receita saudável com: ${listaLimpa}. 
    Retorne EXCLUSIVAMENTE um JSON:
    { "titulo": "string", "ingredientes": ["string"], "instrucao": ["string"], "tempo_preparo": "string", "calorias": number }`;

    new Promise((resolve, reject) => {
        fila.push({ prompt, resolve, reject, chaveCache: listaLimpa });
        processarFila();
    })
    .then(receita => res.json(receita))
    .catch(err => res.status(500).json({ error: "Erro ao gerar receita. Tente novamente." }));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Servidor online em http://localhost:${PORT}`));