
class API
{
    private socket
    constructor()
    {
        this.socket = window.io('192.168.1.160:3000')
    }

    public addEventListener(key:String, callback:Function) {
        this.socket.on(key, callback)
    }

    public send(key:String, object:Object){
        this.socket.emit(key, object);
    }
}