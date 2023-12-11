import express, {Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';


import imageRoutes from './routes/imageRoutes';

const app : express.Application = express();

// serving static files
app.use(express.static(`${__dirname}/public`));

// set security HTTP headers
app.use(helmet());

app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        "img-src": ["'self'", "https: data:", "http"],
    }
}));

// limit requests from same IP
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour!'
});

app.use('/api', limiter);

// development logging

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cookieParser());


app.use(hpp({ 
    whitelist: [
        // @TODO add whitelist
    ]
}))


// Parse JSON request bodies
app.use(express.json());


// Use image routes
app.use(imageRoutes);


// handle undefined routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});



export default app;
