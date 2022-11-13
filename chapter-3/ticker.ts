import { EventEmitter } from 'events';
function ticker(num: number, callback: (num: number) => void) {
    const startTimestamp = Date.now();
    const emitter = new EventEmitter();
    let totalTicks = 0;
    const interval = setInterval(() => {
        if (Date.now() - startTimestamp < num) {
            totalTicks += 1;
            return emitter.emit('tick', Date.now() - startTimestamp);
        }
        clearInterval(interval);
        return callback(totalTicks);
    }, 50);
    return emitter;
}

ticker(150, (num: number) => console.log('final', num))
    .on('tick', (num: number) => console.log('tick', num));