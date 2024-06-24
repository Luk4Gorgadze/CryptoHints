// Import
import Taapi from 'taapi';

// Init taapi
const apiKey = process.env.NEXT_PUBLIC_TAAPIO_API_KEY || 'DEFAULT_API_KEY';
const taapiClient = new Taapi(apiKey);

export default taapiClient;
