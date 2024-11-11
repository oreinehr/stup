// removeBgService.js
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const REMOVE_BG_API_KEY = '284y7ebCKWaJEscA6xhpMpLb';

const removeBackground = async (imagePath) => {
    const imageFile = fs.readFileSync(imagePath);

    const response = await axios.post('https://api.remove.bg/v1.0/removebg', imageFile, {
        headers: {
            'X-Api-Key': REMOVE_BG_API_KEY,
            'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
    });

    const outputPath = path.join(__dirname, 'uploads', `bg_removed_${path.basename(imagePath)}`);

    fs.writeFileSync(outputPath, response.data);
    
    return outputPath; // Retorna o caminho da imagem sem fundo
};

export default removeBackground;
