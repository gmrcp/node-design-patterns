import { EventEmitter } from 'events';
function ticker(num: number, callback: (num: number) => void) {
    const startTimestamp = Date.now();
    const emitter = new EventEmitter();
    const tick = () => {
        totalTicks += 1;
        emitter.emit('tick', Date.now() - startTimestamp);
    }
    let totalTicks = 0;
    process.nextTick(() => tick());
    // setImmediate(() => tick());
    const interval = setInterval(() => {
        if (Date.now() - startTimestamp < num) {
            return tick();
        }
        clearInterval(interval);
        return callback(totalTicks);
    }, 50);
    return emitter;
}

ticker(100, (num: number) => console.log('final', num))
    .on('tick', (num: number) => console.log('tick', num));