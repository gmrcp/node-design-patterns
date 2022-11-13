import { EventEmitter } from 'events';
function ticker(num: number, callback: (num: number) => void) {
    const startTimestamp = Date.now();
    const emitter = new EventEmitter();
    const tick = (timestamp: number) => {
        if (timestamp % 5 === 0) {
            return emitter.emit('error', new Error('Divisable by 5'));
        }
        totalTicks += 1;
        emitter.emit('tick', timestamp - startTimestamp);
    }
    let totalTicks = 0;
    process.nextTick(() => tick(startTimestamp));
    // setImmediate(() => tick());
    const interval = setInterval(() => {
        const tickTimestamp = Date.now();
        if (tickTimestamp - startTimestamp < num) {
            return tick(tickTimestamp);
        }
        clearInterval(interval);
        return callback(totalTicks);
    }, 50);
    return emitter;
}

ticker(1000, (num: number) => console.log('final', num))
    .on('tick', (num: number) => console.log('tick', num))
    .on('error', (err) => console.error(err))