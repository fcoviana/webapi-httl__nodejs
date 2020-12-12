const { readFile, writeFile } = require('fs/promises');

class HeroRepository {
    constructor({ file }) {
        this.file = file;
    }

    async __currentFileContent() {
        return JSON.parse(await readFile(this.file));
    }

    async find(itemId) {
      const all = await this.__currentFileContent();
      if(!itemId) return all;
      
      return all.find(({ id }) => itemId === id);
    }

    async create(data) {
      const currentFile = await this.__currentFileContent();
      currentFile.push(data);

      await writeFile(this.file, JSON.stringify(currentFile));

      return data.id;
    }
}

module.exports = HeroRepository;

// const heros = new HeroRepository({
//   file: './../../src/database/data.json'
// });

// heros.find(1).then(console.log).catch(err => console.log(err))
// heros.create({ id: 2, name: 'Homem de Ferro'})
//   .then(console.log)
//   .catch(err => console.log(err))