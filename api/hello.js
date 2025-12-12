export default function handler(request, response) {
  response.status(200).json({ 
    message: 'Backend Vercel działa poprawnie!',
    time: new Date().toISOString()
  });
}