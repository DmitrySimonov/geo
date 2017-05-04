import throng from 'throng';
import expressApp from './app';

const PORT = process.env.PORT || 5000;
const WORKERS = process.env.WEB_CONCURRENCY || 1;

throng({workers: WORKERS, lifetime: Infinity, start: start});

async function start(id) {

    console.log(`Started worker ${id}`);
    console.log(`Time is`, Date.now());
    console.log('Ready to listen on', PORT);

    var app = expressApp();
    app.listen(PORT, onListen);
    
    function onListen() {
        console.log('Listening on', PORT);
    }

    process.on('SIGTERM', () => {
        console.log(`Worker ${id} exiting...`);
        console.log('(cleanup would happen here)');
        process.exit();
    });
}