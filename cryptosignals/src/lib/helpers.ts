const VALID_TOKEN = process.env.COIN_API_POST_KEY;  // Replace with your actual token


export const validateToken = (req: any) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
        return false;
    }

    return authHeader === VALID_TOKEN;
};