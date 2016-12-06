
class API
{
    private socket
    constructor()
    {
        this.socket = window.io('localhost:3000')
    }

    public addEventListener(key:String, callback:Function) {
        this.socket.on(key, callback)
    }

    public send(key:String, object:Object){
        this.socket.emit(key, object);
    }
}