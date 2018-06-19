function cliHelp() {
console.log(`
    Usage
      $ validator -a <airport>

    Airport:
      - should be a valid airport icao located in /assets/airports
`);
}

module.exports = cliHelp;
