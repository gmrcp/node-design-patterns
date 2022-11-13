import { EventEmitter } from 'events';
import { readFile } from 'fs';

class findRegex extends EventEmitter {
    private regex: RegExp;
    private files: string[];

    constructor(regex: RegExp) {
        super();
        this.regex = regex;
        this.files = [];
    }

    addFiles(...args: string[]) {
        this.files.push(...args);
        return this;
    }

    find() {
        console.log('hey');
        this.emit('start');
        for (const file of this.files) {
            readFile(file, 'utf8', (err, content) => {
                if (err) {
                    return this.emit('error', err);
                }
                this.emit('fileRead', file);
                const match = content.match(this.regex);
                if (match) {
                    match.forEach(elem => this.emit('found', file, elem));
                }
            });
        }
        return this;
    }

}

const instance = new findRegex(/hello world/g);
instance
    .addFiles('./mock/text.txt', './mock/text-2.txt', './mock/text-3.txt')
    .once('start', () => console.log('this jsut started'))
    .find()
    .on('fileRead', (file) => console.log(`found the file with name ${file}`))
    .on('found', () => console.log('found something!'))