import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'image-api-and-mime-fix',
      configureServer(server) {
        // Endpoint to receive uploaded project images
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/upload-image' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const { fileName, base64Data } = JSON.parse(body);
                if (!fileName || !base64Data) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'Missing fileName or base64Data' }));
                  return;
                }

                // Sanitize file name
                const safeName = path.basename(fileName).replace(/[^a-zA-Z0-9._-]/g, '_');
                const cleanBase64 = base64Data.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');
                const buffer = Buffer.from(cleanBase64, 'base64');

                const targetDirs = [
                  path.resolve(process.cwd(), 'public/images/projects'),
                  path.resolve(process.cwd(), 'dist/images/projects')
                ];

                for (const dir of targetDirs) {
                  if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                  }
                  fs.writeFileSync(path.join(dir, safeName), buffer);
                }

                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify({
                  success: true,
                  fileName: safeName,
                  imageUrl: `/images/projects/${safeName}`
                }));
              } catch (err: any) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: err.message }));
              }
            });
            return;
          }

          if (req.url && (req.url.endsWith('.jfif') || req.url.endsWith('.svg'))) {
            res.setHeader('Access-Control-Allow-Origin', '*');
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3000,
    host: true
  }
});
