import rateLimit from 'express-rate-limit';

export const createRateLimiter = (options) => {
    return rateLimit({
        windowMs: options.windowMs || 15 * 60 * 1000, // Ventana de tiempo, por defecto 15 minutos
        max: options.max || 100, // Límite de solicitudes, por defecto 100
        message: (req, res) => {
            res.status(429).json({
                error: 'Too many requests',
                message: `You have exceeded the ${options.max || 100} requests in ${options.windowMs / 60000 || 15} mins limit!`,
                retryAfter: req.rateLimit.resetTime
            });
        },
        keyGenerator: (req, res) => {
            // Personalizar la clave para la limitación de tasa. Aquí se usa IP y el ID del usuario si está autenticado.
            return req.ip + (req.user ? `-${req.user.id}` : '');
        },
        handler: (req, res, next) => {
            res.status(429).json({
                error: 'Too many requests',
                message: `You have exceeded the rate limit!`,
                retryAfter: req.rateLimit.resetTime
            });
        },
        onLimitReached: (req, res, options) => {
            console.warn(`Rate limit reached for IP: ${req.ip}`);
        }
    });
};