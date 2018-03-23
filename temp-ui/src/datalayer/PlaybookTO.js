class PlaybookTO {

    constructor(){
        this.name = ""
        this.variables = []
    }
    setName(playBookName){
        this.name = playBookName
    }
    setVariable(variable){
        this.variables.push(variable);
    }
}

export default  PlaybookTO

