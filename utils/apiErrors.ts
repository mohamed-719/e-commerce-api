class ApiErrors extends Error {
  //hear can take the status and constructor :-
  //an the constructor take 
  private status: string;
    constructor(message: string, private statusCode: number) {
    super(message);
    this.status = `${this.statusCode}`.startsWith('4') ? 'failed' : 'server error'
  };
}

export default ApiErrors;