function cliHelp() {
    console.log(`
    Usage
      $ validator -a <airport>

    Airport:
      - should be a valid airport icao
      - is a real file located in /assets/airports

    Options:
      -h                  Show Help
      --fixes             Validate fixes            ** NOT IMPLEMENTED
      --spawn-patterns    Validate spawnPatterns    ** NOT IMPLEMENTED
    `);
}

module.exports = cliHelp;
