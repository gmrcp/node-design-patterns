import { EventEmitter } from 'events';
import { readFile } from 'fs';

function findRegex(files, regex) {
    const emitter = new EventEmitter();
    for (const file of files) {
        readFile(file, 'utf8', (err, content) => {
            if (err) {
                console.error(err);
                return emitter.emit('error', err);
            }
            emitter.emit('fileRead', file);
            const match = content.match(regex);
            if (match) {
                match.forEach(elem => emitter.emit('found', file, elem));
            }
        })
    }
    return emitter;
} 

findRegex(['./text.txt'], /hello world/g)
    .on('fileRead', (file) => console.log(`found the file with name ${file}`))
    .on('found', () => console.log('found something!'));